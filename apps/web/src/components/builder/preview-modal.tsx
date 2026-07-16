import { useEffect } from "react"

import type { BuilderOption } from "../../builder/builder-options"
import { AppIcon } from "../icons"

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
    <div className="modal-backdrop preview-backdrop" role="presentation">
      <section
        aria-labelledby="preview-modal-title"
        aria-modal="true"
        className="modal preview-modal"
        role="dialog"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">Catalog preview</p>
            <h2 id="preview-modal-title">{option.label}</h2>
            <p>{option.description}</p>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close preview"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <div className={`preview-frame-shell preview-frame-shell-${preview.viewport}`}>
          <iframe
            className="preview-frame"
            src={`/preview/${encodeURIComponent(preview.id)}`}
            title={`${option.label} preview`}
          />
        </div>
      </section>
    </div>
  )
}
