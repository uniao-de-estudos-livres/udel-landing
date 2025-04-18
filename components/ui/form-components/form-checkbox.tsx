"use client"

import type React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

interface FormCheckboxProps {
  name: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export function FormCheckbox({ name, label, description, disabled = false }: FormCheckboxProps) {
  const form = useFormContext()

  // Verificar se o form context existe
  if (!form || !form.control) {
    console.error("FormCheckbox must be used within a FormProvider with a valid form context")
    return null
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={disabled} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && <p className="text-sm text-zinc-400">{description}</p>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}
