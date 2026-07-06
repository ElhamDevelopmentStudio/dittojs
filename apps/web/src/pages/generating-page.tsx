import { AppIcon } from "../components/icons"

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
    <main className="generation-page">
      <section className="generation-card" aria-live="polite">
        <div className="generation-icon">
          <AppIcon name={error === undefined ? "spinner" : "warning"} />
        </div>
        <p className="eyebrow">Generating template</p>
        <h1>{error === undefined ? "Generating Template" : "Generation failed"}</h1>
        <p>
          {error === undefined
            ? "DittoJs is resolving the catalog, writing files, and preparing your archive."
            : error}
        </p>
        <ol className="progress-list">
          {generationSteps.map((step, index) => (
            <li key={step} className={index <= activeStep ? "is-complete" : ""}>
              <AppIcon name={index <= activeStep ? "check" : "file"} />
              <span>{step}</span>
            </li>
          ))}
        </ol>
        {error !== undefined ? (
          <div className="generation-actions">
            <button type="button" className="button button-dark" onClick={onRetry}>
              Retry
            </button>
            <button type="button" className="button button-light" onClick={onBackToReview}>
              Back to Review
            </button>
          </div>
        ) : null}
      </section>
    </main>
  )
}
