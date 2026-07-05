const ID_SEGMENT_PATTERN = "[a-z][a-z0-9]*(?:-[a-z0-9]+)*"
const DOTTED_ID_PATTERN = new RegExp(`^${ID_SEGMENT_PATTERN}(?:\\.${ID_SEGMENT_PATTERN})+$`)

export function isValidModuleId(id: string): boolean {
  return DOTTED_ID_PATTERN.test(id)
}

export function isValidCapabilityName(name: string): boolean {
  return DOTTED_ID_PATTERN.test(name)
}
