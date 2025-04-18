"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormContext } from "react-hook-form"

interface FormInputProps {
  name: string
  label: string
  placeholder?: string
  type?: string
  disabled?: boolean
  description?: string
  showPasswordToggle?: boolean
}

// Modifique a função FormInput para garantir que o form context esteja disponível
export function FormInput({
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  description,
  showPasswordToggle = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useFormContext()

  // Verificar se o form context existe
  if (!form || !form.control) {
    console.error("FormInput must be used within a FormProvider with a valid form context")
    return null
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                placeholder={placeholder}
                type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
                disabled={disabled}
                {...field}
              />
              {showPasswordToggle && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-zinc-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-zinc-400" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          {description && <p className="text-xs text-zinc-500 mt-1">{description}</p>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
