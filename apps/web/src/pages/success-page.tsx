import {
  includedBlockLabels,
  includedComponentLabels,
  labelForModule,
  selectedProjectStructureId,
} from "../builder/resolver-view-model"
import type { GenerationResponse } from "../services/generation-client"
import { ManifestModal } from "../components/builder/manifest-modal"
import { AppIcon } from "../components/icons"
import { buttonStyles } from "../components/layout/app-shell"

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
    <main className="success-page grid min-h-[calc(100dvh-4.5rem)] place-items-center p-8 max-[980px]:p-4">
      <section className="grid w-full max-w-220 justify-items-center gap-5 border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(2rem,5vw,4rem)] text-center shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)]">
        <span
          className="inline-flex size-14 items-center justify-center bg-(--builder-accent) text-white [&_.icon]:size-6"
          aria-hidden="true"
        >
          <AppIcon name="check" />
        </span>
        <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold uppercase text-(--builder-accent)">
          Success
        </p>
        <h1 className="font-(family-name:--font-display) text-[clamp(2.4rem,4vw,4.1rem)] leading-none font-bold tracking-[-0.055em]">
          Template generated.
        </h1>
        <p className="text-(--color-muted-foreground)">
          Your DittoJs template is ready to download.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-[980px]:w-full max-[980px]:flex-col">
          <button type="button" className={buttonStyles.dark} onClick={onDownload}>
            <AppIcon name="download" />
            Download ZIP
          </button>
          <button type="button" className={buttonStyles.light} onClick={onOpenManifest}>
            <AppIcon name="code" />
            View JSON Manifest
          </button>
          <button type="button" className={buttonStyles.light} onClick={onCopyCli}>
            <AppIcon name="copy" />
            Copy CLI Command
          </button>
          <button type="button" className={buttonStyles.disabled} disabled>
            Sign in to save <span>Coming soon</span>
          </button>
        </div>
        {copyState !== undefined ? (
          <p className="text-sm text-(--color-muted-foreground)">{copyState}</p>
        ) : null}
        <div
          className="grid w-full grid-cols-3 border-t border-l border-(--color-border-strong) text-left max-[760px]:grid-cols-1 [&>div]:grid [&>div]:gap-1 [&>div]:border-r [&>div]:border-b [&>div]:border-(--color-border-strong) [&>div]:p-4 [&_span]:font-(family-name:--font-mono) [&_span]:text-[0.62rem] [&_span]:font-bold [&_span]:uppercase [&_span]:text-(--color-muted-foreground) [&_strong]:text-sm"
          aria-label="Generated template summary"
        >
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
