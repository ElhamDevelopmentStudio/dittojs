import type { ResolvedPackageSet } from "@dittosh/core"

import { GENERATED_NODE_ENGINE } from "./node-policy.js"
import type { GeneratedPackageJson } from "./types.js"

function sortPackageMap(packageMap: Record<string, string> | undefined): Record<string, string> {
  return Object.fromEntries(
    Object.entries(packageMap ?? {}).sort(([left], [right]) => left.localeCompare(right)),
  )
}

function trimCharacter(value: string, character: string): string {
  let start = 0
  let end = value.length

  while (value[start] === character) start += 1
  while (end > start && value[end - 1] === character) end -= 1

  return value.slice(start, end)
}

function toPackageName(projectName: string | undefined, outputDir: string): string {
  const rawName =
    projectName?.trim() ||
    outputDir
      .split(/[\\/]+/)
      .filter(Boolean)
      .at(-1) ||
    "ditto-generated-project"
  const packageName = trimCharacter(rawName.toLowerCase().replace(/[^a-z0-9._~-]+/g, "-"), "-")

  return packageName.length > 0 ? packageName : "ditto-generated-project"
}

export function createPackageJson(input: {
  packages: ResolvedPackageSet
  outputDir: string
  projectName?: string | undefined
}): GeneratedPackageJson {
  const dependencies = sortPackageMap(input.packages.dependencies)
  const devDependencies = sortPackageMap(input.packages.devDependencies)
  const peerDependencies = sortPackageMap(input.packages.peerDependencies)
  const packageJson: GeneratedPackageJson = {
    name: toPackageName(input.projectName, input.outputDir),
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc -b && vite build",
      preview: "vite preview",
      typecheck: "tsc --noEmit",
    },
    engines: {
      node: GENERATED_NODE_ENGINE,
    },
    dependencies,
    devDependencies,
  }

  if (Object.keys(peerDependencies).length > 0) {
    packageJson.peerDependencies = peerDependencies
  }

  return packageJson
}
