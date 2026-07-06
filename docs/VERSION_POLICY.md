# DittoJs Version Policy

## Purpose

Generated templates must be reproducible enough for users to trust and flexible enough to receive safe patch and minor updates.

DittoJs centralizes generated package versions in the catalog. Manifests reference that policy instead of hardcoding versions in generator code.

## Rules

- Generated user-facing `package.json` files must not use `latest`, `*`, or empty version strings.
- Generated templates should use caret ranges by default.
- Exact versions may be used only for fragile tooling, prereleases, or packages with known compatibility risk, and must include a note explaining the reason.
- Package versions must be centralized in catalog version policy data.
- Manifests remain the source of package requirements.
- The generator consumes resolved package data and must not choose dependency versions itself.
- React/Vite/Tailwind generated templates must use Tailwind v4 through `@tailwindcss/vite`, not Tailwind v3 PostCSS wiring.
- Generated templates must document and declare the Node.js range required by modern Vite: Node.js 20.19+ or 22.12+.

## Current Policy

MVP package versions live in:

```txt
packages/catalog/src/package-versions.ts
```

Each entry records:

- package name
- verified version
- emitted range
- range policy
- dependency bucket
- optional notes

The current default policy is caret ranges. The current catalog was refreshed from `npm view <package> version` on 2026-07-06.

## Generated Templates

Generated templates should include dependencies from resolved catalog manifests only.

Generated React/Vite/Tailwind templates must include:

- `tailwindcss`
- `@tailwindcss/vite`
- `vite.config.ts` importing `@tailwindcss/vite`
- `tailwindcss()` in the Vite plugin list
- global CSS using `@import "tailwindcss";`

They must not include:

- `postcss`
- `autoprefixer`
- `postcss.config.*`
- `tailwind.config.*` for the default Tailwind v4 setup
- legacy `@tailwind base`, `@tailwind components`, or `@tailwind utilities` directives

Generated package manifests must include:

```json
{
  "engines": {
    "node": "^20.19.0 || >=22.12.0"
  }
}
```

Generated templates should include lockfiles later when package manager support is finalized. Until then, generated package ranges must be specific enough to avoid unbounded installs.

## Updates

Renovate or Dependabot should later refresh catalog package versions. Any package update must regenerate fixtures and verify generated templates with:

```bash
pnpm check:package-versions
pnpm generate:fixtures
pnpm test:generated
```

`pnpm check:package-versions` is advisory and network-backed. It is not part of the default CI check.

CI must test generated templates after dependency updates.
