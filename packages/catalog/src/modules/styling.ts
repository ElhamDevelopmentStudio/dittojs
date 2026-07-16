import type { ModuleManifest } from "@dittosh/core"

import { packageRange } from "../package-versions.js"

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
        "tw-animate-css": packageRange("tw-animate-css"),
      },
    },
    files: [
      {
        from: "react/files/src/index.css",
        slot: "global-css",
        name: "index",
      },
      {
        from: "react/files/src/styles/presets/brutalist.css",
        to: "src/styles/presets/brutalist.css",
      },
      {
        from: "react/files/src/styles/presets/soft-pop.css",
        to: "src/styles/presets/soft-pop.css",
      },
      {
        from: "react/files/src/styles/presets/tangerine.css",
        to: "src/styles/presets/tangerine.css",
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
