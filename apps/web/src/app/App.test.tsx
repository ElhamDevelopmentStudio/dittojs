import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { catalog } from "@dittojs/catalog"
import { resolveRecipe } from "@dittojs/core"
import { describe, expect, test, vi } from "vitest"

import { App } from "./App"
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
  }
}

function rejectingGenerationClient(
  message = "Generation failed while writing files.",
): GenerationClient {
  return {
    generate: vi.fn(async () => {
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

  render(<App generationClient={resolvingGenerationClient()} />)
  await user.click(within(presetCard(title)).getByRole("button", { name: /Customize/ }))

  return user
}

describe("DittoJs web builder", () => {
  test("landing renders the four MVP presets", () => {
    render(<App generationClient={resolvingGenerationClient()} />)

    expect(screen.getByRole("heading", { name: "React Recommended" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "SaaS Dashboard" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Chat App" })).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Custom" })).toBeTruthy()
  })

  test("coming soon options are disabled and do not change selections", async () => {
    await customizePreset("Custom")

    const vueCard = screen.getByRole("button", { name: /Vue/ }) as HTMLButtonElement

    expect(vueCard.disabled).toBe(true)
    expect(vueCard.getAttribute("aria-pressed")).toBe("false")
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
  })

  test("Core Configuration shows Live Stack Summary", async () => {
    await customizePreset("React Recommended")

    expect(screen.getByRole("complementary", { name: "Live stack summary" })).toBeTruthy()
    expect(screen.getByText("Selected by you")).toBeTruthy()
  })

  test("selecting Navbar causes required dependencies to appear locked", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Navbar/ }))

    expect(screen.getAllByText(/Navbar uses Button for navigation actions/).length).toBeGreaterThan(
      0,
    )
    expect(screen.getAllByText(/Navbar uses Input for search/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Navbar uses Avatar for the user menu/).length).toBeGreaterThan(0)
    expect(screen.getAllByText(/Navbar uses Dropdown for account actions/).length).toBeGreaterThan(
      0,
    )
  })

  test("locked dependency cannot be removed directly", async () => {
    const user = await customizePreset("Custom")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Navbar/ }))
    await user.click(screen.getByRole("button", { name: /Button/ }))

    expect(screen.getByRole("status").textContent).toContain("Navbar uses Button")
    expect(screen.getAllByText(/Navbar uses Button for navigation actions/).length).toBeGreaterThan(
      0,
    )
  })

  test("Project Structure selection overrides preset default", async () => {
    const user = await customizePreset("Chat App")

    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Continue/ }))
    await user.click(screen.getByRole("button", { name: /Route-colocated/ }))
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
    expect(screen.getByText("Resolver Decisions")).toBeTruthy()
    expect(screen.getByText("Template Checks")).toBeTruthy()
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

  test("Copy CLI writes to clipboard", async () => {
    const user = userEvent.setup()
    const clipboardWrite = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined)

    render(
      <App
        generationClient={resolvingGenerationClient()}
        initialStep="review"
        initialPresetId="preset.react-recommended"
      />,
    )
    await user.click(screen.getByRole("button", { name: /Copy CLI/ }))

    expect(clipboardWrite).toHaveBeenCalledWith(
      expect.stringContaining("pnpm dlx dittojs generate"),
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
      name: /Generate Template/,
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
    await user.click(screen.getByRole("button", { name: /Generate Template/ }))

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
    await user.click(screen.getByRole("button", { name: /Generate Template/ }))

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
    await user.click(screen.getByRole("button", { name: /Generate Template/ }))
    await screen.findByRole("heading", { name: "Template generated." })
    await user.click(screen.getByRole("button", { name: /Download ZIP/ }))

    await waitFor(() => expect(URL.createObjectURL).toHaveBeenCalled())
    expect(anchorClick).toHaveBeenCalled()
  })
})
