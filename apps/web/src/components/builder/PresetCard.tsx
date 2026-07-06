import type { PresetOption } from "../../builder/builder-options"
import { RecommendedBadge } from "./Badges"
import { AppIcon } from "../icons"

export function PresetCard({
  preset,
  onCreate,
  onCustomize,
}: {
  preset: PresetOption
  onCreate: (presetId: string) => void
  onCustomize: (presetId: string) => void
}) {
  return (
    <article className="preset-card">
      <div className="preset-card-header">
        <div>
          <h2>{preset.title}</h2>
          <p>{preset.stack}</p>
        </div>
        {preset.recommended === true ? <RecommendedBadge /> : null}
      </div>
      <p className="preset-card-copy">{preset.description}</p>
      <div className="preset-card-actions">
        <button type="button" className="button button-dark" onClick={() => onCreate(preset.id)}>
          <AppIcon name="play" />
          Create
        </button>
        <button
          type="button"
          className="button button-light"
          onClick={() => onCustomize(preset.id)}
        >
          Customize
          <AppIcon name="arrow-right" />
        </button>
      </div>
    </article>
  )
}
