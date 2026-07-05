import type { ModuleManifest } from "@dittojs/core"

const reactProjectStructureGroup = {
  id: "project-structure",
  mode: "exactly-one",
  label: "Project structure",
} as const

export const projectStructureManifests: ModuleManifest[] = [
  {
    id: "structure.react.simple",
    type: "project-structure",
    label: "React Simple",
    description: "A compact React source layout with shared components, pages, stores, and libs.",
    provides: ["project.structure", "project.structure.react.simple"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "React project structures require the React framework.",
        strength: "hard",
      },
    ],
    group: reactProjectStructureGroup,
    ui: {
      label: "Simple",
      recommended: true,
      category: "Project structure",
      tags: ["react", "simple"],
    },
  },
  {
    id: "structure.react.feature-based",
    type: "project-structure",
    label: "React Feature Based",
    description: "A React source layout that colocates feature pages, components, and schemas.",
    provides: ["project.structure", "project.structure.react.feature-based"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "React project structures require the React framework.",
        strength: "hard",
      },
    ],
    group: reactProjectStructureGroup,
    ui: {
      label: "Feature based",
      category: "Project structure",
      tags: ["react", "features"],
    },
  },
  {
    id: "structure.react.route-colocated",
    type: "project-structure",
    label: "React Route Colocated",
    description: "A React source layout that colocates route pages with route-owned files.",
    provides: ["project.structure", "project.structure.react.route-colocated"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "React project structures require the React framework.",
        strength: "hard",
      },
    ],
    group: reactProjectStructureGroup,
    ui: {
      label: "Route colocated",
      category: "Project structure",
      tags: ["react", "routes"],
    },
  },
]
