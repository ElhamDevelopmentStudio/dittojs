export function TypingIndicator() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm text-muted-foreground">
      <span className="h-2 w-2 rounded-full bg-primary" />
      Someone is typing
    </div>
  )
}
