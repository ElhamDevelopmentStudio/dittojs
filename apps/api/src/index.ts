import path from "node:path"
import { argv, env } from "node:process"
import { fileURLToPath } from "node:url"

export {
  GenerationApiError,
  generateTemplateArchive,
  type TemplateGenerationOptions,
  type TemplateGenerationRequest,
  type TemplateGenerationResponse,
} from "./generation.js"
export { createGenerationServer } from "./server.js"
export {
  FileTemplateStore,
  MemoryTemplateStore,
  TEMPLATE_SCHEMA_VERSION,
  type SavedTemplate,
  type TemplateStore,
} from "./template-store.js"
export {
  CATALOG_VERSION,
  generateSavedTemplate,
  requireSavedTemplate,
  saveTemplate,
  type GenerateSavedTemplateRequest,
  type SaveTemplateRequest,
  type SaveTemplateResponse,
} from "./templates.js"

const invokedPath = argv[1] === undefined ? undefined : path.resolve(argv[1])

if (invokedPath === fileURLToPath(import.meta.url)) {
  const port = Number(env.PORT ?? 5174)
  const { createGenerationServer } = await import("./server.js")
  const server = createGenerationServer()

  server.listen(port, () => {
    console.log(`DittoJs generation API listening on http://localhost:${port}`)
  })
}
