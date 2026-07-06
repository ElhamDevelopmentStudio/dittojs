import type { PresetOption } from "../../builder/builder-options"
import { RecommendedBadge } from "./badges"
import { AppIcon, isAppIconName } from "../icons"

export function PresetCard({
  preset,
  onCreate,
  onCustomize,
}: {
  preset: PresetOption
  onCreate: (presetId: string) => void
  onCustomize: (presetId: string) => void
}) {
  const iconName = isAppIconName(preset.icon) ? preset.icon : "react"

  return (
    <article className="preset-card">
      <div className="preset-card-header">
        <span className="preset-card-icon" aria-hidden="true">
          <AppIcon name={iconName} />
        </span>
        <div>
          <p className="preset-card-kicker">Preset Manifest</p>
          <h2>{preset.title}</h2>
        </div>
        {preset.recommended === true && preset.recommendationReason !== undefined ? (
          <RecommendedBadge reason={preset.recommendationReason} />
        ) : null}
      </div>
      <p className="preset-card-copy">{preset.description}</p>
      <p className="preset-card-stack">{preset.stack}</p>
      <div className="preset-card-actions">
        <button type="button" className="text-button" onClick={() => onCreate(preset.id)}>
          Create
        </button>
        <button
          type="button"
          className="text-button text-button-muted"
          onClick={() => onCustomize(preset.id)}
        >
          Customize
        </button>
      </div>
    </article>
  )
}
