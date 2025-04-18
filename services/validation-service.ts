import api from "@/lib/api"

export interface ValidationResponse {
  success: boolean
  errors?: Record<string, string[]>
  message?: string
  token?: string
}

export const ValidationService = {
  /**
   * Valida um campo ou conjunto de campos com o backend
   */
  async validateField(
    formId: string,
    fieldName: string,
    value: any,
    captchaToken?: string,
  ): Promise<ValidationResponse> {
    try {
      const response = await api.post("/validation/field", {
        formId,
        fieldName,
        value,
        captchaToken,
      })
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: "Erro ao validar campo",
      }
    }
  },

  /**
   * Valida uma etapa completa do formulário
   */
  async validateStep(
    formId: string,
    stepId: string,
    data: Record<string, any>,
    captchaToken?: string,
  ): Promise<ValidationResponse> {
    try {
      const response = await api.post("/validation/step", {
        formId,
        stepId,
        data,
        captchaToken,
      })
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: "Erro ao validar etapa",
      }
    }
  },

  /**
   * Valida o formulário completo
   */
  async validateForm(formId: string, data: Record<string, any>, captchaToken: string): Promise<ValidationResponse> {
    try {
      const response = await api.post("/validation/form", {
        formId,
        data,
        captchaToken,
      })
      return response.data
    } catch (error: any) {
      if (error.response?.data) {
        return error.response.data
      }
      return {
        success: false,
        message: "Erro ao validar formulário",
      }
    }
  },
}
