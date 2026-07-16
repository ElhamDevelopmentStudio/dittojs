import { describe, expect, it } from "vitest"

import type { ResolvedRecipe } from "@dittosh/core"

import {
  projectStructureAdapters,
  resolveStructurePath,
  selectedProjectStructureAdapter,
} from "./index.js"

function recipeWithSelections(effectiveSelections: string[]): ResolvedRecipe {
  return {
    userSelections: [],
    effectiveSelections,
    selectionReasons: {},
    locks: {},
    conflicts: [],
    warnings: [],
    packages: {
      dependencies: {},
      devDependencies: {},
      peerDependencies: {},
    },
    files: [],
    defaultsApplied: [],
    metadata: {
      resolvedAt: "2026-07-05T00:00:00.000Z",
    },
  }
}

describe("project structure adapters", () => {
  it("resolves required slots for every React adapter", () => {
    const inputs = {
      name: "settings-form",
      feature: "settings",
      route: "settings",
    }

    expect(
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.simple"],
        slot: "form-component",
        ...inputs,
      }),
    ).toBe("src/components/forms/settings-form.tsx")
    expect(
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.feature-based"],
        slot: "form-component",
        ...inputs,
      }),
    ).toBe("src/features/settings/components/settings-form.tsx")
    expect(
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.route-colocated"],
        slot: "form-component",
        ...inputs,
      }),
    ).toBe("src/pages/settings/components/settings-form.tsx")
  })

  it("resolves route page and schema slots", () => {
    expect(
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.route-colocated"],
        slot: "page",
        name: "settings",
        route: "settings/profile",
      }),
    ).toBe("src/pages/settings/profile/page.tsx")
    expect(
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.feature-based"],
        slot: "schema",
        name: "settings",
        feature: "settings",
      }),
    ).toBe("src/features/settings/schemas/settings.ts")
  })

  it("fails clearly when a required placeholder is missing", () => {
    expect(() =>
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.feature-based"],
        slot: "block",
        name: "navbar",
      }),
    ).toThrow(/requires placeholder "feature"/)
  })

  it("fails clearly when a placeholder value is unsafe", () => {
    expect(() =>
      resolveStructurePath({
        adapter: projectStructureAdapters["structure.react.simple"],
        slot: "ui-component",
        name: "../button",
      }),
    ).toThrow(/paths must not contain/)
  })

  it("detects the selected project structure from a resolved recipe", () => {
    expect(
      selectedProjectStructureAdapter(
        recipeWithSelections(["framework.react", "structure.react.feature-based"]),
      )?.id,
    ).toBe("structure.react.feature-based")
  })

  it("fails clearly when multiple structures are selected", () => {
    expect(() =>
      selectedProjectStructureAdapter(
        recipeWithSelections(["structure.react.simple", "structure.react.feature-based"]),
      ),
    ).toThrow(/Multiple project structures selected/)
  })
})
