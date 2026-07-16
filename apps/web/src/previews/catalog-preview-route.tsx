import { catalog } from "@dittosh/catalog"
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

const previewButton =
  "inline-flex min-h-11 items-center justify-center border px-4 text-sm font-semibold transition hover:-translate-y-px"
const previewKicker =
  "font-(family-name:--font-mono) text-[0.65rem] font-bold uppercase text-(--builder-accent)"

function ButtonPreview(_preview: CatalogPreview) {
  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-background) p-8">
      <div className="grid min-w-64 gap-3">
        <button
          type="button"
          className={`${previewButton} border-(--builder-accent) bg-(--builder-accent) text-white`}
        >
          Create template
        </button>
        <button
          type="button"
          className={`${previewButton} border-(--color-border-strong) bg-white text-(--color-foreground)`}
        >
          View manifest
        </button>
        <button
          type="button"
          className={`${previewButton} border-transparent bg-transparent text-(--color-muted-foreground)`}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function CardPreview(_preview: CatalogPreview) {
  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-background) p-8">
      <article className="grid w-full max-w-104 gap-3 border border-(--color-border-strong) border-t-[0.35rem] border-t-(--builder-accent) bg-white p-7 shadow-[0.45rem_0.45rem_0_rgba(23,26,25,0.08)]">
        <span className={previewKicker}>Analytics</span>
        <h1 className="font-(family-name:--font-display) text-2xl font-bold">Conversion Rate</h1>
        <strong className="font-(family-name:--font-display) text-5xl tracking-[-0.05em]">
          8.42%
        </strong>
        <p className="text-sm text-(--color-muted-foreground)">
          Up 1.2% from the previous template run.
        </p>
      </article>
    </div>
  )
}

function DashboardLayoutPreview(_preview: CatalogPreview) {
  return (
    <div className="grid min-h-dvh grid-cols-[14rem_1fr] bg-(--color-background) max-[700px]:grid-cols-1">
      <aside className="grid content-start gap-8 bg-(--builder-ink) p-6 text-white max-[700px]:hidden">
        <strong className="font-(family-name:--font-display) text-xl">Acme</strong>
        <nav className="grid gap-2 text-sm text-[#b9bfbb]">
          <span className="border-l-2 border-(--builder-accent) bg-white/8 px-3 py-2 text-white">
            Dashboard
          </span>
          <span className="px-3 py-2">Analytics</span>
          <span className="px-3 py-2">Customers</span>
          <span className="px-3 py-2">Settings</span>
        </nav>
      </aside>
      <main className="grid content-start gap-6 p-[clamp(1.5rem,4vw,3rem)]">
        <header className="flex items-center justify-between gap-4 border-b border-(--color-border) pb-5">
          <div>
            <span className={previewKicker}>Workspace</span>
            <h1 className="font-(family-name:--font-display) text-3xl font-bold">
              Dashboard layout
            </h1>
          </div>
          <button
            type="button"
            className={`${previewButton} border-(--color-border-strong) bg-white`}
          >
            Search
          </button>
        </header>
        <section className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
          <div className="h-28 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white" />
          <div className="h-28 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white" />
          <div className="h-28 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white" />
        </section>
        <section className="grid grid-cols-[1.5fr_1fr] gap-4 max-[700px]:grid-cols-1">
          <div className="h-72 border border-(--color-border-strong) bg-white" />
          <div className="h-72 border border-(--color-border-strong) bg-white" />
        </section>
      </main>
    </div>
  )
}

function AnalyticsDashboardPreview(_preview: CatalogPreview) {
  return (
    <div className="grid min-h-dvh content-start gap-7 bg-(--color-background) p-[clamp(1.5rem,5vw,4rem)]">
      <header className="flex items-center justify-between gap-4 border-b border-(--color-border-strong) pb-5">
        <div>
          <span className={previewKicker}>Dashboard</span>
          <h1 className="font-(family-name:--font-display) text-[clamp(2rem,5vw,4rem)] leading-none font-bold tracking-[-0.05em]">
            Analytics dashboard
          </h1>
        </div>
        <button
          type="button"
          className={`${previewButton} border-(--builder-accent) bg-(--builder-accent) text-white`}
        >
          Export
        </button>
      </header>
      <section className="grid grid-cols-3 gap-4 max-[700px]:grid-cols-1">
        <article className="grid gap-2 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white p-5">
          <span className="text-sm text-(--color-muted-foreground)">Visitors</span>
          <strong className="font-(family-name:--font-display) text-3xl">128.4k</strong>
        </article>
        <article className="grid gap-2 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white p-5">
          <span className="text-sm text-(--color-muted-foreground)">Revenue</span>
          <strong className="font-(family-name:--font-display) text-3xl">$84.2k</strong>
        </article>
        <article className="grid gap-2 border border-(--color-border-strong) border-t-4 border-t-(--builder-accent) bg-white p-5">
          <span className="text-sm text-(--color-muted-foreground)">Conversion</span>
          <strong className="font-(family-name:--font-display) text-3xl">8.42%</strong>
        </article>
      </section>
      <section className="grid grid-cols-[1.5fr_1fr] gap-4 max-[700px]:grid-cols-1">
        <div className="flex h-80 items-end gap-[clamp(0.5rem,2vw,1.5rem)] border border-(--color-border-strong) bg-white p-6">
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "34%" }} />
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "52%" }} />
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "46%" }} />
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "70%" }} />
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "58%" }} />
          <i className="flex-1 bg-(--builder-accent)" style={{ height: "82%" }} />
        </div>
        <div className="grid content-start gap-4 border border-(--color-border-strong) bg-white p-6">
          <span className="h-10 bg-(--color-surface-muted)" />
          <span className="h-10 bg-(--color-surface-muted)" />
          <span className="h-10 bg-(--color-surface-muted)" />
          <span className="h-10 bg-(--color-surface-muted)" />
        </div>
      </section>
    </div>
  )
}

function GenericCatalogPreview({ label, description, kind, moduleId }: CatalogPreview) {
  return (
    <div className="grid min-h-dvh place-items-center bg-(--color-background) p-8">
      <article className="grid w-full max-w-144 gap-4 border border-(--color-border-strong) border-t-[0.35rem] border-t-(--builder-accent) bg-white p-7 shadow-[0.45rem_0.45rem_0_rgba(23,26,25,0.08)]">
        <span className={previewKicker}>{kind}</span>
        <h1 className="font-(family-name:--font-display) text-3xl font-bold">{label}</h1>
        <p className="text-sm leading-6 text-(--color-muted-foreground)">{description}</p>
        <dl className="grid gap-3 border-t border-(--color-border) pt-4">
          <div className="grid grid-cols-[8rem_1fr] gap-3 text-sm">
            <dt className="text-(--color-muted-foreground)">Catalog id</dt>
            <dd className="font-(family-name:--font-mono) text-xs">{moduleId}</dd>
          </div>
          <div className="grid grid-cols-[8rem_1fr] gap-3 text-sm">
            <dt className="text-(--color-muted-foreground)">Preview source</dt>
            <dd className="font-(family-name:--font-mono) text-xs">manifest metadata</dd>
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
      <main className="grid min-h-dvh place-content-center gap-3 bg-(--color-background) p-8 text-center">
        <h1 className="font-(family-name:--font-display) text-4xl font-bold">
          Preview unavailable
        </h1>
        <p className="text-(--color-muted-foreground)">
          This catalog item does not expose a preview manifest yet.
        </p>
      </main>
    )
  }

  const Preview = previewRenderers[preview.moduleId] ?? GenericCatalogPreview

  return (
    <main
      className="min-h-dvh bg-(--color-background) text-(--color-foreground)"
      aria-label={`${preview.label} preview`}
    >
      <Preview {...preview} />
    </main>
  )
}
