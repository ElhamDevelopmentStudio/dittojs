import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import path from "node:path"
import { cwd } from "node:process"

import { afterEach, describe, expect, it } from "vitest"

import { PACKAGE_VERSION_POLICY, catalog, packageVersions } from "@dittojs/catalog"
import { resolveRecipe, type ResolvedRecipe } from "@dittojs/core"

import { generateProject } from "./index"
import { GENERATED_NODE_ENGINE, GENERATED_NODE_README_REQUIREMENT } from "./node-policy"

const createdAt = "2026-07-05T00:00:00.000Z"
const tempDirs: string[] = []
const invalidPackageVersions = new Set(["latest", "*", ""])

function resolvedRecipe(overrides: Partial<ResolvedRecipe> = {}): ResolvedRecipe {
  return {
    userSelections: ["framework.react"],
    effectiveSelections: ["framework.react"],
    selectionReasons: {
      "framework.react": [{ type: "user" }],
    },
    locks: {},
    conflicts: [],
    warnings: [],
    packages: {
      dependencies: {
        react: packageVersions.react.range,
      },
      devDependencies: {
        typescript: packageVersions.typescript.range,
        vite: packageVersions.vite.range,
      },
      peerDependencies: {},
    },
    files: [],
    defaultsApplied: [],
    metadata: {
      resolvedAt: createdAt,
    },
    ...overrides,
  }
}

function expectValidPackageVersions(packageMaps: Array<Record<string, string> | undefined>): void {
  for (const packageMap of packageMaps) {
    for (const [packageName, version] of Object.entries(packageMap ?? {})) {
      expect(version, `${packageName} should have a version`).toBeTruthy()
      expect(invalidPackageVersions.has(version), `${packageName} should not use ${version}`).toBe(
        false,
      )
      expect(version, `${packageName} should use a caret range`).toMatch(/^\^\d+\.\d+\.\d+/)
    }
  }
}

async function createTempDir(label: string): Promise<string> {
  const tempDir = await mkTemp(path.join(tmpdir(), `ditto-generator-${label}-`))
  tempDirs.push(tempDir)

  return tempDir
}

async function mkTemp(prefix: string): Promise<string> {
  const { mkdtemp } = await import("node:fs/promises")

  return mkdtemp(prefix)
}

async function readJson<T>(filePath: string): Promise<T> {
  return JSON.parse(await readFile(filePath, "utf8")) as T
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await stat(filePath)
    return true
  } catch {
    return false
  }
}

function registryTemplateRoot(): string {
  return path.resolve(cwd(), "..", "..", "packages", "registry")
}

function reactRecommendedRecipe(): ResolvedRecipe {
  const presetId = "preset.react-recommended"
  const resolved = resolveRecipe({
    catalog,
    presetId,
    userSelections: [],
  })

  return {
    ...resolved,
    metadata: {
      ...resolved.metadata,
      preset: presetId,
      presetId,
      packageVersionPolicy: PACKAGE_VERSION_POLICY.policy,
      generatedWithPackageVersionsAt: PACKAGE_VERSION_POLICY.generatedWithPackageVersionsAt,
    },
  }
}

afterEach(async () => {
  await Promise.all(
    tempDirs.splice(0).map((tempDir) => rm(tempDir, { recursive: true, force: true })),
  )
})

describe("generateProject", () => {
  it("writes package.json from resolved packages", async () => {
    const outputDir = await createTempDir("package-json")
    const result = await generateProject({
      resolvedRecipe: resolvedRecipe(),
      outputDir,
      projectName: "Test App",
      createdAt,
    })
    const packageJson = await readJson<{
      name: string
      scripts: Record<string, string>
      engines: Record<string, string>
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }>(path.join(outputDir, "package.json"))

    expect(result.filesWritten).toContain("package.json")
    expect(packageJson).toMatchObject({
      name: "test-app",
      scripts: {
        dev: "vite",
        build: "tsc -b && vite build",
        preview: "vite preview",
        typecheck: "tsc --noEmit",
      },
      engines: {
        node: GENERATED_NODE_ENGINE,
      },
      dependencies: {
        react: packageVersions.react.range,
      },
      devDependencies: {
        typescript: packageVersions.typescript.range,
        vite: packageVersions.vite.range,
      },
    })
    expectValidPackageVersions([packageJson.dependencies, packageJson.devDependencies])
  })

  it("writes ditto.generated.json metadata", async () => {
    const outputDir = await createTempDir("metadata")

    await generateProject({
      resolvedRecipe: resolvedRecipe({
        userSelections: ["preset.custom"],
        effectiveSelections: ["preset.custom", "framework.react"],
        metadata: {
          resolvedAt: createdAt,
          preset: "preset.custom",
        },
      }),
      outputDir,
      generatorVersion: "test-version",
      createdAt,
    })

    await expect(readJson(path.join(outputDir, "ditto.generated.json"))).resolves.toMatchObject({
      generator: "dittojs",
      generatorPackage: "@dittojs/generator",
      generatorVersion: "test-version",
      createdAt,
      preset: "preset.custom",
      userSelections: ["preset.custom"],
      effectiveSelections: ["preset.custom", "framework.react"],
      packages: {
        dependencies: {
          react: packageVersions.react.range,
        },
      },
      packageManager: "pnpm",
    })
  })

  it("writes selected project structure metadata", async () => {
    const outputDir = await createTempDir("structure-metadata")

    await generateProject({
      resolvedRecipe: resolvedRecipe({
        effectiveSelections: ["framework.react", "structure.react.simple"],
      }),
      outputDir,
      generatorVersion: "test-version",
      createdAt,
    })

    await expect(readJson(path.join(outputDir, "ditto.generated.json"))).resolves.toMatchObject({
      projectStructure: "structure.react.simple",
    })
  })

  it("writes README.md with stack and commands", async () => {
    const outputDir = await createTempDir("readme")

    await generateProject({
      resolvedRecipe: resolvedRecipe({
        effectiveSelections: ["framework.react", "tooling.vite", "styling.tailwind"],
      }),
      outputDir,
      projectName: "Readme App",
      createdAt,
    })

    const readme = await readFile(path.join(outputDir, "README.md"), "utf8")

    expect(readme).toContain("# Readme App")
    expect(readme).toContain("Generated by DittoJs.")
    expect(readme).toContain("## Stack Summary")
    expect(readme).toContain("- framework.react")
    expect(readme).toContain("## Requirements")
    expect(readme).toContain(GENERATED_NODE_README_REQUIREMENT)
    expect(readme).toContain("pnpm install")
    expect(readme).toContain("pnpm dev")
    expect(readme).toContain("pnpm build")
  })

  it("rejects unsafe target paths", async () => {
    const outputDir = await createTempDir("unsafe-target")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "safe.txt",
              to: "../outside.txt",
            },
          ],
        }),
        outputDir,
        templateRoot: outputDir,
        createdAt,
      }),
    ).rejects.toThrow(/Unsafe output target path/)

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "safe.txt",
              to: "/absolute.txt",
            },
          ],
        }),
        outputDir,
        templateRoot: outputDir,
        createdAt,
      }),
    ).rejects.toThrow(/absolute paths are not allowed/)
  })

  it("detects file collisions in resolved file mappings", async () => {
    const outputDir = await createTempDir("collisions")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "alpha.txt",
              to: "src/shared.txt",
            },
            {
              from: "beta.txt",
              to: "src/shared.txt",
            },
          ],
        }),
        outputDir,
        templateRoot: outputDir,
        createdAt,
      }),
    ).rejects.toThrow(/File target collision/)
  })

  it("copies a template file through a structure slot", async () => {
    const outputDir = await createTempDir("slot-copy-output")
    const templateRoot = await createTempDir("slot-copy-template")

    await mkdir(path.join(templateRoot, "blocks"), { recursive: true })
    await mkdir(path.join(templateRoot, "apps"), { recursive: true })
    await writeFile(
      path.join(templateRoot, "blocks", "navbar.tsx"),
      "export const Navbar = () => null\n",
      "utf8",
    )
    await writeFile(
      path.join(templateRoot, "apps", "App.tsx"),
      'import { Navbar } from "__DITTO_IMPORT_BLOCK_NAVBAR__"\n\nexport const App = Navbar\n',
      "utf8",
    )

    const result = await generateProject({
      resolvedRecipe: resolvedRecipe({
        effectiveSelections: ["framework.react", "structure.react.feature-based"],
        files: [
          {
            from: "apps/App.tsx",
            slot: "app-root",
            name: "app",
          },
          {
            from: "blocks/navbar.tsx",
            slot: "block",
            name: "navbar",
            feature: "layout",
          },
        ],
      }),
      outputDir,
      templateRoot,
      createdAt,
    })

    await expect(
      readFile(
        path.join(outputDir, "src", "features", "layout", "components", "navbar.tsx"),
        "utf8",
      ),
    ).resolves.toBe("export const Navbar = () => null\n")
    await expect(readFile(path.join(outputDir, "src", "App.tsx"), "utf8")).resolves.toBe(
      'import { Navbar } from "@/features/layout/components/navbar"\n\nexport const App = Navbar\n',
    )
    expect(result.filesWritten).toContain("src/features/layout/components/navbar.tsx")
    expect(result.filesWritten).toContain("src/App.tsx")
  })

  it("fails clearly when a template import token cannot be resolved", async () => {
    const outputDir = await createTempDir("unresolved-import-token")
    const templateRoot = await createTempDir("unresolved-import-token-template")

    await mkdir(path.join(templateRoot, "apps"), { recursive: true })
    await writeFile(
      path.join(templateRoot, "apps", "App.tsx"),
      'import { Missing } from "__DITTO_IMPORT_BLOCK_MISSING__"\n',
      "utf8",
    )

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          effectiveSelections: ["framework.react", "structure.react.simple"],
          files: [
            {
              from: "apps/App.tsx",
              slot: "app-root",
              name: "app",
            },
          ],
        }),
        outputDir,
        templateRoot,
        createdAt,
      }),
    ).rejects.toThrow(/unresolved Ditto import token/)
  })

  it("fails clearly when slot mappings have no selected structure", async () => {
    const outputDir = await createTempDir("slot-no-structure")
    const templateRoot = await createTempDir("slot-no-structure-template")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "templates/button.tsx",
              slot: "ui-component",
              name: "button",
            },
          ],
        }),
        outputDir,
        templateRoot,
        createdAt,
      }),
    ).rejects.toThrow(/Project structure selection is required/)
  })

  it("fails clearly when a file mapping has neither to nor slot", async () => {
    const outputDir = await createTempDir("mapping-missing-target")
    const templateRoot = await createTempDir("mapping-missing-target-template")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "templates/button.tsx",
            } as never,
          ],
        }),
        outputDir,
        templateRoot,
        createdAt,
      }),
    ).rejects.toThrow(/must include either to or slot/)
  })

  it("fails clearly when a file mapping has both to and slot", async () => {
    const outputDir = await createTempDir("mapping-ambiguous-target")
    const templateRoot = await createTempDir("mapping-ambiguous-target-template")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          effectiveSelections: ["framework.react", "structure.react.simple"],
          files: [
            {
              from: "templates/button.tsx",
              to: "src/components/ui/button.tsx",
              slot: "ui-component",
              name: "button",
            } as never,
          ],
        }),
        outputDir,
        templateRoot,
        createdAt,
      }),
    ).rejects.toThrow(/must use either to or slot, not both/)
  })

  it("respects resolver error conflicts", async () => {
    const outputDir = await createTempDir("resolver-conflicts")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          conflicts: [
            {
              moduleIds: ["block.alpha", "block.beta"],
              message: 'File target collision at "src/shared.txt".',
              reason: "Two selected modules write the same file.",
              severity: "error",
            },
          ],
        }),
        outputDir,
        createdAt,
      }),
    ).rejects.toThrow(/Cannot generate project with resolver errors/)
  })

  it("copies a simple template file", async () => {
    const outputDir = await createTempDir("copy-output")
    const templateRoot = await createTempDir("copy-template")

    await mkdir(path.join(templateRoot, "templates"), { recursive: true })
    await writeFile(
      path.join(templateRoot, "templates", "hello.txt"),
      "hello from template\n",
      "utf8",
    )

    const result = await generateProject({
      resolvedRecipe: resolvedRecipe({
        files: [
          {
            from: "templates/hello.txt",
            to: "src/hello.txt",
          },
        ],
      }),
      outputDir,
      templateRoot,
      createdAt,
    })

    await expect(readFile(path.join(outputDir, "src", "hello.txt"), "utf8")).resolves.toBe(
      "hello from template\n",
    )
    expect(result.filesWritten).toContain("src/hello.txt")
  })

  it("fails clearly when a mapped template file is missing", async () => {
    const outputDir = await createTempDir("missing-output")
    const templateRoot = await createTempDir("missing-template")

    await expect(
      generateProject({
        resolvedRecipe: resolvedRecipe({
          files: [
            {
              from: "templates/missing.txt",
              to: "src/missing.txt",
            },
          ],
        }),
        outputDir,
        templateRoot,
        createdAt,
      }),
    ).rejects.toThrow(/Template file "templates\/missing.txt" does not exist/)
  })

  it("does not resolve dependencies internally", async () => {
    const outputDir = await createTempDir("no-resolve-output")
    const templateRoot = await createTempDir("no-resolve-template")

    await mkdir(path.join(templateRoot, "blocks"), { recursive: true })
    await writeFile(
      path.join(templateRoot, "blocks", "navbar.tsx"),
      "export const Navbar = () => null\n",
      "utf8",
    )

    await generateProject({
      resolvedRecipe: resolvedRecipe({
        userSelections: ["block.navbar"],
        effectiveSelections: ["block.navbar"],
        packages: {
          dependencies: {},
          devDependencies: {},
          peerDependencies: {},
        },
        files: [
          {
            from: "blocks/navbar.tsx",
            to: "src/components/blocks/navbar.tsx",
          },
        ],
      }),
      outputDir,
      templateRoot,
      createdAt,
    })

    const packageJson = await readJson<{
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }>(path.join(outputDir, "package.json"))

    expect(packageJson.dependencies).toEqual({})
    expect(packageJson.devDependencies).toEqual({})
    await expect(
      exists(path.join(outputDir, "src", "components", "ui", "button.tsx")),
    ).resolves.toBe(false)
    await expect(
      readFile(path.join(outputDir, "src", "components", "blocks", "navbar.tsx"), "utf8"),
    ).resolves.toBe("export const Navbar = () => null\n")
  })

  it("generates React Recommended from the resolved catalog preset and registry files", async () => {
    const outputDir = await createTempDir("react-recommended")
    const resolvedRecipe = reactRecommendedRecipe()

    const result = await generateProject({
      resolvedRecipe,
      outputDir,
      templateRoot: registryTemplateRoot(),
      projectName: "React Recommended",
      generatorVersion: "test-version",
      createdAt,
    })
    const packageJson = await readJson<{
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
      engines: Record<string, string>
    }>(path.join(outputDir, "package.json"))
    const metadata = await readJson<{
      preset: string
      projectStructure: string
      packageVersionPolicy: string
      generatedWithPackageVersionsAt: string
      packageManager: string
      userSelections: string[]
      effectiveSelections: string[]
    }>(path.join(outputDir, "ditto.generated.json"))

    expect(result.filesWritten).toEqual(
      expect.arrayContaining([
        "package.json",
        "README.md",
        "ditto.generated.json",
        "src/App.tsx",
        "src/components/ui/button.tsx",
        "src/components/ui/form.tsx",
        "src/lib/axios.ts",
        "src/stores/app-store.ts",
      ]),
    )
    expect(packageJson.dependencies).toMatchObject({
      "@base-ui/react": packageVersions["@base-ui/react"].range,
      "@hookform/resolvers": packageVersions["@hookform/resolvers"].range,
      axios: packageVersions.axios.range,
      "class-variance-authority": packageVersions["class-variance-authority"].range,
      clsx: packageVersions.clsx.range,
      "lucide-react": packageVersions["lucide-react"].range,
      react: packageVersions.react.range,
      "react-dom": packageVersions["react-dom"].range,
      "react-hook-form": packageVersions["react-hook-form"].range,
      "tailwind-merge": packageVersions["tailwind-merge"].range,
      zod: packageVersions.zod.range,
      zustand: packageVersions.zustand.range,
    })
    expect(packageJson.devDependencies).toMatchObject({
      "@tailwindcss/vite": packageVersions["@tailwindcss/vite"].range,
      "@types/react": packageVersions["@types/react"].range,
      "@types/react-dom": packageVersions["@types/react-dom"].range,
      "@vitejs/plugin-react": packageVersions["@vitejs/plugin-react"].range,
      tailwindcss: packageVersions.tailwindcss.range,
      typescript: packageVersions.typescript.range,
      vite: packageVersions.vite.range,
    })
    expect(packageJson.engines).toEqual({
      node: GENERATED_NODE_ENGINE,
    })
    expect(packageJson.dependencies).not.toHaveProperty("postcss")
    expect(packageJson.dependencies).not.toHaveProperty("autoprefixer")
    expect(packageJson.devDependencies).not.toHaveProperty("postcss")
    expect(packageJson.devDependencies).not.toHaveProperty("autoprefixer")
    expectValidPackageVersions([packageJson.dependencies, packageJson.devDependencies])
    expect(metadata).toMatchObject({
      preset: "preset.react-recommended",
      packageVersionPolicy: PACKAGE_VERSION_POLICY.policy,
      generatedWithPackageVersionsAt: PACKAGE_VERSION_POLICY.generatedWithPackageVersionsAt,
      projectStructure: "structure.react.simple",
      packageManager: "pnpm",
      userSelections: [],
      effectiveSelections: expect.arrayContaining([
        "preset.react-recommended",
        "framework.react",
        "structure.react.simple",
        "tooling.vite",
        "tooling.typescript",
        "styling.tailwind",
        "ui.shadcn",
        "component.button",
        "component.input",
        "component.textarea",
        "component.label",
        "component.avatar",
        "component.dropdown",
        "component.sheet",
        "component.form",
        "form.react-hook-form",
        "validation.zod",
        "http.axios",
        "state.zustand",
        "composition.react-recommended",
      ]),
    })

    await expect(readFile(path.join(outputDir, "src", "App.tsx"), "utf8")).resolves.toContain(
      "useForm<ContactValues>",
    )
    const viteConfig = await readFile(path.join(outputDir, "vite.config.ts"), "utf8")
    const globalCss = await readFile(path.join(outputDir, "src", "index.css"), "utf8")

    expect(viteConfig).toContain('import tailwindcss from "@tailwindcss/vite"')
    expect(viteConfig).toContain("tailwindcss()")
    expect(globalCss).toContain('@import "tailwindcss";')
    expect(globalCss).not.toContain("@tailwind base")
    expect(globalCss).not.toContain("@tailwind components")
    expect(globalCss).not.toContain("@tailwind utilities")
    await expect(
      readFile(path.join(outputDir, "src", "components", "ui", "button.tsx"), "utf8"),
    ).resolves.toContain("buttonVariants")
    await expect(exists(path.join(outputDir, "postcss.config.js"))).resolves.toBe(false)
    await expect(exists(path.join(outputDir, "tailwind.config.ts"))).resolves.toBe(false)
  })
})
