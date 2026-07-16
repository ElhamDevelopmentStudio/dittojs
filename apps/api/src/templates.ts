import { catalog } from "@dittosh/catalog"
import { resolveRecipe } from "@dittosh/core"

import { GenerationApiError, generateTemplateArchive } from "./generation.js"
import type { TemplateGenerationOptions, TemplateGenerationResponse } from "./generation.js"
import {
  TEMPLATE_SCHEMA_VERSION,
  type SavedTemplate,
  type TemplateStore,
} from "./template-store.js"

export const CATALOG_VERSION = "1"

export type SaveTemplateRequest = {
  presetId?: string
  userSelections: string[]
}

export type SaveTemplateResponse = {
  templateId: string
  createdAt: string
  catalogVersion: string
}

export type GenerateSavedTemplateRequest = {
  projectName: string
  packageManager?: "pnpm" | "npm" | "yarn"
}

function assertSelections(input: unknown): asserts input is SaveTemplateRequest {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new GenerationApiError("Template request must be a JSON object.", "invalid-request", 400)
  }

  const candidate = input as Partial<SaveTemplateRequest>

  if (
    !Array.isArray(candidate.userSelections) ||
    !candidate.userSelections.every((selection) => typeof selection === "string")
  ) {
    throw new GenerationApiError(
      "Template request must include string userSelections.",
      "invalid-request",
      400,
    )
  }

  if (candidate.presetId !== undefined && typeof candidate.presetId !== "string") {
    throw new GenerationApiError("presetId must be a string.", "invalid-request", 400)
  }
}

function assertGenerationRequest(input: unknown): asserts input is GenerateSavedTemplateRequest {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new GenerationApiError(
      "Generation request must be a JSON object.",
      "invalid-request",
      400,
    )
  }

  const candidate = input as Partial<GenerateSavedTemplateRequest>

  if (
    typeof candidate.projectName !== "string" ||
    candidate.projectName.trim().length === 0 ||
    candidate.projectName.length > 80
  ) {
    throw new GenerationApiError("projectName is required.", "invalid-project-name", 400)
  }

  if (
    candidate.packageManager !== undefined &&
    !["pnpm", "npm", "yarn"].includes(candidate.packageManager)
  ) {
    throw new GenerationApiError(
      "packageManager must be pnpm, npm, or yarn.",
      "invalid-package-manager",
      400,
    )
  }
}

function blockingErrors(input: SaveTemplateRequest) {
  return resolveRecipe({
    catalog,
    userSelections: input.userSelections,
    ...(input.presetId === undefined ? {} : { presetId: input.presetId }),
  }).conflicts.filter((conflict) => conflict.severity === "error")
}

export async function saveTemplate(
  input: unknown,
  store: TemplateStore,
): Promise<SaveTemplateResponse> {
  assertSelections(input)

  const conflicts = blockingErrors(input)

  if (conflicts.length > 0) {
    throw new GenerationApiError(
      "Cannot save a template while resolver conflicts exist.",
      "resolver-conflict",
      422,
      conflicts,
    )
  }

  const template = await store.save({
    catalogVersion: CATALOG_VERSION,
    userSelections: input.userSelections,
    ...(input.presetId === undefined ? {} : { presetId: input.presetId }),
  })

  return {
    templateId: template.id,
    createdAt: template.createdAt,
    catalogVersion: template.catalogVersion,
  }
}

export async function requireSavedTemplate(
  templateId: string,
  store: TemplateStore,
): Promise<SavedTemplate> {
  const template = await store.find(templateId)

  if (template === undefined) {
    throw new GenerationApiError("Template was not found.", "template-not-found", 404)
  }

  if (
    template.schemaVersion !== TEMPLATE_SCHEMA_VERSION ||
    !Array.isArray(template.userSelections) ||
    !template.userSelections.every((selection) => typeof selection === "string")
  ) {
    throw new GenerationApiError(
      "Template record uses an unsupported schema.",
      "template-version-unsupported",
      409,
    )
  }

  if (template.catalogVersion !== CATALOG_VERSION) {
    throw new GenerationApiError(
      "Template uses an unsupported catalog version.",
      "template-version-unsupported",
      409,
    )
  }

  return template
}

export async function generateSavedTemplate(
  templateId: string,
  input: unknown,
  store: TemplateStore,
  options: TemplateGenerationOptions = {},
): Promise<TemplateGenerationResponse> {
  assertGenerationRequest(input)

  const template = await requireSavedTemplate(templateId, store)

  return generateTemplateArchive(
    {
      userSelections: template.userSelections,
      projectName: input.projectName,
      ...(template.presetId === undefined ? {} : { presetId: template.presetId }),
      ...(input.packageManager === undefined ? {} : { packageManager: input.packageManager }),
    },
    options,
  )
}
