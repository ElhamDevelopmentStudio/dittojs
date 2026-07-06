import js from "@eslint/js"
import tseslint from "typescript-eslint"

const nodeGlobals = {
  Buffer: "readonly",
  console: "readonly",
  process: "readonly",
}

const browserGlobals = {
  Blob: "readonly",
  HTMLAnchorElement: "readonly",
  HTMLButtonElement: "readonly",
  HTMLElement: "readonly",
  URL: "readonly",
  document: "readonly",
  fetch: "readonly",
  navigator: "readonly",
  window: "readonly",
}

const tsFileConfig = {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: "module",
    },
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...tseslint.configs.recommended.rules,
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
      },
    ],
  },
}

export default [
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "fixtures/generated/**",
      "**/.turbo/**",
    ],
  },
  {
    files: ["**/*.{js,cjs,mjs}"],
    ...js.configs.recommended,
  },
  tsFileConfig,
  {
    files: ["apps/api/src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: nodeGlobals,
    },
  },
  {
    files: ["apps/web/src/**/*.{ts,tsx}"],
    languageOptions: {
      globals: browserGlobals,
    },
  },
]
