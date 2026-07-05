import { describe, expect, it } from "vitest"

import { resolveRecipe } from "./resolve"
import type { ModuleManifest, ResolveConflict, ResolvedRecipe } from "../index"

const testCatalog: ModuleManifest[] = [
  {
    id: "framework.react",
    type: "framework",
    label: "React",
    provides: ["framework.react"],
  },
  {
    id: "styling.tailwind",
    type: "styling",
    label: "Tailwind CSS",
    provides: ["styling.tailwind"],
    packages: {
      devDependencies: {
        tailwindcss: "latest",
      },
    },
  },
  {
    id: "primitive-engine.base-ui",
    type: "primitive-engine",
    label: "Base UI",
    provides: ["primitive-engine.base-ui"],
    group: {
      id: "primitive-engine",
      mode: "at-most-one",
      label: "Primitive engine",
    },
    packages: {
      dependencies: {
        "@base-ui-components/react": "latest",
      },
    },
  },
  {
    id: "primitive-engine.radix-ui",
    type: "primitive-engine",
    label: "Radix UI",
    provides: ["primitive-engine.radix-ui"],
    group: {
      id: "primitive-engine",
      mode: "at-most-one",
      label: "Primitive engine",
    },
  },
  {
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
    defaults: {
      "primitive-engine": "primitive-engine.base-ui",
    },
    packages: {
      dependencies: {
        "class-variance-authority": "latest",
      },
    },
  },
  {
    id: "component.button",
    type: "primitive",
    label: "Button",
    provides: ["ui.button"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Button is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "components/ui/button.tsx",
        to: "src/components/ui/button.tsx",
      },
    ],
  },
  {
    id: "component.input",
    type: "primitive",
    label: "Input",
    provides: ["ui.input"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Input is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "components/ui/input.tsx",
        to: "src/components/ui/input.tsx",
      },
    ],
  },
  {
    id: "component.avatar",
    type: "primitive",
    label: "Avatar",
    provides: ["ui.avatar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Avatar is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
  },
  {
    id: "component.dropdown",
    type: "composite",
    label: "Dropdown",
    provides: ["ui.dropdown"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Dropdown is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
  },
  {
    id: "block.navbar",
    type: "block",
    label: "Navbar",
    provides: ["block.navbar"],
    requires: [
      {
        capability: "ui.button",
        reason: "Navbar uses Button for navigation actions.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Navbar uses Input for search.",
        strength: "hard",
      },
      {
        capability: "ui.avatar",
        reason: "Navbar uses Avatar for the user menu.",
        strength: "hard",
      },
      {
        capability: "ui.dropdown",
        reason: "Navbar uses Dropdown for account actions.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "blocks/navbar.tsx",
        to: "src/components/blocks/navbar.tsx",
      },
    ],
  },
  {
    id: "block.sidebar",
    type: "block",
    label: "Sidebar",
    provides: ["block.sidebar"],
    requires: [
      {
        capability: "ui.button",
        reason: "Sidebar uses Button for navigation actions.",
        strength: "hard",
      },
    ],
  },
  {
    id: "form.react-hook-form",
    type: "form-engine",
    label: "React Hook Form",
    provides: ["form.engine"],
    group: {
      id: "form-engine",
      mode: "exactly-one",
      label: "Form engine",
    },
    conflicts: [
      {
        capability: "form.engine",
        reason: "Only one primary form engine can be selected.",
      },
    ],
    packages: {
      dependencies: {
        "react-hook-form": "latest",
      },
    },
  },
  {
    id: "form.tanstack-form",
    type: "form-engine",
    label: "TanStack Form",
    provides: ["form.engine"],
    group: {
      id: "form-engine",
      mode: "exactly-one",
      label: "Form engine",
    },
    conflicts: [
      {
        capability: "form.engine",
        reason: "Only one primary form engine can be selected.",
      },
    ],
  },
  {
    id: "validation.zod",
    type: "validation",
    label: "Zod",
    provides: ["validation.schema"],
    group: {
      id: "validation-schema",
      mode: "exactly-one",
      label: "Validation schema",
    },
  },
  {
    id: "validation.yup",
    type: "validation",
    label: "Yup",
    provides: ["validation.schema"],
    group: {
      id: "validation-schema",
      mode: "exactly-one",
      label: "Validation schema",
    },
  },
]

function resolve(userSelections: string[], catalog = testCatalog): ResolvedRecipe {
  return resolveRecipe({
    userSelections,
    catalog,
  })
}

function hasConflict(
  result: ResolvedRecipe,
  predicate: (conflict: ResolveConflict) => boolean,
): boolean {
  return result.conflicts.some(predicate)
}

describe("resolveRecipe", () => {
  it("selecting shadcn auto-selects Tailwind", () => {
    const result = resolve(["ui.shadcn"])

    expect(result.effectiveSelections).toContain("ui.shadcn")
    expect(result.effectiveSelections).toContain("styling.tailwind")
  })

  it("selecting shadcn locks Tailwind", () => {
    const result = resolve(["ui.shadcn"])

    expect(result.locks["styling.tailwind"]).toEqual([
      {
        requiredBy: "ui.shadcn",
        reason: "shadcn components require Tailwind CSS.",
      },
    ])
  })

  it("selecting Button auto-selects shadcn when Button requires shadcn", () => {
    const result = resolve(["component.button"])

    expect(result.effectiveSelections).toContain("component.button")
    expect(result.effectiveSelections).toContain("ui.shadcn")
  })

  it("selecting Navbar auto-selects Button, Input, Avatar, and Dropdown", () => {
    const result = resolve(["block.navbar"])

    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining([
        "component.button",
        "component.input",
        "component.avatar",
        "component.dropdown",
      ]),
    )
  })

  it("resolves transitive requirements", () => {
    const result = resolve(["block.navbar"])

    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining(["block.navbar", "component.button", "ui.shadcn", "styling.tailwind"]),
    )
  })

  it("lock reasons include the requiring parent", () => {
    const result = resolve(["block.navbar"])

    expect(result.locks["component.button"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Button for navigation actions.",
        },
      ]),
    )
  })

  it("supports multiple parents locking the same dependency", () => {
    const result = resolve(["block.navbar", "block.sidebar"])

    expect(result.locks["component.button"]).toEqual(
      expect.arrayContaining([
        {
          requiredBy: "block.navbar",
          reason: "Navbar uses Button for navigation actions.",
        },
        {
          requiredBy: "block.sidebar",
          reason: "Sidebar uses Button for navigation actions.",
        },
      ]),
    )
  })

  it("preserves explicit user selections separately from dependency selections", () => {
    const userSelections = ["component.button", "block.navbar"]
    const result = resolve(userSelections)

    expect(result.userSelections).toEqual(userSelections)
    expect(result.selectionReasons["component.button"]).toEqual(
      expect.arrayContaining([
        {
          type: "user",
        },
        {
          type: "requirement",
          requiredBy: "block.navbar",
          reason: "Navbar uses Button for navigation actions.",
        },
      ]),
    )
  })

  it("allows a dependency to unlock when re-resolved without the parent", () => {
    const withParent = resolve(["block.navbar"])
    const withoutParent = resolve(["component.button"])

    expect(withParent.locks["component.button"]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          requiredBy: "block.navbar",
        }),
      ]),
    )
    expect(withoutParent.locks["component.button"]).toBeUndefined()
  })

  it("returns a conflict for React Hook Form with TanStack Form", () => {
    const result = resolve(["form.react-hook-form", "form.tanstack-form"])

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.moduleIds.includes("form.react-hook-form") &&
          conflict.moduleIds.includes("form.tanstack-form") &&
          conflict.reason === "Only one primary form engine can be selected.",
      ),
    ).toBe(true)
  })

  it("returns an error when exactly-one groups are violated", () => {
    const result = resolve(["form.react-hook-form", "form.tanstack-form"])

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message === 'Group "form-engine" allows exactly-one module.' &&
          conflict.severity === "error",
      ),
    ).toBe(true)
  })

  it("returns an error when at-most-one groups are violated", () => {
    const result = resolve(["primitive-engine.base-ui", "primitive-engine.radix-ui"])

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message === 'Group "primitive-engine" allows at-most-one module.' &&
          conflict.severity === "error",
      ),
    ).toBe(true)
  })

  it("does not globally error for empty at-least-one groups", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "framework.react",
        type: "framework",
        label: "React",
        provides: ["framework.react"],
        group: {
          id: "framework",
          mode: "at-least-one",
        },
      },
    ]

    const result = resolve([], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message.includes('Group "framework"') && conflict.severity === "error",
      ),
    ).toBe(false)
  })

  it("applies defaults when no explicit choice exists", () => {
    const result = resolve(["ui.shadcn"])

    expect(result.effectiveSelections).toContain("primitive-engine.base-ui")
    expect(result.defaultsApplied).toEqual([
      {
        key: "primitive-engine",
        value: "primitive-engine.base-ui",
        defaultedBy: "ui.shadcn",
        reason: "ui.shadcn defaults primitive-engine to primitive-engine.base-ui.",
      },
    ])
  })

  it("lets explicit selections override defaults", () => {
    const result = resolve(["ui.shadcn", "primitive-engine.radix-ui"])

    expect(result.effectiveSelections).toContain("primitive-engine.radix-ui")
    expect(result.effectiveSelections).not.toContain("primitive-engine.base-ui")
    expect(result.defaultsApplied).toEqual([])
  })

  it("returns a clear conflict for missing capability providers", () => {
    const catalog = testCatalog.filter((manifest) => manifest.id !== "component.button")
    const result = resolve(["block.navbar"], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message === 'No provider found for capability "ui.button".' &&
          conflict.reason === "block.navbar requires ui.button, but no catalog module provides it.",
      ),
    ).toBe(true)
  })

  it("returns a clear conflict for ambiguous capability providers", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "component.button",
        type: "primitive",
        label: "Button",
        provides: ["ui.button"],
      },
      {
        id: "component.alt-button",
        type: "primitive",
        label: "Alternate Button",
        provides: ["ui.button"],
      },
      {
        id: "block.button-consumer",
        type: "block",
        label: "Button Consumer",
        requires: [
          {
            capability: "ui.button",
            reason: "Button Consumer needs a button.",
          },
        ],
      },
    ]

    const result = resolve(["block.button-consumer"], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message === 'Ambiguous providers for capability "ui.button".' &&
          conflict.reason === "Multiple modules provide ui.button; choose one explicitly.",
      ),
    ).toBe(true)
  })

  it("returns a clear conflict for circular dependencies", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "tooling.a",
        type: "tooling",
        label: "Tooling A",
        requires: [{ moduleId: "tooling.b", reason: "A requires B." }],
      },
      {
        id: "tooling.b",
        type: "tooling",
        label: "Tooling B",
        requires: [{ moduleId: "tooling.c", reason: "B requires C." }],
      },
      {
        id: "tooling.c",
        type: "tooling",
        label: "Tooling C",
        requires: [{ moduleId: "tooling.a", reason: "C requires A." }],
      },
    ]

    const result = resolve(["tooling.a"], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message ===
            "Circular dependency detected: tooling.a -> tooling.b -> tooling.c -> tooling.a." &&
          conflict.severity === "error",
      ),
    ).toBe(true)
  })

  it("collects packages from effective selections", () => {
    const result = resolve(["ui.shadcn"])

    expect(result.packages.dependencies).toMatchObject({
      "@base-ui-components/react": "latest",
      "class-variance-authority": "latest",
    })
    expect(result.packages.devDependencies).toMatchObject({
      tailwindcss: "latest",
    })
  })

  it("collects files from effective selections", () => {
    const result = resolve(["block.navbar"])

    expect(result.files).toEqual(
      expect.arrayContaining([
        {
          from: "blocks/navbar.tsx",
          to: "src/components/blocks/navbar.tsx",
        },
        {
          from: "components/ui/button.tsx",
          to: "src/components/ui/button.tsx",
        },
      ]),
    )
  })

  it("returns a clear conflict for file target collisions", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "block.alpha",
        type: "block",
        label: "Alpha",
        files: [{ from: "blocks/alpha.tsx", to: "src/components/blocks/shared.tsx" }],
      },
      {
        id: "block.beta",
        type: "block",
        label: "Beta",
        files: [{ from: "blocks/beta.tsx", to: "src/components/blocks/shared.tsx" }],
      },
    ]

    const result = resolve(["block.alpha", "block.beta"], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message === 'File target collision at "src/components/blocks/shared.tsx".' &&
          conflict.severity === "error",
      ),
    ).toBe(true)
  })

  it("expands a preset passed as presetId", () => {
    const catalog: ModuleManifest[] = [
      ...testCatalog,
      {
        id: "preset.react",
        type: "preset",
        label: "React Preset",
        selections: ["block.navbar"],
      },
    ]

    const result = resolveRecipe({
      presetId: "preset.react",
      userSelections: [],
      catalog,
    })

    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining([
        "preset.react",
        "block.navbar",
        "component.button",
        "ui.shadcn",
        "styling.tailwind",
      ]),
    )
    expect(result.selectionReasons["block.navbar"]).toEqual([
      {
        type: "preset",
        presetId: "preset.react",
      },
    ])
  })

  it("expands a preset selected by the user", () => {
    const catalog: ModuleManifest[] = [
      ...testCatalog,
      {
        id: "preset.react",
        type: "preset",
        label: "React Preset",
        selections: ["block.navbar"],
      },
    ]

    const result = resolve(["preset.react"], catalog)

    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining(["preset.react", "block.navbar", "component.input"]),
    )
    expect(result.selectionReasons["preset.react"]).toEqual([
      {
        type: "user",
      },
    ])
  })

  it("applies preset defaults and lets explicit selections override them", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "framework.react",
        type: "framework",
        label: "React",
      },
      {
        id: "styling.tailwind",
        type: "styling",
        label: "Tailwind",
        group: {
          id: "styling",
          mode: "at-most-one",
        },
      },
      {
        id: "styling.css-modules",
        type: "styling",
        label: "CSS Modules",
        group: {
          id: "styling",
          mode: "at-most-one",
        },
      },
      {
        id: "preset.minimal",
        type: "preset",
        label: "Minimal Preset",
        selections: ["framework.react"],
        defaults: {
          styling: "styling.tailwind",
        },
      },
    ]

    const defaulted = resolveRecipe({
      presetId: "preset.minimal",
      userSelections: [],
      catalog,
    })
    const overridden = resolveRecipe({
      presetId: "preset.minimal",
      userSelections: ["styling.css-modules"],
      catalog,
    })

    expect(defaulted.effectiveSelections).toContain("styling.tailwind")
    expect(defaulted.defaultsApplied).toEqual([
      {
        key: "styling",
        value: "styling.tailwind",
        defaultedBy: "preset.minimal",
        reason: "preset.minimal defaults styling to styling.tailwind.",
      },
    ])
    expect(overridden.effectiveSelections).toContain("styling.css-modules")
    expect(overridden.effectiveSelections).not.toContain("styling.tailwind")
  })

  it("expands nested presets", () => {
    const catalog: ModuleManifest[] = [
      ...testCatalog,
      {
        id: "preset.react",
        type: "preset",
        label: "React Preset",
        selections: ["block.navbar"],
      },
      {
        id: "preset.dashboard",
        type: "preset",
        label: "Dashboard Preset",
        selections: ["preset.react", "block.sidebar"],
      },
    ]

    const result = resolveRecipe({
      presetId: "preset.dashboard",
      userSelections: [],
      catalog,
    })

    expect(result.effectiveSelections).toEqual(
      expect.arrayContaining(["preset.dashboard", "preset.react", "block.navbar", "block.sidebar"]),
    )
    expect(result.selectionReasons["preset.react"]).toEqual([
      {
        type: "preset",
        presetId: "preset.dashboard",
      },
    ])
    expect(result.selectionReasons["block.navbar"]).toEqual([
      {
        type: "preset",
        presetId: "preset.react",
      },
    ])
  })

  it("returns a clear conflict for circular presets", () => {
    const catalog: ModuleManifest[] = [
      {
        id: "preset.alpha",
        type: "preset",
        label: "Alpha Preset",
        selections: ["preset.beta"],
      },
      {
        id: "preset.beta",
        type: "preset",
        label: "Beta Preset",
        selections: ["preset.alpha"],
      },
    ]

    const result = resolve(["preset.alpha"], catalog)

    expect(
      hasConflict(
        result,
        (conflict) =>
          conflict.message ===
            "Circular dependency detected: preset.alpha -> preset.beta -> preset.alpha." &&
          conflict.severity === "error",
      ),
    ).toBe(true)
  })
})
