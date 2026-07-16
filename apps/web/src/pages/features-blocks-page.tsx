import { useState } from "react"
import type { ResolvedRecipe } from "@dittosh/core"

import type { BuilderOption } from "../builder/builder-options"
import { featureOptionGroups } from "../builder/builder-options"
import { stateForOption } from "../builder/option-state"
import { lockedLabelsRequiredBy } from "../builder/resolver-view-model"
import { OptionCard } from "../components/builder/option-card"
import { PreviewModal } from "../components/builder/preview-modal"
import { DependencyNotes } from "../components/builder/resolution-panels"
import { AppIcon } from "../components/icons"
import {
  buttonStyles,
  FooterActions,
  SectionHeader,
  StepHeader,
} from "../components/layout/app-shell"

function formatInlineList(values: string[]): string {
  if (values.length <= 1) {
    return values.join("")
  }

  if (values.length === 2) {
    return values.join(" and ")
  }

  return `${values.slice(0, -1).join(", ")}, and ${values.at(-1)}`
}

function OptionGrid({
  number,
  title,
  description,
  options,
  recipe,
  resolverNote,
  onSelectOption,
  onPreviewOption,
}: {
  number: number
  title: string
  description: string
  options: BuilderOption[]
  recipe: ResolvedRecipe
  resolverNote?: string | undefined
  onSelectOption: (option: BuilderOption) => void
  onPreviewOption: (option: BuilderOption) => void
}) {
  const titleId = `${title.replace(/\s+/g, "-")}-title`

  return (
    <section
      className="grid gap-5 border-t-2 border-(--builder-ink) pt-5"
      aria-labelledby={titleId}
    >
      <SectionHeader id={titleId} number={number} title={title} description={description} />
      {resolverNote !== undefined ? (
        <p className="flex items-center gap-2 border-l-4 border-(--builder-accent) bg-(--builder-accent-soft) px-4 py-3 text-sm text-[#623326]">
          <AppIcon name="lock" />
          {resolverNote}
        </p>
      ) : null}
      <div className="grid grid-cols-3 gap-3 max-[1180px]:grid-cols-2 max-[980px]:grid-cols-1">
        {options.map((option) => {
          const state = stateForOption(recipe, option)

          return (
            <OptionCard
              key={option.id}
              option={option}
              selected={state.selected}
              automatic={state.automatic}
              locked={state.locked}
              lockExplanation={state.lockExplanation}
              onSelect={onSelectOption}
              onPreview={onPreviewOption}
            />
          )
        })}
      </div>
    </section>
  )
}

export function FeaturesBlocksPage({
  recipe,
  onSelectOption,
  onBack,
  onContinue,
}: {
  recipe: ResolvedRecipe
  onSelectOption: (option: BuilderOption) => void
  onBack: () => void
  onContinue: () => void
}) {
  const [previewOption, setPreviewOption] = useState<BuilderOption | undefined>()
  const navbarLockedLabels = lockedLabelsRequiredBy(recipe, "block.navbar")
  const navbarResolverNote =
    navbarLockedLabels.length > 0
      ? navbarLockedLabels.length === 1
        ? `${formatInlineList(navbarLockedLabels)} is locked because Navbar requires it.`
        : `${formatInlineList(navbarLockedLabels)} are locked because Navbar requires them.`
      : undefined

  return (
    <main className="builder-page mx-auto grid max-w-440 grid-cols-[minmax(0,1fr)_minmax(21rem,23rem)] items-start gap-[clamp(1.5rem,2.5vw,2.75rem)] p-[clamp(1.5rem,4vw,3.5rem)] max-[980px]:grid-cols-1 max-[980px]:p-4">
      <section className="grid gap-[clamp(2rem,4vw,3.25rem)] border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(1.5rem,3vw,3rem)] shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)] max-[980px]:p-5">
        <StepHeader
          eyebrow="Step 2"
          title="Features & Blocks"
          description="Choose generated components and product blocks."
        />
        <div className="grid gap-10">
          {featureOptionGroups.map((group, index) => (
            <OptionGrid
              key={group.id}
              number={index + 1}
              title={group.title}
              description={group.description}
              options={group.options}
              recipe={recipe}
              resolverNote={group.id === "block" ? navbarResolverNote : undefined}
              onSelectOption={onSelectOption}
              onPreviewOption={setPreviewOption}
            />
          ))}
        </div>
        <FooterActions>
          <button type="button" className={buttonStyles.light} onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button type="button" className={buttonStyles.dark} onClick={onContinue}>
            Continue
            <AppIcon name="arrow-right" />
          </button>
        </FooterActions>
      </section>
      <DependencyNotes recipe={recipe} />
      {previewOption === undefined ? null : (
        <PreviewModal option={previewOption} onClose={() => setPreviewOption(undefined)} />
      )}
    </main>
  )
}
