import { useEffect } from "react"
import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../../builder/builder-options"
import { stateForOption } from "../../builder/option-state"
import { AppIcon } from "../icons"
import { buttonStyles, iconButtonStyle } from "../layout/app-shell"
import { OptionCard } from "./option-card"

export function CustomizationModal({
  option,
  recipe,
  onSelectOption,
  onClose,
}: {
  option: BuilderOption
  recipe: ResolvedRecipe
  onSelectOption: (option: BuilderOption) => void
  onClose: () => void
}) {
  const customization = option.customization

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (customization === undefined) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-(--color-modal-backdrop) p-4"
      role="presentation"
    >
      <section
        aria-labelledby="customization-modal-title"
        aria-modal="true"
        className="grid max-h-[calc(100dvh-2rem)] w-full max-w-260 gap-5 overflow-auto border border-(--color-border-strong) bg-(--color-paper) p-6 shadow-(--shadow-panel)"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-(--color-border) pb-4">
          <div>
            <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
              Nested decision
            </p>
            <h2
              className="font-(family-name:--font-display) text-xl font-bold"
              id="customization-modal-title"
            >
              {customization.title}
            </h2>
            <p className="text-sm text-(--color-muted-foreground)">{customization.description}</p>
          </div>
          <button
            type="button"
            className={iconButtonStyle}
            aria-label="Close customization"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <div className="grid gap-8">
          {customization.sections.map((section, index) => (
            <section className="grid gap-4 border-t border-(--builder-ink) pt-4" key={section.id}>
              <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                <span className="inline-flex size-[1.8rem] items-center justify-center bg-(--builder-ink) font-(family-name:--font-mono) text-[0.62rem] text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-(family-name:--font-display) text-lg font-bold">
                    {section.title}
                  </h3>
                  {section.description === undefined ? null : (
                    <p className="text-sm text-(--color-muted-foreground)">{section.description}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
                {section.options.map((nestedOption) => {
                  const state = stateForOption(recipe, nestedOption)

                  return (
                    <OptionCard
                      key={nestedOption.id}
                      option={nestedOption}
                      selected={state.selected}
                      automatic={state.automatic}
                      locked={state.locked}
                      lockExplanation={state.lockExplanation}
                      onSelect={onSelectOption}
                    />
                  )
                })}
              </div>
            </section>
          ))}
        </div>
        <div className="flex justify-end border-t border-(--color-border) pt-4">
          <button type="button" className={buttonStyles.light} onClick={onClose}>
            Done
          </button>
        </div>
      </section>
    </div>
  )
}
