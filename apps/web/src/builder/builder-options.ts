import { catalog } from "@dittojs/catalog"
import { isPresetManifest, type ModuleManifest } from "@dittojs/core"

export type BuilderStep =
  "landing" | "core" | "features" | "structure" | "review" | "generating" | "success"

export type PresetOption = {
  id: string
  title: string
  description: string
  stack: string
  icon?: string
  recommendationReason?: string | undefined
  recommended?: boolean
}

export type BuilderOption = {
  id: string
  label: string
  description: string
  moduleId?: string
  moduleIds?: string[]
  groupId: string
  groupMode?: "toggle" | "exactly-one"
  recommended?: boolean
  recommendationReason?: string | undefined
  comingSoon?: boolean
  meta?: string
  icon?: string
  customization?: OptionCustomization
  preview?: BuilderPreview
}

export type OptionGroup = {
  id: string
  title: string
  description: string
  options: BuilderOption[]
}

export type CustomizationSection = {
  id: string
  title: string
  description?: string
  options: BuilderOption[]
}

export type OptionCustomization = {
  title: string
  description: string
  sections: CustomizationSection[]
}

export type BuilderPreview = {
  id: string
  kind: "primitive" | "composite" | "block" | "page"
  viewport: "component" | "desktop"
}

type CatalogSection = "core" | "features" | "structure"

type GroupMetadata = {
  title: string
  description: string
  section: CatalogSection
  fallbackIcon: string
}

const groupMetadata: Record<string, GroupMetadata> = {
  adapter: {
    title: "Hooks, Routing & Data",
    description: "Template hooks, router support, support files, and copied mock data.",
    section: "features",
    fallbackIcon: "hook",
  },
  block: {
    title: "Blocks",
    description: "Product-ready layout and feature blocks.",
    section: "features",
    fallbackIcon: "layout",
  },
  composite: {
    title: "Composite Components",
    description: "Template-derived shadcn component compositions.",
    section: "features",
    fallbackIcon: "component",
  },
  composition: {
    title: "Pages & Compositions",
    description: "Selectable pages, app compositions, and template presets as modules.",
    section: "features",
    fallbackIcon: "file",
  },
  "form-engine": {
    title: "Forms",
    description: "Generated form state engine.",
    section: "core",
    fallbackIcon: "form",
  },
  framework: {
    title: "Framework",
    description: "The app runtime and frontend foundation.",
    section: "core",
    fallbackIcon: "react",
  },
  http: {
    title: "HTTP Client",
    description: "Generated API client dependency.",
    section: "core",
    fallbackIcon: "cloud",
  },
  primitive: {
    title: "Primitive Components",
    description: "Template-derived shadcn UI primitives.",
    section: "features",
    fallbackIcon: "component",
  },
  "primitive-engine": {
    title: "Primitive Engine",
    description: "Accessible primitive layer used by generated components.",
    section: "core",
    fallbackIcon: "box",
  },
  "project-structure": {
    title: "Project Structure",
    description: "Generated source layout.",
    section: "structure",
    fallbackIcon: "folder",
  },
  state: {
    title: "State Management",
    description: "Generated client state dependency.",
    section: "core",
    fallbackIcon: "stack",
  },
  styling: {
    title: "Styling",
    description: "Generated styling system.",
    section: "core",
    fallbackIcon: "tailwind",
  },
  tooling: {
    title: "Tooling",
    description: "Compiler, language, and development server support.",
    section: "core",
    fallbackIcon: "flash",
  },
  "ui-library": {
    title: "UI Library",
    description: "Generated component library conventions.",
    section: "core",
    fallbackIcon: "palette",
  },
  validation: {
    title: "Validation",
    description: "Generated schema validation support.",
    section: "core",
    fallbackIcon: "code",
  },
}

const sectionOrder: Record<CatalogSection, string[]> = {
  core: [
    "framework",
    "tooling",
    "styling",
    "ui-library",
    "primitive-engine",
    "form-engine",
    "validation",
    "state",
    "http",
  ],
  features: ["primitive", "composite", "block", "composition", "adapter"],
  structure: ["project-structure"],
}

function moduleType(manifest: ModuleManifest): string {
  return manifest.type
}

function groupIdForManifest(manifest: ModuleManifest): string {
  return manifest.group?.id ?? moduleType(manifest)
}

function metadataForGroup(groupId: string): GroupMetadata {
  return (
    groupMetadata[groupId] ??
    groupMetadata[groupIdForFallbackType(groupId)] ?? {
      title: humanize(groupId),
      description: `Catalog modules in the ${humanize(groupId)} group.`,
      section: "features",
      fallbackIcon: "box",
    }
  )
}

function groupIdForFallbackType(groupId: string): string {
  return groupId.split(".").at(0) ?? groupId
}

function humanize(value: string): string {
  return value
    .split(/[.-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function descriptionForManifest(manifest: ModuleManifest): string {
  return (
    manifest.ui?.description ??
    manifest.description ??
    `${manifest.ui?.label ?? manifest.label} from the DittoJs catalog.`
  )
}

function previewForManifest(manifest: ModuleManifest): BuilderPreview | undefined {
  const preview = manifest.metadata?.preview

  if (
    typeof preview !== "object" ||
    preview === null ||
    !("id" in preview) ||
    !("kind" in preview) ||
    !("viewport" in preview)
  ) {
    return undefined
  }

  const id = preview.id
  const kind = preview.kind
  const viewport = preview.viewport

  if (
    typeof id !== "string" ||
    (kind !== "primitive" && kind !== "composite" && kind !== "block" && kind !== "page") ||
    (viewport !== "component" && viewport !== "desktop")
  ) {
    return undefined
  }

  return { id, kind, viewport }
}

function groupModeForManifest(manifest: ModuleManifest): NonNullable<BuilderOption["groupMode"]> {
  if (manifest.group?.mode === "exactly-one" || manifest.group?.mode === "at-most-one") {
    return "exactly-one"
  }

  return "toggle"
}

function optionForManifest(manifest: ModuleManifest): BuilderOption {
  const groupId = groupIdForManifest(manifest)
  const groupMetadata = metadataForGroup(groupId)
  const preview = previewForManifest(manifest)

  return {
    id: manifest.id,
    label: manifest.ui?.label ?? manifest.label,
    description: descriptionForManifest(manifest),
    moduleId: manifest.id,
    groupId,
    groupMode: groupModeForManifest(manifest),
    meta: manifest.ui?.category ?? groupMetadata.title,
    icon: manifest.ui?.icon ?? groupMetadata.fallbackIcon,
    ...(preview === undefined ? {} : { preview }),
    ...(manifest.ui?.recommended === undefined ? {} : { recommended: manifest.ui.recommended }),
    ...(manifest.ui?.recommendationReason === undefined
      ? {}
      : { recommendationReason: manifest.ui.recommendationReason }),
  }
}

function presetForManifest(manifest: ModuleManifest): PresetOption {
  return {
    id: manifest.id,
    title: manifest.ui?.label ?? manifest.label,
    description: descriptionForManifest(manifest),
    stack: manifest.ui?.category ?? "Catalog preset",
    icon: manifest.ui?.icon ?? "settings",
    ...(manifest.ui?.recommendationReason === undefined
      ? {}
      : { recommendationReason: manifest.ui.recommendationReason }),
    ...(manifest.ui?.recommended === undefined ? {} : { recommended: manifest.ui.recommended }),
  }
}

function standardManifests(): ModuleManifest[] {
  return catalog.filter((manifest) => !isPresetManifest(manifest))
}

function groupsForSection(section: CatalogSection): OptionGroup[] {
  const sectionGroupIds = sectionOrder[section]
  const sectionGroups = new Map<string, BuilderOption[]>()

  for (const manifest of standardManifests()) {
    const typeMetadata = groupMetadata[moduleType(manifest)]

    if (typeMetadata?.section !== section) {
      continue
    }

    const groupId = moduleType(manifest)
    const options = sectionGroups.get(groupId) ?? []

    options.push(optionForManifest(manifest))
    sectionGroups.set(groupId, options)
  }

  return [...sectionGroups.entries()]
    .sort(([left], [right]) => {
      const leftIndex = sectionGroupIds.indexOf(left)
      const rightIndex = sectionGroupIds.indexOf(right)

      return (
        (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex) -
        (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex)
      )
    })
    .map(([groupId, options]) => {
      const metadata = metadataForGroup(groupId)

      return {
        id: groupId,
        title: metadata.title,
        description: metadata.description,
        options,
      }
    })
}

export function moduleIdsForOption(option: BuilderOption): string[] {
  return Array.from(
    new Set([
      ...(option.moduleId === undefined ? [] : [option.moduleId]),
      ...(option.moduleIds ?? []),
    ]),
  )
}

export const presetOptions: PresetOption[] = catalog
  .filter(isPresetManifest)
  .map((manifest) => presetForManifest(manifest))

export const coreOptionGroups: OptionGroup[] = groupsForSection("core")

export const featureOptionGroups: OptionGroup[] = groupsForSection("features")

export const componentOptions: BuilderOption[] = featureOptionGroups
  .filter((group) => group.id === "primitive" || group.id === "composite")
  .flatMap((group) => group.options)

export const blockOptions: BuilderOption[] =
  featureOptionGroups.find((group) => group.id === "block")?.options ?? []

export const projectStructureOptions: BuilderOption[] =
  groupsForSection("structure").find((group) => group.id === "project-structure")?.options ?? []

export const allSelectableOptions = [
  ...coreOptionGroups.flatMap((group) => group.options),
  ...featureOptionGroups.flatMap((group) => group.options),
  ...projectStructureOptions,
]
