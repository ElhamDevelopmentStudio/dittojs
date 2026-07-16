import type { ProjectStructureAdapter } from "./types"

export const PROJECT_STRUCTURE_GROUP_ID = "project-structure"

export const REQUIRED_PROJECT_STRUCTURE_SLOTS = [
  "app-entry",
  "app-root",
  "global-css",
  "ui-component",
  "form-component",
  "block",
  "hook",
  "page",
  "lib",
  "store",
  "schema",
] as const

export const projectStructureAdapters = {
  "structure.react.simple": {
    id: "structure.react.simple",
    sourceRoot: "src",
    importAlias: "@",
    importAliasPath: "./src/*",
    slots: {
      "app-entry": "src/main.tsx",
      "app-root": "src/App.tsx",
      "global-css": "src/index.css",
      "ui-component": "src/components/ui/{name}.tsx",
      "form-component": "src/components/forms/{name}.tsx",
      block: "src/components/blocks/{name}.tsx",
      hook: "src/hooks/{name}.ts",
      page: "src/pages/{route}.tsx",
      lib: "src/lib/{name}.ts",
      store: "src/stores/{name}.ts",
      schema: "src/schemas/{name}.ts",
    },
  },
  "structure.react.feature-based": {
    id: "structure.react.feature-based",
    sourceRoot: "src",
    importAlias: "@",
    importAliasPath: "./src/*",
    slots: {
      "app-entry": "src/main.tsx",
      "app-root": "src/App.tsx",
      "global-css": "src/index.css",
      "ui-component": "src/components/ui/{name}.tsx",
      "form-component": "src/features/{feature}/components/{name}.tsx",
      block: "src/features/{feature}/components/{name}.tsx",
      hook: "src/hooks/{name}.ts",
      page: "src/features/{feature}/pages/{name}.tsx",
      lib: "src/lib/{name}.ts",
      store: "src/stores/{name}.ts",
      schema: "src/features/{feature}/schemas/{name}.ts",
    },
  },
  "structure.react.route-colocated": {
    id: "structure.react.route-colocated",
    sourceRoot: "src",
    importAlias: "@",
    importAliasPath: "./src/*",
    slots: {
      "app-entry": "src/main.tsx",
      "app-root": "src/App.tsx",
      "global-css": "src/index.css",
      "ui-component": "src/components/ui/{name}.tsx",
      "form-component": "src/pages/{route}/components/{name}.tsx",
      block: "src/components/blocks/{name}.tsx",
      hook: "src/hooks/{name}.ts",
      page: "src/pages/{route}/page.tsx",
      lib: "src/lib/{name}.ts",
      store: "src/stores/{name}.ts",
      schema: "src/pages/{route}/schema.ts",
    },
  },
} as const satisfies Record<string, ProjectStructureAdapter>

export function getProjectStructureAdapter(id: string): ProjectStructureAdapter | undefined {
  return projectStructureAdapters[id as keyof typeof projectStructureAdapters]
}
