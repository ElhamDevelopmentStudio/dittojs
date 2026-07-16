import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { dirname, extname, relative, resolve } from "node:path"
import { execFileSync } from "node:child_process"

const root = resolve(import.meta.dirname, "..")

const requiredFiles = [
  ".github/CODEOWNERS",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/dependabot.yml",
  ".github/workflows/ci.yml",
  ".github/workflows/dependency-review.yml",
  ".github/workflows/release.yml",
  ".github/workflows/scorecard.yml",
  "CHANGELOG.md",
  "CITATION.cff",
  "CODE_OF_CONDUCT.md",
  "CONTRIBUTING.md",
  "GOVERNANCE.md",
  "LICENSE",
  "README.md",
  "ROADMAP.md",
  "SECURITY.md",
  "SUPPORT.md",
] as const

const failures: string[] = []

function trackedFiles(...patterns: string[]) {
  return execFileSync("git", ["ls-files", "--", ...patterns], {
    cwd: root,
    encoding: "utf8",
  })
    .trim()
    .split("\n")
    .filter(Boolean)
}

function repositoryFiles(directory = root): string[] {
  const ignoredDirectories = new Set([".git", ".turbo", "coverage", "dist", "node_modules"])

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) return []

    const absolutePath = resolve(directory, entry.name)
    if (entry.isDirectory()) return repositoryFiles(absolutePath)
    if (!entry.isFile()) return []

    return [relative(root, absolutePath)]
  })
}

for (const file of requiredFiles) {
  if (!existsSync(resolve(root, file))) failures.push(`Missing required repository file: ${file}`)
}

const files = repositoryFiles()
const markdownFiles = files.filter((file) => extname(file) === ".md")
const markdownLink = /(?<!!)\[[^\]]*\]\(([^)]+)\)/g

for (const file of markdownFiles) {
  const contents = readFileSync(resolve(root, file), "utf8")
  for (const match of contents.matchAll(markdownLink)) {
    const rawTarget = match[1]?.trim().replace(/^<|>$/g, "")
    if (!rawTarget || /^(?:https?:|mailto:|#)/.test(rawTarget)) continue

    const targetWithoutFragment = rawTarget.split("#", 1)[0]
    if (!targetWithoutFragment) continue

    const target = resolve(root, dirname(file), decodeURIComponent(targetWithoutFragment))
    if (!existsSync(target)) failures.push(`Broken local link in ${file}: ${rawTarget}`)
  }
}

const workflowFiles = files.filter(
  (file) => file.startsWith(".github/workflows/") && [".yml", ".yaml"].includes(extname(file)),
)
const actionReference = /^\s*uses:\s*([^\s#]+)(?:\s*#.*)?$/gm

for (const file of workflowFiles) {
  const contents = readFileSync(resolve(root, file), "utf8")
  for (const match of contents.matchAll(actionReference)) {
    const reference = match[1]
    if (!reference || reference.startsWith("./") || reference.startsWith("docker://")) continue

    const version = reference.split("@").at(-1)
    if (!version || !/^[a-f0-9]{40}$/.test(version)) {
      failures.push(`GitHub Action is not pinned to a full commit SHA in ${file}: ${reference}`)
    }
  }
}

const rootPackage = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")) as {
  license?: string
  packageManager?: string
  repository?: { url?: string }
}

if (rootPackage.license !== "MIT") failures.push("package.json must declare the MIT license")
if (rootPackage.packageManager !== "pnpm@10.33.4") {
  failures.push("package.json must pin the supported pnpm version")
}
if (rootPackage.repository?.url !== "git+https://github.com/ElhamDevelopmentStudio/dittojs.git") {
  failures.push("package.json must point to the canonical GitHub repository")
}

for (const file of trackedFiles("tmp/**", "*.log", "**/*.log", ".env", ".env.*", "**/.env.*")) {
  if (statSync(resolve(root, file)).isFile())
    failures.push(`Temporary or sensitive file is tracked: ${file}`)
}

if (failures.length > 0) {
  console.error(`Repository health check failed:\n- ${failures.join("\n- ")}`)
  process.exitCode = 1
} else {
  console.log(
    `Repository health check passed (${requiredFiles.length} required files, ${markdownFiles.length} Markdown files, ${workflowFiles.length} workflows).`,
  )
}
