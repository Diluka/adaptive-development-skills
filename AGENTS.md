# Adaptive Development Skills Repository Guide

## Product boundary

This repository ships a toolbox of independently discoverable development methods. A Skill should preserve non-obvious domain knowledge, a repeatable feedback loop, or a fragile deterministic operation. General task planning, authorization, agent topology and Git delivery policy belong to the host agent, the user and the target repository.

Before adding a Skill, write the user problem it solves in one sentence. Prefer extending an existing method when the new behavior shares its goal and feedback loop. Keep no default router whose trigger is effectively “any development task”; when no specialized Skill applies, the agent should work directly from the request and repository rules.

## Repository scope

- `skills/` is the single source for standalone and plugin installation.
- Each Skill lives in `skills/<skill-name>/SKILL.md`; the directory and frontmatter `name` use the same lowercase hyphenated name.
- Put optional UI metadata in `agents/openai.yaml`, long conditional guidance in `resources/`, deterministic tools in `scripts/`, and reusable output material in `assets/`.
- Keep `SKILL.md` focused on the method's decisions and feedback loop. Link shared facts instead of copying policy between Skills.
- Keep repository design rationale in `docs/design.md`, installation instructions in `docs/installation.md`, and the concise product inventory in `README.md`.
- Put temporary plans and investigation notes under ignored `.docs/`; do not commit process artifacts.

## Writing Skills

- Start `description` with `Use when` and describe concrete user situations that distinguish the Skill from its neighbors.
- Use positive, direct instructions. Explain why a constraint matters when the agent must exercise judgment.
- Preserve the standard core loop of named methods. Tool-specific commands and platform details belong only where they are necessary to execute that method.
- Let the user request and target repository define scope, authorization, worktrees, planning, review and delivery. A specialized Skill can explain how to perform one of those operations when explicitly applicable.
- Make method transitions direct: link to the neighboring Skill that owns the next concrete problem instead of routing through a universal workflow layer.
- Treat prompts as behavior code. Read the full Skill, its referenced resources, callers, README inventory and design rationale before changing public behavior.

## Plugin and Hook boundary

- Standalone Skills do not depend on the optional Plugin or Hook. Hook code does not contain Skill selection or development-method logic.
- Writable Hook state stays in the launcher-derived temporary directory passed through `TASK_HANDOFF_DATA`.
- Production Hook code under `hooks/` uses APIs shared by Deno 2 and Node 24. The launcher prefers Deno and falls back to Node only when Deno is unavailable; a selected runtime failure is reported without switching runtimes.
- Update Plugin versions only through `scripts/bump-version.ts <major|minor|patch|x.y.z>` so Codex, Copilot and marketplace manifests remain synchronized.

## Validation

For Markdown or Skill changes, validate every affected Skill, cross-references and whitespace:

```bash
skill_creator_dir="${CODEX_HOME:-$HOME/.codex}/skills/.system/skill-creator"
for skill_dir in skills/*; do
  python3 "$skill_creator_dir/scripts/quick_validate.py" "$skill_dir" || exit 1
done
deno check scripts/check-cross-references.ts
scripts/check-cross-references.ts
git diff --check
```

Public trigger or behavior changes also need representative Fresh Agent scenarios: at least one positive trigger, one neighboring method, one direct fast path and one failure or boundary case. Record the expected and observed Skill choice and whether the answer solves the user problem without adding unrelated process.

Plugin or Hook changes additionally run the checks below:

```bash
scripts/bump-version.ts --check
deno fmt --check scripts/bump-version.ts
deno lint --no-config scripts/bump-version.ts
deno check --no-config --no-lock --no-remote scripts/bump-version.ts
deno fmt --check hooks/codex-hook-types.ts hooks/task-handoff.ts hooks/tests/task-handoff.test.ts
deno lint --no-config hooks/codex-hook-types.ts hooks/task-handoff.ts hooks/tests/task-handoff.test.ts
deno check --no-config --no-lock --no-npm --no-remote hooks/codex-hook-types.ts hooks/task-handoff.ts
node --check hooks/codex-hook-types.ts
node --check hooks/task-handoff.ts
sh -n hooks/run-task-handoff.sh
test -x hooks/run-task-handoff.sh
deno test --no-config --no-lock --no-npm --no-remote --allow-read --allow-write --allow-run=deno hooks/tests/task-handoff.test.ts
python3 "${CODEX_HOME:-$HOME/.codex}/skills/.system/plugin-creator/scripts/validate_plugin.py" .
```
