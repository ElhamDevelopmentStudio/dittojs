import type { RemixiconComponentType } from "@remixicon/react"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBox3Line,
  RiBookOpenLine,
  RiCheckLine,
  RiChat3Line,
  RiCloseLine,
  RiCloudLine,
  RiCodeLine,
  RiCommandLine,
  RiDashboardLine,
  RiDatabaseLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiFlashlightLine,
  RiFolderLine,
  RiInputField,
  RiLayoutLine,
  RiLoader4Line,
  RiLockLine,
  RiMenuLine,
  RiMessage2Line,
  RiPaletteLine,
  RiPlayLine,
  RiReactjsLine,
  RiRouteLine,
  RiSettings3Line,
  RiSidebarFoldLine,
  RiSparklingLine,
  RiStackLine,
  RiStarLine,
  RiTableLine,
  RiTailwindCssLine,
  RiTerminalLine,
  RiText,
  RiUserLine,
  RiVuejsLine,
  RiSvelteLine,
} from "@remixicon/react"

export type AppIconName =
  | "arrow-left"
  | "arrow-right"
  | "box"
  | "check"
  | "chat"
  | "close"
  | "cloud"
  | "code"
  | "command"
  | "copy"
  | "dashboard"
  | "database"
  | "docs"
  | "download"
  | "file"
  | "flash"
  | "folder"
  | "form"
  | "input"
  | "layout"
  | "lock"
  | "menu"
  | "message"
  | "palette"
  | "play"
  | "react"
  | "route"
  | "settings"
  | "sidebar"
  | "sparkle"
  | "spinner"
  | "stack"
  | "star"
  | "svelte"
  | "table"
  | "tailwind"
  | "terminal"
  | "text"
  | "user"
  | "vue"
  | "warning"

const icons: Record<AppIconName, RemixiconComponentType> = {
  "arrow-left": RiArrowLeftLine,
  "arrow-right": RiArrowRightLine,
  box: RiBox3Line,
  check: RiCheckLine,
  chat: RiChat3Line,
  close: RiCloseLine,
  cloud: RiCloudLine,
  code: RiCodeLine,
  command: RiCommandLine,
  copy: RiFileCopyLine,
  dashboard: RiDashboardLine,
  database: RiDatabaseLine,
  docs: RiBookOpenLine,
  download: RiDownloadLine,
  file: RiFileTextLine,
  flash: RiFlashlightLine,
  folder: RiFolderLine,
  form: RiFileTextLine,
  input: RiInputField,
  layout: RiLayoutLine,
  lock: RiLockLine,
  menu: RiMenuLine,
  message: RiMessage2Line,
  palette: RiPaletteLine,
  play: RiPlayLine,
  react: RiReactjsLine,
  route: RiRouteLine,
  settings: RiSettings3Line,
  sidebar: RiSidebarFoldLine,
  sparkle: RiSparklingLine,
  spinner: RiLoader4Line,
  stack: RiStackLine,
  star: RiStarLine,
  svelte: RiSvelteLine,
  table: RiTableLine,
  tailwind: RiTailwindCssLine,
  terminal: RiTerminalLine,
  text: RiText,
  user: RiUserLine,
  vue: RiVuejsLine,
  warning: RiErrorWarningLine,
}

export function isAppIconName(name: string | undefined): name is AppIconName {
  return name !== undefined && name in icons
}

export function AppIcon({
  name,
  className,
  "aria-hidden": ariaHidden = true,
}: {
  name: AppIconName
  className?: string
  "aria-hidden"?: boolean
}) {
  const Icon = icons[name]

  return <Icon aria-hidden={ariaHidden} className={className ?? "icon"} focusable="false" />
}
