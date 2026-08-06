import { strict as assert } from "node:assert";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  type GitSnapshot,
  hashSessionId,
  loadCheckpoint,
  MAX_RECOVERY_CONTEXT_BYTES,
  processEvent,
  statePath,
} from "../task_handoff.ts";

const SCRIPT = fileURLToPath(new URL("../task_handoff.ts", import.meta.url));
const HOOKS_CONFIG = fileURLToPath(new URL("../hooks.json", import.meta.url));
const NOW = "2026-08-06T08:30:00Z";

interface Fixture {
  tempDir: string;
  pluginData: string;
  cwd: string;
  snapshot: GitSnapshot;
}

async function withFixture(
  run: (fixture: Fixture) => Promise<void>,
): Promise<void> {
  const tempDir = await Deno.makeTempDir({ prefix: "task-handoff-test-" });
  const fixture: Fixture = {
    tempDir,
    pluginData: join(tempDir, "plugin-data"),
    cwd: join(tempDir, "workspace"),
    snapshot: {
      head: "a".repeat(40),
    },
  };
  await Deno.mkdir(fixture.cwd);
  try {
    await run(fixture);
  } finally {
    await Deno.remove(tempDir, { recursive: true });
  }
}

function event(
  fixture: Fixture,
  hookEventName: string,
  extra: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    session_id: "session-alpha",
    cwd: fixture.cwd,
    transcript_path: join(fixture.tempDir, "private.jsonl"),
    hook_event_name: hookEventName,
    ...extra,
  };
}

async function process(
  fixture: Fixture,
  hookEvent: Record<string, unknown>,
): Promise<Record<string, unknown> | null> {
  return await processEvent(hookEvent, fixture.pluginData, {
    now: NOW,
    snapshot: fixture.snapshot,
  });
}

function additionalContext(output: Record<string, unknown> | null): string {
  assert.ok(output);
  const hookSpecificOutput = output.hookSpecificOutput;
  assert.equal(typeof hookSpecificOutput, "object");
  assert.ok(hookSpecificOutput);
  const context = (hookSpecificOutput as Record<string, unknown>)
    .additionalContext;
  assert.equal(typeof context, "string");
  return context as string;
}

async function runRestrictedHook(
  input: string,
  pluginData: string,
): Promise<Deno.CommandOutput> {
  const command = new Deno.Command(Deno.execPath(), {
    args: [
      "run",
      "--quiet",
      "--no-prompt",
      "--no-config",
      "--no-lock",
      "--no-npm",
      "--no-remote",
      "--allow-env=PLUGIN_DATA",
      `--allow-read=${pluginData}`,
      `--allow-write=${pluginData}`,
      "--allow-run=git",
      SCRIPT,
    ],
    env: { PLUGIN_DATA: pluginData },
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
  const child = command.spawn();
  const writer = child.stdin.getWriter();
  await writer.write(new TextEncoder().encode(input));
  await writer.close();
  return await child.output();
}

Deno.test("state path is deterministic and session scoped", async () => {
  await withFixture(async (fixture) => {
    const expectedHash = await hashSessionId("session-alpha");
    const first = await statePath(fixture.pluginData, "session-alpha");
    const second = await statePath(fixture.pluginData, "session-alpha");
    const other = await statePath(fixture.pluginData, "session-beta");

    assert.equal(first, second);
    assert.equal(
      first,
      join(fixture.pluginData, "handoffs", expectedHash, "state.md"),
    );
    assert.notEqual(first, other);
  });
});

Deno.test("user prompt creates a complete private checkpoint", async () => {
  await withFixture(async (fixture) => {
    const output = await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "Implement the optional plugin without changing skills.",
      }),
    );

    const path = await statePath(fixture.pluginData, "session-alpha");
    const checkpoint = await loadCheckpoint(path, "session-alpha");
    const context = additionalContext(output);

    assert.equal(checkpoint.generation, 1);
    assert.equal(checkpoint.status, "complete");
    assert.equal(checkpoint.cwd, fixture.cwd);
    assert.equal(checkpoint.gitHead, "a".repeat(40));
    assert.match(checkpoint.text, /Implement the optional plugin/);
    assert.doesNotMatch(checkpoint.text, /session-alpha/);
    assert.match(
      context,
      new RegExp(path.replace(/[.*+?^$()|[\]\\]/g, "\\$&")),
    );
    assert.match(context, /status=complete/);
    if (Deno.build.os !== "windows") {
      assert.equal((await Deno.stat(path)).mode! & 0o777, 0o600);
      assert.equal(
        (await Deno.stat(join(fixture.pluginData, "handoffs"))).mode! & 0o777,
        0o700,
      );
      assert.equal(
        (await Deno.stat(dirname(path))).mode! & 0o777,
        0o700,
      );
    }
  });
});

Deno.test("PreCompact and Stop preserve the latest semantic state", async () => {
  await withFixture(async (fixture) => {
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "Keep this exact request.",
      }),
    );
    const stopOutput = await process(
      fixture,
      event(fixture, "Stop", {
        turn_id: "turn-1",
        stop_hook_active: false,
        last_assistant_message: "Tests pass; the PR still needs to be opened.",
      }),
    );
    const compactOutput = await process(
      fixture,
      event(fixture, "PreCompact", {
        turn_id: "turn-1",
        trigger: "manual",
      }),
    );

    const path = await statePath(fixture.pluginData, "session-alpha");
    const checkpoint = await loadCheckpoint(path, "session-alpha");
    assert.deepEqual(stopOutput, {});
    assert.deepEqual(compactOutput, {});
    assert.equal(checkpoint.generation, 3);
    assert.match(checkpoint.text, /Keep this exact request\./);
    assert.match(
      checkpoint.text,
      /Tests pass; the PR still needs to be opened\./,
    );
    assert.match(checkpoint.text, /PreCompact: manual/);
    const files = Array.from(Deno.readDirSync(dirname(path)))
      .map((entry) => entry.name)
      .sort();
    assert.deepEqual(files, [".state.lock", "state.md"]);
  });
});

Deno.test("concurrent checkpoint refreshes do not lose generations", async () => {
  await withFixture(async (fixture) => {
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "Keep concurrent updates atomic.",
      }),
    );
    await Promise.all(
      Array.from({ length: 12 }, () =>
        process(
          fixture,
          event(fixture, "PreCompact", {
            turn_id: "turn-1",
            trigger: "auto",
          }),
        )),
    );

    const checkpoint = await loadCheckpoint(
      await statePath(fixture.pluginData, "session-alpha"),
      "session-alpha",
    );
    assert.equal(checkpoint.generation, 13);
  });
});

Deno.test("subagent events cannot overwrite or restore the root checkpoint", async () => {
  await withFixture(async (fixture) => {
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "Keep the root task checkpoint isolated.",
      }),
    );
    const path = await statePath(fixture.pluginData, "session-alpha");
    const original = await Deno.readTextFile(path);

    const refresh = await process(
      fixture,
      event(fixture, "PreCompact", {
        agent_id: "agent-child",
        turn_id: "turn-child",
        trigger: "auto",
      }),
    );
    const recovery = await process(
      fixture,
      event(fixture, "SessionStart", {
        agent_id: "agent-child",
        source: "compact",
      }),
    );

    assert.equal(refresh, null);
    assert.equal(recovery, null);
    assert.equal(await Deno.readTextFile(path), original);
  });
});

Deno.test("compact SessionStart restores the same checkpoint and reports drift", async () => {
  await withFixture(async (fixture) => {
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "The goal survives compaction.",
      }),
    );

    const stable = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    assert.match(stable, /The goal survives compaction\./);
    assert.match(stable, /No cwd or Git HEAD drift detected/);
    assert.match(stable.toLowerCase(), /do not redo completed work/);

    const movedCwd = join(fixture.tempDir, "moved-workspace");
    await Deno.mkdir(movedCwd);
    const changed = additionalContext(
      await processEvent(
        event(fixture, "SessionStart", {
          source: "compact",
          cwd: movedCwd,
        }),
        fixture.pluginData,
        {
          now: NOW,
          snapshot: {
            head: "b".repeat(40),
          },
        },
      ),
    );
    assert.match(changed, /working directory differs/);
    assert.match(changed, /Git HEAD differs/);
  });
});

Deno.test("recovery rejects incomplete or cross-session checkpoints", async () => {
  await withFixture(async (fixture) => {
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "Do not expose this checkpoint.",
      }),
    );
    const path = await statePath(fixture.pluginData, "session-alpha");
    const original = await Deno.readTextFile(path);

    await Deno.writeTextFile(
      path,
      original.replace("status: complete", "status: pending"),
    );
    const incomplete = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    assert.match(incomplete, /No valid task handoff checkpoint/);
    assert.doesNotMatch(incomplete, /Do not expose this checkpoint/);

    await Deno.writeTextFile(
      path,
      original.replace(
        await hashSessionId("session-alpha"),
        await hashSessionId("session-beta"),
      ),
    );
    const wrongSession = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    assert.match(wrongSession, /No valid task handoff checkpoint/);
    assert.doesNotMatch(wrongSession, /Do not expose this checkpoint/);

    const bodyStart = original.indexOf("# Task handoff checkpoint");
    assert.ok(bodyStart > 0);
    await Deno.writeTextFile(path, original.slice(0, bodyStart));
    const headerOnly = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    assert.match(headerOnly, /No valid task handoff checkpoint/);
    assert.doesNotMatch(headerOnly, /Do not expose this checkpoint/);

    await Deno.writeTextFile(
      path,
      original.replace(
        "<!-- task-handoff:last-event:end -->",
        "",
      ),
    );
    const truncatedSection = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    assert.match(truncatedSection, /No valid task handoff checkpoint/);
    assert.doesNotMatch(truncatedSection, /Do not expose this checkpoint/);
  });
});

Deno.test("recovery context is byte bounded and transcript independent", async () => {
  await withFixture(async (fixture) => {
    await Deno.writeTextFile(
      join(fixture.tempDir, "private.jsonl"),
      "TRANSCRIPT_SECRET_SENTINEL",
    );
    await process(
      fixture,
      event(fixture, "UserPromptSubmit", {
        turn_id: "turn-1",
        prompt: "请求".repeat(6_000),
      }),
    );
    await process(
      fixture,
      event(fixture, "Stop", {
        turn_id: "turn-1",
        stop_hook_active: false,
        last_assistant_message: "回复".repeat(6_000),
      }),
    );

    const context = additionalContext(
      await process(
        fixture,
        event(fixture, "SessionStart", { source: "compact" }),
      ),
    );
    const checkpoint = await Deno.readTextFile(
      await statePath(fixture.pluginData, "session-alpha"),
    );
    const config = JSON.parse(await Deno.readTextFile(HOOKS_CONFIG));

    assert.ok(
      new TextEncoder().encode(context).byteLength <=
        MAX_RECOVERY_CONTEXT_BYTES,
    );
    assert.match(context, /\[truncated to/);
    assert.doesNotMatch(checkpoint, /TRANSCRIPT_SECRET_SENTINEL/);
    assert.equal(
      config.hooks.UserPromptSubmit[0].hooks[0].additionalContextLimit,
      0,
    );
    assert.equal(
      config.hooks.SessionStart[0].hooks[0].additionalContextLimit,
      0,
    );
  });
});

Deno.test("restricted CLI invocation fails open and persists valid input", async () => {
  await withFixture(async (fixture) => {
    const badJson = await runRestrictedHook("not-json", fixture.pluginData);
    assert.equal(badJson.code, 0);
    assert.equal(new TextDecoder().decode(badJson.stdout), "");

    const valid = await runRestrictedHook(
      JSON.stringify(
        event(fixture, "UserPromptSubmit", {
          turn_id: "turn-cli",
          prompt: "Persist this CLI checkpoint.",
        }),
      ),
      fixture.pluginData,
    );
    assert.equal(valid.code, 0);
    assert.equal(new TextDecoder().decode(valid.stderr), "");
    const output = JSON.parse(new TextDecoder().decode(valid.stdout));
    assert.equal(
      output.hookSpecificOutput.hookEventName,
      "UserPromptSubmit",
    );
    const checkpoint = await loadCheckpoint(
      await statePath(fixture.pluginData, "session-alpha"),
      "session-alpha",
    );
    assert.match(checkpoint.text, /Persist this CLI checkpoint\./);
  });
});
