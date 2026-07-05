# DittoJs Version Policy

## Purpose

Generated templates must be reproducible enough for users to trust and flexible enough to receive safe patch and minor updates.

DittoJs centralizes generated package versions in the catalog. Manifests reference that policy instead of hardcoding versions in generator code.

## Rules

- Generated user-facing `package.json` files must not use `latest`, `*`, or empty version strings.
- Generated templates should use caret ranges by default.
- Exact versions may be used for fragile tooling, prereleases, or packages with known compatibility risk.
- Package versions must be centralized in catalog version policy data.
- Manifests remain the source of package requirements.
- The generator consumes resolved package data and must not choose dependency versions itself.

## Current Policy

MVP package versions live in:

```txt
packages/catalog/src/package-versions.ts
```

Each entry records:

- package name
- verified version
- emitted range
- dependency bucket
- optional notes

The current default policy is caret ranges.

## Generated Templates

Generated templates should include dependencies from resolved catalog manifests only.

Generated templates should include lockfiles later when package manager support is finalized. Until then, generated package ranges must be specific enough to avoid unbounded installs.

## Updates

Renovate or Dependabot should later refresh catalog package versions. Any package update must regenerate fixtures and verify generated templates with:

```bash
pnpm generate:fixtures
pnpm --dir fixtures/generated/react-recommended --ignore-workspace install
pnpm --dir fixtures/generated/react-recommended --ignore-workspace typecheck
pnpm --dir fixtures/generated/react-recommended --ignore-workspace build
```

CI must test generated templates after dependency updates.
