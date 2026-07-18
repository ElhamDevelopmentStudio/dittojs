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

Object.defineProperty(window, "matchMedia", {
  configurable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => false),
  })),
})

class ResizeObserverMock {
  disconnect = vi.fn()
  observe = vi.fn()
  unobserve = vi.fn()
}

Object.defineProperty(window, "ResizeObserver", {
  configurable: true,
  value: ResizeObserverMock,
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
