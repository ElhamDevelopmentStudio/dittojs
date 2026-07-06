import { createServer, type IncomingMessage, type ServerResponse } from "node:http"

import { generateTemplateArchive, GenerationApiError } from "./generation"

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
  response.setHeader("access-control-allow-methods", "POST, OPTIONS")
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

export function createGenerationServer() {
  return createServer(async (request, response) => {
    writeCors(response)

    if (request.method === "OPTIONS") {
      response.statusCode = 204
      response.end()
      return
    }

    if (request.method !== "POST" || !["/api/generate", "/generate"].includes(request.url ?? "")) {
      writeJson(response, 404, {
        error: "Not found.",
        code: "not-found",
      })
      return
    }

    try {
      const body = await readJsonBody(request)
      const result = await generateTemplateArchive(body)

      writeJson(response, 200, result)
    } catch (error: unknown) {
      const failure = errorBody(error)

      writeJson(response, failure.statusCode, failure.body)
    }
  })
}
