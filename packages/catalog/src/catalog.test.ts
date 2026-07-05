import { describe, expect, it } from "vitest"

import {
  isPresetManifest,
  resolveRecipe,
  validateCatalog,
  type ModuleManifest,
  type PresetManifest,
} from "@dittojs/core"

import { catalog } from "./catalog"

const requiredCapabilities = new Set([
  "component-library.shadcn",
  "form.engine",
  "styling.tailwind",
  "ui.avatar",
  "ui.button",
  "ui.dropdown",
  "ui.input",
  "ui.label",
  "validation.schema",
])

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

function errorMessages(result: ReturnType<typeof resolveRecipe>): string[] {
  return result.conflicts
    .filter((conflict) => conflict.severity === "error")
    .map((conflict) => conflict.message)
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
  })

  it("resolves dashboard and chat presets through nested presets", () => {
    const dashboard = resolvePreset("preset.saas-dashboard")
    const chat = resolvePreset("preset.chat-app")

    expect(errorMessages(dashboard)).toEqual([])
    expect(dashboard.effectiveSelections).toEqual(
      expect.arrayContaining([
        "preset.react-recommended",
        "block.navbar",
        "block.sidebar",
        "component.button",
      ]),
    )
    expect(chat.effectiveSelections).toEqual(
      expect.arrayContaining([
        "preset.react-recommended",
        "block.navbar",
        "block.messaging-input",
        "block.typing-indicator",
        "block.online-presence",
      ]),
    )
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

  it("locks Navbar component requirements", () => {
    const result = resolveRecipe({
      userSelections: ["block.navbar"],
      catalog,
    })

    expect(errorMessages(result)).toEqual([])
    expect(result.locks["component.button"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Button for navigation actions.",
        },
      ]),
    )
    expect(result.locks["component.input"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Input for search.",
        },
      ]),
    )
    expect(result.locks["component.avatar"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Avatar for the user menu.",
        },
      ]),
    )
    expect(result.locks["component.dropdown"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Dropdown for account actions.",
        },
      ]),
    )
  })
})
