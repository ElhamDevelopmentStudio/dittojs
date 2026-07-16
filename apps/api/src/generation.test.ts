import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { describe, expect, test } from "vitest"

import { generateTemplateArchive } from "./generation.js"
import { createGenerationServer } from "./server.js"
import { MemoryTemplateStore } from "./template-store.js"
import { generateSavedTemplate, requireSavedTemplate, saveTemplate } from "./templates.js"

async function withTemporaryRoot<T>(callback: (temporaryRoot: string) => Promise<T>): Promise<T> {
  const temporaryRoot = await mkdtemp(path.join(tmpdir(), "ditto-api-test-"))

  try {
    return await callback(temporaryRoot)
  } finally {
    await rm(temporaryRoot, { recursive: true, force: true })
  }
}

describe("generateTemplateArchive", () => {
  test("generates a real zip archive from a resolved recipe", async () => {
    await withTemporaryRoot(async (temporaryRoot) => {
      const result = await generateTemplateArchive(
        {
          presetId: "preset.custom",
          userSelections: ["block.navbar"],
          projectName: "---ditto-template---",
        },
        {
          temporaryRoot,
          templateRoot: path.resolve(process.cwd(), "../..", "packages", "registry"),
          createdAt: "2026-07-06T00:00:00.000Z",
        },
      )
      const archive = Buffer.from(result.archiveBase64, "base64")

      expect(archive.subarray(0, 2).toString("utf8")).toBe("PK")
      expect(result.mimeType).toBe("application/zip")
      expect(result.fileName).toBe("ditto-template.zip")
      expect(result.generation.filesGenerated).toBeGreaterThan(0)
      expect(result.resolvedRecipe.effectiveSelections).toContain("block.navbar")
      expect(result.resolvedRecipe.metadata.packageVersionPolicy).toBe("caret")
    })
  })

  test("throws a resolver-conflict error for blocking conflicts", async () => {
    await expect(
      generateTemplateArchive({
        userSelections: ["missing.module"],
      }),
    ).rejects.toMatchObject({
      code: "resolver-conflict",
      statusCode: 422,
    })
  })
})

describe("saved templates", () => {
  test("saves explicit intent and regenerates it with a project name", async () => {
    await withTemporaryRoot(async (temporaryRoot) => {
      const store = new MemoryTemplateStore()
      const saved = await saveTemplate(
        {
          presetId: "preset.custom",
          userSelections: ["block.navbar"],
        },
        store,
      )
      const record = await requireSavedTemplate(saved.templateId, store)
      const generated = await generateSavedTemplate(
        saved.templateId,
        { projectName: "My Dashboard" },
        store,
        {
          temporaryRoot,
          templateRoot: path.resolve(process.cwd(), "../..", "packages", "registry"),
          createdAt: "2026-07-16T00:00:00.000Z",
        },
      )

      expect(saved.templateId).toMatch(/^tpl_[A-Za-z0-9_-]{22}$/)
      expect(record.userSelections).toEqual(["block.navbar"])
      expect(generated.fileName).toBe("my-dashboard.zip")
      expect(generated.resolvedRecipe.effectiveSelections).toContain("block.navbar")
    })
  })

  test("rejects invalid saved recipes and unknown template ids", async () => {
    const store = new MemoryTemplateStore()

    await expect(saveTemplate({ userSelections: ["missing.module"] }, store)).rejects.toMatchObject(
      { code: "resolver-conflict", statusCode: 422 },
    )
    await expect(
      generateSavedTemplate("tpl_1234567890123456789012", { projectName: "app" }, store),
    ).rejects.toMatchObject({ code: "template-not-found", statusCode: 404 })
  })
})

describe("template HTTP API", () => {
  test("creates and generates a saved template through public routes", async () => {
    await withTemporaryRoot(async (temporaryRoot) => {
      const server = createGenerationServer({
        templateStore: new MemoryTemplateStore(),
        generation: {
          temporaryRoot,
          templateRoot: path.resolve(process.cwd(), "../..", "packages", "registry"),
          createdAt: "2026-07-16T00:00:00.000Z",
        },
      })

      await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve))

      try {
        const address = server.address()
        const port = typeof address === "object" && address !== null ? address.port : undefined
        const baseUrl = `http://127.0.0.1:${port}`
        const savedResponse = await globalThis.fetch(`${baseUrl}/api/templates`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ presetId: "preset.custom", userSelections: [] }),
        })
        const saved = (await savedResponse.json()) as { templateId: string }
        const generatedResponse = await globalThis.fetch(
          `${baseUrl}/api/templates/${saved.templateId}/generate`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ projectName: "HTTP App" }),
          },
        )
        const generated = (await generatedResponse.json()) as { fileName: string }

        expect(savedResponse.status).toBe(201)
        expect(generatedResponse.status).toBe(200)
        expect(generated.fileName).toBe("http-app.zip")
      } finally {
        await new Promise<void>((resolve, reject) =>
          server.close((error) => (error === undefined ? resolve() : reject(error))),
        )
      }
    })
  })
})
