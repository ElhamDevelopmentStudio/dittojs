import { MessagingInput } from "__DITTO_IMPORT_BLOCK_MESSAGING_INPUT__"
import { Navbar } from "__DITTO_IMPORT_BLOCK_NAVBAR__"
import { OnlinePresence } from "__DITTO_IMPORT_BLOCK_ONLINE_PRESENCE__"
import { TypingIndicator } from "__DITTO_IMPORT_BLOCK_TYPING_INDICATOR__"

const messages = [
  {
    author: "Ditto User",
    body: "The chat app preset now renders the messaging composition.",
  },
  {
    author: "Workspace Bot",
    body: "Navbar, presence, typing state, and message input are assembled from blocks.",
  },
]

export function App() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <Navbar />
      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-5xl flex-col gap-6 px-6 py-8">
        <section className="grid gap-6 lg:grid-cols-[1fr_18rem]">
          <div className="flex min-h-[32rem] flex-col rounded-lg border border-border bg-background shadow-sm">
            <header className="border-b border-border p-5">
              <p className="text-sm font-medium text-primary">Chat App</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-normal">Team conversation</h1>
            </header>

            <div className="flex-1 space-y-4 p-5">
              {messages.map((message) => (
                <article key={message.author} className="rounded-lg bg-muted p-4">
                  <p className="text-sm font-medium">{message.author}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{message.body}</p>
                </article>
              ))}
              <TypingIndicator />
            </div>

            <div className="border-t border-border p-5">
              <MessagingInput />
            </div>
          </div>

          <aside className="space-y-4">
            <OnlinePresence />
            <div className="rounded-lg border border-border bg-background p-4 shadow-sm">
              <p className="text-sm font-medium">Preset composition</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This app root imports the generated chat blocks from the selected project structure.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  )
}
