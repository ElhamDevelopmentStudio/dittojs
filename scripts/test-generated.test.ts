import { mkdtemp, mkdir, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"

import { describe, expect, it } from "vitest"

import { discoverGeneratedTemplates, validateGeneratedPackageJson } from "./test-generated"

async function makeTempRoot(): Promise<string> {
  return mkdtemp(path.join(tmpdir(), "ditto-generated-test-"))
}

describe("validateGeneratedPackageJson", () => {
  it("accepts a private generated package with concrete dependency ranges", () => {
    expect(
      validateGeneratedPackageJson({
        name: "react-recommended",
        private: true,
        scripts: {
          typecheck: "tsc --noEmit",
          build: "tsc -b && vite build",
        },
        engines: {
          node: "^20.19.0 || >=22.12.0",
        },
        dependencies: {
          react: "^19.2.7",
        },
        devDependencies: {
          vite: "^8.1.3",
        },
      }),
    ).toEqual({
      valid: true,
      issues: [],
    })
  })

  it("rejects invalid generated package metadata and latest dependency ranges", () => {
    const result = validateGeneratedPackageJson({
      name: "",
      private: false,
      scripts: {
        typecheck: "",
      },
      engines: {
        node: ">=18",
      },
      dependencies: {
        axios: "1.18.1",
        react: "latest",
        zod: "*",
      },
      devDependencies: {
        react: "^19.2.7",
        vite: "",
      },
    })

    expect(result.valid).toBe(false)
    expect(result.issues).toEqual(
      expect.arrayContaining([
        "package.json must include a non-empty name.",
        "package.json must set private to true.",
        "scripts.typecheck must exist.",
        "scripts.build must exist.",
        "engines.node must be ^20.19.0 || >=22.12.0.",
        "dependencies.axios must use a caret version range.",
        "dependencies.react must use a concrete non-latest version range.",
        "dependencies.zod must use a concrete non-latest version range.",
        "devDependencies.vite must use a concrete non-latest version range.",
        "react must not appear in both dependencies and devDependencies.",
      ]),
    )
  })
})

describe("discoverGeneratedTemplates", () => {
  it("ignores placeholder-only directories and reports generated directories", async () => {
    const generatedRoot = await makeTempRoot()
    const emptyFixture = path.join(generatedRoot, "empty")
    const generatedFixture = path.join(generatedRoot, "react-recommended")

    await mkdir(emptyFixture)
    await mkdir(generatedFixture)
    await writeFile(path.join(emptyFixture, ".gitkeep"), "", "utf8")
    await writeFile(path.join(generatedFixture, ".gitkeep"), "", "utf8")
    await writeFile(path.join(generatedFixture, "package.json"), "{}", "utf8")

    await expect(discoverGeneratedTemplates(generatedRoot)).resolves.toEqual([
      {
        name: "react-recommended",
        directory: generatedFixture,
        hasPackageJson: true,
      },
    ])
  })

  it("keeps non-empty directories without package.json so validation can fail clearly", async () => {
    const generatedRoot = await makeTempRoot()
    const brokenFixture = path.join(generatedRoot, "broken")

    await mkdir(brokenFixture)
    await writeFile(path.join(brokenFixture, "README.md"), "broken\n", "utf8")

    await expect(discoverGeneratedTemplates(generatedRoot)).resolves.toEqual([
      {
        name: "broken",
        directory: brokenFixture,
        hasPackageJson: false,
      },
    ])
  })
})
