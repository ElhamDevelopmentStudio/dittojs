import { readdir, readFile } from "node:fs/promises"
import path from "node:path"
import process, { cwd, argv } from "node:process"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"

type PackageJson = {
  name?: unknown
  private?: unknown
  scripts?: unknown
  engines?: unknown
  dependencies?: unknown
  devDependencies?: unknown
  peerDependencies?: unknown
}

export type GeneratedTemplate = {
  name: string
  directory: string
  hasPackageJson: boolean
}

export type PackageValidationResult = {
  valid: boolean
  issues: string[]
}

const invalidVersionValues = new Set(["latest", "*", ""])
const requiredNodeEngine = "^20.19.0 || >=22.12.0"

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function validateDependencyVersions(
  issues: string[],
  bucketName: "dependencies" | "devDependencies" | "peerDependencies",
  bucket: unknown,
): Set<string> {
  const names = new Set<string>()

  if (bucket === undefined) {
    return names
  }

  if (!isObject(bucket)) {
    issues.push(`${bucketName} must be an object when present.`)
    return names
  }

  for (const [packageName, version] of Object.entries(bucket)) {
    names.add(packageName)

    if (!hasText(version) || invalidVersionValues.has(version)) {
      issues.push(`${bucketName}.${packageName} must use a concrete non-latest version range.`)
      continue
    }

    if (!version.startsWith("^")) {
      issues.push(`${bucketName}.${packageName} must use a caret version range.`)
    }
  }

  return names
}

export function validateGeneratedPackageJson(packageJson: unknown): PackageValidationResult {
  const issues: string[] = []

  if (!isObject(packageJson)) {
    return {
      valid: false,
      issues: ["package.json must contain a JSON object."],
    }
  }

  const candidate = packageJson as PackageJson

  if (!hasText(candidate.name)) {
    issues.push("package.json must include a non-empty name.")
  }

  if (candidate.private !== true) {
    issues.push("package.json must set private to true.")
  }

  if (!isObject(candidate.scripts)) {
    issues.push("package.json must include scripts.")
  } else {
    if (!hasText(candidate.scripts.typecheck)) {
      issues.push("scripts.typecheck must exist.")
    }

    if (!hasText(candidate.scripts.build)) {
      issues.push("scripts.build must exist.")
    }
  }

  if (!isObject(candidate.engines)) {
    issues.push("package.json must include engines.")
  } else if (candidate.engines.node !== requiredNodeEngine) {
    issues.push(`engines.node must be ${requiredNodeEngine}.`)
  }

  const dependencyNames = validateDependencyVersions(issues, "dependencies", candidate.dependencies)
  const devDependencyNames = validateDependencyVersions(
    issues,
    "devDependencies",
    candidate.devDependencies,
  )
  const peerDependencyNames = validateDependencyVersions(
    issues,
    "peerDependencies",
    candidate.peerDependencies,
  )

  for (const packageName of dependencyNames) {
    if (devDependencyNames.has(packageName)) {
      issues.push(`${packageName} must not appear in both dependencies and devDependencies.`)
    }

    if (peerDependencyNames.has(packageName)) {
      issues.push(`${packageName} must not appear in both dependencies and peerDependencies.`)
    }
  }

  for (const packageName of devDependencyNames) {
    if (peerDependencyNames.has(packageName)) {
      issues.push(`${packageName} must not appear in both devDependencies and peerDependencies.`)
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

export async function discoverGeneratedTemplates(
  generatedRoot: string,
): Promise<GeneratedTemplate[]> {
  const entries = await readdir(generatedRoot, { withFileTypes: true })
  const templates: GeneratedTemplate[] = []

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const directory = path.join(generatedRoot, entry.name)
    const childEntries = await readdir(directory)
    const meaningfulEntries = childEntries.filter((childEntry) => childEntry !== ".gitkeep")

    if (meaningfulEntries.length === 0) {
      continue
    }

    templates.push({
      name: entry.name,
      directory,
      hasPackageJson: childEntries.includes("package.json"),
    })
  }

  return templates.sort((left, right) => left.name.localeCompare(right.name))
}

async function readGeneratedPackageJson(template: GeneratedTemplate): Promise<unknown> {
  const packageJsonPath = path.join(template.directory, "package.json")

  return JSON.parse(await readFile(packageJsonPath, "utf8")) as unknown
}

async function runPnpm(template: GeneratedTemplate, args: string[]): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn("pnpm", args, {
      cwd: template.directory,
      stdio: "inherit",
    })

    child.on("error", reject)
    child.on("close", (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(`pnpm ${args.join(" ")} failed for ${template.name} with exit code ${code}.`),
      )
    })
  })
}

async function validateTemplate(template: GeneratedTemplate): Promise<void> {
  if (!template.hasPackageJson) {
    throw new Error(`${template.name} has generated files but no package.json.`)
  }

  const packageJson = await readGeneratedPackageJson(template)
  const packageValidation = validateGeneratedPackageJson(packageJson)

  if (!packageValidation.valid) {
    throw new Error(
      `${template.name} package.json is invalid:\n${packageValidation.issues
        .map((issue) => `- ${issue}`)
        .join("\n")}`,
    )
  }

  await runPnpm(template, ["--dir", template.directory, "install", "--ignore-workspace"])
  await runPnpm(template, ["--dir", template.directory, "--ignore-workspace", "typecheck"])
  await runPnpm(template, ["--dir", template.directory, "--ignore-workspace", "build"])
}

export async function testGeneratedTemplates(generatedRoot: string): Promise<GeneratedTemplate[]> {
  const templates = await discoverGeneratedTemplates(generatedRoot)

  if (templates.length === 0) {
    throw new Error(
      `No generated templates found under ${generatedRoot}. Run pnpm generate:fixtures.`,
    )
  }

  for (const template of templates) {
    console.log(`\nValidating generated template: ${template.name}`)
    await validateTemplate(template)
  }

  console.log(
    `\nValidated ${templates.length} generated template${templates.length === 1 ? "" : "s"}: ${templates
      .map((template) => template.name)
      .join(", ")}`,
  )

  return templates
}

async function main(): Promise<void> {
  const generatedRoot = path.join(cwd(), "fixtures", "generated")

  await testGeneratedTemplates(generatedRoot)
}

const scriptPath = fileURLToPath(import.meta.url)
const invokedPath = argv[1] === undefined ? undefined : path.resolve(argv[1])

if (invokedPath === scriptPath) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
