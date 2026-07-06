import type { ModuleManifest } from "@dittojs/core"

const reactRecommendedBaseSelections = [
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
]

export const presetManifests: ModuleManifest[] = [
  {
    id: "preset.react-recommended",
    type: "preset",
    label: "React Recommended",
    description: "Recommended React application baseline with shadcn, forms, state, and HTTP.",
    selections: [...reactRecommendedBaseSelections, "composition.react-recommended"],
    defaults: {
      "project-structure": "structure.react.simple",
    },
    ui: {
      label: "React Recommended",
      icon: "react",
      recommended: true,
      recommendationReason:
        "Recommended because it is the default dependency-correct React starter.",
      category: "Presets",
      tags: ["react", "recommended"],
    },
  },
  {
    id: "preset.saas-dashboard",
    type: "preset",
    label: "SaaS Dashboard",
    description:
      "Dashboard preset with the recommended React baseline and SaaS dashboard composition.",
    selections: [...reactRecommendedBaseSelections, "composition.saas-dashboard"],
    defaults: {
      "project-structure": "structure.react.feature-based",
    },
    ui: {
      label: "SaaS Dashboard",
      icon: "dashboard",
      recommended: true,
      recommendationReason:
        "Recommended because it extends the supported stack with dashboard composition.",
      category: "Presets",
      tags: ["saas", "dashboard"],
    },
  },
  {
    id: "preset.chat-app",
    type: "preset",
    label: "Chat App",
    description: "Chat preset with the recommended React baseline and chat app composition.",
    selections: [...reactRecommendedBaseSelections, "composition.chat-app"],
    defaults: {
      "project-structure": "structure.react.feature-based",
    },
    ui: {
      label: "Chat App",
      icon: "chat",
      recommended: true,
      recommendationReason:
        "Recommended because it extends the supported stack with messaging composition.",
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
      icon: "settings",
      category: "Presets",
      tags: ["react", "minimal"],
    },
  },
]
