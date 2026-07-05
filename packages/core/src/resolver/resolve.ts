import type {
  FileMapping,
  GroupMode,
  ModuleManifest,
  PackageSet,
  Requirement,
} from "../schema/index"
import type {
  AppliedDefault,
  LockReason,
  ResolveConflict,
  ResolvedPackageSet,
  ResolvedRecipe,
  ResolveInput,
  ResolveWarning,
  SelectionReason,
} from "./types"

type PackageBucket = "dependencies" | "devDependencies" | "peerDependencies"

type GroupState = {
  id: string
  mode: GroupMode
  label?: string
  moduleIds: string[]
}

type FileOwner = {
  moduleId: string
  file: FileMapping
}

type ResolvablePresetManifest = ModuleManifest & {
  type: "preset"
  selections: string[]
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function uniqueSorted(values: string[]): string[] {
  return [...new Set(values)].sort()
}

function isResolvablePresetManifest(
  manifest: ModuleManifest,
): manifest is ResolvablePresetManifest {
  return (
    manifest.type === "preset" &&
    "selections" in manifest &&
    Array.isArray(manifest.selections) &&
    manifest.selections.every((selection) => typeof selection === "string")
  )
}

function directFileTarget(file: FileMapping): string | undefined {
  const target = (file as { to?: unknown }).to

  return typeof target === "string" && target.length > 0 ? target : undefined
}

function reasonKey(reason: SelectionReason): string {
  switch (reason.type) {
    case "user":
      return "user"
    case "preset":
      return `preset:${reason.presetId}`
    case "requirement":
      return `requirement:${reason.requiredBy}:${reason.reason}`
    case "default":
      return `default:${reason.defaultedBy}:${reason.reason}`
  }
}

function lockKey(lock: LockReason): string {
  return `${lock.requiredBy}:${lock.reason}`
}

export function resolveRecipe(input: ResolveInput): ResolvedRecipe {
  const catalogById = new Map<string, ModuleManifest>()
  const providersByCapability = new Map<string, ModuleManifest[]>()

  const effectiveSelections: string[] = []
  const selectedIds = new Set<string>()
  const selectionReasons: Record<string, SelectionReason[]> = {}
  const locks: Record<string, LockReason[]> = {}
  const conflicts: ResolveConflict[] = []
  const conflictKeys = new Set<string>()
  const warnings: ResolveWarning[] = []
  const defaultsApplied: AppliedDefault[] = []
  const appliedDefaultKeys = new Set<string>()
  const resolvingIds = new Set<string>()
  const resolvedIds = new Set<string>()
  const explicitUserSelections = new Set(input.userSelections)

  function addConflict(conflict: ResolveConflict): void {
    const key = [
      conflict.severity,
      uniqueSorted(conflict.moduleIds).join(","),
      conflict.message,
      conflict.reason,
    ].join("|")

    if (conflictKeys.has(key)) {
      return
    }

    conflictKeys.add(key)
    conflicts.push({
      ...conflict,
      moduleIds: uniqueSorted(conflict.moduleIds),
    })
  }

  for (const manifest of input.catalog) {
    if (catalogById.has(manifest.id)) {
      addConflict({
        moduleIds: [manifest.id],
        message: `Duplicate module id "${manifest.id}".`,
        reason: "Every catalog module id must be unique.",
        severity: "error",
      })
      continue
    }

    catalogById.set(manifest.id, manifest)

    for (const capability of manifest.provides ?? []) {
      const providers = providersByCapability.get(capability) ?? []
      providers.push(manifest)
      providersByCapability.set(capability, providers)
    }
  }

  function addSelectionReason(moduleId: string, reason: SelectionReason): void {
    const reasons = selectionReasons[moduleId] ?? []
    const nextReasonKey = reasonKey(reason)

    if (!reasons.some((existingReason) => reasonKey(existingReason) === nextReasonKey)) {
      reasons.push(reason)
    }

    selectionReasons[moduleId] = reasons
  }

  function addLock(moduleId: string, lock: LockReason): void {
    const lockReasons = locks[moduleId] ?? []
    const nextLockKey = lockKey(lock)

    if (!lockReasons.some((existingLock) => lockKey(existingLock) === nextLockKey)) {
      lockReasons.push(lock)
    }

    locks[moduleId] = lockReasons
  }

  function addSelection(moduleId: string, reason: SelectionReason): ModuleManifest | undefined {
    const manifest = catalogById.get(moduleId)

    if (manifest === undefined) {
      addConflict({
        moduleIds: [moduleId],
        message: `Unknown module "${moduleId}".`,
        reason: "The requested module does not exist in the catalog.",
        severity: "error",
      })
      return undefined
    }

    if (!selectedIds.has(moduleId)) {
      selectedIds.add(moduleId)
      effectiveSelections.push(moduleId)
    }

    addSelectionReason(moduleId, reason)
    return manifest
  }

  function addCircularDependencyConflict(stack: string[], moduleId: string): void {
    const cycleStartIndex = stack.indexOf(moduleId)
    const cycle =
      cycleStartIndex >= 0 ? [...stack.slice(cycleStartIndex), moduleId] : [...stack, moduleId]

    addConflict({
      moduleIds: cycle,
      message: `Circular dependency detected: ${cycle.join(" -> ")}.`,
      reason: "Circular requirements cannot be resolved safely.",
      severity: "error",
    })
  }

  function selectedModuleInGroup(groupId: string, exceptModuleId?: string): string | undefined {
    for (const selectedId of selectedIds) {
      if (selectedId === exceptModuleId) {
        continue
      }

      const selectedManifest = catalogById.get(selectedId)

      if (selectedManifest?.group?.id === groupId) {
        return selectedId
      }
    }

    return undefined
  }

  function explicitUserSelectionInGroup(
    groupId: string,
    exceptModuleId?: string,
  ): string | undefined {
    for (const selectedId of explicitUserSelections) {
      if (selectedId === exceptModuleId) {
        continue
      }

      const selectedManifest = catalogById.get(selectedId)

      if (selectedManifest?.group?.id === groupId) {
        return selectedId
      }
    }

    return undefined
  }

  function selectProviderForCapability(
    capability: string,
    requiredBy: string,
  ): ModuleManifest | undefined {
    const providers = providersByCapability.get(capability) ?? []

    if (providers.length === 0) {
      addConflict({
        moduleIds: [requiredBy],
        message: `No provider found for capability "${capability}".`,
        reason: `${requiredBy} requires ${capability}, but no catalog module provides it.`,
        severity: "error",
      })
      return undefined
    }

    if (providers.length === 1) {
      return providers[0]
    }

    const selectedProviders = providers.filter((provider) => selectedIds.has(provider.id))

    if (selectedProviders.length > 0) {
      return selectedProviders[0]
    }

    const recommendedProviders = providers.filter((provider) => provider.ui?.recommended === true)

    if (recommendedProviders.length === 1) {
      return recommendedProviders[0]
    }

    addConflict({
      moduleIds: [requiredBy, ...providers.map((provider) => provider.id)],
      message: `Ambiguous providers for capability "${capability}".`,
      reason: `Multiple modules provide ${capability}; choose one explicitly.`,
      severity: "error",
    })
    return undefined
  }

  function includeModule(
    moduleId: string,
    reason: SelectionReason,
    stack: string[],
    lockReason?: LockReason,
  ): void {
    const manifest = addSelection(moduleId, reason)

    if (manifest === undefined) {
      return
    }

    if (lockReason !== undefined) {
      addLock(moduleId, lockReason)
    }

    resolveModule(manifest.id, stack)
  }

  function applyDefaults(manifest: ModuleManifest, stack: string[]): void {
    for (const [defaultKey, defaultModuleId] of Object.entries(manifest.defaults ?? {})) {
      const defaultManifest = catalogById.get(defaultModuleId)

      if (defaultManifest === undefined) {
        addConflict({
          moduleIds: [manifest.id, defaultModuleId],
          message: `Default module "${defaultModuleId}" does not exist.`,
          reason: `${manifest.id} defaults ${defaultKey} to ${defaultModuleId}.`,
          severity: "error",
        })
        continue
      }

      const defaultGroupId = defaultManifest.group?.id ?? defaultKey
      const explicitOverride = explicitUserSelectionInGroup(defaultGroupId, defaultModuleId)

      if (explicitOverride !== undefined) {
        continue
      }

      const existingSelection = selectedModuleInGroup(defaultGroupId, defaultModuleId)

      if (existingSelection !== undefined || selectedIds.has(defaultModuleId)) {
        continue
      }

      const defaultReason = `${manifest.id} defaults ${defaultKey} to ${defaultModuleId}.`
      const appliedDefaultKey = `${manifest.id}:${defaultKey}:${defaultModuleId}`

      if (!appliedDefaultKeys.has(appliedDefaultKey)) {
        defaultsApplied.push({
          key: defaultKey,
          value: defaultModuleId,
          defaultedBy: manifest.id,
          reason: defaultReason,
        })
        appliedDefaultKeys.add(appliedDefaultKey)
      }

      includeModule(
        defaultModuleId,
        {
          type: "default",
          defaultedBy: manifest.id,
          reason: defaultReason,
        },
        stack,
      )
    }
  }

  function expandPreset(manifest: ModuleManifest, stack: string[]): void {
    if (!isResolvablePresetManifest(manifest)) {
      return
    }

    for (const selection of manifest.selections) {
      includeModule(
        selection,
        {
          type: "preset",
          presetId: manifest.id,
        },
        stack,
      )
    }
  }

  function resolveRequirement(
    manifest: ModuleManifest,
    requirement: Requirement,
    stack: string[],
  ): void {
    const strength = requirement.strength ?? "hard"

    if (strength === "soft") {
      warnings.push({
        moduleId: manifest.id,
        message: `Soft requirement from ${manifest.id} was not auto-selected.`,
        reason: requirement.reason,
      })
      return
    }

    if (hasText(requirement.moduleId) && hasText(requirement.capability)) {
      addConflict({
        moduleIds: [manifest.id, requirement.moduleId],
        message: `Requirement on "${manifest.id}" has both moduleId and capability.`,
        reason: "A requirement must target exactly one module or capability.",
        severity: "error",
      })
      return
    }

    if (hasText(requirement.moduleId)) {
      includeModule(
        requirement.moduleId,
        {
          type: "requirement",
          requiredBy: manifest.id,
          reason: requirement.reason,
        },
        stack,
        {
          requiredBy: manifest.id,
          reason: requirement.reason,
        },
      )
      return
    }

    if (hasText(requirement.capability)) {
      const provider = selectProviderForCapability(requirement.capability, manifest.id)

      if (provider === undefined) {
        return
      }

      includeModule(
        provider.id,
        {
          type: "requirement",
          requiredBy: manifest.id,
          reason: requirement.reason,
        },
        stack,
        {
          requiredBy: manifest.id,
          reason: requirement.reason,
        },
      )
      return
    }

    addConflict({
      moduleIds: [manifest.id],
      message: `Requirement on "${manifest.id}" has no target.`,
      reason: "A requirement must target either a moduleId or a capability.",
      severity: "error",
    })
  }

  function resolveModule(moduleId: string, stack: string[]): void {
    const manifest = catalogById.get(moduleId)

    if (manifest === undefined) {
      return
    }

    if (resolvingIds.has(moduleId)) {
      addCircularDependencyConflict(stack, moduleId)
      return
    }

    if (resolvedIds.has(moduleId)) {
      return
    }

    resolvingIds.add(moduleId)
    const nextStack = [...stack, moduleId]

    applyDefaults(manifest, nextStack)
    expandPreset(manifest, nextStack)

    for (const requirement of manifest.requires ?? []) {
      resolveRequirement(manifest, requirement, nextStack)
    }

    resolvingIds.delete(moduleId)
    resolvedIds.add(moduleId)
  }

  function detectManifestConflicts(): void {
    for (const moduleId of effectiveSelections) {
      const manifest = catalogById.get(moduleId)

      if (manifest === undefined) {
        continue
      }

      for (const conflict of manifest.conflicts ?? []) {
        if (hasText(conflict.moduleId)) {
          if (conflict.moduleId !== moduleId && selectedIds.has(conflict.moduleId)) {
            addConflict({
              moduleIds: [moduleId, conflict.moduleId],
              message: `Modules "${moduleId}" and "${conflict.moduleId}" conflict.`,
              reason: conflict.reason,
              severity: "error",
            })
          }

          continue
        }

        if (!hasText(conflict.capability)) {
          continue
        }

        const selectedProviders = (providersByCapability.get(conflict.capability) ?? []).filter(
          (provider) => provider.id !== moduleId && selectedIds.has(provider.id),
        )

        for (const provider of selectedProviders) {
          addConflict({
            moduleIds: [moduleId, provider.id],
            message: `Modules "${moduleId}" and "${provider.id}" conflict.`,
            reason: conflict.reason,
            severity: "error",
          })
        }
      }
    }
  }

  function detectGroupConflicts(): void {
    const groups = new Map<string, GroupState>()

    for (const manifest of input.catalog) {
      if (manifest.group === undefined) {
        continue
      }

      const existingGroup = groups.get(manifest.group.id)

      if (existingGroup === undefined) {
        const group: GroupState = {
          id: manifest.group.id,
          mode: manifest.group.mode,
          moduleIds: [],
        }

        if (manifest.group.label !== undefined) {
          group.label = manifest.group.label
        }

        groups.set(manifest.group.id, group)
      }
    }

    for (const moduleId of effectiveSelections) {
      const manifest = catalogById.get(moduleId)
      const group = manifest?.group

      if (group === undefined) {
        continue
      }

      const groupState = groups.get(group.id)

      if (groupState === undefined) {
        continue
      }

      groupState.moduleIds.push(moduleId)
    }

    for (const group of groups.values()) {
      if (
        (group.mode === "exactly-one" || group.mode === "at-most-one") &&
        group.moduleIds.length > 1
      ) {
        addConflict({
          moduleIds: group.moduleIds,
          message: `Group "${group.id}" allows ${group.mode} module.`,
          reason: `Selected modules in ${group.id}: ${group.moduleIds.join(", ")}.`,
          severity: "error",
        })
      }

      // Empty at-least-one groups are not enforced globally. They become actionable when a
      // selected module or preset requires the group through a capability or direct selection.
    }
  }

  function mergePackageBucket(
    packages: ResolvedPackageSet,
    bucketName: PackageBucket,
    moduleId: string,
    packageSet?: PackageSet,
  ): void {
    const bucket = packageSet?.[bucketName]

    if (bucket === undefined) {
      return
    }

    const targetBucket = packages[bucketName]

    if (targetBucket === undefined) {
      return
    }

    for (const [packageName, version] of Object.entries(bucket)) {
      const existingVersion = targetBucket[packageName]

      if (existingVersion !== undefined && existingVersion !== version) {
        warnings.push({
          moduleId,
          message: `Package "${packageName}" requested with multiple versions.`,
          reason: `${existingVersion} was already selected; ${moduleId} requested ${version}.`,
        })
        continue
      }

      targetBucket[packageName] = version
    }
  }

  function collectPackagesAndFiles(): {
    packages: ResolvedPackageSet
    files: FileMapping[]
  } {
    const packages: ResolvedPackageSet = {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    }
    const files: FileMapping[] = []
    const fileOwners = new Map<string, FileOwner>()

    for (const moduleId of effectiveSelections) {
      const manifest = catalogById.get(moduleId)

      if (manifest === undefined) {
        continue
      }

      mergePackageBucket(packages, "dependencies", moduleId, manifest.packages)
      mergePackageBucket(packages, "devDependencies", moduleId, manifest.packages)
      mergePackageBucket(packages, "peerDependencies", moduleId, manifest.packages)

      for (const file of manifest.files ?? []) {
        const target = directFileTarget(file)

        if (target === undefined) {
          files.push(file)
          continue
        }

        const existingOwner = fileOwners.get(target)

        if (existingOwner !== undefined) {
          addConflict({
            moduleIds: [existingOwner.moduleId, moduleId],
            message: `File target collision at "${target}".`,
            reason: `${existingOwner.moduleId} and ${moduleId} both write ${target}.`,
            severity: "error",
          })
        } else {
          fileOwners.set(target, {
            moduleId,
            file,
          })
        }

        files.push(file)
      }
    }

    return {
      packages,
      files,
    }
  }

  for (const userSelection of input.userSelections) {
    addSelection(userSelection, {
      type: "user",
    })
  }

  if (input.presetId !== undefined) {
    addSelection(input.presetId, {
      type: "preset",
      presetId: input.presetId,
    })
  }

  for (let index = 0; index < effectiveSelections.length; index += 1) {
    const moduleId = effectiveSelections[index]

    if (moduleId !== undefined) {
      resolveModule(moduleId, [])
    }
  }

  detectManifestConflicts()
  detectGroupConflicts()

  const collected = collectPackagesAndFiles()
  const metadata: ResolvedRecipe["metadata"] = {
    resolvedAt: new Date().toISOString(),
  }

  if (input.presetId !== undefined) {
    metadata.preset = input.presetId
    metadata.presetId = input.presetId
  }

  return {
    userSelections: [...input.userSelections],
    effectiveSelections,
    selectionReasons,
    locks,
    conflicts,
    warnings,
    packages: collected.packages,
    files: collected.files,
    defaultsApplied,
    metadata,
  }
}
