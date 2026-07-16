import type { ModuleManifest } from "@dittosh/core"

import { packageRange } from "../package-versions.js"

export const primitiveEngineManifests: ModuleManifest[] = [
  {
    id: "primitive-engine.base-ui",
    type: "primitive-engine",
    label: "Base UI",
    description: "Unstyled accessible primitives for React components.",
    provides: ["primitive-engine.base-ui"],
    group: {
      id: "primitive-engine",
      mode: "at-most-one",
      label: "Primitive engine",
    },
    packages: {
      dependencies: {
        "@base-ui/react": packageRange("@base-ui/react"),
      },
    },
    ui: {
      label: "Base UI",
      icon: "box",
      recommended: true,
      recommendationReason:
        "Recommended because it is the supported primitive engine for MVP templates.",
      category: "Primitive engine",
      tags: ["accessibility", "unstyled"],
    },
  },
]
