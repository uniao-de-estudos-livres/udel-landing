"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Form } from "@/components/ui/form"
import { useNotification } from "@/components/ui/notifications"
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth"
import { useCaptcha } from "@/hooks/use-captcha"
import { HCaptchaComponent } from "@/components/ui/h-captcha"
import { FormInput } from "@/components/ui/form-components/form-input"
import { FormCheckbox } from "@/components/ui/form-components/form-checkbox"
// Remove FormSubmitButton import if not used
// import { FormSubmitButton } from "@/components/ui/form-components/form-submit-button"
import { FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { VerificationCodeInput } from "@/components/ui/verification-code-input"
import { SocialAuthButtons } from "@/components/ui/form-components/social-auth-buttons"
import { AuthDivider } from "@/components/ui/form-components/auth-divider"
import { PasswordStrengthMeter } from "@/components/ui/form-components/password-strength-meter"
import { AuthService } from "@/services/auth-service";
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import type { SignupCompleteData } from "@/interfaces/auth/signup";
import { useAuth } from "@/providers/auth-provider";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

type SignupStep = "email" | "verification" | "details"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<SignupStep>("email")
  const [submittedEmail, setSubmittedEmail] = useState<string>("")
  const [verificationProofToken, setVerificationProofToken] = useState<string | null>(null);
  const router = useRouter()
  const notification = useNotification()
  const { captchaRef, executeCaptcha, resetCaptcha } = useCaptcha()
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);
  const { loginAndRedirect } = useAuth();

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

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const expectedOrigin = new URL(API_BASE_URL).origin;
      if (event.origin !== expectedOrigin) return;

      // Check for auth_token from SSO callback
      if (event.data && event.data.auth_token) {
        console.log("Received tokens via postMessage:", event.data);
        setIsLoading(true);
        try {
          // Use auth_token for login
          await loginAndRedirect(event.data.auth_token);
          if (popupWindow && !popupWindow.closed) {
            popupWindow.close();
          }
        } catch (error) {
          console.error("Error logging in after SSO callback:", error);
          notification.error("Erro de Login", "Falha ao processar login SSO.");
          setIsLoading(false);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      if (popupWindow && !popupWindow.closed) {
        popupWindow.close();
      }
    };
  }, [loginAndRedirect, notification, popupWindow]); // Added API_BASE_URL dependency

  const onHCaptchaVerify = (token: string) => setHCaptchaToken(token);
  const onHCaptchaExpire = () => setHCaptchaToken(null);
  const onHCaptchaError = (err: Error) => {
    setHCaptchaToken(null);
    notification.error("Erro no Captcha", err.message);
  };

  const handleEmailSubmit = async () => {
    setIsLoading(true);
    const emailIsValid = await form.trigger("email");
    if (!emailIsValid) {
      setIsLoading(false);
      return;
    }
    if (!hCaptchaToken) {
        notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.");
        setIsLoading(false);
        return;
    }

    const emailValue = form.getValues("email");
    setSubmittedEmail(emailValue);

    try {
      await AuthService.submitEmailStep(emailValue, hCaptchaToken);
      resetCaptcha();
      setHCaptchaToken(null);
      setCurrentStep("verification");
    } catch (error: any) {
      // Generic error handling for the email step
      console.error("Error submitting email step:", error);
      resetCaptcha();
      setHCaptchaToken(null);
      const errorMessage = error.response?.data?.detail || "Não foi possível verificar o email. Tente novamente.";
      // Removed specific 409 check for user enumeration prevention
      notification.error("Erro", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async () => {
    setIsLoading(true);
    const codeIsValid = await form.trigger("verificationCode");
    if (!codeIsValid) {
      setIsLoading(false);
      return;
    }

    const codeValue = form.getValues("verificationCode");

    try {
      const response = await AuthService.submitVerificationCode(submittedEmail, codeValue || "");
      const responseData = response.data;

      if (responseData?.data.verification_proof) {
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
      setIsLoading(false);
    }
  };

  async function onSubmit(data: SignupFormData) {
    if (currentStep !== 'details') return;

    setIsLoading(true);
    try {
      if (!verificationProofToken) {
        notification.error("Erro", "Prova de verificação ausente. Reinicie o cadastro.");
        setCurrentStep("email");
        setIsLoading(false);
        return;
      }

      const finalSignupData: SignupCompleteData = {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
        termsAccepted: data.termsAccepted,
        verification_proof_token: verificationProofToken,
        hcaptcha_token: null, // hCaptcha likely not needed again here if verified earlier
      };

      // Expect { auth_token: "..." } in body now
      const response = await AuthService.completeSignup(finalSignupData);

      // Check for auth_token instead of access_token
      if (response?.auth_token) {
          notification.success(
            "Cadastro realizado",
            "Sua conta foi criada com sucesso! Redirecionando..."
          );
          // Call loginAndRedirect with the received auth_token
          await loginAndRedirect(response.auth_token);
          // Redirect is handled inside loginAndRedirect
      } else {
          // This case should ideally not happen if backend always returns token on success
          notification.error("Erro", "Falha ao finalizar cadastro (token ausente).");
          setIsLoading(false); // Stop loading on error
      }

    } catch (error: any) {
      console.error("Erro ao completar cadastro:", error);
      const errorMessage = error.response?.data?.detail || "Ocorreu um erro inesperado ao criar sua conta.";

      // Removed specific 409 check, as backend now sends 400 for existing email
      if (error.response?.status === 400) {
         // Handles validation errors and the generic "Não foi possível completar o cadastro"
         notification.error("Erro de validação", errorMessage);
      } else {
        // Handles other potential errors (500, network issues, etc.)
        notification.error("Erro", errorMessage);
      }
      setIsLoading(false); // Stop loading on error
    }
    // No finally needed if redirect happens on success
  }

  const handleSocialLogin = (provider: "google" | "discord") => {
    setIsLoading(true);
    const ssoPath = `/auth/sso/${provider}`;
    const ssoUrl = `${API_BASE_URL}${ssoPath}`;

    console.log("Constructed SSO URL:", ssoUrl);

    const width = 600, height = 700;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;

    const newPopupWindow = window.open(
      ssoUrl,
      `${provider} Login`,
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (newPopupWindow) {
        setPopupWindow(newPopupWindow);
        const timer = setInterval(() => {
            if (newPopupWindow.closed) {
                clearInterval(timer);
                if (isLoading) {
                     console.log(`${provider} popup closed by user before completion.`);
                     setIsLoading(false);
                } else {
                     console.log(`${provider} popup closed or completed.`);
                }
            }
        }, 500);
    } else {
        notification.error("Erro", `Não foi possível abrir a janela de login do ${provider}. Verifique as configurações do seu navegador.`);
        setIsLoading(false);
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

          {currentStep === "email" && (
            <div className="space-y-4">
              <FormInput name="email" label="Email" placeholder="seu@email.com" type="email" disabled={isLoading} />
              <div className="flex justify-center">
                <HCaptchaComponent ref={captchaRef} onVerify={onHCaptchaVerify} onExpire={onHCaptchaExpire} onError={onHCaptchaError} size="normal" />
              </div>
              <Button type="button" onClick={handleEmailSubmit} disabled={isLoading || !hCaptchaToken} className="w-full bg-purple-600 hover:bg-purple-700">
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Continuar com Email"}
              </Button>
            </div>
          )}

          {currentStep === "verification" && (
            <div className="space-y-4">
               <p className="text-sm text-zinc-400">Enviamos um código de verificação para <span className="font-medium text-white">{submittedEmail}</span>. Por favor, insira-o abaixo.</p>
                <div className="flex flex-col items-center space-y-2">
                  <Label htmlFor="verificationCode" className="sr-only">Código de Verificação</Label>
                  <VerificationCodeInput onComplete={(code: string) => { form.setValue("verificationCode", code, { shouldValidate: true }); }} />
                  {form.formState.errors.verificationCode && <p className="text-sm font-medium text-destructive">{form.formState.errors.verificationCode.message}</p>}
                </div>
                <Button type="button" onClick={handleVerificationSubmit} disabled={isLoading || (form.watch('verificationCode')?.length ?? 0) < 6} className="w-full bg-purple-600 hover:bg-purple-700">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verificar Código"}
                </Button>
            </div>
          )}

          {currentStep === "details" && (
            <div className="space-y-4">
              <FormInput name="email" label="Email" disabled={true} />
              <FormInput name="name" label="Nome completo" placeholder="Seu nome completo" disabled={isLoading} />
              <div className="space-y-1">
                <FormInput name="password" label="Senha" placeholder="Crie uma senha forte" showPasswordToggle disabled={isLoading} />
                <PasswordStrengthMeter password={password} />
              </div>
              <FormInput name="confirmPassword" label="Confirmar senha" placeholder="Confirme sua senha" showPasswordToggle disabled={isLoading} />
              <FormCheckbox name="termsAccepted" label={<>Eu aceito os <Link href="/terms" className="text-purple-400 hover:text-purple-300">termos de uso</Link> e <Link href="/privacy" className="text-purple-400 hover:text-purple-300">política de privacidade</Link></>} disabled={isLoading} />
              <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                 {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Criar conta"}
               </Button>
            </div>
          )}
        </form>
      </FormProvider>

      {currentStep === "details" && (
        <>
          <AuthDivider />
          <SocialAuthButtons onGoogleClick={() => handleSocialLogin("google")} onDiscordClick={() => handleSocialLogin("discord")} isLoading={isLoading} />
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
