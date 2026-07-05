import type { ModuleManifest } from "@dittojs/core"

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
        zustand: "latest",
      },
    },
    ui: {
      label: "Zustand",
      recommended: true,
      category: "State",
      tags: ["state", "client"],
    },
  },
]
