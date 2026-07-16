import type { ReactNode } from "react"

import { AppIcon } from "../icons"

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="app-shell">{children}</div>
}

export function Header({
  isLanding,
  currentStep,
  onHome,
  onTemplates,
}: {
  isLanding: boolean
  currentStep?: number | undefined
  onHome: () => void
  onTemplates: () => void
}) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header className={`site-header${isLanding ? " landing-header" : " builder-header"}`}>
      <button type="button" className="brand-button" onClick={onHome}>
        <span className="brand-mark" aria-hidden="true">
          D
        </span>
        <span>DittoJs</span>
      </button>
      {isLanding ? (
        <>
          <nav aria-label="Landing navigation">
            <button type="button" className="nav-link" onClick={() => scrollTo("origin")}>
              Why Ditto?
            </button>
            <button type="button" className="nav-link" onClick={() => scrollTo("presets")}>
              Starting points
            </button>
          </nav>
          <div className="site-actions">
            <button type="button" className="header-build-button" onClick={onTemplates}>
              Make a copy
              <AppIcon name="arrow-right" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="builder-progress" aria-label={`Builder step ${currentStep ?? 1} of 4`}>
            <span className="builder-progress-label">Template builder</span>
            <span className="builder-progress-track" aria-hidden="true">
              {[1, 2, 3, 4].map((item) => (
                <i className={item <= (currentStep ?? 1) ? "is-active" : ""} key={item} />
              ))}
            </span>
            <span className="builder-progress-count">0{currentStep ?? 1} / 04</span>
          </div>
          <button type="button" className="header-home-button" onClick={onHome}>
            Exit builder
          </button>
        </>
      )}
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
