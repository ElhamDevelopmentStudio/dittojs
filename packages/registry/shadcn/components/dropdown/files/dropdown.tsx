import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export type DropdownProps = {
  label: string
  children: React.ReactNode
}

export function Dropdown({ label, children }: DropdownProps) {
  return (
    <details className="group relative">
      <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        {label}
        <ChevronDown
          className="h-4 w-4 transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-44 rounded-md border border-border bg-background p-1 shadow-lg">
        {children}
      </div>
    </details>
  )
}

export type DropdownItemProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function DropdownItem({ className, ...props }: DropdownItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center rounded-sm px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted",
        className,
      )}
      {...props}
    />
  )
}
