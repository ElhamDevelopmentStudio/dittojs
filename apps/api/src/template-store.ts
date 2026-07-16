import { randomBytes } from "node:crypto"
import { mkdir, readFile, rename, writeFile } from "node:fs/promises"
import path from "node:path"

export const TEMPLATE_SCHEMA_VERSION = 1

export type SavedTemplate = {
  id: string
  schemaVersion: typeof TEMPLATE_SCHEMA_VERSION
  catalogVersion: string
  presetId?: string
  userSelections: string[]
  createdAt: string
}

export type SaveTemplateInput = {
  catalogVersion: string
  presetId?: string
  userSelections: string[]
  createdAt?: Date | string
}

export interface TemplateStore {
  save(input: SaveTemplateInput): Promise<SavedTemplate>
  find(templateId: string): Promise<SavedTemplate | undefined>
}

const TEMPLATE_ID_PATTERN = /^tpl_[A-Za-z0-9_-]{22}$/

export function isTemplateId(value: string): boolean {
  return TEMPLATE_ID_PATTERN.test(value)
}

function createTemplateId(): string {
  return `tpl_${randomBytes(16).toString("base64url")}`
}

function savedTemplate(input: SaveTemplateInput): SavedTemplate {
  return {
    id: createTemplateId(),
    schemaVersion: TEMPLATE_SCHEMA_VERSION,
    catalogVersion: input.catalogVersion,
    ...(input.presetId === undefined ? {} : { presetId: input.presetId }),
    userSelections: [...input.userSelections],
    createdAt: new Date(input.createdAt ?? new Date()).toISOString(),
  }
}

export class FileTemplateStore implements TemplateStore {
  constructor(private readonly directory: string) {}

  async save(input: SaveTemplateInput): Promise<SavedTemplate> {
    const template = savedTemplate(input)

    await mkdir(this.directory, { recursive: true })

    const target = path.join(this.directory, `${template.id}.json`)
    const temporary = `${target}.${process.pid}.tmp`

    await writeFile(temporary, `${JSON.stringify(template, null, 2)}\n`, {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    })
    await rename(temporary, target)

    return template
  }

  async find(templateId: string): Promise<SavedTemplate | undefined> {
    if (!isTemplateId(templateId)) {
      return undefined
    }

    try {
      const value = JSON.parse(
        await readFile(path.join(this.directory, `${templateId}.json`), "utf8"),
      ) as SavedTemplate

      return value.id === templateId ? value : undefined
    } catch (error: unknown) {
      if ((error as { code?: unknown }).code === "ENOENT") {
        return undefined
      }

      throw error
    }
  }
}

export class MemoryTemplateStore implements TemplateStore {
  private readonly templates = new Map<string, SavedTemplate>()

  async save(input: SaveTemplateInput): Promise<SavedTemplate> {
    const template = savedTemplate(input)

    this.templates.set(template.id, template)
    return template
  }

  async find(templateId: string): Promise<SavedTemplate | undefined> {
    return this.templates.get(templateId)
  }
}
