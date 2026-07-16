import { zodResolver } from "@hookform/resolvers/zod"
import { Send, Settings2, Sparkles } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { apiClient } from "@/lib/axios"
import { useAppStore } from "@/stores/app-store"

const contactSchema = z.object({
  name: z.string().min(2, "Use at least two characters."),
  email: z.string().email("Use a valid email address."),
  message: z.string().min(10, "Add a little more detail."),
})

type ContactValues = z.infer<typeof contactSchema>

export function App() {
  const projectName = useAppStore((state) => state.projectName)
  const setProjectName = useAppStore((state) => state.setProjectName)
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "Ditto App",
      email: "team@example.com",
      message: "This template is ready for a real product workflow.",
    },
  })

  function onSubmit(values: ContactValues) {
    setProjectName(values.name)
    void apiClient.post("/contact", values).catch(() => undefined)
  }

  return (
    <main className="min-h-screen bg-muted px-6 py-8 text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              React Recommended
            </div>
            <h1 className="text-3xl font-semibold tracking-normal">{projectName}</h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Vite, TypeScript, Tailwind CSS, shadcn-style components, React Hook Form, Zod, Axios,
              and Zustand are wired together in this generated starter.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>DU</AvatarFallback>
            </Avatar>
            <Button type="button" variant="outline">
              Workspace
            </Button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold tracking-normal">Project intake</h2>
                  <p className="text-sm text-muted-foreground">
                    This form validates with Zod and stores the submitted project name in Zustand.
                  </p>
                </div>

                <FormItem>
                  <FormLabel htmlFor="name">Project name</FormLabel>
                  <FormControl>
                    <Input id="name" {...form.register("name")} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.name?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="email">Contact email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" {...form.register("email")} />
                  </FormControl>
                  <FormMessage>{form.formState.errors.email?.message}</FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel htmlFor="message">Notes</FormLabel>
                  <FormControl>
                    <Textarea id="message" rows={5} {...form.register("message")} />
                  </FormControl>
                  <FormDescription>
                    Submitted data is sent through the generated Axios helper.
                  </FormDescription>
                  <FormMessage>{form.formState.errors.message?.message}</FormMessage>
                </FormItem>

                <Button type="submit" className="gap-2">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Save project
                </Button>
              </form>
            </Form>
          </div>

          <aside className="rounded-lg border border-border bg-background p-6 shadow-sm">
            <Label className="text-sm font-medium">Included stack</Label>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>React + Vite + TypeScript</li>
              <li>Tailwind CSS component styling</li>
              <li>React Hook Form with Zod validation</li>
              <li>Axios HTTP helper and Zustand store</li>
            </ul>
            <div className="mt-6 space-y-3 rounded-md border border-border p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Settings2 className="h-4 w-4" aria-hidden="true" />
                Generated by DittoJs
              </div>
              <p>
                Edit the generated files directly. The selected modules are recorded in
                ditto.generated.json.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
