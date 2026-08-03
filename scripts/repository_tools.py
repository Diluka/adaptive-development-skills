#!/usr/bin/env python3
from __future__ import annotations

import re
from pathlib import Path

import yaml
from yaml.nodes import MappingNode, Node, ScalarNode


SKILL_NAME = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
CJK_TEXT = re.compile(r"[\u3400-\u4dbf\u4e00-\u9fff]")
INLINE_MARKDOWN_LINK = re.compile(
    r"""
    \]\(\s*
    (?:<(?P<angle>[^>\n]+)>|(?P<plain>[^\s)]+))
    (?:\s+(?:"[^"\n]*"|'[^'\n]*'|\([^\)\n]*\)))?
    \s*\)
    """,
    re.VERBOSE,
)
REFERENCE_DEFINITION = re.compile(
    r"""
    ^[ \t]{0,3}\[[^\]\n]+\]:[ \t]*
    (?:<(?P<angle>[^>\n]+)>|(?P<plain>\S+))
    (?:[ \t]+(?:"[^"\n]*"|'[^'\n]*'|\([^\)\n]*\)))?
    [ \t]*$
    """,
    re.MULTILINE | re.VERBOSE,
)
INTERNAL_SKILL_PATH = re.compile(
    r"\.\./[a-z0-9]+(?:-[a-z0-9]+)*/SKILL\.md"
)
OPENAI_REQUIRED_FIELDS = {"display_name", "short_description", "default_prompt"}


class ValidationError(ValueError):
    pass


def repository_root(argument: str | None, script_file: str) -> Path:
    if argument:
        return Path(argument).resolve()
    return Path(script_file).resolve().parents[1]


def skill_files(root: Path) -> list[Path]:
    skills_dir = root / "skills"
    if not skills_dir.is_dir():
        raise ValidationError(f"missing skills directory: {skills_dir}")

    files: list[Path] = []
    for entry in sorted(skills_dir.iterdir()):
        if not entry.is_dir() or entry.name.startswith("."):
            continue
        skill_file = entry / "SKILL.md"
        if not skill_file.is_file():
            raise ValidationError(f"skill directory has no SKILL.md: {entry}")
        files.append(skill_file)
    return files


def parse_frontmatter(skill_file: Path) -> tuple[dict[str, object], str]:
    content = skill_file.read_text(encoding="utf-8")
    lines = content.splitlines()
    if not lines or lines[0] != "---":
        raise ValidationError(f"{skill_file}: frontmatter must start with ---")

    try:
        closing_index = lines.index("---", 1)
    except ValueError as error:
        raise ValidationError(f"{skill_file}: frontmatter has no closing ---") from error

    raw_frontmatter = "\n".join(lines[1:closing_index])
    try:
        document = yaml.compose(raw_frontmatter, Loader=yaml.SafeLoader)
        metadata = yaml.safe_load(raw_frontmatter)
    except yaml.YAMLError as error:
        raise ValidationError(f"{skill_file}: invalid YAML frontmatter: {error}") from error
    if not isinstance(document, MappingNode) or not isinstance(metadata, dict):
        raise ValidationError(f"{skill_file}: frontmatter must be a YAML mapping")
    _, structure_errors = _mapping_entries(document, skill_file, "frontmatter")
    if structure_errors:
        raise ValidationError(structure_errors[0])
    if any(not isinstance(key, str) for key in metadata):
        raise ValidationError(f"{skill_file}: frontmatter keys must be strings")

    body = "\n".join(lines[closing_index + 1 :]).strip()
    return metadata, body


def validate_skill_file(skill_file: Path) -> list[str]:
    errors: list[str] = []
    try:
        metadata, body = parse_frontmatter(skill_file)
    except (OSError, UnicodeError, ValidationError) as error:
        return [str(error)]

    extra_keys = sorted(set(metadata) - {"name", "description"})
    missing_keys = sorted({"name", "description"} - set(metadata))
    if missing_keys:
        errors.append(f"{skill_file}: missing frontmatter keys: {', '.join(missing_keys)}")
    if extra_keys:
        errors.append(f"{skill_file}: unsupported frontmatter keys: {', '.join(extra_keys)}")

    name_value = metadata.get("name", "")
    if not isinstance(name_value, str):
        errors.append(f"{skill_file}: name must be a string")
        name = ""
    else:
        name = name_value.strip()
    folder_name = skill_file.parent.name
    if not SKILL_NAME.fullmatch(folder_name):
        errors.append(f"{skill_file}: invalid skill folder name: {folder_name}")
    if name != folder_name:
        errors.append(f"{skill_file}: name '{name}' must match its folder '{folder_name}'")
    if len(name) > 64:
        errors.append(f"{skill_file}: name exceeds 64 characters")

    description_value = metadata.get("description", "")
    if not isinstance(description_value, str):
        errors.append(f"{skill_file}: description must be a string")
        description = ""
    else:
        description = description_value.strip()
    if not description.startswith("Use when"):
        errors.append(f"{skill_file}: description must start with 'Use when'")
    if not CJK_TEXT.search(description):
        errors.append(f"{skill_file}: description must include Chinese trigger text")
    if not description.strip():
        errors.append(f"{skill_file}: description must not be empty")
    if "<" in description or ">" in description:
        errors.append(f"{skill_file}: description must not contain angle brackets")
    if len(description) > 1024:
        errors.append(f"{skill_file}: description exceeds 1024 characters")
    if not body:
        errors.append(f"{skill_file}: skill body must not be empty")
    elif not CJK_TEXT.search(body):
        errors.append(f"{skill_file}: body must contain Chinese rules")
    errors.extend(validate_openai_metadata(skill_file, name))
    return errors


def validate_openai_metadata(skill_file: Path, skill_name: str) -> list[str]:
    metadata_file = skill_file.parent / "agents" / "openai.yaml"
    if not metadata_file.is_file():
        return [f"{metadata_file}: missing OpenAI agent metadata"]

    try:
        content = metadata_file.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as error:
        return [f"{metadata_file}: {error}"]

    try:
        document = yaml.compose(content, Loader=yaml.SafeLoader)
    except yaml.YAMLError as error:
        return [f"{metadata_file}: invalid YAML: {error}"]

    if not isinstance(document, MappingNode):
        return [f"{metadata_file}: metadata must be a YAML mapping"]

    top_level, errors = _mapping_entries(document, metadata_file, "top-level")
    for block_name in ("dependencies", "policy"):
        block = top_level.get(block_name)
        if block is not None and not isinstance(block, MappingNode):
            errors.append(f"{metadata_file}: {block_name} must be a YAML mapping")

    interface = top_level.get("interface")
    if interface is None:
        errors.append(f"{metadata_file}: missing interface mapping")
        interface_fields: dict[str, Node] = {}
    elif not isinstance(interface, MappingNode):
        errors.append(f"{metadata_file}: interface must be a YAML mapping")
        interface_fields = {}
    else:
        interface_fields, interface_errors = _mapping_entries(
            interface, metadata_file, "interface"
        )
        errors.extend(interface_errors)

    fields: dict[str, str] = {}
    for key, value_node in interface_fields.items():
        if (
            not isinstance(value_node, ScalarNode)
            or value_node.tag != "tag:yaml.org,2002:str"
            or value_node.style != '"'
        ):
            errors.append(
                f"{metadata_file}: interface field {key} must be a double-quoted string"
            )
            continue
        fields[key] = value_node.value

    missing_fields = sorted(OPENAI_REQUIRED_FIELDS - set(fields))
    if missing_fields:
        errors.append(
            f"{metadata_file}: missing interface fields: {', '.join(missing_fields)}"
        )

    display_name = fields.get("display_name", "")
    if "display_name" in fields and not display_name.strip():
        errors.append(f"{metadata_file}: display_name must not be empty")

    short_description = fields.get("short_description", "")
    if "short_description" in fields and not 25 <= len(short_description) <= 64:
        errors.append(
            f"{metadata_file}: short_description must be 25-64 characters"
        )

    default_prompt = fields.get("default_prompt", "")
    skill_token = re.compile(rf"\${re.escape(skill_name)}(?![A-Za-z0-9_-])")
    if "default_prompt" in fields and not skill_token.search(default_prompt):
        errors.append(
            f"{metadata_file}: default_prompt must mention ${skill_name}"
        )
    return errors


def _mapping_entries(
    node: MappingNode, metadata_file: Path, context: str
) -> tuple[dict[str, Node], list[str]]:
    entries: dict[str, Node] = {}
    errors: list[str] = []
    for key_node, value_node in node.value:
        if (
            not isinstance(key_node, ScalarNode)
            or key_node.tag != "tag:yaml.org,2002:str"
        ):
            errors.append(f"{metadata_file}: {context} keys must be strings")
            continue
        key = key_node.value
        if key in entries:
            errors.append(f"{metadata_file}: duplicate {context} key: {key}")
            continue
        entries[key] = value_node
    return entries, errors


def _read_markdown(skill_file: Path) -> str:
    try:
        return skill_file.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as error:
        raise ValidationError(f"{skill_file}: {error}") from error


def _markdown_destinations(content: str) -> list[str]:
    destinations: list[str] = []
    for pattern in (INLINE_MARKDOWN_LINK, REFERENCE_DEFINITION):
        destinations.extend(
            match.group("angle") or match.group("plain")
            for match in pattern.finditer(content)
        )
    return destinations


def collect_internal_references(skill_file: Path) -> list[tuple[str, Path]]:
    content = _read_markdown(skill_file)
    return [
        (destination, (skill_file.parent / path).resolve())
        for destination in _markdown_destinations(content)
        if INTERNAL_SKILL_PATH.fullmatch(path := destination.split("#", 1)[0])
    ]


def collect_invalid_internal_references(skill_file: Path) -> list[str]:
    content = _read_markdown(skill_file)
    return [
        destination
        for destination in _markdown_destinations(content)
        if (path := destination.split("#", 1)[0]).startswith("../")
        and not INTERNAL_SKILL_PATH.fullmatch(path)
    ]
