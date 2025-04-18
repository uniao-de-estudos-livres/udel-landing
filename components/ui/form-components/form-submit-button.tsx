"use client"

import type React from "react"

import { Loader2 } from "lucide-react"
import { Button, type ButtonProps } from "@/components/ui/button"

interface FormSubmitButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
}

export function FormSubmitButton({ children, isLoading = false, loadingText, icon, ...props }: FormSubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </Button>
  )
}
