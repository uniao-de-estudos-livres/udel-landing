"use server"
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth"

export interface ValidationResponse {
  success: boolean
  errors?: Record<string, string[]>
  message?: string
  token?: string
}

export async function validateLoginCredentials(data: LoginFormData): Promise<ValidationResponse> {
  try {
    // Validar com zod
    const result = loginSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string[]> = {}

      result.error.errors.forEach((error) => {
        const path = error.path[0].toString()
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(error.message)
      })

      return {
        success: false,
        errors,
      }
    }

    // Simulação de validação no servidor
    // Em produção, isso seria uma chamada à API
    return {
      success: true,
    }
  } catch (error) {
    console.error("Erro ao validar credenciais:", error)
    return {
      success: false,
      message: "Erro ao validar credenciais",
    }
  }
}

export async function validateLoginForm(data: LoginFormData & { captchaToken: string }): Promise<ValidationResponse> {
  try {
    // Validar com zod
    const result = loginSchema.safeParse(data)

    if (!result.success) {
      const errors: Record<string, string[]> = {}

      result.error.errors.forEach((error) => {
        const path = error.path[0].toString()
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(error.message)
      })

      return {
        success: false,
        errors,
      }
    }

    // Verificar captcha
    if (!data.captchaToken) {
      return {
        success: false,
        message: "Captcha não verificado",
      }
    }

    // Simulação de validação no servidor
    // Em produção, isso seria uma chamada à API
    return {
      success: true,
      token: "mock-token-" + Date.now(),
    }
  } catch (error) {
    console.error("Erro ao validar formulário:", error)
    return {
      success: false,
      message: "Erro ao validar formulário",
    }
  }
}
