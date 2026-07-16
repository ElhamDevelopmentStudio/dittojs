# Required GitHub Repository Settings

Files in the repository establish policy; GitHub settings enforce it. Repository administrators should audit this list after merging project-health changes and at least quarterly.

## General

- Set the description to: `Manifest-driven generation of dependency-correct, customizable React project starters.`
- Set the website when a stable deployment exists.
- Add topics: `react`, `typescript`, `template-generator`, `scaffolding`, `dependency-resolver`, `vite`, `tailwindcss`, `monorepo`.
- Enable Issues and Discussions. Create a `Q&A` discussion category.
- Disable wiki unless it has an active maintenance owner; versioned documentation lives in `docs/`.
- Prefer squash merging with automatically deleted head branches.

## Ruleset for `main`

- Require pull requests before merging.
- Require at least one approval; dismiss stale approvals after new commits.
- Require review from CODEOWNERS.
- Require conversation resolution.
- Require status checks: `Quality and build`, `Generated project verification`, `Dependency review`, and `CodeQL`.
- Require branches to be up to date before merge.
- Block force pushes and branch deletion.
- Require linear history.
- Apply rules to administrators, allowing bypass only for documented emergencies.

## Tag protection

- Protect tags matching `v*`.
- Restrict tag creation and deletion to maintainers.
- Do not move published tags.
- Enable immutable releases when the release process is stable.

## Actions

- Set workflow permissions to read-only by default.
- Allow GitHub-maintained actions plus explicitly approved actions.
- Require actions to be pinned to full-length commit SHAs.
- Require approval for workflows from first-time external contributors.
- Keep fork pull-request workflows read-only and without repository secrets.

## Security

- Enable dependency graph and Dependabot alerts.
- Enable Dependabot security updates.
- Enable secret scanning and push protection.
- Enable private vulnerability reporting.
- Enable CodeQL default setup for JavaScript/TypeScript with the `security-extended` query suite when available.
- Review OpenSSF Scorecard findings in the Security tab.
- Keep `SECURITY.md` response expectations current.

## Labels

Create labels referenced by forms and release notes:

- `bug`, `enhancement`, `documentation`
- `dependencies`, `github-actions`
- `feature`, `fix`, `chore`
- `breaking`, `skip-changelog`
- `good first issue`, `help wanted`, `needs reproduction`
- `area: resolver`, `area: generator`, `area: catalog`, `area: web`, `area: api`

## Ownership and access

- Require two-factor authentication for maintainers.
- Grant least privilege and review collaborator access quarterly.
- Keep at least two trusted recovery-capable maintainers before the project becomes critical infrastructure.
- Document emergency and security access outside the repository without storing credentials here.
