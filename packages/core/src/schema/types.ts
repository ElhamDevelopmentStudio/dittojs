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
  "preset",
  "tooling",
] as const

export type ModuleType = (typeof MODULE_TYPES)[number]

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

export type FileMapping = {
  from: string
  to: string
  when?: string
}

export type UiMetadata = {
  label: string
  description?: string
  recommended?: boolean
  hidden?: boolean
  category?: string
  tags?: string[]
}

export type ModuleManifest = {
  id: string
  type: ModuleType

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
