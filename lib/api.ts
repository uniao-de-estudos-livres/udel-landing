import axios from "axios"

// Criando uma instância do axios com configurações padrão
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar o token de autenticação em todas as requisições
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros específicos
    if (error.response) {
      // Erro de autenticação
      if (error.response.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token")
          // Redirecionar para login se necessário
          window.location.href = "/login"
        }
      }

      // Erro de validação
      if (error.response.status === 422) {
        return Promise.reject({
          ...error,
          validationErrors: error.response.data.errors,
        })
      }
    }

    return Promise.reject(error)
  },
)

export default api
