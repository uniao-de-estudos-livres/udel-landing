"use client"

import { useState, useEffect } from "react"
import { FaArrowRight, FaCheckCircle, FaDiscord } from "react-icons/fa"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"
import { useNotification } from "@/components/ui/notifications"
import { VerificationCodeInput } from "@/components/ui/verification-code-input"
import { SocialButton } from "./social-button"

const steps = ["Informe seu melhor email!", "Enviamos um código de verificação no seu email, informe abaixo", "Completar Cadastro"]

export function SignupWizard() {
  const [step, setStep] = useState(0)
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [nickname, setNickname] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const notification = useNotification()

  useEffect(() => {
    // Resetar estados quando o step muda (ou ao iniciar)
    setVerificationCode("")
    setNickname("")
    setPassword("")
    setConfirmPassword("")
  }, [])

  const handleNextStep = () => {
    if (step < 2) {
      setStep(step + 1)
      notification.success("Próximo passo", `Avançando para ${steps[step + 1]}`)
    } else {
      setIsSuccess(true)
      notification.success("Conta criada", "Sua conta foi criada com sucesso!")
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    }
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleNextStep} className="w-full">
              <FaArrowRight className="mr-2" />
              Próximo
            </Button>
            {/* Divider com "OU LOGUE COM" */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-500">OU LOGUE COM</span>
              </div>
            </div>
            {/* Botões de login social */}
            <div className="grid gap-2">
              <SocialButton
                icon={FaDiscord}
                onClick={() => {
                  // Lógica de login social com Discord
                  notification.success("Social", "Login com Discord iniciado")
                }}
                isLoading={false}
              >
                Discord
              </SocialButton>
              <SocialButton
                icon={() => (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                onClick={() => {
                  // Lógica de login social com Google
                  notification.success("Social", "Login com Google iniciado")
                }}
                isLoading={false}
              >
                Google
              </SocialButton>
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de Verificação</Label>
              <VerificationCodeInput onComplete={setVerificationCode} />
            </div>
            <Button onClick={handleNextStep} className="w-full" disabled={verificationCode.length !== 6}>
              <FaArrowRight className="mr-2" />
              Verificar
            </Button>
          </div>
        )
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
        )
    }
  }

  return (
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
          <CardHeader className="relative space-y-4 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-white">
              Criar conta
            </CardTitle>
            <CardDescription className="text-center text-zinc-400 text-lg">
              {steps[step]}
            </CardDescription>
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

        {/* Logo and Info Section */}
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
  )
}