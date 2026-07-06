import type { ModuleManifest } from "@dittojs/core"

import { packageRange } from "../package-versions"

export const componentManifests: ModuleManifest[] = [
  {
    id: "component.button",
    type: "primitive",
    label: "Button",
    description: "Primary button primitive.",
    provides: ["ui.button"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Button is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/button/files/button.tsx",
        slot: "ui-component",
        name: "button",
      },
    ],
    ui: {
      label: "Button",
      icon: "box",
      category: "Components",
      tags: ["primitive", "action"],
    },
  },
  {
    id: "component.input",
    type: "primitive",
    label: "Input",
    description: "Text input primitive.",
    provides: ["ui.input"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Input is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/input/files/input.tsx",
        slot: "ui-component",
        name: "input",
      },
    ],
    ui: {
      label: "Input",
      icon: "input",
      category: "Components",
      tags: ["primitive", "form"],
    },
  },
  {
    id: "component.textarea",
    type: "primitive",
    label: "Textarea",
    description: "Multi-line text input primitive.",
    provides: ["ui.textarea"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Textarea is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/textarea/files/textarea.tsx",
        slot: "ui-component",
        name: "textarea",
      },
    ],
    ui: {
      label: "Textarea",
      icon: "text",
      category: "Components",
      tags: ["primitive", "form"],
    },
  },
  {
    id: "component.label",
    type: "primitive",
    label: "Label",
    description: "Accessible form label primitive.",
    provides: ["ui.label"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Label is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/label/files/label.tsx",
        slot: "ui-component",
        name: "label",
      },
    ],
    ui: {
      label: "Label",
      icon: "text",
      category: "Components",
      tags: ["primitive", "form"],
    },
  },
  {
    id: "component.avatar",
    type: "primitive",
    label: "Avatar",
    description: "User avatar primitive.",
    provides: ["ui.avatar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Avatar is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/avatar/files/avatar.tsx",
        slot: "ui-component",
        name: "avatar",
      },
    ],
    ui: {
      label: "Avatar",
      icon: "user",
      category: "Components",
      tags: ["primitive", "identity"],
    },
  },
  {
    id: "component.dropdown",
    type: "composite",
    label: "Dropdown",
    description: "Menu and account action dropdown.",
    provides: ["ui.dropdown"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Dropdown is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/dropdown/files/dropdown.tsx",
        slot: "ui-component",
        name: "dropdown",
      },
    ],
    ui: {
      label: "Dropdown",
      icon: "menu",
      category: "Components",
      tags: ["composite", "menu"],
    },
  },
  {
    id: "component.sheet",
    type: "composite",
    label: "Sheet",
    description: "Slide-over panel component.",
    provides: ["ui.sheet"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Sheet is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    files: [
      {
        from: "shadcn/components/sheet/files/sheet.tsx",
        slot: "ui-component",
        name: "sheet",
      },
    ],
    ui: {
      label: "Sheet",
      icon: "layout",
      category: "Components",
      tags: ["composite", "overlay"],
    },
  },
  {
    id: "component.form",
    type: "composite",
    label: "Form",
    description: "Form helpers wired to the selected form and validation engines.",
    provides: ["ui.form"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Form is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "form.engine",
        reason: "Form requires a form state engine.",
        strength: "hard",
      },
      {
        capability: "validation.schema",
        reason: "Form requires a validation schema engine.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Form uses Button for submit actions.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Form uses Input for text controls.",
        strength: "hard",
      },
      {
        capability: "ui.label",
        reason: "Form uses Label for accessible controls.",
        strength: "hard",
      },
    ],
    packages: {
      dependencies: {
        "@hookform/resolvers": packageRange("@hookform/resolvers"),
      },
    },
    files: [
      {
        from: "shadcn/components/form/files/form.tsx",
        slot: "ui-component",
        name: "form",
      },
    ],
    ui: {
      label: "Form",
      icon: "form",
      category: "Components",
      tags: ["composite", "form"],
    },
  },
]
