#!/bin/sh

hooks_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd) || {
  printf '%s\n' 'task-handoff hook skipped: cannot resolve the plugin hooks directory.' >&2
  exit 0
}
script="$hooks_dir/task-handoff.ts"
TASK_HANDOFF_DATA="${TMPDIR:-/tmp}/adaptive-development-skills-task-handoff"
export TASK_HANDOFF_DATA

if deno_path=$(command -v deno 2>/dev/null); then
  exec "$deno_path" run \
    --quiet \
    --no-prompt \
    --no-config \
    --no-lock \
    --no-npm \
    --no-remote \
    --allow-env=TASK_HANDOFF_DATA,NODE_V8_COVERAGE \
    --allow-read="$TASK_HANDOFF_DATA" \
    --allow-write="$TASK_HANDOFF_DATA" \
    --allow-run=git \
    "$script"
  exit $?
fi

if node_path=$(command -v node 2>/dev/null); then
  # Node fixes permission roots at startup, so the allowed data root must exist.
  if ! mkdir -p -- "$TASK_HANDOFF_DATA"; then
    printf '%s\n' 'task-handoff hook skipped: cannot create TASK_HANDOFF_DATA.' >&2
    exit 0
  fi
  exec "$node_path" \
    --experimental-strip-types \
    --permission \
    --allow-fs-read="$hooks_dir" \
    --allow-fs-read="$TASK_HANDOFF_DATA" \
    --allow-fs-write="$TASK_HANDOFF_DATA" \
    --allow-child-process \
    "$script"
  exit $?
fi

printf '%s\n' 'task-handoff hook skipped: neither Deno nor Node is available.' >&2
exit 0
