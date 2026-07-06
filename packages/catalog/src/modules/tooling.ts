import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const toolingManifests: ModuleManifest[] = [
  {
    id: "tooling.vite",
    type: "tooling",
    label: "Vite",
    description: "Fast frontend tooling for React projects.",
    provides: ["tooling.vite"],
    packages: {
      devDependencies: {
        vite: packageRange("vite"),
        "@vitejs/plugin-react": packageRange("@vitejs/plugin-react"),
        "@tailwindcss/vite": packageRange("@tailwindcss/vite"),
      },
    },
    files: [
      {
        from: "react/files/vite.config.ts",
        to: "vite.config.ts",
      },
      {
        from: "react/files/src/vite-env.d.ts",
        to: "src/vite-env.d.ts",
      },
    ],
    ui: {
      label: "Vite",
      icon: "flash",
      recommended: true,
      recommendationReason:
        "Recommended because it provides the fastest supported React build path.",
      category: "Tooling",
      tags: ["vite", "build"],
    },
  },
  {
    id: "tooling.typescript",
    type: "tooling",
    label: "TypeScript",
    description: "TypeScript language and typechecking support.",
    provides: ["tooling.typescript"],
    packages: {
      devDependencies: {
        typescript: packageRange("typescript"),
      },
    },
    files: [
      {
        from: "react/files/tsconfig.json",
        to: "tsconfig.json",
      },
    ],
    ui: {
      label: "TypeScript",
      icon: "code",
      recommended: true,
      recommendationReason:
        "Recommended because generated MVP templates are currently TypeScript-first.",
      category: "Tooling",
      tags: ["typescript", "types"],
    },
  },
]
