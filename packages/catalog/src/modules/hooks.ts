import type { ModuleManifest } from "@dittosh/core"

export const hookManifests: ModuleManifest[] = [
  {
    id: "hook.use-mobile",
    type: "adapter",
    label: "useIsMobile Hook",
    description: "Responsive mobile breakpoint hook from the template.",
    provides: ["hook.use-mobile"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "useIsMobile uses React state and effects.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "hooks/use-mobile/files/use-mobile.ts",
        slot: "hook",
        name: "use-mobile",
      },
    ],
    ui: {
      label: "useIsMobile",
      icon: "hook",
      category: "Hooks",
      tags: ["responsive", "template"],
    },
  },
  {
    id: "hook.use-lg",
    type: "adapter",
    label: "useLg Hook",
    description: "Large-screen breakpoint hook from the template.",
    provides: ["hook.use-lg"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "useLg uses React state and effects.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "hooks/use-lg/files/use-lg.ts",
        slot: "hook",
        name: "use-lg",
      },
    ],
    ui: {
      label: "useLg",
      icon: "hook",
      category: "Hooks",
      tags: ["responsive", "template"],
    },
  },
]
