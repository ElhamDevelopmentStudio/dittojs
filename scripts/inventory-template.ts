import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

type Category =
  | "foundation"
  | "hook"
  | "ui-component"
  | "layout-block"
  | "page-composition"
  | "sample-data"
  | "utility"
  | "style"
  | "other"

type InventoryItem = {
  category: Category
  relativePath: string
  suggestedId: string
  imports: string[]
  localImports: string[]
  packageImports: string[]
  notes: string[]
}

const repoRoot = process.cwd()
const templateSrcRoot = path.join(repoRoot, "template", "src")
const outputPath = path.join(repoRoot, "docs", "template-phase-1-inventory.md")

const requestedUiComponents = [
  "accordion",
  "alert",
  "alert-dialog",
  "aspect-ratio",
  "attachment",
  "avatar",
  "badge",
  "breadcrumb",
  "bubble",
  "button",
  "button-group",
  "calendar",
  "card",
  "carousel",
  "chart",
  "checkbox",
  "collapsible",
  "combobox",
  "command",
  "context-menu",
  "dialog",
  "direction",
  "drawer",
  "dropdown-menu",
  "empty",
  "field",
  "form",
  "hover-card",
  "input",
  "input-group",
  "input-otp",
  "item",
  "kbd",
  "label",
  "marker",
  "menubar",
  "message",
  "message-scroller",
  "native-select",
  "navigation-menu",
  "pagination",
  "popover",
  "progress",
  "radio-group",
  "resizable",
  "scroll-area",
  "select",
  "separator",
  "sheet",
  "sidebar",
  "skeleton",
  "slider",
  "sonner",
  "spinner",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle",
  "toggle-group",
  "tooltip",
]

const requestedPageCompositions = [
  "(main)/auth/v1/login",
  "(main)/auth/v1/register",
  "(main)/auth/v2/login",
  "(main)/auth/v2/register",
  "(main)/dashboard/default",
  "(main)/dashboard/analytics",
  "(main)/dashboard/crm",
  "(main)/dashboard/finance",
  "(main)/dashboard/ecommerce",
  "(main)/dashboard/productivity",
  "(main)/dashboard/users",
  "(main)/dashboard/roles",
  "(main)/dashboard/tasks",
  "(main)/dashboard/calendar",
  "(main)/dashboard/kanban",
  "(main)/dashboard/invoice",
  "(main)/dashboard/infrastructure",
  "(main)/dashboard/logistics",
  "(main)/dashboard/academy",
  "(main)/chat",
  "(main)/mail",
  "(main)/dashboard/coming-soon",
  "(main)/unauthorized",
  "not-found",
]

const foundationFiles = new Set([
  "main.tsx",
  "app/layout.tsx",
  "app/router.tsx",
  "app/globals.css",
  "lib/utils.ts",
])

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join("/")
}

async function walk(dir: string): Promise<string[]> {
  const { readdir } = await import("node:fs/promises")
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        return walk(fullPath)
      }

      return [fullPath]
    }),
  )

  return files.flat()
}

function extractImports(source: string): string[] {
  const imports = new Set<string>()
  const patterns = [
    /import\s+(?:type\s+)?(?:[\s\S]*?\s+from\s+)?["']([^"']+)["']/g,
    /export\s+(?:type\s+)?[\s\S]*?\s+from\s+["']([^"']+)["']/g,
    /import\(["']([^"']+)["']\)/g,
  ]

  for (const pattern of patterns) {
    let match = pattern.exec(source)

    while (match !== null) {
      if (match[1] !== undefined) {
        imports.add(match[1])
      }
      match = pattern.exec(source)
    }
  }

  return [...imports].sort()
}

function packageName(importPath: string): string {
  if (importPath.startsWith("@")) {
    return importPath.split("/").slice(0, 2).join("/")
  }

  return importPath.split("/")[0] ?? importPath
}

function categorize(relativePath: string): Category {
  if (foundationFiles.has(relativePath)) {
    return "foundation"
  }

  if (relativePath.startsWith("hooks/")) {
    return "hook"
  }

  if (relativePath.startsWith("components/ui/")) {
    return "ui-component"
  }

  if (
    relativePath.startsWith("app/(main)/dashboard/_components/sidebar/") ||
    relativePath.startsWith("navigation/sidebar/")
  ) {
    return "layout-block"
  }

  if (relativePath.startsWith("app/") && relativePath.endsWith("/page.tsx")) {
    return "page-composition"
  }

  if (
    relativePath.endsWith("data.json") ||
    relativePath.endsWith("/data.ts") ||
    relativePath.endsWith("/data.tsx") ||
    relativePath.includes("events-data") ||
    relativePath.includes("shipment-data")
  ) {
    return "sample-data"
  }

  if (relativePath.startsWith("lib/") || relativePath.startsWith("stores/")) {
    return "utility"
  }

  if (relativePath.startsWith("styles/") || relativePath.endsWith(".css")) {
    return "style"
  }

  return "other"
}

function suggestedId(category: Category, relativePath: string): string {
  const basename = path.basename(relativePath).replace(/\.(tsx|ts|json|css)$/, "")

  if (category === "ui-component") {
    return `component.${basename}`
  }

  if (category === "hook") {
    return `hook.${basename}`
  }

  if (category === "layout-block") {
    return `block.${basename}`
  }

  if (category === "page-composition") {
    const route = relativePath
      .replace(/^app\//, "")
      .replace(/\/page\.tsx$/, "")
      .replace(/\[[^\]]+\]/g, "not-found")
      .replace(/[()]/g, "")
      .replace(/\//g, ".")

    return `composition.${route}`
  }

  if (category === "sample-data") {
    return `sample-data.${relativePath
      .replace(/\.(tsx|ts|json)$/, "")
      .replace(/\/_components\//g, ".")
      .replace(/[()]/g, "")
      .replace(/\//g, ".")}`
  }

  if (category === "foundation") {
    return `foundation.${basename === "main" ? "react-entry" : basename}`
  }

  return `${category}.${basename}`
}

function notesFor(relativePath: string, category: Category, imports: string[]): string[] {
  const notes: string[] = []

  if (relativePath === "app/router.tsx") {
    notes.push("Replace BrowserRouter/Routes with generated createBrowserRouter route objects.")
  }

  if (category === "ui-component") {
    notes.push("Create component manifest with component-library.shadcn requirement.")
  }

  if (category === "page-composition") {
    notes.push(
      "Create composition manifest with route metadata and selected-page-only file mapping.",
    )
  }

  if (category === "sample-data") {
    notes.push(
      "Generate only when required by selected pages or blocks and document backend replacement.",
    )
  }

  if (imports.some((importPath) => importPath.startsWith("@/components/ui/"))) {
    notes.push("Declare every imported UI component as a hard capability requirement.")
  }

  if (imports.some((importPath) => importPath.startsWith("@/hooks/"))) {
    notes.push("Declare hook requirements explicitly.")
  }

  return notes
}

function markdownList(values: string[]): string {
  if (values.length === 0) {
    return "- none"
  }

  return values.map((value) => `- \`${value}\``).join("\n")
}

function tableRows(items: InventoryItem[]): string {
  if (items.length === 0) {
    return "| Item | Suggested manifest | Packages | Local dependencies |\n| --- | --- | --- | --- |\n"
  }

  return [
    "| Item | Suggested manifest | Packages | Local dependencies |",
    "| --- | --- | --- | --- |",
    ...items.map((item) => {
      const packages = item.packageImports.length === 0 ? "none" : item.packageImports.join(", ")
      const localImports =
        item.localImports.length === 0
          ? "none"
          : item.localImports
              .filter((importPath) => importPath.startsWith("@/components/ui/"))
              .slice(0, 8)
              .join(", ") || `${item.localImports.length} local imports`

      return `| \`${item.relativePath}\` | \`${item.suggestedId}\` | ${packages} | ${localImports} |`
    }),
  ].join("\n")
}

function packageSummary(items: InventoryItem[]): string {
  const packages = new Map<string, Set<string>>()

  for (const item of items) {
    for (const dependency of item.packageImports) {
      const dependents = packages.get(dependency) ?? new Set<string>()
      dependents.add(item.relativePath)
      packages.set(dependency, dependents)
    }
  }

  return [...packages.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(
      ([dependency, dependents]) =>
        `- \`${dependency}\`: ${dependents.size} template file${dependents.size === 1 ? "" : "s"}`,
    )
    .join("\n")
}

function missingRequested(items: InventoryItem[], requested: string[], prefix: string): string[] {
  const available = new Set(
    items
      .filter((item) => item.relativePath.startsWith(prefix))
      .map((item) => path.basename(item.relativePath).replace(/\.(tsx|ts)$/, "")),
  )

  return requested.filter((name) => !available.has(name))
}

function presentRequestedPages(items: InventoryItem[]): string[] {
  const pagePaths = new Set(
    items
      .filter((item) => item.category === "page-composition")
      .map((item) => item.relativePath.replace(/^app\//, "").replace(/\/page\.tsx$/, "")),
  )

  return requestedPageCompositions.filter((page) => pagePaths.has(page))
}

async function main() {
  const files = (await walk(templateSrcRoot))
    .filter((filePath) => /\.(tsx|ts|json|css)$/.test(filePath))
    .sort()

  const items: InventoryItem[] = []

  for (const filePath of files) {
    const relativePath = toPosix(path.relative(templateSrcRoot, filePath))
    const source = await readFile(filePath, "utf8")
    const imports = extractImports(source)
    const localImports = imports.filter(
      (importPath) => importPath.startsWith("@/") || importPath.startsWith("."),
    )
    const packageImports = [
      ...new Set(
        imports.filter((importPath) => !localImports.includes(importPath)).map(packageName),
      ),
    ].sort()
    const category = categorize(relativePath)

    items.push({
      category,
      relativePath,
      suggestedId: suggestedId(category, relativePath),
      imports,
      localImports,
      packageImports,
      notes: notesFor(relativePath, category, imports),
    })
  }

  const byCategory = (category: Category) => items.filter((item) => item.category === category)
  const missingUi = missingRequested(items, requestedUiComponents, "components/ui/")
  const foundPages = presentRequestedPages(items)
  const missingPages = requestedPageCompositions.filter((page) => !foundPages.includes(page))

  const markdown = `# Template Phase 1 Inventory And Dependency Map

Generated by \`pnpm tsx scripts/inventory-template.ts\`.

## Purpose

This file completes Phase 1 for migrating \`template/\` into DittoJs. It explains what was inventoried, how files were categorized, and what each category means for the resolver, catalog, registry, and generator.

The key rule for every later phase is unchanged: no template-derived file, package, component, block, page, hook, or sample data module may bypass manifests, resolver output, package policy, or generated fixture validation.

## Scan Summary

- Template source root: \`template/src\`
- Files scanned: ${items.length}
- UI component files: ${byCategory("ui-component").length}
- Page composition files: ${byCategory("page-composition").length}
- Layout/navigation block candidates: ${byCategory("layout-block").length}
- Sample data candidates: ${byCategory("sample-data").length}
- Hook candidates: ${byCategory("hook").length}
- Foundation files identified: ${byCategory("foundation").length}

## Phase 1 Completion Notes

1. The template was scanned from source files only; generated artifacts, \`.git\`, \`.omx\`, \`dist\`, and lock/build output are not part of the migration inventory.
2. Each source file was classified into a migration category so later phases can add manifests instead of copying files directly.
3. Imports were split into package imports and local imports. Package imports become package-policy and manifest work. Local imports become manifest requirements or bundled file mappings.
4. The existing DittoJs component set is included in the UI component inventory, so those files can be replaced by template-derived registry files in Phase 3.
5. \`template/src/app/router.tsx\` currently uses \`BrowserRouter\`, \`Routes\`, and \`Route\`; the migration must replace that with generated \`createBrowserRouter\` route objects.
6. Mock data files are tracked as sample-data modules so generated templates can include them intentionally and document backend replacement.

## Requested UI Components

Available requested UI components: ${requestedUiComponents.length - missingUi.length}/${requestedUiComponents.length}

Missing requested UI components:

${markdownList(missingUi)}

${tableRows(byCategory("ui-component"))}

## Foundation Files

These files should become manifest-owned foundation files. The router entry must be rewritten to \`createBrowserRouter\` during implementation.

${tableRows(byCategory("foundation"))}

## Hooks

${tableRows(byCategory("hook"))}

## Layout And Navigation Blocks

These should supersede the current custom DittoJs navbar/sidebar blocks through manifests and explicit requirements.

${tableRows(byCategory("layout-block"))}

## Page Compositions

Available requested page compositions: ${foundPages.length}/${requestedPageCompositions.length}

Missing requested page compositions:

${markdownList(missingPages)}

${tableRows(byCategory("page-composition"))}

## Sample Data Candidates

These files should become \`sample-data.*\` modules or bundled page data files. Generated README output should explain how to remove them and replace them with backend/API integration.

${tableRows(byCategory("sample-data"))}

## Package Import Summary

Every package below needs a central package policy entry before a manifest may declare it.

${packageSummary(items)}

## Next Phase Checklist

- Replace the existing eight shadcn registry components with template-derived files.
- Add manifests for every requested UI component and declare hard requirements for imported UI capabilities.
- Expand package policy for all package imports used by selected manifests.
- Add foundation manifests for React/Vite/Tailwind/router files.
- Generate \`createBrowserRouter\` routes from selected page compositions rather than copying the template router as-is.
- Add sample-data manifests and README instructions.
- Add catalog tests that verify local UI imports are mirrored by manifest requirements.
`

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, markdown, "utf8")
  process.stdout.write(`${path.relative(repoRoot, outputPath)}\n`)
}

main().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
