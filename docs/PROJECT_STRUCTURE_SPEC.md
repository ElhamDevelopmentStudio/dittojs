# DittoJs Project Structure Specification

## Purpose

Project structures define where generated source files land without making presets separate generator paths.

The resolver selects exactly one project structure. The generator then uses the selected structure adapter to resolve slot-based file mappings into concrete safe output paths.

## Manifest contract

Project structures are catalog modules:

```ts
{
  id: "structure.react.simple",
  type: "project-structure",
  provides: ["project.structure", "project.structure.react.simple"],
  requires: [
    {
      moduleId: "framework.react",
      reason: "React project structures require the React framework.",
      strength: "hard"
    }
  ],
  group: {
    id: "project-structure",
    mode: "exactly-one",
    label: "Project structure"
  }
}
```

## Generator adapter type

```ts
export type ProjectStructureAdapter = {
  id: string
  sourceRoot: string
  importAlias: string
  importAliasPath: string
  slots: Record<string, string>
}
```

Required slots:

```txt
app-entry
app-root
global-css
ui-component
form-component
block
page
lib
store
schema
```

## File mapping contract

Direct mappings still use `to`:

```ts
{
  from: "react/files/index.html",
  to: "index.html"
}
```

Structure-aware mappings use `slot`:

```ts
{
  from: "blocks/navbar/files/navbar.tsx",
  slot: "block",
  name: "navbar",
  feature: "layout"
}
```

A file mapping must use either `to` or `slot`, not both. Slot placeholder values must be relative-safe and cannot be absolute paths or contain `.` or `..` segments.

## React structures

### Simple

```txt
sourceRoot: src
importAlias: @
importAliasPath: ./src/*

app-entry: src/main.tsx
app-root: src/App.tsx
global-css: src/index.css
ui-component: src/components/ui/{name}.tsx
form-component: src/components/forms/{name}.tsx
block: src/components/blocks/{name}.tsx
page: src/pages/{route}.tsx
lib: src/lib/{name}.ts
store: src/stores/{name}.ts
schema: src/schemas/{name}.ts
```

### Feature Based

```txt
sourceRoot: src
importAlias: @
importAliasPath: ./src/*

app-entry: src/main.tsx
app-root: src/App.tsx
global-css: src/index.css
ui-component: src/components/ui/{name}.tsx
form-component: src/features/{feature}/components/{name}.tsx
block: src/features/{feature}/components/{name}.tsx
page: src/features/{feature}/pages/{name}.tsx
lib: src/lib/{name}.ts
store: src/stores/{name}.ts
schema: src/features/{feature}/schemas/{name}.ts
```

### Route Colocated

```txt
sourceRoot: src
importAlias: @
importAliasPath: ./src/*

app-entry: src/main.tsx
app-root: src/App.tsx
global-css: src/index.css
ui-component: src/components/ui/{name}.tsx
form-component: src/pages/{route}/components/{name}.tsx
block: src/components/blocks/{name}.tsx
page: src/pages/{route}/page.tsx
lib: src/lib/{name}.ts
store: src/stores/{name}.ts
schema: src/pages/{route}/schema.ts
```

## Form component example

Input mapping:

```ts
{
  from: "forms/settings-form/files/settings-form.tsx",
  slot: "form-component",
  name: "settings-form",
  feature: "settings",
  route: "settings"
}
```

Resolved outputs:

```txt
structure.react.simple
  src/components/forms/settings-form.tsx

structure.react.feature-based
  src/features/settings/components/settings-form.tsx

structure.react.route-colocated
  src/pages/settings/components/settings-form.tsx
```

## Preset defaults

Preset defaults choose a project structure through the normal resolver defaults mechanism:

```txt
preset.react-recommended -> structure.react.simple
preset.custom -> structure.react.simple
preset.saas-dashboard -> structure.react.feature-based
preset.chat-app -> structure.react.feature-based
```

Explicit user selections in the `project-structure` group override preset defaults. Selecting multiple structures creates an exactly-one group conflict.
