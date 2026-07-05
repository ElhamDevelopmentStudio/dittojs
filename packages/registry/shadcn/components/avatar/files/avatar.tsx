import * as React from "react"

import { cn } from "@/lib/utils"

export type AvatarProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string
  src?: string
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function Avatar({ className, name, src, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium text-foreground",
        className,
      )}
      aria-label={name}
      {...props}
    >
      {src ? <img src={src} alt="" className="h-full w-full object-cover" /> : initials(name)}
    </div>
  )
}
