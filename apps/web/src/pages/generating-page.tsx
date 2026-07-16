import { AppIcon } from "../components/icons"
import { buttonStyles } from "../components/layout/app-shell"

export const generationSteps = [
  "Resolving dependencies",
  "Writing files",
  "Validating package policy",
  "Creating archive",
]

export function GeneratingPage({
  activeStep,
  error,
  onRetry,
  onBackToReview,
}: {
  activeStep: number
  error?: string | undefined
  onRetry: () => void | Promise<void>
  onBackToReview: () => void
}) {
  return (
    <main className="generation-page grid min-h-[calc(100dvh-4.5rem)] place-items-center p-8 max-[980px]:p-4">
      <section
        className="grid w-full max-w-160 justify-items-center gap-5 border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(2rem,5vw,4rem)] text-center shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)]"
        aria-live="polite"
      >
        <div className="inline-flex size-14 items-center justify-center bg-(--builder-accent) text-white [&_.icon]:size-6">
          <AppIcon
            name={error === undefined ? "spinner" : "warning"}
            className={error === undefined ? "size-6 animate-spin" : "size-6"}
          />
        </div>
        <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
          Generating template
        </p>
        <h1 className="font-(family-name:--font-display) text-[clamp(2.4rem,4vw,4.1rem)] leading-none font-bold tracking-[-0.055em]">
          {error === undefined ? "Generating Template" : "Generation failed"}
        </h1>
        <p className="max-w-128 text-(--color-muted-foreground)">
          {error === undefined
            ? "DittoJs is resolving the catalog, writing files, and preparing your archive."
            : error}
        </p>
        <ol className="grid w-full gap-2 border-t border-(--color-border-strong) pt-5 text-left">
          {generationSteps.map((step, index) => (
            <li
              key={step}
              className={`flex items-center gap-3 border border-(--color-border) px-4 py-3 text-sm ${index <= activeStep ? "border-(--builder-ink) bg-(--color-paper)" : "text-(--color-muted-foreground)"}`}
            >
              <AppIcon name={index <= activeStep ? "check" : "file"} />
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {error !== undefined ? (
          <div className="flex gap-3 max-[980px]:w-full max-[980px]:flex-col">
            <button type="button" className={buttonStyles.dark} onClick={onRetry}>
              Retry
            </button>
            <button type="button" className={buttonStyles.light} onClick={onBackToReview}>
              Back to Review
            </button>
          </div>
        ) : null}
      </section>
    </main>
  )
}
