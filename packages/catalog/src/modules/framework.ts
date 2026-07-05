import type { ModuleManifest } from "@dittojs/core"

export const frameworkManifests: ModuleManifest[] = [
  {
    id: "framework.react",
    type: "framework",
    label: "React",
    description: "React application runtime.",
    provides: ["framework.react"],
    group: {
      id: "framework",
      mode: "at-least-one",
      label: "Framework",
    },
    packages: {
      dependencies: {
        react: "latest",
        "react-dom": "latest",
      },
    },
    ui: {
      label: "React",
      recommended: true,
      category: "Framework",
      tags: ["react", "vite"],
    },
  },
]
