"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/components/ui/notifications"
import { api } from "@/services/api"
// Atualizar a importação para usar apenas MockAuthService
import { MockAuthService, mockConfig } from "@/services/mock-auth-service"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (
    email: string,
    password: string,
    rememberMe?: boolean,
    captchaToken?: string,
    authToken?: string,
  ) => Promise<void>
  logout: () => Promise<void>
  // Adicionando função para mostrar toast de feature desativada
  showFeatureDisabledToast: (featureName: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const notification = useNotification()

  const isAuthenticated = !!user

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a página
    const checkAuth = async () => {
      try {
        setIsLoading(true)

        // Usar serviço mockado se estiver habilitado
        if (mockConfig.enabled) {
          console.log("[AuthProvider] Using mock authentication service")
          const mockUser = await MockAuthService.checkAuth()
          setUser(mockUser)
          setIsLoading(false)
          return
        }

        // Lógica original
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Fazer uma requisição para obter os dados do usuário
          const response = await api.get("/auth/me")
          setUser(response.data.user)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        // Se houver erro, remover o token
        localStorage.removeItem("auth_token")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (
    email: string,
    password: string,
    rememberMe?: boolean,
    captchaToken?: string,
    authToken?: string,
  ) => {
    try {
      setIsLoading(true)

      // Usar serviço mockado se estiver habilitado
      if (mockConfig.enabled) {
        console.log("[AuthProvider] Using mock login")
        const { user: mockUser, token } = await MockAuthService.login(email, password)
        localStorage.setItem("mock_auth_token", token)
        setUser(mockUser)
        notification.success("Login realizado", "Você foi autenticado com sucesso (modo de desenvolvimento)!")
        router.push("/dashboard")
        return
      }

      // Se já temos um token de autenticação do processo de validação, usamos ele
      if (authToken) {
        localStorage.setItem("auth_token", authToken)

        // Obter dados do usuário
        const response = await api.get("/auth/me")
        setUser(response.data.user)

        notification.success("Login realizado", "Você foi autenticado com sucesso!")
        router.push("/dashboard")
        return
      }

      // Caso contrário, fazemos o processo de login normal
      if (!captchaToken) {
        throw new Error("Captcha token is required")
      }

      const response = await api.post("/auth/login", {
        email,
        password,
        rememberMe,
        captchaToken,
      })

      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token)
        setUser(response.data.user)
        notification.success("Login realizado", "Você foi autenticado com sucesso!")
        router.push("/dashboard")
      } else {
        throw new Error("Token de autenticação não recebido")
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      setIsLoading(true)

      // Usar serviço mockado se estiver habilitado
      if (mockConfig.enabled) {
        console.log("[AuthProvider] Using mock logout")
        await MockAuthService.logout()
        setUser(null)
        notification.success("Logout realizado", "Você foi desconectado com sucesso (modo de desenvolvimento)!")
        router.push("/")
        return
      }

      // Lógica original
      const token = localStorage.getItem("auth_token")

      if (token) {
        await api.post("/auth/logout")
      }

      localStorage.removeItem("auth_token")
      setUser(null)
      notification.success("Logout realizado", "Você foi desconectado com sucesso!")
      router.push("/login")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
      notification.error("Erro", "Ocorreu um erro ao fazer logout. Tente novamente.")

      // Mesmo com erro, remover o token e deslogar o usuário
      localStorage.removeItem("auth_token")
      setUser(null)
      router.push("/login")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para mostrar toast de feature desativada
  const showFeatureDisabledToast = (featureName: string) => {
    notification.info(
      "Feature Desativada",
      `A funcionalidade "${featureName}" está temporariamente desativada para fins de desenvolvimento.`,
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        showFeatureDisabledToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
