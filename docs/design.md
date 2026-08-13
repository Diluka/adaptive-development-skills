# Design: a method toolbox, not a meta-workflow

## Problem

Programming agents already receive task planning, authorization, tool-use, collaboration and completion rules from their host and target repository. Repackaging those rules as an always-on Skill creates a second control plane. When a repository adds both a macro workflow router and a micro execution router, a simple task can be classified, split, graded, planned, routed, verified, reviewed and delivered before the agent addresses the requested result.

That behavior is not adaptive. It optimizes compliance with the package's process model and can override better judgment available from the current user request, repository and runtime.

## Product boundary

Adaptive Development Skills is a toolbox of independently discoverable methods. A Skill earns a public entry when all of these are true:

1. A user can name the problem in natural language and locate the Skill without first learning this repository's ontology.
2. The Skill contributes non-obvious knowledge, a distinct feedback loop, or a fragile repeatable operation.
3. Its trigger is narrower than “do software work” and distinguishable from neighboring Skills.
4. The Skill can complete its method or hand directly to the neighboring method that owns the next concrete problem.

General planning, risk classification, authorization, agent delegation and default Git delivery do not satisfy this boundary. The host agent, user and target repository already own them. When no specialized Skill matches, direct implementation and proportionate verification are the correct path.

## Capability model

The package contains four kinds of capability:

| Kind | Purpose | Examples |
|---|---|---|
| Development methods | Shape how intent becomes an implementation | SDD, BDD, type-driven design |
| Test and evaluation methods | Produce evidence with a specialized feedback loop | property testing, CDC, characterization/approval, eval-driven development |
| Investigation methods | Resolve a particular form of uncertainty | debugging, system understanding, contract verification, exploration |
| Bounded operations | Safely perform an explicitly applicable operation | documentation, maintenance, worktrees, review, branch finishing, delivery |

Skills may link to one another when evidence changes the problem shape. For example, exploration that produces a stable symptom links directly to systematic debugging; a stable complex behavior links to characterization testing; a probability-quality problem links to eval-driven development. There is no universal return layer.

## Content budget

Length is not the deletion criterion. A long method can be valuable when every section supports its unique loop. Content should be removed or relocated when it:

- repeats host or repository policy;
- routes every task through package-specific terminology;
- duplicates the same authorization, planning, review or Git rule across Skills;
- records implementation history instead of execution knowledge;
- prescribes a process without identifying what error or uncertainty it catches.

Frontmatter carries discovery. `SKILL.md` carries the core method and resource routing. Conditional detail belongs in `resources/`; deterministic repeated work belongs in `scripts/`; UI metadata belongs in `agents/`.

## Direct path

The absence of a matching Skill is intentional. Examples include a literal text edit, a one-to-one configuration change, a simple field wiring, a directly checkable documentation correction or an ordinary implementation for which the request and repository already provide sufficient constraints.

The package should not invent a fallback Skill for these tasks. The agent uses its base capabilities, follows the target repository, verifies the requested result and reports the evidence.

## Authorization and delivery

A method never expands authority. Read-only investigation, local code changes, commits, pushes, PR/MR creation, merge, release, deployment, production data and external communication are distinct results. Skills that teach worktrees, branch finishing or delivery activate for those concrete problems and execute only the stage authorized by the user and target repository.

## Validation model

Static validation proves package structure and references. Behavior changes require representative scenarios that check discovery and restraint:

- a positive task selects the intended specialized Skill;
- a neighboring task selects a different Skill;
- a simple task selects no meta-workflow and proceeds directly;
- a boundary or missing prerequisite produces a useful handoff or constrained answer.

Fresh Agent observations are heuristic evidence because installed runtime rules can also influence behavior. Record the prompt, expected Skill choice, observed choice, useful result and any unwanted ceremony, then improve triggers from repeated real usage.

## Evolution rule

Add or split a Skill only after concrete user questions demonstrate a stable responsibility. Merge Skills when users cannot distinguish their problem boundaries and the methods share one feedback loop. Promote a resource to an independent Skill when it has a direct trigger and complete method of its own, as with Characterization / Approval Testing and Eval-Driven Development.
