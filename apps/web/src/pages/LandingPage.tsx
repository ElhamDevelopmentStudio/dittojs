import { presetOptions } from "../builder/builder-options"
import { PresetCard } from "../components/builder/PresetCard"
import { AppIcon } from "../components/icons"

export function LandingPage({
  onCreatePreset,
  onCustomizePreset,
  onStart,
}: {
  onCreatePreset: (presetId: string) => void
  onCustomizePreset: (presetId: string) => void
  onStart: () => void
}) {
  return (
    <main className="landing-page" id="builder">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">Editorial scaffolder</p>
          <h1>DittoJs</h1>
          <p>
            Compose a tested React template from catalog-backed modules, review the resolver output,
            and download a generated archive.
          </p>
          <div className="hero-actions">
            <button type="button" className="button button-inverted" onClick={onStart}>
              Start Generating
              <AppIcon name="arrow-right" />
            </button>
            <button type="button" className="button button-ghost" disabled>
              <AppIcon name="docs" />
              View Docs
            </button>
            <button type="button" className="button button-disabled" disabled>
              Ask the Architect <span>Coming soon</span>
            </button>
          </div>
        </div>
        <div className="hero-mark" aria-hidden="true">
          <span>Resolve</span>
          <span>Generate</span>
          <span>Validate</span>
        </div>
      </section>
      <section className="preset-section" aria-labelledby="preset-title">
        <div className="section-heading">
          <p className="eyebrow">Presets</p>
          <h2 id="preset-title">Choose the starting architecture.</h2>
        </div>
        <div className="preset-grid">
          {presetOptions.map((preset) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              onCreate={onCreatePreset}
              onCustomize={onCustomizePreset}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
