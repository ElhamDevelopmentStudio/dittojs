import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="app-shell">{children}</div>
}

export function Header({ onHome, onTemplates }: { onHome: () => void; onTemplates: () => void }) {
  return (
    <header className="site-header">
      <button type="button" className="brand-button" onClick={onHome}>
        DittoJs
      </button>
      <nav aria-label="Builder navigation">
        <button type="button" className="nav-link" disabled>
          Docs
        </button>
        <button type="button" className="nav-link is-active" onClick={onTemplates}>
          Templates
        </button>
        <button type="button" className="nav-link" disabled>
          Pricing
        </button>
      </nav>
      <div className="site-actions">
        <button type="button" className="button button-disabled button-compact" disabled>
          Ask the Architect <span>Coming soon</span>
        </button>
      </div>
    </header>
  )
}

export function StepHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="step-header">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}

export function SectionHeader({
  id,
  number,
  title,
  description,
}: {
  id?: string | undefined
  number?: number | undefined
  title: string
  description: string
}) {
  const sectionNumber = number === undefined ? undefined : String(number).padStart(2, "0")

  return (
    <div className="option-group-heading">
      {sectionNumber !== undefined ? <span className="section-number">{sectionNumber}</span> : null}
      <div>
        <h2 id={id}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}

export function FooterActions({ children }: { children: ReactNode }) {
  return <div className="footer-actions">{children}</div>
}
