import { isValidCapabilityName, isValidModuleId } from "./ids"
import { GROUP_MODES, MODULE_TYPES } from "./types"
import type {
  Conflict,
  FileMapping,
  GroupMode,
  ModuleManifest,
  ModuleType,
  Requirement,
} from "./types"

export type ManifestValidationIssue = {
  code: string
  message: string
  path: string
  moduleId?: string
}

export type ManifestValidationResult = {
  valid: boolean
  issues: ManifestValidationIssue[]
}

export type CatalogValidationResult = {
  valid: boolean
  issues: ManifestValidationIssue[]
}

type ValidationTarget = Requirement | Conflict

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function addIssue(
  issues: ManifestValidationIssue[],
  code: string,
  message: string,
  path: string,
  moduleId?: string,
): void {
  const issue: ManifestValidationIssue = {
    code,
    message,
    path,
  }

  if (moduleId !== undefined && moduleId.length > 0) {
    issue.moduleId = moduleId
  }

  issues.push(issue)
}

function isKnownModuleType(value: unknown): value is ModuleType {
  return typeof value === "string" && (MODULE_TYPES as readonly string[]).includes(value)
}

function isKnownGroupMode(value: unknown): value is GroupMode {
  return typeof value === "string" && (GROUP_MODES as readonly string[]).includes(value)
}

function isSafeRelativePath(filePath: string): boolean {
  if (!hasText(filePath)) {
    return false
  }

  if (filePath.startsWith("/") || /^[A-Za-z]:[\\/]/.test(filePath)) {
    return false
  }

  const segments = filePath.split(/[\\/]+/)

  return segments.every((segment) => segment.length > 0 && segment !== "." && segment !== "..")
}

function validateTargets(
  issues: ManifestValidationIssue[],
  targets: ValidationTarget[],
  targetKind: "requirement" | "conflict",
  pathPrefix: string,
  moduleId?: string,
): void {
  for (const [index, target] of targets.entries()) {
    const path = `${pathPrefix}.${index}`
    const capability = target.capability
    const moduleIdTarget = target.moduleId
    const hasCapability = hasText(capability)
    const hasModuleId = hasText(moduleIdTarget)

    if (!hasCapability && !hasModuleId) {
      addIssue(
        issues,
        `${targetKind}.target.missing`,
        `A ${targetKind} must include either capability or moduleId.`,
        path,
        moduleId,
      )
    }

    if (hasCapability && hasModuleId) {
      addIssue(
        issues,
        `${targetKind}.target.ambiguous`,
        `A ${targetKind} must not include both capability and moduleId.`,
        path,
        moduleId,
      )
    }

    if (hasCapability && !isValidCapabilityName(capability)) {
      addIssue(
        issues,
        `${targetKind}.capability.invalid`,
        `Invalid ${targetKind} capability "${capability}".`,
        `${path}.capability`,
        moduleId,
      )
    }

    if (hasModuleId && !isValidModuleId(moduleIdTarget)) {
      addIssue(
        issues,
        `${targetKind}.moduleId.invalid`,
        `Invalid ${targetKind} moduleId "${moduleIdTarget}".`,
        `${path}.moduleId`,
        moduleId,
      )
    }
  }
}

function validateProvidedCapabilities(
  issues: ManifestValidationIssue[],
  provides: string[],
  moduleId?: string,
): void {
  const seenCapabilities = new Set<string>()

  for (const [index, capability] of provides.entries()) {
    const path = `provides.${index}`

    if (!hasText(capability) || !isValidCapabilityName(capability)) {
      addIssue(
        issues,
        "provides.capability.invalid",
        "Provided capabilities must use valid dotted names.",
        path,
        moduleId,
      )
      continue
    }

    if (seenCapabilities.has(capability)) {
      addIssue(
        issues,
        "provides.capability.duplicate",
        `Duplicate provided capability "${capability}".`,
        path,
        moduleId,
      )
    }

    seenCapabilities.add(capability)
  }
}

function validateFiles(
  issues: ManifestValidationIssue[],
  files: FileMapping[],
  moduleId?: string,
): void {
  const seenTargets = new Set<string>()

  for (const [index, file] of files.entries()) {
    if (!hasText(file.from) || !isSafeRelativePath(file.from)) {
      addIssue(
        issues,
        "file.from.invalid",
        "File source paths must be relative and must not escape the project.",
        `files.${index}.from`,
        moduleId,
      )
    }

    if (!hasText(file.to) || !isSafeRelativePath(file.to)) {
      addIssue(
        issues,
        "file.to.invalid",
        "File target paths must be relative and must not escape the output project.",
        `files.${index}.to`,
        moduleId,
      )
      continue
    }

    if (seenTargets.has(file.to)) {
      addIssue(
        issues,
        "file.to.duplicate",
        `Duplicate file target path "${file.to}".`,
        `files.${index}.to`,
        moduleId,
      )
    }

    seenTargets.add(file.to)
  }
}

export function validateModuleManifest(manifest: ModuleManifest): ManifestValidationResult {
  const issues: ManifestValidationIssue[] = []
  const candidate = manifest as Partial<ModuleManifest>
  const moduleId = hasText(candidate.id) ? candidate.id : undefined

  if (!hasText(candidate.id)) {
    addIssue(issues, "manifest.id.missing", "Manifest id is required.", "id")
  } else if (!isValidModuleId(candidate.id)) {
    addIssue(issues, "manifest.id.invalid", `Invalid manifest id "${candidate.id}".`, "id")
  }

  if (!hasText(candidate.type)) {
    addIssue(issues, "manifest.type.missing", "Manifest type is required.", "type", moduleId)
  } else if (!isKnownModuleType(candidate.type)) {
    addIssue(issues, "manifest.type.invalid", "Manifest type is invalid.", "type", moduleId)
  }

  if (!hasText(candidate.label)) {
    addIssue(issues, "manifest.label.missing", "Manifest label is required.", "label", moduleId)
  }

  if (Array.isArray(candidate.provides)) {
    validateProvidedCapabilities(issues, candidate.provides, moduleId)
  }

  if (Array.isArray(candidate.requires)) {
    validateTargets(issues, candidate.requires, "requirement", "requires", moduleId)
  }

  if (Array.isArray(candidate.conflicts)) {
    validateTargets(issues, candidate.conflicts, "conflict", "conflicts", moduleId)
  }

  if (candidate.group !== undefined) {
    const group = candidate.group

    if (!isKnownGroupMode(group.mode)) {
      addIssue(
        issues,
        "group.mode.invalid",
        "Provider group mode must be exactly-one, at-most-one, or at-least-one.",
        "group.mode",
        moduleId,
      )
    }
  }

  if (Array.isArray(candidate.files)) {
    validateFiles(issues, candidate.files, moduleId)
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}

export function validateCatalog(catalog: ModuleManifest[]): CatalogValidationResult {
  const issues: ManifestValidationIssue[] = []
  const moduleIds = new Set<string>()
  const duplicateModuleIds = new Set<string>()

  for (const manifest of catalog) {
    const manifestResult = validateModuleManifest(manifest)
    issues.push(...manifestResult.issues)

    if (!isValidModuleId(manifest.id)) {
      continue
    }

    if (moduleIds.has(manifest.id) && !duplicateModuleIds.has(manifest.id)) {
      duplicateModuleIds.add(manifest.id)
      addIssue(
        issues,
        "catalog.moduleId.duplicate",
        `Duplicate module id "${manifest.id}".`,
        "catalog",
        manifest.id,
      )
    }

    moduleIds.add(manifest.id)
  }

  for (const manifest of catalog) {
    if (!Array.isArray(manifest.requires)) {
      continue
    }

    for (const [index, requirement] of manifest.requires.entries()) {
      if (!hasText(requirement.moduleId) || !isValidModuleId(requirement.moduleId)) {
        continue
      }

      if (!moduleIds.has(requirement.moduleId)) {
        addIssue(
          issues,
          "catalog.requirement.moduleId.missing",
          `Requirement references missing module "${requirement.moduleId}".`,
          `catalog.${manifest.id}.requires.${index}.moduleId`,
          manifest.id,
        )
      }
    }
  }

  return {
    valid: issues.length === 0,
    issues,
  }
}
