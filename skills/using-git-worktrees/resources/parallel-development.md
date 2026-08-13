# Parallel Development with Worktrees

Use when multiple writers will work in the same repository at the same time.

## Isolation contract

Before dispatch, record for each writer:

- goal and expected result;
- worktree path and branch;
- owned files or modules;
- shared generated files, schemas, lockfiles, migrations, ports, processes, databases and services;
- dependency on other work and the integration order;
- validation and reporting responsibility.

Two branches can proceed concurrently when each has a stable input contract and neither changes an assumption the other must discover during implementation. Shared lockfiles, schemas, generated outputs and mutable services need one owner or a serial integration step.

## Integration

Each writer reports its exact commit or diff, validation, remaining risks and shared-resource changes. The coordinator verifies those facts, integrates dependent changes in order, resolves conflicts from domain intent rather than text position, and runs the smallest combined check that exercises the interaction.

Worktree isolation does not make reviews independent and does not isolate runtime state. Assign those responsibilities explicitly when the task needs them.
