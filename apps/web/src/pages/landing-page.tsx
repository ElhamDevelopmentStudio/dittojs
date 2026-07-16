import { presetOptions } from "../builder/builder-options"
import { PresetCard } from "../components/builder/preset-card"
import { AppIcon } from "../components/icons"
import { buttonStyles } from "../components/layout/app-shell"
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
    <main className="relative z-1 grid min-h-[calc(100dvh-4.5rem)] overflow-hidden" id="builder">
      <section
        className="relative grid min-h-[calc(100dvh-4.5rem)] items-center px-[max(1.25rem,calc((100vw-76rem)/2))] py-[clamp(2rem,6vw,5.5rem)] max-[767px]:min-h-0 max-[767px]:py-12"
        aria-labelledby="hero-title"
      >
        <div className="mx-auto grid w-full max-w-304 grid-cols-[minmax(0,0.92fr)_minmax(22rem,1.08fr)] items-center gap-[clamp(2rem,6vw,6.5rem)] max-[767px]:grid-cols-1">
          <div className="hero-copy-motion grid max-w-160 justify-items-start gap-6 text-left">
            <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold tracking-[0.04em] text-(--builder-accent) uppercase">
              One source. Many independent builds.
            </p>
            <h1
              className="max-w-[9ch] font-(family-name:--font-display) text-[clamp(3.5rem,7vw,6.8rem)] leading-[0.9] font-bold tracking-[-0.06em] max-[767px]:text-[clamp(3.25rem,16vw,5rem)]"
              id="hero-title"
            >
              Split once.
              <span className="block text-(--builder-accent)">Ship differently.</span>
            </h1>
            <p className="max-w-140 text-[1.05rem] leading-[1.6] text-(--color-muted-foreground)">
              Generate dependency-correct React starters from one intelligent template system. Every
              copy is yours to customize.
            </p>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                className={`${buttonStyles.dark} min-h-13 px-[1.4rem] font-bold`}
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
      <section
        className="grid min-h-168 w-full grid-cols-[minmax(0,0.8fr)_minmax(28rem,1.2fr)] items-center gap-[clamp(3rem,8vw,8rem)] overflow-hidden bg-(--builder-ink) px-[max(1.25rem,calc((100vw-76rem)/2))] py-[clamp(4rem,9vw,8rem)] text-white max-[980px]:grid-cols-[minmax(0,0.9fr)_minmax(22rem,1.1fr)] max-[767px]:grid-cols-1"
        id="origin"
        aria-labelledby="origin-title"
      >
        <div className="grid max-w-124 gap-5">
          <p className="font-(family-name:--font-mono) text-[0.68rem] font-bold tracking-[0.04em] text-(--builder-accent) uppercase">
            Why the name fits
          </p>
          <h2
            className="max-w-[10ch] font-(family-name:--font-display) text-[clamp(2.5rem,4vw,4.25rem)] leading-[0.98] font-bold tracking-[-0.045em]"
            id="origin-title"
          >
            The copy leaves home ready.
          </h2>
          <p className="max-w-116 text-base leading-[1.65] text-[#b9bfbb]">
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
      <section
        className="grid w-full gap-10 px-[max(1.25rem,calc((100vw-76rem)/2))] py-[clamp(4rem,8vw,7rem)]"
        id="presets"
        aria-labelledby="preset-title"
      >
        <div className="mx-auto grid w-full max-w-304 gap-3 text-center">
          <h2
            className="font-(family-name:--font-display) text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.05em]"
            id="preset-title"
          >
            Pick your first copy.
          </h2>
          <p className="text-lg text-(--color-muted-foreground)">
            Start opinionated, then make it unmistakably yours.
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-304 grid-cols-2 gap-5 max-[760px]:grid-cols-1">
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
      <footer className="mx-auto grid w-full max-w-304 grid-cols-[1fr_auto_1fr] items-center gap-6 border-t border-(--color-border-strong) py-8 text-sm text-(--color-muted-foreground) max-[760px]:grid-cols-1 max-[760px]:text-center">
        <strong className="inline-flex items-center gap-2 font-(family-name:--font-display) text-lg text-(--color-foreground) max-[760px]:justify-center">
          <img
            className="size-10 object-contain"
            src="/brand/ditto-mark-64.png"
            alt=""
            aria-hidden="true"
          />
          DittoJs
        </strong>
        <nav className="flex justify-center gap-6" aria-label="Footer links">
          <a className="underline underline-offset-3" href="#privacy">
            Privacy
          </a>
          <a className="underline underline-offset-3" href="#terms">
            Terms
          </a>
          <a className="underline underline-offset-3" href="#support">
            Support
          </a>
        </nav>
        <span className="text-right max-[760px]:text-center">
          © 2026 DittoJs. Built to multiply good decisions.
        </span>
      </footer>
    </main>
  )
}
