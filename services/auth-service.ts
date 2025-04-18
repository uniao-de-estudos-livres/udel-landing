import { api } from "@/services/api"
import type { LoginFormData, SignupFormData, ResetPasswordFormData } from "@/lib/schemas/auth"
import { MockAuthService } from "@/lib/mock-auth-service";

interface SignupCompleteData extends Omit<SignupFormData, 'verificationCode' | 'confirmPassword'> {
  verification_proof_token: string;
  hcaptcha_token: string | null;
}

interface SupporterData {
    id: string;
    name: string;
    avatar_url?: string | null;
    contribution_date: string;
}

interface DonationStats {
    students_benefited?: number | null;
    monthly_donors?: number | null;
    transparency_description?: string | null;
}

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}


export const AuthService = {
  async login(data: LoginFormData, captchaToken: string | null) {
    const response = await api.post("/auth/signin/", {
      method: "classic",
      data: {
        email: data.email,
        password: data.password,
        hcaptcha_token: captchaToken
      }
    });
    if (response.data.access_token) {
      if (typeof window !== "undefined") {
         localStorage.setItem("auth_token", response.data.access_token);
      }
    } else {
       console.error("Login API call succeeded but access_token missing in response:", response.data);
       throw new Error("Token de autenticação não recebido do servidor.");
    }
    return response.data;
  },

  async submitEmailStep(email: string, hcaptchaToken: string | null) {
    const response = await api.post("/auth/signin/email", { email: email, token: hcaptchaToken });
    return response.data;
  },
  async submitVerificationCode(email: string, code: string) {
    const response = await api.post("/auth/signin/code", { email: email, code: code });
    return response.data; // Expects { data: { verification_proof: "..." } }
  },
  async completeSignup(data: SignupCompleteData) {
    const response = await api.post("/auth/signup/complete", data);
    return response.data;
  },

  async getSupporters(limit: number = 50): Promise<SupporterData[]> {
    try {
        const response = await api.get(`/supporters/?limit=${limit}`);
        if (response.data?.status === 200 && Array.isArray(response.data.data)) {
            return response.data.data;
        } else {
            console.error("Unexpected response format for supporters:", response.data);
            return [];
        }
    } catch (error) {
        console.error("Failed to fetch supporters:", error);
        throw error;
    }
  },

  async getDonationStats(): Promise<DonationStats | null> {
    try {
        const response = await api.get(`/donations/stats`);
        if (response.data?.status === 200 && response.data.data) {
            return response.data.data;
        } else {
            console.error("Unexpected response format for donation stats:", response.data);
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch donation stats:", error);
        return null;
    }
  },

  async addToWaitlist(email: string, hcaptchaToken: string): Promise<any> {
      const response = await api.post("/waitlist/", { email, hcaptcha_token: hcaptchaToken });
      if (response.status === 201 && response.data?.status === 201) {
          return response.data;
      } else {
          const errorDetail = response.data?.detail || "Failed to add to waitlist";
          console.error("Add to waitlist failed:", errorDetail);
          throw new Error(errorDetail);
      }
  },

  async sendContactForm(data: ContactFormData): Promise<any> {
      const response = await api.post("/contact/", data);
      if (response.status === 200 && response.data?.status === 200) {
          return response.data;
      } else {
          const errorDetail = response.data?.detail || "Failed to send contact message";
          console.error("Send contact form failed:", errorDetail);
          throw new Error(errorDetail);
      }
  },

  async verifyEmail(token: string) {
    const response = await api.post("/auth/verify-email", { token })
    return response.data
  },
  async forgotPassword(email: string, captchaToken: string) {
    const response = await api.post("/auth/forgot-password", { email, captchaToken })
    return response.data
  },
  async resetPassword(data: ResetPasswordFormData) {
    const response = await api.post("/auth/reset-password", data)
    return response.data
  },
  async logout() {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        console.error("Logout API call failed:", error);
    } finally {
        if (typeof window !== "undefined") {
            localStorage.removeItem("auth_token");
            localStorage.removeItem("mock_auth_token");
        }
    }
    return { success: true };
  },
  isAuthenticated() {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token") || !!localStorage.getItem("mock_auth_token");
  },
  async getCurrentUser() {
    if (typeof window !== "undefined" && localStorage.getItem("auth_token")) {
        try {
            const response = await api.get("/users/me");
            return response.data?.data || null;
        } catch (error) {
             console.error("Failed to fetch current user:", error);
             return null;
        }
    }
    else if (typeof window !== "undefined" && localStorage.getItem("mock_auth_token")) {
        return MockAuthService.checkAuth();
    }
    return null;
  },
}
