import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const links = ["Overview", "Projects", "Settings"]

export function Sidebar() {
  return (
    <aside className="flex h-full w-64 flex-col gap-4 border-r border-border bg-background p-4">
      <Input placeholder="Filter navigation" aria-label="Filter navigation" />
      <nav className="space-y-1">
        {links.map((link) => (
          <Button key={link} type="button" variant="ghost" className="w-full justify-start">
            {link}
          </Button>
        ))}
      </nav>
    </aside>
  )
}
