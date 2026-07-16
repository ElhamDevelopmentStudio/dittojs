# Getting Started

## Prerequisites

- Git
- Node.js `20.19.0` or newer
- Corepack
- pnpm `10.33.4`

The exact pnpm version is declared in the root `packageManager` field. The minimum Node.js version is shared by `.node-version`, package metadata, and CI.

## Clone and install

```bash
git clone https://github.com/ElhamDevelopmentStudio/dittojs.git
cd dittojs
corepack enable
corepack prepare pnpm@10.33.4 --activate
pnpm install --frozen-lockfile
```

Do not use npm or Yarn to install the workspace; the checked-in `pnpm-lock.yaml` is the reproducibility boundary.

## Run the builder

Terminal one:

```bash
pnpm dev:api
```

Terminal two:

```bash
pnpm dev:app
```

- Web builder: `http://localhost:5173`
- Generation API: `http://localhost:5174`
- Generation endpoint: `POST /api/generate`

Vite proxies `/api` to the local API in development.

## Common commands

| Command | Purpose |
| --- | --- |
| `pnpm dev:app` | Start the web builder |
| `pnpm dev:api` | Start the generation API with watch mode |
| `pnpm lint` | Run ESLint in every workspace package |
| `pnpm format:check` | Verify Prettier formatting |
| `pnpm typecheck` | Typecheck the monorepo |
| `pnpm test` | Run package and script tests |
| `pnpm build` | Build every package and app |
| `pnpm generate:fixtures` | Generate canonical fixture projects |
| `pnpm check:generated` | Generate, install, typecheck, and build every canonical project |
| `pnpm check` | Run the complete repository gate |

## Working on generated output

Source inputs live in manifests, recipes, generator code, and registry files. `fixtures/generated` is ignored because it is reproducible build output.

1. Change the source input.
2. Run targeted tests.
3. Run `pnpm generate:fixtures` to inspect output.
4. Run `pnpm check:generated` before opening the pull request.
5. Describe meaningful generated-output changes in the pull request.

Never patch a generated fixture as the source of a fix.

## Troubleshooting

### Corepack or pnpm version mismatch

```bash
corepack enable
corepack prepare pnpm@10.33.4 --activate
pnpm --version
```

### Port already in use

The API respects `PORT`:

```bash
PORT=5274 pnpm dev:api
```

If you change the API port, update the local Vite proxy for that session or run the default port.

### Stale Turbo or build output

```bash
pnpm clean
pnpm install --frozen-lockfile
pnpm check
```

### Generated-template failure

Read the first failing generated template in the output from `pnpm check:generated`. Reproduce inside `fixtures/generated/<recipe>` only for diagnosis; fix the owning manifest, registry asset, package policy, structure adapter, or generator source.

## Next reading

- [Architecture](ARCHITECTURE.md)
- [Manifest Specification](MANIFEST_SPEC.md)
- [Resolver Specification](RESOLVER_SPEC.md)
- [Generator Specification](GENERATOR_SPEC.md)
- [Contributing](../CONTRIBUTING.md)
