"use client"

import { createContext, useContext, type ReactNode, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/hooks/use-notification"
// Import setAuthToken and clearAuthToken from api.ts
import { setAuthToken, clearAuthToken } from "@/services/api"
import { MockAuthService } from "@/interfaces/mock/auth";
import { mockConfig } from "@/interfaces/mock/config";
import type { User } from "@/interfaces/auth/user";
import { jwtDecode } from 'jwt-decode';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

// Context provides only redirect function and toast function
interface AuthContextType {
  // Parameter name changed to reflect it's the auth_token
  loginAndRedirect: (authToken: string) => Promise<void>;
  showFeatureDisabledToast: (featureName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Decode function might still be useful if beta check is done before redirect
const decodeAuthToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);
        // Ensure the structure matches the User interface
        return {
            id: decoded.user_id || decoded.sub, // Adjust based on actual token payload
            email: decoded.sub,
            name: decoded.full_name || "Usuário", // Provide default if name is missing
            features: decoded.features || [],
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

// Internal helper for access check
const hasAccessInternal = (currentUser: User | null, featureName: string): boolean => {
    if (!currentUser?.features) return false;
    return currentUser.features.includes(featureName);
};


export function AuthProvider({ children }: { children: ReactNode }) {
  // Remove all state management related to user session
  const router = useRouter()
  const notification = useNotification()

  // Remove checkAuth useEffect entirely

  // Parameter name changed to authToken for clarity
  const loginAndRedirect = useCallback(async (authToken: string) => {
    try {
      // 1. Save the token using setAuthToken (which now saves to localStorage)
      setAuthToken(authToken);
      console.log("AuthProvider: Auth token saved.");

      // 2. Decode the token for checks
      const decodedUser = decodeAuthToken(authToken);

      if (!decodedUser) {
          // If decoding fails, clear the potentially invalid token
          clearAuthToken();
          throw new Error("Falha ao decodificar token recebido.");
      }

      // 3. Perform pre-redirect checks
      if (!hasAccessInternal(decodedUser, 'beta_access')) {
          notification.warning("Acesso Beta Necessário", "Sua conta ainda não tem acesso à fase Beta.");
          // Don't clear token here, user might still be logged in but lack beta access
          router.push("/beta-required");
          return;
      }

      // 4. Redirect to the main platform dashboard
      // The token is already saved in localStorage by setAuthToken
      notification.success("Login realizado", "Redirecionando para a plataforma...");
      const targetUrl = `${PLATFORM_URL}/dashboard`;
      window.location.href = targetUrl;

    } catch (error: any) {
        console.error("Erro no processo de login/redirect:", error);
        notification.error("Erro de Login", error.message || "Não foi possível processar o login.");
        // Clear token on error during this process
        clearAuthToken();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification, router]);

  const showFeatureDisabledToast = useCallback((featureName: string) => {
    if (mockConfig.enabled) {
        MockAuthService.showFeatureDisabledToast(featureName);
    } else {
        notification.info(
          "Feature Desativada",
          `A funcionalidade "${featureName}" está temporariamente desativada.`,
        );
    }
  }, [notification]);

  // Provide simplified context value
  return (
    <AuthContext.Provider
      value={{
        loginAndRedirect,
        showFeatureDisabledToast,
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
