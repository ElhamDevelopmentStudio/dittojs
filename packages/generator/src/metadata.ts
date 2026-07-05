import type { CreateDittoMetadataInput, DittoGeneratedMetadata } from "./types"

export const generatorPackage = {
  name: "dittojs",
  packageName: "@dittojs/generator",
  version: "0.0.0",
} as const

function createdAtToIsoString(createdAt: Date | string | undefined): string {
  if (createdAt instanceof Date) {
    return createdAt.toISOString()
  }

  if (createdAt !== undefined) {
    return new Date(createdAt).toISOString()
  }

  return new Date().toISOString()
}

function readStringMetadataValue(
  metadata: Record<string, unknown>,
  key: string,
): string | undefined {
  const value = metadata[key]

  return typeof value === "string" && value.length > 0 ? value : undefined
}

export function createDittoMetadata(input: CreateDittoMetadataInput): DittoGeneratedMetadata {
  const { resolvedRecipe } = input
  const metadata: DittoGeneratedMetadata = {
    generator: input.generatorName ?? generatorPackage.name,
    generatorPackage: generatorPackage.packageName,
    generatorVersion: input.generatorVersion ?? generatorPackage.version,
    createdAt: createdAtToIsoString(input.createdAt),
    packageManager:
      input.packageManager ??
      readStringMetadataValue(resolvedRecipe.metadata, "packageManager") ??
      "pnpm",
    userSelections: [...resolvedRecipe.userSelections],
    effectiveSelections: [...resolvedRecipe.effectiveSelections],
    packages: resolvedRecipe.packages,
  }
  const preset =
    readStringMetadataValue(resolvedRecipe.metadata, "preset") ??
    readStringMetadataValue(resolvedRecipe.metadata, "presetId")
  const projectStructure =
    input.selectedProjectStructure ??
    readStringMetadataValue(resolvedRecipe.metadata, "projectStructure")
  const packageVersionPolicy = readStringMetadataValue(
    resolvedRecipe.metadata,
    "packageVersionPolicy",
  )
  const generatedWithPackageVersionsAt = readStringMetadataValue(
    resolvedRecipe.metadata,
    "generatedWithPackageVersionsAt",
  )

  if (preset !== undefined) {
    metadata.preset = preset
  }

  if (projectStructure !== undefined) {
    metadata.projectStructure = projectStructure
  }

  if (packageVersionPolicy !== undefined) {
    metadata.packageVersionPolicy = packageVersionPolicy
  }

  if (generatedWithPackageVersionsAt !== undefined) {
    metadata.generatedWithPackageVersionsAt = generatedWithPackageVersionsAt
  }

  return metadata
}
