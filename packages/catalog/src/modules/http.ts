import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const httpManifests: ModuleManifest[] = [
  {
    id: "http.axios",
    type: "http",
    label: "Axios",
    description: "Promise-based HTTP client.",
    provides: ["http.client", "http.client.axios"],
    group: {
      id: "http-client",
      mode: "at-most-one",
      label: "HTTP client",
    },
    packages: {
      dependencies: {
        axios: packageRange("axios"),
      },
    },
    files: [
      {
        from: "http/axios/files/axios.ts",
        to: "src/lib/axios.ts",
      },
    ],
    ui: {
      label: "Axios",
      recommended: true,
      category: "HTTP",
      tags: ["http", "client"],
    },
  },
]
