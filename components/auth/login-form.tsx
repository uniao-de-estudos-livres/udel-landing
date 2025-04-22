"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import { useNotification } from "@/hooks/use-notification"
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth"
import { useAuth } from "@/providers/auth-provider"
import { useCaptcha } from "@/hooks/use-captcha"
import { HCaptchaComponent } from "@/components/ui/h-captcha"
import { mockConfig } from "@/interfaces/mock/config";
import { AuthService } from "@/services/auth-service";
import { AuthDivider } from "@/components/ui/form-components/auth-divider";
import { SocialAuthButtons } from "@/components/ui/form-components/social-auth-buttons";
import { Loader2 } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'; // Default includes /api/v1

// Extend LoginFormData to potentially include hcaptcha_token if needed by backend
interface LoginPayload extends LoginFormData {
    hcaptcha_token?: string | null;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const notification = useNotification()
  const { loginAndRedirect } = useAuth(); // Use the correct function name
  const { captchaRef, executeCaptcha, resetCaptcha } = useCaptcha()
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  })

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // IMPORTANT: Validate event origin for security in production
      // const expectedOrigin = new URL(API_BASE_URL).origin;
      // if (event.origin !== expectedOrigin) return;

      // Expect auth_token from SSO callback now
      if (event.data && event.data.auth_token) {
        console.log("Received tokens via postMessage:", event.data);
        setIsLoading(true);
        try {
          // Pass auth_token to loginAndRedirect
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
  }, [loginAndRedirect, notification, popupWindow]);


  const onHCaptchaVerify = (token: string) => setHCaptchaToken(token);
  const onHCaptchaExpire = () => setHCaptchaToken(null);
  const onHCaptchaError = (err: Error) => {
    setHCaptchaToken(null);
    notification.error("Erro no Captcha", err.message);
  };

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    if (mockConfig.enabled) {
      console.log("[LoginForm] Mock login not supported in this flow.");
      setIsLoading(false);
      return;
    }

    let currentHCaptchaToken = hCaptchaToken;
    // Execute captcha only if not already verified
    if (!currentHCaptchaToken) {
      try {
        const executedToken = await executeCaptcha();
        if (!executedToken) {
            notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.");
            setIsLoading(false);
            return;
        }
        currentHCaptchaToken = executedToken;
        setHCaptchaToken(executedToken); // Store for potential reuse if needed
      } catch (captchaError: any) {
         notification.error("Erro Captcha", captchaError.message || "Falha ao executar verificação.");
         setIsLoading(false);
         return;
      }
    }

     // Ensure token exists before proceeding
     if (!currentHCaptchaToken) {
         notification.error("Erro", "Token Captcha não encontrado para submissão.");
         setIsLoading(false);
         return;
     }

    try {
      // Include hCaptcha token in the payload if required by backend
      const loginPayload: LoginPayload = {
          ...data,
          hcaptcha_token: currentHCaptchaToken
      };

      // Call AuthService.login (alias for signin) with the combined payload
      const response = await AuthService.login(loginPayload);
      resetCaptcha(); // Reset captcha after successful submission attempt
      setHCaptchaToken(null);

      // Check for auth_token in the response
      if (response?.auth_token) {
        // Pass auth_token to loginAndRedirect
        await loginAndRedirect(response.auth_token);
      } else {
        notification.error("Erro de Login", "Resposta inesperada do servidor (token ausente).");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      resetCaptcha(); // Reset captcha on error as well
      setHCaptchaToken(null);
      const errorMessage = error.response?.data?.detail || "Ocorreu um erro ao fazer login. Tente novamente.";
      if (error.response?.status === 401) {
        notification.error("Erro de autenticação", "Email ou senha incorretos");
        form.resetField("password");
      } else if (error.response?.status === 400) {
          if (typeof errorMessage === 'string' && errorMessage.toLowerCase().includes('hcaptcha')) {
              notification.error("Erro de Verificação", "Falha na verificação hCaptcha.");
          } else {
              notification.error("Erro de Validação", errorMessage);
          }
      } else {
        notification.error("Erro", errorMessage);
      }
      setIsLoading(false);
    }
  }

  const handleSocialLogin = (provider: "google" | "discord") => {
    setIsLoading(true);
    // Correctly construct the SSO URL relative to the API base URL
    const ssoPath = `/auth/sso/${provider}`; // Path relative to /api/v1
    // API_BASE_URL should already contain http://host:port/api/v1
    const ssoUrl = `${API_BASE_URL}${ssoPath}`; // Simple concatenation

    console.log("Constructed SSO URL:", ssoUrl); // Log the constructed URL

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
                if (isLoading) { // Check isLoading flag managed by the component
                     console.log(`${provider} popup closed by user before completion.`);
                     setIsLoading(false); // Stop loading if popup closed prematurely
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
        <h1 className="text-2xl font-bold tracking-tight">Entrar</h1>
        <p className="text-sm text-zinc-400">Entre na sua conta para continuar</p>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-white">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" disabled={isLoading} {...form.register("email")} className="bg-zinc-800 border-zinc-700" />
            {form.formState.errors.email && <p className="text-sm font-medium text-red-500">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-white">Senha</Label>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">Esqueceu a senha?</Link>
            </div>
            <Input id="password" type="password" placeholder="Digite sua senha" disabled={isLoading} {...form.register("password")} className="bg-zinc-800 border-zinc-700" />
            {form.formState.errors.password && <p className="text-sm font-medium text-red-500">{form.formState.errors.password.message}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="rememberMe" checked={form.watch("rememberMe")} onCheckedChange={(checked) => form.setValue("rememberMe", checked as boolean)} disabled={isLoading} />
            <Label htmlFor="rememberMe" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white">Lembrar de mim</Label>
          </div>
          {!mockConfig.enabled && (
             <div className="flex justify-center">
               <HCaptchaComponent ref={captchaRef} onVerify={onHCaptchaVerify} onExpire={onHCaptchaExpire} onError={onHCaptchaError} size="normal" />
             </div>
          )}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading || (!mockConfig.enabled && !hCaptchaToken)}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </FormProvider>

      <AuthDivider />

      <SocialAuthButtons
        onGoogleClick={() => handleSocialLogin("google")}
        onDiscordClick={() => handleSocialLogin("discord")}
        isLoading={isLoading}
      />

      <p className="text-center text-sm text-zinc-400">
        Não tem uma conta?{" "}
        <Link href="/signup" className="text-purple-400 hover:text-purple-300">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
