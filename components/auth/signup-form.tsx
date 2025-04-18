"use client"

import type React from "react"
import { useState, useEffect } from "react" // Import useEffect
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import { useNotification } from "@/components/ui/notifications"
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth"
// import { useCaptcha } from "@/hooks/use-captcha" // Keep commented if hCaptcha disabled
// import { HCaptchaComponent } from "@/components/ui/h-captcha" // Keep commented if hCaptcha disabled
import { FormInput } from "@/components/ui/form-components/form-input"
import { FormCheckbox } from "@/components/ui/form-components/form-checkbox"
import { FormSubmitButton } from "@/components/ui/form-components/form-submit-button"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { VerificationCodeInput } from "@/components/ui/verification-code-input"
import { SocialAuthButtons } from "@/components/ui/form-components/social-auth-buttons"
import { AuthDivider } from "@/components/ui/form-components/auth-divider"
import { PasswordStrengthMeter } from "@/components/ui/form-components/password-strength-meter"
import { AuthService } from "@/services/auth-service";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"; // Import Loader2 icon

// Define the steps for the signup process
type SignupStep = "email" | "verification" | "details"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false) // General loading state for API calls
  const [currentStep, setCurrentStep] = useState<SignupStep>("email")
  const [submittedEmail, setSubmittedEmail] = useState<string>("")
  const [verificationProofToken, setVerificationProofToken] = useState<string | null>(null);
  const router = useRouter()
  const notification = useNotification()
  // const { captchaRef, executeCaptcha, resetCaptcha } = useCaptcha() // Keep commented
  // const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null); // Keep commented

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      verificationCode: "",
    },
    mode: "onBlur",
  })

  const password = form.watch("password")

  // const onHCaptchaVerify = (token: string) => setHCaptchaToken(token); // Keep commented
  // const onHCaptchaExpire = () => setHCaptchaToken(null); // Keep commented
  // const onHCaptchaError = (err: Error) => { ... }; // Keep commented

  // --- Logic for Email Step ---
  const handleEmailSubmit = async () => {
    setIsLoading(true); // Start loading
    const emailIsValid = await form.trigger("email");
    if (!emailIsValid) {
      setIsLoading(false);
      return;
    }
    // Skip hCaptcha check

    const emailValue = form.getValues("email");
    setSubmittedEmail(emailValue);

    try {
      await AuthService.submitEmailStep(emailValue, null as any);
      // resetCaptcha();
      // setHCaptchaToken(null);
      setCurrentStep("verification");
    } catch (error: any) {
      console.error("Error submitting email step:", error);
      // resetCaptcha();
      // setHCaptchaToken(null);
      const errorMessage = error.response?.data?.detail || "Não foi possível verificar o email. Tente novamente.";
      if (error.response?.status === 409 || errorMessage.includes("already registered") || errorMessage.includes("already in use")) {
           form.setError("email", { type: "manual", message: "Este email já está cadastrado. Tente fazer login." });
      } else {
           notification.error("Erro", errorMessage);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  // --- End Logic for Email Step ---

  // --- Logic for Verification Step ---
  const handleVerificationSubmit = async () => {
    setIsLoading(true); // Start loading
    const codeIsValid = await form.trigger("verificationCode");
    if (!codeIsValid) {
      setIsLoading(false);
      return;
    }

    const codeValue = form.getValues("verificationCode");

    try {
      const response = await AuthService.submitVerificationCode(submittedEmail, codeValue || "");
      const responseData = response.data;

      if (responseData?.verification_proof) {
        setVerificationProofToken(responseData.verification_proof);
        setCurrentStep("details");
      } else {
        notification.error("Erro", "Falha ao obter prova de verificação.");
        form.setError("verificationCode", { type: "manual", message: "Falha na verificação." });
      }
    } catch (error: any) {
       console.error("Error submitting verification code:", error);
       const errorMessage = error.response?.data?.detail || "Não foi possível verificar o código. Tente novamente.";
       if (errorMessage.includes("Invalid or expired code") || error.response?.status === 400) {
           form.setError("verificationCode", { type: "manual", message: "Código inválido ou expirado." });
       } else {
           notification.error("Erro", errorMessage);
       }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  // --- End Logic for Verification Step ---

  // --- Logic for Final Details Submission ---
  async function onSubmit(data: SignupFormData) {
    if (currentStep !== 'details') return;

    setIsLoading(true); // Start loading
    try {
      if (!verificationProofToken) {
        notification.error("Erro", "Prova de verificação ausente. Reinicie o cadastro.");
        setCurrentStep("email");
        setIsLoading(false);
        return;
      }

      // Skip final hCaptcha check

      const finalSignupData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        termsAccepted: data.termsAccepted,
        verification_proof_token: verificationProofToken,
        hcaptcha_token: null,
      };

      await AuthService.completeSignup(finalSignupData);

      // resetCaptcha();
      // setHCaptchaToken(null);

      notification.success(
        "Cadastro realizado",
        "Sua conta foi criada com sucesso! Você já pode fazer login."
      );
      router.push("/login");

    } catch (error: any) {
      console.error("Erro ao completar cadastro:", error);
      // resetCaptcha();
      // setHCaptchaToken(null);
      const errorMessage = error.response?.data?.detail || "Ocorreu um erro inesperado ao criar sua conta.";

      if (error.response?.status === 409) {
         notification.error("Erro", "Este email já foi registrado.");
         form.setError("email", { type: "manual", message: "Este email já está cadastrado" });
         setCurrentStep("email");
      } else if (error.response?.status === 400) {
         notification.error("Erro de validação", errorMessage);
      } else {
        notification.error("Erro", errorMessage);
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  }
  // --- End Logic for Final Details Submission ---

  // Social Login Handler
  const handleSocialLogin = async (provider: "google" | "discord") => {
    setIsLoading(true); // Start loading for social login too
    try {
      console.log(`Initiating signup with ${provider}`);
      window.location.href = `/api/v1/auth/sso/${provider}`;
    } catch (error: any) {
      console.error(`Erro ao iniciar cadastro com ${provider}:`, error);
      notification.error("Erro", `Não foi possível iniciar cadastro com ${provider}.`);
      setIsLoading(false); // Stop loading only on error
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Criar conta</h1>
        <p className="text-sm text-zinc-400">
          {currentStep === 'email' && "Insira seu email para começar"}
          {currentStep === 'verification' && "Verifique seu email"}
          {currentStep === 'details' && "Complete seus dados"}
        </p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* --- Email Step --- */}
          {currentStep === "email" && (
            <div className="space-y-4">
              <FormInput
                name="email"
                label="Email"
                placeholder="seu@email.com"
                type="email"
                disabled={isLoading}
              />
              {/* hCaptcha commented out */}
              <Button
                type="button"
                onClick={handleEmailSubmit}
                disabled={isLoading} // Disable only when loading
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continuar com Email"}
              </Button>
            </div>
          )}

          {/* --- Verification Step --- */}
          {currentStep === "verification" && (
            <div className="space-y-4">
               <p className="text-sm text-zinc-400">
                  Enviamos um código de verificação para <span className="font-medium text-white">{submittedEmail}</span>. Por favor, insira-o abaixo.
                </p>
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="verificationCode" className="sr-only">Código de Verificação</Label>
                  <VerificationCodeInput
                    onComplete={(code: string) => {
                      form.setValue("verificationCode", code, { shouldValidate: true });
                    }}
                  />
                  {form.formState.errors.verificationCode && (
                     <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.verificationCode.message}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleVerificationSubmit}
                  disabled={isLoading || (form.watch('verificationCode')?.length ?? 0) < 6}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verificar Código"}
                </Button>
            </div>
          )}

          {/* --- Details Step --- */}
          {currentStep === "details" && (
            <div className="space-y-4">
              <FormInput name="email" label="Email" disabled={true} />
              <FormInput name="name" label="Nome completo" placeholder="Seu nome completo" disabled={isLoading} />
              <div className="space-y-1">
                <FormInput
                  name="password"
                  label="Senha"
                  placeholder="Crie uma senha forte"
                  showPasswordToggle
                  disabled={isLoading}
                />
                <PasswordStrengthMeter password={password} />
              </div>
              <FormInput
                name="confirmPassword"
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                showPasswordToggle
                disabled={isLoading}
              />
              {/* hCaptcha commented out */}
              <FormCheckbox
                name="termsAccepted"
                label={
                  <>
                    Eu aceito os{" "}
                    <Link href="/terms" className="text-purple-400 hover:text-purple-300">termos de uso</Link>{" "}
                    e{" "}
                    <Link href="/privacy" className="text-purple-400 hover:text-purple-300">política de privacidade</Link>
                  </>
                }
                disabled={isLoading}
              />
              {/* Use FormSubmitButton which might already handle loading state, or use Button like others */}
              <Button
                 type="submit"
                 disabled={isLoading}
                 className="w-full bg-purple-600 hover:bg-purple-700"
               >
                 {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
               </Button>
              {/* <FormSubmitButton
                isLoading={isLoading}
                disabled={isLoading} // Disable only when loading
                loadingText="Criando conta..."
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Criar conta
              </FormSubmitButton> */}
            </div>
          )}
        </form>
      </FormProvider>

      {/* Show Divider and Social Buttons only on the details step */}
      {currentStep === "details" && (
        <>
          <AuthDivider />
          {/* Pass isLoading to disable social buttons */}
          <SocialAuthButtons
            onGoogleClick={() => handleSocialLogin("google")}
            onDiscordClick={() => handleSocialLogin("discord")}
            isLoading={isLoading}
          />
        </>
      )}

      <p className="text-center text-sm text-zinc-400">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-purple-400 hover:text-purple-300">
          Faça login
        </Link>
      </p>
    </div>
  );
}
