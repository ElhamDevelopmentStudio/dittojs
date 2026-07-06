# DittoJs Resolver Specification

## Purpose

The resolver is the heart of DittoJs.

It receives user selections and catalog manifests, then returns the final resolved recipe used by the UI and generator.

The resolver determines:

- selected modules
- auto-selected modules
- locked modules
- dependency reasons
- conflicts
- warnings
- defaults
- packages
- files

## Core rule

The resolver is the only source of truth for dependency logic.

The UI must never independently decide what is required, locked, conflicting, or auto-selected.

## Inputs

```ts
type ResolveInput = {
  userSelections: string[]
  presetId?: string
  catalog: ModuleManifest[]
  options?: ResolveOptions
}
````

## Outputs

```ts
type ResolvedRecipe = {
  userSelections: string[]
  effectiveSelections: string[]

  selectionReasons: Record<string, SelectionReason[]>

  locks: Record<string, LockReason[]>

  conflicts: ResolveConflict[]

  warnings: ResolveWarning[]

  packages: {
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }

  files: FileMapping[]

  defaultsApplied: AppliedDefault[]

  metadata: {
    resolvedAt: string
  }
}
```

## Selection reasons

```ts
type SelectionReason =
  | {
      type: "user"
    }
  | {
      type: "preset"
      presetId: string
    }
  | {
      type: "requirement"
      requiredBy: string
      reason: string
    }
  | {
      type: "default"
      defaultedBy: string
      reason: string
    }
```

## Lock reasons

```ts
type LockReason = {
  requiredBy: string
  reason: string
}
```

A module is locked when it is included because of at least one active hard requirement and the user cannot remove it directly without removing the parent requirement.

## User selections vs effective selections

User selections are explicit user intent.

Effective selections are user selections plus presets, defaults, and required dependencies.

Example:

```txt
User selections:
- block.navbar

Effective selections:
- block.navbar
- component.button
- component.input
- component.avatar
- component.dropdown
- ui.shadcn
- styling.tailwind
```

Auto-selected dependencies must not be stored as user selections.

## Requirements

Requirements can target:

* a specific module ID
* a capability

Example module requirement:

```ts
{
  moduleId: "styling.tailwind",
  reason: "shadcn requires Tailwind CSS.",
  strength: "hard"
}
```

Example capability requirement:

```ts
{
  capability: "ui.button",
  reason: "Navbar uses Button.",
  strength: "hard"
}
```

## Capability resolution

When a requirement targets a capability, the resolver must find a module that provides the capability.

If exactly one provider exists, select it.

If multiple providers exist:

1. Prefer an already selected provider.
2. Prefer a preset-selected provider.
3. Prefer a recommended/default provider.
4. If unresolved, return a conflict requiring user choice.

## Transitive requirements

Requirements must resolve transitively.

Example:

```txt
Navbar requires Button.
Button requires shadcn.
shadcn requires Tailwind.
```

Selecting Navbar should produce:

```txt
Navbar
Button
shadcn
Tailwind
```

## Locking behavior

Locks are derived from hard requirements.

Example:

```txt
shadcn requires Tailwind
```

If shadcn is selected, Tailwind is locked.

If shadcn is removed and no other module requires Tailwind, Tailwind is no longer locked.

If the user manually selected Tailwind too, Tailwind remains selected but unlocks.

## Multiple parent requirements

A module can be locked by multiple parents.

Example:

```txt
Button is required by Navbar and Sidebar.
```

Button remains locked until both Navbar and Sidebar are removed, unless the user explicitly selected Button.

The UI should show all lock reasons.

## Soft requirements

Soft requirements do not lock modules.

They should appear as recommendations or warnings.

Example:

```txt
Messaging Input recommends Online Presence Circle.
```

## Conflicts

The resolver must detect conflicts.

Example:

```txt
React Hook Form conflicts with TanStack Form as the primary form engine.
```

Conflicts should include:

```ts
type ResolveConflict = {
  moduleIds: string[]
  message: string
  reason: string
  severity: "error" | "warning"
}
```

Error conflicts prevent generation.

Warning conflicts allow generation but should be shown.

## Groups

Groups enforce selection rules.

### exactly-one

Exactly one module in the group must be selected.

Example:

```txt
form-engine
```

Only one primary form engine can be selected.

### at-most-one

Zero or one module in the group may be selected.

Example:

```txt
primitive-engine
```

### at-least-one

At least one module in the group must be selected.

Example:

```txt
framework
```

## Defaults

Defaults apply when a higher-level selection needs a sub-choice and the user has not chosen one.

Example:

```txt
ui.shadcn defaults primitive-engine to primitive-engine.base-ui
```

Defaults must not override explicit user selections.

Defaults must be included in `defaultsApplied`.

## Circular dependencies

Circular dependencies must produce a clear resolver error.

Example:

```txt
A requires B.
B requires C.
C requires A.
```

The resolver must not enter an infinite loop.

## Missing providers

If a requirement targets a capability with no provider, the resolver must return an error.

Example:

```txt
block.navbar requires ui.button, but no module provides ui.button.
```

## Ambiguous providers

If multiple modules provide a capability and no default or selected provider can be chosen, the resolver must return a conflict requiring user choice.

Example:

```txt
component.button.shadcn and component.button.custom both provide ui.button.
```

## Package merging

The resolver should collect packages from all effective selections.

If the same package is requested with different ranges, resolver should:

1. Prefer compatible ranges if possible.
2. Return a warning or error for incompatible version requirements.
3. Avoid silently choosing arbitrary versions.

Manifest package ranges must come from the central catalog version policy. Generated package output must not use `"latest"`, `"*"`, or empty version strings.

## File merging

The resolver should collect files from all effective selections.

If two modules write to the same target path, the resolver must return an error unless the collision is explicitly allowed.

## Algorithm outline

1. Load catalog.
2. Validate manifest integrity.
3. Start with user selections.
4. Apply preset selections if present.
5. Apply defaults.
6. Resolve hard requirements.
7. Resolve transitive requirements until stable.
8. Detect circular requirements.
9. Resolve capability providers.
10. Detect conflicts.
11. Enforce group rules.
12. Collect packages.
13. Collect files.
14. Detect file collisions.
15. Build selection reasons.
16. Build lock reasons.
17. Return ResolvedRecipe.

## Required tests

The resolver must have tests for:

* direct requirements
* transitive requirements
* lock reasons
* lock removal
* multiple lock parents
* user selection plus dependency selection
* conflicts
* group exactly-one behavior
* default application
* missing providers
* ambiguous providers
* circular dependencies
* package collection
* file collection
* file collisions

## Example test cases

```txt
Selecting shadcn selects Tailwind.
Selecting shadcn locks Tailwind.
Removing shadcn unlocks Tailwind.
Selecting Button selects shadcn.
Selecting Navbar selects Button, Input, Avatar, and Dropdown.
Button remains locked while Navbar requires it.
Button unlocks when Navbar is removed.
Button stays selected if the user manually selected Button.
React Hook Form conflicts with TanStack Form.
Zod and Yup cannot both be selected as the primary validator.
```
