#!/usr/bin/env node

import { spawn } from "node:child_process"
import { constants, realpathSync } from "node:fs"
import { access, mkdir, readdir, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"
import { createInterface } from "node:readline/promises"
import { fileURLToPath } from "node:url"

const DEFAULT_API_URL = "https://dittojs.com"
const MAX_ARCHIVE_BYTES = 50 * 1024 * 1024
const LOCAL_FILE_SIGNATURE = 0x04034b50
const CENTRAL_DIRECTORY_SIGNATURE = 0x02014b50
const END_DIRECTORY_SIGNATURE = 0x06054b50

export function parseArguments(argv) {
  const options = {
    apiUrl: process.env.DITTO_API_URL || DEFAULT_API_URL,
    install: undefined,
    packageManager: "pnpm",
    projectName: undefined,
    templateId: undefined,
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]

    if (argument === "--help" || argument === "-h") options.help = true
    else if (argument === "--install") options.install = true
    else if (argument === "--no-install") options.install = false
    else if (argument === "--template-id") options.templateId = argv[++index]
    else if (argument === "--api-url") options.apiUrl = argv[++index]
    else if (argument === "--package-manager") options.packageManager = argv[++index]
    else if (argument?.startsWith("-")) throw new Error(`Unknown option: ${argument}`)
    else if (options.projectName === undefined) options.projectName = argument
    else throw new Error(`Unexpected argument: ${argument}`)
  }

  return options
}

function usage() {
  return `create-ditto

Usage:
  npx create-ditto [project-name] --template-id TEMPLATE_ID [options]

Options:
  --template-id ID          Saved Ditto template ID (required)
  --api-url URL             Ditto API URL (default: ${DEFAULT_API_URL})
  --package-manager NAME    pnpm, npm, or yarn (default: pnpm)
  --install                 Install dependencies without prompting
  --no-install              Skip dependency installation
  -h, --help                Show this help
`
}

export function normalizeProjectName(value) {
  const name = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._~-]+/g, "-")
    .replace(/^-+|-+$/g, "")

  if (
    name.length === 0 ||
    !/[a-z0-9]/.test(name) ||
    name === "." ||
    name === ".." ||
    name.length > 80
  ) {
    throw new Error("Project name must contain 1-80 safe package-name characters.")
  }

  return name
}

function safeEntryPath(outputDirectory, entryName) {
  const normalized = entryName.replaceAll("\\", "/")

  if (normalized.startsWith("/") || normalized.includes("\0")) {
    throw new Error(`Archive contains an unsafe path: ${entryName}`)
  }

  const segments = normalized.split("/")

  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`Archive contains an unsafe path: ${entryName}`)
  }

  const target = path.resolve(outputDirectory, ...segments)
  const root = `${path.resolve(outputDirectory)}${path.sep}`

  if (!target.startsWith(root)) {
    throw new Error(`Archive path escapes the project directory: ${entryName}`)
  }

  return target
}

export async function extractStoredZip(archive, outputDirectory) {
  let offset = 0
  let filesWritten = 0

  while (offset + 4 <= archive.length) {
    const signature = archive.readUInt32LE(offset)

    if (signature === CENTRAL_DIRECTORY_SIGNATURE || signature === END_DIRECTORY_SIGNATURE) break
    if (signature !== LOCAL_FILE_SIGNATURE || offset + 30 > archive.length) {
      throw new Error("The server returned an invalid ZIP archive.")
    }

    const method = archive.readUInt16LE(offset + 8)
    const compressedSize = archive.readUInt32LE(offset + 18)
    const uncompressedSize = archive.readUInt32LE(offset + 22)
    const fileNameLength = archive.readUInt16LE(offset + 26)
    const extraLength = archive.readUInt16LE(offset + 28)
    const dataOffset = offset + 30 + fileNameLength + extraLength
    const dataEnd = dataOffset + compressedSize

    if (method !== 0 || compressedSize !== uncompressedSize || dataEnd > archive.length) {
      throw new Error("The server returned an unsupported ZIP archive.")
    }

    const entryName = archive.subarray(offset + 30, offset + 30 + fileNameLength).toString("utf8")
    const target = safeEntryPath(outputDirectory, entryName)

    await mkdir(path.dirname(target), { recursive: true })
    await writeFile(target, archive.subarray(dataOffset, dataEnd), { flag: "wx" })
    filesWritten += 1
    offset = dataEnd
  }

  if (filesWritten === 0) throw new Error("The generated archive contained no project files.")
  return filesWritten
}

async function assertDestinationAvailable(directory) {
  try {
    await access(directory, constants.F_OK)
    const entries = await readdir(directory)

    if (entries.length > 0)
      throw new Error(`Destination already exists and is not empty: ${directory}`)
  } catch (error) {
    if (error?.code !== "ENOENT") throw error
  }
}

async function requestArchive({ apiUrl, packageManager, projectName, templateId }) {
  const response = await fetch(
    `${apiUrl.replace(/\/+$/, "")}/api/templates/${encodeURIComponent(templateId)}/generate`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ projectName, packageManager }),
    },
  )

  const body = await response.json().catch(() => undefined)

  if (!response.ok) {
    throw new Error(
      typeof body?.error === "string" ? body.error : `Ditto API failed (${response.status}).`,
    )
  }

  if (typeof body?.archiveBase64 !== "string") throw new Error("Ditto API returned no archive.")

  const archive = Buffer.from(body.archiveBase64, "base64")

  if (archive.length === 0 || archive.length > MAX_ARCHIVE_BYTES) {
    throw new Error("Generated archive size is invalid.")
  }

  return archive
}

async function installDependencies(directory, packageManager) {
  await new Promise((resolve, reject) => {
    const child = spawn(packageManager, ["install"], {
      cwd: directory,
      stdio: "inherit",
      shell: false,
    })

    child.on("error", reject)
    child.on("close", (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`${packageManager} install failed with exit code ${code}.`)),
    )
  })
}

async function promptForMissing(options) {
  if (options.projectName !== undefined && options.install !== undefined) return options

  if (!process.stdin.isTTY) {
    if (options.projectName === undefined)
      throw new Error("Project name is required in non-interactive mode.")
    return { ...options, install: options.install ?? false }
  }

  const prompt = createInterface({ input: process.stdin, output: process.stdout })

  try {
    const projectName = options.projectName ?? (await prompt.question("Project name: "))
    const installAnswer =
      options.install === undefined
        ? await prompt.question("Install dependencies? (Y/n): ")
        : undefined

    return {
      ...options,
      projectName,
      install: options.install ?? !installAnswer?.trim().toLowerCase().startsWith("n"),
    }
  } finally {
    prompt.close()
  }
}

export async function run(argv = process.argv.slice(2)) {
  const parsed = parseArguments(argv)

  if (parsed.help) {
    console.log(usage())
    return
  }

  if (typeof parsed.templateId !== "string" || !/^tpl_[A-Za-z0-9_-]{22}$/.test(parsed.templateId)) {
    throw new Error("A valid --template-id is required.")
  }

  if (!["pnpm", "npm", "yarn"].includes(parsed.packageManager)) {
    throw new Error("--package-manager must be pnpm, npm, or yarn.")
  }

  const options = await promptForMissing(parsed)
  const projectName = normalizeProjectName(options.projectName)
  const outputDirectory = path.resolve(process.cwd(), projectName)

  await assertDestinationAvailable(outputDirectory)
  console.log(`Creating ${projectName} from ${options.templateId}…`)

  const archive = await requestArchive({ ...options, projectName })

  await mkdir(outputDirectory, { recursive: true })

  try {
    const filesWritten = await extractStoredZip(archive, outputDirectory)

    if (options.install) await installDependencies(outputDirectory, options.packageManager)
    console.log(`Created ${projectName} (${filesWritten} files).`)
    console.log(`Next: cd ${projectName}`)
  } catch (error) {
    const entries = await readdir(outputDirectory).catch(() => [])
    if (entries.length === 0)
      await import("node:fs/promises").then(({ rmdir }) => rmdir(outputDirectory))
    throw error
  }
}

const invokedAsCli =
  process.argv[1] !== undefined && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)

if (invokedAsCli) {
  run().catch((error) => {
    console.error(`create-ditto: ${error instanceof Error ? error.message : String(error)}`)
    process.exitCode = 1
  })
}
