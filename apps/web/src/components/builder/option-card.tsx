import type { MouseEvent } from "react"

import type { BuilderOption } from "../../builder/builder-options"
import {
  AutomaticBadge,
  ComingSoonBadge,
  LockIndicator,
  RecommendedBadge,
  SelectedBadge,
} from "./badges"
import { AppIcon, isAppIconName } from "../icons"

export type OptionCardProps = {
  option: BuilderOption
  selected: boolean
  locked?: boolean | undefined
  automatic?: boolean | undefined
  lockExplanation?: string | undefined
  onSelect: (option: BuilderOption) => void
  onCustomize?: (option: BuilderOption) => void
}

export function OptionCard({
  option,
  selected,
  locked = false,
  automatic = false,
  lockExplanation,
  onSelect,
  onCustomize,
}: OptionCardProps) {
  const disabled = option.comingSoon === true
  const customizable = option.customization !== undefined && onCustomize !== undefined
  const className = [
    "option-card",
    selected ? "is-selected" : "",
    locked ? "is-locked" : "",
    automatic ? "is-automatic" : "",
    disabled ? "is-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ")
  const iconName = isAppIconName(option.icon) ? option.icon : "box"
  const optionMeta = option.groupId.split("-").at(0) ?? option.groupId
  const lockSource = lockExplanation?.split(":").at(0)
  const recommendationReason = option.recommendationReason

  const handleCustomize = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onCustomize?.(option)
  }

  return (
    <article className={className}>
      <button
        type="button"
        className="option-card-select"
        disabled={disabled}
        aria-disabled={disabled}
        aria-pressed={selected}
        onClick={() => onSelect(option)}
      >
        <span className="option-card-content">
          <span className="option-card-meta">{optionMeta}</span>
          <span className="option-card-title-row">
            <span className="option-card-title">{option.label}</span>
            <span className="option-card-icon" aria-hidden="true">
              <AppIcon name={iconName} />
            </span>
          </span>
          <span className="option-card-description">{option.description}</span>
          {locked && lockExplanation !== undefined ? (
            <span className="option-card-reason">
              <AppIcon name="lock" />
              {lockSource === undefined ? lockExplanation : `Locked by ${lockSource}`}
            </span>
          ) : null}
        </span>
      </button>
      <span className="option-card-topline">
        <span className="badge-row">
          {option.recommended === true && recommendationReason !== undefined ? (
            <RecommendedBadge reason={recommendationReason} />
          ) : null}
          {option.comingSoon === true ? <ComingSoonBadge /> : null}
          {locked && lockExplanation !== undefined ? (
            <LockIndicator explanation={lockExplanation} />
          ) : automatic ? (
            <AutomaticBadge />
          ) : selected ? (
            <SelectedBadge />
          ) : null}
          {customizable ? (
            <button
              type="button"
              className="option-card-customize"
              aria-label={`Customize ${option.label}`}
              onClick={handleCustomize}
            >
              <AppIcon name="settings" />
            </button>
          ) : null}
        </span>
      </span>
    </article>
  )
}
