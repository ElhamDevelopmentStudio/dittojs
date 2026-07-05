import type { ModuleManifest } from "@dittojs/core"

export const stylingManifests: ModuleManifest[] = [
  {
    id: "styling.tailwind",
    type: "styling",
    label: "Tailwind CSS",
    description: "Utility-first CSS styling system.",
    provides: ["styling.tailwind"],
    group: {
      id: "styling",
      mode: "at-most-one",
      label: "Styling",
    },
    packages: {
      devDependencies: {
        tailwindcss: "latest",
        postcss: "latest",
        autoprefixer: "latest",
      },
    },
    ui: {
      label: "Tailwind CSS",
      recommended: true,
      category: "Styling",
      tags: ["tailwind", "css"],
    },
  },
]
