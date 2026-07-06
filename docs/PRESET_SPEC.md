# DittoJs Preset Specification

## Purpose

Presets provide recommended starting points for users.

A preset is a predefined set of selections and defaults.

Presets must not be separate generators.

Every preset must resolve through the normal DittoJs resolver.

## Preset goals

Presets should:

- Reduce decision fatigue.
- Provide strong defaults.
- Be customizable.
- Explain what they include.
- Generate valid projects.
- Be tested in CI.

## Preset type

```ts
export type PresetManifest = {
  id: string
  label: string
  description: string

  recommended?: boolean

  selections: string[]

  defaults?: Record<string, string>

  ui?: {
    category?: string
    tags?: string[]
    summary?: string
  }
}
````

## Preset rules

1. A preset is not a separate code path.
2. A preset only supplies initial user selections and defaults.
3. A preset must be resolvable.
4. A preset must not bypass dependency rules.
5. A preset must not hide conflicts.
6. A preset must be tested as a generated fixture.

## MVP presets

### React Recommended

Purpose:

A general-purpose React starter with the most commonly needed frontend pieces.

Selections:

```txt
framework.react
styling.tailwind
ui.shadcn
primitive-engine.base-ui
form.react-hook-form
validation.zod
http.axios
state.zustand
component.button
component.input
component.textarea
component.label
component.avatar
component.dropdown
component.sheet
component.form
composition.react-recommended
```

Defaults:

```txt
project structure: structure.react.simple
```

User-facing summary:

```txt
React + Vite + Tailwind + shadcn + React Hook Form + Zod + Axios + Zustand.
```

### SaaS Dashboard

Purpose:

A starter for dashboards, admin panels, and internal tools.

Selections:

```txt
framework.react
styling.tailwind
ui.shadcn
primitive-engine.base-ui
form.react-hook-form
validation.zod
http.axios
state.zustand
component.button
component.input
component.textarea
component.label
component.avatar
component.dropdown
component.sheet
component.form
composition.saas-dashboard
block.navbar
block.sidebar
block.settings-form
```

Defaults:

```txt
project structure: structure.react.feature-based
```

Future additions:

```txt
block.data-table
block.dashboard-shell
block.user-menu
block.billing-card
```

### Chat App

Purpose:

A starter for messaging/chat interfaces.

Selections:

```txt
framework.react
styling.tailwind
ui.shadcn
primitive-engine.base-ui
form.react-hook-form
validation.zod
http.axios
state.zustand
component.button
component.input
component.textarea
component.label
component.avatar
component.dropdown
component.sheet
component.form
composition.chat-app
block.navbar
block.messaging-input
block.typing-indicator
block.online-presence
```

Defaults:

```txt
project structure: structure.react.feature-based
```

Future additions:

```txt
block.message-list
block.conversation-sidebar
block.empty-state
```

### Custom

Purpose:

Allows the user to start with smart defaults but make more granular choices.

Selections:

```txt
framework.react
styling.tailwind
ui.shadcn
primitive-engine.base-ui
```

Defaults:

```txt
project structure: structure.react.simple
form engine: React Hook Form
validation: Zod
```

## Preset display

Preset cards should show:

* Name
* Description
* Included stack summary
* Best for
* Create button
* Customize button

Example:

```txt
React Recommended

Best for:
General React apps, prototypes, dashboards, and SaaS apps.

Includes:
React, Vite, Tailwind, shadcn, React Hook Form, Zod, Axios, Zustand.

[Create]
[Customize]
```

## Preset customization

Users must be able to customize a preset before generation.

Customization should modify user selections, then run the resolver again.

Explicit user selections in exactly-one groups must override preset defaults. For example, choosing `structure.react.route-colocated` with `preset.react-recommended` suppresses the preset's default `structure.react.simple` selection.

## Preset testing

Every preset must have:

* A recipe fixture.
* A generated fixture.
* Install check.
* Typecheck.
* Build check.
* Resolver snapshot or assertion.
* Package output assertion.

## AI recommender and presets

The future AI recommender may choose a preset as the base.

Example AI output:

```json
{
  "basePreset": "preset.saas-dashboard",
  "additionalSelections": [
    "block.settings-form"
  ],
  "overrides": {
    "validation": "validation.zod"
  }
}
```

This output must still be passed through the resolver.

## Golden rule

A preset is just a starting point. The resolver remains the source of truth.
