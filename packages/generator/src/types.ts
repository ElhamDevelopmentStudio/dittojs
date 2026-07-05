import type { ResolvedPackageSet, ResolvedRecipe } from "@dittojs/core"

export type GeneratorWarning = {
  message: string
  reason?: string
}

export type GenerateProjectInput = {
  resolvedRecipe: ResolvedRecipe
  outputDir: string
  templateRoot?: string
  projectName?: string
  generatorName?: string
  generatorVersion?: string
  createdAt?: Date | string
  packageManager?: string
}

export type GenerateProjectResult = {
  outputDir: string
  filesWritten: string[]
  packageJsonPath: string
  metadataPath: string
  readmePath: string
  warnings: GeneratorWarning[]
}

export type GeneratedPackageJson = {
  name: string
  private: true
  type: "module"
  scripts: {
    dev: string
    build: string
    preview: string
    typecheck: string
  }
  dependencies: Record<string, string>
  devDependencies: Record<string, string>
  peerDependencies?: Record<string, string>
}

export type DittoGeneratedMetadata = {
  generator: string
  generatorPackage: string
  generatorVersion?: string
  createdAt: string
  preset?: string
  userSelections: string[]
  effectiveSelections: string[]
  packages: ResolvedPackageSet
}

export class GenerateProjectError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GenerateProjectError"
  }
}
