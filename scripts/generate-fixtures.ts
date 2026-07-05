import { log } from "node:console"
import { mkdir, readdir, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { cwd } from "node:process"

import { catalog } from "../packages/catalog/src/catalog"
import { PACKAGE_VERSION_POLICY } from "../packages/catalog/src/package-versions"
import { resolveRecipe } from "../packages/core/src/resolver/resolve"
import { generateProject } from "../packages/generator/src/generate"

type FixtureRecipe = {
  id?: string
  name?: string
  presetId?: string
  selections: string[]
}

const rootDir = cwd()
const templateRoot = path.join(rootDir, "packages", "registry")

async function readRecipe(recipeName: string): Promise<FixtureRecipe> {
  const recipePath = path.join(rootDir, "fixtures", "recipes", `${recipeName}.json`)
  const recipe = JSON.parse(await readFile(recipePath, "utf8")) as Partial<FixtureRecipe>

  return {
    id: recipe.id,
    name: recipe.name,
    presetId: recipe.presetId,
    selections: Array.isArray(recipe.selections) ? recipe.selections : [],
  }
}

async function generateFixture(recipeName: string) {
  const recipe = await readRecipe(recipeName)
  const resolved = resolveRecipe({
    catalog,
    presetId: recipe.presetId,
    userSelections: recipe.selections,
  })
  const resolvedRecipe = {
    ...resolved,
    metadata: {
      ...resolved.metadata,
      recipeId: recipe.id,
      preset: recipe.presetId,
      presetId: recipe.presetId,
      packageVersionPolicy: PACKAGE_VERSION_POLICY.policy,
      generatedWithPackageVersionsAt: PACKAGE_VERSION_POLICY.generatedWithPackageVersionsAt,
    },
  }
  const outputDir = path.join(rootDir, "fixtures", "generated", recipeName)

  await clearOutputDir(outputDir)

  return generateProject({
    resolvedRecipe,
    outputDir,
    templateRoot,
    projectName: recipe.name,
    createdAt: "2026-07-05T00:00:00.000Z",
  })
}

async function clearOutputDir(outputDir: string): Promise<void> {
  await mkdir(outputDir, { recursive: true })

  const entries = await readdir(outputDir)

  await Promise.all(
    entries
      .filter((entry) => entry !== ".gitkeep")
      .map((entry) => rm(path.join(outputDir, entry), { recursive: true, force: true })),
  )
}

const result = await generateFixture("react-recommended")

log(
  `Generated ${path.relative(rootDir, result.outputDir)} with ${result.filesWritten.length} files.`,
)
