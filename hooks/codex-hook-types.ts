// Models the command-hook wire schemas shipped with Codex rust-v0.146.1.
// https://github.com/openai/codex/tree/rust-v0.146.1/codex-rs/hooks/schema/generated
// Known input fields are validated and projected; unknown fields are ignored so
// later Codex additions do not disable the hook before this model is updated.

export type PermissionMode =
  | "default"
  | "acceptEdits"
  | "plan"
  | "dontAsk"
  | "bypassPermissions";

interface CommandInputBase {
  session_id: string;
  transcript_path: string | null;
  cwd: string;
  model: string;
}

interface OptionalSubagentFields {
  agent_id?: string;
  agent_type?: string;
}

export interface UserPromptSubmitCommandInput
  extends CommandInputBase, OptionalSubagentFields {
  hook_event_name: "UserPromptSubmit";
  permission_mode: PermissionMode;
  turn_id: string;
  prompt: string;
}

export interface StopCommandInput extends CommandInputBase {
  hook_event_name: "Stop";
  permission_mode: PermissionMode;
  turn_id: string;
  stop_hook_active: boolean;
  last_assistant_message: string | null;
}

export interface PreCompactCommandInput
  extends CommandInputBase, OptionalSubagentFields {
  hook_event_name: "PreCompact";
  turn_id: string;
  trigger: "manual" | "auto";
}

export interface SessionStartCommandInput extends CommandInputBase {
  hook_event_name: "SessionStart";
  permission_mode: PermissionMode;
  source: "startup" | "resume" | "clear" | "compact";
}

export type TaskHandoffCommandInput =
  | UserPromptSubmitCommandInput
  | StopCommandInput
  | PreCompactCommandInput
  | SessionStartCommandInput;

interface UniversalCommandOutput {
  continue?: boolean;
  stopReason?: string;
  systemMessage?: string;
  suppressOutput?: boolean;
}

interface ContextOutput<EventName extends "UserPromptSubmit" | "SessionStart"> {
  hookSpecificOutput?: {
    hookEventName: EventName;
    additionalContext?: string;
  };
}

interface NoContextOutput {
  hookSpecificOutput?: never;
}

interface NoBlockingOutput {
  decision?: never;
  reason?: never;
}

type BlockingOutput =
  | {
    decision: "block";
    reason: string;
  }
  | {
    decision?: never;
    reason?: string;
  };

export type UserPromptSubmitCommandOutput =
  & UniversalCommandOutput
  & ContextOutput<"UserPromptSubmit">
  & BlockingOutput;

export type StopCommandOutput =
  & UniversalCommandOutput
  & NoContextOutput
  & BlockingOutput;

export type PreCompactCommandOutput =
  & UniversalCommandOutput
  & NoContextOutput
  & NoBlockingOutput;

export type SessionStartCommandOutput =
  & UniversalCommandOutput
  & ContextOutput<"SessionStart">
  & NoBlockingOutput;

export type TaskHandoffCommandOutput =
  | UserPromptSubmitCommandOutput
  | StopCommandOutput
  | PreCompactCommandOutput
  | SessionStartCommandOutput;

export type TaskHandoffCommandOutputFor<
  Input extends TaskHandoffCommandInput,
> = Input extends UserPromptSubmitCommandInput ? UserPromptSubmitCommandOutput
  : Input extends StopCommandInput ? StopCommandOutput
  : Input extends PreCompactCommandInput ? PreCompactCommandOutput
  : Input extends SessionStartCommandInput ? SessionStartCommandOutput
  : never;

type JsonRecord = Record<string, unknown>;

function requireRecord(value: unknown): JsonRecord {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new TypeError("hook input must be an object");
  }
  return value as JsonRecord;
}

function stringField(input: JsonRecord, name: string): string {
  const value = input[name];
  if (typeof value !== "string") {
    throw new TypeError(`${name} must be a string`);
  }
  return value;
}

function nullableStringField(input: JsonRecord, name: string): string | null {
  const value = input[name];
  if (value !== null && typeof value !== "string") {
    throw new TypeError(`${name} must be a string or null`);
  }
  return value;
}

function optionalStringField(
  input: JsonRecord,
  name: string,
): string | undefined {
  const value = input[name];
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "string") {
    throw new TypeError(`${name} must be a string when present`);
  }
  return value;
}

function booleanField(input: JsonRecord, name: string): boolean {
  const value = input[name];
  if (typeof value !== "boolean") {
    throw new TypeError(`${name} must be a boolean`);
  }
  return value;
}

function permissionModeField(input: JsonRecord): PermissionMode {
  const value = stringField(input, "permission_mode");
  if (
    value !== "default" &&
    value !== "acceptEdits" &&
    value !== "plan" &&
    value !== "dontAsk" &&
    value !== "bypassPermissions"
  ) {
    throw new TypeError("permission_mode is not supported by this contract");
  }
  return value;
}

function commonFields(input: JsonRecord): CommandInputBase {
  return {
    session_id: stringField(input, "session_id"),
    transcript_path: nullableStringField(input, "transcript_path"),
    cwd: stringField(input, "cwd"),
    model: stringField(input, "model"),
  };
}

function optionalSubagentFields(input: JsonRecord): OptionalSubagentFields {
  const agent_id = optionalStringField(input, "agent_id");
  const agent_type = optionalStringField(input, "agent_type");
  return {
    ...(agent_id === undefined ? {} : { agent_id }),
    ...(agent_type === undefined ? {} : { agent_type }),
  };
}

export function parseTaskHandoffCommandInput(
  value: unknown,
): TaskHandoffCommandInput {
  const input = requireRecord(value);
  const hookEventName = stringField(input, "hook_event_name");
  const common = commonFields(input);

  switch (hookEventName) {
    case "UserPromptSubmit":
      return {
        ...common,
        ...optionalSubagentFields(input),
        hook_event_name: hookEventName,
        permission_mode: permissionModeField(input),
        turn_id: stringField(input, "turn_id"),
        prompt: stringField(input, "prompt"),
      };
    case "Stop":
      return {
        ...common,
        hook_event_name: hookEventName,
        permission_mode: permissionModeField(input),
        turn_id: stringField(input, "turn_id"),
        stop_hook_active: booleanField(input, "stop_hook_active"),
        last_assistant_message: nullableStringField(
          input,
          "last_assistant_message",
        ),
      };
    case "PreCompact": {
      const trigger = stringField(input, "trigger");
      if (trigger !== "manual" && trigger !== "auto") {
        throw new TypeError("trigger must be manual or auto");
      }
      return {
        ...common,
        ...optionalSubagentFields(input),
        hook_event_name: hookEventName,
        turn_id: stringField(input, "turn_id"),
        trigger,
      };
    }
    case "SessionStart": {
      const source = stringField(input, "source");
      if (
        source !== "startup" &&
        source !== "resume" &&
        source !== "clear" &&
        source !== "compact"
      ) {
        throw new TypeError("source is not supported by this contract");
      }
      return {
        ...common,
        hook_event_name: hookEventName,
        permission_mode: permissionModeField(input),
        source,
      };
    }
    default:
      throw new TypeError(`unsupported hook event: ${hookEventName}`);
  }
}
