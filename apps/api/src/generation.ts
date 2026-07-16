import { existsSync } from "node:fs"
import { mkdir, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { catalog, PACKAGE_VERSION_POLICY } from "@dittojs/catalog"
import type { ResolvedRecipe, ResolveConflict } from "@dittojs/core"
import { resolveRecipe } from "@dittojs/core"
import { generateProject, GenerateProjectError } from "@dittojs/generator"
import type { GenerateProjectResult } from "@dittojs/generator"

import { createZipArchive, zipMimeType } from "./archive"

export type TemplateGenerationRequest = {
  presetId?: string
  userSelections: string[]
  projectName?: string
  packageManager?: "pnpm" | "npm" | "yarn"
}

export type TemplateGenerationResponse = {
  fileName: string
  mimeType: string
  archiveBase64: string
  archiveByteLength: number
  resolvedRecipe: ResolvedRecipe
  generation: {
    filesWritten: string[]
    filesGenerated: number
    warnings: GenerateProjectResult["warnings"]
  }
}

export type TemplateGenerationOptions = {
  templateRoot?: string
  temporaryRoot?: string
  createdAt?: Date | string
}

export class GenerationApiError extends Error {
  readonly code: string
  readonly statusCode: number
  readonly details?: unknown

  constructor(message: string, code: string, statusCode = 500, details?: unknown) {
    super(message)
    this.name = "GenerationApiError"
    this.code = code
    this.statusCode = statusCode

    if (details !== undefined) {
      this.details = details
    }
  }
}

function errorConflicts(conflicts: ResolveConflict[]): ResolveConflict[] {
  return conflicts.filter((conflict) => conflict.severity === "error")
}

function assertRequest(input: unknown): asserts input is TemplateGenerationRequest {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw new GenerationApiError(
      "Generation request must be a JSON object.",
      "invalid-request",
      400,
    )
  }

  const candidate = input as Partial<TemplateGenerationRequest>

  if (!Array.isArray(candidate.userSelections)) {
    throw new GenerationApiError(
      "Generation request must include userSelections.",
      "invalid-request",
      400,
    )
  }

  if (!candidate.userSelections.every((selection) => typeof selection === "string")) {
    throw new GenerationApiError(
      "Every user selection must be a module id string.",
      "invalid-request",
      400,
    )
  }
}

function trimCharacter(value: string, character: string): string {
  let start = 0
  let end = value.length

  while (value[start] === character) start += 1
  while (end > start && value[end - 1] === character) end -= 1

  return value.slice(start, end)
}

function slugifyProjectName(projectName?: string): string {
  const slug = trimCharacter(
    projectName
      ?.trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") ?? "",
    "-",
  )

  return slug.length > 0 ? slug : "ditto-template"
}

function resolvedWithGenerationMetadata(
  resolvedRecipe: ResolvedRecipe,
  request: TemplateGenerationRequest,
): ResolvedRecipe {
  return {
    ...resolvedRecipe,
    metadata: {
      ...resolvedRecipe.metadata,
      preset: request.presetId,
      presetId: request.presetId,
      packageVersionPolicy: PACKAGE_VERSION_POLICY.policy,
      generatedWithPackageVersionsAt: PACKAGE_VERSION_POLICY.generatedWithPackageVersionsAt,
    },
  }
}

function defaultTemplateRoot(): string {
  let currentDirectory = path.resolve(process.cwd())

  while (true) {
    const candidate = path.join(currentDirectory, "packages", "registry")

    if (existsSync(path.join(candidate, "react", "files", "index.html"))) {
      return candidate
    }

    const parentDirectory = path.dirname(currentDirectory)

    if (parentDirectory === currentDirectory) {
      return path.resolve(process.cwd(), "packages", "registry")
    }

    currentDirectory = parentDirectory
  }
}

function toGenerationError(error: unknown): GenerationApiError {
  if (error instanceof GenerationApiError) {
    return error
  }

  if (error instanceof GenerateProjectError) {
    return new GenerationApiError(error.message, "generation-file-error", 500)
  }

  if (error instanceof Error) {
    return new GenerationApiError(error.message, "unknown-generation-error", 500)
  }

  return new GenerationApiError("Unknown generation error.", "unknown-generation-error", 500)
}

export async function generateTemplateArchive(
  input: unknown,
  options: TemplateGenerationOptions = {},
): Promise<TemplateGenerationResponse> {
  assertRequest(input)

  const resolveInput: {
    catalog: typeof catalog
    userSelections: string[]
    presetId?: string
  } = {
    catalog,
    userSelections: input.userSelections,
  }

  if (input.presetId !== undefined) {
    resolveInput.presetId = input.presetId
  }

  const resolvedRecipe = resolveRecipe(resolveInput)
  const blockingConflicts = errorConflicts(resolvedRecipe.conflicts)

  if (blockingConflicts.length > 0) {
    throw new GenerationApiError(
      "Cannot generate while resolver conflicts exist.",
      "resolver-conflict",
      422,
      blockingConflicts,
    )
  }

  const createdAt = options.createdAt ?? new Date()
  const outputRoot = options.temporaryRoot ?? tmpdir()
  const outputDir = path.join(
    outputRoot,
    `ditto-${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )

  await mkdir(outputDir, { recursive: true })

  try {
    const recipeWithMetadata = resolvedWithGenerationMetadata(resolvedRecipe, input)
    const generation = await generateProject({
      resolvedRecipe: recipeWithMetadata,
      outputDir,
      templateRoot: options.templateRoot ?? defaultTemplateRoot(),
      projectName: input.projectName ?? "ditto-template",
      packageManager: input.packageManager ?? "pnpm",
      createdAt,
    })
    const archive = await createZipArchive(outputDir, new Date(createdAt))
    const projectSlug = slugifyProjectName(input.projectName)

    return {
      fileName: `${projectSlug}.zip`,
      mimeType: zipMimeType(),
      archiveBase64: archive.toString("base64"),
      archiveByteLength: archive.byteLength,
      resolvedRecipe: recipeWithMetadata,
      generation: {
        filesWritten: generation.filesWritten.map((filePath) => path.relative(outputDir, filePath)),
        filesGenerated: generation.filesWritten.length,
        warnings: generation.warnings,
      },
    }
  } catch (error: unknown) {
    throw toGenerationError(error)
  } finally {
    await rm(outputDir, { recursive: true, force: true })
  }
}
