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
    <article className="relative grid min-h-80 overflow-hidden border border-(--color-border-strong) bg-(--color-paper) p-8 text-center shadow-[0.45rem_0.45rem_0_rgba(23,26,25,0.07)] transition before:absolute before:inset-x-0 before:top-0 before:h-[0.3rem] before:bg-(--builder-accent) before:content-[''] after:pointer-events-none after:absolute after:top-6 after:-right-1 after:font-(family-name:--font-body) after:text-[5rem] after:font-extrabold after:tracking-[-0.08em] after:text-[rgba(23,26,25,0.035)] after:content-['DITTO'] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-(--builder-accent) hover:shadow-[0.65rem_0.65rem_0_rgba(232,81,47,0.2)] max-[767px]:min-h-72 max-[767px]:p-6 max-[767px]:after:text-[4rem]">
      <div className="relative z-1 grid min-h-23 grid-cols-1 place-items-center gap-4 text-center [&>.group]:absolute [&>.group]:top-0 [&>.group]:right-0">
        <span
          className="absolute top-0 left-0 inline-flex size-10 -rotate-4 items-center justify-center bg-(--builder-ink) text-white"
          aria-hidden="true"
        >
          <AppIcon name={iconName} />
        </span>
        <div>
          <p className="font-(family-name:--font-mono) text-[0.6rem] font-bold uppercase text-(--builder-accent)">
            Preset Manifest
          </p>
          <h2 className="font-(family-name:--font-display) text-2xl leading-tight font-bold tracking-[-0.03em]">
            {preset.title}
          </h2>
        </div>
        {preset.recommended === true && preset.recommendationReason !== undefined ? (
          <RecommendedBadge reason={preset.recommendationReason} />
        ) : null}
      </div>
      <p className="relative z-1 self-center text-center text-sm leading-6 text-(--color-muted-foreground)">
        {preset.description}
      </p>
      <p className="relative z-1 text-center font-(family-name:--font-mono) text-[0.65rem] font-bold uppercase text-(--color-subtle-foreground)">
        {preset.stack}
      </p>
      <div className="relative z-1 mt-auto flex justify-center gap-3">
        <button
          type="button"
          className="inline-flex min-h-10 items-center border border-(--builder-ink) bg-(--builder-ink) px-4 text-sm font-semibold text-white"
          onClick={() => onCreate(preset.id)}
        >
          Create
        </button>
        <button
          type="button"
          className="inline-flex min-h-10 items-center border border-(--builder-ink) bg-transparent px-4 text-sm font-semibold text-(--color-foreground)"
          onClick={() => onCustomize(preset.id)}
        >
          Customize
        </button>
      </div>
    </article>
  )
}
