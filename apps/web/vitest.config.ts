import { defineConfig } from "vitest/config"

import { registryPreviewAliases } from "./vite.config"

export default defineConfig({
  plugins: [registryPreviewAliases],
  test: {
    environment: "jsdom",
    globals: false,
    passWithNoTests: true,
    setupFiles: ["./src/test/setup.ts"],
  },
})
