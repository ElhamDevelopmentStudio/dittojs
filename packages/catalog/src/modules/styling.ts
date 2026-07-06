import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

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
        tailwindcss: packageRange("tailwindcss"),
      },
    },
    files: [
      {
        from: "react/files/src/index.css",
        slot: "global-css",
        name: "index",
      },
    ],
    ui: {
      label: "Tailwind CSS",
      icon: "tailwind",
      recommended: true,
      recommendationReason:
        "Recommended because DittoJs templates currently generate Tailwind v4 styles.",
      category: "Styling",
      tags: ["tailwind", "css"],
    },
  },
]
