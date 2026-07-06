import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const frameworkManifests: ModuleManifest[] = [
  {
    id: "framework.react",
    type: "framework",
    label: "React",
    description: "React application runtime.",
    provides: ["framework.react"],
    group: {
      id: "framework",
      mode: "at-least-one",
      label: "Framework",
    },
    packages: {
      dependencies: {
        react: packageRange("react"),
        "react-dom": packageRange("react-dom"),
      },
      devDependencies: {
        "@types/react": packageRange("@types/react"),
        "@types/react-dom": packageRange("@types/react-dom"),
      },
    },
    files: [
      {
        from: "react/files/index.html",
        to: "index.html",
      },
      {
        from: "react/files/src/main.tsx",
        slot: "app-entry",
        name: "main",
      },
    ],
    ui: {
      label: "React",
      recommended: true,
      category: "Framework",
      tags: ["react", "vite"],
    },
  },
]
