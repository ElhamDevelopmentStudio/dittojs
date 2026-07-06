import { afterEach, beforeEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

const clipboard = {
  writeText: vi.fn<() => Promise<void>>(),
}

Object.defineProperty(navigator, "clipboard", {
  configurable: true,
  value: clipboard,
})

Object.defineProperty(URL, "createObjectURL", {
  configurable: true,
  value: vi.fn(() => "blob:ditto-template"),
})

Object.defineProperty(URL, "revokeObjectURL", {
  configurable: true,
  value: vi.fn(),
})

beforeEach(() => {
  window.history.replaceState({}, "", "/")
  clipboard.writeText.mockResolvedValue(undefined)
  vi.mocked(URL.createObjectURL).mockReturnValue("blob:ditto-template")
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
