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
  onPreview?: (option: BuilderOption) => void
}

export function OptionCard({
  option,
  selected,
  locked = false,
  automatic = false,
  lockExplanation,
  onSelect,
  onCustomize,
  onPreview,
}: OptionCardProps) {
  const disabled = option.comingSoon === true
  const customizable = option.customization !== undefined && onCustomize !== undefined
  const previewable = option.preview !== undefined && onPreview !== undefined
  const className = [
    "relative isolate grid min-h-42 w-full items-stretch overflow-hidden border bg-[rgba(255,255,255,0.64)] text-left text-(--color-foreground) transition-[background,border-color,box-shadow,transform] duration-150 before:absolute before:inset-y-0 before:left-0 before:w-[0.3rem] before:bg-(--builder-accent) before:content-['']",
    selected ? "border-(--builder-ink) bg-(--color-paper)" : "border-[#cfd3d0]",
    locked || automatic ? "[&_.option-icon]:text-(--color-muted-foreground)" : "",
    disabled
      ? "cursor-not-allowed border-(--color-border) bg-(--color-disabled-background) text-(--color-disabled-text) opacity-70"
      : "hover:-translate-y-px hover:border-(--builder-ink)",
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

  const handlePreview = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onPreview?.(option)
  }

  return (
    <article className={className}>
      <button
        type="button"
        className="grid min-h-[inherit] w-full appearance-none border-0 bg-transparent p-0 text-left text-inherit"
        disabled={disabled}
        aria-disabled={disabled}
        aria-pressed={selected}
        onClick={() => onSelect(option)}
      >
        <span className="grid min-h-full content-start gap-3 px-4 pt-5 pr-16 pb-4">
          <span className="min-w-0 overflow-hidden font-(family-name:--font-mono) text-[0.6rem] font-bold text-ellipsis whitespace-nowrap text-(--builder-accent) uppercase">
            {optionMeta}
          </span>
          <span className="flex items-center justify-between gap-3">
            <span className="font-(family-name:--font-display) text-[1.1rem] leading-5 font-bold tracking-[-0.02em]">
              {option.label}
            </span>
            <span
              className={`option-icon inline-flex size-[1.8rem] items-center justify-center text-white ${selected ? "bg-(--builder-accent)" : "bg-(--builder-ink)"}`}
              aria-hidden="true"
            >
              <AppIcon name={iconName} />
            </span>
          </span>
          <span className="line-clamp-2 text-[0.84rem] leading-6 text-[#626a65]">
            {option.description}
          </span>
          {locked && lockExplanation !== undefined ? (
            <span className="mt-auto flex items-center gap-2 border-t border-[#dde0de] pt-3 font-(family-name:--font-mono) text-[0.64rem] leading-6 text-[#555d58] [&_.icon]:size-3.5">
              <AppIcon name="lock" />
              {lockSource === undefined ? lockExplanation : `Locked by ${lockSource}`}
            </span>
          ) : null}
        </span>
      </button>
      <span className="absolute top-3 right-3 z-2 block">
        <span className="flex flex-wrap items-center justify-start gap-2">
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
              className="inline-flex size-8 items-center justify-center border border-(--color-border-strong) bg-(--color-paper) text-(--color-foreground) hover:border-(--builder-ink)"
              aria-label={`Customize ${option.label}`}
              onClick={handleCustomize}
            >
              <AppIcon name="settings" />
            </button>
          ) : null}
          {previewable ? (
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center border border-(--color-border-strong) bg-(--color-paper) text-(--color-foreground) hover:border-(--builder-ink)"
              aria-label={`Preview ${option.label}`}
              onClick={handlePreview}
            >
              <AppIcon name="preview" />
            </button>
          ) : null}
        </span>
      </span>
    </article>
  )
}
