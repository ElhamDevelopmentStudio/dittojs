import { presetOptions } from "../builder/builder-options"
import { PresetCard } from "../components/builder/preset-card"
import { AppIcon } from "../components/icons"
import dittoInspirationUrl from "../assets/ditto-source-grayscale.png"
import versionControlVisualUrl from "../assets/undraw-version-control-ditto.svg"

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
      <section className="hero-panel" aria-labelledby="hero-title">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-kicker">One source. Many independent builds.</p>
            <h1 id="hero-title">
              Split once.
              <span>Ship differently.</span>
            </h1>
            <p>
              Generate dependency-correct React starters from one intelligent template system. Every
              copy is yours to customize.
            </p>
            <div className="hero-actions">
              <button
                type="button"
                className="button button-dark hero-primary-action"
                onClick={onStart}
              >
                Build yours
                <AppIcon name="arrow-right" />
              </button>
            </div>
          </div>
          <div className="hero-visual" aria-label="Ditto splitting into independent project copies">
            <div className="ditto-echo ditto-echo-back" aria-hidden="true">
              <img src={dittoInspirationUrl} alt="" />
            </div>
            <div className="ditto-echo ditto-echo-middle" aria-hidden="true">
              <img src={dittoInspirationUrl} alt="" />
            </div>
            <figure className="hero-inspiration">
              <img src={dittoInspirationUrl} alt="Ditto from Ben 10, the inspiration for DittoJs" />
              <figcaption>Name inspired by Ben 10's Ditto.</figcaption>
            </figure>
            <div className="manifest-chip manifest-chip-one" aria-hidden="true">
              <span>01</span>
              <strong>React starter</strong>
            </div>
            <div className="manifest-chip manifest-chip-two" aria-hidden="true">
              <span>02</span>
              <strong>SaaS dashboard</strong>
            </div>
            <div className="manifest-chip manifest-chip-three" aria-hidden="true">
              <span>03</span>
              <strong>Your build</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="origin-section" id="origin" aria-labelledby="origin-title">
        <div className="origin-copy">
          <p className="origin-label">Why the name fits</p>
          <h2 id="origin-title">The copy leaves home ready.</h2>
          <p>
            Ben 10's Ditto split into independent copies. Here, one resolver creates distinct
            projects that no longer depend on the generator.
          </p>
        </div>
        <figure className="origin-artwork">
          <img
            src={versionControlVisualUrl}
            alt="Developer coordinating multiple version-controlled project branches"
          />
          <figcaption>One validated source. Multiple independent codebases.</figcaption>
        </figure>
      </section>
      <section className="preset-section" id="presets" aria-labelledby="preset-title">
        <div className="section-heading">
          <h2 id="preset-title">Pick your first copy.</h2>
          <p>Start opinionated, then make it unmistakably yours.</p>
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
      <footer className="landing-footer">
        <strong>DittoJs</strong>
        <nav aria-label="Footer links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
          <a href="#support">Support</a>
        </nav>
        <span>© 2026 DittoJs. Built to multiply good decisions.</span>
      </footer>
    </main>
  )
}
