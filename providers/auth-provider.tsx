"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/hooks/use-notification"
import { api } from "@/lib/api"
// Remove mock imports
// import { MockAuthService, mockConfig } from "@/lib/mock-auth-service"
import { jwtDecode } from 'jwt-decode';

interface User {
  id?: string;
  name?: string;
  email: string;
  avatar?: string;
  features?: string[];
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (authToken: string) => Promise<void>;
  logout: () => Promise<void>
  showFeatureDisabledToast: (featureName: string) => void;
  hasAccess: (featureName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const decodeAuthToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            id: decoded.user_id,
            email: decoded.sub,
            name: decoded.full_name,
            features: decoded.features || [],
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const notification = useNotification()

  const isAuthenticated = !!user

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Remove mock check
        // if (mockConfig.enabled) { ... }

        const token = localStorage.getItem("auth_token");
        if (token) {
          const decodedUser = decodeAuthToken(token);
          if (decodedUser) {
             // Optional: Verify token validity with backend
             setUser(decodedUser);
          } else {
             localStorage.removeItem("auth_token");
             setUser(null);
          }
        } else {
            setUser(null);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        localStorage.removeItem("auth_token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (authToken: string) => {
    setIsLoading(true);
    try {
      localStorage.setItem("auth_token", authToken);
      const decodedUser = decodeAuthToken(authToken);
      if (!decodedUser) {
          throw new Error("Falha ao decodificar token recebido.");
      }
      setUser(decodedUser);

      if (!hasAccessInternal(decodedUser, 'beta_access')) {
          notification.warning("Acesso Beta Necessário", "Sua conta ainda não tem acesso à fase Beta.");
          router.push("/beta-required");
      } else {
          notification.success("Login realizado", "Você foi autenticado com sucesso!");
      }
    } catch (error: any) {
        console.error("Erro no processo de login do AuthProvider:", error);
        localStorage.removeItem("auth_token");
        setUser(null);
        notification.error("Erro de Login", error.message || "Não foi possível processar o login.");
    } finally {
        setIsLoading(false);
    }
  };

  const logoutInternal = async () => {
     try {
        // Remove mock check
        const token = localStorage.getItem("auth_token");
        if (token) {
            await api.post("/auth/logout");
        }
     } catch (error) {
         console.error("Logout API call failed:", error);
     } finally {
         localStorage.removeItem("auth_token");
         // Remove mock token clear
         // localStorage.removeItem("mock_auth_token");
         setUser(null);
     }
  };

  const logout = async () => {
    setIsLoading(true);
    await logoutInternal();
    notification.success("Logout realizado", "Você foi desconectado com sucesso!");
    router.push("/login");
    setIsLoading(false);
  };

  const hasAccessInternal = (currentUser: User | null, featureName: string): boolean => {
      if (!currentUser?.features) return false;
      return currentUser.features.includes(featureName);
  };

  const hasAccess = (featureName: string): boolean => {
      return hasAccessInternal(user, featureName);
  };

  const showFeatureDisabledToast = (featureName: string) => {
    notification.info(
      "Feature Desativada",
      `A funcionalidade "${featureName}" está temporariamente desativada para fins de desenvolvimento.`,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        logout,
        showFeatureDisabledToast,
        hasAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
