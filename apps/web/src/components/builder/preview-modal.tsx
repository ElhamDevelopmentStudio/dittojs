import { useEffect } from "react"

import type { BuilderOption } from "../../builder/builder-options"
import { AppIcon } from "../icons"
import { iconButtonStyle } from "../layout/app-shell"

export function PreviewModal({ option, onClose }: { option: BuilderOption; onClose: () => void }) {
  const preview = option.preview

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  if (preview === undefined) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-(--color-modal-backdrop) p-4"
      role="presentation"
    >
      <section
        aria-labelledby="preview-modal-title"
        aria-modal="true"
        className="grid max-h-[calc(100dvh-2rem)] w-full max-w-300 gap-5 overflow-auto border border-(--color-border-strong) bg-(--color-paper) p-6 shadow-(--shadow-panel)"
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4 border-b border-(--color-border) pb-4">
          <div>
            <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
              Catalog preview
            </p>
            <h2
              className="font-(family-name:--font-display) text-xl font-bold"
              id="preview-modal-title"
            >
              {option.label}
            </h2>
            <p className="text-sm text-(--color-muted-foreground)">{option.description}</p>
          </div>
          <button
            type="button"
            className={iconButtonStyle}
            aria-label="Close preview"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <div
          className={`mx-auto w-full overflow-hidden border border-(--color-border-strong) bg-white ${preview.viewport === "component" ? "max-w-160" : "max-w-none"}`}
        >
          <iframe
            className="block min-h-[70dvh] w-full border-0 bg-white"
            src={`/preview/${encodeURIComponent(preview.id)}`}
            title={`${option.label} preview`}
          />
        </div>
      </section>
    </div>
  )
}
