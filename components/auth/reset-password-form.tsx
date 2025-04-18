"use client"

import type React from "react"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import { useNotification } from "@/components/ui/notifications"
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/schemas/auth"
import { FormInput } from "@/components/ui/form-components/form-input"
import { FormSubmitButton } from "@/components/ui/form-components/form-submit-button"
import { PasswordStrengthMeter } from "@/components/ui/form-components/password-strength-meter"
import { ValidationService } from "@/services/validation-service"

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const notification = useNotification()

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
  })

  const password = form.watch("password")

  // Função para lidar com o evento de tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      form.handleSubmit(onSubmit)()
    }
  }

  async function onSubmit(data: ResetPasswordFormData) {
    try {
      setIsLoading(true)

      // Validar formulário com o backend
      const validationResult = await ValidationService.validateForm("reset-password", data, "not-required")

      if (!validationResult.success) {
        if (validationResult.errors) {
          Object.entries(validationResult.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as any, {
                type: "manual",
                message: messages[0],
              })
            }
          })
        } else if (validationResult.message) {
          notification.error("Erro de validação", validationResult.message)
        }
        setIsLoading(false)
        return
      }

      notification.success("Senha redefinida", "Sua senha foi redefinida com sucesso!")
      router.push("/login")
    } catch (error: any) {
      console.error("Erro ao redefinir senha:", error)

      if (error.response?.status === 400) {
        notification.error("Erro", "Token inválido ou expirado. Solicite um novo link de redefinição de senha.")
      } else {
        notification.error("Erro", "Ocorreu um erro ao redefinir sua senha. Tente novamente.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Redefinir senha</h1>
        <p className="text-sm text-zinc-400">Crie uma nova senha para sua conta</p>
      </div>

      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" onKeyDown={handleKeyDown}>
            <div className="space-y-1">
              <FormInput
                name="password"
                label="Nova senha"
                placeholder="Digite sua nova senha"
                showPasswordToggle
                disabled={isLoading}
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <FormInput
              name="confirmPassword"
              label="Confirmar nova senha"
              placeholder="Confirme sua nova senha"
              showPasswordToggle
              disabled={isLoading}
            />

            <FormSubmitButton
              isLoading={isLoading}
              loadingText="Redefinindo senha..."
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Redefinir senha
            </FormSubmitButton>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}
