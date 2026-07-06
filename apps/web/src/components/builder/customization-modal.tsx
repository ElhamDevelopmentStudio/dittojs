import { useEffect } from "react"
import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../../builder/builder-options"
import { stateForOption } from "../../builder/option-state"
import { AppIcon } from "../icons"
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
    <div className="modal-backdrop customization-backdrop" role="presentation">
      <section
        aria-labelledby="customization-modal-title"
        aria-modal="true"
        className="modal customization-modal"
        role="dialog"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Nested decision</p>
            <h2 id="customization-modal-title">{customization.title}</h2>
            <p>{customization.description}</p>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close customization"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <div className="customization-section-stack">
          {customization.sections.map((section, index) => (
            <section className="customization-section" key={section.id}>
              <div className="customization-section-heading">
                <span className="section-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{section.title}</h3>
                  {section.description === undefined ? null : <p>{section.description}</p>}
                </div>
              </div>
              <div className="customization-grid">
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
        <div className="modal-actions">
          <button type="button" className="button button-light" onClick={onClose}>
            Done
          </button>
        </div>
      </section>
    </div>
  )
}
