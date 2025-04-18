"use client"

import type React from "react"

import { useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { useNotification } from "@/components/ui/notifications"
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/schemas/auth"
import { useCaptcha } from "@/hooks/use-captcha"
import { HCaptchaComponent } from "@/components/ui/h-captcha"
import { FormInput } from "@/components/ui/form-components/form-input"
import { FormSubmitButton } from "@/components/ui/form-components/form-submit-button"
import { ValidationService } from "@/services/validation-service"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const notification = useNotification()
  const { captchaRef, handleCaptchaVerify, handleCaptchaExpire, handleCaptchaError, executeCaptcha, resetCaptcha } =
    useCaptcha()

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // Função para lidar com o evento de tecla Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      form.handleSubmit(onSubmit)()
    }
  }

  async function onSubmit(data: ForgotPasswordFormData) {
    try {
      setIsLoading(true)

      // Validar email com o backend
      const validationResult = await ValidationService.validateField("forgot-password", "email", data.email)

      if (!validationResult.success) {
        if (validationResult.errors?.email) {
          form.setError("email", {
            type: "manual",
            message: validationResult.errors.email[0],
          })
        } else if (validationResult.message) {
          notification.error("Erro de validação", validationResult.message)
        }
        setIsLoading(false)
        return
      }

      // Verificar se o captcha foi resolvido ou executá-lo
      const token = await executeCaptcha()

      if (!token) {
        notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.")
        setIsLoading(false)
        return
      }

      // Enviar formulário completo com token captcha
      const formResult = await ValidationService.validateForm("forgot-password", data, token)

      if (!formResult.success) {
        if (formResult.errors?.email) {
          form.setError("email", {
            type: "manual",
            message: formResult.errors.email[0],
          })
        } else if (formResult.message) {
          notification.error("Erro", formResult.message)
        }
        resetCaptcha()
        setIsLoading(false)
        return
      }

      setIsSubmitted(true)
      notification.success("Email enviado", "Verifique seu email para redefinir sua senha.")
    } catch (error: any) {
      console.error("Erro ao solicitar redefinição de senha:", error)

      if (error.response?.status === 404) {
        form.setError("email", {
          type: "manual",
          message: "Email não encontrado",
        })
      } else {
        notification.error("Erro", "Ocorreu um erro ao processar sua solicitação. Tente novamente.")
      }

      // Resetar o captcha em caso de erro
      resetCaptcha()
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Email enviado</h1>
          <p className="text-sm text-zinc-400">
            Enviamos um email com instruções para redefinir sua senha. Verifique sua caixa de entrada.
          </p>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/login" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para o login
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Esqueceu sua senha?</h1>
        <p className="text-sm text-zinc-400">
          Digite seu email abaixo e enviaremos instruções para redefinir sua senha.
        </p>
      </div>

      <FormProvider {...form}>
        <Form>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" onKeyDown={handleKeyDown}>
            <FormInput name="email" label="Email" placeholder="seu@email.com" type="email" disabled={isLoading} />

            {/* hCaptcha */}
            <HCaptchaComponent
              ref={captchaRef}
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaError}
              size="normal"
            />

            <FormSubmitButton
              isLoading={isLoading}
              loadingText="Enviando..."
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Enviar instruções
            </FormSubmitButton>
          </form>
        </Form>
      </FormProvider>

      <div className="flex justify-center">
        <Button asChild variant="link" className="text-purple-400 hover:text-purple-300">
          <Link href="/login" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </Link>
        </Button>
      </div>
    </div>
  )
}
