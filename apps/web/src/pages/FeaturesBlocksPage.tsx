import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { blockOptions, componentOptions } from "../builder/builder-options"
import { isLocked, lockExplanation } from "../builder/resolver-view-model"
import { OptionCard } from "../components/builder/OptionCard"
import { DependencyNotes } from "../components/builder/ResolutionPanels"
import { AppIcon } from "../components/icons"
import { FooterActions, StepHeader } from "../components/layout/AppShell"

function OptionGrid({
  title,
  description,
  options,
  recipe,
  onSelectOption,
}: {
  title: string
  description: string
  options: BuilderOption[]
  recipe: ResolvedRecipe
  onSelectOption: (option: BuilderOption) => void
}) {
  return (
    <section className="option-group" aria-labelledby={`${title.replace(/\s+/g, "-")}-title`}>
      <div className="option-group-heading">
        <h2 id={`${title.replace(/\s+/g, "-")}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="option-grid compact-grid">
        {options.map((option) => {
          const selected =
            option.moduleId !== undefined && recipe.effectiveSelections.includes(option.moduleId)
          const locked =
            option.moduleId !== undefined && selected && isLocked(recipe, option.moduleId)
          const explanation =
            option.moduleId === undefined ? undefined : lockExplanation(recipe, option.moduleId)
          const automatic =
            option.moduleId !== undefined &&
            selected &&
            !recipe.userSelections.includes(option.moduleId) &&
            recipe.selectionReasons[option.moduleId]?.some(
              (reason) => reason.type === "requirement",
            )

          return (
            <OptionCard
              key={option.id}
              option={option}
              selected={selected}
              automatic={automatic}
              locked={locked}
              lockExplanation={explanation}
              onSelect={onSelectOption}
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
  return (
    <main className="builder-page two-column-page">
      <section className="builder-main">
        <StepHeader
          eyebrow="Step 2"
          title="Features & Blocks"
          description="Choose generated UI primitives and product blocks. Required dependencies are resolved and locked by the catalog."
        />
        <div className="option-group-stack">
          <OptionGrid
            title="UI Components"
            description="Reusable components emitted into the generated project."
            options={componentOptions}
            recipe={recipe}
            onSelectOption={onSelectOption}
          />
          <OptionGrid
            title="Blocks"
            description="Feature blocks that may require and lock component primitives."
            options={blockOptions}
            recipe={recipe}
            onSelectOption={onSelectOption}
          />
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
    </main>
  )
}
