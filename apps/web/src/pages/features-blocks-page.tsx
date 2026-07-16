import { useState } from "react"
import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { featureOptionGroups } from "../builder/builder-options"
import { stateForOption } from "../builder/option-state"
import { lockedLabelsRequiredBy } from "../builder/resolver-view-model"
import { OptionCard } from "../components/builder/option-card"
import { PreviewModal } from "../components/builder/preview-modal"
import { DependencyNotes } from "../components/builder/resolution-panels"
import { AppIcon } from "../components/icons"
import { FooterActions, SectionHeader, StepHeader } from "../components/layout/app-shell"

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
    <section className="option-group" aria-labelledby={titleId}>
      <SectionHeader id={titleId} number={number} title={title} description={description} />
      {resolverNote !== undefined ? (
        <p className="resolver-note">
          <AppIcon name="lock" />
          {resolverNote}
        </p>
      ) : null}
      <div className="option-grid compact-grid">
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
    <main className="builder-page two-column-page features-blocks-page">
      <section className="builder-main">
        <StepHeader
          eyebrow="Step 2"
          title="Features & Blocks"
          description="Choose generated components and product blocks."
        />
        <div className="option-group-stack">
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
          <button type="button" className="button button-light" onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button type="button" className="button button-dark" onClick={onContinue}>
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
