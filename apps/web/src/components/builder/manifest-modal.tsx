import type { ResolvedRecipe } from "@dittosh/core"

import { AppIcon } from "../icons"
import { iconButtonStyle } from "../layout/app-shell"

export function ManifestModal({
  recipe,
  onClose,
}: {
  recipe: ResolvedRecipe
  onClose: () => void
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-(--color-modal-backdrop) p-4"
      role="presentation"
    >
      <section
        className="grid max-h-[calc(100dvh-2rem)] w-full max-w-200 gap-5 overflow-auto border border-(--color-border-strong) bg-(--color-paper) p-6 shadow-(--shadow-panel)"
        role="dialog"
        aria-modal="true"
        aria-labelledby="manifest-title"
      >
        <div className="flex items-start justify-between gap-4 border-b border-(--color-border) pb-4">
          <div>
            <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
              Resolved recipe
            </p>
            <h2 className="font-(family-name:--font-display) text-xl font-bold" id="manifest-title">
              JSON Manifest
            </h2>
          </div>
          <button
            type="button"
            className={iconButtonStyle}
            aria-label="Close manifest"
            onClick={onClose}
          >
            <AppIcon name="close" />
          </button>
        </div>
        <pre className="overflow-auto bg-(--color-code-background) p-5 font-(family-name:--font-mono) text-[0.75rem] leading-6 text-white">
          {JSON.stringify(recipe, null, 2)}
        </pre>
      </section>
    </div>
  )
}
