import {
  includedBlockLabels,
  includedComponentLabels,
  labelForModule,
  selectedProjectStructureId,
} from "../builder/resolver-view-model"
import type { GenerationResponse } from "../services/generation-client"
import { ManifestModal } from "../components/builder/manifest-modal"
import { AppIcon } from "../components/icons"

export function SuccessPage({
  response,
  manifestOpen,
  copyState,
  onDownload,
  onOpenManifest,
  onCloseManifest,
  onCopyCli,
}: {
  response: GenerationResponse
  manifestOpen: boolean
  copyState?: string | undefined
  onDownload: () => void
  onOpenManifest: () => void
  onCloseManifest: () => void
  onCopyCli: () => void | Promise<void>
}) {
  const recipe = response.resolvedRecipe
  const structureId = selectedProjectStructureId(recipe)
  const presetId =
    typeof recipe.metadata.presetId === "string" ? recipe.metadata.presetId : undefined

  return (
    <main className="success-page">
      <section className="success-card">
        <span className="success-mark" aria-hidden="true">
          <AppIcon name="check" />
        </span>
        <p className="eyebrow">Success</p>
        <h1>Template generated.</h1>
        <p>Your DittoJs template is ready to download.</p>
        <div className="success-actions">
          <button type="button" className="button button-dark" onClick={onDownload}>
            <AppIcon name="download" />
            Download ZIP
          </button>
          <button type="button" className="button button-light" onClick={onOpenManifest}>
            <AppIcon name="code" />
            View JSON Manifest
          </button>
          <button type="button" className="button button-light" onClick={onCopyCli}>
            <AppIcon name="copy" />
            Copy CLI Command
          </button>
          <button type="button" className="button button-disabled" disabled>
            Sign in to save <span>Coming soon</span>
          </button>
        </div>
        {copyState !== undefined ? <p className="inline-status">{copyState}</p> : null}
        <div className="success-summary" aria-label="Generated template summary">
          <div>
            <span>Preset</span>
            <strong>{presetId === undefined ? "Custom" : labelForModule(presetId)}</strong>
          </div>
          <div>
            <span>Project structure</span>
            <strong>
              {structureId === undefined ? "Not selected" : labelForModule(structureId)}
            </strong>
          </div>
          <div>
            <span>Files generated</span>
            <strong>{response.generation.filesGenerated}</strong>
          </div>
          <div>
            <span>Components included</span>
            <strong>{includedComponentLabels(recipe).join(", ") || "None"}</strong>
          </div>
          <div>
            <span>Blocks included</span>
            <strong>{includedBlockLabels(recipe).join(", ") || "None"}</strong>
          </div>
          <div>
            <span>Package policy</span>
            <strong>Passed</strong>
          </div>
        </div>
      </section>
      {manifestOpen ? <ManifestModal recipe={recipe} onClose={onCloseManifest} /> : null}
    </main>
  )
}
