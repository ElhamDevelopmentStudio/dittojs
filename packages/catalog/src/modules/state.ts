import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const stateManifests: ModuleManifest[] = [
  {
    id: "state.zustand",
    type: "state",
    label: "Zustand",
    description: "Small client state management library.",
    provides: ["state.client", "state.client.zustand"],
    group: {
      id: "state-client",
      mode: "at-most-one",
      label: "State client",
    },
    packages: {
      dependencies: {
        zustand: packageRange("zustand"),
      },
    },
    files: [
      {
        from: "state/zustand/files/app-store.ts",
        slot: "store",
        name: "app-store",
      },
    ],
    ui: {
      label: "Zustand",
      icon: "stack",
      recommended: true,
      recommendationReason:
        "Recommended because it is the supported client state module for MVP templates.",
      category: "State",
      tags: ["state", "client"],
    },
  },
]
