import type { ResolvedRecipe } from "@dittojs/core"

import { blockingConflicts, canGenerate } from "../builder/resolver-view-model"
import { ManifestModal } from "../components/builder/manifest-modal"
import {
  DependencyNotes,
  StackSummaryTable,
  ValidationCard,
} from "../components/builder/resolution-panels"
import { AppIcon } from "../components/icons"
import { FooterActions, StepHeader } from "../components/layout/app-shell"

export function ReviewManifestPage({
  recipe,
  manifestOpen,
  copyState,
  onBack,
  onGenerate,
  onOpenManifest,
  onCloseManifest,
  onCopyCli,
}: {
  recipe: ResolvedRecipe
  manifestOpen: boolean
  copyState?: string | undefined
  onBack: () => void
  onGenerate: () => void | Promise<void>
  onOpenManifest: () => void
  onCloseManifest: () => void
  onCopyCli: () => void | Promise<void>
}) {
  const conflicts = blockingConflicts(recipe)
  const generateEnabled = canGenerate(recipe)

  return (
    <main className="review-page" id="manifest">
      <section className="review-inner">
        <StepHeader
          eyebrow="Step 4"
          title="Your Template Is Ready."
          description="Review the resolved stack and generate the archive."
        />
        <div className="review-grid">
          <div className="review-card review-card-wide">
            <div className="panel-header">
              <p className="eyebrow">Stack summary</p>
              <h2>Resolved Template</h2>
            </div>
            <StackSummaryTable recipe={recipe} />
          </div>
          <DependencyNotes recipe={recipe} />
          <ValidationCard recipe={recipe} />
        </div>
        {conflicts.length > 0 ? (
          <div className="error-panel" role="alert">
            <AppIcon name="warning" />
            <div>
              <h2>Generation blocked by resolver conflicts.</h2>
              <ul>
                {conflicts.map((conflict) => (
                  <li key={conflict.message}>{conflict.message}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <FooterActions>
          <button type="button" className="button button-light" onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button
            type="button"
            className="button button-dark"
            onClick={onGenerate}
            disabled={!generateEnabled}
          >
            <AppIcon name="play" />
            Generate Template
          </button>
          <button type="button" className="button button-light" onClick={onOpenManifest}>
            <AppIcon name="code" />
            View JSON Manifest
          </button>
          <button type="button" className="button button-light" onClick={onCopyCli}>
            <AppIcon name="copy" />
            Copy CLI
          </button>
          {copyState !== undefined ? <span className="inline-status">{copyState}</span> : null}
        </FooterActions>
      </section>
      {manifestOpen ? <ManifestModal recipe={recipe} onClose={onCloseManifest} /> : null}
    </main>
  )
}
