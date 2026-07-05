import { copyFile, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { resolveSafeOutputPath, resolveSafeTemplatePath } from "./paths"
import { GenerateProjectError } from "./types"

export type ResolvedCopyFileMapping = {
  from: string
  to: string
}

function isNodeError(error: unknown): error is Error & { code?: string } {
  return error instanceof Error && "code" in error
}

export async function writeTextFile(input: {
  outputDir: string
  targetPath: string
  contents: string
}): Promise<string> {
  const target = resolveSafeOutputPath(input.outputDir, input.targetPath)

  await mkdir(path.dirname(target.absolutePath), { recursive: true })
  await writeFile(target.absolutePath, input.contents, "utf8")

  return target.relativePath
}

export async function writeJsonFile(input: {
  outputDir: string
  targetPath: string
  value: unknown
}): Promise<string> {
  return writeTextFile({
    outputDir: input.outputDir,
    targetPath: input.targetPath,
    contents: `${JSON.stringify(input.value, null, 2)}\n`,
  })
}

export async function copyTemplateFile(input: {
  templateRoot: string
  outputDir: string
  file: ResolvedCopyFileMapping
}): Promise<string> {
  const sourcePath = resolveSafeTemplatePath(input.templateRoot, input.file.from)
  const target = resolveSafeOutputPath(input.outputDir, input.file.to)

  await mkdir(path.dirname(target.absolutePath), { recursive: true })

  try {
    await copyFile(sourcePath, target.absolutePath)
  } catch (error) {
    if (isNodeError(error) && error.code === "ENOENT") {
      throw new GenerateProjectError(
        `Template file "${input.file.from}" does not exist under templateRoot "${input.templateRoot}".`,
      )
    }

    throw error
  }

  return target.relativePath
}
