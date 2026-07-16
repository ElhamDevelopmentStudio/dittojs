import type { ResolvedRecipe } from "@dittosh/core"

import { normalizeSafeRelativePath } from "../paths.js"
import { GenerateProjectError } from "../types.js"
import { getProjectStructureAdapter } from "./adapters.js"
import type { ProjectStructureAdapter } from "./types.js"

const PLACEHOLDER_PATTERN = /\{([A-Za-z][A-Za-z0-9-]*)\}/g
const STRUCTURE_MODULE_PREFIX = "structure."

export type ResolveStructurePathInput = {
  adapter: ProjectStructureAdapter
  slot: string
  name?: string | undefined
  feature?: string | undefined
  route?: string | undefined
}

function placeholderValue(
  input: ResolveStructurePathInput,
  placeholder: string,
): string | undefined {
  switch (placeholder) {
    case "name":
      return input.name
    case "feature":
      return input.feature
    case "route":
      return input.route
    default:
      return undefined
  }
}

function safePlaceholderValue(input: ResolveStructurePathInput, placeholder: string): string {
  const value = placeholderValue(input, placeholder)

  if (value === undefined || value.trim().length === 0) {
    throw new GenerateProjectError(
      `Structure slot "${input.slot}" requires placeholder "${placeholder}".`,
    )
  }

  return normalizeSafeRelativePath(value, `structure placeholder "${placeholder}"`)
}

export function resolveStructurePath(input: ResolveStructurePathInput): string {
  const pattern = input.adapter.slots[input.slot]

  if (pattern === undefined) {
    throw new GenerateProjectError(
      `Project structure "${input.adapter.id}" does not define slot "${input.slot}".`,
    )
  }

  const resolvedPath = pattern.replace(PLACEHOLDER_PATTERN, (_match, placeholder: string) =>
    safePlaceholderValue(input, placeholder),
  )

  return normalizeSafeRelativePath(resolvedPath, `structure slot "${input.slot}" target`)
}

export function selectedProjectStructureIds(effectiveSelections: string[]): string[] {
  return effectiveSelections.filter((selection) => selection.startsWith(STRUCTURE_MODULE_PREFIX))
}

export function selectedProjectStructureAdapter(
  resolvedRecipe: ResolvedRecipe,
): ProjectStructureAdapter | undefined {
  const structureIds = selectedProjectStructureIds(resolvedRecipe.effectiveSelections)

  if (structureIds.length === 0) {
    return undefined
  }

  if (structureIds.length > 1) {
    throw new GenerateProjectError(
      `Multiple project structures selected: ${structureIds.join(", ")}.`,
    )
  }

  const structureId = structureIds[0]

  if (structureId === undefined) {
    return undefined
  }

  const adapter = getProjectStructureAdapter(structureId)

  if (adapter === undefined) {
    throw new GenerateProjectError(
      `Selected project structure "${structureId}" has no generator adapter.`,
    )
  }

  return adapter
}

export function requireProjectStructureAdapter(
  resolvedRecipe: ResolvedRecipe,
): ProjectStructureAdapter {
  const adapter = selectedProjectStructureAdapter(resolvedRecipe)

  if (adapter === undefined) {
    throw new GenerateProjectError(
      "Project structure selection is required for slot file mappings.",
    )
  }

  return adapter
}
