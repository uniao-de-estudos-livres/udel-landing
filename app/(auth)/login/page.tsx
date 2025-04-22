"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { AuthLayout } from "@/components/layout/auth-layout";
// Import token helpers and AuthService
import { setAuthToken, clearAuthToken } from "@/services/api";
import { AuthService } from "@/services/auth-service";
// Import User type and helpers
import type { User } from "@/interfaces/auth/user";
import { jwtDecode } from 'jwt-decode';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

// Helper functions (could be moved to utils)
const decodeAuthToken = (token: string): User | null => {
    try {
        const decoded: any = jwtDecode(token);
        return {
            id: decoded.user_id || decoded.sub,
            email: decoded.sub,
            name: decoded.full_name || "Usuário",
            features: decoded.features || [],
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

const hasAccessInternal = (currentUser: User | null, featureName: string): boolean => {
    if (!currentUser?.features) return false;
    return currentUser.features.includes(featureName);
};


export default function LoginPage() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const router = useRouter();
  // No longer need loginAndRedirect here for auto-login

  useEffect(() => {
    const attemptAutoLogin = async () => {
      setIsCheckingSession(true);
      try {
        console.log("LoginPage: Attempting auto-login via refresh token...");
        // Directly attempt to refresh the token using the AuthService method
        // The interceptor in api.ts will call setAuthToken on success, saving to localStorage
        const refreshResponse = await AuthService.attemptRefresh();

        if (refreshResponse?.auth_token) {
          console.log("LoginPage: Auto-login successful via refresh. Token stored.");
          // Token is now stored by setAuthToken called within the interceptor/AuthService.
          // Decode the token to check for beta access before redirecting.
          const decodedUser = decodeAuthToken(refreshResponse.auth_token);

          if (hasAccessInternal(decodedUser, 'beta_access')) {
              console.log("LoginPage: Beta access confirmed, redirecting to platform.");
              // Redirect directly to the platform URL
              window.location.href = `${PLATFORM_URL}/dashboard`;
              // Keep loading state true as we are navigating away
              return; // Exit useEffect early
          } else {
              console.log("LoginPage: No beta access, redirecting to beta-required page.");
              router.push("/beta-required");
              // Keep loading state true as we are navigating away
              return; // Exit useEffect early
          }
        } else {
           // Should not happen if attemptRefresh throws error on failure
           console.warn("LoginPage: Refresh attempt succeeded but no auth_token returned.");
           clearAuthToken();
           setIsCheckingSession(false);
        }
      } catch (error: any) {
        // Refresh failed (no valid refresh token cookie, expired, network error, etc.)
        console.log("LoginPage: Auto-login failed (no valid refresh token or error). Showing login form.", error.message);
        clearAuthToken(); // Ensure token state is clear
        setIsCheckingSession(false); // Allow rendering login form
      }
    };

    attemptAutoLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]); // Removed loginAndRedirect dependency

  // Render nothing or a loading indicator while checking session
  if (isCheckingSession) {
    return null; // Or a proper loading component
  }

  // Render login form only if session check is complete and failed
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
