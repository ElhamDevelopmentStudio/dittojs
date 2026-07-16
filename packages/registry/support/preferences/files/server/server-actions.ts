import { getClientCookie, setClientCookie } from "@/lib/cookie.client"
import {
  getPreferencePersistence,
  PREFERENCE_REGISTRY,
  type PreferenceKey,
  type PreferenceValueMap,
  parsePreference,
} from "@/lib/preferences/preferences-config"

export function getValueFromCookie(key: string): string | undefined {
  if (typeof document === "undefined") return undefined
  return getClientCookie(key)
}

export function setValueToCookie(
  key: string,
  value: string,
  options: { path?: string; maxAge?: number } = {},
): void {
  const days = Math.max(1, Math.ceil((options.maxAge ?? 60 * 60 * 24 * 7) / 86400))
  setClientCookie(key, value, days, options.path)
}

export function getPreference<K extends PreferenceKey>(key: K): PreferenceValueMap[K] {
  const definition = PREFERENCE_REGISTRY[key]
  const persistence = getPreferencePersistence(key)

  if (persistence !== "client-cookie" && persistence !== "server-cookie") {
    return definition.defaultValue as PreferenceValueMap[K]
  }

  return parsePreference(key, getValueFromCookie(key)?.trim())
}
