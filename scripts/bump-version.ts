#!/usr/bin/env -S deno run --allow-read --allow-write

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const PLUGIN_NAME = "adaptive-development-skills";
const SEMVER =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const USAGE = "Usage: bump-version.ts <version> | --check";

type JsonObject = Record<string, unknown>;

interface VersionField {
  label: string;
  value: string;
  set(version: string): void;
}

interface VersionDocument {
  path: string;
  content: JsonObject;
  fields: VersionField[];
}

function isObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireObject(value: unknown, label: string): JsonObject {
  if (!isObject(value)) {
    throw new Error(`${label} must be an object`);
  }
  return value;
}

function requireVersionField(
  object: JsonObject,
  key: string,
  label: string,
): VersionField {
  const value = object[key];
  if (typeof value !== "string") {
    throw new Error(`${label} must be a string`);
  }
  return {
    label,
    value,
    set(version: string) {
      object[key] = version;
    },
  };
}

function requirePluginName(document: JsonObject, path: string): void {
  if (document.name !== PLUGIN_NAME) {
    throw new Error(`${path}.name must be ${PLUGIN_NAME}`);
  }
}

function manifestFields(document: JsonObject, path: string): VersionField[] {
  requirePluginName(document, path);
  return [requireVersionField(document, "version", `${path}.version`)];
}

function marketplaceFields(
  document: JsonObject,
  path: string,
): VersionField[] {
  requirePluginName(document, path);
  const metadata = requireObject(document.metadata, `${path}.metadata`);
  if (!Array.isArray(document.plugins)) {
    throw new Error(`${path}.plugins must be an array`);
  }

  const matchingPlugins = document.plugins.filter((plugin) =>
    isObject(plugin) && plugin.name === PLUGIN_NAME
  );
  if (matchingPlugins.length !== 1) {
    throw new Error(
      `${path}.plugins must contain exactly one ${PLUGIN_NAME} entry`,
    );
  }

  return [
    requireVersionField(
      metadata,
      "version",
      `${path}.metadata.version`,
    ),
    requireVersionField(
      matchingPlugins[0],
      "version",
      `${path}.plugins[${PLUGIN_NAME}].version`,
    ),
  ];
}

function isSemVer(version: string): boolean {
  const match = SEMVER.exec(version);
  if (match === null) {
    return false;
  }
  const prerelease = match[4];
  return prerelease === undefined ||
    prerelease.split(".").every((identifier) =>
      !/^\d+$/.test(identifier) || identifier === "0" ||
      !identifier.startsWith("0")
    );
}

async function loadDocument(
  repositoryRoot: string,
  relativePath: string,
  fields: (document: JsonObject, path: string) => VersionField[],
): Promise<VersionDocument> {
  const path = resolve(repositoryRoot, relativePath);
  let parsed: unknown;
  try {
    parsed = JSON.parse(await Deno.readTextFile(path));
  } catch (error) {
    throw new Error(
      `failed to read ${relativePath}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }
  const content = requireObject(parsed, relativePath);
  return { path, content, fields: fields(content, relativePath) };
}

async function loadVersionDocuments(): Promise<VersionDocument[]> {
  const repositoryRoot = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "..",
  );
  return await Promise.all([
    loadDocument(
      repositoryRoot,
      ".codex-plugin/plugin.json",
      manifestFields,
    ),
    loadDocument(repositoryRoot, "plugin.json", manifestFields),
    loadDocument(
      repositoryRoot,
      ".github/plugin/marketplace.json",
      marketplaceFields,
    ),
  ]);
}

async function main(): Promise<void> {
  if (Deno.args.length !== 1) {
    console.error(USAGE);
    Deno.exitCode = 2;
    return;
  }

  const [argument] = Deno.args;
  const documents = await loadVersionDocuments();
  const fields = documents.flatMap((document) => document.fields);

  if (argument === "--check") {
    const invalid = fields.filter((field) => !isSemVer(field.value));
    if (invalid.length > 0) {
      throw new Error(
        `invalid plugin versions:\n${
          invalid.map((field) => `${field.label}: ${field.value}`).join("\n")
        }`,
      );
    }
    const versions = new Set(fields.map((field) => field.value));
    if (versions.size !== 1) {
      throw new Error(
        `plugin versions are not aligned:\n${
          fields.map((field) => `${field.label}: ${field.value}`).join("\n")
        }`,
      );
    }
    console.log(`Plugin versions are aligned at ${fields[0].value}.`);
    return;
  }

  if (!isSemVer(argument)) {
    console.error(`Invalid SemVer: ${argument}\n${USAGE}`);
    Deno.exitCode = 2;
    return;
  }

  for (const field of fields) {
    field.set(argument);
  }
  await Promise.all(
    documents.map((document) =>
      Deno.writeTextFile(
        document.path,
        `${JSON.stringify(document.content, null, 2)}\n`,
      )
    ),
  );
  console.log(`Updated ${fields.length} plugin version fields to ${argument}.`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  Deno.exitCode = 1;
}
