# DittoJs AI Development Workflow

## Purpose

DittoJs is intended to be developed primarily with AI coding agents, with human manual review focused on product direction, UI/UX, and final approval.

This document defines how AI agents should work in the repository.

## Core idea

AI can write most of the implementation.

Specs, tests, CI, and human review control correctness.

## AI agent rules

1. Do not expand scope beyond the assigned issue.
2. Read the relevant docs before editing code.
3. Prefer small, typed, testable modules.
4. Do not hardcode dependency logic in the UI.
5. Do not add dependencies without updating manifests.
6. Do not add components without manifests.
7. Do not add blocks without declaring dependencies.
8. Do not bypass the resolver.
9. Do not update generated snapshots without explaining why.
10. Do not hide failing tests.
11. Do not remove tests to make CI pass.
12. Do not introduce one-off template combinations.
13. Do not store auto-selected dependencies as user selections.
14. Do not let AI recommendation logic generate arbitrary project files.
15. Keep generated code clean and readable.

## Required reading by task type

### Resolver task

Read:

```txt
docs/ARCHITECTURE.md
docs/MANIFEST_SPEC.md
docs/RESOLVER_SPEC.md
docs/TESTING_STRATEGY.md
docs/DEFINITION_OF_DONE.md
```

### Generator task

Read:

```txt
docs/ARCHITECTURE.md
docs/GENERATOR_SPEC.md
docs/MANIFEST_SPEC.md
docs/TESTING_STRATEGY.md
docs/DEFINITION_OF_DONE.md
```

### UI task

Read:

```txt
docs/UI_UX_PRINCIPLES.md
docs/RESOLVER_SPEC.md
docs/ARCHITECTURE.md
docs/DEFINITION_OF_DONE.md
```

### Catalog/component task

Read:

```txt
docs/MANIFEST_SPEC.md
docs/COMPONENT_REGISTRY_SPEC.md
docs/RESOLVER_SPEC.md
docs/TESTING_STRATEGY.md
```

### Preset task

Read:

```txt
docs/PRESET_SPEC.md
docs/RESOLVER_SPEC.md
docs/TESTING_STRATEGY.md
```

## Issue workflow

Every implementation should start from a specific issue.

A good issue includes:

```txt
Goal
User value
Scope
Out of scope
Relevant docs
Acceptance criteria
Required tests
Manual UI review needed or not
```

## Branch workflow

1. Create a branch for the issue.
2. Implement only the issue scope.
3. Add or update tests.
4. Run local checks.
5. Open PR.
6. Fix CI failures.
7. Request human review.

## Pull request expectations

Every PR should include:

* Summary of changes.
* Tests added.
* Docs updated.
* Screenshots or preview link for UI changes.
* Generated fixture changes if applicable.
* Notes about any tradeoffs.

## AI implementation checklist

Before marking a task complete, verify:

```txt
- Acceptance criteria are satisfied.
- Tests were added or updated.
- TypeScript passes.
- Lint passes.
- Existing behavior was not broken.
- No unrelated files were changed.
- Docs were updated if behavior changed.
- Generated fixtures were updated if output changed.
```

## Preferred prompt style

Good AI prompt:

```txt
Implement resolver support for hard requirements.

Read:
- docs/MANIFEST_SPEC.md
- docs/RESOLVER_SPEC.md
- docs/DEFINITION_OF_DONE.md

Requirements:
- A module can require a capability.
- The resolver must find a provider.
- Required modules are added to effective selections.
- Required modules receive lock reasons.
- Requirements resolve transitively.
- Circular requirements return errors.

Acceptance criteria:
- Add tests for direct requirements.
- Add tests for transitive requirements.
- Add tests for circular requirements.
- All existing tests pass.
```

Bad AI prompt:

```txt
Make the generator smarter.
```

## Human role

The human reviewer should focus on:

* Product direction.
* UX clarity.
* Visual quality.
* Feature usefulness.
* Final approval.
* Merge decisions.

The human reviewer does not need to manually inspect every line if CI, tests, and PR summaries are strong.

## AI anti-patterns

Do not:

* Solve future milestones inside current tasks.
* Add big abstractions without tests.
* Hardcode specific examples into core logic.
* Change public types without updating docs.
* Make generated code overly clever.
* Remove user control.
* Hide dependency rules in React components.

## Golden rule

AI implements. Specs and tests govern. CI enforces. Human approves.
