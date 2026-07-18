import { catalog } from "@dittosh/catalog"
import { lazy, Suspense } from "react"

import {
  registryAppPreviewIds,
  registryFixturePreviewIds,
  registryPreviewIds,
} from "./preview-capabilities"

const RegistryPreview = lazy(async () => {
  const previews = await import("./registry-component-previews")
  return { default: previews.RegistryPreview }
})

const RegistryFixturePreview = lazy(async () => {
  const previews = await import("./registry-fixture-previews")
  return { default: previews.RegistryFixturePreview }
})

const RegistryAppPreview = lazy(async () => {
  const previews = await import("./registry-app-previews")
  return { default: previews.RegistryAppPreview }
})

type CatalogPreview = {
  id: string
  moduleId: string
  label: string
  kind: "primitive" | "composite" | "block" | "page"
  viewport: "component" | "desktop"
}

const previewKinds = new Set(["primitive", "composite", "block", "page"])
const previewViewports = new Set(["component", "desktop"])

function previewFromMetadata(manifest: (typeof catalog)[number]): CatalogPreview | undefined {
  const preview = manifest.metadata?.preview

  if (
    typeof preview !== "object" ||
    preview === null ||
    !("id" in preview) ||
    !("kind" in preview) ||
    !("viewport" in preview) ||
    typeof preview.id !== "string" ||
    typeof preview.kind !== "string" ||
    typeof preview.viewport !== "string" ||
    !previewKinds.has(preview.kind) ||
    !previewViewports.has(preview.viewport)
  ) {
    return undefined
  }

  return {
    id: preview.id,
    moduleId: manifest.id,
    label: manifest.ui?.label ?? manifest.label,
    kind: preview.kind as CatalogPreview["kind"],
    viewport: preview.viewport as CatalogPreview["viewport"],
  }
}

const catalogPreviews = catalog.map(previewFromMetadata).filter((preview) => preview !== undefined)

function unavailablePreview() {
  return (
    <main className="grid min-h-dvh place-content-center gap-3 bg-(--color-background) p-8 text-center">
      <h1 className="font-(family-name:--font-display) text-4xl font-bold">Preview unavailable</h1>
      <p className="text-(--color-muted-foreground)">
        This catalog item does not expose an executable registry preview.
      </p>
    </main>
  )
}

export function CatalogPreviewRoute({ previewId }: { previewId: string }) {
  const preview = catalogPreviews.find((candidate) => candidate.id === previewId)

  if (preview === undefined || !registryPreviewIds.has(preview.moduleId)) {
    return unavailablePreview()
  }

  const Preview = registryFixturePreviewIds.has(preview.moduleId)
    ? RegistryFixturePreview
    : registryAppPreviewIds.has(preview.moduleId)
      ? RegistryAppPreview
      : RegistryPreview

  return (
    <main className="min-h-dvh" aria-label={`${preview.label} preview`}>
      <Suspense
        fallback={
          <div className="grid min-h-dvh place-items-center bg-(--color-background) font-(family-name:--font-mono) text-xs font-bold uppercase text-(--color-muted-foreground)">
            Loading registry preview…
          </div>
        }
      >
        <Preview moduleId={preview.moduleId} />
      </Suspense>
    </main>
  )
}
