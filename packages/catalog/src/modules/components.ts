import type { ModuleManifest } from "@dittosh/core"

import { packageRange, type KnownPackageName } from "../package-versions.js"

type ComponentDefinition = {
  name: string
  type: "primitive" | "composite"
  label: string
  description: string
  provides: string[]
  requires: NonNullable<ModuleManifest["requires"]>
  packageNames: KnownPackageName[]
  tags: string[]
}

function componentPackages(
  packageNames: KnownPackageName[],
): NonNullable<ModuleManifest["packages"]> | undefined {
  if (packageNames.length === 0) {
    return undefined
  }

  return {
    dependencies: Object.fromEntries(
      packageNames.map((packageName) => [packageName, packageRange(packageName)]),
    ),
  }
}

const templateComponentDefinitions: ComponentDefinition[] = [
  {
    name: "accordion",
    type: "composite",
    label: "Accordion",
    description: "Accordion component from the template shadcn registry.",
    provides: ["ui.accordion"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Accordion is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "alert",
    type: "composite",
    label: "Alert",
    description: "Alert component from the template shadcn registry.",
    provides: ["ui.alert"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Alert is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority"],
    tags: ["composite"],
  },
  {
    name: "alert-dialog",
    type: "composite",
    label: "Alert Dialog",
    description: "Alert Dialog component from the template shadcn registry.",
    provides: ["ui.alert-dialog"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Alert Dialog is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Alert Dialog imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "aspect-ratio",
    type: "composite",
    label: "Aspect Ratio",
    description: "Aspect Ratio component from the template shadcn registry.",
    provides: ["ui.aspect-ratio"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Aspect Ratio is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "attachment",
    type: "composite",
    label: "Attachment",
    description: "Attachment component from the template shadcn registry.",
    provides: ["ui.attachment"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Attachment is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Attachment imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "avatar",
    type: "primitive",
    label: "Avatar",
    description: "Avatar component from the template shadcn registry.",
    provides: ["ui.avatar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Avatar is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive", "template-replacement"],
  },
  {
    name: "badge",
    type: "primitive",
    label: "Badge",
    description: "Badge component from the template shadcn registry.",
    provides: ["ui.badge"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Badge is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "breadcrumb",
    type: "composite",
    label: "Breadcrumb",
    description: "Breadcrumb component from the template shadcn registry.",
    provides: ["ui.breadcrumb"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Breadcrumb is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "bubble",
    type: "composite",
    label: "Bubble",
    description: "Bubble component from the template shadcn registry.",
    provides: ["ui.bubble"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Bubble is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "button",
    type: "primitive",
    label: "Button",
    description: "Button component from the template shadcn registry.",
    provides: ["ui.button"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Button is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["primitive", "template-replacement"],
  },
  {
    name: "button-group",
    type: "composite",
    label: "Button Group",
    description: "Button Group component from the template shadcn registry.",
    provides: ["ui.button-group"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Button Group is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Button Group imports separator.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "calendar",
    type: "composite",
    label: "Calendar",
    description: "Calendar component from the template shadcn registry.",
    provides: ["ui.calendar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Calendar is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Calendar imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "react-day-picker"],
    tags: ["composite"],
  },
  {
    name: "card",
    type: "composite",
    label: "Card",
    description: "Card component from the template shadcn registry.",
    provides: ["ui.card"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Card is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["composite"],
  },
  {
    name: "carousel",
    type: "composite",
    label: "Carousel",
    description: "Carousel component from the template shadcn registry.",
    provides: ["ui.carousel"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Carousel is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Carousel imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["embla-carousel-react", "lucide-react"],
    tags: ["composite"],
  },
  {
    name: "chart",
    type: "composite",
    label: "Chart",
    description: "Chart component from the template shadcn registry.",
    provides: ["ui.chart"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Chart is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["recharts"],
    tags: ["composite"],
  },
  {
    name: "checkbox",
    type: "primitive",
    label: "Checkbox",
    description: "Checkbox component from the template shadcn registry.",
    provides: ["ui.checkbox"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Checkbox is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "collapsible",
    type: "composite",
    label: "Collapsible",
    description: "Collapsible component from the template shadcn registry.",
    provides: ["ui.collapsible"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Collapsible is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "combobox",
    type: "composite",
    label: "Combobox",
    description: "Combobox component from the template shadcn registry.",
    provides: ["ui.combobox"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Combobox is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Combobox imports button.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Combobox imports input-group.",
        strength: "hard",
      },
    ],
    packageNames: ["@base-ui/react", "lucide-react"],
    tags: ["composite"],
  },
  {
    name: "command",
    type: "composite",
    label: "Command",
    description: "Command component from the template shadcn registry.",
    provides: ["ui.command"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Command is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.dialog",
        reason: "Command imports dialog.",
        strength: "hard",
      },
      {
        capability: "ui.input-group",
        reason: "Command imports input-group.",
        strength: "hard",
      },
    ],
    packageNames: ["cmdk", "lucide-react"],
    tags: ["composite"],
  },
  {
    name: "context-menu",
    type: "composite",
    label: "Context Menu",
    description: "Context Menu component from the template shadcn registry.",
    provides: ["ui.context-menu"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Context Menu is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "dialog",
    type: "composite",
    label: "Dialog",
    description: "Dialog component from the template shadcn registry.",
    provides: ["ui.dialog"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Dialog is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Dialog imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "direction",
    type: "composite",
    label: "Direction",
    description: "Direction component from the template shadcn registry.",
    provides: ["ui.direction"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Direction is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "drawer",
    type: "composite",
    label: "Drawer",
    description: "Drawer component from the template shadcn registry.",
    provides: ["ui.drawer"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Drawer is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["vaul"],
    tags: ["composite"],
  },
  {
    name: "dropdown-menu",
    type: "composite",
    label: "Dropdown Menu",
    description: "Dropdown Menu component from the template shadcn registry.",
    provides: ["ui.dropdown-menu"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Dropdown Menu is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "empty",
    type: "composite",
    label: "Empty",
    description: "Empty component from the template shadcn registry.",
    provides: ["ui.empty"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Empty is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority"],
    tags: ["composite"],
  },
  {
    name: "field",
    type: "composite",
    label: "Field",
    description: "Field component from the template shadcn registry.",
    provides: ["ui.field"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Field is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.label",
        reason: "Field imports label.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Field imports separator.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority"],
    tags: ["composite"],
  },
  {
    name: "hover-card",
    type: "composite",
    label: "Hover Card",
    description: "Hover Card component from the template shadcn registry.",
    provides: ["ui.hover-card"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Hover Card is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "input",
    type: "primitive",
    label: "Input",
    description: "Input component from the template shadcn registry.",
    provides: ["ui.input"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Input is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["primitive", "template-replacement"],
  },
  {
    name: "input-group",
    type: "composite",
    label: "Input Group",
    description: "Input Group component from the template shadcn registry.",
    provides: ["ui.input-group"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Input Group is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Input Group imports button.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Input Group imports input.",
        strength: "hard",
      },
      {
        capability: "ui.textarea",
        reason: "Input Group imports textarea.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority"],
    tags: ["composite"],
  },
  {
    name: "input-otp",
    type: "primitive",
    label: "Input OTP",
    description: "Input OTP component from the template shadcn registry.",
    provides: ["ui.input-otp"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Input OTP is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["input-otp", "lucide-react"],
    tags: ["primitive"],
  },
  {
    name: "item",
    type: "composite",
    label: "Item",
    description: "Item component from the template shadcn registry.",
    provides: ["ui.item"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Item is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Item imports separator.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "kbd",
    type: "primitive",
    label: "Kbd",
    description: "Kbd component from the template shadcn registry.",
    provides: ["ui.kbd"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Kbd is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["primitive"],
  },
  {
    name: "label",
    type: "primitive",
    label: "Label",
    description: "Label component from the template shadcn registry.",
    provides: ["ui.label"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Label is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive", "template-replacement"],
  },
  {
    name: "marker",
    type: "composite",
    label: "Marker",
    description: "Marker component from the template shadcn registry.",
    provides: ["ui.marker"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Marker is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "menubar",
    type: "composite",
    label: "Menubar",
    description: "Menubar component from the template shadcn registry.",
    provides: ["ui.menubar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Menubar is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "message",
    type: "composite",
    label: "Message",
    description: "Message component from the template shadcn registry.",
    provides: ["ui.message"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Message is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["composite"],
  },
  {
    name: "message-scroller",
    type: "composite",
    label: "Message Scroller",
    description: "Message Scroller component from the template shadcn registry.",
    provides: ["ui.message-scroller"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Message Scroller is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Message Scroller imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["@shadcn/react", "lucide-react"],
    tags: ["composite"],
  },
  {
    name: "native-select",
    type: "primitive",
    label: "Native Select",
    description: "Native Select component from the template shadcn registry.",
    provides: ["ui.native-select"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Native Select is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react"],
    tags: ["primitive"],
  },
  {
    name: "navigation-menu",
    type: "composite",
    label: "Navigation Menu",
    description: "Navigation Menu component from the template shadcn registry.",
    provides: ["ui.navigation-menu"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Navigation Menu is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "pagination",
    type: "composite",
    label: "Pagination",
    description: "Pagination component from the template shadcn registry.",
    provides: ["ui.pagination"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Pagination is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Pagination imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react"],
    tags: ["composite"],
  },
  {
    name: "popover",
    type: "composite",
    label: "Popover",
    description: "Popover component from the template shadcn registry.",
    provides: ["ui.popover"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Popover is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "progress",
    type: "primitive",
    label: "Progress",
    description: "Progress component from the template shadcn registry.",
    provides: ["ui.progress"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Progress is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "radio-group",
    type: "primitive",
    label: "Radio Group",
    description: "Radio Group component from the template shadcn registry.",
    provides: ["ui.radio-group"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Radio Group is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "resizable",
    type: "composite",
    label: "Resizable",
    description: "Resizable component from the template shadcn registry.",
    provides: ["ui.resizable"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Resizable is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["react-resizable-panels"],
    tags: ["composite"],
  },
  {
    name: "scroll-area",
    type: "composite",
    label: "Scroll Area",
    description: "Scroll Area component from the template shadcn registry.",
    provides: ["ui.scroll-area"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Scroll Area is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
  {
    name: "select",
    type: "composite",
    label: "Select",
    description: "Select component from the template shadcn registry.",
    provides: ["ui.select"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Select is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "separator",
    type: "primitive",
    label: "Separator",
    description: "Separator component from the template shadcn registry.",
    provides: ["ui.separator"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Separator is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "sheet",
    type: "composite",
    label: "Sheet",
    description: "Sheet component from the template shadcn registry.",
    provides: ["ui.sheet"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Sheet is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Sheet imports button.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "radix-ui"],
    tags: ["composite", "template-replacement"],
  },
  {
    name: "sidebar",
    type: "composite",
    label: "Sidebar",
    description: "Sidebar component from the template shadcn registry.",
    provides: ["ui.sidebar"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Sidebar is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.button",
        reason: "Sidebar imports button.",
        strength: "hard",
      },
      {
        capability: "ui.input",
        reason: "Sidebar imports input.",
        strength: "hard",
      },
      {
        capability: "ui.separator",
        reason: "Sidebar imports separator.",
        strength: "hard",
      },
      {
        capability: "ui.sheet",
        reason: "Sidebar imports sheet.",
        strength: "hard",
      },
      {
        capability: "ui.skeleton",
        reason: "Sidebar imports skeleton.",
        strength: "hard",
      },
      {
        capability: "ui.tooltip",
        reason: "Sidebar imports tooltip.",
        strength: "hard",
      },
      {
        capability: "hook.use-mobile",
        reason: "Sidebar uses use-mobile.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "lucide-react", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "skeleton",
    type: "primitive",
    label: "Skeleton",
    description: "Skeleton component from the template shadcn registry.",
    provides: ["ui.skeleton"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Skeleton is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["primitive"],
  },
  {
    name: "slider",
    type: "primitive",
    label: "Slider",
    description: "Slider component from the template shadcn registry.",
    provides: ["ui.slider"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Slider is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "sonner",
    type: "composite",
    label: "Sonner",
    description: "Sonner component from the template shadcn registry.",
    provides: ["ui.sonner"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Sonner is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react", "sonner"],
    tags: ["composite"],
  },
  {
    name: "spinner",
    type: "primitive",
    label: "Spinner",
    description: "Spinner component from the template shadcn registry.",
    provides: ["ui.spinner"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Spinner is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["lucide-react"],
    tags: ["primitive"],
  },
  {
    name: "switch",
    type: "primitive",
    label: "Switch",
    description: "Switch component from the template shadcn registry.",
    provides: ["ui.switch"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Switch is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "table",
    type: "primitive",
    label: "Table",
    description: "Table component from the template shadcn registry.",
    provides: ["ui.table"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Table is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["primitive"],
  },
  {
    name: "tabs",
    type: "composite",
    label: "Tabs",
    description: "Tabs component from the template shadcn registry.",
    provides: ["ui.tabs"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Tabs is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "textarea",
    type: "primitive",
    label: "Textarea",
    description: "Textarea component from the template shadcn registry.",
    provides: ["ui.textarea"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Textarea is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: [],
    tags: ["primitive", "template-replacement"],
  },
  {
    name: "toggle",
    type: "primitive",
    label: "Toggle",
    description: "Toggle component from the template shadcn registry.",
    provides: ["ui.toggle"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Toggle is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["primitive"],
  },
  {
    name: "toggle-group",
    type: "composite",
    label: "Toggle Group",
    description: "Toggle Group component from the template shadcn registry.",
    provides: ["ui.toggle-group"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Toggle Group is generated from the selected shadcn component library.",
        strength: "hard",
      },
      {
        capability: "ui.toggle",
        reason: "Toggle Group imports toggle.",
        strength: "hard",
      },
    ],
    packageNames: ["class-variance-authority", "radix-ui"],
    tags: ["composite"],
  },
  {
    name: "tooltip",
    type: "composite",
    label: "Tooltip",
    description: "Tooltip component from the template shadcn registry.",
    provides: ["ui.tooltip"],
    requires: [
      {
        capability: "component-library.shadcn",
        reason: "Tooltip is generated from the selected shadcn component library.",
        strength: "hard",
      },
    ],
    packageNames: ["radix-ui"],
    tags: ["composite"],
  },
]

const compatibilityComponentManifests: ModuleManifest[] = [
  {
    id: "component.dropdown",
    type: "composite",
    label: "Dropdown",
    description: "Compatibility alias for the template dropdown menu component.",
    provides: ["ui.dropdown"],
    requires: [
      {
        moduleId: "component.dropdown-menu",
        reason: "Dropdown uses the template dropdown-menu component implementation.",
        strength: "hard",
      },
    ],
    ui: {
      label: "Dropdown",
      icon: "menu",
      category: "Components",
      tags: ["composite", "menu", "template-replacement", "compatibility"],
    },
  },
]

function componentManifest(definition: ComponentDefinition): ModuleManifest {
  const packages = componentPackages(definition.packageNames)
  const manifest: ModuleManifest = {
    id: `component.${definition.name}`,
    type: definition.type,
    label: definition.label,
    description: definition.description,
    provides: definition.provides,
    requires: definition.requires,
    files: [
      {
        from: `shadcn/components/${definition.name}/files/${definition.name}.tsx`,
        slot: "ui-component",
        name: definition.name,
      },
    ],
    ui: {
      label: definition.label,
      icon: definition.type === "primitive" ? "box" : "component",
      category: "Components",
      tags: definition.tags,
    },
    metadata: {
      preview: {
        id: `preview.component.${definition.name}`,
        kind: definition.type,
        viewport: "component",
      },
    },
  }

  if (packages !== undefined) {
    manifest.packages = packages
  }

  return manifest
}

const componentManifestDefinitions: ModuleManifest[] = [
  ...templateComponentDefinitions.map(componentManifest),
  {
    id: "component.form",
    type: "composite",
    label: "Form",
    description:
      "React Hook Form helper retained until the template field-based form adapter is promoted.",
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
    ],
    packages: {
      dependencies: {
        "@hookform/resolvers": packageRange("@hookform/resolvers"),
        "react-hook-form": packageRange("react-hook-form"),
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
      tags: ["composite", "form", "template-adapter-pending"],
    },
    metadata: {
      templateGap:
        "template/src/components/ui/form.tsx does not exist; derive this from field/auth form patterns in a later adapter pass.",
    },
  },
  ...compatibilityComponentManifests,
]

export const componentManifests: ModuleManifest[] = componentManifestDefinitions.map((manifest) => {
  if (manifest.metadata?.preview !== undefined) {
    return manifest
  }

  return {
    ...manifest,
    metadata: {
      ...(manifest.metadata ?? {}),
      preview: {
        id: `preview.${manifest.id}`,
        kind: manifest.type,
        viewport: "component",
      },
    },
  }
})
