import type { ModuleManifest } from "@dittojs/core"

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
        axios: "latest",
      },
    },
    ui: {
      label: "Axios",
      recommended: true,
      category: "HTTP",
      tags: ["http", "client"],
    },
  },
]
