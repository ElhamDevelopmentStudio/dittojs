import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

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
        "class-variance-authority": packageRange("class-variance-authority"),
        clsx: packageRange("clsx"),
        "tailwind-merge": packageRange("tailwind-merge"),
        "lucide-react": packageRange("lucide-react"),
      },
    },
    files: [
      {
        from: "shadcn/lib/utils.ts",
        slot: "lib",
        name: "utils",
      },
    ],
    ui: {
      label: "shadcn",
      icon: "palette",
      recommended: true,
      recommendationReason: "Recommended because it works with the generated component registry.",
      category: "UI library",
      tags: ["components", "tailwind"],
    },
  },
]
