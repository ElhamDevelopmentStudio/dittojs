# DittoJs Component Registry Specification

## Purpose

The component registry stores the component and block source templates used by the generator.

The registry must support primitives, composites, and blocks.

## Component categories

### Primitive components

Primitive components are low-level UI pieces.

Examples:

- Button
- Input
- Textarea
- Label
- Avatar

### Composite components

Composite components combine primitives or wrap behavior.

Examples:

- Dropdown
- Sheet
- Form
- Dialog
- Command Menu

### Blocks

Blocks are larger reusable UI sections composed of primitives and composites.

Examples:

- Navbar
- Sidebar
- Messaging Input
- Typing Indicator
- Online Presence Circle
- Auth Form
- Settings Form
- Dashboard Shell

## Registry structure

Recommended structure:

```txt
packages/registry/
  shadcn/
    components/
      button/
        manifest.ts
        files/
          button.tsx

      input/
        manifest.ts
        files/
          input.tsx

    blocks/
      navbar/
        manifest.ts
        files/
          navbar.tsx

      sidebar/
        manifest.ts
        files/
          sidebar.tsx

    forms/
      rhf-zod/
        manifest.ts
        files/
          form.tsx
          example-form.tsx

    themes/
      nova/
      maia/
      lyra/
````

## Registry module requirement

Every component or block must have:

* A manifest.
* Source files.
* Package dependencies if needed.
* Required capabilities.
* Provided capabilities.
* Tests where appropriate.

## Primitive component manifest example

```ts
export const buttonManifest = {
  id: "component.button",
  type: "primitive",
  label: "Button",
  provides: ["ui.button"],
  requires: [
    {
      capability: "component-library.shadcn",
      reason: "Button is generated from the selected shadcn component library.",
      strength: "hard"
    }
  ],
  files: [
    {
      from: "shadcn/components/button/files/button.tsx",
      to: "src/components/ui/button.tsx"
    }
  ]
}
```

## Block manifest example

```ts
export const navbarManifest = {
  id: "block.navbar",
  type: "block",
  label: "Navbar",
  provides: ["block.navbar"],
  requires: [
    {
      capability: "ui.button",
      reason: "Navbar uses Button for actions.",
      strength: "hard"
    },
    {
      capability: "ui.input",
      reason: "Navbar uses Input for search.",
      strength: "hard"
    },
    {
      capability: "ui.avatar",
      reason: "Navbar uses Avatar for the user profile.",
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
      from: "shadcn/blocks/navbar/files/navbar.tsx",
      to: "src/components/blocks/navbar.tsx"
    }
  ]
}
```

## Form adapter registry

Forms should use adapters.

Examples:

```txt
adapter.form.react-hook-form.zod
adapter.form.react-hook-form.yup
adapter.form.tanstack-form.zod
adapter.form.tanstack-form.yup
adapter.form.conform.zod
```

Each adapter owns:

* dependencies
* generated files
* validation wiring
* example forms
* docs snippets
* tests

## File conventions

Generated component files should:

* Use TypeScript.
* Use named exports where practical.
* Avoid hidden global state.
* Avoid unnecessary dependencies.
* Use stable import paths.
* Be readable after generation.
* Be easy for users to modify.

## Import conventions

Use project-local imports:

```ts
import { Button } from "@/components/ui/button"
```

The generated project must include any alias configuration needed for these imports.

## Component quality standards

Every generated component should:

* Be accessible where possible.
* Be typed.
* Avoid excessive abstraction.
* Use clean class names.
* Avoid unused props.
* Avoid unused imports.
* Work in the generated template without manual edits.

## Block quality standards

Every block should:

* Clearly declare required components.
* Avoid secretly requiring undeclared files.
* Render without needing external app state unless declared.
* Include reasonable placeholder content.
* Be easy to delete or customize.
* Avoid business-specific assumptions.

## Registry testing

Registry components and blocks should be validated through generated fixture builds.

Important fixtures:

* Minimal template.
* React recommended template.
* Dashboard template.
* Chat template.
* Maximal template.

## Adding a new component

Checklist:

```txt
1. Add component files.
2. Add manifest.
3. Add provided capabilities.
4. Add required capabilities.
5. Add package dependencies if needed.
6. Add tests or fixture coverage.
7. Export from catalog.
8. Confirm generated template builds.
```

## Adding a new block

Checklist:

```txt
1. Add block files.
2. Add manifest.
3. Declare all primitive/composite dependencies.
4. Add package dependencies if needed.
5. Add fixture coverage.
6. Confirm lock explanations are clear.
7. Confirm generated template builds.
```

## Golden rule

No registry item may rely on an undeclared dependency.
