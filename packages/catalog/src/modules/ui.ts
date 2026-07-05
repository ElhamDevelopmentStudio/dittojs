import type { ModuleManifest } from "@dittojs/core"

export const uiLibraryManifests: ModuleManifest[] = [
  {
    id: "ui.shadcn",
    type: "ui-library",
    label: "shadcn",
    description: "Copy-and-own React component library conventions.",
    provides: ["component-library.shadcn"],
    requires: [
      {
        capability: "styling.tailwind",
        reason: "shadcn components require Tailwind CSS.",
        strength: "hard",
      },
    ],
    defaults: {
      "primitive-engine": "primitive-engine.base-ui",
    },
    packages: {
      dependencies: {
        "class-variance-authority": "latest",
        clsx: "latest",
        "tailwind-merge": "latest",
        "lucide-react": "latest",
      },
    },
    ui: {
      label: "shadcn",
      recommended: true,
      category: "UI library",
      tags: ["components", "tailwind"],
    },
  },
]
