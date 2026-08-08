#!/usr/bin/env -S deno run --allow-read --allow-write

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import semver from "npm:semver@^7.6.0";

type Json = Record<string, unknown>;

type Release = "major" | "minor" | "patch";
const RELEASES: Release[] = ["major", "minor", "patch"];

// 本仓库定制：硬编码各 manifest 中需要同步的版本字段路径，不校验文件与格式。
const FILES: { file: string; paths: string[][] }[] = [
  { file: ".codex-plugin/plugin.json", paths: [["version"]] },
  { file: "plugin.json", paths: [["version"]] },
  {
    file: ".github/plugin/marketplace.json",
    paths: [
      ["metadata", "version"],
      ["plugins", "0", "version"],
    ],
  },
];
const USAGE = "Usage: bump-version.ts <major|minor|patch|x.y.z> | --check";

function get(json: Json, path: string[]): string {
  let value: unknown = json;
  for (const key of path) value = (value as Json)[key];
  return value as string;
}

function set(json: Json, path: string[], version: string): void {
  let value: unknown = json;
  for (let i = 0; i < path.length - 1; i++) value = (value as Json)[path[i]];
  (value as Json)[path[path.length - 1]] = version;
}

function isRelease(argument: string): argument is Release {
  return (RELEASES as string[]).includes(argument);
}

async function main(): Promise<void> {
  const [argument] = Deno.args;
  if (argument === undefined) {
    console.error(USAGE);
    Deno.exitCode = 2;
    return;
  }

  const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
  const docs = await Promise.all(
    FILES.map(async ({ file, paths }) => {
      const json = JSON.parse(
        await Deno.readTextFile(resolve(root, file)),
      ) as Json;
      return {
        file,
        json,
        paths,
        values: paths.map((path) => get(json, path)),
      };
    }),
  );
  const all = docs.flatMap((doc) => doc.values);

  if (argument === "--check") {
    if (new Set(all).size !== 1 || !all.every((v) => semver.valid(v))) {
      throw new Error(`Plugin versions are not aligned:\n${all.join("\n")}`);
    }
    console.log(`Plugin versions are aligned at ${all[0]}.`);
    return;
  }

  const current = semver.valid(all[0]);
  if (current === null) {
    throw new Error(`Invalid current version: ${all[0]}`);
  }
  const target = isRelease(argument)
    ? semver.inc(current, argument)
    : semver.valid(argument);
  if (target === null) {
    console.error(`Invalid version: ${argument}\n${USAGE}`);
    Deno.exitCode = 2;
    return;
  }

  for (const { json, paths } of docs) {
    for (const path of paths) set(json, path, target);
  }
  await Promise.all(
    docs.map(({ file, json }) =>
      Deno.writeTextFile(
        resolve(root, file),
        `${JSON.stringify(json, null, 2)}\n`,
      )
    ),
  );
  console.log(`Updated ${all.length} plugin version fields to ${target}.`);
}

try {
  await main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  Deno.exitCode = 1;
}
