/// <reference types="vite/client" />

declare module "virtual:ditto-app-preview/react-recommended" {
  import type { ComponentType } from "react"

  export const App: ComponentType
}

declare module "virtual:ditto-app-preview/saas-dashboard" {
  import type { ComponentType } from "react"

  export const App: ComponentType
}

declare module "virtual:ditto-app-preview/chat-app" {
  import type { ComponentType } from "react"

  export const App: ComponentType
}

declare module "virtual:ditto-fixture-page/*" {
  import type { ComponentType } from "react"

  const Page: ComponentType
  export default Page
}

declare module "virtual:ditto-fixture-layout/*" {
  import type { ComponentType, ReactNode } from "react"

  const Layout: ComponentType<{ children: ReactNode }>
  export default Layout
}

declare module "virtual:ditto-fixture/dashboard-layout" {
  import type { ComponentType, ReactNode } from "react"

  const DashboardLayout: ComponentType<{ children: ReactNode }>
  export default DashboardLayout
}

declare module "virtual:ditto-fixture/app-sidebar" {
  import type { ComponentType } from "react"

  export const AppSidebar: ComponentType
}

declare module "virtual:ditto-fixture/sidebar" {
  import type { ComponentType, ReactNode } from "react"

  export const SidebarProvider: ComponentType<{
    children: ReactNode
    defaultOpen?: boolean
  }>
}

declare module "virtual:ditto-fixture/tooltip" {
  import type { ComponentType, ReactNode } from "react"

  export const TooltipProvider: ComponentType<{ children: ReactNode }>
}

declare module "virtual:ditto-fixture/preferences-config" {
  export const PREFERENCE_DEFAULTS: Record<string, string>
}

declare module "virtual:ditto-fixture/preferences-provider" {
  import type { ComponentType, ReactNode } from "react"

  export const PreferencesStoreProvider: ComponentType<{
    children: ReactNode
    initialValues: Record<string, string>
  }>
}
