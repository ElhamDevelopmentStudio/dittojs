import type { ModuleManifest } from "@dittojs/core"

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
        "react-hook-form": "latest",
      },
    },
    ui: {
      label: "React Hook Form",
      recommended: true,
      category: "Forms",
      tags: ["forms", "react"],
    },
  },
]
