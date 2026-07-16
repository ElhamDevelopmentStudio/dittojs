import { SettingsForm } from "__DITTO_IMPORT_FORM_COMPONENT_SETTINGS_FORM__"

export function App() {
  return (
    <div className="min-h-screen bg-muted text-foreground">
      <div className="flex min-h-screen">
        <main className="flex-1 p-6">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_22rem]">
            <section className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">SaaS Dashboard</p>
                <h1 className="text-3xl font-semibold tracking-normal">Workspace overview</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  Track active projects, review workspace settings, and keep the generated dashboard
                  shell aligned with your selected DittoJs blocks.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {[
                  ["Active projects", "24"],
                  ["Open tasks", "128"],
                  ["Team members", "12"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-md border border-border bg-muted p-4">
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-normal">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <aside className="rounded-lg border border-border bg-background p-6 shadow-sm">
              <SettingsForm />
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}
