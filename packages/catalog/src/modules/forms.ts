import type { ModuleManifest } from "@dittosh/core"

import { packageRange } from "../package-versions.js"

export const formManifests: ModuleManifest[] = [
  {
    id: "form.react-hook-form",
    type: "form-engine",
    label: "React Hook Form",
    description: "Form state and validation integration for React.",
    provides: ["form.engine", "form.engine.react-hook-form"],
    group: {
      id: "form-engine",
      mode: "exactly-one",
      label: "Form engine",
    },
    packages: {
      dependencies: {
        "react-hook-form": packageRange("react-hook-form"),
      },
    },
    ui: {
      label: "React Hook Form",
      icon: "form",
      recommended: true,
      recommendationReason:
        "Recommended because it is the supported form engine for generated templates.",
      category: "Forms",
      tags: ["forms", "react"],
    },
  },
]
