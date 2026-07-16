import type { ModuleManifest } from "@dittosh/core"

const compositionManifestDefinitions: ModuleManifest[] = [
  {
    id: "composition.react-recommended",
    type: "composition",
    label: "React Recommended Composition",
    description: "Default React recommended landing screen.",
    provides: ["composition.react-recommended"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "React Recommended composition renders the React app root.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "compositions/react-recommended/files/App.tsx",
        slot: "app-root",
        name: "app",
      },
    ],
    ui: {
      label: "React Recommended",
      icon: "react",
      category: "Compositions",
      tags: ["react", "recommended"],
    },
  },
  {
    id: "composition.saas-dashboard",
    type: "composition",
    label: "SaaS Dashboard Composition",
    description: "Dashboard shell that renders navigation, sidebar, and settings form blocks.",
    provides: ["composition.saas-dashboard"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "SaaS Dashboard composition renders the React app root.",
        strength: "hard",
      },
      {
        moduleId: "block.navbar",
        reason: "SaaS Dashboard composition renders Navbar.",
        strength: "hard",
      },
      {
        moduleId: "block.sidebar",
        reason: "SaaS Dashboard composition renders Sidebar.",
        strength: "hard",
      },
      {
        moduleId: "block.settings-form",
        reason: "SaaS Dashboard composition renders SettingsForm.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "compositions/saas-dashboard/files/App.tsx",
        slot: "app-root",
        name: "app",
      },
    ],
    ui: {
      label: "SaaS Dashboard",
      icon: "dashboard",
      category: "Compositions",
      tags: ["saas", "dashboard"],
    },
  },
  {
    id: "composition.chat-app",
    type: "composition",
    label: "Chat App Composition",
    description: "Chat shell that renders navigation and messaging blocks.",
    provides: ["composition.chat-app"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Chat App composition renders the React app root.",
        strength: "hard",
      },
      {
        moduleId: "block.navbar",
        reason: "Chat App composition renders Navbar.",
        strength: "hard",
      },
      {
        moduleId: "block.messaging-input",
        reason: "Chat App composition renders MessagingInput.",
        strength: "hard",
      },
      {
        moduleId: "block.typing-indicator",
        reason: "Chat App composition renders TypingIndicator.",
        strength: "hard",
      },
      {
        moduleId: "block.online-presence",
        reason: "Chat App composition renders OnlinePresence.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "compositions/chat-app/files/App.tsx",
        slot: "app-root",
        name: "app",
      },
    ],
    ui: {
      label: "Chat App",
      icon: "chat",
      category: "Compositions",
      tags: ["chat", "messaging"],
    },
  },
]

export const compositionManifests: ModuleManifest[] = compositionManifestDefinitions.map(
  (manifest) => {
    if (manifest.metadata?.preview !== undefined) {
      return manifest
    }

    return {
      ...manifest,
      metadata: {
        ...(manifest.metadata ?? {}),
        preview: {
          id: `preview.${manifest.id}`,
          kind: "page",
          viewport: "desktop",
        },
      },
    }
  },
)
