#!/bin/sh

hooks_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd) || {
  printf '%s\n' 'task-handoff hook skipped: cannot resolve the plugin hooks directory.' >&2
  exit 0
}
script="$hooks_dir/task-handoff.ts"

if deno_path=$(command -v deno 2>/dev/null); then
  exec "$deno_path" run \
    --quiet \
    --no-prompt \
    --no-config \
    --no-lock \
    --no-npm \
    --no-remote \
    --allow-env=PLUGIN_DATA,NODE_V8_COVERAGE \
    --allow-read="${PLUGIN_DATA}" \
    --allow-write="${PLUGIN_DATA}" \
    --allow-run=git \
    "$script"
  exit $?
fi

if node_path=$(command -v node 2>/dev/null); then
  # Node fixes permission roots at startup, so the allowed data root must exist.
  if [ -n "${PLUGIN_DATA:-}" ] && ! mkdir -p -- "$PLUGIN_DATA"; then
    printf '%s\n' 'task-handoff hook skipped: cannot create PLUGIN_DATA.' >&2
    exit 0
  fi
  exec "$node_path" \
    --experimental-strip-types \
    --permission \
    --allow-fs-read="$hooks_dir" \
    --allow-fs-read="${PLUGIN_DATA}" \
    --allow-fs-write="${PLUGIN_DATA}" \
    --allow-child-process \
    "$script"
  exit $?
fi

printf '%s\n' 'task-handoff hook skipped: neither Deno nor Node is available.' >&2
exit 0
