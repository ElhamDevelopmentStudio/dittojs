import type { ComponentType } from "react"

import { App as ChatApp } from "virtual:ditto-app-preview/chat-app"
import { App as ReactRecommendedApp } from "virtual:ditto-app-preview/react-recommended"
import { App as SaasDashboardApp } from "virtual:ditto-app-preview/saas-dashboard"

import { registryAppPreviewIds } from "./preview-capabilities"

const previews: Record<string, ComponentType> = {
  "composition.react-recommended": ReactRecommendedApp,
  "composition.saas-dashboard": SaasDashboardApp,
  "composition.chat-app": ChatApp,
}

if (
  Object.keys(previews).some((moduleId) => !registryAppPreviewIds.has(moduleId)) ||
  [...registryAppPreviewIds].some((moduleId) => previews[moduleId] === undefined)
) {
  throw new Error("Generated app preview capabilities and renderers are out of sync.")
}

export function RegistryAppPreview({ moduleId }: { moduleId: string }) {
  const Preview = previews[moduleId]

  return Preview === undefined ? null : (
    <div className="registry-preview-theme min-h-dvh bg-background text-foreground">
      <Preview />
    </div>
  )
}
