import { useState } from "react"
import type { ResolvedRecipe } from "@dittosh/core"

import type { BuilderOption } from "../builder/builder-options"
import { coreOptionGroups } from "../builder/builder-options"
import { stateForOption } from "../builder/option-state"
import { CustomizationModal } from "../components/builder/customization-modal"
import { LiveStackSummary } from "../components/builder/resolution-panels"
import { OptionCard } from "../components/builder/option-card"
import { AppIcon } from "../components/icons"
import {
  buttonStyles,
  FooterActions,
  SectionHeader,
  StepHeader,
} from "../components/layout/app-shell"

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
    <main className="builder-page mx-auto grid max-w-440 grid-cols-[minmax(0,1fr)_minmax(21rem,23rem)] items-start gap-[clamp(1.5rem,2.5vw,2.75rem)] p-[clamp(1.5rem,4vw,3.5rem)] max-[980px]:grid-cols-1 max-[980px]:p-4">
      <section className="grid gap-[clamp(2rem,4vw,3.25rem)] border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(1.5rem,3vw,3rem)] shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)] max-[980px]:p-5">
        <StepHeader
          eyebrow="Step 1"
          title="Core Configuration"
          description="Pick the runtime, tooling, styling, and data layer."
        />
        <div className="flex flex-col">
          {coreOptionGroups.map((group, index) => (
            <section
              className="grid min-w-0 grid-cols-[minmax(13rem,0.32fr)_minmax(0,0.68fr)] gap-[clamp(1.75rem,3vw,3.5rem)] border-t-2 border-(--builder-ink) py-[clamp(1.75rem,3vw,2.6rem)] max-[1180px]:grid-cols-[minmax(11rem,0.3fr)_minmax(0,0.7fr)] max-[1180px]:gap-6 max-[980px]:grid-cols-1"
              key={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <SectionHeader
                id={`${group.id}-title`}
                number={index + 1}
                title={group.title}
                description={group.description}
              />
              <div
                className={`grid self-start gap-3 max-[980px]:grid-cols-1 ${group.options.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
              >
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
