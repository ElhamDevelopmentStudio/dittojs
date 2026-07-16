# Releasing DittoJs

DittoJs is currently pre-1.0. Workspace packages remain private until their public API, package boundaries, and publication policy are explicitly approved.

## Versioning

- Use Semantic Versioning for repository releases.
- Pre-1.0 minor versions may contain breaking changes, documented prominently.
- Tags use `vMAJOR.MINOR.PATCH` or a valid SemVer pre-release such as `v0.2.0-beta.1`.
- Update `CHANGELOG.md` before tagging.

## Release checklist

1. Confirm the milestone contains only intended work.
2. Review security advisories and dependency alerts.
3. Update `CHANGELOG.md` and any affected contracts.
4. Run `pnpm check` from a clean checkout.
5. Confirm generated templates install, typecheck, and build.
6. Create an annotated, signed tag when signing is available.
7. Push the tag. The release workflow verifies the tag and creates GitHub release notes.
8. Smoke-test the source archive and documented quick start.
9. Publish security guidance when the release remediates a vulnerability.

## Package publication

Do not remove `private: true` or publish `@dittojs/*` packages as part of an unrelated release. Package publication requires a separate proposal covering:

- Stable public exports and compatibility policy.
- Package-specific README and metadata.
- Workspace versioning and changelog strategy.
- npm organization ownership and two-factor authentication.
- Provenance, access, tokenless trusted publishing, and rollback.
- Consumer-level installation and API tests.

## Rollback

Never move an existing release tag. If a release is defective, document the issue, publish a patch, and mark the affected GitHub release appropriately. Use a GitHub security advisory for vulnerability fixes.
