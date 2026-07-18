import { lazy, Suspense, type ComponentType, type ReactElement, type ReactNode } from "react"
import { MemoryRouter } from "react-router-dom"

import { AppSidebar } from "virtual:ditto-fixture/app-sidebar"
import DashboardLayout from "virtual:ditto-fixture/dashboard-layout"
import { PREFERENCE_DEFAULTS } from "virtual:ditto-fixture/preferences-config"
import { PreferencesStoreProvider } from "virtual:ditto-fixture/preferences-provider"
import { SidebarProvider } from "virtual:ditto-fixture/sidebar"
import { TooltipProvider } from "virtual:ditto-fixture/tooltip"

import { registryFixturePreviewIds } from "./preview-capabilities"

type PreviewRenderer = () => ReactElement

const AuthV1LoginPage = lazy(() => import("virtual:ditto-fixture-page/auth/v1/login"))
const AuthV1RegisterPage = lazy(() => import("virtual:ditto-fixture-page/auth/v1/register"))
const AuthV2LoginPage = lazy(() => import("virtual:ditto-fixture-page/auth/v2/login"))
const AuthV2RegisterPage = lazy(() => import("virtual:ditto-fixture-page/auth/v2/register"))
const AuthV2LoginLayout = lazy(() => import("virtual:ditto-fixture-layout/auth/v2/login"))
const AuthV2RegisterLayout = lazy(() => import("virtual:ditto-fixture-layout/auth/v2/register"))
const ComingSoonPage = lazy(() => import("virtual:ditto-fixture-page/coming-soon"))
const DashboardAcademyPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/academy"))
const DashboardAnalyticsPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/analytics"))
const DashboardCalendarPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/calendar"))
const DashboardCrmPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/crm"))
const DashboardDefaultPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/default"))
const DashboardEcommercePage = lazy(() => import("virtual:ditto-fixture-page/dashboard/ecommerce"))
const DashboardFinancePage = lazy(() => import("virtual:ditto-fixture-page/dashboard/finance"))
const DashboardInfrastructurePage = lazy(
  () => import("virtual:ditto-fixture-page/dashboard/infrastructure"),
)
const DashboardInvoicePage = lazy(() => import("virtual:ditto-fixture-page/dashboard/invoice"))
const DashboardKanbanPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/kanban"))
const DashboardLogisticsPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/logistics"))
const DashboardProductivityPage = lazy(
  () => import("virtual:ditto-fixture-page/dashboard/productivity"),
)
const DashboardRolesPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/roles"))
const DashboardTasksPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/tasks"))
const DashboardUsersPage = lazy(() => import("virtual:ditto-fixture-page/dashboard/users"))
const NotFoundPage = lazy(() => import("virtual:ditto-fixture-page/not-found"))
const UnauthorizedPage = lazy(() => import("virtual:ditto-fixture-page/unauthorized"))

function FixtureRoot({ children, route = "/" }: { children: ReactNode; route?: string }) {
  return (
    <div className="registry-preview-theme min-h-dvh bg-background text-foreground">
      <MemoryRouter initialEntries={[route]}>
        <TooltipProvider>
          <Suspense
            fallback={
              <div className="grid min-h-dvh place-items-center bg-background px-6 text-sm text-muted-foreground">
                Rendering registry source…
              </div>
            }
          >
            {children}
          </Suspense>
        </TooltipProvider>
      </MemoryRouter>
    </div>
  )
}

function Preferences({ children }: { children: ReactNode }) {
  return (
    <PreferencesStoreProvider initialValues={PREFERENCE_DEFAULTS}>
      {children}
    </PreferencesStoreProvider>
  )
}

function dashboardPage(Page: ComponentType, route: string): PreviewRenderer {
  return function DashboardPagePreview() {
    return (
      <FixtureRoot route={route}>
        <Preferences>
          <DashboardLayout>
            <Page />
          </DashboardLayout>
        </Preferences>
      </FixtureRoot>
    )
  }
}

function standalonePage(Page: ComponentType, route: string): PreviewRenderer {
  return function StandalonePagePreview() {
    return (
      <FixtureRoot route={route}>
        <Page />
      </FixtureRoot>
    )
  }
}

function authV2Page(
  Layout: ComponentType<{ children: ReactNode }>,
  Page: ComponentType,
  route: string,
): PreviewRenderer {
  return function AuthV2PagePreview() {
    return (
      <FixtureRoot route={route}>
        <Layout>
          <Page />
        </Layout>
      </FixtureRoot>
    )
  }
}

function DashboardSidebarPreview() {
  return (
    <FixtureRoot route="/dashboard/default">
      <Preferences>
        <SidebarProvider defaultOpen>
          <AppSidebar />
          <main className="min-h-dvh flex-1 bg-muted/30" aria-label="Sidebar preview canvas" />
        </SidebarProvider>
      </Preferences>
    </FixtureRoot>
  )
}

function DashboardLayoutPreview() {
  return (
    <FixtureRoot route="/dashboard/default">
      <Preferences>
        <DashboardLayout>
          <DashboardDefaultPage />
        </DashboardLayout>
      </Preferences>
    </FixtureRoot>
  )
}

const renderers: Record<string, PreviewRenderer> = {
  "block.dashboard-sidebar": DashboardSidebarPreview,
  "block.dashboard-layout": DashboardLayoutPreview,
  "block.sidebar": DashboardSidebarPreview,
  "block.navbar": DashboardLayoutPreview,
  "composition.auth-v1-login": standalonePage(AuthV1LoginPage, "/auth/v1/login"),
  "composition.auth-v1-register": standalonePage(AuthV1RegisterPage, "/auth/v1/register"),
  "composition.auth-v2-login": authV2Page(AuthV2LoginLayout, AuthV2LoginPage, "/auth/v2/login"),
  "composition.auth-v2-register": authV2Page(
    AuthV2RegisterLayout,
    AuthV2RegisterPage,
    "/auth/v2/register",
  ),
  "composition.dashboard-default": dashboardPage(DashboardDefaultPage, "/dashboard/default"),
  "composition.dashboard-analytics": dashboardPage(DashboardAnalyticsPage, "/dashboard/analytics"),
  "composition.dashboard-crm": dashboardPage(DashboardCrmPage, "/dashboard/crm"),
  "composition.dashboard-finance": dashboardPage(DashboardFinancePage, "/dashboard/finance"),
  "composition.dashboard-ecommerce": dashboardPage(DashboardEcommercePage, "/dashboard/ecommerce"),
  "composition.dashboard-productivity": dashboardPage(
    DashboardProductivityPage,
    "/dashboard/productivity",
  ),
  "composition.dashboard-users": dashboardPage(DashboardUsersPage, "/dashboard/users"),
  "composition.dashboard-roles": dashboardPage(DashboardRolesPage, "/dashboard/roles"),
  "composition.dashboard-tasks": dashboardPage(DashboardTasksPage, "/dashboard/tasks"),
  "composition.dashboard-calendar": dashboardPage(DashboardCalendarPage, "/dashboard/calendar"),
  "composition.dashboard-kanban": dashboardPage(DashboardKanbanPage, "/dashboard/kanban"),
  "composition.dashboard-invoice": dashboardPage(DashboardInvoicePage, "/dashboard/invoice"),
  "composition.dashboard-infrastructure": dashboardPage(
    DashboardInfrastructurePage,
    "/dashboard/infrastructure",
  ),
  "composition.dashboard-logistics": dashboardPage(DashboardLogisticsPage, "/dashboard/logistics"),
  "composition.dashboard-academy": dashboardPage(DashboardAcademyPage, "/dashboard/academy"),
  "composition.coming-soon": standalonePage(ComingSoonPage, "/coming-soon"),
  "composition.unauthorized": standalonePage(UnauthorizedPage, "/unauthorized"),
  "composition.not-found": standalonePage(NotFoundPage, "/not-found"),
}

if (
  Object.keys(renderers).some((moduleId) => !registryFixturePreviewIds.has(moduleId)) ||
  [...registryFixturePreviewIds].some((moduleId) => renderers[moduleId] === undefined)
) {
  throw new Error("Generated fixture preview capabilities and renderers are out of sync.")
}

export function RegistryFixturePreview({ moduleId }: { moduleId: string }) {
  const Preview = renderers[moduleId] as ComponentType | undefined
  return Preview === undefined ? null : <Preview />
}
