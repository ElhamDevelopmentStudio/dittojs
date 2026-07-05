export const MODULE_TYPES = [
  "framework",
  "styling",
  "ui-library",
  "primitive-engine",
  "primitive",
  "composite",
  "block",
  "form-engine",
  "validation",
  "state",
  "http",
  "adapter",
  "project-structure",
  "preset",
  "tooling",
] as const

export type ModuleType = (typeof MODULE_TYPES)[number]

export type NonPresetModuleType = Exclude<ModuleType, "preset">

export const REQUIREMENT_STRENGTHS = ["hard", "soft"] as const

export type RequirementStrength = (typeof REQUIREMENT_STRENGTHS)[number]

export type Requirement = {
  capability?: string
  moduleId?: string
  reason: string
  strength?: RequirementStrength
}

export type Conflict = {
  moduleId?: string
  capability?: string
  reason: string
}

export const GROUP_MODES = ["exactly-one", "at-most-one", "at-least-one"] as const

export type GroupMode = (typeof GROUP_MODES)[number]

export type ProviderGroup = {
  id: string
  mode: GroupMode
  label?: string
}

export type PackageSet = {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
}

export type DirectFileMapping = {
  from: string
  to: string
  when?: string
  slot?: never
  name?: never
  feature?: never
  route?: never
}

export type SlotFileMapping = {
  from: string
  slot: string
  name: string
  feature?: string
  route?: string
  when?: string
  to?: never
}

export type FileMapping = DirectFileMapping | SlotFileMapping

export type UiMetadata = {
  label: string
  description?: string
  recommended?: boolean
  hidden?: boolean
  category?: string
  tags?: string[]
}

type ModuleManifestBase = {
  id: string

  label: string
  description?: string

  provides?: string[]
  requires?: Requirement[]
  conflicts?: Conflict[]

  group?: ProviderGroup

  packages?: PackageSet

  files?: FileMapping[]

  defaults?: Record<string, string>

  ui?: UiMetadata

  metadata?: Record<string, unknown>
}

export type StandardModuleManifest = ModuleManifestBase & {
  type: NonPresetModuleType
}

export type PresetManifest = ModuleManifestBase & {
  type: "preset"
  selections: string[]
}

export type ModuleManifest = StandardModuleManifest | PresetManifest

export function isPresetManifest(manifest: ModuleManifest): manifest is PresetManifest {
  return manifest.type === "preset"
}
