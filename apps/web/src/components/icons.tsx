import type { RemixiconComponentType } from "@remixicon/react"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiAppsLine,
  RiBox3Line,
  RiBookOpenLine,
  RiCalendarLine,
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
  RiKeyLine,
  RiInputField,
  RiLayoutLine,
  RiListCheck,
  RiLoader4Line,
  RiLockLine,
  RiMenuLine,
  RiMessage2Line,
  RiPaletteLine,
  RiPlayLine,
  RiPlugLine,
  RiEyeLine,
  RiReactjsLine,
  RiRouteLine,
  RiSettings3Line,
  RiSidebarFoldLine,
  RiSparklingLine,
  RiEqualizerLine,
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
  | "calendar"
  | "check"
  | "chat"
  | "close"
  | "cloud"
  | "code"
  | "command"
  | "component"
  | "copy"
  | "dashboard"
  | "database"
  | "docs"
  | "download"
  | "file"
  | "flash"
  | "folder"
  | "form"
  | "hook"
  | "input"
  | "key"
  | "layout"
  | "layout-dashboard"
  | "list"
  | "lock"
  | "menu"
  | "message"
  | "palette"
  | "play"
  | "preview"
  | "react"
  | "route"
  | "settings"
  | "sidebar"
  | "sparkle"
  | "sparkles"
  | "sliders"
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
  calendar: RiCalendarLine,
  check: RiCheckLine,
  chat: RiChat3Line,
  close: RiCloseLine,
  cloud: RiCloudLine,
  code: RiCodeLine,
  command: RiCommandLine,
  component: RiAppsLine,
  copy: RiFileCopyLine,
  dashboard: RiDashboardLine,
  database: RiDatabaseLine,
  docs: RiBookOpenLine,
  download: RiDownloadLine,
  file: RiFileTextLine,
  flash: RiFlashlightLine,
  folder: RiFolderLine,
  form: RiFileTextLine,
  hook: RiPlugLine,
  input: RiInputField,
  key: RiKeyLine,
  layout: RiLayoutLine,
  "layout-dashboard": RiDashboardLine,
  list: RiListCheck,
  lock: RiLockLine,
  menu: RiMenuLine,
  message: RiMessage2Line,
  palette: RiPaletteLine,
  play: RiPlayLine,
  preview: RiEyeLine,
  react: RiReactjsLine,
  route: RiRouteLine,
  settings: RiSettings3Line,
  sidebar: RiSidebarFoldLine,
  sparkle: RiSparklingLine,
  sparkles: RiSparklingLine,
  sliders: RiEqualizerLine,
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
