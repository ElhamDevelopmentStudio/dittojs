import path from "node:path"

import { GenerateProjectError } from "./types"

export const PACKAGE_JSON_TARGET = "package.json"
export const METADATA_TARGET = "ditto.generated.json"
export const README_TARGET = "README.md"

const WINDOWS_ABSOLUTE_PATH_PATTERN = /^[A-Za-z]:[\\/]/

function isAbsolutePath(filePath: string): boolean {
  return (
    path.isAbsolute(filePath) ||
    WINDOWS_ABSOLUTE_PATH_PATTERN.test(filePath) ||
    filePath.startsWith("\\")
  )
}

export function resolveOutputDir(outputDir: string): string {
  if (outputDir.trim().length === 0) {
    throw new GenerateProjectError("outputDir is required.")
  }

  return path.resolve(outputDir)
}

export function normalizeSafeRelativePath(filePath: string, pathKind: string): string {
  if (filePath.trim().length === 0) {
    throw new GenerateProjectError(`${pathKind} path is required.`)
  }

  if (isAbsolutePath(filePath)) {
    throw new GenerateProjectError(
      `Unsafe ${pathKind} path "${filePath}": absolute paths are not allowed.`,
    )
  }

  const segments = filePath.split(/[\\/]+/)

  if (segments.some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new GenerateProjectError(
      `Unsafe ${pathKind} path "${filePath}": paths must not contain empty, ".", or ".." segments.`,
    )
  }

  return segments.join("/")
}

export function resolveSafeOutputPath(
  outputDir: string,
  targetPath: string,
): {
  absolutePath: string
  relativePath: string
} {
  const root = resolveOutputDir(outputDir)
  const relativePath = normalizeSafeRelativePath(targetPath, "output target")
  const absolutePath = path.resolve(root, ...relativePath.split("/"))
  const relativeFromRoot = path.relative(root, absolutePath)

  if (relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) {
    throw new GenerateProjectError(
      `Unsafe output target path "${targetPath}": resolved path escapes outputDir.`,
    )
  }

  return {
    absolutePath,
    relativePath,
  }
}

export function resolveSafeTemplatePath(templateRoot: string, sourcePath: string): string {
  const root = path.resolve(templateRoot)
  const relativePath = normalizeSafeRelativePath(sourcePath, "template source")
  const absolutePath = path.resolve(root, ...relativePath.split("/"))
  const relativeFromRoot = path.relative(root, absolutePath)

  if (relativeFromRoot.startsWith("..") || path.isAbsolute(relativeFromRoot)) {
    throw new GenerateProjectError(
      `Unsafe template source path "${sourcePath}": resolved path escapes templateRoot.`,
    )
  }

  return absolutePath
}
