import type { ReactNode } from "react"

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="app-shell">{children}</div>
}

export function Header({ onHome }: { onHome: () => void }) {
  return (
    <header className="site-header">
      <button type="button" className="brand-button" onClick={onHome}>
        DittoJs
      </button>
      <nav aria-label="Builder navigation">
        <a href="#builder">Builder</a>
        <a href="#manifest">Manifest</a>
        <button type="button" className="button button-disabled" disabled>
          Ask the Architect <span>Coming soon</span>
        </button>
      </nav>
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

export function FooterActions({ children }: { children: ReactNode }) {
  return <div className="footer-actions">{children}</div>
}
