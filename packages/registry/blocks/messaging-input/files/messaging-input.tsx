import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function MessagingInput() {
  return (
    <form className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
      <Input placeholder="Write a message" aria-label="Message" />
      <Button type="submit" className="gap-2">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send
      </Button>
    </form>
  )
}
