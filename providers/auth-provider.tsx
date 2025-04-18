"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useNotification } from "@/hooks/use-notification"
import { api } from "@/lib/api" // Assuming api setup handles token automatically
import { MockAuthService, mockConfig } from "@/lib/mock-auth-service"
// Correct the import to use named import
import { jwtDecode } from 'jwt-decode';

// Define User type to include features
interface User {
  id?: string; // Make id optional if not always present in token initially
  name?: string; // Make name optional
  email: string;
  avatar?: string;
  features?: string[]; // Add features array
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  // login function signature might change depending on how token/user data is handled
  login: (authToken: string) => Promise<void>; // Simplified login, expects token
  logout: () => Promise<void>
  showFeatureDisabledToast: (featureName: string) => void;
  hasAccess: (featureName: string) => boolean; // Function to check feature access
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to decode token safely
const decodeAuthToken = (token: string): User | null => {
    try {
        // Decode the token to get user info and features
        // Use the correctly imported jwtDecode function
        const decoded: any = jwtDecode(token);
        // Map claims to User interface (adjust claim names if different in your JWT)
        return {
            id: decoded.user_id, // Assuming user_id claim exists
            email: decoded.sub, // Assuming email is in 'sub' claim
            name: decoded.full_name, // Assuming full_name claim exists
            features: decoded.features || [], // Get features, default to empty array
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

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        if (mockConfig.enabled) {
          // ... (mock checkAuth logic) ...
          return;
        }

        const token = localStorage.getItem("auth_token");
        if (token) {
          const decodedUser = decodeAuthToken(token);
          if (decodedUser) {
             // Verify token validity with backend (optional but recommended)
             // try {
             //   await api.get("/users/me"); // Simple call to protected route
             //   setUser(decodedUser);
             // } catch (verifyError) {
             //   console.error("Token verification failed:", verifyError);
             //   localStorage.removeItem("auth_token");
             //   setUser(null);
             // }
             setUser(decodedUser); // Set user based on decoded token for now
          } else {
             // Invalid token found in storage
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

  // Login function - now expects only the auth token
  const login = async (authToken: string) => {
    setIsLoading(true);
    try {
      // Store the token
      localStorage.setItem("auth_token", authToken);
      // Decode token to get user info and features
      const decodedUser = decodeAuthToken(authToken);
      if (!decodedUser) {
          throw new Error("Falha ao decodificar token recebido.");
      }
      setUser(decodedUser); // Update user state

      // Check for beta access after setting user
      if (!hasAccessInternal(decodedUser, 'beta_access')) {
          notification.warning("Acesso Beta Necessário", "Sua conta ainda não tem acesso à fase Beta.");
          router.push("/beta-required"); // Redirect to beta required page
          // Optionally logout immediately: await logoutInternal();
      } else {
          // Proceed to dashboard if access granted
          notification.success("Login realizado", "Você foi autenticado com sucesso!");
          // Redirect logic might be handled by LoginForm now, or keep it here
          // router.push("/dashboard");
      }
    } catch (error: any) {
        console.error("Erro no processo de login do AuthProvider:", error);
        localStorage.removeItem("auth_token"); // Clean up on error
        setUser(null);
        notification.error("Erro de Login", error.message || "Não foi possível processar o login.");
        // Re-throw maybe? Or handle redirect here?
        // throw error;
    } finally {
        setIsLoading(false);
    }
  };

  // Internal logout logic used by exported logout and potentially after failed beta check
  const logoutInternal = async () => {
     try {
        // Call backend logout only if not using mock
        if (!mockConfig.enabled) {
            const token = localStorage.getItem("auth_token");
            if (token) {
                await api.post("/auth/logout"); // Adjust endpoint if needed
            }
        }
     } catch (error) {
         console.error("Logout API call failed:", error);
         // Don't block logout if API fails
     } finally {
         // Always clear local storage and state
         localStorage.removeItem("auth_token");
         localStorage.removeItem("mock_auth_token"); // Clear mock token too
         setUser(null);
     }
  };

  // Exported logout function
  const logout = async () => {
    setIsLoading(true);
    await logoutInternal(); // Call internal logic
    notification.success("Logout realizado", "Você foi desconectado com sucesso!");
    router.push("/login"); // Redirect to login after logout
    setIsLoading(false);
  };

  // Helper function to check features (internal)
  const hasAccessInternal = (currentUser: User | null, featureName: string): boolean => {
      if (!currentUser || !currentUser.features) {
          return false;
      }
      return currentUser.features.includes(featureName);
  };

  // Exported function to check features from components
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
        login, // Provide the updated login function
        logout,
        showFeatureDisabledToast,
        hasAccess, // Provide the feature check function
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
