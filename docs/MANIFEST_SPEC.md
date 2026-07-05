
# DittoJs Manifest Specification

## Purpose

The manifest system describes every selectable and resolvable unit in DittoJs.

Every framework, styling system, UI library, primitive component, block, form engine, validator, preset, project structure, and adapter must be represented by manifest data.

The resolver and generator use manifests as their source of truth.

## Manifest goals

Manifests must allow DittoJs to understand:

- What a module is.
- What it provides.
- What it requires.
- What it conflicts with.
- What files it generates.
- What packages it installs.
- What group it belongs to.
- What defaults it applies.
- How it should appear in the UI.

## Module ID naming

Use dot-separated IDs.

Examples:

```txt
framework.react
framework.next
styling.tailwind
ui.shadcn
primitive-engine.base-ui
primitive-engine.radix-ui
component.button
component.input
block.navbar
form.react-hook-form
form.tanstack-form
validation.zod
validation.yup
state.zustand
http.axios
structure.react.simple
preset.react-recommended
````

IDs should be stable. Avoid renaming IDs after release.

## Capability naming

Capabilities should also use dot-separated names.

Examples:

```txt
framework.react
styling.tailwind
component-library.shadcn
primitive-engine.base-ui
ui.button
ui.input
ui.avatar
ui.dropdown
ui.sheet
form.engine
validation.schema
state.client
http.client
block.navbar
project.structure
```

Requirements should prefer capabilities over direct module IDs.

Good:

```txt
block.navbar requires ui.button
```

Less flexible:

```txt
block.navbar requires component.button.shadcn
```

## TypeScript reference types

```ts
export type ModuleType =
  | "framework"
  | "styling"
  | "ui-library"
  | "primitive-engine"
  | "primitive"
  | "composite"
  | "block"
  | "form-engine"
  | "validation"
  | "state"
  | "http"
  | "adapter"
  | "project-structure"
  | "preset"
  | "tooling"

export type RequirementStrength = "hard" | "soft"

export type Requirement = {
  capability?: string
  moduleId?: string
  reason: string
  strength?: RequirementStrength
}

export type Conflict = {
  moduleId?: string
  capability?: string
  reason: string
}

export type GroupMode = "exactly-one" | "at-most-one" | "at-least-one"

export type ProviderGroup = {
  id: string
  mode: GroupMode
  label?: string
}

export type PackageSet = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

export type DirectFileMapping = {
  from: string
  to: string
  when?: string
}

export type SlotFileMapping = {
  from: string
  slot: string
  name: string
  feature?: string
  route?: string
  when?: string
}

export type FileMapping = DirectFileMapping | SlotFileMapping

export type UiMetadata = {
  label: string
  description?: string
  recommended?: boolean
  hidden?: boolean
  category?: string
  tags?: string[]
}

export type ModuleManifest = {
  id: string
  type: ModuleType

  label: string
  description?: string

  provides?: string[]
  requires?: Requirement[]
  conflicts?: Conflict[]

  group?: ProviderGroup

  packages?: PackageSet

  files?: FileMapping[]

  defaults?: Record<string, string>

  ui?: UiMetadata

  metadata?: Record<string, unknown>
}
```

## Required fields

Every module must include:

```ts
id
type
label
```

## `provides`

`provides` declares capabilities satisfied by the module.

Example:

```ts
{
  id: "styling.tailwind",
  type: "styling",
  label: "Tailwind CSS",
  provides: ["styling.tailwind"]
}
```

Example:

```ts
{
  id: "component.button",
  type: "primitive",
  label: "Button",
  provides: ["ui.button"]
}
```

## `requires`

`requires` declares dependencies.

Example:

```ts
{
  id: "ui.shadcn",
  type: "ui-library",
  label: "shadcn",
  provides: ["component-library.shadcn"],
  requires: [
    {
      capability: "styling.tailwind",
      reason: "shadcn components require Tailwind CSS.",
      strength: "hard"
    }
  ]
}
```

Hard requirements create locked derived selections.

Soft requirements may be shown as recommendations but should not lock the dependency.

## `conflicts`

`conflicts` declares incompatible modules or capabilities.

Example:

```ts
{
  id: "form.react-hook-form",
  type: "form-engine",
  label: "React Hook Form",
  provides: ["form.engine"],
  conflicts: [
    {
      capability: "form.engine",
      reason: "Only one primary form engine can be selected."
    }
  ]
}
```

The resolver should avoid treating a module as conflicting with itself.

## `group`

Groups control selection behavior.

Example:

```ts
{
  id: "form.react-hook-form",
  type: "form-engine",
  label: "React Hook Form",
  group: {
    id: "form-engine",
    mode: "exactly-one",
    label: "Form engine"
  }
}
```

Common groups:

```txt
framework
styling
ui-library
primitive-engine
form-engine
validation-schema
state-client
http-client
```

## `packages`

Packages define dependencies to include in generated `package.json`.

Example:

```ts
{
  id: "state.zustand",
  type: "state",
  label: "Zustand",
  provides: ["state.client"],
  packages: {
    dependencies: {
      "zustand": "latest"
    }
  }
}
```

Version strategy should be centralized later. Early MVP may use `latest`, but generated templates should eventually pin versions through lockfiles.

## `files`

Files define template file mappings.

Direct example:

```ts
{
  id: "component.button",
  type: "primitive",
  label: "Button",
  files: [
    {
      from: "components/ui/button.tsx",
      to: "src/components/ui/button.tsx"
    }
  ]
}
```

Slot example:

```ts
{
  id: "component.button",
  type: "primitive",
  label: "Button",
  files: [
    {
      from: "components/ui/button.tsx",
      slot: "ui-component",
      name: "button"
    }
  ]
}
```

Use `to` for fixed root files such as `index.html` and `vite.config.ts`.

Use `slot` for files that should follow the selected project structure.

A file mapping must include either `to` or `slot`, not both. The generator must validate that direct `to` paths and resolved slot paths stay inside the output directory.

## `defaults`

Defaults are used when a user or preset chooses a higher-level option without choosing all sub-options.

Example:

```ts
{
  id: "ui.shadcn",
  type: "ui-library",
  label: "shadcn",
  defaults: {
    "primitive-engine": "primitive-engine.base-ui",
    "theme": "theme.neutral",
    "style": "style.nova"
  }
}
```

Defaults must be overridable by explicit user selections unless doing so creates a conflict.

## Example: shadcn requires Tailwind

```ts
export const shadcnManifest = {
  id: "ui.shadcn",
  type: "ui-library",
  label: "shadcn",
  description: "Copy-and-own UI components for React projects.",
  provides: ["component-library.shadcn"],
  requires: [
    {
      capability: "styling.tailwind",
      reason: "shadcn components require Tailwind CSS.",
      strength: "hard"
    }
  ],
  defaults: {
    "primitive-engine": "primitive-engine.base-ui"
  }
}
```

## Example: shadcn Button requires shadcn

```ts
export const buttonManifest = {
  id: "component.button",
  type: "primitive",
  label: "Button",
  provides: ["ui.button"],
  requires: [
    {
      capability: "component-library.shadcn",
      reason: "The Button component is generated from the selected shadcn component library.",
      strength: "hard"
    }
  ],
  files: [
    {
      from: "components/ui/button.tsx",
      to: "src/components/ui/button.tsx"
    }
  ]
}
```

## Example: Navbar block

```ts
export const navbarManifest = {
  id: "block.navbar",
  type: "block",
  label: "Navbar",
  provides: ["block.navbar"],
  requires: [
    {
      capability: "ui.button",
      reason: "Navbar uses Button for navigation actions.",
      strength: "hard"
    },
    {
      capability: "ui.input",
      reason: "Navbar uses Input for search.",
      strength: "hard"
    },
    {
      capability: "ui.avatar",
      reason: "Navbar uses Avatar for the user menu.",
      strength: "hard"
    },
    {
      capability: "ui.dropdown",
      reason: "Navbar uses Dropdown for account actions.",
      strength: "hard"
    }
  ],
  files: [
    {
      from: "blocks/navbar.tsx",
      to: "src/components/blocks/navbar.tsx"
    }
  ]
}
```

## Example: React Hook Form + Zod adapter

```ts
export const rhfZodAdapterManifest = {
  id: "adapter.form.react-hook-form.zod",
  type: "adapter",
  label: "React Hook Form + Zod",
  provides: [
    "form.adapter",
    "form.engine.react-hook-form",
    "validation.schema.zod"
  ],
  requires: [
    {
      moduleId: "form.react-hook-form",
      reason: "This adapter uses React Hook Form.",
      strength: "hard"
    },
    {
      moduleId: "validation.zod",
      reason: "This adapter uses Zod for validation.",
      strength: "hard"
    }
  ],
  packages: {
    dependencies: {
      "react-hook-form": "latest",
      "@hookform/resolvers": "latest",
      "zod": "latest"
    }
  },
  files: [
    {
      from: "forms/rhf-zod/form.tsx",
      to: "src/components/ui/form.tsx"
    }
  ]
}
```

## Manifest validation rules

A manifest is invalid if:

* It has no `id`.
* It has no `type`.
* It has no `label`.
* It requires neither a capability nor a moduleId in a requirement.
* It has duplicate provided capabilities within the same manifest.
* It maps files outside the project output.
* It belongs to a group with an invalid mode.
* It references a missing moduleId.
* It references a capability that no module provides, unless explicitly allowed as external.

## Guiding rule

Every meaningful product behavior should be expressible through manifests, resolver rules, or generator rules.

Avoid one-off logic.
