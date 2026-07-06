import type { ModuleManifest } from "@dittojs/core"

export const blockManifests: ModuleManifest[] = [
  {
    id: "block.navbar",
    type: "block",
    label: "Navbar",
    description: "Application top navigation with search and account controls.",
    provides: ["block.navbar"],
    requires: [
      {
        capability: "ui.button",
        reason: "Navbar uses Button for navigation actions.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Navbar uses Input for search.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Navbar uses Avatar for the user menu.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Navbar uses Dropdown for account actions.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/navbar/files/navbar.tsx",
        slot: "block",
        name: "navbar",
        feature: "layout",
      },
    ],
    ui: {
      label: "Navbar",
      icon: "layout",
      category: "Blocks",
      tags: ["navigation", "layout"],
    },
  },
  {
    id: "block.sidebar",
    type: "block",
    label: "Sidebar",
    description: "Application sidebar navigation.",
    provides: ["block.sidebar"],
    requires: [
      {
        capability: "ui.button",
        reason: "Sidebar uses Button for navigation actions.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Sidebar uses Input for filtering navigation.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/sidebar/files/sidebar.tsx",
        slot: "block",
        name: "sidebar",
        feature: "layout",
      },
    ],
    ui: {
      label: "Sidebar",
      icon: "sidebar",
      category: "Blocks",
      tags: ["navigation", "layout"],
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
