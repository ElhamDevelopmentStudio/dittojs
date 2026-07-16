import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const supportManifests: ModuleManifest[] = [
  {
    id: "support.simple-icon",
    type: "adapter",
    label: "Template SimpleIcon",
    description: "Template simple-icons wrapper component.",
    provides: ["support.simple-icon"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "SimpleIcon uses the generated cn utility.",
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
        from: "support/simple-icon/files/components/simple-icon.tsx",
        to: "src/components/simple-icon.tsx",
      },
    ],
    ui: {
      label: "SimpleIcon",
      icon: "sparkles",
      category: "Support",
      tags: ["template", "icons"],
    },
  },
  {
    id: "support.date-range-picker",
    type: "adapter",
    label: "Template Date Range Picker",
    provides: ["support.date-range-picker"],
    requires: [
      {
        capability: "ui.button",
        reason: "Date range picker renders Button.",
        strength: "hard",
      },
      {
        capability: "ui.calendar",
        reason: "Date range picker renders Calendar.",
        strength: "hard",
      },
      {
        capability: "ui.popover",
        reason: "Date range picker renders Popover.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "date-fns": packageRange("date-fns"),
        "react-day-picker": packageRange("react-day-picker"),
      },
    },
    files: [
      {
        from: "support/date-range-picker/files/components/date-range-picker.tsx",
        to: "src/components/date-range-picker.tsx",
      },
    ],
    ui: {
      label: "Date range picker",
      icon: "calendar",
      category: "Support",
      tags: ["template", "date"],
    },
  },
  {
    id: "support.event-calendar-views",
    type: "adapter",
    label: "Template Event Calendar Views",
    provides: ["support.event-calendar-views"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Event calendar views use cn utility.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@fullcalendar/react": packageRange("@fullcalendar/react"),
      },
    },
    files: [
      {
        from: "support/event-calendar-views/files/components/calendar/event-calendar-views.tsx",
        to: "src/components/calendar/event-calendar-views.tsx",
      },
    ],
    ui: {
      label: "Event calendar views",
      icon: "calendar",
      category: "Support",
      tags: ["template", "calendar"],
    },
  },
  {
    id: "support.app-config",
    type: "adapter",
    label: "Template app config",
    provides: ["support.app-config"],
    files: [
      {
        from: "support/app-config/files/config/app-config.ts",
        to: "src/config/app-config.ts",
      },
    ],
    ui: {
      label: "App config",
      icon: "settings",
      category: "Support",
      tags: ["template", "config"],
    },
  },
  {
    id: "support.users-data",
    type: "adapter",
    label: "Template users data",
    provides: ["support.users-data"],
    files: [
      {
        from: "support/users/files/data/users.ts",
        to: "src/data/users.ts",
      },
    ],
    metadata: {
      mockData: true,
      backendReplacement:
        "Replace src/data/users.ts imports with backend user/account API calls, then remove this file when no selected page imports it.",
    },
    ui: {
      label: "Users data",
      icon: "database",
      category: "Support",
      tags: ["template", "mock-data"],
    },
  },
  {
    id: "support.preferences",
    type: "adapter",
    label: "Template preferences runtime",
    provides: ["support.preferences"],
    packages: {
      dependencies: {
        zustand: packageRange("zustand"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "support/preferences/files/lib/cookie.client.ts",
        to: "src/lib/cookie.client.ts",
      },
      {
        from: "support/preferences/files/lib/fonts/registry.ts",
        to: "src/lib/fonts/registry.ts",
      },
      {
        from: "support/preferences/files/lib/local-storage.client.ts",
        to: "src/lib/local-storage.client.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/layout.ts",
        to: "src/lib/preferences/layout.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/preference-runtime.ts",
        to: "src/lib/preferences/preference-runtime.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/preferences-config.ts",
        to: "src/lib/preferences/preferences-config.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/preferences-storage.ts",
        to: "src/lib/preferences/preferences-storage.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/theme-utils.ts",
        to: "src/lib/preferences/theme-utils.ts",
      },
      {
        from: "support/preferences/files/lib/preferences/theme.ts",
        to: "src/lib/preferences/theme.ts",
      },
      {
        from: "support/preferences/files/server/server-actions.ts",
        to: "src/server/server-actions.ts",
      },
      {
        from: "support/preferences/files/stores/preferences/preferences-provider.tsx",
        to: "src/stores/preferences/preferences-provider.tsx",
      },
      {
        from: "support/preferences/files/stores/preferences/preferences-store.ts",
        to: "src/stores/preferences/preferences-store.ts",
      },
    ],
    ui: {
      label: "Preferences runtime",
      icon: "sliders",
      category: "Support",
      tags: ["template", "preferences"],
    },
  },
  {
    id: "support.sidebar-items",
    type: "adapter",
    label: "Template sidebar items",
    provides: ["support.sidebar-items"],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
      },
    },
    files: [
      {
        from: "support/sidebar-items/files/navigation/sidebar/sidebar-items.ts",
        to: "src/navigation/sidebar/sidebar-items.ts",
      },
    ],
    ui: {
      label: "Sidebar items",
      icon: "list",
      category: "Support",
      tags: ["template", "navigation"],
    },
  },
  {
    id: "support.auth-shared",
    type: "adapter",
    label: "Template auth shared components",
    provides: ["support.auth-shared"],
    requires: [
      {
        capability: "ui.button",
        reason: "Auth forms render Button.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Auth login renders Checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.field",
        reason: "Auth forms render Field helpers.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Auth forms render Input.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Social auth button renders SimpleIcon.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@hookform/resolvers": packageRange("@hookform/resolvers"),
        "react-hook-form": packageRange("react-hook-form"),
        sonner: packageRange("sonner"),
        zod: packageRange("zod"),
      },
    },
    files: [
      {
        from: "support/auth-shared/files/_components/login-form.tsx",
        to: "src/pages/auth/_components/login-form.tsx",
      },
      {
        from: "support/auth-shared/files/_components/register-form.tsx",
        to: "src/pages/auth/_components/register-form.tsx",
      },
      {
        from: "support/auth-shared/files/_components/social-auth/google-button.tsx",
        to: "src/pages/auth/_components/social-auth/google-button.tsx",
      },
    ],
    ui: {
      label: "Auth shared components",
      icon: "key",
      category: "Support",
      tags: ["template", "auth"],
    },
  },
]
