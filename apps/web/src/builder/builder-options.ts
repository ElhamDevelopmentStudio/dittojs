import { catalog } from "@dittojs/catalog"

export type BuilderStep =
  "landing" | "core" | "features" | "structure" | "review" | "generating" | "success"

export type PresetOption = {
  id: string
  title: string
  description: string
  stack: string
  icon?: string
  recommendationReason?: string | undefined
  recommended?: boolean
}

export type BuilderOption = {
  id: string
  label: string
  description: string
  moduleId?: string
  moduleIds?: string[]
  groupId: string
  groupMode?: "toggle" | "exactly-one"
  recommended?: boolean
  recommendationReason?: string | undefined
  comingSoon?: boolean
  meta?: string
  icon?: string
  customization?: OptionCustomization
}

export type OptionGroup = {
  id: string
  title: string
  description: string
  options: BuilderOption[]
}

export type CustomizationSection = {
  id: string
  title: string
  description?: string
  options: BuilderOption[]
}

export type OptionCustomization = {
  title: string
  description: string
  sections: CustomizationSection[]
}

export function moduleIdsForOption(option: BuilderOption): string[] {
  return Array.from(
    new Set([
      ...(option.moduleId === undefined ? [] : [option.moduleId]),
      ...(option.moduleIds ?? []),
    ]),
  )
}

function iconForModule(moduleId: string | undefined, fallback: string): string {
  if (moduleId === undefined) {
    return fallback
  }

  return catalog.find((manifest) => manifest.id === moduleId)?.ui?.icon ?? fallback
}

function recommendationReasonForModule(moduleId: string | undefined): string | undefined {
  if (moduleId === undefined) {
    return undefined
  }

  return catalog.find((manifest) => manifest.id === moduleId)?.ui?.recommendationReason
}

export const presetOptions: PresetOption[] = [
  {
    id: "preset.react-recommended",
    title: "React Recommended",
    description: "A production-ready React baseline with shadcn-style UI, forms, state, and HTTP.",
    stack: "React + Vite + TypeScript + Tailwind v4",
    icon: iconForModule("preset.react-recommended", "react"),
    recommendationReason: "Recommended because it is the default dependency-correct React starter.",
    recommended: true,
  },
  {
    id: "preset.saas-dashboard",
    title: "SaaS Dashboard",
    description: "Dashboard composition with navigation, settings, and durable defaults.",
    stack: "Recommended stack + dashboard composition",
    icon: iconForModule("preset.saas-dashboard", "dashboard"),
    recommendationReason:
      "Recommended because it extends the supported stack with dashboard composition.",
    recommended: true,
  },
  {
    id: "preset.chat-app",
    title: "Chat App",
    description: "Messaging-focused composition with chat blocks and presence primitives.",
    stack: "Recommended stack + messaging composition",
    icon: iconForModule("preset.chat-app", "chat"),
    recommendationReason:
      "Recommended because it extends the supported stack with messaging composition.",
    recommended: true,
  },
  {
    id: "preset.custom",
    title: "Custom",
    description: "Minimal React foundation for choosing each supported module yourself.",
    stack: "React + Vite + TypeScript + Tailwind v4",
    icon: iconForModule("preset.custom", "settings"),
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
        icon: iconForModule("framework.react", "react"),
        recommendationReason: recommendationReasonForModule("framework.react"),
        recommended: true,
      },
      {
        id: "vue",
        label: "Vue",
        description: "Not part of the MVP generator surface.",
        groupId: "framework",
        icon: "vue",
        comingSoon: true,
      },
      {
        id: "svelte",
        label: "Svelte",
        description: "Not part of the MVP generator surface.",
        groupId: "framework",
        icon: "svelte",
        comingSoon: true,
      },
    ],
  },
  {
    id: "tooling",
    title: "Build Tool",
    description: "Primary compiler and React development server.",
    options: [
      {
        id: "vite",
        label: "Vite",
        description: "Fast React build tooling with TypeScript defaults nested inside.",
        moduleId: "tooling.vite",
        groupId: "tooling",
        icon: iconForModule("tooling.vite", "flash"),
        recommendationReason: recommendationReasonForModule("tooling.vite"),
        recommended: true,
        customization: {
          title: "Customize Vite",
          description:
            "Language and package-manager choices are nested under the selected build tool.",
          sections: [
            {
              id: "language",
              title: "Language",
              options: [
                {
                  id: "typescript",
                  label: "TypeScript",
                  description: "Typed source and generated project checks.",
                  moduleId: "tooling.typescript",
                  groupId: "language",
                  icon: iconForModule("tooling.typescript", "code"),
                  recommendationReason: recommendationReasonForModule("tooling.typescript"),
                  recommended: true,
                },
                {
                  id: "javascript",
                  label: "JavaScript",
                  description: "A JavaScript template variant is not generated yet.",
                  groupId: "language",
                  icon: "code",
                  comingSoon: true,
                },
              ],
            },
            {
              id: "package-manager",
              title: "Package manager",
              options: [
                {
                  id: "pnpm",
                  label: "pnpm",
                  description: "Package-manager selection is not generated yet.",
                  groupId: "package-manager",
                  icon: "terminal",
                  comingSoon: true,
                },
                {
                  id: "npm",
                  label: "npm",
                  description: "Package-manager selection is not generated yet.",
                  groupId: "package-manager",
                  icon: "terminal",
                  comingSoon: true,
                },
                {
                  id: "bun",
                  label: "Bun",
                  description: "Bun runtime tooling is not enabled in this MVP.",
                  groupId: "package-manager",
                  icon: "terminal",
                  comingSoon: true,
                },
                {
                  id: "yarn",
                  label: "yarn",
                  description: "Package-manager selection is not generated yet.",
                  groupId: "package-manager",
                  icon: "terminal",
                  comingSoon: true,
                },
              ],
            },
          ],
        },
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
        icon: iconForModule("styling.tailwind", "tailwind"),
        recommendationReason: recommendationReasonForModule("styling.tailwind"),
        recommended: true,
      },
      {
        id: "css-modules",
        label: "CSS Modules",
        description: "Alternative styling outputs are not implemented yet.",
        groupId: "styling",
        icon: "file",
        comingSoon: true,
      },
      {
        id: "styled-components",
        label: "Styled Components",
        description: "Runtime CSS-in-JS output is not implemented yet.",
        groupId: "styling",
        icon: "palette",
        comingSoon: true,
      },
    ],
  },
  {
    id: "ui",
    title: "UI System",
    description: "Component conventions with nested primitive settings.",
    options: [
      {
        id: "shadcn",
        label: "shadcn-style UI",
        description: "Copy-and-own component conventions with Base UI primitives.",
        moduleId: "ui.shadcn",
        groupId: "ui",
        icon: iconForModule("ui.shadcn", "palette"),
        recommendationReason: recommendationReasonForModule("ui.shadcn"),
        recommended: true,
        customization: {
          title: "Customize shadcn-style UI",
          description:
            "Primitive engine, style, and theme settings are nested under the selected UI system.",
          sections: [
            {
              id: "primitive-engine",
              title: "Primitive engine",
              options: [
                {
                  id: "base-ui",
                  label: "Base UI",
                  description: "Accessible unstyled primitive engine.",
                  moduleId: "primitive-engine.base-ui",
                  groupId: "primitive-engine",
                  groupMode: "exactly-one",
                  icon: iconForModule("primitive-engine.base-ui", "box"),
                  recommendationReason: recommendationReasonForModule("primitive-engine.base-ui"),
                  recommended: true,
                },
                {
                  id: "radix",
                  label: "Radix UI",
                  description: "Radix templates are not connected to generator output yet.",
                  groupId: "primitive-engine",
                  icon: "box",
                  comingSoon: true,
                },
              ],
            },
            {
              id: "style",
              title: "Style",
              options: ["Nova", "Vega", "Maia", "Lyra", "Mira", "Luma", "Sera", "Rhea"].map(
                (label) => ({
                  id: `style-${label.toLowerCase()}`,
                  label,
                  description: "Style variants are not wired to generator output yet.",
                  groupId: "style",
                  icon: "palette",
                  comingSoon: true,
                }),
              ),
            },
            {
              id: "theme",
              title: "Theme",
              options: ["Neutral", "Slate", "Zinc"].map((label) => ({
                id: `theme-${label.toLowerCase()}`,
                label,
                description: "Theme variants are not wired to generator output yet.",
                groupId: "theme",
                icon: "palette",
                comingSoon: true,
              })),
            },
          ],
        },
      },
    ],
  },
  {
    id: "forms",
    title: "Forms & Validation",
    description: "Supported form and schema stack.",
    options: [
      {
        id: "react-hook-form-zod",
        label: "React Hook Form + Zod",
        description: "Supported generated form state and validation stack.",
        moduleIds: ["form.react-hook-form", "validation.zod"],
        groupId: "forms-validation",
        icon: iconForModule("form.react-hook-form", "form"),
        recommendationReason:
          "Recommended because it is the supported form and validation stack for generated templates.",
        recommended: true,
        customization: {
          title: "Customize Forms & Validation",
          description:
            "Form engine and schema choices are grouped as one generated stack decision.",
          sections: [
            {
              id: "form-engine",
              title: "Form engine",
              options: [
                {
                  id: "react-hook-form",
                  label: "React Hook Form",
                  description: "Supported form state engine.",
                  moduleId: "form.react-hook-form",
                  groupId: "form-engine",
                  groupMode: "exactly-one",
                  icon: iconForModule("form.react-hook-form", "form"),
                  recommendationReason: recommendationReasonForModule("form.react-hook-form"),
                  recommended: true,
                },
                {
                  id: "tanstack-form",
                  label: "TanStack Form",
                  description: "Alternative form engines are disabled until supported.",
                  groupId: "form-engine",
                  icon: "form",
                  comingSoon: true,
                },
                {
                  id: "conform",
                  label: "Conform",
                  description: "Alternative form engines are disabled until supported.",
                  groupId: "form-engine",
                  icon: "form",
                  comingSoon: true,
                },
              ],
            },
            {
              id: "validation-schema",
              title: "Validation",
              options: [
                {
                  id: "zod",
                  label: "Zod",
                  description: "Supported schema validation engine.",
                  moduleId: "validation.zod",
                  groupId: "validation-schema",
                  groupMode: "exactly-one",
                  icon: iconForModule("validation.zod", "code"),
                  recommendationReason: recommendationReasonForModule("validation.zod"),
                  recommended: true,
                },
                {
                  id: "yup",
                  label: "Yup",
                  description: "Alternative validators are disabled until supported.",
                  groupId: "validation-schema",
                  icon: "code",
                  comingSoon: true,
                },
                {
                  id: "valibot",
                  label: "Valibot",
                  description: "Alternative validators are disabled until supported.",
                  groupId: "validation-schema",
                  icon: "code",
                  comingSoon: true,
                },
              ],
            },
          ],
        },
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
        icon: iconForModule("state.zustand", "stack"),
        recommendationReason: recommendationReasonForModule("state.zustand"),
        recommended: true,
      },
      {
        id: "axios",
        label: "Axios",
        description: "Supported HTTP client module.",
        moduleId: "http.axios",
        groupId: "http-client",
        groupMode: "exactly-one",
        icon: iconForModule("http.axios", "cloud"),
        recommendationReason: recommendationReasonForModule("http.axios"),
        recommended: true,
      },
      {
        id: "postgresql",
        label: "PostgreSQL",
        description: "Database generation is outside the MVP.",
        groupId: "database",
        icon: "database",
        comingSoon: true,
      },
      {
        id: "prisma",
        label: "Prisma",
        description: "ORM generation is outside the MVP.",
        groupId: "database",
        icon: "database",
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
    icon: iconForModule("component.button", "box"),
  },
  {
    id: "input",
    label: "Input",
    description: "Text input primitive for forms and block requirements.",
    moduleId: "component.input",
    groupId: "components",
    icon: iconForModule("component.input", "input"),
  },
  {
    id: "textarea",
    label: "Textarea",
    description: "Multi-line text input primitive.",
    moduleId: "component.textarea",
    groupId: "components",
    icon: iconForModule("component.textarea", "text"),
  },
  {
    id: "label",
    label: "Label",
    description: "Accessible form label primitive.",
    moduleId: "component.label",
    groupId: "components",
    icon: iconForModule("component.label", "text"),
  },
  {
    id: "avatar",
    label: "Avatar",
    description: "Identity primitive for account and presence surfaces.",
    moduleId: "component.avatar",
    groupId: "components",
    icon: iconForModule("component.avatar", "user"),
  },
  {
    id: "dropdown",
    label: "Dropdown",
    description: "Composite menu and account action primitive.",
    moduleId: "component.dropdown",
    groupId: "components",
    icon: iconForModule("component.dropdown", "menu"),
  },
  {
    id: "sheet",
    label: "Sheet",
    description: "Slide-over panel for responsive navigation.",
    moduleId: "component.sheet",
    groupId: "components",
    icon: iconForModule("component.sheet", "layout"),
  },
  {
    id: "form",
    label: "Form",
    description: "Form helpers wired to React Hook Form and Zod.",
    moduleId: "component.form",
    groupId: "components",
    icon: iconForModule("component.form", "form"),
  },
]

export const blockOptions: BuilderOption[] = [
  {
    id: "navbar",
    label: "Navbar",
    description: "Top navigation with search and account controls.",
    moduleId: "block.navbar",
    groupId: "blocks",
    icon: iconForModule("block.navbar", "layout"),
  },
  {
    id: "sidebar",
    label: "Sidebar",
    description: "Application sidebar navigation.",
    moduleId: "block.sidebar",
    groupId: "blocks",
    icon: iconForModule("block.sidebar", "sidebar"),
  },
  {
    id: "messaging-input",
    label: "Messaging Input",
    description: "Chat composer with input and send action.",
    moduleId: "block.messaging-input",
    groupId: "blocks",
    icon: iconForModule("block.messaging-input", "message"),
  },
  {
    id: "typing-indicator",
    label: "Typing Indicator",
    description: "Activity indicator for chat threads.",
    moduleId: "block.typing-indicator",
    groupId: "blocks",
    icon: iconForModule("block.typing-indicator", "chat"),
  },
  {
    id: "online-presence",
    label: "Online Presence",
    description: "Presence indicator paired with Avatar.",
    moduleId: "block.online-presence",
    groupId: "blocks",
    icon: iconForModule("block.online-presence", "user"),
  },
  {
    id: "settings-form",
    label: "Settings Form",
    description: "Workspace settings form backed by Form, RHF, and Zod.",
    moduleId: "block.settings-form",
    groupId: "blocks",
    icon: iconForModule("block.settings-form", "settings"),
  },
  {
    id: "auth-form",
    label: "Auth Form",
    description: "Authentication flows are outside this MVP.",
    groupId: "blocks",
    icon: "form",
    comingSoon: true,
  },
  {
    id: "data-table",
    label: "Data Table",
    description: "Table generation is not implemented yet.",
    groupId: "blocks",
    icon: "table",
    comingSoon: true,
  },
  {
    id: "dashboard-shell",
    label: "Dashboard Shell",
    description: "Shell-level dashboard generation is not implemented yet.",
    groupId: "blocks",
    icon: "dashboard",
    comingSoon: true,
  },
  {
    id: "command-menu",
    label: "Command Menu",
    description: "Command menu generation is not implemented yet.",
    groupId: "blocks",
    icon: "command",
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
    recommendationReason:
      "Recommended because it is the default compact structure for MVP templates.",
    meta: "Default for React Recommended and Custom",
    icon: iconForModule("structure.react.simple", "folder"),
  },
  {
    id: "feature-based",
    label: "Feature-based",
    description: "Colocates feature pages, components, schemas, and route-owned code.",
    moduleId: "structure.react.feature-based",
    groupId: "project-structure",
    groupMode: "exactly-one",
    meta: "Default for SaaS Dashboard and Chat App",
    icon: iconForModule("structure.react.feature-based", "stack"),
  },
  {
    id: "route-colocated",
    label: "Route-colocated",
    description: "Keeps route pages and route-owned files together under routes.",
    moduleId: "structure.react.route-colocated",
    groupId: "project-structure",
    groupMode: "exactly-one",
    meta: "For route-first source ownership",
    icon: iconForModule("structure.react.route-colocated", "route"),
  },
]

export const allSelectableOptions = [
  ...coreOptionGroups.flatMap((group) => group.options),
  ...coreOptionGroups.flatMap((group) =>
    group.options.flatMap(
      (option) => option.customization?.sections.flatMap((section) => section.options) ?? [],
    ),
  ),
  ...componentOptions,
  ...blockOptions,
  ...projectStructureOptions,
]
