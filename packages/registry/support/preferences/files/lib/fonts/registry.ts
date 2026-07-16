type FontDefinition = {
  label: string
  font: {
    variable: string
  }
}

function font(variable: string): FontDefinition["font"] {
  return { variable }
}

export const fontRegistry = {
  geist: {
    label: "Geist",
    font: font(""),
  },
  inter: {
    label: "Inter",
    font: font(""),
  },
  notoSans: {
    label: "Noto Sans",
    font: font(""),
  },
  nunitoSans: {
    label: "Nunito Sans",
    font: font(""),
  },
  figtree: {
    label: "Figtree",
    font: font(""),
  },
  roboto: {
    label: "Roboto",
    font: font(""),
  },
  raleway: {
    label: "Raleway",
    font: font(""),
  },
  dmSans: {
    label: "DM Sans",
    font: font(""),
  },
  publicSans: {
    label: "Public Sans",
    font: font(""),
  },
  outfit: {
    label: "Outfit",
    font: font(""),
  },
  geistMono: {
    label: "Geist Mono",
    font: font(""),
  },
  geistPixelSquare: {
    label: "Geist Pixel Square",
    font: font(""),
  },
  jetBrainsMono: {
    label: "JetBrains Mono",
    font: font(""),
  },
  notoSerif: {
    label: "Noto Serif",
    font: font(""),
  },
  robotoSlab: {
    label: "Roboto Slab",
    font: font(""),
  },
  merriweather: {
    label: "Merriweather",
    font: font(""),
  },
  lora: {
    label: "Lora",
    font: font(""),
  },
  playfairDisplay: {
    label: "Playfair Display",
    font: font(""),
  },
} as const satisfies Record<string, FontDefinition>

export type FontKey = keyof typeof fontRegistry

export const fontKeys = Object.keys(fontRegistry) as FontKey[]

export const fontVars = Object.values(fontRegistry)
  .map(({ font }) => font.variable)
  .filter(Boolean)
  .join(" ")

export const fontOptions = fontKeys.map((key) => ({
  key,
  label: fontRegistry[key].label,
}))
