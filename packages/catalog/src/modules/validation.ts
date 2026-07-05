import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

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
      recommended: true,
      category: "Validation",
      tags: ["schema", "typescript"],
    },
  },
]
