import { AppIcon } from "../icons"

export function RecommendedBadge() {
  return <span className="badge">Recommended</span>
}

export function ComingSoonBadge() {
  return <span className="badge badge-muted">Coming soon</span>
}

export function LockIndicator({ explanation }: { explanation: string }) {
  return (
    <span className="lock-text">
      <AppIcon name="lock" />
      <span>{explanation}</span>
    </span>
  )
}
