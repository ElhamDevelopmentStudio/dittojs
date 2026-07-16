import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const routingManifests: ModuleManifest[] = [
  {
    id: "routing.react-router",
    type: "adapter",
    label: "React Router",
    description: "Client-side routing with createBrowserRouter.",
    provides: ["routing.react-router"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "React Router routes render React components.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    ui: {
      label: "React Router",
      icon: "route",
      category: "Routing",
      tags: ["router", "create-browser-router", "template"],
    },
  },
]
