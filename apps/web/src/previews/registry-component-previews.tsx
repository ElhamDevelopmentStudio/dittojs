import { useState, type ComponentType, type ReactElement, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import {
  BellIcon,
  CheckIcon,
  FileIcon,
  InboxIcon,
  MailIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import * as AccordionUi from "../../../../packages/registry/shadcn/components/accordion/files/accordion"
import * as AlertUi from "../../../../packages/registry/shadcn/components/alert/files/alert"
import * as AlertDialogUi from "../../../../packages/registry/shadcn/components/alert-dialog/files/alert-dialog"
import * as AspectRatioUi from "../../../../packages/registry/shadcn/components/aspect-ratio/files/aspect-ratio"
import * as AttachmentUi from "../../../../packages/registry/shadcn/components/attachment/files/attachment"
import * as AvatarUi from "../../../../packages/registry/shadcn/components/avatar/files/avatar"
import * as BadgeUi from "../../../../packages/registry/shadcn/components/badge/files/badge"
import * as BreadcrumbUi from "../../../../packages/registry/shadcn/components/breadcrumb/files/breadcrumb"
import * as BubbleUi from "../../../../packages/registry/shadcn/components/bubble/files/bubble"
import * as ButtonUi from "../../../../packages/registry/shadcn/components/button/files/button"
import * as ButtonGroupUi from "../../../../packages/registry/shadcn/components/button-group/files/button-group"
import * as CalendarUi from "../../../../packages/registry/shadcn/components/calendar/files/calendar"
import * as CardUi from "../../../../packages/registry/shadcn/components/card/files/card"
import * as CarouselUi from "../../../../packages/registry/shadcn/components/carousel/files/carousel"
import * as ChartUi from "../../../../packages/registry/shadcn/components/chart/files/chart"
import * as CheckboxUi from "../../../../packages/registry/shadcn/components/checkbox/files/checkbox"
import * as CollapsibleUi from "../../../../packages/registry/shadcn/components/collapsible/files/collapsible"
import * as ComboboxUi from "../../../../packages/registry/shadcn/components/combobox/files/combobox"
import * as CommandUi from "../../../../packages/registry/shadcn/components/command/files/command"
import * as ContextMenuUi from "../../../../packages/registry/shadcn/components/context-menu/files/context-menu"
import * as DialogUi from "../../../../packages/registry/shadcn/components/dialog/files/dialog"
import * as DirectionUi from "../../../../packages/registry/shadcn/components/direction/files/direction"
import * as DrawerUi from "../../../../packages/registry/shadcn/components/drawer/files/drawer"
import * as DropdownUi from "../../../../packages/registry/shadcn/components/dropdown-menu/files/dropdown-menu"
import * as EmptyUi from "../../../../packages/registry/shadcn/components/empty/files/empty"
import * as FieldUi from "../../../../packages/registry/shadcn/components/field/files/field"
import * as FormUi from "../../../../packages/registry/shadcn/components/form/files/form"
import * as HoverCardUi from "../../../../packages/registry/shadcn/components/hover-card/files/hover-card"
import * as InputUi from "../../../../packages/registry/shadcn/components/input/files/input"
import * as InputGroupUi from "../../../../packages/registry/shadcn/components/input-group/files/input-group"
import * as InputOtpUi from "../../../../packages/registry/shadcn/components/input-otp/files/input-otp"
import * as ItemUi from "../../../../packages/registry/shadcn/components/item/files/item"
import * as KbdUi from "../../../../packages/registry/shadcn/components/kbd/files/kbd"
import * as LabelUi from "../../../../packages/registry/shadcn/components/label/files/label"
import * as MarkerUi from "../../../../packages/registry/shadcn/components/marker/files/marker"
import * as MenubarUi from "../../../../packages/registry/shadcn/components/menubar/files/menubar"
import * as MessageUi from "../../../../packages/registry/shadcn/components/message/files/message"
import * as MessageScrollerUi from "../../../../packages/registry/shadcn/components/message-scroller/files/message-scroller"
import * as NativeSelectUi from "../../../../packages/registry/shadcn/components/native-select/files/native-select"
import * as NavigationMenuUi from "../../../../packages/registry/shadcn/components/navigation-menu/files/navigation-menu"
import * as PaginationUi from "../../../../packages/registry/shadcn/components/pagination/files/pagination"
import * as PopoverUi from "../../../../packages/registry/shadcn/components/popover/files/popover"
import * as ProgressUi from "../../../../packages/registry/shadcn/components/progress/files/progress"
import * as RadioGroupUi from "../../../../packages/registry/shadcn/components/radio-group/files/radio-group"
import * as ResizableUi from "../../../../packages/registry/shadcn/components/resizable/files/resizable"
import * as ScrollAreaUi from "../../../../packages/registry/shadcn/components/scroll-area/files/scroll-area"
import * as SelectUi from "../../../../packages/registry/shadcn/components/select/files/select"
import * as SeparatorUi from "../../../../packages/registry/shadcn/components/separator/files/separator"
import * as SheetUi from "../../../../packages/registry/shadcn/components/sheet/files/sheet"
import * as SidebarUi from "../../../../packages/registry/shadcn/components/sidebar/files/sidebar"
import * as SkeletonUi from "../../../../packages/registry/shadcn/components/skeleton/files/skeleton"
import * as SliderUi from "../../../../packages/registry/shadcn/components/slider/files/slider"
import * as SonnerUi from "../../../../packages/registry/shadcn/components/sonner/files/sonner"
import * as SpinnerUi from "../../../../packages/registry/shadcn/components/spinner/files/spinner"
import * as SwitchUi from "../../../../packages/registry/shadcn/components/switch/files/switch"
import * as TableUi from "../../../../packages/registry/shadcn/components/table/files/table"
import * as TabsUi from "../../../../packages/registry/shadcn/components/tabs/files/tabs"
import * as TextareaUi from "../../../../packages/registry/shadcn/components/textarea/files/textarea"
import * as ToggleUi from "../../../../packages/registry/shadcn/components/toggle/files/toggle"
import * as ToggleGroupUi from "../../../../packages/registry/shadcn/components/toggle-group/files/toggle-group"
import * as TooltipUi from "../../../../packages/registry/shadcn/components/tooltip/files/tooltip"
import { MessagingInput } from "../../../../packages/registry/blocks/messaging-input/files/messaging-input"
import { OnlinePresence } from "../../../../packages/registry/blocks/online-presence/files/online-presence"
import { SettingsForm } from "../../../../packages/registry/blocks/settings-form/files/settings-form"
import { TypingIndicator } from "../../../../packages/registry/blocks/typing-indicator/files/typing-indicator"

import { registryInlinePreviewIds } from "./preview-capabilities"

type PreviewRenderer = () => ReactElement

function Stage({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="registry-preview-theme grid min-h-dvh place-items-center bg-background p-8 text-foreground">
      <div
        className={
          wide
            ? "grid w-full max-w-5xl justify-items-center"
            : "grid w-full max-w-xl justify-items-center"
        }
      >
        {children}
      </div>
    </div>
  )
}

function Panel({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border bg-card p-6 shadow-sm">{children}</div>
}

function FormPreview() {
  const methods = useForm({ defaultValues: { workspace: "Ditto Studio" } })
  return (
    <Stage>
      <FormUi.Form {...methods}>
        <form className="space-y-5 rounded-xl border bg-card p-6">
          <FormUi.FormItem>
            <FormUi.FormLabel htmlFor="workspace">Workspace</FormUi.FormLabel>
            <FormUi.FormControl>
              <InputUi.Input id="workspace" {...methods.register("workspace")} />
            </FormUi.FormControl>
            <FormUi.FormDescription>The name shown to your team.</FormUi.FormDescription>
          </FormUi.FormItem>
          <ButtonUi.Button type="button">Save changes</ButtonUi.Button>
        </form>
      </FormUi.Form>
    </Stage>
  )
}

function SidebarPreview() {
  return (
    <div className="registry-preview-theme min-h-dvh bg-background text-foreground">
      <TooltipUi.TooltipProvider>
        <SidebarUi.SidebarProvider defaultOpen>
          <SidebarUi.Sidebar collapsible="icon">
            <SidebarUi.SidebarHeader>
              <strong className="px-2 text-sm">Ditto Studio</strong>
              <SidebarUi.SidebarInput placeholder="Search" />
            </SidebarUi.SidebarHeader>
            <SidebarUi.SidebarContent>
              <SidebarUi.SidebarGroup>
                <SidebarUi.SidebarGroupLabel>Workspace</SidebarUi.SidebarGroupLabel>
                <SidebarUi.SidebarGroupContent>
                  <SidebarUi.SidebarMenu>
                    {[
                      { Icon: InboxIcon, label: "Overview" },
                      { Icon: FileIcon, label: "Projects" },
                      { Icon: BellIcon, label: "Activity" },
                      { Icon: SettingsIcon, label: "Settings" },
                    ].map(({ Icon, label }) => (
                      <SidebarUi.SidebarMenuItem key={label}>
                        <SidebarUi.SidebarMenuButton tooltip={label}>
                          <Icon /> <span>{label}</span>
                        </SidebarUi.SidebarMenuButton>
                      </SidebarUi.SidebarMenuItem>
                    ))}
                  </SidebarUi.SidebarMenu>
                </SidebarUi.SidebarGroupContent>
              </SidebarUi.SidebarGroup>
            </SidebarUi.SidebarContent>
            <SidebarUi.SidebarFooter>
              <SidebarUi.SidebarMenuButton>
                <UserIcon />
                <span>Elham</span>
              </SidebarUi.SidebarMenuButton>
            </SidebarUi.SidebarFooter>
          </SidebarUi.Sidebar>
          <SidebarUi.SidebarInset className="p-8">
            <SidebarUi.SidebarTrigger />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {["Projects", "Components", "Builds"].map((label, index) => (
                <CardUi.Card key={label}>
                  <CardUi.CardHeader>
                    <CardUi.CardDescription>{label}</CardUi.CardDescription>
                    <CardUi.CardTitle>{[12, 60, 284][index]}</CardUi.CardTitle>
                  </CardUi.CardHeader>
                </CardUi.Card>
              ))}
            </div>
          </SidebarUi.SidebarInset>
        </SidebarUi.SidebarProvider>
      </TooltipUi.TooltipProvider>
    </div>
  )
}

function InputOtpPreview() {
  const [value, setValue] = useState("421890")

  return (
    <Stage>
      <InputOtpUi.InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOtpUi.InputOTPGroup>
          {[0, 1, 2].map((index) => (
            <InputOtpUi.InputOTPSlot key={index} index={index} />
          ))}
        </InputOtpUi.InputOTPGroup>
        <InputOtpUi.InputOTPSeparator />
        <InputOtpUi.InputOTPGroup>
          {[3, 4, 5].map((index) => (
            <InputOtpUi.InputOTPSlot key={index} index={index} />
          ))}
        </InputOtpUi.InputOTPGroup>
      </InputOtpUi.InputOTP>
    </Stage>
  )
}

const renderers: Record<string, PreviewRenderer> = {
  "component.accordion": () => (
    <Stage>
      <AccordionUi.Accordion type="single" defaultValue="origin">
        <AccordionUi.AccordionItem value="origin">
          <AccordionUi.AccordionTrigger>Why the name Ditto?</AccordionUi.AccordionTrigger>
          <AccordionUi.AccordionContent>
            One validated source becomes many independent projects.
          </AccordionUi.AccordionContent>
        </AccordionUi.AccordionItem>
        <AccordionUi.AccordionItem value="ownership">
          <AccordionUi.AccordionTrigger>Do I own the output?</AccordionUi.AccordionTrigger>
          <AccordionUi.AccordionContent>
            Yes. Every generated component is yours to change.
          </AccordionUi.AccordionContent>
        </AccordionUi.AccordionItem>
      </AccordionUi.Accordion>
    </Stage>
  ),
  "component.alert": () => (
    <Stage>
      <AlertUi.Alert>
        <CheckIcon />
        <AlertUi.AlertTitle>Template resolved</AlertUi.AlertTitle>
        <AlertUi.AlertDescription>
          All dependencies are compatible and ready to generate.
        </AlertUi.AlertDescription>
        <AlertUi.AlertAction>
          <ButtonUi.Button size="sm" variant="outline">
            Details
          </ButtonUi.Button>
        </AlertUi.AlertAction>
      </AlertUi.Alert>
    </Stage>
  ),
  "component.alert-dialog": () => (
    <Stage>
      <AlertDialogUi.AlertDialog defaultOpen>
        <AlertDialogUi.AlertDialogContent>
          <AlertDialogUi.AlertDialogHeader>
            <AlertDialogUi.AlertDialogTitle>Replace this selection?</AlertDialogUi.AlertDialogTitle>
            <AlertDialogUi.AlertDialogDescription>
              The resolver will update dependent components.
            </AlertDialogUi.AlertDialogDescription>
          </AlertDialogUi.AlertDialogHeader>
          <AlertDialogUi.AlertDialogFooter>
            <AlertDialogUi.AlertDialogCancel>Cancel</AlertDialogUi.AlertDialogCancel>
            <AlertDialogUi.AlertDialogAction>Continue</AlertDialogUi.AlertDialogAction>
          </AlertDialogUi.AlertDialogFooter>
        </AlertDialogUi.AlertDialogContent>
      </AlertDialogUi.AlertDialog>
    </Stage>
  ),
  "component.aspect-ratio": () => (
    <Stage>
      <AspectRatioUi.AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
        <div className="grid h-full place-items-center bg-[linear-gradient(135deg,var(--primary),color-mix(in_oklch,var(--primary),white_55%))] text-xl font-semibold text-primary-foreground">
          16 : 9
        </div>
      </AspectRatioUi.AspectRatio>
    </Stage>
  ),
  "component.attachment": () => (
    <Stage>
      <AttachmentUi.Attachment>
        <AttachmentUi.AttachmentMedia>
          <PaperclipIcon />
        </AttachmentUi.AttachmentMedia>
        <AttachmentUi.AttachmentContent>
          <AttachmentUi.AttachmentTitle>manifest.json</AttachmentUi.AttachmentTitle>
          <AttachmentUi.AttachmentDescription>24 KB · Ready</AttachmentUi.AttachmentDescription>
        </AttachmentUi.AttachmentContent>
        <AttachmentUi.AttachmentActions>
          <AttachmentUi.AttachmentAction aria-label="More">
            <MoreHorizontalIcon />
          </AttachmentUi.AttachmentAction>
        </AttachmentUi.AttachmentActions>
      </AttachmentUi.Attachment>
    </Stage>
  ),
  "component.avatar": () => (
    <Stage>
      <div className="flex items-center gap-3">
        <AvatarUi.Avatar className="size-14">
          <AvatarUi.AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarUi.AvatarFallback>ED</AvatarUi.AvatarFallback>
          <AvatarUi.AvatarBadge />
        </AvatarUi.Avatar>
        <div>
          <strong className="block">Elham Development</strong>
          <span className="text-sm text-muted-foreground">Maintainer</span>
        </div>
      </div>
    </Stage>
  ),
  "component.badge": () => (
    <Stage>
      <div className="flex flex-wrap gap-2">
        <BadgeUi.Badge>Resolved</BadgeUi.Badge>
        <BadgeUi.Badge variant="secondary">Recommended</BadgeUi.Badge>
        <BadgeUi.Badge variant="outline">TypeScript</BadgeUi.Badge>
        <BadgeUi.Badge variant="destructive">Conflict</BadgeUi.Badge>
      </div>
    </Stage>
  ),
  "component.breadcrumb": () => (
    <Stage>
      <BreadcrumbUi.Breadcrumb>
        <BreadcrumbUi.BreadcrumbList>
          <BreadcrumbUi.BreadcrumbItem>
            <BreadcrumbUi.BreadcrumbLink href="#">Templates</BreadcrumbUi.BreadcrumbLink>
          </BreadcrumbUi.BreadcrumbItem>
          <BreadcrumbUi.BreadcrumbSeparator />
          <BreadcrumbUi.BreadcrumbItem>
            <BreadcrumbUi.BreadcrumbLink href="#">Dashboard</BreadcrumbUi.BreadcrumbLink>
          </BreadcrumbUi.BreadcrumbItem>
          <BreadcrumbUi.BreadcrumbSeparator />
          <BreadcrumbUi.BreadcrumbItem>
            <BreadcrumbUi.BreadcrumbPage>Components</BreadcrumbUi.BreadcrumbPage>
          </BreadcrumbUi.BreadcrumbItem>
        </BreadcrumbUi.BreadcrumbList>
      </BreadcrumbUi.Breadcrumb>
    </Stage>
  ),
  "component.bubble": () => (
    <Stage>
      <BubbleUi.BubbleGroup>
        <BubbleUi.Bubble variant="secondary">
          <BubbleUi.BubbleContent>Can this template include a sidebar?</BubbleUi.BubbleContent>
        </BubbleUi.Bubble>
        <BubbleUi.Bubble align="end">
          <BubbleUi.BubbleContent>
            Yes—its dependencies are resolved automatically.
          </BubbleUi.BubbleContent>
          <BubbleUi.BubbleReactions>✨ 2</BubbleUi.BubbleReactions>
        </BubbleUi.Bubble>
      </BubbleUi.BubbleGroup>
    </Stage>
  ),
  "component.button": () => (
    <Stage>
      <div className="flex flex-wrap gap-3">
        <ButtonUi.Button>Make a copy</ButtonUi.Button>
        <ButtonUi.Button variant="secondary">Customize</ButtonUi.Button>
        <ButtonUi.Button variant="outline">View manifest</ButtonUi.Button>
        <ButtonUi.Button variant="ghost">Cancel</ButtonUi.Button>
      </div>
    </Stage>
  ),
  "component.button-group": () => (
    <Stage>
      <ButtonGroupUi.ButtonGroup>
        <ButtonUi.Button variant="outline">Preview</ButtonUi.Button>
        <ButtonGroupUi.ButtonGroupSeparator />
        <ButtonUi.Button variant="outline">Code</ButtonUi.Button>
        <ButtonGroupUi.ButtonGroupSeparator />
        <ButtonUi.Button variant="outline" size="icon">
          <MoreHorizontalIcon />
        </ButtonUi.Button>
      </ButtonGroupUi.ButtonGroup>
    </Stage>
  ),
  "component.calendar": () => (
    <Stage>
      <div className="flex justify-center">
        <CalendarUi.Calendar mode="single" selected={new Date(2026, 6, 18)} />
      </div>
    </Stage>
  ),
  "component.card": () => (
    <Stage>
      <CardUi.Card>
        <CardUi.CardHeader>
          <CardUi.CardDescription>Generated this week</CardUi.CardDescription>
          <CardUi.CardTitle className="text-3xl">284 projects</CardUi.CardTitle>
          <CardUi.CardAction>
            <BadgeUi.Badge variant="secondary">+18%</BadgeUi.Badge>
          </CardUi.CardAction>
        </CardUi.CardHeader>
        <CardUi.CardContent>
          <p className="text-sm text-muted-foreground">
            Validated manifests converted into independent React applications.
          </p>
        </CardUi.CardContent>
        <CardUi.CardFooter>
          <ButtonUi.Button size="sm">Open analytics</ButtonUi.Button>
        </CardUi.CardFooter>
      </CardUi.Card>
    </Stage>
  ),
  "component.carousel": () => (
    <Stage>
      <CarouselUi.Carousel className="mx-auto w-[82%]">
        <CarouselUi.CarouselContent>
          {["React starter", "SaaS dashboard", "Chat app"].map((item) => (
            <CarouselUi.CarouselItem key={item}>
              <CardUi.Card>
                <CardUi.CardContent className="grid aspect-[2/1] place-items-center text-xl font-semibold">
                  {item}
                </CardUi.CardContent>
              </CardUi.Card>
            </CarouselUi.CarouselItem>
          ))}
        </CarouselUi.CarouselContent>
        <CarouselUi.CarouselPrevious />
        <CarouselUi.CarouselNext />
      </CarouselUi.Carousel>
    </Stage>
  ),
  "component.chart": () => (
    <Stage wide>
      <ChartUi.ChartContainer
        config={{ projects: { label: "Projects", color: "var(--primary)" } }}
        className="h-72 w-full"
      >
        <BarChart
          data={[
            { month: "Mar", projects: 42 },
            { month: "Apr", projects: 68 },
            { month: "May", projects: 54 },
            { month: "Jun", projects: 91 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <ChartUi.ChartTooltip content={<ChartUi.ChartTooltipContent />} />
          <Bar dataKey="projects" fill="var(--color-projects)" radius={6} />
        </BarChart>
      </ChartUi.ChartContainer>
    </Stage>
  ),
  "component.checkbox": () => (
    <Stage>
      <label className="flex items-center gap-3">
        <CheckboxUi.Checkbox defaultChecked />
        <span className="text-sm font-medium">Include recommended dependencies</span>
      </label>
    </Stage>
  ),
  "component.collapsible": () => (
    <Stage>
      <CollapsibleUi.Collapsible defaultOpen className="rounded-xl border bg-card p-4">
        <CollapsibleUi.CollapsibleTrigger asChild>
          <ButtonUi.Button variant="ghost" className="w-full justify-between">
            Resolved dependencies <span>7</span>
          </ButtonUi.Button>
        </CollapsibleUi.CollapsibleTrigger>
        <CollapsibleUi.CollapsibleContent className="space-y-2 px-3 pt-3 text-sm text-muted-foreground">
          <p>React Router</p>
          <p>Tailwind CSS</p>
          <p>Radix UI</p>
        </CollapsibleUi.CollapsibleContent>
      </CollapsibleUi.Collapsible>
    </Stage>
  ),
  "component.combobox": () => (
    <Stage>
      <ComboboxUi.Combobox items={["React", "Vue", "Svelte"]}>
        <ComboboxUi.ComboboxInput placeholder="Choose a framework" />
        <ComboboxUi.ComboboxContent>
          <ComboboxUi.ComboboxList>
            <ComboboxUi.ComboboxCollection>
              {(item: string) => (
                <ComboboxUi.ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxUi.ComboboxItem>
              )}
            </ComboboxUi.ComboboxCollection>
          </ComboboxUi.ComboboxList>
        </ComboboxUi.ComboboxContent>
      </ComboboxUi.Combobox>
    </Stage>
  ),
  "component.command": () => (
    <Stage>
      <CommandUi.Command className="h-80 rounded-xl border shadow-sm">
        <CommandUi.CommandInput placeholder="Search components..." />
        <CommandUi.CommandList>
          <CommandUi.CommandEmpty>No component found.</CommandUi.CommandEmpty>
          <CommandUi.CommandGroup heading="Components">
            <CommandUi.CommandItem>
              Button<CommandUi.CommandShortcut>⌘B</CommandUi.CommandShortcut>
            </CommandUi.CommandItem>
            <CommandUi.CommandItem>
              Sidebar<CommandUi.CommandShortcut>⌘S</CommandUi.CommandShortcut>
            </CommandUi.CommandItem>
            <CommandUi.CommandItem>
              Dialog<CommandUi.CommandShortcut>⌘D</CommandUi.CommandShortcut>
            </CommandUi.CommandItem>
          </CommandUi.CommandGroup>
        </CommandUi.CommandList>
      </CommandUi.Command>
    </Stage>
  ),
  "component.context-menu": () => (
    <Stage>
      <ContextMenuUi.ContextMenu>
        <ContextMenuUi.ContextMenuTrigger className="grid h-64 place-items-center rounded-xl border border-dashed bg-card text-sm text-muted-foreground">
          Right-click this area
        </ContextMenuUi.ContextMenuTrigger>
        <ContextMenuUi.ContextMenuContent>
          <ContextMenuUi.ContextMenuItem>
            Preview<ContextMenuUi.ContextMenuShortcut>⌘P</ContextMenuUi.ContextMenuShortcut>
          </ContextMenuUi.ContextMenuItem>
          <ContextMenuUi.ContextMenuItem>View source</ContextMenuUi.ContextMenuItem>
          <ContextMenuUi.ContextMenuSeparator />
          <ContextMenuUi.ContextMenuItem variant="destructive">
            Remove
          </ContextMenuUi.ContextMenuItem>
        </ContextMenuUi.ContextMenuContent>
      </ContextMenuUi.ContextMenu>
    </Stage>
  ),
  "component.dialog": () => (
    <Stage>
      <DialogUi.Dialog defaultOpen>
        <DialogUi.DialogContent>
          <DialogUi.DialogHeader>
            <DialogUi.DialogTitle>Component details</DialogUi.DialogTitle>
            <DialogUi.DialogDescription>
              This is the actual registry dialog component.
            </DialogUi.DialogDescription>
          </DialogUi.DialogHeader>
          <DialogUi.DialogFooter>
            <DialogUi.DialogClose asChild>
              <ButtonUi.Button variant="outline">Close</ButtonUi.Button>
            </DialogUi.DialogClose>
            <ButtonUi.Button>Use component</ButtonUi.Button>
          </DialogUi.DialogFooter>
        </DialogUi.DialogContent>
      </DialogUi.Dialog>
    </Stage>
  ),
  "component.direction": () => (
    <Stage>
      <DirectionUi.DirectionProvider dir="rtl">
        <Panel>
          <p className="text-right">واجهة من اليمين إلى اليسار</p>
        </Panel>
      </DirectionUi.DirectionProvider>
    </Stage>
  ),
  "component.drawer": () => (
    <Stage>
      <DrawerUi.Drawer defaultOpen>
        <DrawerUi.DrawerContent>
          <DrawerUi.DrawerHeader>
            <DrawerUi.DrawerTitle>Customize template</DrawerUi.DrawerTitle>
            <DrawerUi.DrawerDescription>
              Choose the options for your generated project.
            </DrawerUi.DrawerDescription>
          </DrawerUi.DrawerHeader>
          <DrawerUi.DrawerFooter>
            <ButtonUi.Button>Apply changes</ButtonUi.Button>
            <DrawerUi.DrawerClose asChild>
              <ButtonUi.Button variant="outline">Cancel</ButtonUi.Button>
            </DrawerUi.DrawerClose>
          </DrawerUi.DrawerFooter>
        </DrawerUi.DrawerContent>
      </DrawerUi.Drawer>
    </Stage>
  ),
  "component.dropdown-menu": () => (
    <Stage>
      <DropdownUi.DropdownMenu defaultOpen>
        <DropdownUi.DropdownMenuTrigger asChild>
          <ButtonUi.Button variant="outline">Open actions</ButtonUi.Button>
        </DropdownUi.DropdownMenuTrigger>
        <DropdownUi.DropdownMenuContent>
          <DropdownUi.DropdownMenuLabel>Template</DropdownUi.DropdownMenuLabel>
          <DropdownUi.DropdownMenuItem>Preview</DropdownUi.DropdownMenuItem>
          <DropdownUi.DropdownMenuItem>Duplicate</DropdownUi.DropdownMenuItem>
          <DropdownUi.DropdownMenuSeparator />
          <DropdownUi.DropdownMenuItem variant="destructive">Delete</DropdownUi.DropdownMenuItem>
        </DropdownUi.DropdownMenuContent>
      </DropdownUi.DropdownMenu>
    </Stage>
  ),
  "component.empty": () => (
    <Stage>
      <EmptyUi.Empty>
        <EmptyUi.EmptyHeader>
          <EmptyUi.EmptyMedia variant="icon">
            <InboxIcon />
          </EmptyUi.EmptyMedia>
          <EmptyUi.EmptyTitle>No saved templates</EmptyUi.EmptyTitle>
          <EmptyUi.EmptyDescription>
            Create your first manifest-driven starting point.
          </EmptyUi.EmptyDescription>
        </EmptyUi.EmptyHeader>
        <EmptyUi.EmptyContent>
          <ButtonUi.Button>Make a copy</ButtonUi.Button>
        </EmptyUi.EmptyContent>
      </EmptyUi.Empty>
    </Stage>
  ),
  "component.field": () => (
    <Stage>
      <FieldUi.FieldGroup>
        <FieldUi.Field>
          <FieldUi.FieldLabel htmlFor="project-name">Project name</FieldUi.FieldLabel>
          <InputUi.Input id="project-name" defaultValue="ditto-dashboard" />
          <FieldUi.FieldDescription>
            Used for the generated folder and package.
          </FieldUi.FieldDescription>
        </FieldUi.Field>
        <FieldUi.Field orientation="horizontal">
          <CheckboxUi.Checkbox id="typescript" defaultChecked />
          <FieldUi.FieldLabel htmlFor="typescript">Use TypeScript</FieldUi.FieldLabel>
        </FieldUi.Field>
      </FieldUi.FieldGroup>
    </Stage>
  ),
  "component.form": FormPreview,
  "component.hover-card": () => (
    <Stage>
      <HoverCardUi.HoverCard defaultOpen>
        <HoverCardUi.HoverCardTrigger asChild>
          <ButtonUi.Button variant="link">@dittojs</ButtonUi.Button>
        </HoverCardUi.HoverCardTrigger>
        <HoverCardUi.HoverCardContent>
          <div className="flex gap-3">
            <AvatarUi.Avatar>
              <AvatarUi.AvatarFallback>DJ</AvatarUi.AvatarFallback>
            </AvatarUi.Avatar>
            <div>
              <strong>DittoJs</strong>
              <p className="mt-1 text-sm text-muted-foreground">
                Manifest-driven React project generation.
              </p>
            </div>
          </div>
        </HoverCardUi.HoverCardContent>
      </HoverCardUi.HoverCard>
    </Stage>
  ),
  "component.input": () => (
    <Stage>
      <div className="space-y-2">
        <LabelUi.Label htmlFor="name">Project name</LabelUi.Label>
        <InputUi.Input id="name" defaultValue="my-ditto-app" />
      </div>
    </Stage>
  ),
  "component.input-group": () => (
    <Stage>
      <InputGroupUi.InputGroup>
        <InputGroupUi.InputGroupAddon>
          <SearchIcon />
        </InputGroupUi.InputGroupAddon>
        <InputGroupUi.InputGroupInput placeholder="Search the registry" />
        <InputGroupUi.InputGroupAddon align="inline-end">
          <InputGroupUi.InputGroupButton>
            <KbdUi.Kbd>⌘K</KbdUi.Kbd>
          </InputGroupUi.InputGroupButton>
        </InputGroupUi.InputGroupAddon>
      </InputGroupUi.InputGroup>
    </Stage>
  ),
  "component.input-otp": InputOtpPreview,
  "component.item": () => (
    <Stage>
      <ItemUi.Item variant="outline">
        <ItemUi.ItemMedia variant="icon">
          <FileIcon />
        </ItemUi.ItemMedia>
        <ItemUi.ItemContent>
          <ItemUi.ItemTitle>dashboard-layout.tsx</ItemUi.ItemTitle>
          <ItemUi.ItemDescription>Block · 8 resolved dependencies</ItemUi.ItemDescription>
        </ItemUi.ItemContent>
        <ItemUi.ItemActions>
          <ButtonUi.Button variant="outline" size="sm">
            Preview
          </ButtonUi.Button>
        </ItemUi.ItemActions>
      </ItemUi.Item>
    </Stage>
  ),
  "component.kbd": () => (
    <Stage>
      <div className="flex items-center gap-2 text-sm">
        <span>Open command menu</span>
        <KbdUi.KbdGroup>
          <KbdUi.Kbd>⌘</KbdUi.Kbd>
          <KbdUi.Kbd>K</KbdUi.Kbd>
        </KbdUi.KbdGroup>
      </div>
    </Stage>
  ),
  "component.label": () => (
    <Stage>
      <div className="space-y-2">
        <LabelUi.Label htmlFor="email">Email address</LabelUi.Label>
        <InputUi.Input id="email" type="email" placeholder="you@example.com" />
      </div>
    </Stage>
  ),
  "component.marker": () => (
    <Stage>
      <div className="grid gap-3">
        <MarkerUi.Marker>
          <MarkerUi.MarkerIcon>
            <CheckIcon />
          </MarkerUi.MarkerIcon>
          <MarkerUi.MarkerContent>Validated</MarkerUi.MarkerContent>
        </MarkerUi.Marker>
        <MarkerUi.Marker variant="border">
          <MarkerUi.MarkerIcon>
            <FileIcon />
          </MarkerUi.MarkerIcon>
          <MarkerUi.MarkerContent>Manifest</MarkerUi.MarkerContent>
        </MarkerUi.Marker>
      </div>
    </Stage>
  ),
  "component.menubar": () => (
    <Stage>
      <MenubarUi.Menubar>
        <MenubarUi.MenubarMenu>
          <MenubarUi.MenubarTrigger>Project</MenubarUi.MenubarTrigger>
          <MenubarUi.MenubarContent>
            <MenubarUi.MenubarItem>
              New template<MenubarUi.MenubarShortcut>⌘N</MenubarUi.MenubarShortcut>
            </MenubarUi.MenubarItem>
            <MenubarUi.MenubarItem>Open manifest</MenubarUi.MenubarItem>
          </MenubarUi.MenubarContent>
        </MenubarUi.MenubarMenu>
        <MenubarUi.MenubarMenu>
          <MenubarUi.MenubarTrigger>Build</MenubarUi.MenubarTrigger>
          <MenubarUi.MenubarContent>
            <MenubarUi.MenubarItem>Resolve</MenubarUi.MenubarItem>
            <MenubarUi.MenubarItem>Generate</MenubarUi.MenubarItem>
          </MenubarUi.MenubarContent>
        </MenubarUi.MenubarMenu>
      </MenubarUi.Menubar>
    </Stage>
  ),
  "component.message": () => (
    <Stage>
      <MessageUi.MessageGroup>
        <MessageUi.Message>
          <MessageUi.MessageAvatar>ED</MessageUi.MessageAvatar>
          <div>
            <MessageUi.MessageHeader>
              Elham <span className="text-muted-foreground">10:42</span>
            </MessageUi.MessageHeader>
            <MessageUi.MessageContent>
              Show me the resolved component graph.
            </MessageUi.MessageContent>
            <MessageUi.MessageFooter>Delivered</MessageUi.MessageFooter>
          </div>
        </MessageUi.Message>
      </MessageUi.MessageGroup>
    </Stage>
  ),
  "component.message-scroller": () => (
    <Stage>
      <MessageScrollerUi.MessageScrollerProvider>
        <MessageScrollerUi.MessageScroller className="h-72 rounded-xl border bg-card">
          <MessageScrollerUi.MessageScrollerViewport>
            <MessageScrollerUi.MessageScrollerContent>
              {Array.from({ length: 8 }, (_, index) => (
                <MessageScrollerUi.MessageScrollerItem key={index}>
                  <div className="m-3 rounded-lg bg-muted p-3 text-sm">
                    Resolved message {index + 1}
                  </div>
                </MessageScrollerUi.MessageScrollerItem>
              ))}
            </MessageScrollerUi.MessageScrollerContent>
          </MessageScrollerUi.MessageScrollerViewport>
          <MessageScrollerUi.MessageScrollerButton />
        </MessageScrollerUi.MessageScroller>
      </MessageScrollerUi.MessageScrollerProvider>
    </Stage>
  ),
  "component.native-select": () => (
    <Stage>
      <NativeSelectUi.NativeSelect defaultValue="react">
        <NativeSelectUi.NativeSelectOption value="react">React</NativeSelectUi.NativeSelectOption>
        <NativeSelectUi.NativeSelectOption value="vue">Vue</NativeSelectUi.NativeSelectOption>
        <NativeSelectUi.NativeSelectOption value="svelte">Svelte</NativeSelectUi.NativeSelectOption>
      </NativeSelectUi.NativeSelect>
    </Stage>
  ),
  "component.navigation-menu": () => (
    <Stage wide>
      <NavigationMenuUi.NavigationMenu>
        <NavigationMenuUi.NavigationMenuList>
          <NavigationMenuUi.NavigationMenuItem>
            <NavigationMenuUi.NavigationMenuLink
              href="#"
              className={NavigationMenuUi.navigationMenuTriggerStyle()}
            >
              Templates
            </NavigationMenuUi.NavigationMenuLink>
          </NavigationMenuUi.NavigationMenuItem>
          <NavigationMenuUi.NavigationMenuItem>
            <NavigationMenuUi.NavigationMenuTrigger>
              Components
            </NavigationMenuUi.NavigationMenuTrigger>
            <NavigationMenuUi.NavigationMenuContent>
              <div className="grid w-80 gap-2 p-4">
                <NavigationMenuUi.NavigationMenuLink
                  href="#"
                  className="rounded-lg p-3 hover:bg-accent"
                >
                  <strong>Primitives</strong>
                  <p className="text-sm text-muted-foreground">Buttons, inputs and controls.</p>
                </NavigationMenuUi.NavigationMenuLink>
                <NavigationMenuUi.NavigationMenuLink
                  href="#"
                  className="rounded-lg p-3 hover:bg-accent"
                >
                  <strong>Blocks</strong>
                  <p className="text-sm text-muted-foreground">Production-ready compositions.</p>
                </NavigationMenuUi.NavigationMenuLink>
              </div>
            </NavigationMenuUi.NavigationMenuContent>
          </NavigationMenuUi.NavigationMenuItem>
        </NavigationMenuUi.NavigationMenuList>
      </NavigationMenuUi.NavigationMenu>
    </Stage>
  ),
  "component.pagination": () => (
    <Stage>
      <PaginationUi.Pagination>
        <PaginationUi.PaginationContent>
          <PaginationUi.PaginationItem>
            <PaginationUi.PaginationPrevious href="#" />
          </PaginationUi.PaginationItem>
          <PaginationUi.PaginationItem>
            <PaginationUi.PaginationLink href="#" isActive>
              1
            </PaginationUi.PaginationLink>
          </PaginationUi.PaginationItem>
          <PaginationUi.PaginationItem>
            <PaginationUi.PaginationLink href="#">2</PaginationUi.PaginationLink>
          </PaginationUi.PaginationItem>
          <PaginationUi.PaginationItem>
            <PaginationUi.PaginationEllipsis />
          </PaginationUi.PaginationItem>
          <PaginationUi.PaginationItem>
            <PaginationUi.PaginationNext href="#" />
          </PaginationUi.PaginationItem>
        </PaginationUi.PaginationContent>
      </PaginationUi.Pagination>
    </Stage>
  ),
  "component.popover": () => (
    <Stage>
      <PopoverUi.Popover defaultOpen>
        <PopoverUi.PopoverTrigger asChild>
          <ButtonUi.Button variant="outline">Resolver status</ButtonUi.Button>
        </PopoverUi.PopoverTrigger>
        <PopoverUi.PopoverContent>
          <PopoverUi.PopoverHeader>
            <PopoverUi.PopoverTitle>All clear</PopoverUi.PopoverTitle>
            <PopoverUi.PopoverDescription>
              20 selected, 7 dependencies locked.
            </PopoverUi.PopoverDescription>
          </PopoverUi.PopoverHeader>
        </PopoverUi.PopoverContent>
      </PopoverUi.Popover>
    </Stage>
  ),
  "component.progress": () => (
    <Stage>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Generating project</span>
          <strong>72%</strong>
        </div>
        <ProgressUi.Progress value={72} />
      </div>
    </Stage>
  ),
  "component.radio-group": () => (
    <Stage>
      <RadioGroupUi.RadioGroup defaultValue="feature" className="gap-3">
        {[
          { value: "simple", label: "Simple" },
          { value: "feature", label: "Feature sliced" },
          { value: "route", label: "Route colocated" },
        ].map(({ value, label }) => (
          <label key={value} className="flex items-center gap-3 rounded-lg border p-3">
            <RadioGroupUi.RadioGroupItem value={value} />
            {label}
          </label>
        ))}
      </RadioGroupUi.RadioGroup>
    </Stage>
  ),
  "component.resizable": () => (
    <Stage wide>
      <ResizableUi.ResizablePanelGroup orientation="horizontal" className="h-72 rounded-xl border">
        <ResizableUi.ResizablePanel defaultSize={38}>
          <div className="grid h-full place-items-center bg-muted text-sm">Manifest</div>
        </ResizableUi.ResizablePanel>
        <ResizableUi.ResizableHandle withHandle />
        <ResizableUi.ResizablePanel defaultSize={62}>
          <div className="grid h-full place-items-center bg-card text-sm">Rendered preview</div>
        </ResizableUi.ResizablePanel>
      </ResizableUi.ResizablePanelGroup>
    </Stage>
  ),
  "component.scroll-area": () => (
    <Stage>
      <ScrollAreaUi.ScrollArea className="h-72 rounded-xl border bg-card">
        <div className="space-y-2 p-4">
          {Array.from({ length: 16 }, (_, index) => (
            <div key={index} className="rounded-lg border p-3 text-sm">
              Registry component {String(index + 1).padStart(2, "0")}
            </div>
          ))}
        </div>
        <ScrollAreaUi.ScrollBar />
      </ScrollAreaUi.ScrollArea>
    </Stage>
  ),
  "component.select": () => (
    <Stage>
      <SelectUi.Select defaultValue="saas">
        <SelectUi.SelectTrigger>
          <SelectUi.SelectValue placeholder="Choose a preset" />
        </SelectUi.SelectTrigger>
        <SelectUi.SelectContent>
          <SelectUi.SelectGroup>
            <SelectUi.SelectLabel>Starting points</SelectUi.SelectLabel>
            <SelectUi.SelectItem value="react">React Recommended</SelectUi.SelectItem>
            <SelectUi.SelectItem value="saas">SaaS Dashboard</SelectUi.SelectItem>
            <SelectUi.SelectItem value="chat">Chat App</SelectUi.SelectItem>
          </SelectUi.SelectGroup>
        </SelectUi.SelectContent>
      </SelectUi.Select>
    </Stage>
  ),
  "component.separator": () => (
    <Stage>
      <Panel>
        <div className="space-y-4">
          <div>
            <strong>DittoJs</strong>
            <p className="text-sm text-muted-foreground">
              A validated source for independent projects.
            </p>
          </div>
          <SeparatorUi.Separator />
          <div className="flex h-5 items-center gap-4 text-sm">
            <span>Docs</span>
            <SeparatorUi.Separator orientation="vertical" />
            <span>Templates</span>
            <SeparatorUi.Separator orientation="vertical" />
            <span>Pricing</span>
          </div>
        </div>
      </Panel>
    </Stage>
  ),
  "component.sheet": () => (
    <Stage>
      <SheetUi.Sheet defaultOpen>
        <SheetUi.SheetContent>
          <SheetUi.SheetHeader>
            <SheetUi.SheetTitle>Resolver ledger</SheetUi.SheetTitle>
            <SheetUi.SheetDescription>
              Review selections and locked dependencies.
            </SheetUi.SheetDescription>
          </SheetUi.SheetHeader>
          <div className="mt-6 space-y-3">
            {["React", "TypeScript", "Tailwind CSS", "shadcn"].map((item) => (
              <div key={item} className="rounded-lg border p-3 text-sm">
                {item}
              </div>
            ))}
          </div>
        </SheetUi.SheetContent>
      </SheetUi.Sheet>
    </Stage>
  ),
  "component.sidebar": SidebarPreview,
  "component.skeleton": () => (
    <Stage>
      <div className="flex items-center gap-4">
        <SkeletonUi.Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonUi.Skeleton className="h-4 w-2/5" />
          <SkeletonUi.Skeleton className="h-4 w-4/5" />
        </div>
      </div>
    </Stage>
  ),
  "component.slider": () => (
    <Stage>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Sidebar width</span>
          <strong>256 px</strong>
        </div>
        <SliderUi.Slider defaultValue={[45]} max={100} step={1} />
      </div>
    </Stage>
  ),
  "component.sonner": () => (
    <Stage>
      <div className="space-y-4 text-center">
        <SonnerUi.Toaster position="top-center" />
        <ButtonUi.Button onClick={() => toast.success("Template generated successfully")}>
          Show toast
        </ButtonUi.Button>
        <p className="text-sm text-muted-foreground">Click to render the registry toaster.</p>
      </div>
    </Stage>
  ),
  "component.spinner": () => (
    <Stage>
      <div className="flex items-center gap-3">
        <SpinnerUi.Spinner className="size-5" />
        <span className="text-sm font-medium">Resolving dependencies…</span>
      </div>
    </Stage>
  ),
  "component.switch": () => (
    <Stage>
      <label className="flex items-center justify-between rounded-xl border bg-card p-4">
        <div>
          <strong className="block text-sm">Include dark mode</strong>
          <span className="text-sm text-muted-foreground">Generate theme tokens and toggle.</span>
        </div>
        <SwitchUi.Switch defaultChecked />
      </label>
    </Stage>
  ),
  "component.table": () => (
    <Stage wide>
      <div className="rounded-xl border bg-card">
        <TableUi.Table>
          <TableUi.TableCaption>Recently generated templates</TableUi.TableCaption>
          <TableUi.TableHeader>
            <TableUi.TableRow>
              <TableUi.TableHead>Name</TableUi.TableHead>
              <TableUi.TableHead>Preset</TableUi.TableHead>
              <TableUi.TableHead className="text-right">Files</TableUi.TableHead>
            </TableUi.TableRow>
          </TableUi.TableHeader>
          <TableUi.TableBody>
            {[
              ["Atlas", "SaaS Dashboard", 84],
              ["Relay", "React Recommended", 42],
              ["Pulse", "Chat App", 58],
            ].map(([name, preset, files]) => (
              <TableUi.TableRow key={String(name)}>
                <TableUi.TableCell className="font-medium">{name}</TableUi.TableCell>
                <TableUi.TableCell>{preset}</TableUi.TableCell>
                <TableUi.TableCell className="text-right">{files}</TableUi.TableCell>
              </TableUi.TableRow>
            ))}
          </TableUi.TableBody>
        </TableUi.Table>
      </div>
    </Stage>
  ),
  "component.tabs": () => (
    <Stage>
      <TabsUi.Tabs defaultValue="preview">
        <TabsUi.TabsList>
          <TabsUi.TabsTrigger value="preview">Preview</TabsUi.TabsTrigger>
          <TabsUi.TabsTrigger value="manifest">Manifest</TabsUi.TabsTrigger>
          <TabsUi.TabsTrigger value="files">Files</TabsUi.TabsTrigger>
        </TabsUi.TabsList>
        <TabsUi.TabsContent value="preview" className="rounded-xl border bg-card p-6">
          <strong>Rendered component</strong>
          <p className="mt-2 text-sm text-muted-foreground">
            This tab contains the actual registry preview.
          </p>
        </TabsUi.TabsContent>
        <TabsUi.TabsContent
          value="manifest"
          className="rounded-xl border bg-card p-6 font-mono text-sm"
        >
          component.tabs
        </TabsUi.TabsContent>
        <TabsUi.TabsContent value="files" className="rounded-xl border bg-card p-6 text-sm">
          tabs.tsx
        </TabsUi.TabsContent>
      </TabsUi.Tabs>
    </Stage>
  ),
  "component.textarea": () => (
    <Stage>
      <div className="space-y-2">
        <LabelUi.Label htmlFor="description">Project description</LabelUi.Label>
        <TextareaUi.Textarea
          id="description"
          defaultValue="A manifest-driven dashboard generated with DittoJs."
          rows={5}
        />
      </div>
    </Stage>
  ),
  "component.toggle": () => (
    <Stage>
      <div className="flex gap-2">
        <ToggleUi.Toggle aria-label="Toggle notifications">
          <BellIcon />
        </ToggleUi.Toggle>
        <ToggleUi.Toggle defaultPressed aria-label="Toggle mail">
          <MailIcon />
        </ToggleUi.Toggle>
        <ToggleUi.Toggle variant="outline" aria-label="Toggle settings">
          <SettingsIcon />
        </ToggleUi.Toggle>
      </div>
    </Stage>
  ),
  "component.toggle-group": () => (
    <Stage>
      <ToggleGroupUi.ToggleGroup type="single" defaultValue="preview" variant="outline">
        <ToggleGroupUi.ToggleGroupItem value="preview">Preview</ToggleGroupUi.ToggleGroupItem>
        <ToggleGroupUi.ToggleGroupItem value="code">Code</ToggleGroupUi.ToggleGroupItem>
        <ToggleGroupUi.ToggleGroupItem value="manifest">Manifest</ToggleGroupUi.ToggleGroupItem>
      </ToggleGroupUi.ToggleGroup>
    </Stage>
  ),
  "component.tooltip": () => (
    <Stage>
      <TooltipUi.TooltipProvider>
        <TooltipUi.Tooltip defaultOpen>
          <TooltipUi.TooltipTrigger asChild>
            <ButtonUi.Button variant="outline" size="icon">
              <SettingsIcon />
            </ButtonUi.Button>
          </TooltipUi.TooltipTrigger>
          <TooltipUi.TooltipContent>Customize component</TooltipUi.TooltipContent>
        </TooltipUi.Tooltip>
      </TooltipUi.TooltipProvider>
    </Stage>
  ),
  "block.messaging-input": () => (
    <Stage>
      <MessagingInput />
    </Stage>
  ),
  "block.typing-indicator": () => (
    <Stage>
      <TypingIndicator />
    </Stage>
  ),
  "block.online-presence": () => (
    <Stage>
      <OnlinePresence />
    </Stage>
  ),
  "block.settings-form": () => (
    <Stage>
      <Panel>
        <SettingsForm />
      </Panel>
    </Stage>
  ),
}

renderers["component.dropdown"] = renderers["component.dropdown-menu"]!

export function RegistryPreview({ moduleId }: { moduleId: string }) {
  const Preview = renderers[moduleId] as ComponentType | undefined
  return Preview === undefined ? null : <Preview />
}

if (
  Object.keys(renderers).some((moduleId) => !registryInlinePreviewIds.has(moduleId)) ||
  [...registryInlinePreviewIds].some((moduleId) => renderers[moduleId] === undefined)
) {
  throw new Error("Registry preview capabilities and renderers are out of sync.")
}
