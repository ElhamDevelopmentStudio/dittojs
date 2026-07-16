# Contributing to DittoJs

Thank you for helping make reliable project generation easier. This guide is the contributor contract for code, catalog, documentation, and design changes.

## Before you start

1. Search existing issues and discussions.
2. For a non-trivial change, open or claim an issue before implementation.
3. Keep one problem per pull request.
4. Do not include unrelated cleanup.
5. Read the documents required for your task type.

Small typo and documentation corrections may be submitted directly. Security reports must follow [SECURITY.md](SECURITY.md), not the public issue tracker.

## Development setup

Requirements:

- Node.js `20.19.0` or newer
- Corepack
- pnpm `10.33.4`

```bash
git clone https://github.com/ElhamDevelopmentStudio/dittojs.git
cd dittojs
corepack enable
corepack prepare pnpm@10.33.4 --activate
pnpm install --frozen-lockfile
pnpm check
```

Run the application with `pnpm dev:api` and `pnpm dev:app` in separate terminals.

## Required reading

| Change type       | Read first                                                            |
| ----------------- | --------------------------------------------------------------------- |
| Resolver          | `ARCHITECTURE`, `MANIFEST_SPEC`, `RESOLVER_SPEC`, `TESTING_STRATEGY`  |
| Generator         | `ARCHITECTURE`, `GENERATOR_SPEC`, `MANIFEST_SPEC`, `TESTING_STRATEGY` |
| Web/UI            | `UI_UX_PRINCIPLES`, `RESOLVER_SPEC`, `ARCHITECTURE`                   |
| Catalog/component | `MANIFEST_SPEC`, `COMPONENT_REGISTRY_SPEC`, `RESOLVER_SPEC`           |
| Preset            | `PRESET_SPEC`, `RESOLVER_SPEC`, `TESTING_STRATEGY`                    |

Every change must also satisfy [Definition of Done](docs/DEFINITION_OF_DONE.md) and [AI Development Workflow](docs/AI_DEVELOPMENT_WORKFLOW.md).

## Architecture guardrails

- Keep all dependency and compatibility decisions in the resolver.
- Never hardcode catalog relationships in React components.
- Add or update manifests when dependencies, components, blocks, or presets change.
- Preserve the distinction between user selections and effective resolved selections.
- Reject unsafe output paths and keep generator behavior deterministic.
- Do not make AI-generated recommendations bypass schema validation or resolution.
- Keep generated source readable and independently maintainable.

## Testing expectations

Add the smallest test that proves the changed behavior and protects its boundary.

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

If generation, manifests, registry files, package versions, presets, or structures change, also run:

```bash
pnpm check:generated
```

Generated fixtures are outputs, not hand-edited source. Update their recipes or generator inputs, regenerate them, and explain meaningful output changes in the pull request.

## Pull requests

Pull requests should include:

- The problem and user value.
- The chosen approach and notable rejected alternatives.
- Tests added or updated.
- Documentation and fixture impact.
- Screenshots or recordings for visible changes.
- Known limitations or follow-up work.

Use a concise, prefixed commit subject such as `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `perf:`, `build:`, `ci:`, or `chore:`. Do not add generated co-author or tool-attribution trailers.

Maintainers may request changes when a pull request expands scope, hides resolver logic in the UI, weakens generated-project validation, or lacks evidence for its claims.

## Documentation

Use direct language, runnable examples, and repository-relative links. Update contract documents whenever behavior or public types change. Avoid documenting planned behavior as if it already exists.

## Community standards

Participation is governed by [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). By contributing, you agree that your contribution is licensed under the repository's [MIT License](LICENSE).
