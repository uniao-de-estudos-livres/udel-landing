"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNotification } from "@/components/ui/notifications"
import { ValidationService } from "@/services/validation-service"
import { useCaptcha } from "@/hooks/use-captcha"

interface StepFormOptions<T> {
  formId: string
  defaultValues: T
  schema: any
  onSuccess?: (data: T, token?: string) => Promise<void> | void
  requireCaptcha?: boolean
}

export function useStepForm<T extends Record<string, any>>({
  formId,
  defaultValues,
  schema,
  onSuccess,
  requireCaptcha = true,
}: StepFormOptions<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState<string[]>([])
  const notification = useNotification()
  const captcha = useCaptcha()

  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const validateField = async (fieldName: string, value: any) => {
    try {
      const result = await ValidationService.validateField(formId, fieldName, value)

      if (!result.success && result.errors && result.errors[fieldName]) {
        form.setError(fieldName as any, {
          type: "manual",
          message: result.errors[fieldName][0],
        })
        return false
      }

      return true
    } catch (error) {
      console.error(`Error validating field ${fieldName}:`, error)
      return false
    }
  }

  const validateStep = async (stepId: string, data: Partial<T>) => {
    try {
      const result = await ValidationService.validateStep(formId, stepId, data)

      if (!result.success) {
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as any, {
                type: "manual",
                message: messages[0],
              })
            }
          })
        } else if (result.message) {
          notification.error("Erro de validação", result.message)
        }
        return false
      }

      return true
    } catch (error) {
      console.error(`Error validating step ${stepId}:`, error)
      notification.error("Erro", "Ocorreu um erro ao validar os dados. Tente novamente.")
      return false
    }
  }

  const submitForm = async (data: T) => {
    try {
      setIsLoading(true)

      // Verificar se o captcha é necessário
      let captchaToken: string | null = null

      if (requireCaptcha) {
        captchaToken = await captcha.executeCaptcha()

        if (!captchaToken) {
          notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.")
          setIsLoading(false)
          return
        }
      }

      // Validar formulário completo
      const formResult = await ValidationService.validateForm(formId, data, captchaToken || "not-required")

      if (!formResult.success) {
        if (formResult.errors) {
          Object.entries(formResult.errors).forEach(([field, messages]) => {
            if (Array.isArray(messages) && messages.length > 0) {
              form.setError(field as any, {
                type: "manual",
                message: messages[0],
              })
            }
          })
        } else if (formResult.message) {
          notification.error("Erro de validação", formResult.message)
        }

        if (requireCaptcha) {
          captcha.resetCaptcha()
        }

        setIsLoading(false)
        return
      }

      // Chamar callback de sucesso
      if (onSuccess) {
        await onSuccess(data, formResult.token)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      notification.error("Erro", "Ocorreu um erro ao enviar o formulário. Tente novamente.")

      if (requireCaptcha) {
        captcha.resetCaptcha()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = async () => {
    if (currentStep < steps.length - 1) {
      const stepId = steps[currentStep]
      const isValid = await form.trigger()

      if (!isValid) return

      const stepData = form.getValues()
      const stepValidated = await validateStep(stepId, stepData)

      if (stepValidated) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const setFormSteps = (newSteps: string[]) => {
    setSteps(newSteps)
  }

  return {
    form,
    isLoading,
    currentStep,
    steps,
    setFormSteps,
    validateField,
    validateStep,
    submitForm,
    nextStep,
    prevStep,
    captcha,
  }
}
