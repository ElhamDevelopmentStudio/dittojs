export type Recipe = {
  id?: string
  name?: string
  presetId?: string
  selections: string[]
  defaults?: Record<string, string>
  metadata?: Record<string, unknown>
}
