import type { ResolvedRecipe } from "@dittojs/core"

import { blockingConflicts, canGenerate } from "../builder/resolver-view-model"
import { ManifestModal } from "../components/builder/manifest-modal"
import {
  DependencyNotes,
  StackSummaryTable,
  ValidationCard,
} from "../components/builder/resolution-panels"
import { AppIcon } from "../components/icons"
import { buttonStyles, FooterActions, StepHeader } from "../components/layout/app-shell"

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
    <main
      className="review-page mx-auto max-w-440 p-[clamp(1.5rem,4vw,3.5rem)] max-[980px]:p-4"
      id="manifest"
    >
      <section className="grid gap-[clamp(2rem,4vw,3.25rem)] border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(1.5rem,3vw,3rem)] shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)] max-[980px]:p-5">
        <StepHeader
          eyebrow="Step 4"
          title="Your Template Is Ready."
          description="Review the resolved stack and generate the archive."
        />
        <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(20rem,0.9fr)] items-start gap-4 max-[980px]:grid-cols-1">
          <div className="row-span-2 grid min-h-full content-start gap-4 border border-t-4 border-(--color-border-strong) border-t-(--builder-accent) bg-(--color-paper) p-5">
            <div>
              <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
                Stack summary
              </p>
              <h2 className="font-(family-name:--font-display) text-xl font-bold">
                Resolved Template
              </h2>
            </div>
            <StackSummaryTable recipe={recipe} />
          </div>
          <DependencyNotes recipe={recipe} />
          <ValidationCard recipe={recipe} />
        </div>
        {conflicts.length > 0 ? (
          <div
            className="flex gap-3 border-l-4 border-(--color-danger) bg-[#fff4f4] p-4 text-(--color-danger)"
            role="alert"
          >
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
          <button type="button" className={buttonStyles.light} onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button
            type="button"
            className={buttonStyles.dark}
            onClick={onGenerate}
            disabled={!generateEnabled}
          >
            <AppIcon name="play" />
            Generate Template
          </button>
          <button type="button" className={buttonStyles.light} onClick={onOpenManifest}>
            <AppIcon name="code" />
            View JSON Manifest
          </button>
          <button type="button" className={buttonStyles.light} onClick={onCopyCli}>
            <AppIcon name="copy" />
            Copy CLI
          </button>
          {copyState !== undefined ? (
            <span className="self-center text-sm text-(--color-muted-foreground)">{copyState}</span>
          ) : null}
        </FooterActions>
      </section>
      {manifestOpen ? <ManifestModal recipe={recipe} onClose={onCloseManifest} /> : null}
    </main>
  )
}
