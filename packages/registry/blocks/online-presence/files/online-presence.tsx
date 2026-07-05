import { Avatar } from "@/components/ui/avatar"

export function OnlinePresence() {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
      <div className="relative">
        <Avatar name="Ditto User" />
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">Ditto User</p>
        <p className="text-xs text-muted-foreground">Online now</p>
      </div>
    </div>
  )
}
