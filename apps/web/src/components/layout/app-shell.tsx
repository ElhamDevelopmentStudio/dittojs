import type { ReactNode } from "react"

import { AppIcon } from "../icons"

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 border px-4 font-medium transition-[background,border-color,box-shadow,color] duration-150 hover:shadow-(--shadow-card) disabled:cursor-not-allowed disabled:border-(--color-border) disabled:bg-(--color-surface-muted) disabled:text-(--color-disabled-text)"

export const buttonStyles = {
  dark: `${buttonBase} border-(--builder-accent) bg-(--builder-accent) text-(--color-on-inverted)`,
  light: `${buttonBase} border-(--color-border-strong) bg-(--color-surface) text-(--color-foreground)`,
  disabled: `${buttonBase} border-(--color-border) bg-(--color-surface-muted) text-(--color-disabled-text)`,
} as const

export const iconButtonStyle =
  "inline-flex size-10 items-center justify-center border border-(--color-border) bg-(--color-surface) text-(--color-foreground) transition hover:border-(--builder-ink) hover:shadow-(--shadow-card)"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell relative isolate min-h-dvh bg-(--color-background)">{children}</div>
  )
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
    <header
      className={`sticky top-0 z-20 grid grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-(--color-border) bg-[rgba(250,250,248,0.92)] px-8 max-[980px]:px-4 ${isLanding ? "min-h-18 max-[767px]:grid-cols-[auto_1fr]" : "min-h-20 max-[600px]:grid-cols-[auto_minmax(0,1fr)_auto] max-[600px]:gap-3 max-[600px]:px-3"}`}
    >
      <button
        type="button"
        className="flex items-center gap-2 border-0 bg-transparent py-2 font-(family-name:--font-display) text-[1.12rem] font-bold text-(--color-foreground)"
        onClick={onHome}
      >
        <span
          className="brand-mark inline-flex size-7 -rotate-6 items-center justify-center bg-(--builder-ink) font-(family-name:--font-mono) text-[0.65rem] text-white"
          aria-hidden="true"
        >
          D
        </span>
        <span>DittoJs</span>
      </button>
      {isLanding ? (
        <>
          <nav
            className="flex items-center justify-center gap-8 max-[767px]:justify-self-end max-[767px]:gap-4"
            aria-label="Landing navigation"
          >
            <button
              type="button"
              className="border-0 bg-transparent py-2 text-[0.8125rem] font-semibold text-(--color-muted-foreground) hover:text-(--color-foreground)"
              onClick={() => scrollTo("origin")}
            >
              Why Ditto?
            </button>
            <button
              type="button"
              className="border-0 bg-transparent py-2 text-[0.8125rem] font-semibold text-(--color-muted-foreground) hover:text-(--color-foreground)"
              onClick={() => scrollTo("presets")}
            >
              Starting points
            </button>
          </nav>
          <div className="flex items-center justify-self-end gap-6 max-[767px]:hidden">
            <button
              type="button"
              className="inline-flex min-h-11 items-center justify-center gap-2 border border-(--builder-ink) bg-(--builder-ink) px-4 font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-white transition hover:shadow-(--shadow-card)"
              onClick={onTemplates}
            >
              Make a copy
              <AppIcon name="arrow-right" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className="builder-progress mx-auto grid w-[min(32rem,48vw)] grid-cols-[auto_minmax(12rem,1fr)_auto] items-center gap-5 max-[980px]:w-[min(19rem,48vw)] max-[980px]:grid-cols-[minmax(5rem,1fr)_auto] max-[980px]:gap-3 max-[600px]:w-full max-[600px]:gap-2"
            aria-label={`Builder step ${currentStep ?? 1} of 4`}
          >
            <span className="font-(family-name:--font-mono) text-[0.75rem] font-bold tracking-[0.04em] uppercase text-(--color-foreground) max-[980px]:hidden">
              Template builder
            </span>
            <span className="grid grid-cols-4 gap-1.5" aria-hidden="true">
              {[1, 2, 3, 4].map((item) => (
                <i
                  className={`h-1 ${item <= (currentStep ?? 1) ? "bg-(--builder-accent)" : "bg-(--color-border)"}`}
                  key={item}
                />
              ))}
            </span>
            <span className="whitespace-nowrap font-(family-name:--font-mono) text-[0.75rem] font-bold tracking-[0.04em] text-(--builder-accent)">
              0{currentStep ?? 1} / 04
            </span>
          </div>
          <button
            type="button"
            className="min-h-11 justify-self-end border border-(--builder-ink) bg-(--builder-ink) px-4 font-(family-name:--font-mono) text-[0.64rem] font-bold uppercase text-white hover:shadow-(--shadow-card)"
            onClick={onHome}
          >
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
    <div className="grid gap-2 border-l-[0.35rem] border-(--builder-accent) py-1 pl-5">
      <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold tracking-[0.04em] text-(--builder-accent) uppercase">
        {eyebrow}
      </p>
      <h1 className="font-(family-name:--font-display) text-[clamp(2.4rem,4vw,4.1rem)] leading-[0.95] font-bold tracking-[-0.055em]">
        {title}
      </h1>
      <p className="max-w-152 text-[0.96rem] text-(--color-muted-foreground)">{description}</p>
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
    <div className="option-group-heading grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3.5">
      {sectionNumber !== undefined ? (
        <span className="mt-0.5 inline-flex size-[1.8rem] items-center justify-center bg-(--builder-ink) font-(family-name:--font-mono) text-[0.62rem] text-white">
          {sectionNumber}
        </span>
      ) : null}
      <div>
        <h2
          className="font-(family-name:--font-display) text-[1.18rem] font-bold tracking-[-0.025em]"
          id={id}
        >
          {title}
        </h2>
        <p className="max-w-152 text-[0.875rem] text-(--color-muted-foreground)">{description}</p>
      </div>
    </div>
  )
}

export function FooterActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-end gap-2.5 border-t border-(--color-border-strong) pt-5 max-[980px]:flex-col max-[980px]:items-stretch">
      {children}
    </div>
  )
}
