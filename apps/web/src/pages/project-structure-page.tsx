import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "../builder/builder-options"
import { projectStructureOptions } from "../builder/builder-options"
import { selectedProjectStructureId } from "../builder/resolver-view-model"
import { OptionCard } from "../components/builder/option-card"
import { AppIcon } from "../components/icons"
import { FooterActions, StepHeader } from "../components/layout/app-shell"

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
    <main className="structure-page">
      <section className="structure-inner">
        <StepHeader
          eyebrow="Step 3"
          title="Project Structure"
          description="Choose the generated source layout."
        />
        <div className="structure-grid">
          {projectStructureOptions.map((option) => {
            const selected = option.moduleId === selectedStructure
            const tree = option.moduleId === undefined ? [] : (treePreviews[option.moduleId] ?? [])

            return (
              <div className="structure-card" key={option.id}>
                <OptionCard option={option} selected={selected} onSelect={onSelectOption} />
                <pre aria-label={`${option.label} file tree`}>
                  {tree.map((line) => `/${line}`).join("\n")}
                </pre>
              </div>
            )
          })}
        </div>
        <FooterActions>
          <button type="button" className="button button-light" onClick={onBack}>
            <AppIcon name="arrow-left" />
            Back
          </button>
          <button type="button" className="button button-dark" onClick={onContinue}>
            Continue
            <AppIcon name="arrow-right" />
          </button>
        </FooterActions>
      </section>
    </main>
  )
}
