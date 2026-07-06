export type BuilderStep =
  "landing" | "core" | "features" | "structure" | "review" | "generating" | "success"

export type PresetOption = {
  id: string
  title: string
  description: string
  stack: string
  recommended?: boolean
}

export type BuilderOption = {
  id: string
  label: string
  description: string
  moduleId?: string
  groupId: string
  groupMode?: "toggle" | "exactly-one"
  recommended?: boolean
  comingSoon?: boolean
  meta?: string
}

export type OptionGroup = {
  id: string
  title: string
  description: string
  options: BuilderOption[]
}

export const presetOptions: PresetOption[] = [
  {
    id: "preset.react-recommended",
    title: "React Recommended",
    description: "A production-ready React baseline with shadcn-style UI, forms, state, and HTTP.",
    stack: "React + Vite + TypeScript + Tailwind v4",
    recommended: true,
  },
  {
    id: "preset.saas-dashboard",
    title: "SaaS Dashboard",
    description: "Dashboard composition with navigation, settings, and durable defaults.",
    stack: "Recommended stack + dashboard composition",
    recommended: true,
  },
  {
    id: "preset.chat-app",
    title: "Chat App",
    description: "Messaging-focused composition with chat blocks and presence primitives.",
    stack: "Recommended stack + messaging composition",
    recommended: true,
  },
  {
    id: "preset.custom",
    title: "Custom",
    description: "Minimal React foundation for choosing each supported module yourself.",
    stack: "React + Vite + TypeScript + Tailwind v4",
  },
]

export const coreOptionGroups: OptionGroup[] = [
  {
    id: "framework",
    title: "Framework",
    description: "The app runtime and frontend foundation.",
    options: [
      {
        id: "react",
        label: "React",
        description: "Supported MVP framework.",
        moduleId: "framework.react",
        groupId: "framework",
        recommended: true,
      },
      {
        id: "vue",
        label: "Vue",
        description: "Not part of the MVP generator surface.",
        groupId: "framework",
        comingSoon: true,
      },
      {
        id: "svelte",
        label: "Svelte",
        description: "Not part of the MVP generator surface.",
        groupId: "framework",
        comingSoon: true,
      },
    ],
  },
  {
    id: "tooling",
    title: "Build & Language",
    description: "Compiler and project tooling.",
    options: [
      {
        id: "vite",
        label: "Vite",
        description: "Fast React build tooling.",
        moduleId: "tooling.vite",
        groupId: "tooling",
        recommended: true,
      },
      {
        id: "typescript",
        label: "TypeScript",
        description: "Typed source and generated project checks.",
        moduleId: "tooling.typescript",
        groupId: "tooling",
        recommended: true,
      },
      {
        id: "bun",
        label: "Bun",
        description: "Runtime tooling is not enabled in this MVP.",
        groupId: "tooling",
        comingSoon: true,
      },
    ],
  },
  {
    id: "styling",
    title: "Styling",
    description: "Generated styling system.",
    options: [
      {
        id: "tailwind",
        label: "Tailwind CSS v4",
        description: "The supported generated CSS pipeline.",
        moduleId: "styling.tailwind",
        groupId: "styling",
        groupMode: "exactly-one",
        recommended: true,
      },
      {
        id: "css-modules",
        label: "CSS Modules",
        description: "Alternative styling outputs are not implemented yet.",
        groupId: "styling",
        comingSoon: true,
      },
      {
        id: "styled-components",
        label: "Styled Components",
        description: "Runtime CSS-in-JS output is not implemented yet.",
        groupId: "styling",
        comingSoon: true,
      },
    ],
  },
  {
    id: "ui",
    title: "UI System",
    description: "Component conventions and primitive engine.",
    options: [
      {
        id: "shadcn",
        label: "shadcn-style UI",
        description: "Copy-and-own component conventions.",
        moduleId: "ui.shadcn",
        groupId: "ui",
        recommended: true,
      },
      {
        id: "base-ui",
        label: "Base UI",
        description: "Accessible unstyled primitive engine.",
        moduleId: "primitive-engine.base-ui",
        groupId: "ui",
        recommended: true,
      },
      {
        id: "radix",
        label: "Radix UI",
        description: "Not connected to generator templates in this MVP.",
        groupId: "ui",
        comingSoon: true,
      },
    ],
  },
  {
    id: "forms",
    title: "Forms & Validation",
    description: "Form state and schema validation.",
    options: [
      {
        id: "react-hook-form",
        label: "React Hook Form",
        description: "Supported form state engine.",
        moduleId: "form.react-hook-form",
        groupId: "form-engine",
        groupMode: "exactly-one",
        recommended: true,
      },
      {
        id: "zod",
        label: "Zod",
        description: "Supported schema validation engine.",
        moduleId: "validation.zod",
        groupId: "validation-schema",
        groupMode: "exactly-one",
        recommended: true,
      },
      {
        id: "tanstack-form",
        label: "TanStack Form",
        description: "Alternative form engines are disabled until supported.",
        groupId: "form-engine",
        comingSoon: true,
      },
      {
        id: "conform",
        label: "Conform",
        description: "Alternative form engines are disabled until supported.",
        groupId: "form-engine",
        comingSoon: true,
      },
      {
        id: "yup",
        label: "Yup",
        description: "Alternative validators are disabled until supported.",
        groupId: "validation-schema",
        comingSoon: true,
      },
      {
        id: "valibot",
        label: "Valibot",
        description: "Alternative validators are disabled until supported.",
        groupId: "validation-schema",
        comingSoon: true,
      },
    ],
  },
  {
    id: "data",
    title: "Client Data",
    description: "Client state and request layer.",
    options: [
      {
        id: "zustand",
        label: "Zustand",
        description: "Supported client state module.",
        moduleId: "state.zustand",
        groupId: "state-client",
        groupMode: "exactly-one",
        recommended: true,
      },
      {
        id: "axios",
        label: "Axios",
        description: "Supported HTTP client module.",
        moduleId: "http.axios",
        groupId: "http-client",
        groupMode: "exactly-one",
        recommended: true,
      },
      {
        id: "postgresql",
        label: "PostgreSQL",
        description: "Database generation is outside the MVP.",
        groupId: "database",
        comingSoon: true,
      },
      {
        id: "prisma",
        label: "Prisma",
        description: "ORM generation is outside the MVP.",
        groupId: "database",
        comingSoon: true,
      },
    ],
  },
]

export const componentOptions: BuilderOption[] = [
  {
    id: "button",
    label: "Button",
    description: "Action primitive generated from the selected UI library.",
    moduleId: "component.button",
    groupId: "components",
  },
  {
    id: "input",
    label: "Input",
    description: "Text input primitive for forms and block requirements.",
    moduleId: "component.input",
    groupId: "components",
  },
  {
    id: "textarea",
    label: "Textarea",
    description: "Multi-line text input primitive.",
    moduleId: "component.textarea",
    groupId: "components",
  },
  {
    id: "label",
    label: "Label",
    description: "Accessible form label primitive.",
    moduleId: "component.label",
    groupId: "components",
  },
  {
    id: "avatar",
    label: "Avatar",
    description: "Identity primitive for account and presence surfaces.",
    moduleId: "component.avatar",
    groupId: "components",
  },
  {
    id: "dropdown",
    label: "Dropdown",
    description: "Composite menu and account action primitive.",
    moduleId: "component.dropdown",
    groupId: "components",
  },
  {
    id: "sheet",
    label: "Sheet",
    description: "Slide-over panel for responsive navigation.",
    moduleId: "component.sheet",
    groupId: "components",
  },
  {
    id: "form",
    label: "Form",
    description: "Form helpers wired to React Hook Form and Zod.",
    moduleId: "component.form",
    groupId: "components",
  },
]

export const blockOptions: BuilderOption[] = [
  {
    id: "navbar",
    label: "Navbar",
    description: "Top navigation with search and account controls.",
    moduleId: "block.navbar",
    groupId: "blocks",
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description: "Application sidebar navigation.",
    moduleId: "block.sidebar",
    groupId: "blocks",
  },
  {
    id: "messaging-input",
    label: "Messaging Input",
    description: "Chat composer with input and send action.",
    moduleId: "block.messaging-input",
    groupId: "blocks",
  },
  {
    id: "typing-indicator",
    label: "Typing Indicator",
    description: "Activity indicator for chat threads.",
    moduleId: "block.typing-indicator",
    groupId: "blocks",
  },
  {
    id: "online-presence",
    label: "Online Presence",
    description: "Presence indicator paired with Avatar.",
    moduleId: "block.online-presence",
    groupId: "blocks",
  },
  {
    id: "settings-form",
    label: "Settings Form",
    description: "Workspace settings form backed by Form, RHF, and Zod.",
    moduleId: "block.settings-form",
    groupId: "blocks",
  },
  {
    id: "auth-form",
    label: "Auth Form",
    description: "Authentication flows are outside this MVP.",
    groupId: "blocks",
    comingSoon: true,
  },
  {
    id: "data-table",
    label: "Data Table",
    description: "Table generation is not implemented yet.",
    groupId: "blocks",
    comingSoon: true,
  },
  {
    id: "dashboard-shell",
    label: "Dashboard Shell",
    description: "Shell-level dashboard generation is not implemented yet.",
    groupId: "blocks",
    comingSoon: true,
  },
  {
    id: "command-menu",
    label: "Command Menu",
    description: "Command menu generation is not implemented yet.",
    groupId: "blocks",
    comingSoon: true,
  },
]

export const projectStructureOptions: BuilderOption[] = [
  {
    id: "simple",
    label: "Simple",
    description: "Compact source layout with shared components, pages, stores, and libs.",
    moduleId: "structure.react.simple",
    groupId: "project-structure",
    groupMode: "exactly-one",
    recommended: true,
    meta: "Default for React Recommended and Custom",
  },
  {
    id: "feature-based",
    label: "Feature-based",
    description: "Colocates feature pages, components, schemas, and route-owned code.",
    moduleId: "structure.react.feature-based",
    groupId: "project-structure",
    groupMode: "exactly-one",
    meta: "Default for SaaS Dashboard and Chat App",
  },
  {
    id: "route-colocated",
    label: "Route-colocated",
    description: "Keeps route pages and route-owned files together under routes.",
    moduleId: "structure.react.route-colocated",
    groupId: "project-structure",
    groupMode: "exactly-one",
    meta: "For route-first source ownership",
  },
]

export const allSelectableOptions = [
  ...coreOptionGroups.flatMap((group) => group.options),
  ...componentOptions,
  ...blockOptions,
  ...projectStructureOptions,
]
