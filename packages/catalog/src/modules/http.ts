import type { ModuleManifest } from "@dittosh/core"

import { packageRange } from "../package-versions.js"

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
        slot: "lib",
        name: "axios",
      },
    ],
    ui: {
      label: "Axios",
      icon: "cloud",
      recommended: true,
      recommendationReason:
        "Recommended because it is the supported HTTP client for generated templates.",
      category: "HTTP",
      tags: ["http", "client"],
    },
  },
]
