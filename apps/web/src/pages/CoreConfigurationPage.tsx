import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { coreOptionGroups } from "../builder/builder-options"
import { isLocked, lockExplanation } from "../builder/resolver-view-model"
import { LiveStackSummary } from "../components/builder/ResolutionPanels"
import { OptionCard } from "../components/builder/OptionCard"
import { AppIcon } from "../components/icons"
import { FooterActions, StepHeader } from "../components/layout/AppShell"

export function CoreConfigurationPage({
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
          eyebrow="Step 1"
          title="Core Configuration"
          description="Pick the supported runtime, tooling, styling, and data layer. Resolver output updates as choices change."
        />
        <div className="option-group-stack">
          {coreOptionGroups.map((group) => (
            <section className="option-group" key={group.id} aria-labelledby={`${group.id}-title`}>
              <div className="option-group-heading">
                <h2 id={`${group.id}-title`}>{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="option-grid">
                {group.options.map((option) => {
                  const selected =
                    option.moduleId !== undefined &&
                    recipe.effectiveSelections.includes(option.moduleId)
                  const locked =
                    option.moduleId !== undefined && selected && isLocked(recipe, option.moduleId)
                  const explanation =
                    option.moduleId === undefined
                      ? undefined
                      : lockExplanation(recipe, option.moduleId)

                  return (
                    <OptionCard
                      key={option.id}
                      option={option}
                      selected={selected}
                      locked={locked}
                      lockExplanation={explanation}
                      onSelect={onSelectOption}
                    />
                  )
                })}
              </div>
            </section>
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
      <LiveStackSummary recipe={recipe} />
    </main>
  )
}
