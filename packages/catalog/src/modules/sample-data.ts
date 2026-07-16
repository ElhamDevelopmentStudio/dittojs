import type { ModuleManifest } from "@dittosh/core"

export const sampleDataManifests: ModuleManifest[] = [
  {
    id: "sample-data.main-chat",
    type: "adapter",
    label: "Main Chat Sample Data",
    description: "Mock data copied from template/app/(main)/chat/_components/data.ts.",
    provides: ["sample-data.main-chat"],
    files: [
      {
        from: "sample-data/main-chat/files/data.ts",
        to: "src/data/main-chat/data.ts",
      },
    ],
    ui: {
      label: "Main Chat Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/chat/_components/data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-legacy-default-v1",
    type: "adapter",
    label: "Main Dashboard Legacy Default V1 Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/(legacy)/default-v1/_components/data.json.",
    provides: ["sample-data.main-dashboard-legacy-default-v1"],
    files: [
      {
        from: "sample-data/main-dashboard-legacy-default-v1/files/data.json",
        to: "src/data/main-dashboard-legacy-default-v1/data.json",
      },
    ],
    ui: {
      label: "Main Dashboard Legacy Default V1 Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/(legacy)/default-v1/_components/data.json",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-calendar-events-data",
    type: "adapter",
    label: "Main Dashboard Calendar Events Data Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/calendar/_components/events-data.ts.",
    provides: ["sample-data.main-dashboard-calendar-events-data"],
    files: [
      {
        from: "sample-data/main-dashboard-calendar-events-data/files/events-data.ts",
        to: "src/data/main-dashboard-calendar-events-data/events-data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Calendar Events Data Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/calendar/_components/events-data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-crm-opportunities-table",
    type: "adapter",
    label: "Main Dashboard Crm Opportunities Table Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/crm/_components/opportunities-table/data.json.",
    provides: ["sample-data.main-dashboard-crm-opportunities-table"],
    files: [
      {
        from: "sample-data/main-dashboard-crm-opportunities-table/files/data.json",
        to: "src/data/main-dashboard-crm-opportunities-table/data.json",
      },
    ],
    ui: {
      label: "Main Dashboard Crm Opportunities Table Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/crm/_components/opportunities-table/data.json",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-default",
    type: "adapter",
    label: "Main Dashboard Default Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/default/_components/data.json.",
    provides: ["sample-data.main-dashboard-default"],
    files: [
      {
        from: "sample-data/main-dashboard-default/files/data.json",
        to: "src/data/main-dashboard-default/data.json",
      },
    ],
    ui: {
      label: "Main Dashboard Default Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/default/_components/data.json",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-ecommerce-recent-orders-table",
    type: "adapter",
    label: "Main Dashboard Ecommerce Recent Orders Table Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/ecommerce/_components/recent-orders-table/data.json.",
    provides: ["sample-data.main-dashboard-ecommerce-recent-orders-table"],
    files: [
      {
        from: "sample-data/main-dashboard-ecommerce-recent-orders-table/files/data.json",
        to: "src/data/main-dashboard-ecommerce-recent-orders-table/data.json",
      },
    ],
    ui: {
      label: "Main Dashboard Ecommerce Recent Orders Table Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source:
        "template/src/app/(main)/dashboard/ecommerce/_components/recent-orders-table/data.json",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-invoice",
    type: "adapter",
    label: "Main Dashboard Invoice Sample Data",
    description: "Mock data copied from template/app/(main)/dashboard/invoice/_components/data.ts.",
    provides: ["sample-data.main-dashboard-invoice"],
    files: [
      {
        from: "sample-data/main-dashboard-invoice/files/data.ts",
        to: "src/data/main-dashboard-invoice/data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Invoice Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/invoice/_components/data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-kanban",
    type: "adapter",
    label: "Main Dashboard Kanban Sample Data",
    description: "Mock data copied from template/app/(main)/dashboard/kanban/_components/data.ts.",
    provides: ["sample-data.main-dashboard-kanban"],
    files: [
      {
        from: "sample-data/main-dashboard-kanban/files/data.ts",
        to: "src/data/main-dashboard-kanban/data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Kanban Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/kanban/_components/data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-logistics-shipment-data",
    type: "adapter",
    label: "Main Dashboard Logistics Shipment Data Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/logistics/_components/shipment-data.ts.",
    provides: ["sample-data.main-dashboard-logistics-shipment-data"],
    files: [
      {
        from: "sample-data/main-dashboard-logistics-shipment-data/files/shipment-data.ts",
        to: "src/data/main-dashboard-logistics-shipment-data/shipment-data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Logistics Shipment Data Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/logistics/_components/shipment-data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-roles-roles-table",
    type: "adapter",
    label: "Main Dashboard Roles Roles Table Sample Data",
    description:
      "Mock data copied from template/app/(main)/dashboard/roles/_components/roles-table/data.ts.",
    provides: ["sample-data.main-dashboard-roles-roles-table"],
    files: [
      {
        from: "sample-data/main-dashboard-roles-roles-table/files/data.ts",
        to: "src/data/main-dashboard-roles-roles-table/data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Roles Roles Table Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/roles/_components/roles-table/data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-tasks",
    type: "adapter",
    label: "Main Dashboard Tasks Sample Data",
    description: "Mock data copied from template/app/(main)/dashboard/tasks/_components/data.ts.",
    provides: ["sample-data.main-dashboard-tasks"],
    files: [
      {
        from: "sample-data/main-dashboard-tasks/files/data.ts",
        to: "src/data/main-dashboard-tasks/data.ts",
      },
    ],
    ui: {
      label: "Main Dashboard Tasks Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/tasks/_components/data.ts",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-dashboard-users",
    type: "adapter",
    label: "Main Dashboard Users Sample Data",
    description: "Mock data copied from template/app/(main)/dashboard/users/_components/data.tsx.",
    provides: ["sample-data.main-dashboard-users"],
    files: [
      {
        from: "sample-data/main-dashboard-users/files/data.tsx",
        to: "src/data/main-dashboard-users/data.tsx",
      },
    ],
    ui: {
      label: "Main Dashboard Users Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/dashboard/users/_components/data.tsx",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
  {
    id: "sample-data.main-mail",
    type: "adapter",
    label: "Main Mail Sample Data",
    description: "Mock data copied from template/app/(main)/mail/_components/data.tsx.",
    provides: ["sample-data.main-mail"],
    files: [
      {
        from: "sample-data/main-mail/files/data.tsx",
        to: "src/data/main-mail/data.tsx",
      },
    ],
    ui: {
      label: "Main Mail Data",
      icon: "database",
      category: "Sample data",
      tags: ["mock-data", "template"],
    },
    metadata: {
      source: "template/src/app/(main)/mail/_components/data.tsx",
      backendReplacement:
        "Replace this file with API calls or server data loaders when integrating a backend.",
    },
  },
]
