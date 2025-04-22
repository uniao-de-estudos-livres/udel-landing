import { api, setAuthToken, clearAuthToken } from "./api"; // Import api instance
import type { AxiosResponse } from "axios";
import type { LoginFormData } from "@/lib/schemas/auth"; // Assuming SigninData corresponds to LoginFormData
import type { SignupCompleteData } from "@/interfaces/auth/signup";
import type { SupporterData } from "@/interfaces/supporter"; // Corrected import name
import type { DonationStats } from "@/interfaces/donations/stats";
import type { ContactFormData } from "@/interfaces/contact"; // Assuming ContactData corresponds to ContactFormData

// Define expected response types more explicitly
interface AuthResponse {
    auth_token: string;
    token_type: string;
}

// Updated VerificationResponse to match backend ApiResponse structure
// for the /signup/code endpoint success case.
interface VerificationResponse {
    status: number;
    message: string;
    data: {
        verification_proof: string; // Expect the proof token inside data
    };
}

// Define missing payload types based on usage/backend expectations
// (Could be moved to dedicated interface files later)
interface SignupEmailData {
    email: string;
    token: string | null; // hCaptcha token
}

interface SignupVerificationData {
    email: string;
    code: string;
}

interface WaitlistData {
    email: string;
}

// Use LoginFormData from schemas as SigninData, but add hcaptcha_token for payload
interface SigninPayload extends LoginFormData {
    hcaptcha_token?: string | null;
}

// Type for the actual data sent to the /signin endpoint (matching backend DTO)
interface BackendSigninRequest {
    method?: "classic"; // Explicitly classic for this case
    data: SigninPayload;
}


export class AuthService {

    // Login using email/password
    static async signin(data: SigninPayload): Promise<AuthResponse> {
        // Encapsulate the login data within a 'data' field as expected by the backend
        const requestPayload: BackendSigninRequest = {
            method: "classic", // Specify the method
            data: data
        };
        console.log("AuthService: Sending signin payload:", requestPayload); // Log payload
        const response: AxiosResponse<AuthResponse> = await api.post("/auth/signin", requestPayload);
        // Token setting is handled by interceptor on successful response
        return response.data;
    }

    // Signup Step 1: Submit Email
    static async submitEmailStep(email: string, hcaptchaToken: string | null): Promise<void> {
        const payload: SignupEmailData = { email, token: hcaptchaToken };
        // URL corrected based on backend router prefix
        await api.post("/auth/signup/email", payload);
    }

    // Signup Step 2: Submit Verification Code
    static async submitVerificationCode(email: string, code: string): Promise<AxiosResponse<VerificationResponse>> {
        const payload: SignupVerificationData = { email, code };
        // URL corrected based on backend router prefix
        // The generic type for api.post now uses the updated VerificationResponse
        return await api.post<VerificationResponse>("/auth/signup/code", payload);
    }

    // Signup Step 3: Complete Signup
    static async completeSignup(data: SignupCompleteData): Promise<AuthResponse> {
        const response: AxiosResponse<AuthResponse> = await api.post("/auth/signup/complete", data);
        // Token setting is handled by interceptor on successful response
        return response.data;
    }

    // Logout: Invalidate refresh token on backend
    static async logout(): Promise<void> {
        try {
            await api.post("/auth/logout");
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            clearAuthToken(); // Always clear local token state
        }
    }

    // Attempt token refresh using HttpOnly cookie
    static async attemptRefresh(): Promise<AuthResponse> {
        console.log("AuthService: Attempting token refresh via /auth/refresh");
        const response: AxiosResponse<AuthResponse> = await api.post("/auth/refresh", {});
        if (!response.data?.auth_token) {
            throw new Error("Refresh endpoint did not return auth_token.");
        }
        // Interceptor already sets the token via setAuthToken on success
        console.log("AuthService: Refresh successful, received new auth_token.");
        return response.data;
    }

    // --- Restored Missing Methods ---

    // Add email to waitlist
    static async addToWaitlist(email: string): Promise<void> {
        const payload: WaitlistData = { email };
        await api.post("/waitlist", payload);
    }

    // Get donation statistics
    static async getDonationStats(): Promise<DonationStats> {
        const response: AxiosResponse<{ data: DonationStats }> = await api.get("/donation_stats");
        return response.data.data; // Assuming data is nested under 'data' key
    }

    // Send contact form data
    static async sendContactForm(data: ContactFormData): Promise<void> {
        await api.post("/contact", data);
    }

    // Get list of supporters
    static async getSupporters(): Promise<SupporterData[]> { // Corrected return type
         const response: AxiosResponse<{ data: SupporterData[] }> = await api.get("/supporters"); // Corrected expected data type
         return response.data.data; // Assuming data is nested under 'data' key
    }

     // Method alias for login form compatibility (calls signin)
     // The 'data' parameter here is SigninPayload (includes hcaptcha_token)
     static async login(data: SigninPayload): Promise<AuthResponse> {
        return this.signin(data);
    }
}
