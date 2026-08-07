#!/bin/sh

hooks_dir=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd) || {
  printf '%s\n' 'task-handoff hook skipped: cannot resolve the plugin hooks directory.' >&2
  exit 0
}
script="$hooks_dir/task-handoff.ts"

if runtime_path=$(command -v deno 2>/dev/null); then
  runtime=deno
elif runtime_path=$(command -v node 2>/dev/null); then
  runtime=node
else
  printf '%s\n' 'task-handoff hook skipped: neither Deno nor Node is available.' >&2
  exit 0
fi

task_handoff_uid=$(id -u 2>/dev/null) || {
  printf '%s\n' 'task-handoff hook skipped: cannot determine the current user ID.' >&2
  exit 0
}
case $task_handoff_uid in
  '' | *[!0-9]*)
    printf '%s\n' 'task-handoff hook skipped: cannot determine the current user ID.' >&2
    exit 0
    ;;
esac

TASK_HANDOFF_DATA="${TMPDIR:-/tmp}/adaptive-development-skills-task-handoff-$task_handoff_uid"
export TASK_HANDOFF_DATA

is_owned_task_handoff_directory() (
  if [ -L "$TASK_HANDOFF_DATA" ] || [ ! -d "$TASK_HANDOFF_DATA" ]; then
    return 1
  fi
  task_handoff_listing=$(LC_ALL=C ls -ldn -- "$TASK_HANDOFF_DATA" 2>/dev/null) ||
    return 1
  IFS=' ' read -r task_handoff_mode task_handoff_links task_handoff_owner task_handoff_rest <<EOF
$task_handoff_listing
EOF
  [ "$task_handoff_owner" = "$task_handoff_uid" ]
)

prepare_task_handoff_data() {
  (umask 077 && mkdir -m 700 -- "$TASK_HANDOFF_DATA") 2>/dev/null || :
  is_owned_task_handoff_directory || return 1
  chmod 700 -- "$TASK_HANDOFF_DATA" 2>/dev/null || return 1
  is_owned_task_handoff_directory
}

if ! prepare_task_handoff_data; then
  printf '%s\n' 'task-handoff hook skipped: TASK_HANDOFF_DATA is not a private directory owned by the current user.' >&2
  exit 0
fi

if [ "$runtime" = deno ]; then
  exec "$runtime_path" run \
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

exec "$runtime_path" \
  --experimental-strip-types \
  --permission \
  --allow-fs-read="$hooks_dir" \
  --allow-fs-read="$TASK_HANDOFF_DATA" \
  --allow-fs-write="$TASK_HANDOFF_DATA" \
  --allow-child-process \
  "$script"
exit $?
