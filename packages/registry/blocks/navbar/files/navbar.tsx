import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dropdown, DropdownItem } from "@/components/ui/dropdown"
import { Input } from "@/components/ui/input"

export function Navbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-border bg-background px-6 py-4">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost">
          Ditto
        </Button>
        <Input className="w-64" placeholder="Search" aria-label="Search" />
      </div>
      <div className="flex items-center gap-3">
        <Avatar name="Ditto User" />
        <Dropdown label="Account">
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
        </Dropdown>
      </div>
    </header>
  )
}
