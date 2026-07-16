import { describe, expect, it } from "vitest"

import {
  isPresetManifest,
  resolveRecipe,
  validateCatalog,
  type ModuleManifest,
  type PresetManifest,
} from "@dittojs/core"

import { catalog } from "./catalog"
import {
  MVP_PACKAGE_NAMES,
  packageVersions,
  type PackageDependencyType,
  type PackageVersionPolicy,
} from "./package-versions"

const requiredCapabilities = new Set([
  "component-library.shadcn",
  "form.engine",
  "project.structure",
  "styling.tailwind",
  "ui.avatar",
  "ui.button",
  "ui.dropdown",
  "ui.input",
  "ui.label",
  "validation.schema",
])
const invalidPackageVersions = new Set(["latest", "*", ""])
const packageVersionIndex: Record<
  string,
  {
    version: string
    range: string
    policy: PackageVersionPolicy
    dependencyType: PackageDependencyType
    notes?: string
  }
> = packageVersions

function moduleIds(manifests: ModuleManifest[]): Set<string> {
  return new Set(manifests.map((manifest) => manifest.id))
}

function providedCapabilities(manifests: ModuleManifest[]): Set<string> {
  return new Set(manifests.flatMap((manifest) => manifest.provides ?? []))
}

function presets(): PresetManifest[] {
  return catalog.filter(isPresetManifest)
}

function resolvePreset(presetId: string) {
  return resolveRecipe({
    presetId,
    userSelections: [],
    catalog,
  })
}

const requestedTemplateComponentIds = [
  "component.accordion",
  "component.alert",
  "component.alert-dialog",
  "component.aspect-ratio",
  "component.attachment",
  "component.badge",
  "component.breadcrumb",
  "component.bubble",
  "component.button-group",
  "component.calendar",
  "component.card",
  "component.carousel",
  "component.chart",
  "component.checkbox",
  "component.collapsible",
  "component.combobox",
  "component.command",
  "component.context-menu",
  "component.dialog",
  "component.direction",
  "component.drawer",
  "component.empty",
  "component.field",
  "component.hover-card",
  "component.input-group",
  "component.input-otp",
  "component.item",
  "component.kbd",
  "component.marker",
  "component.menubar",
  "component.message",
  "component.message-scroller",
  "component.native-select",
  "component.navigation-menu",
  "component.pagination",
  "component.popover",
  "component.progress",
  "component.radio-group",
  "component.resizable",
  "component.scroll-area",
  "component.select",
  "component.separator",
  "component.sidebar",
  "component.skeleton",
  "component.slider",
  "component.sonner",
  "component.spinner",
  "component.switch",
  "component.table",
  "component.tabs",
  "component.toggle",
  "component.toggle-group",
  "component.tooltip",
]

const replacedTemplateComponentIds = [
  "component.avatar",
  "component.button",
  "component.dropdown",
  "component.input",
  "component.label",
  "component.sheet",
  "component.textarea",
]

const requestedTemplatePageCompositionIds = [
  "composition.auth-v1-login",
  "composition.auth-v1-register",
  "composition.auth-v2-login",
  "composition.auth-v2-register",
  "composition.dashboard-default",
  "composition.dashboard-analytics",
  "composition.dashboard-crm",
  "composition.dashboard-finance",
  "composition.dashboard-ecommerce",
  "composition.dashboard-productivity",
  "composition.dashboard-users",
  "composition.dashboard-roles",
  "composition.dashboard-tasks",
  "composition.dashboard-calendar",
  "composition.dashboard-kanban",
  "composition.dashboard-invoice",
  "composition.dashboard-infrastructure",
  "composition.dashboard-logistics",
  "composition.dashboard-academy",
  "composition.dashboard-chat",
  "composition.dashboard-mail",
  "composition.coming-soon",
  "composition.unauthorized",
  "composition.not-found",
]

function errorMessages(result: ReturnType<typeof resolveRecipe>): string[] {
  return result.conflicts
    .filter((conflict) => conflict.severity === "error")
    .map((conflict) => conflict.message)
}

function packageEntries(manifest: ModuleManifest): Array<{
  bucket: PackageDependencyType
  packageName: string
  version: string
}> {
  return (["dependencies", "devDependencies", "peerDependencies"] as const).flatMap((bucket) =>
    Object.entries(manifest.packages?.[bucket] ?? {}).map(([packageName, version]) => ({
      bucket,
      packageName,
      version,
    })),
  )
}

describe("catalog", () => {
  it("contains unique module ids and valid manifests", () => {
    const ids = catalog.map((manifest) => manifest.id)
    const validation = validateCatalog(catalog)

    expect(new Set(ids).size).toBe(ids.length)
    expect(validation.issues).toEqual([])
    expect(validation.valid).toBe(true)
  })

  it("references only existing direct module ids", () => {
    const ids = moduleIds(catalog)

    for (const manifest of catalog) {
      for (const requirement of manifest.requires ?? []) {
        if (requirement.moduleId !== undefined) {
          expect(
            ids.has(requirement.moduleId),
            `${manifest.id} requires ${requirement.moduleId}`,
          ).toBe(true)
        }
      }

      for (const defaultModuleId of Object.values(manifest.defaults ?? {})) {
        expect(ids.has(defaultModuleId), `${manifest.id} defaults ${defaultModuleId}`).toBe(true)
      }

      if (isPresetManifest(manifest)) {
        for (const selection of manifest.selections) {
          expect(ids.has(selection), `${manifest.id} selects ${selection}`).toBe(true)
        }
      }
    }
  })

  it("has providers for required capabilities", () => {
    const capabilities = providedCapabilities(catalog)

    for (const capability of requiredCapabilities) {
      expect(capabilities.has(capability), `Missing provider for ${capability}`).toBe(true)
    }

    for (const manifest of catalog) {
      for (const requirement of manifest.requires ?? []) {
        if (requirement.capability !== undefined) {
          expect(
            capabilities.has(requirement.capability),
            `${manifest.id} requires ${requirement.capability}`,
          ).toBe(true)
        }
      }
    }
  })

  it("uses centralized concrete package ranges", () => {
    for (const manifest of catalog) {
      for (const entry of packageEntries(manifest)) {
        const packageVersion = packageVersionIndex[entry.packageName]

        expect(
          packageVersion,
          `${manifest.id} declares ${entry.packageName} without a centralized version policy entry`,
        ).toBeDefined()
        expect(
          invalidPackageVersions.has(entry.version),
          `${manifest.id} declares invalid version "${entry.version}" for ${entry.packageName}`,
        ).toBe(false)
        expect(entry.version, `${manifest.id} should use centralized ${entry.packageName}`).toBe(
          packageVersion?.range,
        )
        expect(
          packageVersion?.dependencyType,
          `${manifest.id} declares ${entry.packageName} in the wrong package bucket`,
        ).toBe(entry.bucket)
      }
    }
  })

  it("defines valid centralized package version policy entries", () => {
    expect(Object.keys(packageVersions).sort()).toEqual([...MVP_PACKAGE_NAMES].sort())

    for (const [packageName, packageVersion] of Object.entries(packageVersions)) {
      expect(packageVersion.name, `${packageName} should identify itself`).toBe(packageName)
      expect(packageVersion.version, `${packageName} should use a concrete npm version`).toMatch(
        /^\d+\.\d+\.\d+$/,
      )
      expect(
        invalidPackageVersions.has(packageVersion.version),
        `${packageName} should not use an invalid concrete version`,
      ).toBe(false)

      if (packageVersion.policy === "caret") {
        expect(packageVersion.range, `${packageName} should use the caret policy range`).toBe(
          `^${packageVersion.version}`,
        )
      } else {
        expect(packageVersion.range, `${packageName} exact pins must match version`).toBe(
          packageVersion.version,
        )
        expect(
          "notes" in packageVersion ? packageVersion.notes : undefined,
          `${packageName} exact pins must explain why`,
        ).toBeTruthy()
      }
    }
  })

  it("resolves every preset without blocking conflicts", () => {
    expect(presets().map((preset) => preset.id)).toEqual(
      expect.arrayContaining([
        "preset.chat-app",
        "preset.custom",
        "preset.react-recommended",
        "preset.saas-dashboard",
      ]),
    )

    for (const preset of presets()) {
      expect(errorMessages(resolvePreset(preset.id)), preset.id).toEqual([])
    }
  })

  it("resolves the React recommended preset with baseline modules", () => {
    const result = resolvePreset("preset.react-recommended")

    expect(errorMessages(result)).toEqual([])
    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining([
        "framework.react",
        "structure.react.simple",
        "tooling.vite",
        "tooling.typescript",
        "styling.tailwind",
        "ui.shadcn",
        "primitive-engine.base-ui",
        "component.form",
        "form.react-hook-form",
        "validation.zod",
        "http.axios",
        "state.zustand",
        "composition.react-recommended",
      ]),
    )
    expect(result.selectionReasons["component.button"]).toEqual(
      expect.arrayContaining([
        {
          type: "preset",
          presetId: "preset.react-recommended",
        },
      ]),
    )
    expect(result.packages.devDependencies).toMatchObject({
      "@tailwindcss/vite": packageVersions["@tailwindcss/vite"].range,
      tailwindcss: packageVersions.tailwindcss.range,
    })
    expect(result.packages.devDependencies).not.toHaveProperty("postcss")
    expect(result.packages.devDependencies).not.toHaveProperty("autoprefixer")
  })

  it("contains requested template-derived component manifests", () => {
    const ids = moduleIds(catalog)

    expect([...requestedTemplateComponentIds, ...replacedTemplateComponentIds]).toEqual(
      expect.arrayContaining([
        "component.button",
        "component.dropdown",
        "component.sidebar",
        "component.sonner",
      ]),
    )

    for (const componentId of [...requestedTemplateComponentIds, ...replacedTemplateComponentIds]) {
      expect(ids.has(componentId), `Missing ${componentId}`).toBe(true)
    }
  })

  it("resolves template component requirements through the resolver", () => {
    const sidebar = resolveRecipe({
      catalog,
      userSelections: ["component.sidebar"],
    })
    const dropdown = resolveRecipe({
      catalog,
      userSelections: ["component.dropdown"],
    })

    expect(errorMessages(sidebar)).toEqual([])
    expect(sidebar.effectiveSelections).toEqual(
      expect.arrayContaining([
        "component.sidebar",
        "component.button",
        "component.input",
        "component.separator",
        "component.sheet",
        "component.skeleton",
        "component.tooltip",
        "hook.use-mobile",
      ]),
    )
    expect(dropdown.effectiveSelections).toEqual(
      expect.arrayContaining(["component.dropdown", "component.dropdown-menu"]),
    )
  })

  it("contains template sample data manifests with generated files", () => {
    const sampleData = catalog.filter((manifest) => manifest.id.startsWith("sample-data."))

    expect(sampleData.length).toBeGreaterThanOrEqual(13)

    for (const manifest of sampleData) {
      expect(manifest.type, manifest.id).toBe("adapter")
      expect(manifest.provides, manifest.id).toContain(manifest.id)
      expect(manifest.files?.length, manifest.id).toBeGreaterThan(0)
      expect(manifest.files?.every((file) => file.from.startsWith("sample-data/"))).toBe(true)
    }
  })

  it("contains requested template page compositions with route-colocated routing", () => {
    const ids = moduleIds(catalog)

    for (const compositionId of requestedTemplatePageCompositionIds) {
      expect(ids.has(compositionId), `Missing ${compositionId}`).toBe(true)

      const result = resolveRecipe({
        catalog,
        userSelections: [compositionId],
      })

      expect(errorMessages(result), compositionId).toEqual([])
      expect(result.effectiveSelections, compositionId).toEqual(
        expect.arrayContaining([
          "routing.react-router",
          "structure.react.route-colocated",
          compositionId,
        ]),
      )
    }
  })

  it("routes legacy navbar and sidebar selections to template layout blocks", () => {
    const navbar = resolveRecipe({
      catalog,
      userSelections: ["block.navbar"],
    })
    const sidebar = resolveRecipe({
      catalog,
      userSelections: ["block.sidebar"],
    })

    expect(errorMessages(navbar)).toEqual([])
    expect(navbar.effectiveSelections).toEqual(
      expect.arrayContaining(["block.navbar", "block.dashboard-layout", "block.dashboard-sidebar"]),
    )
    expect(errorMessages(sidebar)).toEqual([])
    expect(sidebar.effectiveSelections).toEqual(
      expect.arrayContaining(["block.sidebar", "block.dashboard-sidebar"]),
    )
  })

  it("contains React project structure manifests", () => {
    const structures = catalog.filter((manifest) => manifest.type === "project-structure")

    expect(structures.map((structure) => structure.id)).toEqual(
      expect.arrayContaining([
        "structure.react.simple",
        "structure.react.feature-based",
        "structure.react.route-colocated",
      ]),
    )

    for (const structure of structures) {
      expect(structure.group).toMatchObject({
        id: "project-structure",
        mode: "exactly-one",
        label: "Project structure",
      })
      expect(structure.requires).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            moduleId: "framework.react",
          }),
        ]),
      )
    }
  })

  it("defaults presets to their expected project structure", () => {
    expect(resolvePreset("preset.react-recommended").effectiveSelections).toContain(
      "structure.react.simple",
    )
    expect(resolvePreset("preset.custom").effectiveSelections).toContain("structure.react.simple")
    expect(resolvePreset("preset.saas-dashboard").effectiveSelections).toContain(
      "structure.react.feature-based",
    )
    expect(resolvePreset("preset.chat-app").effectiveSelections).toContain(
      "structure.react.feature-based",
    )
  })

  it("lets an explicit project structure override a preset default", () => {
    const result = resolveRecipe({
      catalog,
      presetId: "preset.react-recommended",
      userSelections: ["structure.react.route-colocated"],
    })

    expect(errorMessages(result)).toEqual([])
    expect(result.effectiveSelections).toContain("structure.react.route-colocated")
    expect(result.effectiveSelections).not.toContain("structure.react.simple")
  })

  it("reports an exactly-one conflict for multiple project structures", () => {
    const result = resolveRecipe({
      catalog,
      userSelections: ["structure.react.simple", "structure.react.feature-based"],
    })

    expect(errorMessages(result)).toEqual(
      expect.arrayContaining([expect.stringContaining('Group "project-structure"')]),
    )
  })

  it("selecting a project structure requires React", () => {
    const result = resolveRecipe({
      catalog,
      userSelections: ["structure.react.route-colocated"],
    })

    expect(errorMessages(result)).toEqual([])
    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining(["structure.react.route-colocated", "framework.react"]),
    )
    expect(result.locks["framework.react"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "structure.react.route-colocated",
          reason: "React project structures require the React framework.",
        },
      ]),
    )
  })

  it("resolves dashboard and chat presets through their app compositions", () => {
    const dashboard = resolvePreset("preset.saas-dashboard")
    const chat = resolvePreset("preset.chat-app")

    expect(errorMessages(dashboard)).toEqual([])
    expect(dashboard.effectiveSelections).toEqual(
      expect.arrayContaining([
        "composition.saas-dashboard",
        "block.navbar",
        "block.sidebar",
        "block.settings-form",
        "component.button",
      ]),
    )
    expect(dashboard.effectiveSelections).not.toContain("composition.react-recommended")
    expect(dashboard.effectiveSelections).not.toContain("preset.react-recommended")

    expect(errorMessages(chat)).toEqual([])
    expect(chat.effectiveSelections).toEqual(
      expect.arrayContaining([
        "composition.chat-app",
        "block.navbar",
        "block.messaging-input",
        "block.typing-indicator",
        "block.online-presence",
      ]),
    )
    expect(chat.effectiveSelections).not.toContain("composition.react-recommended")
    expect(chat.effectiveSelections).not.toContain("preset.react-recommended")
  })

  it("locks Tailwind when shadcn is selected", () => {
    const result = resolveRecipe({
      userSelections: ["ui.shadcn"],
      catalog,
    })

    expect(errorMessages(result)).toEqual([])
    expect(result.locks["styling.tailwind"]).toEqual([
      {
        requiredBy: "ui.shadcn",
        reason: "shadcn components require Tailwind CSS.",
      },
    ])
  })

  it("locks template Navbar compatibility requirements", () => {
    const result = resolveRecipe({
      userSelections: ["block.navbar"],
      catalog,
    })

    expect(errorMessages(result)).toEqual([])
    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining(["block.navbar", "block.dashboard-layout", "block.dashboard-sidebar"]),
    )
    expect(result.locks["component.button"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.dashboard-layout",
          reason: "Dashboard layout renders Button controls.",
        },
      ]),
    )
    expect(result.locks["component.avatar"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.dashboard-sidebar",
          reason: "Sidebar account controls render Avatar.",
        },
      ]),
    )
    expect(result.locks["component.dropdown"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.dashboard-sidebar",
          reason: "Sidebar menus use Dropdown Menu.",
        },
      ]),
    )
  })
})
