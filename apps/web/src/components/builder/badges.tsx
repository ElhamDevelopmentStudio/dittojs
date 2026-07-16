import { AppIcon } from "../icons"

const badgeBase =
  "inline-flex min-h-8 items-center justify-center gap-1 border border-(--color-border-strong) bg-(--color-paper) px-2 text-[0.68rem] font-semibold"
const iconBadge = `${badgeBase} size-8 px-0`
const tooltip =
  "pointer-events-none absolute top-[calc(100%+0.5rem)] right-0 z-10 w-max max-w-64 border border-(--color-border-strong) bg-(--builder-ink) px-3 py-2 text-left text-[0.68rem] leading-5 font-medium text-white opacity-0 shadow-(--shadow-card) transition-opacity group-hover:opacity-100 group-focus:opacity-100"

export function RecommendedBadge({ reason }: { reason: string }) {
  return (
    <span
      className={`${iconBadge} group relative text-(--builder-accent)`}
      aria-label={`Recommended: ${reason}`}
      tabIndex={0}
    >
      <AppIcon name="star" />
      <span className={tooltip} role="tooltip">
        {reason}
      </span>
    </span>
  )
}

export function ComingSoonBadge() {
  return (
    <span
      className={`${iconBadge} text-(--color-subtle-foreground)`}
      aria-label="Coming soon"
      title="Coming soon"
    >
      <AppIcon name="lock" />
    </span>
  )
}

export function LockIndicator({ explanation }: { explanation: string }) {
  return (
    <span className={`${iconBadge} group relative`} aria-label="Locked">
      <AppIcon name="lock" />
      <span className={tooltip} role="tooltip">
        {explanation}
      </span>
    </span>
  )
}

export function SelectedBadge() {
  return (
    <span className={iconBadge} aria-label="Selected" title="Selected">
      <AppIcon name="check" />
    </span>
  )
}

export function AutomaticBadge() {
  return (
    <span className={badgeBase} aria-label="Added automatically" title="Added automatically">
      <AppIcon name="copy" />
    </span>
  )
}
