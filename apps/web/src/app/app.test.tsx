import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { catalog } from "@dittosh/catalog"
import { resolveRecipe } from "@dittosh/core"
import { describe, expect, test, vi } from "vitest"

import { App } from "./app"
import {
  allSelectableOptions,
  coreOptionGroups,
  featureOptionGroups,
  presetOptions,
  projectStructureOptions,
} from "../builder/builder-options"
import { isAppIconName } from "../components/icons"
import { registryPreviewIds } from "../previews/preview-capabilities"
import type {
  GenerationClient,
  GenerationRequest,
  GenerationResponse,
} from "../services/generation-client"

const emptyZipBase64 = "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA=="

function generationResponse(request: GenerationRequest): GenerationResponse {
  const input: {
    catalog: typeof catalog
    userSelections: string[]
    presetId?: string
  } = {
    catalog,
    userSelections: request.userSelections,
  }

  if (request.presetId !== undefined) {
    input.presetId = request.presetId
  }

  return {
    fileName: "ditto-template.zip",
    mimeType: "application/zip",
    archiveBase64: emptyZipBase64,
    archiveByteLength: 22,
    resolvedRecipe: resolveRecipe(input),
    generation: {
      filesWritten: ["package.json", "src/main.tsx"],
      filesGenerated: 2,
      warnings: [],
    },
  }
}

function resolvingGenerationClient(): GenerationClient {
  return {
    generate: vi.fn(async (request) => generationResponse(request)),
    saveTemplate: vi.fn(async () => ({
      templateId: "tpl_1234567890123456789012",
      createdAt: "2026-07-16T00:00:00.000Z",
      catalogVersion: "1",
    })),
  }
}

function rejectingGenerationClient(
  message = "Generation failed while writing files.",
): GenerationClient {
  return {
    generate: vi.fn(async () => {
      throw new Error(message)
    }),
    saveTemplate: vi.fn(async () => {
      throw new Error(message)
    }),
  }
}

function presetCard(title: string): HTMLElement {
  const heading = screen.getByRole("heading", { name: title })
  const card = heading.closest("article")

  if (card === null) {
    throw new Error(`Preset card "${title}" was not found.`)
  }

  return card
}

async function customizePreset(title: string) {
  const user = userEvent.setup()

  window.history.replaceState({}, "", "/")
  render(<App generationClient={resolvingGenerationClient()} />)
  await user.click(within(presetCard(title)).getByRole("button", { name: /Customize/ }))

  return user
}

describe("DittoJs web builder", () => {
  test("landing renders the four MVP presets", () => {
    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByText("Name inspired by Ben 10's Ditto.")).toBeTruthy()
    expect(screen.getByRole("heading", { name: "React Recommended" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "SaaS Dashboard" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Chat App" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Custom" })).toBeTruthy()
  })

  test("Make a copy navigation opens Core Configuration", async () => {
    const user = userEvent.setup()

    render(<App generationClient={resolvingGenerationClient()} />)
    await user.click(screen.getByRole("button", { name: "Make a copy" }))

    expect(screen.getByRole("heading", { name: "Core Configuration" })).toBeTruthy()
    await waitFor(() => expect(window.location.pathname).toBe("/templates/core"))
  })

  test("Core Configuration lists catalog-backed options without synthetic coming-soon choices", async () => {
    await customizePreset("Custom")

    for (const group of coreOptionGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy()

      for (const option of group.options) {
        expect(
          screen.getAllByRole("button", { name: new RegExp(option.label) }).length,
        ).toBeGreaterThan(0)
      }
    }

    expect(screen.queryByRole("button", { name: /Vue/ })).toBeNull()
    expect(screen.queryByRole("button", { name: /Svelte/ })).toBeNull()
    expect(screen.getByText("No resolver warnings or conflicts.")).toBeTruthy()
  })

  test("preset Create goes to Review with a resolved recipe", async () => {
    const user = userEvent.setup()

    render(<App generationClient={resolvingGenerationClient()} />)
    await user.click(
      within(presetCard("React Recommended")).getByRole("button", { name: /Create/ }),
    )

    expect(screen.getByRole("heading", { name: "Your Template Is Ready." })).toBeTruthy()
    expect(screen.getByText("React + Vite")).toBeTruthy()
  })

  test("preset Customize goes to Core Configuration", async () => {
    await customizePreset("React Recommended")

    expect(screen.getByRole("heading", { name: "Core Configuration" })).toBeTruthy()
    await waitFor(() => expect(window.location.pathname).toBe("/templates/core"))
  })

  test("builder steps are reflected in the URL", async () => {
    const user = await customizePreset("React Recommended")

    await waitFor(() => expect(window.location.pathname).toBe("/templates/core"))
    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await waitFor(() => expect(window.location.pathname).toBe("/templates/features"))
    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await waitFor(() => expect(window.location.pathname).toBe("/templates/structure"))
    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await waitFor(() => expect(window.location.pathname).toBe("/templates/review"))
  })

  test("direct builder URLs open the matching page", () => {
    window.history.replaceState({}, "", "/templates/structure")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("heading", { name: "Project Structure" })).toBeTruthy()
    expect(window.location.pathname).toBe("/templates/structure")
  })

  test("Core Configuration shows Resolver Ledger sections", async () => {
    await customizePreset("React Recommended")

    expect(screen.getByRole("complementary", { name: "Resolver ledger" })).toBeTruthy()
    expect(screen.getByText("Selected by you")).toBeTruthy()
    expect(screen.getByText("Added automatically")).toBeTruthy()
    expect(screen.getByText("Locked dependencies")).toBeTruthy()
  })

  test("Features step lists every feature catalog group", async () => {
    const user = await customizePreset("React Recommended")

    await user.click(screen.getByRole("button", { name: /Continue/ }))

    for (const group of featureOptionGroups) {
      expect(screen.getByRole("heading", { name: group.title })).toBeTruthy()
      expect(
        screen.getAllByRole("button", { name: new RegExp(group.options[0]?.label ?? "") }).length,
      ).toBeGreaterThan(0)
    }

    expect(screen.getAllByRole("button", { name: /Accordion/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole("button", { name: /Dashboard layout/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole("button", { name: /Analytics dashboard/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole("button", { name: /Main Chat Data/ }).length).toBeGreaterThan(0)
    expect(screen.getAllByRole("button", { name: /React Router/ }).length).toBeGreaterThan(0)
  })

  test("builder option exports cover every catalog manifest and icon", () => {
    const presetIds = new Set(presetOptions.map((option) => option.id))
    const selectableIds = new Set(allSelectableOptions.map((option) => option.moduleId))

    for (const manifest of catalog) {
      if (manifest.type === "preset") {
        expect(presetIds.has(manifest.id)).toBe(true)
      } else {
        expect(selectableIds.has(manifest.id)).toBe(true)
      }

      expect(isAppIconName(manifest.ui?.icon), `${manifest.id} icon`).toBe(true)
    }
  })

  test("only catalog items with executable registry scenarios expose previews", () => {
    for (const option of allSelectableOptions) {
      const manifest = catalog.find((candidate) => candidate.id === option.moduleId)

      expect(manifest, `${option.moduleId} manifest`).toBeDefined()

      if (manifest === undefined) {
        continue
      }

      if (registryPreviewIds.has(manifest.id)) {
        expect(option.preview?.id, `${manifest.id} preview id`).toBe(`preview.${manifest.id}`)
      } else {
        expect(option.preview, `${manifest.id} preview`).toBeUndefined()
      }
    }
  })

  test("Preview action opens an iframe modal without toggling selection", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: "Preview Button" }))

    const dialog = screen.getByRole("dialog", { name: "Button" })
    const iframe = within(dialog).getByTitle("Button preview")

    expect(iframe.getAttribute("src")).toBe("/preview/preview.component.button")
    expect(
      screen
        .getByRole("button", { name: /primitiveButtonButton component/ })
        .getAttribute("aria-pressed"),
    ).toBe("false")
  })

  test("direct preview routes render the actual registry component", async () => {
    window.history.replaceState({}, "", "/preview/preview.component.button")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "Button preview" })).toBeTruthy()
    expect(
      await screen.findByRole("button", { name: "Make a copy" }, { timeout: 5_000 }),
    ).toBeTruthy()
    expect(screen.getByRole("button", { name: "View manifest" })).toBeTruthy()
  })

  test("registry previews render real component content instead of a generic manifest card", async () => {
    window.history.replaceState({}, "", "/preview/preview.component.accordion")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "Accordion preview" })).toBeTruthy()
    expect(await screen.findByRole("button", { name: "Why the name Ditto?" })).toBeTruthy()
    expect(screen.getByText("One validated source becomes many independent projects.")).toBeTruthy()
    expect(screen.queryByText("component.accordion")).toBeNull()
  })

  test("registry block previews execute the actual block source", async () => {
    window.history.replaceState({}, "", "/preview/preview.block.settings-form")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "Settings Form preview" })).toBeTruthy()
    expect(await screen.findByRole("heading", { name: "Workspace settings" })).toBeTruthy()
    expect(screen.getByLabelText("Workspace name")).toHaveProperty("value", "Ditto Workspace")
    expect(screen.getByRole("button", { name: "Save settings" })).toBeTruthy()
  })

  test("generated dashboard block previews execute the generated sidebar source", async () => {
    window.history.replaceState({}, "", "/preview/preview.block.dashboard-sidebar")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "Dashboard sidebar preview" })).toBeTruthy()
    expect(await screen.findByText("Studio Admin", {}, { timeout: 5_000 })).toBeTruthy()
    expect(screen.getByRole("link", { name: "Default" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Quick Create" })).toBeTruthy()
  })

  test("generated page previews execute the complete dashboard page source", async () => {
    window.history.replaceState({}, "", "/preview/preview.composition.dashboard-default")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "Dashboard default preview" })).toBeTruthy()
    expect(await screen.findByText("Total Revenue", {}, { timeout: 5_000 })).toBeTruthy()
    expect(screen.getByText("Customer Activity")).toBeTruthy()
    expect(screen.getByText("18,426 Customers")).toBeTruthy()
  })

  test("generated app composition previews execute the generated app root", async () => {
    window.history.replaceState({}, "", "/preview/preview.composition.react-recommended")

    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("main", { name: "React Recommended preview" })).toBeTruthy()
    expect(await screen.findByRole("heading", { name: "Ditto React App" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Project intake" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Save project" })).toBeTruthy()
  })

  test("iframe-only page wrappers do not advertise standalone previews", () => {
    for (const moduleId of ["composition.dashboard-chat", "composition.dashboard-mail"]) {
      const manifest = catalog.find((candidate) => candidate.id === moduleId)

      expect(manifest?.metadata?.preview, `${moduleId} preview`).toBeUndefined()
      expect(registryPreviewIds.has(moduleId), `${moduleId} capability`).toBe(false)
    }
  })

  test("Project Structure lists catalog-backed structures", async () => {
    const user = await customizePreset("React Recommended")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Continue/ }))

    for (const option of projectStructureOptions) {
      expect(screen.getByRole("button", { name: new RegExp(option.label) })).toBeTruthy()
    }
  })

  test("Core Configuration exposes foundation modules directly", async () => {
    await customizePreset("React Recommended")

    expect(
      screen.getByRole("button", {
        name: /Fast frontend tooling for React projects/,
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole("button", {
        name: /Copy-and-own React component library conventions/,
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole("button", {
        name: /Form state and validation integration for React/,
      }),
    ).toBeTruthy()
    expect(
      screen.getByRole("button", {
        name: /TypeScript language and typechecking support/,
      }),
    ).toBeTruthy()
  })

  test("recommendation badges use metadata-backed tooltip labels", async () => {
    await customizePreset("React Recommended")

    expect(
      screen.getByLabelText(
        "Recommended: Recommended because React is the supported MVP framework.",
      ),
    ).toBeTruthy()
  })

  test("selecting optional foundation modules updates resolver state", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /React Hook Form/ }))

    expect(
      screen.getByRole("button", { name: /React Hook Form/ }).getAttribute("aria-pressed"),
    ).toBe("true")
    expect(screen.getAllByText("React Hook Form").length).toBeGreaterThan(0)
  })

  test("form and validation modules can be selected independently from the catalog", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /React Hook Form/ }))
    await user.click(screen.getByRole("button", { name: /Zod/ }))

    expect(
      screen.getByRole("button", { name: /React Hook Form/ }).getAttribute("aria-pressed"),
    ).toBe("true")
    expect(screen.getByRole("button", { name: /Zod/ }).getAttribute("aria-pressed")).toBe("true")
  })

  test("Resolver Ledger can be hidden and expanded", async () => {
    const user = await customizePreset("React Recommended")
    const summary = screen.getByRole("complementary", { name: "Resolver ledger" })

    await user.click(within(summary).getByRole("button", { name: "Hide resolver ledger" }))

    expect(within(summary).getByText("Summary hidden.")).toBeTruthy()
    expect(within(summary).queryByText("Selected by you")).toBeNull()

    await user.click(within(summary).getByRole("button", { name: "Show resolver ledger" }))

    expect(within(summary).getByText("Selected by you")).toBeTruthy()
  })

  test("selecting Navbar causes required dependencies to appear locked", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    const navbarButton = screen
      .getAllByRole("button", { name: /Navbar/ })
      .find((button) => button.getAttribute("aria-pressed") !== null)

    expect(navbarButton).toBeDefined()
    await user.click(navbarButton!)

    expect(screen.getByText("Dashboard layout is locked because Navbar requires it.")).toBeTruthy()
    expect(screen.getAllByText(/Dashboard layout renders Button controls/).length).toBeGreaterThan(
      0,
    )
    expect(screen.getAllByText(/Sidebar account controls render Avatar/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Sidebar menus use Dropdown Menu/).length).toBeGreaterThan(0)
  })

  test("locked dependency cannot be removed directly", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    const navbarButton = screen
      .getAllByRole("button", { name: /Navbar/ })
      .find((button) => button.getAttribute("aria-pressed") !== null)

    expect(navbarButton).toBeDefined()
    await user.click(navbarButton!)
    await user.click(screen.getByRole("button", { name: /primitiveButtonButton component/ }))

    expect(screen.getByRole("status").textContent).toContain(
      "Dashboard layout renders Button controls",
    )
    expect(screen.getAllByText(/Dashboard layout renders Button controls/).length).toBeGreaterThan(
      0,
    )
  })

  test("Project Structure selection overrides preset default", async () => {
    const user = await customizePreset("Chat App")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Route colocated/ }))
    await user.click(screen.getByRole("button", { name: /Continue/ }))

    expect(screen.getAllByText("Route colocated").length).toBeGreaterThan(0)
  })

  test("Review page shows stack summary, dependency resolution, and validation checks", () => {
    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )

    expect(screen.getByText("Resolved Template")).toBeTruthy()
    expect(screen.getByText("Resolver Ledger")).toBeTruthy()
    expect(screen.getByText("Stamped Checks")).toBeTruthy()
  })

  test("View JSON Manifest opens a manifest modal", async () => {
    const user = userEvent.setup()

    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.click(screen.getByRole("button", { name: /View JSON Manifest/ }))

    expect(screen.getByRole("dialog", { name: "JSON Manifest" })).toBeTruthy()
    expect(screen.getByText(/effectiveSelections/)).toBeTruthy()
  })

  test("saving a template returns an ID and copies the create-ditto command", async () => {
    const user = userEvent.setup()
    const clipboardWrite = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined)

    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.click(screen.getByRole("button", { name: /Get Template ID/ }))
    expect(await screen.findByText("tpl_1234567890123456789012")).toBeTruthy()
    await user.click(screen.getByRole("button", { name: /Copy CLI Command/ }))

    expect(clipboardWrite).toHaveBeenCalledWith(
      "npx create-ditto --template-id tpl_1234567890123456789012",
    )
    expect(screen.getByText("CLI command copied.")).toBeTruthy()
  })

  test("Generate button is disabled on blocking resolver conflict", () => {
    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialUserSelections={["missing.module"]}
      />,
    )

    const generateButton = screen.getByRole("button", {
      name: /Download ZIP/,
    }) as HTMLButtonElement

    expect(generateButton.disabled).toBe(true)
    expect(screen.getByText("Generation blocked by resolver conflicts.")).toBeTruthy()
  })

  test("generation success shows Success / Download page", async () => {
    const user = userEvent.setup()
    const generationClient = resolvingGenerationClient()

    render(
      <App
        generationClient={generationClient}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.clear(screen.getByLabelText("Project name"))
    await user.type(screen.getByLabelText("Project name"), "My Dashboard")
    await user.click(screen.getByRole("button", { name: /Download ZIP/ }))

    expect(generationClient.generate).toHaveBeenCalledWith(
      expect.objectContaining({ projectName: "My Dashboard" }),
    )

    expect(await screen.findByRole("heading", { name: "Template generated." })).toBeTruthy()
    expect(screen.getByText("Your DittoJs template is ready to download.")).toBeTruthy()
  })

  test("generation failure shows error state with Retry and Back to Review", async () => {
    const user = userEvent.setup()

    render(
      <App
        generationClient={rejectingGenerationClient("Generation failed while writing files.")}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.click(screen.getByRole("button", { name: /Download ZIP/ }))

    expect(await screen.findByRole("heading", { name: "Generation failed" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy()
    await user.click(screen.getByRole("button", { name: "Back to Review" }))
    expect(screen.getByRole("heading", { name: "Your Template Is Ready." })).toBeTruthy()
  })

  test("Download ZIP action is wired to a generated archive response", async () => {
    const user = userEvent.setup()
    const anchorClick = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => undefined)

    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.click(screen.getByRole("button", { name: /Download ZIP/ }))
    await screen.findByRole("heading", { name: "Template generated." })
    await user.click(screen.getByRole("button", { name: /Download ZIP/ }))

    await waitFor(() => expect(URL.createObjectURL).toHaveBeenCalled())
    expect(anchorClick).toHaveBeenCalled()
  })
})
