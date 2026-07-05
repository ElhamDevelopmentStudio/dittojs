# DittoJs Definition of Done

## Purpose

This document defines when a task, feature, or pull request is considered complete.

A task is not complete just because code was written.

## General Definition of Done

A PR is done only when:

```txt
- The assigned scope is complete.
- Acceptance criteria are satisfied.
- Tests were added or updated.
- TypeScript passes.
- Lint passes.
- Build passes.
- Existing behavior is not broken.
- Docs are updated if behavior changed.
- Generated fixtures are updated if output changed.
- CI passes.
- Manual UI review is complete if required.
````

## Resolver Definition of Done

Resolver changes are done only when:

```txt
- User selections and effective selections remain separate.
- Hard requirements are resolved.
- Transitive requirements are handled.
- Lock reasons are returned.
- Conflicts are detected.
- Defaults are applied correctly.
- Groups are enforced.
- Missing providers are handled.
- Ambiguous providers are handled.
- Circular dependencies are handled.
- Tests cover the new behavior.
```

Resolver changes must not introduce UI-specific logic.

## Manifest Definition of Done

Manifest changes are done only when:

```txt
- Manifest has valid ID, type, and label.
- Provided capabilities are declared.
- Required capabilities/modules are declared.
- Conflicts are declared if applicable.
- Group membership is declared if applicable.
- Packages are declared if needed.
- Files are declared if generated output is needed.
- Catalog exports are updated.
- Integrity tests pass.
```

## Component or Block Definition of Done

A component or block is done only when:

```txt
- It has a manifest.
- It declares all required dependencies.
- It declares provided capabilities.
- It includes all required source files.
- It does not depend on undeclared files.
- It renders in generated templates.
- It typechecks.
- It builds.
- It has fixture coverage or tests.
```

## Generator Definition of Done

Generator changes are done only when:

```txt
- Generator accepts a resolved recipe.
- Generator does not resolve dependencies itself.
- Files are written correctly.
- package.json is generated correctly.
- README is generated or updated correctly.
- ditto.generated.json is generated correctly.
- Unsafe paths are rejected.
- File collisions are handled.
- Generated fixtures pass install/typecheck/build.
```

## Preset Definition of Done

A preset is done only when:

```txt
- It is defined as selections/defaults, not a separate generator.
- It resolves successfully.
- It generates successfully.
- It has a recipe fixture.
- It has a generated fixture.
- Generated output installs.
- Generated output typechecks.
- Generated output builds.
- UI summary is accurate.
```

## UI Definition of Done

UI changes are done only when:

```txt
- UI reads resolver output.
- UI does not hardcode dependency rules.
- Locked dependencies are explained.
- Conflicts are actionable.
- Recommended defaults are clear.
- Advanced options are hidden until requested.
- Empty/loading/error states are handled.
- Keyboard/accessibility basics are considered.
- Manual UI review is complete if required.
```

## Testing Definition of Done

Testing is done only when:

```txt
- New behavior has tests.
- Important edge cases are covered.
- Tests fail before the fix when practical.
- Tests pass after the fix.
- Generated templates are tested when output changes.
```

## Documentation Definition of Done

Docs are done only when:

```txt
- New concepts are documented.
- Changed behavior is documented.
- Examples are updated.
- Architecture rules remain accurate.
- AI workflow instructions remain accurate.
```

## Dependency Definition of Done

Dependency changes are done only when:

```txt
- Dependency is justified.
- Manifest package entries are updated.
- Lockfile is updated if applicable.
- DittoJs builds.
- Generated templates build.
- No unused dependency is added.
```

## Manual UI review checklist

For UI-facing changes, manually verify:

```txt
1. Is the screen understandable?
2. Are defaults obvious?
3. Are advanced options hidden until needed?
4. Are locked dependencies explained?
5. Can the user recover from mistakes?
6. Are conflicts actionable?
7. Does the stack summary match selections?
8. Does the experience feel trustworthy?
```

## Final merge rule

Do not merge unless:

```txt
- CI passes.
- Required review is complete.
- The PR scope is satisfied.
- No known blocking issue remains.
```
