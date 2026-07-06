import type { RemixiconComponentType } from "@remixicon/react"
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBookOpenLine,
  RiCheckLine,
  RiCloseLine,
  RiCodeLine,
  RiDownloadLine,
  RiErrorWarningLine,
  RiFileCopyLine,
  RiFileTextLine,
  RiFolderLine,
  RiLoader4Line,
  RiLockLine,
  RiPlayLine,
} from "@remixicon/react"

export type AppIconName =
  | "arrow-left"
  | "arrow-right"
  | "check"
  | "close"
  | "code"
  | "copy"
  | "docs"
  | "download"
  | "file"
  | "folder"
  | "lock"
  | "play"
  | "spinner"
  | "warning"

const icons: Record<AppIconName, RemixiconComponentType> = {
  "arrow-left": RiArrowLeftLine,
  "arrow-right": RiArrowRightLine,
  check: RiCheckLine,
  close: RiCloseLine,
  code: RiCodeLine,
  copy: RiFileCopyLine,
  docs: RiBookOpenLine,
  download: RiDownloadLine,
  file: RiFileTextLine,
  folder: RiFolderLine,
  lock: RiLockLine,
  play: RiPlayLine,
  spinner: RiLoader4Line,
  warning: RiErrorWarningLine,
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
