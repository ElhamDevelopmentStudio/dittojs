
# DittoJs Architecture

## Overview

DittoJs is a manifest-driven template generation platform.

The system is built around four core ideas:

1. Manifests describe what exists.
2. The resolver determines what is selected, required, locked, or conflicting.
3. The generator turns a resolved recipe into project files.
4. The UI displays resolver output and lets the user modify user selections.

The UI must not contain business logic about dependencies.

## Core architecture rule

The resolver is the only source of truth for dependency logic.

The UI can display:

- selected modules
- auto-selected modules
- locked modules
- conflicts
- warnings
- defaults
- package summaries

But the UI must not decide these things itself.

## High-level data flow

```txt
User selections
   ↓
Preset defaults
   ↓
Recipe normalization
   ↓
Resolver
   ↓
ResolvedRecipe
   ↓
Generator
   ↓
Generated project files
   ↓
ZIP/download/saved template
````

## Recommended monorepo structure

```txt
dittojs/
  apps/
    web/
    api/

  packages/
    core/
      schema/
      resolver/
      graph/
      compatibility/

    generator/
      writer/
      recipe/
      package-json/
      files/
      structure/

    catalog/
      frameworks/
      styling/
      ui-libraries/
      components/
      blocks/
      forms/
      validation/
      state/
      http/
      project-structures/
      presets/

    registry/
      shadcn/
      themes/
      blocks/

    ui/
      shared/

    testing/
      fixtures/
      helpers/

  fixtures/
    recipes/
    generated/

  docs/

  .github/
    workflows/
```

## Packages

### `packages/core`

Contains the manifest schema, recipe types, resolver, graph logic, conflict detection, lock calculation, and validation.

This package should not depend on React or the web app.

### `packages/catalog`

Contains the available modules:

* frameworks
* styling systems
* component libraries
* primitive components
* composite components
* blocks
* form engines
* validation libraries
* state libraries
* HTTP clients
* project structures
* presets

The catalog is data, not generation logic.

### `packages/generator`

Turns a resolved recipe into a project folder.

Responsibilities:

* Write files.
* Resolve project structure slots.
* Merge package dependencies.
* Generate config files.
* Generate metadata.
* Generate README.
* Protect against unsafe output paths.

### `apps/web`

The web builder interface.

Responsibilities:

* Let users select presets and options.
* Call the resolver.
* Display resolver output.
* Trigger generation.
* Provide download.
* Later support saved templates and AI recommendations.

### `apps/api`

Optional backend for generation, saved templates, auth, and future AI recommendation flows.

For early MVP, generation can be local/server-side depending on deployment needs.

## Key domain concepts

### Module

A module is any selectable or resolvable unit.

Examples:

* `framework.react`
* `styling.tailwind`
* `ui.shadcn`
* `component.button`
* `block.navbar`
* `form.react-hook-form`
* `validation.zod`

### Capability

A capability is something a module provides.

Examples:

* `framework.react`
* `styling.tailwind`
* `component-library.shadcn`
* `ui.button`
* `ui.input`
* `form.engine`
* `validation.schema`

Requirements should usually target capabilities, not hardcoded module IDs.

### Requirement

A requirement says one module needs another capability or module.

Example:

```txt
ui.shadcn requires styling.tailwind
block.navbar requires ui.button
```

### Conflict

A conflict says two modules cannot coexist.

Example:

```txt
form.react-hook-form conflicts with form.tanstack-form
```

### Group

A group controls selection behavior.

Examples:

* exactly one form engine
* exactly one primary validator
* at most one primitive engine

### Preset

A preset is a predefined set of user selections and defaults.

A preset is not a separate generator.

## Non-negotiable architecture rules

1. The generator must be manifest-driven.
2. The UI must not hardcode dependency logic.
3. The resolver is the only source of truth for selected, locked, required, and conflicting modules.
4. Locks are derived from hard requirements.
5. Presets are pre-filled recipes, not separate generators.
6. AI recommendation output must resolve to a valid recipe.
7. Generated templates must be tested in CI.
8. No component or block can be added without manifest metadata.
9. No generated dependency can be added without a package manifest entry.
10. The generator must never rely on hidden global state.
11. User selections and resolved selections must be stored separately.
12. Auto-selected dependencies must not be persisted as direct user intent.
13. Generated output must include Ditto metadata.
14. New adapters should not break existing adapters.
15. Compatibility should be expressed through manifests, not scattered conditionals.

## User selections vs resolved selections

User selections represent explicit user intent.

Resolved selections represent everything included after applying presets, defaults, dependencies, and compatibility rules.

Example:

```ts
const userSelections = ["block.navbar"]

const resolvedSelections = [
  "block.navbar",
  "component.button",
  "component.input",
  "component.avatar",
  "component.dropdown",
  "ui.shadcn",
  "styling.tailwind"
]
```

The user selected only Navbar.

The resolver added the rest.

## Locking model

There is no independent manual lock system.

Locks are derived from active hard requirements.

Example:

```txt
shadcn requires Tailwind
Navbar requires Button
Navbar requires Input
```

Therefore:

```txt
Tailwind is locked while shadcn is selected.
Button is locked while Navbar requires it.
Input is locked while Navbar requires it.
```

When the parent is removed, the lock disappears unless another selected module still requires it.

## Extensibility model

Adding a new option should usually require:

1. Add a manifest.
2. Add files/templates if generation is needed.
3. Add tests.
4. Add catalog export.
5. Add preset integration if applicable.

It should not require rewriting the resolver.

## Anti-patterns

Do not:

* Put resolver logic inside React components.
* Store auto-selected dependencies as permanent user selections.
* Add one-off if/else logic for specific templates.
* Create static folders for every possible combination.
* Let AI-generated recommendations bypass the resolver.
* Add packages directly to generated package.json without catalog metadata.
* Treat generated projects as untested output.
* Hide dependency conflicts from users.
* Force login before generation.
