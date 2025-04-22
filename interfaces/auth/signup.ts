import type { SignupFormData } from "@/lib/schemas/auth";

// Interface for the final signup step payload
// Only omit verificationCode, keep confirmPassword for backend validation
export interface SignupCompleteData extends Omit<SignupFormData, 'verificationCode'> {
  verification_proof_token: string;
  hcaptcha_token: string | null;
}

// Add other auth-related signup interfaces here if needed
