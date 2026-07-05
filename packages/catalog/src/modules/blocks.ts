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
        from: "registry/blocks/navbar/files/navbar.tsx",
        to: "src/components/blocks/navbar.tsx",
      },
    ],
    ui: {
      label: "Navbar",
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
        from: "registry/blocks/sidebar/files/sidebar.tsx",
        to: "src/components/blocks/sidebar.tsx",
      },
    ],
    ui: {
      label: "Sidebar",
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
        from: "registry/blocks/messaging-input/files/messaging-input.tsx",
        to: "src/components/blocks/messaging-input.tsx",
      },
    ],
    ui: {
      label: "Messaging Input",
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
        from: "registry/blocks/typing-indicator/files/typing-indicator.tsx",
        to: "src/components/blocks/typing-indicator.tsx",
      },
    ],
    ui: {
      label: "Typing Indicator",
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
        from: "registry/blocks/online-presence/files/online-presence.tsx",
        to: "src/components/blocks/online-presence.tsx",
      },
    ],
    ui: {
      label: "Online Presence",
      category: "Blocks",
      tags: ["chat", "status"],
    },
  },
]
