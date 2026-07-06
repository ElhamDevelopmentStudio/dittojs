# DittoJs UI/UX Principles

## Product UX goal

DittoJs should feel simple even though the system underneath is powerful.

The user should feel:

```txt
I choose what I want.
DittoJs handles what is required.
I can customize when I care.
I understand why things are included.
The generated project is trustworthy.
````

## Core UX principles

1. Presets first, customization second.
2. Recommended defaults should be obvious.
3. Advanced options should be hidden until requested.
4. Locked dependencies must be explained.
5. Conflicts must be actionable.
6. The user should always see what will be generated.
7. Generation should work without login.
8. Login should be offered after value is created.
9. The UI should not feel like a giant checklist.
10. Beginners should not be overwhelmed.
11. Advanced users should not feel trapped.

## Recommended product flow

```txt
Home
  ↓
Choose preset or custom
  ↓
Builder
  ↓
Review stack
  ↓
Generate
  ↓
Download ZIP
  ↓
Optional: sign in to save
```

## Web Builder MVP flow

The MVP web builder uses the Stitch editorial scaffolder flow:

```txt
Landing & Presets
  ↓
Step 1: Core Configuration
  ↓
Step 2: Features & Blocks
  ↓
Step 3: Project Structure
  ↓
Step 4: Review & Manifest
  ↓
Generating Template
  ↓
Success / Download
```

Every enabled control must perform a real action. Unsupported features such as
auth, saved templates, pricing, AI recommendations, unsupported frameworks,
unsupported form engines, unsupported validators, and database generation must
be disabled or removed until implemented.

Coming soon controls must be visibly disabled and non-interactive. They must not
enter `userSelections` or reach the resolver.

## Homepage

Homepage should answer:

* What is DittoJs?
* What can I generate?
* Why should I trust it?
* What are the recommended presets?

Homepage should include:

```txt
Hero
Preset cards
How it works
Why dependency-correct generation matters
CTA to start
```

## Builder layout

Recommended layout:

```txt
Left sidebar:
- Preset
- Framework
- Styling
- UI
- Components
- Blocks
- Forms
- State
- Review

Center:
- Current category options

Right panel:
- Live stack summary
- Selected by you
- Added automatically
- Locked dependencies
- Conflicts/warnings
- Packages/files summary
```

## Preset cards

Preset cards should include:

* Name
* Short description
* Stack summary
* Best-for line
* Create button
* Customize button

## Progressive disclosure

Do not show every option immediately.

Example:

```txt
shadcn
Recommended: Base UI, Nova style, Neutral theme

[Customize]
```

Clicking Customize reveals:

```txt
Primitive engine:
- Base UI recommended
- Radix UI

Style:
- Nova recommended
- Maia
- Lyra

Theme:
- Neutral recommended
- Slate
- Zinc
```

## Locked dependency UI

A locked dependency should not be silently disabled.

It should show:

* Lock icon.
* Reason.
* Parent module.
* How to unlock.

Example:

```txt
Tailwind CSS
Locked

Required by:
- shadcn

Reason:
shadcn components require Tailwind CSS.

To remove Tailwind, first remove shadcn or choose a compatible alternative.
```

## Auto-selected dependencies

Auto-selected items should be visually different from manually selected items.

Example categories:

```txt
Selected by you:
- Navbar
- shadcn

Added automatically:
- Tailwind, required by shadcn
- Button, required by Navbar
- Input, required by Navbar
```

## Conflict UI

Conflicts should be clear and actionable.

Bad:

```txt
Invalid selection.
```

Good:

```txt
Choose one form engine

React Hook Form and TanStack Form both provide the primary form engine.
Only one can be selected.

Current:
React Hook Form

Switch to:
TanStack Form
```

## Review screen

Before generation, show:

```txt
Your template

Framework:
React + Vite

Styling:
Tailwind

UI:
shadcn with Base UI

Forms:
React Hook Form + Zod

State:
Zustand

HTTP:
Axios

Components:
Button, Input, Textarea, Label, Avatar, Dropdown, Sheet, Form

Blocks:
Navbar, Sidebar

Added automatically:
Tailwind, Button, Input, Avatar, Dropdown

Warnings:
None
```

Review must also provide:

* View JSON Manifest, backed by the current resolved recipe.
* Copy CLI, backed by the current preset and explicit user selections.
* Generate Template, disabled when resolver conflicts have severity `error`.

The manifest view should show formatted JSON from resolver output, including
`userSelections`, `effectiveSelections`, `locks`, `conflicts`, `warnings`,
`packages`, `files`, and `metadata`.

## Guest vs logged-in UX

Generation must work without login.

After generation, show:

```txt
Your template is ready.

[Download ZIP]
[Sign in to save this template]
```

Do not block generation with authentication.

The success screen must keep value creation first:

```txt
Template generated.
Your DittoJs template is ready to download.

[Download ZIP]
[View JSON Manifest]
[Copy CLI Command]
[Sign in to save] Coming soon
```

Download ZIP must be wired to the real generation archive response. Sign in to
save remains disabled until authentication and saved templates are implemented.

## AI recommendation UX

Future AI recommender should ask only a few questions.

Good questions:

* What are you building?
* Do you need authentication?
* Will there be many forms?
* Do you need realtime features?
* Do you prefer simplicity or flexibility?

The AI output should be a recommendation, not a hidden decision.

Show:

```txt
Recommended for your project:
SaaS Dashboard preset

Why:
You said you are building an internal dashboard with many forms.

Includes:
React, Tailwind, shadcn, React Hook Form, Zod, Zustand, Axios, Navbar, Sidebar, Settings Form.

[Generate this]
[Customize first]
```

## Accessibility

The UI should:

* Support keyboard navigation.
* Use semantic controls.
* Provide clear focus states.
* Avoid color-only status indicators.
* Make disabled/locked states understandable.
* Use accessible modals/popovers.

## Tone

DittoJs should sound:

* Clear
* Helpful
* Confident
* Practical
* Developer-friendly

Avoid vague marketing language.

## Manual UI review checklist

For each UI change, check:

```txt
1. Can I understand the screen immediately?
2. Are recommended defaults clear?
3. Are advanced options hidden until needed?
4. Are locked dependencies explained?
5. Can I undo parent selections easily?
6. Does the stack summary make sense?
7. Are conflicts actionable?
8. Does generation feel safe?
9. Would a beginner be overwhelmed?
10. Would an advanced user feel limited?
```
