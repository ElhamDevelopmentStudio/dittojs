import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const settingsSchema = z.object({
  workspaceName: z.string().min(2, "Use at least two characters."),
  notificationEmail: z.string().email("Use a valid email address."),
})

type SettingsValues = z.infer<typeof settingsSchema>

export function SettingsForm() {
  const form = useForm<SettingsValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      workspaceName: "Ditto Workspace",
      notificationEmail: "team@example.com",
    },
  })

  function onSubmit(values: SettingsValues) {
    void values
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold tracking-normal">Workspace settings</h2>
          <p className="text-sm text-muted-foreground">
            Update the workspace name and notification contact for this dashboard.
          </p>
        </div>

        <FormItem>
          <FormLabel htmlFor="workspaceName">Workspace name</FormLabel>
          <FormControl>
            <Input id="workspaceName" {...form.register("workspaceName")} />
          </FormControl>
          <FormDescription>This name appears in navigation and generated metadata.</FormDescription>
          <FormMessage>{form.formState.errors.workspaceName?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel htmlFor="notificationEmail">Notification email</FormLabel>
          <FormControl>
            <Input id="notificationEmail" type="email" {...form.register("notificationEmail")} />
          </FormControl>
          <FormMessage>{form.formState.errors.notificationEmail?.message}</FormMessage>
        </FormItem>

        <Button type="submit" className="gap-2">
          <Save className="h-4 w-4" aria-hidden="true" />
          Save settings
        </Button>
      </form>
    </Form>
  )
}
