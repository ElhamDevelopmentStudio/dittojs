import type { ModuleManifest } from "@dittosh/core"

type PreviewKind = "primitive" | "composite" | "block" | "page"
type PreviewViewport = "component" | "desktop"

export function withPreviewMetadata(
  manifest: ModuleManifest,
  kind: PreviewKind,
  viewport: PreviewViewport,
): ModuleManifest {
  return {
    ...manifest,
    metadata: {
      ...(manifest.metadata ?? {}),
      preview: {
        id: `preview.${manifest.id}`,
        kind,
        viewport,
      },
    },
  }
}

export function withoutPreviewMetadata(manifest: ModuleManifest): ModuleManifest {
  if (manifest.metadata?.preview === undefined) {
    return manifest
  }

  const metadata = { ...manifest.metadata }
  delete metadata.preview

  const nextManifest: ModuleManifest = { ...manifest, metadata }

  if (Object.keys(metadata).length === 0) {
    delete nextManifest.metadata
  }

  return nextManifest
}
