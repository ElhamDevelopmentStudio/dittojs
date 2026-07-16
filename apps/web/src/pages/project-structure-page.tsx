import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { projectStructureOptions } from "../builder/builder-options"
import { selectedProjectStructureId } from "../builder/resolver-view-model"
import { OptionCard } from "../components/builder/option-card"
import { AppIcon } from "../components/icons"
import { buttonStyles, FooterActions, StepHeader } from "../components/layout/app-shell"

const treePreviews: Record<string, string[]> = {
  "structure.react.simple": ["src/components", "src/pages", "src/stores", "src/lib"],
  "structure.react.feature-based": [
    "src/features/dashboard",
    "src/features/settings",
    "src/shared/ui",
  ],
  "structure.react.route-colocated": ["src/routes/home", "src/routes/settings", "src/routes/chat"],
}

export function ProjectStructurePage({
  recipe,
  onSelectOption,
  onBack,
  onContinue,
}: {
  recipe: ResolvedRecipe
  onSelectOption: (option: BuilderOption) => void
  onBack: () => void
  onContinue: () => void
}) {
  const selectedStructure = selectedProjectStructureId(recipe)

  return (
    <main className="structure-page mx-auto max-w-360 p-[clamp(1.5rem,4vw,3.5rem)] max-[980px]:p-4">
      <section className="grid gap-[clamp(2rem,4vw,3.25rem)] border border-(--color-border-strong) bg-[rgba(255,254,250,0.94)] p-[clamp(1.5rem,3vw,3rem)] shadow-[0.6rem_0.6rem_0_rgba(23,26,25,0.045)] max-[980px]:p-5">
        <StepHeader
          eyebrow="Step 3"
          title="Project Structure"
          description="Choose the generated source layout."
        />
        <div className="grid grid-cols-3 gap-4 max-[980px]:grid-cols-1">
          {projectStructureOptions.map((option) => {
            const selected = option.moduleId === selectedStructure
            const tree = option.moduleId === undefined ? [] : (treePreviews[option.moduleId] ?? [])

            return (
              <div className="grid gap-3" key={option.id}>
                <OptionCard option={option} selected={selected} onSelect={onSelectOption} />
                <pre
                  className="min-h-40 overflow-auto bg-(--color-code-background) p-4 font-(family-name:--font-mono) text-[0.72rem] leading-6 text-white"
                  aria-label={`${option.label} file tree`}
                >
                  {tree.map((line) => `/${line}`).join("\n")}
                </pre>
              </div>
            )
          })}
        </div>
        <FooterActions>
          <button type="button" className={buttonStyles.light} onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button type="button" className={buttonStyles.dark} onClick={onContinue}>
            Continue
            <AppIcon name="arrow-right" />
          </button>
        </FooterActions>
      </section>
    </main>
  )
}
