import * as React from "react"
import { FormProvider } from "react-hook-form"

import { cn } from "@/lib/utils"

export const Form = FormProvider

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>

export function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn("space-y-2", className)} {...props} />
}

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

export function FormLabel({ className, ...props }: FormLabelProps) {
  return <label className={cn("text-sm font-medium text-foreground", className)} {...props} />
}

export type FormControlProps = React.HTMLAttributes<HTMLDivElement>

export function FormControl({ className, ...props }: FormControlProps) {
  return <div className={cn("space-y-2", className)} {...props} />
}

export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export function FormDescription({ className, ...props }: FormDescriptionProps) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />
}

export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>

export function FormMessage({ className, children, ...props }: FormMessageProps) {
  if (!children) {
    return null
  }

  return (
    <p className={cn("text-sm font-medium text-red-600", className)} {...props}>
      {children}
    </p>
  )
}
