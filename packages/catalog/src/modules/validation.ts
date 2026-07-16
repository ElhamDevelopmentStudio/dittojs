import type { ModuleManifest } from "@dittosh/core"

import { packageRange } from "../package-versions.js"

export const validationManifests: ModuleManifest[] = [
  {
    id: "validation.zod",
    type: "validation",
    label: "Zod",
    description: "TypeScript-first schema validation.",
    provides: ["validation.schema", "validation.schema.zod"],
    group: {
      id: "validation-schema",
      mode: "exactly-one",
      label: "Validation schema",
    },
    packages: {
      dependencies: {
        zod: packageRange("zod"),
      },
    },
    ui: {
      label: "Zod",
      icon: "code",
      recommended: true,
      recommendationReason:
        "Recommended because it is the supported schema validator for generated templates.",
      category: "Validation",
      tags: ["schema", "typescript"],
    },
  },
]
