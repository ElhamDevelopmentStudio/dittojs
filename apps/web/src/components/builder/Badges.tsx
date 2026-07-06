import { AppIcon } from "../icons"

export function RecommendedBadge({ reason }: { reason: string }) {
  return (
    <span
      className="badge recommendation-badge tooltip-badge"
      aria-label={`Recommended: ${reason}`}
      tabIndex={0}
    >
      <AppIcon name="star" />
      <span className="tooltip-bubble" role="tooltip">
        {reason}
      </span>
    </span>
  )
}

export function ComingSoonBadge() {
  return (
    <span
      className="badge badge-muted badge-icon-only"
      aria-label="Coming soon"
      title="Coming soon"
    >
      <AppIcon name="lock" />
    </span>
  )
}

export function LockIndicator({ explanation }: { explanation: string }) {
  return (
    <span className="badge badge-outline badge-icon-only tooltip-badge" aria-label="Locked">
      <AppIcon name="lock" />
      <span className="tooltip-bubble" role="tooltip">
        {explanation}
      </span>
    </span>
  )
}

export function SelectedBadge() {
  return (
    <span className="badge badge-outline badge-icon-only" aria-label="Selected" title="Selected">
      <AppIcon name="check" />
    </span>
  )
}

export function AutomaticBadge() {
  return (
    <span
      className="badge badge-outline"
      aria-label="Added automatically"
      title="Added automatically"
    >
      <AppIcon name="copy" />
    </span>
  )
}
