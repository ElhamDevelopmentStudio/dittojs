import type { ModuleManifest } from "@dittojs/core"

export const presetManifests: ModuleManifest[] = [
  {
    id: "preset.react-recommended",
    type: "preset",
    label: "React Recommended",
    description: "Recommended React application baseline with shadcn, forms, state, and HTTP.",
    selections: [
      "framework.react",
      "tooling.vite",
      "tooling.typescript",
      "styling.tailwind",
      "ui.shadcn",
      "primitive-engine.base-ui",
      "form.react-hook-form",
      "validation.zod",
      "http.axios",
      "state.zustand",
      "component.button",
      "component.input",
      "component.textarea",
      "component.label",
      "component.avatar",
      "component.dropdown",
      "component.sheet",
      "component.form",
    ],
    defaults: {
      "project-structure": "structure.react.simple",
    },
    ui: {
      label: "React Recommended",
      recommended: true,
      category: "Presets",
      tags: ["react", "recommended"],
    },
  },
  {
    id: "preset.saas-dashboard",
    type: "preset",
    label: "SaaS Dashboard",
    description: "Dashboard preset with the recommended React baseline, navbar, and sidebar.",
    selections: ["preset.react-recommended", "block.navbar", "block.sidebar"],
    defaults: {
      "project-structure": "structure.react.feature-based",
    },
    ui: {
      label: "SaaS Dashboard",
      recommended: true,
      category: "Presets",
      tags: ["saas", "dashboard"],
    },
  },
  {
    id: "preset.chat-app",
    type: "preset",
    label: "Chat App",
    description: "Chat preset with the recommended React baseline and messaging blocks.",
    selections: [
      "preset.react-recommended",
      "block.navbar",
      "block.messaging-input",
      "block.typing-indicator",
      "block.online-presence",
    ],
    defaults: {
      "project-structure": "structure.react.feature-based",
    },
    ui: {
      label: "Chat App",
      recommended: true,
      category: "Presets",
      tags: ["chat", "messaging"],
    },
  },
  {
    id: "preset.custom",
    type: "preset",
    label: "Custom",
    description: "Minimal customizable React baseline.",
    selections: [
      "framework.react",
      "tooling.vite",
      "tooling.typescript",
      "styling.tailwind",
      "ui.shadcn",
      "primitive-engine.base-ui",
    ],
    defaults: {
      "project-structure": "structure.react.simple",
    },
    ui: {
      label: "Custom",
      category: "Presets",
      tags: ["react", "minimal"],
    },
  },
]
