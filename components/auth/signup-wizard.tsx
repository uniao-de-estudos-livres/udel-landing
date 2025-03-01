"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowRight, FaArrowLeft, FaCheckCircle, FaDiscord, FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { useForm, FormProvider } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { VerificationCodeInput } from "@/components/ui/verification-code-input";
import { SocialButton } from "./social-button";
import { useNotification } from "@/components/ui/notifications";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import axiosInstance from "@/lib/axios";
import { EmailStep } from "./signup-wizard/email-step";
import { IWizardEmail } from "@/lib/interfaces/auth/wizard";
import { z } from "zod";
import { WizardSignupData, WizardSignupSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

export function SignupWizard() {
  // Estados do componente
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [code, setVerificationCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaSize, setCaptchaSize] = useState<"invisible" | "normal" | "compact">("invisible");
  const [isSuccess, setIsSuccess] = useState(false);

  // Hooks de navegação e notificações
  const router = useRouter();
  const notification = useNotification();

  // Refs para o captcha e para armazenar o provider
  const captchaRef = useRef<HCaptcha>(null);
  const providerRef = useRef<string>("");

  // Mensagens de cada etapa
  const steps = [
    "Informe seu melhor email!",
    `Enviamos um código de verificação no seu email ${email}, informe abaixo`,
    "Completar Cadastro"
  ];


  const handleSSOMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== window.location.origin) {
      console.warn("Origem não confiável:", event.origin);
      return;
    }

    if (event.data) {
      notification.success("Login em progresso!", "Você será redirecionado diretamente para o dashboard!");
      axiosInstance.post(`/v1/auth/sso/${providerRef.current}`, event.data, {withCredentials: true})
        .catch(() => notification.error("Erro", "Ocorreu um erro, tente novamente mais tarde"));
    } else {
      notification.error("Erro", "Token não recebido.");
    }
    window.removeEventListener("message", handleSSOMessage);
  }, [notification]);


  const handleNextStep = useCallback(async () => {
    if (step === 0) {
      if (!token) {
        notification.error("Erro !!", "Você precisa concluir o captcha com sucesso!");
        return;
      }
      try {
        const response = await axiosInstance.post("/v1/auth/signin/email", { email, token });
        if (response.status === 200) {
          notification.success("Código enviado", "Verifique seu email para o código de verificação!");
          setStep(1);
        } else {
          notification.error("Erro", "Não foi possível enviar o código de verificação.");
        }
      } catch (error) {
        console.error("Erro na request:", error);
        notification.error("Erro", "Erro ao enviar o código de verificação.");
      }
    } else if (step === 1) {
      try {
        const response = await axiosInstance.post("/v1/auth/signin/code", { email, token, code });
        if (response.status === 200) {
          setStep(2);
        } else {
          notification.error("Erro", "Não foi possível validar seu código de verificação.");
        }
      } catch (error) {
        console.error("Erro na request:", error);
        notification.error("Erro", "Erro ao enviar o código de verificação.");
      }
    } else {
      setIsSuccess(true);
      notification.success("Conta criada", "Sua conta foi criada com sucesso!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    }
  }, [step, email, token, code, router, notification]);

  const handlePreviousStep = useCallback(() => {
    if (step > 0) {
      setStep(prev => prev - 1);
      notification.success("Passo anterior", `Voltando para ${steps[step - 1]}`);
    }
  }, [step, steps, notification]);

  const methods = useForm<WizardSignupSchema>({
    resolver: zodResolver(WizardSignupData),
    defaultValues: {
      email: "",
      token: "",
    },
  });

  const renderStep = useCallback(() => {
    console.log(step)
    switch (step) {
      case 0:
        return(
          <EmailStep
          email={email}
          setEmail={setEmail}
          setToken={setToken}
          captchaSize={captchaSize}
          setCaptchaSize={setCaptchaSize}
          setStep={setStep}
          />
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <VerificationCodeInput onComplete={((code ) =>{
                setVerificationCode(code)
              } )} />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleNextStep} className="w-full" disabled={code.length !== 6}>
                <FaArrowRight className="mr-2" />
                Verificar
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Seu nickname"
                className="text-white"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte"
                className="text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                className="text-white"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <Button onClick={handleNextStep} className="w-full" disabled={isSuccess}>
                {isSuccess ? (
                  <>
                    <FaCheckCircle className="mr-2" />
                    Conta Criada!
                  </>
                ) : (
                  <>
                    <FaArrowRight className="mr-2" />
                    Criar Conta
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [step, code]);

  return (
  <FormProvider {...methods}>
    <div className="flex min-h-screen items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container flex max-w-[1200px] items-center gap-12 px-8"
      >
        <Card className="flex-1 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>
          <CardHeader className="space-y-4 pb-8">
            <CardTitle className="text-3xl relative justify-center w-full flex font-bold text-white">
                  <button
                    onClick={handlePreviousStep}
                      className="p-2 pl-0 absolute left-0 text-white hover:text-gray-300 focus:outline-none"
                    aria-label="Voltar"
                  >
                    <FaArrowLeft size={20} />
                  </button>
              Criar conta
            </CardTitle>
            <div className="text-center text-zinc-400 text-lg">
              {steps[step]}
              {step > 0 && (
                <div className="absolute top-0 left-0 z-10 w-full p-4 flex">
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="relative pb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
              {renderStep()}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          <CardFooter className="relative flex justify-center pb-8 pt-2">
            <p className="text-sm text-zinc-400">
              Já tem uma conta?{" "}
              <a
                href="/login"
                className="text-purple-400 hover:text-purple-300 hover:underline transition-colors font-medium"
              >
                Faça login
              </a>
            </p>
          </CardFooter>
        </Card>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 hidden lg:block"
        >
          <div className="flex flex-col items-center space-y-6">
            <div className="w-64 h-64">
              <Logo variant="white" />
            </div>
          </div>
          <Card className="bg-black/20 border-purple-500/20 backdrop-blur-sm p-8 w-full rounded-xl relative overflow-hidden group hover:bg-black/30 transition-colors duration-300">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
            </div>
            <div className="relative">
              <h2 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Junte-se a nós!
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Crie uma conta e comece sua nova jornada de aprendizado hoje mesmo!
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
    </FormProvider>
  );
}