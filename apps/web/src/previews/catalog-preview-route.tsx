import { catalog } from "@dittojs/catalog"
import type { ReactElement } from "react"

type CatalogPreview = {
  id: string
  moduleId: string
  label: string
  description: string
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
    !("viewport" in preview)
  ) {
    return undefined
  }

  if (
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
    description: manifest.description ?? "Catalog-backed preview.",
    kind: preview.kind as CatalogPreview["kind"],
    viewport: preview.viewport as CatalogPreview["viewport"],
  }
}

const catalogPreviews = catalog.map(previewFromMetadata).filter((preview) => preview !== undefined)

function ButtonPreview(_preview: CatalogPreview) {
  return (
    <div className="preview-center preview-component-surface">
      <div className="preview-component-stack">
        <button type="button" className="preview-button preview-button-primary">
          Create template
        </button>
        <button type="button" className="preview-button preview-button-secondary">
          View manifest
        </button>
        <button type="button" className="preview-button preview-button-ghost">
          Cancel
        </button>
      </div>
    </div>
  )
}

function CardPreview(_preview: CatalogPreview) {
  return (
    <div className="preview-center preview-component-surface">
      <article className="preview-card">
        <span className="preview-kicker">Analytics</span>
        <h1>Conversion Rate</h1>
        <strong>8.42%</strong>
        <p>Up 1.2% from the previous template run.</p>
      </article>
    </div>
  )
}

function DashboardLayoutPreview(_preview: CatalogPreview) {
  return (
    <div className="preview-dashboard">
      <aside className="preview-sidebar">
        <strong>Acme</strong>
        <nav>
          <span className="is-active">Dashboard</span>
          <span>Analytics</span>
          <span>Customers</span>
          <span>Settings</span>
        </nav>
      </aside>
      <main className="preview-dashboard-main">
        <header>
          <div>
            <span className="preview-kicker">Workspace</span>
            <h1>Dashboard layout</h1>
          </div>
          <button type="button" className="preview-button preview-button-secondary">
            Search
          </button>
        </header>
        <section className="preview-metric-grid">
          <div />
          <div />
          <div />
        </section>
        <section className="preview-content-grid">
          <div className="preview-panel large" />
          <div className="preview-panel" />
        </section>
      </main>
    </div>
  )
}

function AnalyticsDashboardPreview(_preview: CatalogPreview) {
  return (
    <div className="preview-page">
      <header className="preview-page-header">
        <div>
          <span className="preview-kicker">Dashboard</span>
          <h1>Analytics dashboard</h1>
        </div>
        <button type="button" className="preview-button preview-button-primary">
          Export
        </button>
      </header>
      <section className="preview-metric-grid">
        <article>
          <span>Visitors</span>
          <strong>128.4k</strong>
        </article>
        <article>
          <span>Revenue</span>
          <strong>$84.2k</strong>
        </article>
        <article>
          <span>Conversion</span>
          <strong>8.42%</strong>
        </article>
      </section>
      <section className="preview-analytics-grid">
        <div className="preview-chart">
          <i style={{ height: "34%" }} />
          <i style={{ height: "52%" }} />
          <i style={{ height: "46%" }} />
          <i style={{ height: "70%" }} />
          <i style={{ height: "58%" }} />
          <i style={{ height: "82%" }} />
        </div>
        <div className="preview-table">
          <span />
          <span />
          <span />
          <span />
        </div>
      </section>
    </div>
  )
}

function GenericCatalogPreview({ label, description, kind, moduleId }: CatalogPreview) {
  return (
    <div className="preview-center preview-component-surface">
      <article className="preview-generic-card">
        <span className="preview-kicker">{kind}</span>
        <h1>{label}</h1>
        <p>{description}</p>
        <dl>
          <div>
            <dt>Catalog id</dt>
            <dd>{moduleId}</dd>
          </div>
          <div>
            <dt>Preview source</dt>
            <dd>manifest metadata</dd>
          </div>
        </dl>
      </article>
    </div>
  )
}

const previewRenderers: Record<string, (preview: CatalogPreview) => ReactElement> = {
  "component.button": ButtonPreview,
  "component.card": CardPreview,
  "block.dashboard-layout": DashboardLayoutPreview,
  "composition.dashboard-analytics": AnalyticsDashboardPreview,
}

export function CatalogPreviewRoute({ previewId }: { previewId: string }) {
  const preview = catalogPreviews.find((candidate) => candidate.id === previewId)

  if (preview === undefined) {
    return (
      <main className="preview-unavailable">
        <h1>Preview unavailable</h1>
        <p>This catalog item does not expose a preview manifest yet.</p>
      </main>
    )
  }

  const Preview = previewRenderers[preview.moduleId] ?? GenericCatalogPreview

  return (
    <main className="catalog-preview-root" aria-label={`${preview.label} preview`}>
      <Preview {...preview} />
    </main>
  )
}
