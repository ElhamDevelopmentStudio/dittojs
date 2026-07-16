import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

const blockManifestDefinitions: ModuleManifest[] = [
  {
    id: "block.dashboard-sidebar",
    type: "block",
    label: "Template Dashboard Sidebar",
    description: "Template dashboard sidebar navigation block.",
    provides: ["block.dashboard-sidebar", "block.sidebar"],
    requires: [
      {
        capability: "ui.avatar",
        reason: "Sidebar account controls render Avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Sidebar account controls render Badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Sidebar controls render Button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Sidebar support card renders Card.",
        strength: "hard",
      },
      {
        capability: "ui.collapsible",
        reason: "Sidebar navigation groups use Collapsible.",
        strength: "hard",
      },
      {
        capability: "ui.command",
        reason: "Sidebar search uses Command.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Sidebar menus use Dropdown Menu.",
        strength: "hard",
      },
      {
        capability: "ui.label",
        reason: "Layout controls render Label.",
        strength: "hard",
      },
      {
        capability: "ui.popover",
        reason: "Layout controls render Popover.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Layout controls render Select.",
        strength: "hard",
      },
      {
        capability: "ui.sidebar",
        reason: "Sidebar block renders the shadcn Sidebar component.",
        strength: "hard",
      },
      {
        capability: "ui.toggle-group",
        reason: "Layout controls render ToggleGroup.",
        strength: "hard",
      },
      {
        moduleId: "support.app-config",
        reason: "Sidebar displays template app configuration.",
        strength: "hard",
      },
      {
        moduleId: "support.preferences",
        reason: "Sidebar reads and updates template preferences.",
        strength: "hard",
      },
      {
        moduleId: "support.sidebar-items",
        reason: "Sidebar renders template navigation item data.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Sidebar support card renders SimpleIcon.",
        strength: "hard",
      },
      {
        moduleId: "support.users-data",
        reason: "Sidebar renders template root user data.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Sidebar navigation uses React Router links.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "react-router-dom": packageRange("react-router-dom"),
        zustand: packageRange("zustand"),
        "simple-icons": packageRange("simple-icons"),
        "lucide-react": packageRange("lucide-react"),
      },
    },
    files: [
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/account-switcher.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/account-switcher.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/app-sidebar.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/app-sidebar.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/layout-controls.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/layout-controls.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/nav-documents.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/nav-documents.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/nav-main.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/nav-main.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/nav-secondary.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/nav-secondary.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/nav-user.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/nav-user.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/search-dialog.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/search-dialog.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/sidebar-support-card.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/sidebar-support-card.tsx",
      },
      {
        from: "blocks/dashboard-sidebar/files/_components/sidebar/theme-switcher.tsx",
        to: "src/app/(main)/dashboard/_components/sidebar/theme-switcher.tsx",
      },
    ],
    ui: {
      label: "Dashboard sidebar",
      icon: "sidebar",
      category: "Blocks",
      tags: ["template", "navigation", "layout"],
    },
  },
  {
    id: "block.dashboard-layout",
    type: "block",
    label: "Template Dashboard Layout",
    description: "Template dashboard layout with sidebar provider and header controls.",
    provides: ["block.dashboard-layout", "block.navbar"],
    requires: [
      {
        capability: "ui.button",
        reason: "Dashboard layout renders Button controls.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Dashboard layout renders Separator.",
        strength: "hard",
      },
      {
        capability: "ui.sidebar",
        reason: "Dashboard layout renders SidebarProvider and SidebarInset.",
        strength: "hard",
      },
      {
        moduleId: "block.dashboard-sidebar",
        reason: "Dashboard layout renders the template dashboard sidebar.",
        strength: "hard",
      },
      {
        moduleId: "support.preferences",
        reason: "Dashboard layout reads persisted preferences.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Dashboard layout renders SimpleIcon.",
        strength: "hard",
      },
      {
        moduleId: "support.users-data",
        reason: "Dashboard layout renders account data.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "simple-icons": packageRange("simple-icons"),
      },
    },
    files: [
      {
        from: "blocks/dashboard-layout/files/layout.tsx",
        to: "src/app/(main)/dashboard/layout.tsx",
      },
    ],
    metadata: {
      preview: {
        id: "preview.block.dashboard-layout",
        kind: "block",
        viewport: "desktop",
      },
    },
    ui: {
      label: "Dashboard layout",
      icon: "layout-dashboard",
      category: "Blocks",
      tags: ["template", "layout", "navigation"],
    },
  },
  {
    id: "block.sidebar",
    type: "block",
    label: "Sidebar",
    description: "Compatibility selection for the template dashboard sidebar.",
    provides: ["block.sidebar"],
    requires: [
      {
        moduleId: "block.dashboard-sidebar",
        reason: "Sidebar is provided by the template dashboard sidebar block.",
        strength: "hard",
      },
    ],
    metadata: {
      compatibilityAliasFor: "block.dashboard-sidebar",
    },
    ui: {
      label: "Sidebar",
      icon: "sidebar",
      category: "Blocks",
      tags: ["template", "navigation", "compatibility"],
    },
  },
  {
    id: "block.navbar",
    type: "block",
    label: "Navbar",
    description: "Compatibility selection for the template dashboard layout header controls.",
    provides: ["block.navbar"],
    requires: [
      {
        moduleId: "block.dashboard-layout",
        reason: "Navbar/header behavior is provided by the template dashboard layout block.",
        strength: "hard",
      },
    ],
    metadata: {
      compatibilityAliasFor: "block.dashboard-layout",
    },
    ui: {
      label: "Navbar",
      icon: "layout",
      category: "Blocks",
      tags: ["template", "navigation", "compatibility"],
    },
  },
  {
    id: "block.messaging-input",
    type: "block",
    label: "Messaging Input",
    description: "Chat composer with text input and send action.",
    provides: ["block.messaging-input"],
    requires: [
      {
        capability: "ui.input",
        reason: "Messaging Input uses Input for the message composer.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Messaging Input uses Button for sending messages.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/messaging-input/files/messaging-input.tsx",
        slot: "block",
        name: "messaging-input",
        feature: "messaging",
      },
    ],
    ui: {
      label: "Messaging Input",
      icon: "message",
      category: "Blocks",
      tags: ["chat", "input"],
    },
  },
  {
    id: "block.typing-indicator",
    type: "block",
    label: "Typing Indicator",
    description: "Small activity indicator for chat threads.",
    provides: ["block.typing-indicator"],
    files: [
      {
        from: "blocks/typing-indicator/files/typing-indicator.tsx",
        slot: "block",
        name: "typing-indicator",
        feature: "messaging",
      },
    ],
    ui: {
      label: "Typing Indicator",
      icon: "chat",
      category: "Blocks",
      tags: ["chat", "status"],
    },
  },
  {
    id: "block.online-presence",
    type: "block",
    label: "Online Presence",
    description: "Presence indicator paired with user identity.",
    provides: ["block.online-presence"],
    requires: [
      {
        capability: "ui.avatar",
        reason: "Online Presence uses Avatar for user identity.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/online-presence/files/online-presence.tsx",
        slot: "block",
        name: "online-presence",
        feature: "messaging",
      },
    ],
    ui: {
      label: "Online Presence",
      icon: "user",
      category: "Blocks",
      tags: ["chat", "status"],
    },
  },
  {
    id: "block.settings-form",
    type: "block",
    label: "Settings Form",
    description: "Workspace settings form with React Hook Form and Zod validation.",
    provides: ["block.settings-form"],
    requires: [
      {
        capability: "ui.form",
        reason: "Settings Form uses generated form helpers.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Settings Form uses Input for workspace fields.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Settings Form uses Button for submit actions.",
        strength: "hard",
      },
      {
        capability: "form.engine",
        reason: "Settings Form needs a form state engine.",
        strength: "hard",
      },
      {
        capability: "validation.schema",
        reason: "Settings Form validates settings with a schema engine.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/settings-form/files/settings-form.tsx",
        slot: "form-component",
        name: "settings-form",
        feature: "settings",
        route: "settings",
      },
    ],
    ui: {
      label: "Settings Form",
      icon: "settings",
      category: "Blocks",
      tags: ["settings", "form"],
    },
  },
]

export const blockManifests: ModuleManifest[] = blockManifestDefinitions.map((manifest) => {
  if (manifest.metadata?.preview !== undefined) {
    return manifest
  }

  return {
    ...manifest,
    metadata: {
      ...(manifest.metadata ?? {}),
      preview: {
        id: `preview.${manifest.id}`,
        kind: "block",
        viewport: "desktop",
      },
    },
  }
})
