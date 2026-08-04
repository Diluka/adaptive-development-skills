#!/usr/bin/env -S deno run --allow-read

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const INLINE_MARKDOWN_LINK =
  /\]\(\s*(?:<([^>\n]+)>|([^\s)]+))(?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^)\n]*\)))?\s*\)/g;
const REFERENCE_DEFINITION =
  /^[ \t]{0,3}\[[^\]\n]+\]:[ \t]*(?:<([^>\n]+)>|(\S+))(?:[ \t]+(?:"[^"\n]*"|'[^'\n]*'|\([^)\n]*\)))?[ \t]*$/gm;
const INTERNAL_SKILL_PATH = /^\.\.\/[a-z0-9]+(?:-[a-z0-9]+)*\/SKILL\.md$/;

function repositoryRoot(argument?: string): string {
  if (argument) {
    return resolve(argument);
  }
  return resolve(dirname(fileURLToPath(import.meta.url)), "..");
}

async function isDirectory(path: string): Promise<boolean> {
  try {
    return (await Deno.stat(path)).isDirectory;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

async function isFile(path: string): Promise<boolean> {
  try {
    return (await Deno.stat(path)).isFile;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

async function skillFiles(root: string): Promise<string[]> {
  const skillsDirectory = resolve(root, "skills");
  if (!(await isDirectory(skillsDirectory))) {
    throw new Error(`missing skills directory: ${skillsDirectory}`);
  }

  const files: string[] = [];
  for await (const entry of Deno.readDir(skillsDirectory)) {
    if (!entry.isDirectory || entry.name.startsWith(".")) {
      continue;
    }
    const skillFile = resolve(skillsDirectory, entry.name, "SKILL.md");
    if (await isFile(skillFile)) {
      files.push(skillFile);
    }
  }
  return files.sort();
}

function markdownDestinations(content: string): string[] {
  const destinations: string[] = [];
  for (const pattern of [INLINE_MARKDOWN_LINK, REFERENCE_DEFINITION]) {
    for (const match of content.matchAll(pattern)) {
      const destination = match[1] ?? match[2];
      if (destination !== undefined) {
        destinations.push(destination);
      }
    }
  }
  return destinations;
}

async function checkReferences(root: string): Promise<number> {
  const invalidErrors: string[] = [];
  const missingErrors: string[] = [];
  let referenceCount = 0;

  for (const skillFile of await skillFiles(root)) {
    const content = await Deno.readTextFile(skillFile);
    for (const destination of markdownDestinations(content)) {
      const path = destination.split("#", 1)[0];
      if (path.startsWith("../") && !INTERNAL_SKILL_PATH.test(path)) {
        invalidErrors.push(
          `${skillFile}: invalid internal skill reference ${destination}`,
        );
        continue;
      }
      if (!INTERNAL_SKILL_PATH.test(path)) {
        continue;
      }

      referenceCount += 1;
      if (!(await isFile(resolve(dirname(skillFile), path)))) {
        missingErrors.push(
          `${skillFile}: missing internal skill reference ${destination}`,
        );
      }
    }
  }

  const errors = [...invalidErrors, ...missingErrors];
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    return 1;
  }

  console.log(
    `Checked ${referenceCount} internal skill reference${
      referenceCount === 1 ? "" : "s"
    }.`,
  );
  return 0;
}

if (Deno.args.length === 1 && ["-h", "--help"].includes(Deno.args[0])) {
  console.log("Usage: check-cross-references.ts [repository-root]");
  Deno.exit(0);
}
if (Deno.args.length > 1) {
  console.error("Usage: check-cross-references.ts [repository-root]");
  Deno.exit(2);
}

try {
  Deno.exit(await checkReferences(repositoryRoot(Deno.args[0])));
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  Deno.exit(1);
}
