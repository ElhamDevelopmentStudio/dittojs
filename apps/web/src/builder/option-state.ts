import type { ResolvedRecipe } from "@dittojs/core"

import type { BuilderOption } from "./builder-options"
import { moduleIdsForOption } from "./builder-options"
import { isLocked, lockExplanation } from "./resolver-view-model"

export type BuilderOptionUiState = {
  selected: boolean
  locked: boolean
  automatic: boolean
  lockExplanation?: string | undefined
}

export function stateForOption(
  recipe: ResolvedRecipe,
  option: BuilderOption,
): BuilderOptionUiState {
  const moduleIds = moduleIdsForOption(option)
  const selected =
    moduleIds.length > 0 &&
    moduleIds.every((moduleId) => recipe.effectiveSelections.includes(moduleId))
  const lockedModuleId = selected
    ? moduleIds.find((moduleId) => isLocked(recipe, moduleId))
    : undefined
  const automatic =
    selected &&
    moduleIds.length > 0 &&
    moduleIds.every((moduleId) => !recipe.userSelections.includes(moduleId)) &&
    moduleIds.some((moduleId) =>
      recipe.selectionReasons[moduleId]?.some((reason) => reason.type === "requirement"),
    )

  return {
    selected,
    locked: lockedModuleId !== undefined,
    automatic,
    lockExplanation:
      lockedModuleId === undefined ? undefined : lockExplanation(recipe, lockedModuleId),
  }
}
