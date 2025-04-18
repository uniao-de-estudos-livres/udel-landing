"use client"

import type React from "react"
import { useState, useEffect } from "react" // Import useEffect
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
import { mockConfig } from "@/lib/mock-auth-service"
import { AuthService } from "@/services/auth-service";
import { AuthDivider } from "@/components/ui/form-components/auth-divider";
import { SocialAuthButtons } from "@/components/ui/form-components/social-auth-buttons";
import { Loader2 } from "lucide-react"; // Import Loader2 icon

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const notification = useNotification()
  const { login } = useAuth()
  const { captchaRef, executeCaptcha, resetCaptcha } = useCaptcha()
  const [hCaptchaToken, setHCaptchaToken] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  })

  const onHCaptchaVerify = (token: string) => setHCaptchaToken(token);
  const onHCaptchaExpire = () => setHCaptchaToken(null);
  const onHCaptchaError = (err: Error) => {
    setHCaptchaToken(null);
    notification.error("Erro no Captcha", err.message);
  };

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    if (mockConfig.enabled) {
      // ... (mock logic) ...
      console.log("[LoginForm] Using mock authentication");
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        notification.success("Login simulado", "Login realizado com sucesso (modo de desenvolvimento)!");
        router.push(callbackUrl);
      } catch (error) {
         notification.error("Erro Mock", "Falha no login simulado.");
      } finally {
         setIsLoading(false);
      }
      return;
    }

    // Real Login Flow
    let currentHCaptchaToken = hCaptchaToken;
    if (!currentHCaptchaToken) {
      try {
        const executedToken = await executeCaptcha();
        if (!executedToken) {
            notification.error("Verificação necessária", "Por favor, complete a verificação de segurança.");
            setIsLoading(false);
            return;
        }
        currentHCaptchaToken = executedToken;
        setHCaptchaToken(executedToken);
      } catch (captchaError: any) {
         notification.error("Erro Captcha", captchaError.message || "Falha ao executar verificação.");
         setIsLoading(false);
         return;
      }
    }

     if (!currentHCaptchaToken) {
         notification.error("Erro", "Token Captcha não encontrado para submissão.");
         setIsLoading(false);
         return;
     }

    try {
      const response = await AuthService.login(data, currentHCaptchaToken);

      resetCaptcha();
      setHCaptchaToken(null);

      if (response?.access_token) {
        await login(
            data.email,
            "",
            data.rememberMe,
            undefined,
            response.access_token
        );

        // Notification and redirect are now handled within the login function of AuthProvider
        // notification.success("Login realizado", "Login bem-sucedido!");
        // router.push(callbackUrl);
      } else {
        notification.error("Erro de Login", "Resposta inesperada do servidor (token ausente).");
      }

    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      resetCaptcha();
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
    } finally {
      setIsLoading(false);
    }
  }

  // Social Login Handler
  const handleSocialLogin = async (provider: "google" | "discord") => {
    // Add loading state for social login too
    setIsLoading(true);
    try {
      console.log(`Initiating login with ${provider}`);
      window.location.href = `/api/v1/auth/sso/${provider}`;
    } catch (error: any) {
      console.error(`Erro ao iniciar login com ${provider}:`, error);
      notification.error("Erro", `Não foi possível iniciar login com ${provider}.`);
      setIsLoading(false); // Reset loading only on error for social login
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
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              disabled={isLoading}
              {...form.register("email")}
              className="bg-zinc-800 border-zinc-700"
            />
            {form.formState.errors.email && (
              <p className="text-sm font-medium text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-white">
                Senha
              </Label>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              disabled={isLoading}
              {...form.register("password")}
              className="bg-zinc-800 border-zinc-700"
            />
            {form.formState.errors.password && (
              <p className="text-sm font-medium text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={form.watch("rememberMe")}
              onCheckedChange={(checked) => form.setValue("rememberMe", checked as boolean)}
              disabled={isLoading}
            />
            <Label
              htmlFor="rememberMe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
            >
              Lembrar de mim
            </Label>
          </div>

          {/* hCaptcha - Rendered for non-mock login */}
          {!mockConfig.enabled && (
             <div className="flex justify-center">
               <HCaptchaComponent
                 ref={captchaRef}
                 onVerify={onHCaptchaVerify}
                 onExpire={onHCaptchaExpire}
                 onError={onHCaptchaError}
                 size="normal"
               />
             </div>
          )}

          {/* Submit Button with Loading State */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={isLoading || (!mockConfig.enabled && !hCaptchaToken)}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar"}
          </Button>
        </form>
      </FormProvider>

      <AuthDivider />

      {/* Pass isLoading to disable social buttons during any loading state */}
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
