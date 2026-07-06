import { mkdtemp, rm } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { describe, expect, test } from "vitest"

import { generateTemplateArchive } from "./generation"

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
          projectName: "ditto-template",
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
