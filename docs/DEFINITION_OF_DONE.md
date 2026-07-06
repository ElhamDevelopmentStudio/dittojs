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
- Generator resolves semantic file slots through the selected project structure adapter.
- Files are written correctly.
- package.json is generated correctly.
- README is generated or updated correctly.
- ditto.generated.json is generated correctly.
- ditto.generated.json includes the selected project structure when one is selected.
- Generated package.json declares the supported Node.js range.
- Generated dependency ranges come from the catalog policy and do not use latest, *, or empty strings.
- Unsafe paths are rejected.
- File collisions are handled.
- Generated fixtures pass install/typecheck/build.
```

Generated fixture validation must regenerate templates from tracked fixture recipes, catalog manifests, registry templates, resolver code, and generator code. Full generated app output does not need to be committed when it is ignored, but CI must run `pnpm generate:fixtures` and `pnpm test:generated`.

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

The generated fixture may be produced during CI instead of committed as full app output. The recipe fixture and source inputs remain the tracked source of truth.

## UI Definition of Done

UI changes are done only when:

```txt
- UI reads resolver output.
- UI does not hardcode dependency rules.
- Explicit user selections and effective selections remain separate.
- Locked dependencies are explained.
- Conflicts are actionable.
- Recommended defaults are clear.
- Coming soon options are disabled and do not update state.
- Every enabled action works or is removed.
- JSON manifest viewing works from the resolved recipe.
- Copy CLI writes the current command to the clipboard.
- Generation loading, success, and error states are handled.
- Download ZIP is wired to the real archive response after generation.
- Advanced options are hidden until requested.
- Empty/loading/error states are handled.
- Keyboard/accessibility basics are considered.
- Manual UI review is complete if required.
```

Web builder UI changes are not done if auth, saved templates, pricing, or AI
recommendations are presented as enabled behavior before those systems exist.

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
- Package versions are centralized in the catalog version policy.
- Caret ranges are used by default; exact pins include a documented reason.
- Generated templates do not use latest, *, or empty dependency versions.
- Tailwind output uses Tailwind v4 with @tailwindcss/vite, not PostCSS/autoprefixer or legacy Tailwind v3 directives.
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
