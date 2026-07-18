import { log } from "node:console"
import { mkdir, readdir, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { argv, cwd } from "node:process"

import { catalog } from "../packages/catalog/src/catalog"
import { PACKAGE_VERSION_POLICY } from "../packages/catalog/src/package-versions"
import { resolveRecipe } from "../packages/core/src/resolver/resolve"
import type { ResolvedRecipe } from "../packages/core/src/resolver/types"
import { generateProject } from "../packages/generator/src/generate"

type FixtureRecipe = {
  id?: string
  name?: string
  presetId?: string
  selections: string[]
}

const rootDir = cwd()
const templateRoot = path.join(rootDir, "packages", "registry")
const defaultFixtureRecipes = [
  "react-recommended",
  "react-recommended-simple",
  "react-recommended-feature-based",
  "react-recommended-route-colocated",
  "saas-dashboard",
  "chat-app",
  "preview-catalog",
]

async function readRecipe(recipeName: string): Promise<FixtureRecipe> {
  const recipePath = path.join(rootDir, "fixtures", "recipes", `${recipeName}.json`)
  const recipe = JSON.parse(await readFile(recipePath, "utf8")) as Partial<FixtureRecipe>

  const fixtureRecipe: FixtureRecipe = {
    selections: Array.isArray(recipe.selections) ? recipe.selections : [],
  }

  if (recipe.id !== undefined) {
    fixtureRecipe.id = recipe.id
  }

  if (recipe.name !== undefined) {
    fixtureRecipe.name = recipe.name
  }

  if (recipe.presetId !== undefined) {
    fixtureRecipe.presetId = recipe.presetId
  }

  return fixtureRecipe
}

async function generateFixture(recipeName: string) {
  const recipe = await readRecipe(recipeName)
  const resolved = resolveRecipe({
    catalog,
    presetId: recipe.presetId,
    userSelections: recipe.selections,
  })

  assertResolvable(recipeName, resolved)

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

function assertResolvable(recipeName: string, resolved: ResolvedRecipe): void {
  const errorConflicts = resolved.conflicts.filter((conflict) => conflict.severity === "error")

  if (errorConflicts.length === 0) {
    return
  }

  const summary = errorConflicts
    .map((conflict) => `- ${conflict.message} ${conflict.reason}`)
    .join("\n")

  throw new Error(
    `Cannot generate fixture "${recipeName}" because resolver errors exist:\n${summary}`,
  )
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

const requestedRecipes = argv.slice(2)
const fixtureRecipes = requestedRecipes.length > 0 ? requestedRecipes : defaultFixtureRecipes
const generatedFixtures: string[] = []

for (const fixtureRecipe of fixtureRecipes) {
  const result = await generateFixture(fixtureRecipe)
  const relativeOutputDir = path.relative(rootDir, result.outputDir)

  generatedFixtures.push(relativeOutputDir)
  log(`Generated ${relativeOutputDir} with ${result.filesWritten.length} files.`)
}

log(`Generated ${generatedFixtures.length} fixture${generatedFixtures.length === 1 ? "" : "s"}:`)

for (const generatedFixture of generatedFixtures) {
  log(`- ${generatedFixture}`)
}
