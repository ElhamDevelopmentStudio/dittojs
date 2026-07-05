# DittoJs Vision

## One-line summary

DittoJs is a manifest-driven template generator that creates modern, dependency-correct, customizable React project templates from presets, user selections, or AI-assisted recommendations.

## Product idea

DittoJs helps developers generate high-quality project starters without manually wiring together frameworks, styling systems, component libraries, form libraries, validators, state tools, HTTP clients, and reusable UI blocks.

Instead of offering a few static starter templates, DittoJs lets users choose what they want, resolves the dependencies and compatibility rules automatically, then generates a working project that can be downloaded, saved, regenerated, or customized further.

## Name meaning

DittoJs is inspired by Ditto from Ben 10, who can split into many independent copies.

The product follows the same idea:

- One intelligent template system.
- Many generated project copies.
- Each copy can be customized.
- Each copy is independent after generation.

## Product promise

DittoJs does not generate random boilerplate.

DittoJs generates dependency-correct, version-aware, tested, customizable project templates from a validated manifest graph.

## Why DittoJs exists

Modern frontend setup requires many decisions:

- React or another framework.
- Tailwind or another styling system.
- shadcn, Base UI, Radix UI, or custom components.
- React Hook Form, TanStack Form, Conform, or another form engine.
- Zod, Yup, Valibot, or another validator.
- Zustand, Redux, Jotai, TanStack Query, or another state/data tool.
- Which components and blocks to include.
- Which dependencies are required by which features.
- Which combinations are incompatible.
- How to keep templates updated over time.

Developers often waste time starting projects, fixing dependency issues, removing unused boilerplate, or rewriting templates.

DittoJs exists to make the initial project setup faster, safer, and more customizable.

## Core product principles

1. Presets first, customization second.
2. The resolver is the source of truth.
3. The UI must not hardcode dependency logic.
4. Every dependency lock must be explainable.
5. Generated templates must be tested like real apps.
6. AI recommendations must output valid DittoJs recipes, not arbitrary code.
7. Generated code should feel hand-written, clean, and maintainable.
8. Advanced customization should exist without overwhelming beginners.
9. Login should be optional for generation.
10. Saved templates should be available for logged-in users.

## Target users

### Primary users

Frontend developers who want to start modern React projects quickly without manually configuring everything.

### Secondary users

Teams that want repeatable internal starter templates with consistent conventions.

### Advanced users

Developers who want to customize every major architectural choice while still relying on DittoJs to resolve dependencies and prevent invalid combinations.

### Beginner users

Developers who do not know which packages to choose and want recommended defaults.

## What DittoJs is

DittoJs is:

- A template generator.
- A dependency resolver.
- A component and block registry.
- A preset system.
- A compatibility validation system.
- A project scaffolding tool.
- A future AI-assisted architecture recommender.

## What DittoJs is not

DittoJs is not:

- A no-code app builder.
- A visual page builder.
- A replacement for developers.
- A one-size-fits-all framework.
- A random AI code generator.
- A static gallery of starter templates.

## Long-term vision

DittoJs should become the easiest way to generate reliable frontend project starters.

In the long term, DittoJs should support:

- Multiple frameworks.
- Multiple UI systems.
- Multiple form engines.
- Multiple validation libraries.
- Multiple state/data approaches.
- Saved templates.
- Regeneration with newer dependencies.
- GitHub export.
- AI-assisted template recommendations.
- Team/workspace template presets.
- Public and private template registries.

## North Star

A user should be able to describe or configure what they want and receive a modern, tested, dependency-correct starter project that feels like it was carefully built for them.
