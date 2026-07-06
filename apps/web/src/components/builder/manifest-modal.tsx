import type { ResolvedRecipe } from "@dittojs/core"

import { AppIcon } from "../icons"

export function ManifestModal({
  recipe,
  onClose,
}: {
  recipe: ResolvedRecipe
  onClose: () => void
}) {
  return (
    <div className="modal-backdrop" role="presentation">
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="manifest-title">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Resolved recipe</p>
            <h2 id="manifest-title">JSON Manifest</h2>
          </div>
          <button
            type="button"
            className="icon-button"
            aria-label="Close manifest"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <pre className="manifest-code">{JSON.stringify(recipe, null, 2)}</pre>
      </section>
    </div>
  )
}
