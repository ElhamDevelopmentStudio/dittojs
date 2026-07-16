import { createServer, type IncomingMessage, type ServerResponse } from "node:http"
import path from "node:path"

import { generateTemplateArchive, GenerationApiError } from "./generation.js"
import type { TemplateGenerationOptions } from "./generation.js"
import { FileTemplateStore, type TemplateStore } from "./template-store.js"
import { generateSavedTemplate, requireSavedTemplate, saveTemplate } from "./templates.js"

const MAX_REQUEST_BYTES = 1024 * 1024

async function readJsonBody(request: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = []
  let received = 0

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)

    received += buffer.byteLength

    if (received > MAX_REQUEST_BYTES) {
      throw new GenerationApiError("Request body is too large.", "request-too-large", 413)
    }

    chunks.push(buffer)
  }

  const body = Buffer.concat(chunks).toString("utf8")

  if (body.trim().length === 0) {
    return {}
  }

  try {
    return JSON.parse(body) as unknown
  } catch {
    throw new GenerationApiError("Request body must be valid JSON.", "invalid-json", 400)
  }
}

function writeJson(response: ServerResponse, statusCode: number, value: unknown): void {
  response.statusCode = statusCode
  response.setHeader("content-type", "application/json; charset=utf-8")
  response.end(JSON.stringify(value))
}

function writeCors(response: ServerResponse): void {
  response.setHeader("access-control-allow-origin", "*")
  response.setHeader("access-control-allow-methods", "GET, POST, OPTIONS")
  response.setHeader("access-control-allow-headers", "content-type")
}

function errorBody(error: unknown): { statusCode: number; body: Record<string, unknown> } {
  if (error instanceof GenerationApiError) {
    const body: Record<string, unknown> = {
      error: error.message,
      code: error.code,
    }

    if (error.details !== undefined) {
      body.details = error.details
    }

    return {
      statusCode: error.statusCode,
      body,
    }
  }

  return {
    statusCode: 500,
    body: {
      error: error instanceof Error ? error.message : "Unknown server error.",
      code: "unknown-server-error",
    },
  }
}

export type GenerationServerOptions = {
  templateStore?: TemplateStore
  generation?: TemplateGenerationOptions
}

function defaultTemplateStore(): TemplateStore {
  const directory =
    process.env.DITTO_TEMPLATE_STORE_DIR ?? path.resolve(process.cwd(), ".ditto-data", "templates")

  return new FileTemplateStore(directory)
}

function templateRoute(url: string): { templateId: string; generate: boolean } | undefined {
  const match = /^\/api\/templates\/([^/]+)(\/generate)?$/.exec(url)

  return match?.[1] === undefined
    ? undefined
    : { templateId: decodeURIComponent(match[1]), generate: match[2] !== undefined }
}

export function createGenerationServer(options: GenerationServerOptions = {}) {
  const templateStore = options.templateStore ?? defaultTemplateStore()

  return createServer(async (request, response) => {
    writeCors(response)

    if (request.method === "OPTIONS") {
      response.statusCode = 204
      response.end()
      return
    }

    try {
      const requestUrl = request.url ?? ""
      const savedTemplateRoute = templateRoute(requestUrl)

      if (request.method === "POST" && ["/api/generate", "/generate"].includes(requestUrl)) {
        writeJson(
          response,
          200,
          await generateTemplateArchive(await readJsonBody(request), options.generation),
        )
        return
      }

      if (request.method === "POST" && requestUrl === "/api/templates") {
        writeJson(response, 201, await saveTemplate(await readJsonBody(request), templateStore))
        return
      }

      if (
        request.method === "GET" &&
        savedTemplateRoute !== undefined &&
        !savedTemplateRoute.generate
      ) {
        const template = await requireSavedTemplate(savedTemplateRoute.templateId, templateStore)

        writeJson(response, 200, {
          templateId: template.id,
          createdAt: template.createdAt,
          catalogVersion: template.catalogVersion,
          presetId: template.presetId,
        })
        return
      }

      if (request.method === "POST" && savedTemplateRoute?.generate === true) {
        const result = await generateSavedTemplate(
          savedTemplateRoute.templateId,
          await readJsonBody(request),
          templateStore,
          options.generation,
        )

        writeJson(response, 200, result)
        return
      }

      writeJson(response, 404, {
        error: "Not found.",
        code: "not-found",
      })
    } catch (error: unknown) {
      const failure = errorBody(error)

      writeJson(response, failure.statusCode, failure.body)
    }
  })
}
