# DittoJs Product Requirements

## Product summary

DittoJs allows users to generate customizable React project templates using presets, manual configuration, or future AI-assisted recommendations.

The product must support dependency resolution, locked required selections, compatibility checks, generated project output, and optional saved templates for authenticated users.

## MVP objective

The MVP should prove that DittoJs can generate a real, working React template from a manifest-driven system.

The MVP should not try to support every framework, every package, or every customization option.

## MVP scope

### Framework

- React with Vite.
- TypeScript.

### Styling

- Tailwind CSS.

### Component library

- shadcn-style components.
- Base UI as the recommended primitive engine.
- Radix support can be added later unless needed for MVP compatibility.

### Components

MVP primitive/composite components:

- Button
- Input
- Textarea
- Label
- Avatar
- Dropdown
- Sheet
- Form

### Blocks

MVP blocks:

- Navbar
- Sidebar
- Messaging Input
- Typing Indicator
- Online Presence Circle
- Auth Form
- Settings Form

### Forms

MVP form stack:

- React Hook Form
- Zod

Future form options:

- TanStack Form
- Yup
- Conform
- Valibot

### Other default packages

MVP recommended stack may include:

- Axios
- Zustand

### Output

Users should be able to:

- Choose a preset.
- Customize selected features.
- Configure Core through primary top-level decisions.
- Open nested customization for supported parent decisions.
- See automatically included dependencies.
- See locked dependencies with explanations.
- Generate a project.
- Download a ZIP.
- View the generated stack summary.

Core Configuration top-level decisions must stay focused on primary choices:
Framework, Build Tool, Styling, UI System, Forms & Validation, and Client Data.
TypeScript, package manager, primitive engine, style, theme, form engine, and
validator choices should appear inside their parent customization modals.
Unsupported nested choices must remain disabled and non-functional until the
resolver and generator support them.

### Authentication

MVP may work without authentication.

Authentication can be added after generation works.

Future authenticated users should be able to:

- Save generated templates.
- Regenerate previous templates.
- Duplicate templates.
- View template history.
- Save preferences.

## Out of scope for MVP

The following are not required for the first MVP:

- Next.js support.
- Vue, Svelte, Angular, Solid, or other frameworks.
- AI recommendation flow.
- Team workspaces.
- Payment system.
- Private registries.
- GitHub export.
- Multi-user collaboration.
- Template marketplace.
- Backend/database scaffolding.
- Full visual page builder.

## Core user flows

### Flow 1: Use recommended React preset

1. User opens DittoJs.
2. User selects "React Recommended".
3. User sees included stack:
   - React
   - Vite
   - Tailwind
   - shadcn
   - React Hook Form
   - Zod
   - Axios
   - Zustand
4. User clicks Create.
5. DittoJs generates a working template.
6. User downloads ZIP.

### Flow 2: Customize preset

1. User selects a preset.
2. User clicks Customize.
3. User adds or removes components/blocks.
4. Required dependencies are auto-selected and locked.
5. User sees a live stack summary.
6. User creates and downloads the template.

### Flow 3: Locked dependency explanation

1. User selects shadcn.
2. Tailwind is auto-selected.
3. Tailwind is locked.
4. User tries to deselect Tailwind.
5. UI explains:
   "Tailwind is required because shadcn components use Tailwind CSS."
6. User can remove Tailwind only by removing shadcn or choosing a different compatible system.

### Flow 4: Parent block dependencies

1. User selects Navbar.
2. Button, Input, Avatar, and Dropdown are auto-selected.
3. Those components are locked because Navbar requires them.
4. User removes Navbar.
5. Components unlock unless they are still required by another selected feature or manually selected by the user.

### Flow 5: Future AI recommendation

1. User describes the project they want to build.
2. DittoJs asks a small number of follow-up questions.
3. AI recommends a valid DittoJs recipe.
4. Resolver validates the recipe.
5. User can generate or customize the recommendation.

## Functional requirements

### Resolver

The system must:

- Accept user selections.
- Resolve transitive dependencies.
- Auto-select required modules.
- Lock required modules while active parents require them.
- Explain why each item is locked.
- Detect conflicts.
- Handle provider groups.
- Apply defaults.
- Return a complete resolved recipe.
- Never permanently store auto-selected modules as user selections.

### Generator

The system must:

- Generate project files from resolved recipes.
- Generate package.json.
- Generate config files.
- Generate source files.
- Generate README.
- Generate Ditto metadata.
- Avoid writing files outside the output directory.
- Produce output that installs, typechecks, and builds.

### UI

The UI must:

- Favor recommended presets.
- Hide advanced options until requested.
- Show selected items.
- Show auto-selected items.
- Show locked dependencies.
- Explain dependency reasons.
- Show conflicts clearly.
- Provide a summary before generation.
- Allow generation without login.

### Catalog

The catalog must:

- Describe every selectable module.
- Describe every dependency.
- Describe conflicts.
- Describe capabilities provided.
- Describe files to generate.
- Describe packages to install.
- Describe defaults.

## Non-functional requirements

### Reliability

Generated templates must be tested in CI.

### Maintainability

New options should be added through manifests and adapters, not one-off UI logic.

### Extensibility

Adding a new form engine, validator, component library, block, or preset should not require rewriting existing modules.

### Usability

The UI must feel simple for beginners and powerful for advanced users.

### Performance

The resolver should run fast enough to update the UI interactively.

### Security

The generator must avoid unsafe file writes and path traversal.

### Traceability

Every generated template must include generation metadata.

## Success criteria for MVP

The MVP is successful when:

- A user can generate a React Recommended template.
- The generated template installs successfully.
- The generated template typechecks.
- The generated template builds.
- Navbar auto-selects and locks its child dependencies.
- shadcn auto-selects and locks Tailwind.
- The UI explains locked dependencies clearly.
- CI validates generated fixtures.
