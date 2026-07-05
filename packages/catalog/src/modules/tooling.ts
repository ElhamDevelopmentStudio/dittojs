import type { ModuleManifest } from "@dittojs/core"

export const toolingManifests: ModuleManifest[] = [
  {
    id: "tooling.vite",
    type: "tooling",
    label: "Vite",
    description: "Fast frontend tooling for React projects.",
    provides: ["tooling.vite"],
    packages: {
      devDependencies: {
        vite: "latest",
        "@vitejs/plugin-react": "latest",
      },
    },
    ui: {
      label: "Vite",
      recommended: true,
      category: "Tooling",
      tags: ["vite", "build"],
    },
  },
  {
    id: "tooling.typescript",
    type: "tooling",
    label: "TypeScript",
    description: "TypeScript language and typechecking support.",
    provides: ["tooling.typescript"],
    packages: {
      devDependencies: {
        typescript: "latest",
      },
    },
    ui: {
      label: "TypeScript",
      recommended: true,
      category: "Tooling",
      tags: ["typescript", "types"],
    },
  },
]
