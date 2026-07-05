import { describe, expect, it } from "vitest"

import { validateCatalog, validateModuleManifest } from "./validation"
import type { GroupMode, StandardModuleManifest } from "./types"

function validManifest(overrides: Partial<StandardModuleManifest> = {}): StandardModuleManifest {
  return {
    id: "framework.react",
    type: "framework",
    label: "React",
    provides: ["framework.react"],
    ...overrides,
  }
}

describe("validateModuleManifest", () => {
  it("passes a valid module manifest", () => {
    const result = validateModuleManifest(validManifest())

    expect(result.valid).toBe(true)
    expect(result.issues).toEqual([])
  })

  it("fails when id is missing", () => {
    const result = validateModuleManifest(validManifest({ id: "" }))

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "manifest.id.missing" })]),
    )
  })

  it("fails when label is missing", () => {
    const result = validateModuleManifest(validManifest({ label: "" }))

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "manifest.label.missing" })]),
    )
  })

  it("fails when id format is invalid", () => {
    const result = validateModuleManifest(validManifest({ id: "Framework.React" }))

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "manifest.id.invalid" })]),
    )
  })

  it("fails when a requirement has no capability or moduleId", () => {
    const result = validateModuleManifest(
      validManifest({
        requires: [
          {
            reason: "Needs a dependency.",
          },
        ],
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "requirement.target.missing" })]),
    )
  })

  it("fails when a requirement has both capability and moduleId", () => {
    const result = validateModuleManifest(
      validManifest({
        requires: [
          {
            capability: "styling.tailwind",
            moduleId: "styling.tailwind",
            reason: "This should be one target.",
          },
        ],
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "requirement.target.ambiguous" })]),
    )
  })

  it("fails when a conflict has no capability or moduleId", () => {
    const result = validateModuleManifest(
      validManifest({
        conflicts: [
          {
            reason: "Needs a conflict target.",
          },
        ],
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "conflict.target.missing" })]),
    )
  })

  it("fails when group mode is invalid", () => {
    const result = validateModuleManifest(
      validManifest({
        group: {
          id: "framework",
          mode: "many" as GroupMode,
        },
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "group.mode.invalid" })]),
    )
  })

  it("fails when a file target path is unsafe", () => {
    const result = validateModuleManifest(
      validManifest({
        files: [
          {
            from: "templates/button.tsx",
            to: "../outside.tsx",
          },
        ],
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "file.to.invalid" })]),
    )
  })

  it("fails when a module maps duplicate target paths", () => {
    const result = validateModuleManifest(
      validManifest({
        files: [
          {
            from: "templates/button.tsx",
            to: "src/components/button.tsx",
          },
          {
            from: "templates/alternate-button.tsx",
            to: "src/components/button.tsx",
          },
        ],
      }),
    )

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "file.to.duplicate" })]),
    )
  })

  it("passes a valid preset manifest", () => {
    const result = validateModuleManifest({
      id: "preset.react",
      type: "preset",
      label: "React Preset",
      selections: ["framework.react"],
    })

    expect(result.valid).toBe(true)
    expect(result.issues).toEqual([])
  })

  it("fails when a preset has no selections", () => {
    const result = validateModuleManifest({
      id: "preset.empty",
      type: "preset",
      label: "Empty Preset",
      selections: [],
    })

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "preset.selections.missing" })]),
    )
  })
})

describe("validateCatalog", () => {
  it("fails duplicate catalog module IDs", () => {
    const result = validateCatalog([
      validManifest(),
      validManifest({
        label: "React Duplicate",
      }),
    ])

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([expect.objectContaining({ code: "catalog.moduleId.duplicate" })]),
    )
  })

  it("fails when a direct moduleId requirement references a missing module", () => {
    const result = validateCatalog([
      validManifest({
        id: "ui.shadcn",
        type: "ui-library",
        label: "shadcn",
        requires: [
          {
            moduleId: "styling.tailwind",
            reason: "shadcn requires Tailwind CSS.",
          },
        ],
      }),
    ])

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "catalog.requirement.moduleId.missing" }),
      ]),
    )
  })

  it("passes a valid catalog", () => {
    const result = validateCatalog([
      validManifest(),
      validManifest({
        id: "styling.tailwind",
        type: "styling",
        label: "Tailwind CSS",
        provides: ["styling.tailwind"],
      }),
      validManifest({
        id: "ui.shadcn",
        type: "ui-library",
        label: "shadcn",
        provides: ["component-library.shadcn"],
        requires: [
          {
            moduleId: "styling.tailwind",
            reason: "shadcn components require Tailwind CSS.",
            strength: "hard",
          },
        ],
        files: [
          {
            from: "templates/components/button.tsx",
            to: "src/components/ui/button.tsx",
          },
        ],
      }),
    ])

    expect(result.valid).toBe(true)
    expect(result.issues).toEqual([])
  })

  it("fails when a preset selection references a missing module", () => {
    const result = validateCatalog([
      {
        id: "preset.react",
        type: "preset",
        label: "React Preset",
        selections: ["framework.react"],
      },
    ])

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "catalog.preset.selection.missing" }),
      ]),
    )
  })

  it("fails when a default references a missing module", () => {
    const result = validateCatalog([
      validManifest({
        defaults: {
          styling: "styling.tailwind",
        },
      }),
    ])

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "catalog.default.moduleId.missing" }),
      ]),
    )
  })
})
