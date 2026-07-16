import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

const pageCompositionManifestDefinitions: ModuleManifest[] = [
  {
    id: "composition.auth-v1-login",
    type: "composition",
    label: "Auth v1 login",
    description: "Template auth v1 login page composition.",
    provides: ["composition.auth-v1-login"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Auth v1 login renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Auth v1 login is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Auth v1 login keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        moduleId: "support.auth-shared",
        reason: "Auth v1 login renders shared auth form components.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    files: [
      {
        from: "pages/auth-v1-login/files/page.tsx",
        slot: "page",
        name: "auth-v1-login",
        feature: "auth-v1-login",
        route: "auth/v1/login",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Auth v1 login",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "auth"],
    },
  },
  {
    id: "composition.auth-v1-register",
    type: "composition",
    label: "Auth v1 register",
    description: "Template auth v1 register page composition.",
    provides: ["composition.auth-v1-register"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Auth v1 register renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Auth v1 register is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Auth v1 register keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        moduleId: "support.auth-shared",
        reason: "Auth v1 register renders shared auth form components.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    files: [
      {
        from: "pages/auth-v1-register/files/page.tsx",
        slot: "page",
        name: "auth-v1-register",
        feature: "auth-v1-register",
        route: "auth/v1/register",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Auth v1 register",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "auth"],
    },
  },
  {
    id: "composition.auth-v2-login",
    type: "composition",
    label: "Auth v2 login",
    description: "Template auth v2 login page composition.",
    provides: ["composition.auth-v2-login"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Auth v2 login renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Auth v2 login is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Auth v2 login keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        moduleId: "support.auth-shared",
        reason: "Auth v2 login renders shared auth form components.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Auth v2 login imports ui.separator.",
        strength: "hard",
      },
      {
        moduleId: "support.app-config",
        reason: "Auth v2 login imports support.app-config.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    files: [
      {
        from: "pages/auth-v2-login/files/layout.tsx",
        to: "src/pages/auth/v2/login/layout.tsx",
      },
      {
        from: "pages/auth-v2-login/files/page.tsx",
        slot: "page",
        name: "auth-v2-login",
        feature: "auth-v2-login",
        route: "auth/v2/login",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Auth v2 login",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "auth"],
    },
  },
  {
    id: "composition.auth-v2-register",
    type: "composition",
    label: "Auth v2 register",
    description: "Template auth v2 register page composition.",
    provides: ["composition.auth-v2-register"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Auth v2 register renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Auth v2 register is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Auth v2 register keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        moduleId: "support.auth-shared",
        reason: "Auth v2 register renders shared auth form components.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Auth v2 register imports ui.separator.",
        strength: "hard",
      },
      {
        moduleId: "support.app-config",
        reason: "Auth v2 register imports support.app-config.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    files: [
      {
        from: "pages/auth-v2-register/files/layout.tsx",
        to: "src/pages/auth/v2/register/layout.tsx",
      },
      {
        from: "pages/auth-v2-register/files/page.tsx",
        slot: "page",
        name: "auth-v2-register",
        feature: "auth-v2-register",
        route: "auth/v2/register",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Auth v2 register",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "auth"],
    },
  },
  {
    id: "composition.dashboard-default",
    type: "composition",
    label: "Dashboard default",
    description: "Template dashboard default page composition.",
    provides: ["composition.dashboard-default"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Dashboard default renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Dashboard default is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Dashboard default keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Dashboard default imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Dashboard default imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Dashboard default imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "Dashboard default imports ui.chart.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Dashboard default imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Dashboard default imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Dashboard default imports ui.input.",
        strength: "hard",
      },
      {
        capability: "ui.label",
        reason: "Dashboard default imports ui.label.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Dashboard default imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Dashboard default imports ui.table.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        recharts: packageRange("recharts"),
        zod: packageRange("zod"),
      },
    },
    files: [
      {
        from: "pages/dashboard-default/files/_components/data.json",
        to: "src/pages/dashboard/default/_components/data.json",
      },
      {
        from: "pages/dashboard-default/files/_components/metric-cards.tsx",
        to: "src/pages/dashboard/default/_components/metric-cards.tsx",
      },
      {
        from: "pages/dashboard-default/files/_components/performance-overview.tsx",
        to: "src/pages/dashboard/default/_components/performance-overview.tsx",
      },
      {
        from: "pages/dashboard-default/files/_components/recent-customers-table/columns.tsx",
        to: "src/pages/dashboard/default/_components/recent-customers-table/columns.tsx",
      },
      {
        from: "pages/dashboard-default/files/_components/recent-customers-table/schema.ts",
        to: "src/pages/dashboard/default/_components/recent-customers-table/schema.ts",
      },
      {
        from: "pages/dashboard-default/files/_components/recent-customers-table/table.tsx",
        to: "src/pages/dashboard/default/_components/recent-customers-table/table.tsx",
      },
      {
        from: "pages/dashboard-default/files/_components/subscriber-overview.tsx",
        to: "src/pages/dashboard/default/_components/subscriber-overview.tsx",
      },
      {
        from: "pages/dashboard-default/files/page.tsx",
        slot: "page",
        name: "dashboard-default",
        feature: "dashboarddefault",
        route: "dashboard/default",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Dashboard default",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-analytics",
    type: "composition",
    label: "Analytics dashboard",
    description: "Template analytics dashboard page composition.",
    provides: ["composition.dashboard-analytics"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Analytics dashboard renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Analytics dashboard is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Analytics dashboard keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Analytics dashboard imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Analytics dashboard imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Analytics dashboard imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "Analytics dashboard imports ui.chart.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Analytics dashboard imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Analytics dashboard imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Analytics dashboard imports ui.table.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Analytics dashboard imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        recharts: packageRange("recharts"),
      },
    },
    files: [
      {
        from: "pages/dashboard-analytics/files/_components/analytics-kpi-strip.tsx",
        to: "src/pages/dashboard/analytics/_components/analytics-kpi-strip.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/_components/analytics-toolbar.tsx",
        to: "src/pages/dashboard/analytics/_components/analytics-toolbar.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/_components/realtime-visitors.tsx",
        to: "src/pages/dashboard/analytics/_components/realtime-visitors.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/_components/top-pages.tsx",
        to: "src/pages/dashboard/analytics/_components/top-pages.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/_components/top-traffic-sources.tsx",
        to: "src/pages/dashboard/analytics/_components/top-traffic-sources.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/_components/traffic-quality.tsx",
        to: "src/pages/dashboard/analytics/_components/traffic-quality.tsx",
      },
      {
        from: "pages/dashboard-analytics/files/page.tsx",
        slot: "page",
        name: "dashboard-analytics",
        feature: "dashboardanalytics",
        route: "dashboard/analytics",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      preview: {
        id: "preview.composition.dashboard-analytics",
        kind: "page",
        viewport: "desktop",
      },
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Analytics dashboard",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-crm",
    type: "composition",
    label: "CRM dashboard",
    description: "Template crm dashboard page composition.",
    provides: ["composition.dashboard-crm"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "CRM dashboard renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "CRM dashboard is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "CRM dashboard keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "CRM dashboard imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "CRM dashboard imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "CRM dashboard imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "CRM dashboard imports ui.chart.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "CRM dashboard imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "CRM dashboard imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "CRM dashboard imports ui.input.",
        strength: "hard",
      },
      {
        capability: "ui.pagination",
        reason: "CRM dashboard imports ui.pagination.",
        strength: "hard",
      },
      {
        capability: "ui.progress",
        reason: "CRM dashboard imports ui.progress.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "CRM dashboard imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "CRM dashboard imports ui.table.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        recharts: packageRange("recharts"),
        zod: packageRange("zod"),
      },
    },
    files: [
      {
        from: "pages/dashboard-crm/files/_components/kpi-cards.tsx",
        to: "src/pages/dashboard/crm/_components/kpi-cards.tsx",
      },
      {
        from: "pages/dashboard-crm/files/_components/opportunities-section.tsx",
        to: "src/pages/dashboard/crm/_components/opportunities-section.tsx",
      },
      {
        from: "pages/dashboard-crm/files/_components/opportunities-table/columns.tsx",
        to: "src/pages/dashboard/crm/_components/opportunities-table/columns.tsx",
      },
      {
        from: "pages/dashboard-crm/files/_components/opportunities-table/data.json",
        to: "src/pages/dashboard/crm/_components/opportunities-table/data.json",
      },
      {
        from: "pages/dashboard-crm/files/_components/opportunities-table/schema.ts",
        to: "src/pages/dashboard/crm/_components/opportunities-table/schema.ts",
      },
      {
        from: "pages/dashboard-crm/files/_components/pipeline-activity.tsx",
        to: "src/pages/dashboard/crm/_components/pipeline-activity.tsx",
      },
      {
        from: "pages/dashboard-crm/files/_components/task-reminders.tsx",
        to: "src/pages/dashboard/crm/_components/task-reminders.tsx",
      },
      {
        from: "pages/dashboard-crm/files/page.tsx",
        slot: "page",
        name: "dashboard-crm",
        feature: "dashboardcrm",
        route: "dashboard/crm",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "CRM dashboard",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-finance",
    type: "composition",
    label: "Finance dashboard",
    description: "Template finance dashboard page composition.",
    provides: ["composition.dashboard-finance"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Finance dashboard renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Finance dashboard is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Finance dashboard keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Finance dashboard imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Finance dashboard imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Finance dashboard imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Finance dashboard imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "Finance dashboard imports ui.chart.",
        strength: "hard",
      },
      {
        capability: "ui.field",
        reason: "Finance dashboard imports ui.field.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Finance dashboard imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.item",
        reason: "Finance dashboard imports ui.item.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Finance dashboard imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Finance dashboard imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Finance dashboard imports ui.tabs.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Finance dashboard imports support.simple-icon.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        recharts: packageRange("recharts"),
        "simple-icons": packageRange("simple-icons"),
      },
    },
    files: [
      {
        from: "pages/dashboard-finance/files/_components/balance-distribution-card.tsx",
        to: "src/pages/dashboard/finance/_components/balance-distribution-card.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/finance-notification.tsx",
        to: "src/pages/dashboard/finance/_components/finance-notification.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/income-breakdown.tsx",
        to: "src/pages/dashboard/finance/_components/income-breakdown.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/overview-kpis.tsx",
        to: "src/pages/dashboard/finance/_components/overview-kpis.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/quick-actions.tsx",
        to: "src/pages/dashboard/finance/_components/quick-actions.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/transactions-overview-card.tsx",
        to: "src/pages/dashboard/finance/_components/transactions-overview-card.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/upcoming-transactions.tsx",
        to: "src/pages/dashboard/finance/_components/upcoming-transactions.tsx",
      },
      {
        from: "pages/dashboard-finance/files/_components/wallet.tsx",
        to: "src/pages/dashboard/finance/_components/wallet.tsx",
      },
      {
        from: "pages/dashboard-finance/files/page.tsx",
        slot: "page",
        name: "dashboard-finance",
        feature: "dashboardfinance",
        route: "dashboard/finance",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Finance dashboard",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-ecommerce",
    type: "composition",
    label: "Ecommerce dashboard",
    description: "Template ecommerce dashboard page composition.",
    provides: ["composition.dashboard-ecommerce"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Ecommerce dashboard renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Ecommerce dashboard is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Ecommerce dashboard keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Ecommerce dashboard imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Ecommerce dashboard imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Ecommerce dashboard imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Ecommerce dashboard imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "Ecommerce dashboard imports ui.chart.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Ecommerce dashboard imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Ecommerce dashboard imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.pagination",
        reason: "Ecommerce dashboard imports ui.pagination.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Ecommerce dashboard imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Ecommerce dashboard imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Ecommerce dashboard imports ui.table.",
        strength: "hard",
      },
      {
        capability: "ui.toggle-group",
        reason: "Ecommerce dashboard imports ui.toggle-group.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Ecommerce dashboard imports support.simple-icon.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        recharts: packageRange("recharts"),
        "simple-icons": packageRange("simple-icons"),
      },
    },
    files: [
      {
        from: "pages/dashboard-ecommerce/files/_components/customer-reviews.tsx",
        to: "src/pages/dashboard/ecommerce/_components/customer-reviews.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/inventory.tsx",
        to: "src/pages/dashboard/ecommerce/_components/inventory.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/kpi-strip.tsx",
        to: "src/pages/dashboard/ecommerce/_components/kpi-strip.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/recent-orders-table/columns.tsx",
        to: "src/pages/dashboard/ecommerce/_components/recent-orders-table/columns.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/recent-orders-table/data.json",
        to: "src/pages/dashboard/ecommerce/_components/recent-orders-table/data.json",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/recent-orders-table/formatters.ts",
        to: "src/pages/dashboard/ecommerce/_components/recent-orders-table/formatters.ts",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/recent-orders-table/schema.ts",
        to: "src/pages/dashboard/ecommerce/_components/recent-orders-table/schema.ts",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/recent-orders.tsx",
        to: "src/pages/dashboard/ecommerce/_components/recent-orders.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/store-traffic.tsx",
        to: "src/pages/dashboard/ecommerce/_components/store-traffic.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/top-products.tsx",
        to: "src/pages/dashboard/ecommerce/_components/top-products.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/_components/traffic-sources.tsx",
        to: "src/pages/dashboard/ecommerce/_components/traffic-sources.tsx",
      },
      {
        from: "pages/dashboard-ecommerce/files/page.tsx",
        slot: "page",
        name: "dashboard-ecommerce",
        feature: "dashboardecommerce",
        route: "dashboard/ecommerce",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Ecommerce dashboard",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-productivity",
    type: "composition",
    label: "Productivity dashboard",
    description: "Template productivity dashboard page composition.",
    provides: ["composition.dashboard-productivity"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Productivity dashboard renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Productivity dashboard is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Productivity dashboard keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Productivity dashboard imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Productivity dashboard imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.calendar",
        reason: "Productivity dashboard imports ui.calendar.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Productivity dashboard imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Productivity dashboard imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.progress",
        reason: "Productivity dashboard imports ui.progress.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Productivity dashboard imports ui.select.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-productivity/files/_components/calendar-panel.tsx",
        to: "src/pages/dashboard/productivity/_components/calendar-panel.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/focus-card.tsx",
        to: "src/pages/dashboard/productivity/_components/focus-card.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/projects-section.tsx",
        to: "src/pages/dashboard/productivity/_components/projects-section.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/quick-actions.tsx",
        to: "src/pages/dashboard/productivity/_components/quick-actions.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/quote-card.tsx",
        to: "src/pages/dashboard/productivity/_components/quote-card.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/recent-notes-card.tsx",
        to: "src/pages/dashboard/productivity/_components/recent-notes-card.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/summary-cards.tsx",
        to: "src/pages/dashboard/productivity/_components/summary-cards.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/tasks-section.tsx",
        to: "src/pages/dashboard/productivity/_components/tasks-section.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/_components/weekly-summary-card.tsx",
        to: "src/pages/dashboard/productivity/_components/weekly-summary-card.tsx",
      },
      {
        from: "pages/dashboard-productivity/files/page.tsx",
        slot: "page",
        name: "dashboard-productivity",
        feature: "dashboardproductivity",
        route: "dashboard/productivity",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Productivity dashboard",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-users",
    type: "composition",
    label: "Users page",
    description: "Template users page page composition.",
    provides: ["composition.dashboard-users"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Users page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Users page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Users page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Users page imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Users page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Users page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Users page imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Users page imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Users page imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Users page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.kbd",
        reason: "Users page imports ui.kbd.",
        strength: "hard",
      },
      {
        capability: "ui.pagination",
        reason: "Users page imports ui.pagination.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Users page imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Users page imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Users page imports ui.table.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Users page imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-users/files/_components/data.tsx",
        to: "src/pages/dashboard/users/_components/data.tsx",
      },
      {
        from: "pages/dashboard-users/files/_components/users-columns.tsx",
        to: "src/pages/dashboard/users/_components/users-columns.tsx",
      },
      {
        from: "pages/dashboard-users/files/_components/users-table.tsx",
        to: "src/pages/dashboard/users/_components/users-table.tsx",
      },
      {
        from: "pages/dashboard-users/files/_components/users.tsx",
        to: "src/pages/dashboard/users/_components/users.tsx",
      },
      {
        from: "pages/dashboard-users/files/page.tsx",
        slot: "page",
        name: "dashboard-users",
        feature: "dashboardusers",
        route: "dashboard/users",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Users page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-roles",
    type: "composition",
    label: "Roles page",
    description: "Template roles page page composition.",
    provides: ["composition.dashboard-roles"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Roles page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Roles page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Roles page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.alert",
        reason: "Roles page imports ui.alert.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Roles page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Roles page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Roles page imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Roles page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.pagination",
        reason: "Roles page imports ui.pagination.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Roles page imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Roles page imports ui.table.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Roles page imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-roles/files/_components/roles-table/columns.tsx",
        to: "src/pages/dashboard/roles/_components/roles-table/columns.tsx",
      },
      {
        from: "pages/dashboard-roles/files/_components/roles-table/data.ts",
        to: "src/pages/dashboard/roles/_components/roles-table/data.ts",
      },
      {
        from: "pages/dashboard-roles/files/_components/roles-table/table.tsx",
        to: "src/pages/dashboard/roles/_components/roles-table/table.tsx",
      },
      {
        from: "pages/dashboard-roles/files/_components/roles.tsx",
        to: "src/pages/dashboard/roles/_components/roles.tsx",
      },
      {
        from: "pages/dashboard-roles/files/page.tsx",
        slot: "page",
        name: "dashboard-roles",
        feature: "dashboardroles",
        route: "dashboard/roles",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Roles page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-tasks",
    type: "composition",
    label: "Tasks page",
    description: "Template tasks page page composition.",
    provides: ["composition.dashboard-tasks"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Tasks page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Tasks page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Tasks page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Tasks page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Tasks page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.checkbox",
        reason: "Tasks page imports ui.checkbox.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Tasks page imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Tasks page imports ui.input.",
        strength: "hard",
      },
      {
        capability: "ui.pagination",
        reason: "Tasks page imports ui.pagination.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Tasks page imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Tasks page imports ui.table.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@tanstack/react-table": packageRange("@tanstack/react-table"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        zod: packageRange("zod"),
      },
    },
    files: [
      {
        from: "pages/dashboard-tasks/files/_components/columns.tsx",
        to: "src/pages/dashboard/tasks/_components/columns.tsx",
      },
      {
        from: "pages/dashboard-tasks/files/_components/data.ts",
        to: "src/pages/dashboard/tasks/_components/data.ts",
      },
      {
        from: "pages/dashboard-tasks/files/_components/task-priority-filter.tsx",
        to: "src/pages/dashboard/tasks/_components/task-priority-filter.tsx",
      },
      {
        from: "pages/dashboard-tasks/files/_components/task-status-filter.tsx",
        to: "src/pages/dashboard/tasks/_components/task-status-filter.tsx",
      },
      {
        from: "pages/dashboard-tasks/files/_components/tasks-toolbar.tsx",
        to: "src/pages/dashboard/tasks/_components/tasks-toolbar.tsx",
      },
      {
        from: "pages/dashboard-tasks/files/_components/tasks.tsx",
        to: "src/pages/dashboard/tasks/_components/tasks.tsx",
      },
      {
        from: "pages/dashboard-tasks/files/page.tsx",
        slot: "page",
        name: "dashboard-tasks",
        feature: "dashboardtasks",
        route: "dashboard/tasks",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Tasks page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-calendar",
    type: "composition",
    label: "Calendar page",
    description: "Template calendar page page composition.",
    provides: ["composition.dashboard-calendar"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Calendar page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Calendar page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Calendar page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Calendar page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.button-group",
        reason: "Calendar page imports ui.button-group.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Calendar page imports ui.select.",
        strength: "hard",
      },
      {
        moduleId: "support.event-calendar-views",
        reason: "Calendar page imports support.event-calendar-views.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@fullcalendar/react": packageRange("@fullcalendar/react"),
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-calendar/files/_components/calendar.tsx",
        to: "src/pages/dashboard/calendar/_components/calendar.tsx",
      },
      {
        from: "pages/dashboard-calendar/files/_components/events-data.ts",
        to: "src/pages/dashboard/calendar/_components/events-data.ts",
      },
      {
        from: "pages/dashboard-calendar/files/page.tsx",
        slot: "page",
        name: "dashboard-calendar",
        feature: "dashboardcalendar",
        route: "dashboard/calendar",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Calendar page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-kanban",
    type: "composition",
    label: "Kanban page",
    description: "Template kanban page page composition.",
    provides: ["composition.dashboard-kanban"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Kanban page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Kanban page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Kanban page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Kanban page imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Kanban page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Kanban page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.button-group",
        reason: "Kanban page imports ui.button-group.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Kanban page imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Kanban page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.progress",
        reason: "Kanban page imports ui.progress.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Kanban page imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Kanban page imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@dnd-kit/core": packageRange("@dnd-kit/core"),
        "@dnd-kit/sortable": packageRange("@dnd-kit/sortable"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-kanban/files/_components/data.ts",
        to: "src/pages/dashboard/kanban/_components/data.ts",
      },
      {
        from: "pages/dashboard-kanban/files/_components/kanban-column.tsx",
        to: "src/pages/dashboard/kanban/_components/kanban-column.tsx",
      },
      {
        from: "pages/dashboard-kanban/files/_components/kanban.tsx",
        to: "src/pages/dashboard/kanban/_components/kanban.tsx",
      },
      {
        from: "pages/dashboard-kanban/files/_components/sortable-task-card.tsx",
        to: "src/pages/dashboard/kanban/_components/sortable-task-card.tsx",
      },
      {
        from: "pages/dashboard-kanban/files/_components/task-card.tsx",
        to: "src/pages/dashboard/kanban/_components/task-card.tsx",
      },
      {
        from: "pages/dashboard-kanban/files/_components/types.ts",
        to: "src/pages/dashboard/kanban/_components/types.ts",
      },
      {
        from: "pages/dashboard-kanban/files/_components/utils.ts",
        to: "src/pages/dashboard/kanban/_components/utils.ts",
      },
      {
        from: "pages/dashboard-kanban/files/page.tsx",
        slot: "page",
        name: "dashboard-kanban",
        feature: "dashboardkanban",
        route: "dashboard/kanban",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Kanban page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-invoice",
    type: "composition",
    label: "Invoice page",
    description: "Template invoice page page composition.",
    provides: ["composition.dashboard-invoice"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Invoice page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Invoice page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Invoice page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Invoice page imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Invoice page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.button-group",
        reason: "Invoice page imports ui.button-group.",
        strength: "hard",
      },
      {
        capability: "ui.calendar",
        reason: "Invoice page imports ui.calendar.",
        strength: "hard",
      },
      {
        capability: "ui.field",
        reason: "Invoice page imports ui.field.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Invoice page imports ui.input.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Invoice page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.popover",
        reason: "Invoice page imports ui.popover.",
        strength: "hard",
      },
      {
        capability: "ui.select",
        reason: "Invoice page imports ui.select.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Invoice page imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Invoice page imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@dnd-kit/core": packageRange("@dnd-kit/core"),
        "@dnd-kit/modifiers": packageRange("@dnd-kit/modifiers"),
        "@dnd-kit/sortable": packageRange("@dnd-kit/sortable"),
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        "react-dom": packageRange("react-dom"),
        "react-hook-form": packageRange("react-hook-form"),
      },
    },
    files: [
      {
        from: "pages/dashboard-invoice/files/_components/client-selector.tsx",
        to: "src/pages/dashboard/invoice/_components/client-selector.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/data.ts",
        to: "src/pages/dashboard/invoice/_components/data.ts",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-adjustments.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-adjustments.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-details.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-details.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-form.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-form.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-items.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-items.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-paper.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-paper.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice-preview.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice-preview.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/invoice.tsx",
        to: "src/pages/dashboard/invoice/_components/invoice.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/print-invoice.tsx",
        to: "src/pages/dashboard/invoice/_components/print-invoice.tsx",
      },
      {
        from: "pages/dashboard-invoice/files/_components/use-visible-center-position.ts",
        to: "src/pages/dashboard/invoice/_components/use-visible-center-position.ts",
      },
      {
        from: "pages/dashboard-invoice/files/page.tsx",
        slot: "page",
        name: "dashboard-invoice",
        feature: "dashboardinvoice",
        route: "dashboard/invoice",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Invoice page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-infrastructure",
    type: "composition",
    label: "Infrastructure page",
    description: "Template infrastructure page page composition.",
    provides: ["composition.dashboard-infrastructure"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Infrastructure page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Infrastructure page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Infrastructure page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Infrastructure page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Infrastructure page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.collapsible",
        reason: "Infrastructure page imports ui.collapsible.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Infrastructure page imports ui.dropdown.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Infrastructure page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.kbd",
        reason: "Infrastructure page imports ui.kbd.",
        strength: "hard",
      },
      {
        capability: "ui.table",
        reason: "Infrastructure page imports ui.table.",
        strength: "hard",
      },
      {
        moduleId: "support.simple-icon",
        reason: "Infrastructure page imports support.simple-icon.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        "simple-icons": packageRange("simple-icons"),
      },
    },
    files: [
      {
        from: "pages/dashboard-infrastructure/files/_components/infrastructure-data.ts",
        to: "src/pages/dashboard/infrastructure/_components/infrastructure-data.ts",
      },
      {
        from: "pages/dashboard-infrastructure/files/_components/infrastructure-header.tsx",
        to: "src/pages/dashboard/infrastructure/_components/infrastructure-header.tsx",
      },
      {
        from: "pages/dashboard-infrastructure/files/_components/project-environments.tsx",
        to: "src/pages/dashboard/infrastructure/_components/project-environments.tsx",
      },
      {
        from: "pages/dashboard-infrastructure/files/page.tsx",
        slot: "page",
        name: "dashboard-infrastructure",
        feature: "dashboardinfrastructure",
        route: "dashboard/infrastructure",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Infrastructure page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-logistics",
    type: "composition",
    label: "Logistics page",
    description: "Template logistics page page composition.",
    provides: ["composition.dashboard-logistics"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Logistics page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Logistics page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Logistics page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.alert",
        reason: "Logistics page imports ui.alert.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Logistics page imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Logistics page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Logistics page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Logistics page imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Logistics page imports ui.input-group.",
        strength: "hard",
      },
      {
        capability: "ui.scroll-area",
        reason: "Logistics page imports ui.scroll-area.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Logistics page imports ui.separator.",
        strength: "hard",
      },
      {
        capability: "ui.sheet",
        reason: "Logistics page imports ui.sheet.",
        strength: "hard",
      },
      {
        capability: "ui.tabs",
        reason: "Logistics page imports ui.tabs.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "d3-geo": packageRange("d3-geo"),
        "lucide-react": packageRange("lucide-react"),
        react: packageRange("react"),
        "topojson-client": packageRange("topojson-client"),
      },
    },
    files: [
      {
        from: "pages/dashboard-logistics/files/_components/logistics.tsx",
        to: "src/pages/dashboard/logistics/_components/logistics.tsx",
      },
      {
        from: "pages/dashboard-logistics/files/_components/shipment-data.ts",
        to: "src/pages/dashboard/logistics/_components/shipment-data.ts",
      },
      {
        from: "pages/dashboard-logistics/files/_components/shipment-details.tsx",
        to: "src/pages/dashboard/logistics/_components/shipment-details.tsx",
      },
      {
        from: "pages/dashboard-logistics/files/_components/shipment-list.tsx",
        to: "src/pages/dashboard/logistics/_components/shipment-list.tsx",
      },
      {
        from: "pages/dashboard-logistics/files/_components/shipment-route-map.tsx",
        to: "src/pages/dashboard/logistics/_components/shipment-route-map.tsx",
      },
      {
        from: "pages/dashboard-logistics/files/page.tsx",
        slot: "page",
        name: "dashboard-logistics",
        feature: "dashboardlogistics",
        route: "dashboard/logistics",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Logistics page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-academy",
    type: "composition",
    label: "Academy page",
    description: "Template academy page page composition.",
    provides: ["composition.dashboard-academy"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Academy page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Academy page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Academy page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Academy page imports ui.avatar.",
        strength: "hard",
      },
      {
        capability: "ui.badge",
        reason: "Academy page imports ui.badge.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Academy page imports ui.button.",
        strength: "hard",
      },
      {
        capability: "ui.card",
        reason: "Academy page imports ui.card.",
        strength: "hard",
      },
      {
        capability: "ui.chart",
        reason: "Academy page imports ui.chart.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "date-fns": packageRange("date-fns"),
        "lucide-react": packageRange("lucide-react"),
        recharts: packageRange("recharts"),
      },
    },
    files: [
      {
        from: "pages/dashboard-academy/files/_components/assignment-status.tsx",
        to: "src/pages/dashboard/academy/_components/assignment-status.tsx",
      },
      {
        from: "pages/dashboard-academy/files/_components/class-schedule.tsx",
        to: "src/pages/dashboard/academy/_components/class-schedule.tsx",
      },
      {
        from: "pages/dashboard-academy/files/_components/kpi-cards.tsx",
        to: "src/pages/dashboard/academy/_components/kpi-cards.tsx",
      },
      {
        from: "pages/dashboard-academy/files/_components/performance-highlights.tsx",
        to: "src/pages/dashboard/academy/_components/performance-highlights.tsx",
      },
      {
        from: "pages/dashboard-academy/files/_components/upcoming-events.tsx",
        to: "src/pages/dashboard/academy/_components/upcoming-events.tsx",
      },
      {
        from: "pages/dashboard-academy/files/page.tsx",
        slot: "page",
        name: "dashboard-academy",
        feature: "dashboardacademy",
        route: "dashboard/academy",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Academy page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-chat",
    type: "composition",
    label: "Chat page",
    description: "Template chat page page composition.",
    provides: ["composition.dashboard-chat"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Chat page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Chat page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Chat page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Chat page imports ui.button.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-chat/files/page.tsx",
        slot: "page",
        name: "dashboard-chat",
        feature: "dashboardchat",
        route: "dashboard/chat",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Chat page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.dashboard-mail",
    type: "composition",
    label: "Mail page",
    description: "Template mail page page composition.",
    provides: ["composition.dashboard-mail"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Mail page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Mail page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Mail page keeps template relative route files colocated.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Mail page imports ui.button.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
      },
    },
    files: [
      {
        from: "pages/dashboard-mail/files/page.tsx",
        slot: "page",
        name: "dashboard-mail",
        feature: "dashboardmail",
        route: "dashboard/mail",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Mail page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.coming-soon",
    type: "composition",
    label: "Coming soon page",
    description: "Template coming soon page page composition.",
    provides: ["composition.coming-soon"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Coming soon page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Coming soon page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Coming soon page keeps template relative route files colocated.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "pages/coming-soon/files/page.tsx",
        slot: "page",
        name: "coming-soon",
        feature: "coming-soon",
        route: "coming-soon",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Coming soon page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.unauthorized",
    type: "composition",
    label: "Unauthorized page",
    description: "Template unauthorized page page composition.",
    provides: ["composition.unauthorized"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Unauthorized page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Unauthorized page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Unauthorized page keeps template relative route files colocated.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "lucide-react": packageRange("lucide-react"),
        "react-router-dom": packageRange("react-router-dom"),
      },
    },
    files: [
      {
        from: "pages/unauthorized/files/page.tsx",
        slot: "page",
        name: "unauthorized",
        feature: "unauthorized",
        route: "unauthorized",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Unauthorized page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
  {
    id: "composition.not-found",
    type: "composition",
    label: "Not found page",
    description: "Template not found page page composition.",
    provides: ["composition.not-found"],
    requires: [
      {
        moduleId: "framework.react",
        reason: "Not found page renders a React page.",
        strength: "hard",
      },
      {
        moduleId: "routing.react-router",
        reason: "Not found page is routed with createBrowserRouter.",
        strength: "hard",
      },
      {
        capability: "project.structure.react.route-colocated",
        reason: "Not found page keeps template relative route files colocated.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "pages/not-found/files/page.tsx",
        slot: "page",
        name: "not-found",
        feature: "not-found",
        route: "not-found",
      },
    ],
    metadata: {
      templateSource: "template/src/app",
      pageComposition: true,
      mockDataPolicy:
        "Local data and data.json files are copied only with this selected page. Replace local imports with backend API calls before removing them.",
    },
    ui: {
      label: "Not found page",
      icon: "file",
      category: "Pages",
      tags: ["template", "page", "dashboard"],
    },
  },
]

export const pageCompositionManifests: ModuleManifest[] = pageCompositionManifestDefinitions.map(
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
