<div align="center">
  <img src="apps/web/public/brand/ditto-mark-180.png" width="112" alt="DittoJs logo" />
  <h1>DittoJs</h1>
  <p><strong>Split once. Ship differently.</strong></p>
  <p>A manifest-driven generator for dependency-correct, customizable React starters.</p>
</div>

<div align="center">

[![CI](https://github.com/ElhamDevelopmentStudio/dittojs/actions/workflows/ci.yml/badge.svg)](https://github.com/ElhamDevelopmentStudio/dittojs/actions/workflows/ci.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/ElhamDevelopmentStudio/dittojs/badge)](https://scorecard.dev/viewer/?uri=github.com/ElhamDevelopmentStudio/dittojs)
[![License: MIT](https://img.shields.io/badge/license-MIT-e8512f.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20.19-151817.svg)](package.json)
[![pnpm](https://img.shields.io/badge/pnpm-10.33.4-e8512f.svg)](package.json)

</div>

DittoJs takes explicit user choices, preset defaults, and a version-aware catalog; resolves requirements, locks, and conflicts; then writes a clean project that no longer depends on DittoJs. It is designed for developers who want the speed of a starter without inheriting unexplained or incompatible boilerplate.

> [!IMPORTANT]
> DittoJs is pre-1.0 and under active development. The current MVP targets React, Vite, TypeScript, Tailwind CSS, and a catalog-backed component stack. APIs and manifests may change before the first stable release.

## Why DittoJs?

- **Dependency-correct by construction.** A single resolver owns requirements, locks, conflicts, and effective selections.
- **Independent output.** Generated projects are normal source trees, not runtime clients of the generator.
- **Explainable decisions.** Automatically selected modules include reasons that the UI can display.
- **Manifest-driven extensibility.** Frameworks, tools, components, blocks, and presets are catalog data rather than UI conditionals.
- **Tested as real projects.** Generated fixtures are installed, typechecked, and built during verification.
- **Human-readable output.** Generated code is intended to feel maintained, not machine-dumped.

## How it works

```text
User selections + preset defaults
              ↓
       Manifest catalog
              ↓
           Resolver
   requirements · locks · conflicts
              ↓
          Generator
              ↓
  Independent React project archive
```

The architecture has one non-negotiable boundary: **the UI never decides dependency compatibility**. It renders resolver output and captures user intent; the resolver remains the source of truth.

## Repository map

| Path                 | Responsibility                                                         |
| -------------------- | ---------------------------------------------------------------------- |
| `apps/web`           | React template builder and catalog previews                            |
| `apps/api`           | HTTP generation endpoint and ZIP response                              |
| `packages/core`      | Schemas, recipe types, validation, and resolver                        |
| `packages/catalog`   | Manifest-backed modules, presets, and package versions                 |
| `packages/generator` | File generation, package assembly, structures, and safety policy       |
| `packages/registry`  | Source assets copied into generated projects                           |
| `packages/testing`   | Shared test surfaces                                                   |
| `fixtures/recipes`   | Canonical generation inputs                                            |
| `docs`               | Product, architecture, manifest, resolver, generator, and UX contracts |

## Quick start

### Requirements

- Node.js `20.19.0` or newer
- pnpm `10.33.4` through Corepack
- Git

### Install

```bash
git clone https://github.com/ElhamDevelopmentStudio/dittojs.git
cd dittojs
corepack enable
corepack prepare pnpm@10.33.4 --activate
pnpm install --frozen-lockfile
```

### Run locally

Start the generation API:

```bash
pnpm dev:api
```

In a second terminal, start the web builder:

```bash
pnpm dev:app
```

Open `http://localhost:5173`. The API listens on `http://localhost:5174`; Vite proxies `/api` during development.

### Verify your checkout

```bash
pnpm check
```

This runs linting, formatting checks, TypeScript checks, unit/integration tests, production builds, fixture generation, and install/typecheck/build validation for every generated template.

For the faster inner loop:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Current capabilities

- React + Vite + TypeScript project generation
- Tailwind CSS v4 setup
- Preset and manual builder flows
- Transitive requirement resolution
- Locked-dependency explanations
- Conflict and validation reporting
- Multiple project-structure adapters
- Catalog-backed components, blocks, pages, sample data, and compositions
- Downloadable generated project archives
- Generated-template verification across six canonical recipes

See [Product Requirements](docs/PRODUCT_REQUIREMENTS.md), [Architecture](docs/ARCHITECTURE.md), and the [Roadmap](ROADMAP.md) for exact scope and direction.

## Contributing

Contributions are welcome. Start with [CONTRIBUTING.md](CONTRIBUTING.md), especially the required reading table and generated-fixture policy. Good first contributions should be scoped to a specific issue with explicit acceptance criteria.

- Ask usage questions in [GitHub Discussions](https://github.com/ElhamDevelopmentStudio/dittojs/discussions).
- Report reproducible defects with the [bug form](https://github.com/ElhamDevelopmentStudio/dittojs/issues/new?template=bug.yml).
- Propose product changes with the [feature form](https://github.com/ElhamDevelopmentStudio/dittojs/issues/new?template=feature.yml).
- Report vulnerabilities privately according to [SECURITY.md](SECURITY.md).

All participants must follow the [Code of Conduct](CODE_OF_CONDUCT.md). Project decisions and maintainer roles are described in [GOVERNANCE.md](GOVERNANCE.md).

## Project status and releases

The repository currently tracks pre-1.0 development on `main`. Published GitHub releases will follow Semantic Versioning once a stable public release boundary is established. Until then, the source repository is authoritative and workspace packages remain private to prevent accidental publication.

Release history is recorded in [CHANGELOG.md](CHANGELOG.md).

## Security

Please do not open public issues for suspected vulnerabilities. Use GitHub's private vulnerability reporting flow as described in [SECURITY.md](SECURITY.md).

## License

DittoJs is available under the [MIT License](LICENSE). Bundled third-party assets retain their respective terms; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
