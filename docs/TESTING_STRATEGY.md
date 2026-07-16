# DittoJs Testing Strategy

## Testing goal

DittoJs must test both the generator and the projects it generates.

It is not enough for DittoJs itself to build.

The generated templates must also install, typecheck, and build.

## Core testing principle

Test DittoJs and test DittoJs output.

## Test layers

```txt
1. Schema tests
2. Resolver unit tests
3. Catalog integrity tests
4. Generator unit tests
5. Generated fixture tests
6. Web UI component tests
7. End-to-end tests
8. Dependency update CI tests
```

## Schema tests

Schema tests verify that manifests are valid.

Test:

* required fields
* invalid IDs
* invalid group modes
* invalid requirements
* missing referenced module IDs
* unsafe file paths
* duplicate IDs
* duplicate provided capabilities where invalid

## Resolver tests

Resolver tests are critical.

Required cases:

```txt
Selecting shadcn selects Tailwind.
Selecting shadcn locks Tailwind.
Removing shadcn unlocks Tailwind.
Selecting Button selects shadcn.
Selecting Navbar selects Button, Input, Avatar, and Dropdown.
Button remains locked while Navbar requires it.
Button unlocks when Navbar is removed.
Button stays selected if manually selected.
React Hook Form conflicts with TanStack Form.
Zod and Yup cannot both be selected as primary validators.
Defaults are applied when no explicit choice exists.
Explicit user selections override defaults.
Missing providers return clear errors.
Ambiguous providers return clear conflicts.
Circular dependencies return clear errors.
Packages are collected.
Files are collected.
File collisions are detected.
```

## Catalog integrity tests

Catalog tests verify that all manifests work together.

Test:

* all module IDs are unique
* all capabilities are valid strings
* all direct module requirements reference existing modules
* all required capabilities have providers
* all file paths are safe
* all package maps are valid
* all manifest package entries use the central version policy
* catalog package version policy entries are concrete, non-latest, and caret by default unless explicitly documented
* all presets resolve successfully
* all MVP blocks resolve successfully

## Generator tests

Generator tests verify:

* output directory creation
* package.json writing
* config file writing
* source file writing
* README writing
* metadata writing
* generated package Node engine writing
* generated package version ranges
* Tailwind v4 Vite plugin wiring
* semantic project structure slot resolution
* direct file mappings alongside slot file mappings
* safe path protection
* file collision errors
* recipe input generation
* preset input generation

## Generated fixture tests

Generated fixtures must be tested as real projects.

Generated fixture outputs are produced during validation from tracked sources:

* fixture recipes in `fixtures/recipes`
* catalog manifests
* registry template files
* resolver behavior
* generator behavior

Full generated app output may stay ignored by git. CI must regenerate the output and validate it on every PR so stale committed files are not treated as proof.

For each important recipe:

```bash
pnpm --dir fixtures/generated/<name> install --ignore-workspace
pnpm --dir fixtures/generated/<name> --ignore-workspace typecheck
pnpm --dir fixtures/generated/<name> --ignore-workspace build
```

MVP fixtures:

```txt
react-recommended
react-recommended-simple
react-recommended-feature-based
react-recommended-route-colocated
saas-dashboard
chat-app
```

Later fixtures should add `custom-minimal` and `custom-maximal` once those presets have complete generated-output coverage.

Form fixtures later:

```txt
rhf-zod
rhf-yup
tanstack-zod
tanstack-yup
conform-zod
```

## Web UI tests

UI tests should verify:

* preset cards render
* selecting preset updates summary
* preset Create reaches review with a resolved recipe
* preset Customize reaches core configuration
* coming soon options are disabled and do not mutate selections
* selecting shadcn locks Tailwind
* selecting Navbar locks Button/Input/Avatar/Dropdown
* locked items cannot be deselected directly
* project structure selection overrides preset defaults
* conflicts are displayed
* advanced customization can be opened
* review screen shows correct stack
* create button is disabled on error conflicts
* JSON manifest modal opens with resolver output
* Copy CLI calls the clipboard API
* generation success reaches Success / Download
* generation failure shows Retry and Back to Review
* Download ZIP is backed by a generated archive response

The current MVP uses Vitest and Testing Library component/integration tests for
the browser flow. Playwright can be added later for full browser E2E coverage.

## Generation API tests

Generation API tests should verify:

* requests are resolved through `resolveRecipe`
* resolver conflicts are returned as blocking generation errors
* `generateProject` writes a real temporary project
* ZIP creation returns an `application/zip` archive
* returned metadata matches the resolved manifest used by the UI

## End-to-end tests

E2E tests should cover:

```txt
1. User selects React Recommended and reaches review.
2. User selects Custom and adds Navbar.
3. User sees Button/Input auto-selected and locked.
4. User removes Navbar and dependencies unlock.
5. User generates template.
6. User downloads ZIP or receives successful generation state.
```

## CI checks

Every PR should run:

```txt
pnpm install
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
pnpm generate:fixtures
pnpm test:generated
```

Use `pnpm test` as the supported repository test entrypoint. It builds workspace package dependencies before package-level Vitest runs and also runs root script tests. Direct root `vitest` invocation is not the supported entrypoint because workspace package exports resolve through built package output.

## Generated template CI

Generated templates should be tested independently.

Example:

```txt
fixtures/generated/react-recommended
fixtures/generated/saas-dashboard
fixtures/generated/chat-app
```

Each should:

```bash
pnpm --dir fixtures/generated/<name> install --ignore-workspace
pnpm --dir fixtures/generated/<name> --ignore-workspace typecheck
pnpm --dir fixtures/generated/<name> --ignore-workspace build
```

## Dependency update testing

When dependency update PRs are opened:

1. Update dependency.
2. Regenerate fixtures.
3. Install generated templates.
4. Typecheck generated templates.
5. Build generated templates.
6. Run smoke tests.
7. Require manual review for risky updates.

## Snapshot testing

Resolver output snapshots may be used for important presets.

Snapshots should not replace behavioral assertions.

Use snapshots for:

* package output
* file output
* resolved recipe summaries

Use direct assertions for:

* locks
* conflicts
* dependencies
* required modules

## Manual testing

Manual testing should focus on UI/UX.

Manual reviewer should check:

* clarity
* visual hierarchy
* locked dependency explanations
* advanced customization flow
* conflict messages
* generated stack summary
* overall trust

## Definition of reliable generation

A generated template is reliable when:

* It installs.
* It typechecks.
* It builds.
* It has no unused required imports.
* Its README matches the generated stack.
* Its metadata matches the recipe.
* Its `package.json` uses concrete caret ranges from the catalog policy.
* Its `package.json` declares `engines.node` as `^20.19.0 || >=22.12.0`.
* Its Tailwind setup uses `@tailwindcss/vite` and `@import "tailwindcss";`, with no PostCSS/autoprefixer or legacy Tailwind v3 directives.
