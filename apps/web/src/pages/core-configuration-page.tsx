import { useState } from "react"
import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { coreOptionGroups } from "../builder/builder-options"
import { stateForOption } from "../builder/option-state"
import { CustomizationModal } from "../components/builder/customization-modal"
import { LiveStackSummary } from "../components/builder/resolution-panels"
import { OptionCard } from "../components/builder/option-card"
import { AppIcon } from "../components/icons"
import { FooterActions, SectionHeader, StepHeader } from "../components/layout/app-shell"

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
  const [customizationOption, setCustomizationOption] = useState<BuilderOption | undefined>()

  return (
    <main className="builder-page two-column-page core-configuration-page">
      <section className="builder-main">
        <StepHeader
          eyebrow="Step 1"
          title="Core Configuration"
          description="Pick the runtime, tooling, styling, and data layer."
        />
        <div className="option-group-stack">
          {coreOptionGroups.map((group, index) => (
            <section className="option-group" key={group.id} aria-labelledby={`${group.id}-title`}>
              <SectionHeader
                id={`${group.id}-title`}
                number={index + 1}
                title={group.title}
                description={group.description}
              />
              <div className="option-grid">
                {group.options.map((option) => {
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
                      onCustomize={setCustomizationOption}
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
      {customizationOption === undefined ? null : (
        <CustomizationModal
          option={customizationOption}
          recipe={recipe}
          onSelectOption={onSelectOption}
          onClose={() => setCustomizationOption(undefined)}
        />
      )}
    </main>
  )
}
