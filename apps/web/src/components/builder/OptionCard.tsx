import type { BuilderOption } from "../../builder/builder-options"
import { ComingSoonBadge, LockIndicator, RecommendedBadge } from "./Badges"
import { AppIcon } from "../icons"

export type OptionCardProps = {
  option: BuilderOption
  selected: boolean
  locked?: boolean | undefined
  automatic?: boolean | undefined
  lockExplanation?: string | undefined
  onSelect: (option: BuilderOption) => void
}

export function OptionCard({
  option,
  selected,
  locked = false,
  automatic = false,
  lockExplanation,
  onSelect,
}: OptionCardProps) {
  const disabled = option.comingSoon === true
  const status = locked
    ? "Locked"
    : automatic
      ? "Added automatically"
      : selected
        ? "Selected"
        : undefined

  return (
    <button
      type="button"
      className={`option-card${selected ? " is-selected" : ""}${disabled ? " is-disabled" : ""}`}
      disabled={disabled}
      aria-pressed={selected}
      onClick={() => onSelect(option)}
    >
      <span className="option-card-topline">
        <span className="option-card-title">{option.label}</span>
        <span className="badge-row">
          {option.recommended === true ? <RecommendedBadge /> : null}
          {option.comingSoon === true ? <ComingSoonBadge /> : null}
          {status !== undefined ? <span className="badge badge-outline">{status}</span> : null}
        </span>
      </span>
      <span className="option-card-description">{option.description}</span>
      {option.meta !== undefined ? <span className="option-card-meta">{option.meta}</span> : null}
      {locked && lockExplanation !== undefined ? (
        <LockIndicator explanation={lockExplanation} />
      ) : null}
      {selected && !locked ? (
        <span className="option-card-check">
          <AppIcon name="check" />
          Included in resolved recipe
        </span>
      ) : null}
    </button>
  )
}
