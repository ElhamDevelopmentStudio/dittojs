import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { existsSync } from "node:fs"
import path from "node:path"
import { defineConfig } from "vite"

const registryRoot = path.resolve(import.meta.dirname, "../../packages/registry")
const generatedFixturesRoot = path.resolve(import.meta.dirname, "../../fixtures/generated")
const webEntryPath = path.resolve(import.meta.dirname, "src/main.tsx")
const virtualAppPreviewPrefix = "\0ditto-app-preview:"
const previewCatalogRoot = path.join(generatedFixturesRoot, "preview-catalog", "src")
const generatedAppPreviews: Record<string, string> = {
  "virtual:ditto-app-preview/react-recommended": "react-recommended/src/App.tsx",
  "virtual:ditto-app-preview/saas-dashboard": "saas-dashboard/src/App.tsx",
  "virtual:ditto-app-preview/chat-app": "chat-app/src/App.tsx",
}

const generatedFixturePreviews: Record<string, string> = {
  "virtual:ditto-fixture/dashboard-layout": "app/(main)/dashboard/layout.tsx",
  "virtual:ditto-fixture/app-sidebar": "app/(main)/dashboard/_components/sidebar/app-sidebar.tsx",
  "virtual:ditto-fixture/sidebar": "components/ui/sidebar.tsx",
  "virtual:ditto-fixture/tooltip": "components/ui/tooltip.tsx",
  "virtual:ditto-fixture/preferences-config": "lib/preferences/preferences-config.ts",
  "virtual:ditto-fixture/preferences-provider": "stores/preferences/preferences-provider.tsx",
}

function generatedFixturePreviewPath(source: string): string | undefined {
  const pagePrefix = "virtual:ditto-fixture-page/"
  const layoutPrefix = "virtual:ditto-fixture-layout/"

  if (source.startsWith(pagePrefix)) {
    return path.join(previewCatalogRoot, "pages", source.slice(pagePrefix.length), "page.tsx")
  }

  if (source.startsWith(layoutPrefix)) {
    return path.join(previewCatalogRoot, "pages", source.slice(layoutPrefix.length), "layout.tsx")
  }

  const target = generatedFixturePreviews[source]
  return target === undefined ? undefined : path.join(previewCatalogRoot, target)
}

function isGeneratedFixtureImporter(importer?: string): boolean {
  return importer?.replaceAll(path.sep, "/").includes("/fixtures/generated/") ?? false
}

function isBareDependency(source: string): boolean {
  return !source.startsWith(".") && !source.startsWith("/") && !source.startsWith("@/")
}

function resolveSourceFile(candidate: string): string | undefined {
  const candidates = [
    candidate,
    `${candidate}.ts`,
    `${candidate}.tsx`,
    `${candidate}.js`,
    `${candidate}.jsx`,
    path.join(candidate, "index.ts"),
    path.join(candidate, "index.tsx"),
  ]

  return candidates.find((filePath) => existsSync(filePath))
}

function generatedFixturePath(source: string, importer?: string): string | undefined {
  if (!source.startsWith("@/") || importer === undefined) {
    return undefined
  }

  const normalizedImporter = importer.replaceAll(path.sep, "/")
  const fixtureMatch = normalizedImporter.match(/\/fixtures\/generated\/([^/]+)\//)

  if (fixtureMatch?.[1] === undefined) {
    return undefined
  }

  return resolveSourceFile(
    path.join(generatedFixturesRoot, fixtureMatch[1], "src", source.slice(2)),
  )
}

function registryPreviewPath(source: string, importer?: string): string | undefined {
  const fixturePath = generatedFixturePath(source, importer)

  if (fixturePath !== undefined) {
    return fixturePath
  }

  const componentMatch = source.match(/^@\/components\/ui\/([^/]+)$/)

  if (componentMatch?.[1] !== undefined) {
    const name = componentMatch[1]
    return path.join(registryRoot, "shadcn/components", name, "files", `${name}.tsx`)
  }

  const aliases: Record<string, string> = {
    "@/hooks/use-mobile": "hooks/use-mobile/files/use-mobile.ts",
    "@/lib/utils": "shadcn/lib/utils.ts",
  }

  const target = aliases[source]
  return target === undefined ? undefined : path.join(registryRoot, target)
}

export const registryPreviewAliases = {
  name: "ditto-registry-preview-aliases",
  enforce: "pre" as const,
  async resolveId(source: string, importer?: string) {
    if (generatedAppPreviews[source] !== undefined) {
      return `${virtualAppPreviewPrefix}${source}`
    }

    const fixturePreviewPath = generatedFixturePreviewPath(source)

    if (fixturePreviewPath !== undefined) {
      return fixturePreviewPath
    }

    const registryPath = registryPreviewPath(source, importer)

    if (registryPath !== undefined) {
      return registryPath
    }

    if (isGeneratedFixtureImporter(importer) && isBareDependency(source)) {
      return this.resolve(source, webEntryPath, { skipSelf: true })
    }

    return undefined
  },
  load(id: string) {
    if (!id.startsWith(virtualAppPreviewPrefix)) {
      return undefined
    }

    const source = id.slice(virtualAppPreviewPrefix.length)
    const target = generatedAppPreviews[source]

    if (target === undefined) {
      return undefined
    }

    const appPath = path.join(generatedFixturesRoot, target)
    return `export { App } from ${JSON.stringify(appPath)}`
  },
}

export default defineConfig({
  plugins: [registryPreviewAliases, react(), tailwindcss()],
  server: {
    proxy: {
      "/api": "http://localhost:5174",
    },
  },
})
