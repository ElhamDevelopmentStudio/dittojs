import type { ResolvedRecipe } from "@dittosh/core"

export type GenerationRequest = {
  presetId?: string
  userSelections: string[]
  projectName?: string
}

export type SaveTemplateRequest = {
  presetId?: string
  userSelections: string[]
}

export type SaveTemplateResponse = {
  templateId: string
  createdAt: string
  catalogVersion: string
}

export type GenerationResponse = {
  fileName: string
  mimeType: string
  archiveBase64: string
  archiveByteLength: number
  resolvedRecipe: ResolvedRecipe
  generation: {
    filesWritten: string[]
    filesGenerated: number
    warnings: Array<{ message: string; reason?: string }>
  }
}

export type GenerationClient = {
  generate(request: GenerationRequest): Promise<GenerationResponse>
  saveTemplate(request: SaveTemplateRequest): Promise<SaveTemplateResponse>
}

async function responseError(response: {
  status: number
  json(): Promise<unknown>
}): Promise<Error> {
  const failure = (await response.json().catch(() => undefined)) as
    { error?: unknown; code?: unknown } | undefined
  const message =
    typeof failure?.error === "string"
      ? failure.error
      : `Ditto API failed with status ${response.status}.`

  return new Error(message)
}

export const fetchGenerationClient: GenerationClient = {
  async generate(request) {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw await responseError(response)
    }

    return (await response.json()) as GenerationResponse
  },
  async saveTemplate(request) {
    const response = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw await responseError(response)
    }

    return (await response.json()) as SaveTemplateResponse
  },
}

export function archiveUrlFromBase64(response: GenerationResponse): string {
  const binary = window.atob(response.archiveBase64)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  const blob = new Blob([bytes], { type: response.mimeType })

  return URL.createObjectURL(blob)
}
