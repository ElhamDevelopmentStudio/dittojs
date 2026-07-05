import * as React from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"

export type SheetProps = {
  title: string
  trigger: string
  children: React.ReactNode
}

export function Sheet({ title, trigger, children }: SheetProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mt-6">
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        {trigger}
      </Button>
      {open ? (
        <div className="fixed inset-0 z-40 bg-foreground/20" role="presentation">
          <aside className="ml-auto flex h-full w-full max-w-sm flex-col gap-6 bg-background p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-normal">{title}</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                aria-label="Close sheet"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
            {children}
          </aside>
        </div>
      ) : null}
    </div>
  )
}
