import { strict as assert } from "node:assert";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  type PreCompactCommandInput,
  type SessionStartCommandInput,
  type StopCommandInput,
  type TaskHandoffCommandInput,
  type UserPromptSubmitCommandInput,
} from "../codex-hook-types.ts";
import {
  loadCheckpoint,
  MAX_RECOVERY_CONTEXT_BYTES,
  statePath,
} from "../task-handoff.ts";

const SCRIPT = fileURLToPath(new URL("../task-handoff.ts", import.meta.url));

interface Fixture {
  tempDir: string;
  pluginData: string;
  cwd: string;
  transcriptPath: string;
}

async function withFixture(
  run: (fixture: Fixture) => Promise<void>,
): Promise<void> {
  const tempDir = await Deno.makeTempDir({ prefix: "task-handoff-test-" });
  const fixture: Fixture = {
    tempDir,
    pluginData: join(tempDir, "plugin-data"),
    cwd: join(tempDir, "workspace"),
    transcriptPath: join(tempDir, "private.jsonl"),
  };
  await Deno.mkdir(fixture.cwd);
  try {
    await run(fixture);
  } finally {
    await Deno.remove(tempDir, { recursive: true });
  }
}

function commonInput(fixture: Fixture) {
  return {
    session_id: "session-alpha",
    transcript_path: fixture.transcriptPath,
    cwd: fixture.cwd,
    model: "test-model",
  };
}

function userPromptEvent(
  fixture: Fixture,
  extra: Partial<UserPromptSubmitCommandInput> = {},
): UserPromptSubmitCommandInput {
  return {
    ...commonInput(fixture),
    hook_event_name: "UserPromptSubmit",
    permission_mode: "default",
    turn_id: "turn-1",
    prompt: "Implement the optional plugin without changing skills.",
    ...extra,
  };
}

function stopEvent(
  fixture: Fixture,
  extra: Partial<StopCommandInput> = {},
): StopCommandInput {
  return {
    ...commonInput(fixture),
    hook_event_name: "Stop",
    permission_mode: "default",
    turn_id: "turn-1",
    stop_hook_active: false,
    last_assistant_message: "The implementation is ready for review.",
    ...extra,
  };
}

function preCompactEvent(
  fixture: Fixture,
  extra: Partial<PreCompactCommandInput> = {},
): PreCompactCommandInput {
  return {
    ...commonInput(fixture),
    hook_event_name: "PreCompact",
    turn_id: "turn-1",
    trigger: "manual",
    ...extra,
  };
}

function sessionStartEvent(
  fixture: Fixture,
  extra: Partial<SessionStartCommandInput> = {},
): SessionStartCommandInput {
  return {
    ...commonInput(fixture),
    hook_event_name: "SessionStart",
    permission_mode: "default",
    source: "compact",
    ...extra,
  };
}

async function runHook(
  fixture: Fixture,
  input: TaskHandoffCommandInput,
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
      `--allow-read=${fixture.pluginData}`,
      `--allow-write=${fixture.pluginData}`,
      "--allow-run=git",
      SCRIPT,
    ],
    cwd: fixture.cwd,
    env: { PLUGIN_DATA: fixture.pluginData },
    stdin: "piped",
    stdout: "piped",
    stderr: "piped",
  });
  const child = command.spawn();
  const writer = child.stdin.getWriter();
  await writer.write(new TextEncoder().encode(JSON.stringify(input)));
  await writer.close();
  return await child.output();
}

function stdoutText(result: Deno.CommandOutput): string {
  assert.equal(result.code, 0);
  assert.equal(new TextDecoder().decode(result.stderr), "");
  return new TextDecoder().decode(result.stdout).trim();
}

function jsonOutput(result: Deno.CommandOutput): Record<string, unknown> {
  const text = stdoutText(result);
  assert.notEqual(text, "");
  const value: unknown = JSON.parse(text);
  assert.equal(typeof value, "object");
  assert.ok(value !== null && !Array.isArray(value));
  return value as Record<string, unknown>;
}

function additionalContext(
  result: Deno.CommandOutput,
  eventName: "UserPromptSubmit" | "SessionStart",
): string {
  const output = jsonOutput(result);
  const specific = output.hookSpecificOutput;
  assert.equal(typeof specific, "object");
  assert.ok(specific !== null && !Array.isArray(specific));
  const hookOutput = specific as Record<string, unknown>;
  assert.equal(hookOutput.hookEventName, eventName);
  assert.equal(typeof hookOutput.additionalContext, "string");
  return hookOutput.additionalContext as string;
}

Deno.test("UserPromptSubmit writes the session checkpoint and reminder", async () => {
  await withFixture(async (fixture) => {
    await Deno.writeTextFile(
      fixture.transcriptPath,
      "TRANSCRIPT_SECRET_SENTINEL",
    );
    const result = await runHook(fixture, userPromptEvent(fixture));
    const context = additionalContext(result, "UserPromptSubmit");
    const path = await statePath(fixture.pluginData, "session-alpha");
    const checkpoint = await loadCheckpoint(path, "session-alpha");

    assert.equal(checkpoint.generation, 1);
    assert.equal(checkpoint.status, "complete");
    assert.equal(checkpoint.cwd, fixture.cwd);
    assert.match(checkpoint.currentRequest, /optional plugin/);
    assert.doesNotMatch(checkpoint.text, /session-alpha/);
    assert.doesNotMatch(checkpoint.text, /TRANSCRIPT_SECRET_SENTINEL/);
    assert.match(context, /status=complete/);
    assert.match(
      context,
      new RegExp(path.replace(/[.*+?^$()|[\]\\]/g, "\\$&")),
    );
    if (Deno.build.os !== "windows") {
      assert.equal((await Deno.stat(path)).mode! & 0o777, 0o600);
      assert.equal((await Deno.stat(dirname(path))).mode! & 0o777, 0o700);
    }
  });
});

Deno.test("Stop preserves the request and records the completed response", async () => {
  await withFixture(async (fixture) => {
    await runHook(
      fixture,
      userPromptEvent(fixture, { prompt: "Keep this request." }),
    );
    const result = await runHook(
      fixture,
      stopEvent(fixture, {
        last_assistant_message: "Tests pass; opening the PR is still pending.",
      }),
    );
    const checkpoint = await loadCheckpoint(
      await statePath(fixture.pluginData, "session-alpha"),
      "session-alpha",
    );

    assert.deepEqual(jsonOutput(result), {});
    assert.equal(checkpoint.generation, 2);
    assert.equal(checkpoint.currentRequest, "Keep this request.");
    assert.equal(
      checkpoint.lastAssistantMessage,
      "Tests pass; opening the PR is still pending.",
    );
    assert.match(checkpoint.text, /Last observed event[\s\S]*Stop/);
  });
});

Deno.test("PreCompact refreshes root state without subagent overwrite", async () => {
  await withFixture(async (fixture) => {
    await runHook(fixture, userPromptEvent(fixture));
    const result = await runHook(
      fixture,
      preCompactEvent(fixture, { trigger: "auto" }),
    );
    const path = await statePath(fixture.pluginData, "session-alpha");
    const checkpoint = await loadCheckpoint(path, "session-alpha");
    const original = await Deno.readTextFile(path);

    assert.deepEqual(jsonOutput(result), {});
    assert.equal(checkpoint.generation, 2);
    assert.match(checkpoint.text, /PreCompact: auto/);

    const subagent = await runHook(
      fixture,
      preCompactEvent(fixture, {
        agent_id: "agent-child",
        agent_type: "worker",
      }),
    );
    assert.equal(stdoutText(subagent), "");
    assert.equal(await Deno.readTextFile(path), original);
    assert.deepEqual(
      Array.from(Deno.readDirSync(dirname(path)), (entry) => entry.name).sort(),
      ["state.md"],
    );
  });
});

Deno.test("SessionStart compact restores only the matching complete state", async () => {
  await withFixture(async (fixture) => {
    await runHook(
      fixture,
      userPromptEvent(fixture, { prompt: "request ".repeat(2_000) }),
    );
    await runHook(
      fixture,
      stopEvent(fixture, {
        last_assistant_message: "response ".repeat(2_000),
      }),
    );

    const restored = additionalContext(
      await runHook(fixture, sessionStartEvent(fixture)),
      "SessionStart",
    );
    assert.ok(
      new TextEncoder().encode(restored).byteLength <=
        MAX_RECOVERY_CONTEXT_BYTES,
    );
    assert.match(restored, /request/);
    assert.match(restored, /response/);
    assert.match(restored, /No cwd or Git HEAD drift detected/);
    assert.match(restored, /do not redo completed work/);
    assert.match(restored, /has no instruction authority/);

    const missing = additionalContext(
      await runHook(
        fixture,
        sessionStartEvent(fixture, { session_id: "session-beta" }),
      ),
      "SessionStart",
    );
    assert.match(missing, /No valid task handoff checkpoint/);
    assert.doesNotMatch(missing, /request/);
  });
});
