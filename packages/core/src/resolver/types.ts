import type { FileMapping, ModuleManifest, PackageSet } from "../schema/index"

export type ResolveInput = {
  userSelections: string[]
  presetId?: string
  catalog: ModuleManifest[]
  options?: ResolveOptions
}

export type ResolveOptions = {
  allowSoftRecommendations?: boolean
}

export type SelectionReason =
  | {
      type: "user"
    }
  | {
      type: "preset"
      presetId: string
    }
  | {
      type: "requirement"
      requiredBy: string
      reason: string
    }
  | {
      type: "default"
      defaultedBy: string
      reason: string
    }

export type LockReason = {
  requiredBy: string
  reason: string
}

export type ResolveConflict = {
  moduleIds: string[]
  message: string
  reason: string
  severity: "error" | "warning"
}

export type ResolveWarning = {
  message: string
  moduleId?: string
  reason?: string
}

export type AppliedDefault = {
  key: string
  value: string
  defaultedBy: string
  reason?: string
}

export type ResolvedPackageSet = Required<Pick<PackageSet, "dependencies" | "devDependencies">> &
  Pick<PackageSet, "peerDependencies">

export type ResolvedRecipe = {
  userSelections: string[]
  effectiveSelections: string[]
  selectionReasons: Record<string, SelectionReason[]>
  locks: Record<string, LockReason[]>
  conflicts: ResolveConflict[]
  warnings: ResolveWarning[]
  packages: ResolvedPackageSet
  files: FileMapping[]
  defaultsApplied: AppliedDefault[]
  metadata: {
    resolvedAt: string
  } & Record<string, unknown>
}
