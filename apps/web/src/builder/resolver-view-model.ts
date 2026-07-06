import { catalog } from "@dittojs/catalog"
import type { LockReason, ModuleManifest, ResolvedRecipe, SelectionReason } from "@dittojs/core"

export type SummaryRow = {
  label: string
  value: string
}

export type LockSummary = {
  moduleId: string
  label: string
  reasons: LockReason[]
}

const catalogById = new Map(catalog.map((manifest) => [manifest.id, manifest]))

function manifestFor(moduleId: string): ModuleManifest | undefined {
  return catalogById.get(moduleId)
}

function humanizeModuleId(moduleId: string): string {
  return (
    moduleId
      .split(".")
      .at(-1)
      ?.split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ") ?? moduleId
  )
}

export function labelForModule(moduleId: string): string {
  return (
    manifestFor(moduleId)?.ui?.label ?? manifestFor(moduleId)?.label ?? humanizeModuleId(moduleId)
  )
}

export function moduleType(moduleId: string): ModuleManifest["type"] | undefined {
  return manifestFor(moduleId)?.type
}

function hasIntentReason(reasons: SelectionReason[] | undefined): boolean {
  return reasons?.some((reason) => reason.type === "user" || reason.type === "preset") ?? false
}

function hasAutomaticReason(reasons: SelectionReason[] | undefined): boolean {
  return (
    reasons?.some((reason) => reason.type === "requirement" || reason.type === "default") ?? false
  )
}

function labelsFor(recipe: ResolvedRecipe, predicate: (moduleId: string) => boolean): string[] {
  return recipe.effectiveSelections.filter(predicate).map(labelForModule)
}

export function selectedByIntent(recipe: ResolvedRecipe): string[] {
  return labelsFor(recipe, (moduleId) => hasIntentReason(recipe.selectionReasons[moduleId]))
}

export function addedAutomatically(recipe: ResolvedRecipe): string[] {
  return labelsFor(recipe, (moduleId) => {
    const reasons = recipe.selectionReasons[moduleId]

    return !hasIntentReason(reasons) && hasAutomaticReason(reasons)
  })
}

export function lockSummaries(recipe: ResolvedRecipe): LockSummary[] {
  return Object.entries(recipe.locks).map(([moduleId, reasons]) => ({
    moduleId,
    label: labelForModule(moduleId),
    reasons,
  }))
}

export function isLocked(recipe: ResolvedRecipe, moduleId: string): boolean {
  return (recipe.locks[moduleId]?.length ?? 0) > 0
}

export function lockExplanation(recipe: ResolvedRecipe, moduleId: string): string | undefined {
  const reasons = recipe.locks[moduleId]

  if (reasons === undefined || reasons.length === 0) {
    return undefined
  }

  return reasons.map((reason) => `${labelForModule(reason.requiredBy)}: ${reason.reason}`).join(" ")
}

export function lockedLabelsRequiredBy(recipe: ResolvedRecipe, requiredBy: string): string[] {
  return lockSummaries(recipe)
    .filter((lock) => lock.reasons.some((reason) => reason.requiredBy === requiredBy))
    .map((lock) => lock.label)
}

function labelsByType(recipe: ResolvedRecipe, type: ModuleManifest["type"]): string {
  const labels = recipe.effectiveSelections
    .filter((moduleId) => moduleType(moduleId) === type)
    .map(labelForModule)

  return labels.length > 0 ? labels.join(", ") : "None"
}

function firstLabelByType(recipe: ResolvedRecipe, type: ModuleManifest["type"]): string {
  const moduleId = recipe.effectiveSelections.find((selection) => moduleType(selection) === type)

  return moduleId === undefined ? "Not selected" : labelForModule(moduleId)
}

export function stackSummary(recipe: ResolvedRecipe): SummaryRow[] {
  return [
    {
      label: "Framework",
      value: `${firstLabelByType(recipe, "framework")} + ${firstLabelByType(recipe, "tooling")}`,
    },
    {
      label: "Language",
      value: recipe.effectiveSelections.includes("tooling.typescript")
        ? "TypeScript"
        : "Not selected",
    },
    {
      label: "Styling",
      value: recipe.effectiveSelections.includes("styling.tailwind")
        ? "Tailwind CSS v4"
        : firstLabelByType(recipe, "styling"),
    },
    {
      label: "UI Library",
      value: `${firstLabelByType(recipe, "ui-library")} + ${firstLabelByType(recipe, "primitive-engine")}`,
    },
    {
      label: "Forms & Validation",
      value: `${firstLabelByType(recipe, "form-engine")} + ${firstLabelByType(recipe, "validation")}`,
    },
    {
      label: "State Management",
      value: firstLabelByType(recipe, "state"),
    },
    {
      label: "HTTP Client",
      value: firstLabelByType(recipe, "http"),
    },
    {
      label: "Project Structure",
      value: firstLabelByType(recipe, "project-structure"),
    },
    {
      label: "Components",
      value: labelsByType(recipe, "primitive"),
    },
    {
      label: "Blocks",
      value: labelsByType(recipe, "block"),
    },
  ]
}

export function selectedProjectStructureId(recipe: ResolvedRecipe): string | undefined {
  return recipe.effectiveSelections.find(
    (selection) => moduleType(selection) === "project-structure",
  )
}

export function includedComponentLabels(recipe: ResolvedRecipe): string[] {
  return recipe.effectiveSelections
    .filter((selection) => moduleType(selection) === "primitive")
    .map(labelForModule)
}

export function includedBlockLabels(recipe: ResolvedRecipe): string[] {
  return recipe.effectiveSelections
    .filter((selection) => moduleType(selection) === "block")
    .map(labelForModule)
}

export function blockingConflicts(recipe: ResolvedRecipe) {
  return recipe.conflicts.filter((conflict) => conflict.severity === "error")
}

export function canGenerate(recipe: ResolvedRecipe): boolean {
  return blockingConflicts(recipe).length === 0
}

export function cliCommand(presetId: string | undefined, userSelections: string[]): string {
  const presetFlag = presetId === undefined ? "" : ` --preset ${presetId.replace("preset.", "")}`
  const selectionFlag =
    userSelections.length === 0
      ? ""
      : ` --select ${userSelections.map((selection) => `"${selection}"`).join(",")}`

  return `pnpm dlx dittojs generate${presetFlag}${selectionFlag} --out ./ditto-template`
}
