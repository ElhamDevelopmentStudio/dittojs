import type { ModuleManifest } from "@dittojs/core"

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
        "@base-ui-components/react": "latest",
      },
    },
    ui: {
      label: "Base UI",
      recommended: true,
      category: "Primitive engine",
      tags: ["accessibility", "unstyled"],
    },
  },
]
