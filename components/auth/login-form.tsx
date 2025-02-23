"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FaSpinner, FaCheckCircle, FaDiscord, FaGoogle } from "react-icons/fa"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/ui/logo"
import { useNotification } from "@/components/ui/notifications"
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const notification = useNotification()

  // Configura o react-hook-form com o schema de login
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Função de envio do formulário
  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      console.log("Dados do login:", data)

      // Simulando chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      notification.success("Login realizado!", "Bem-vindo de volta!")

      // Redireciona após um breve intervalo
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error) {
      notification.error("Erro", "Não foi possível fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função de login social
  const handleSocialLogin = async (provider: "discord" | "google") => {
    try {
      setIsLoading(true)
      console.log(`Login com ${provider}`)

      // Simulando chamada à API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      notification.success("Login realizado!", `Login com ${provider} realizado com sucesso!`)
      router.push("/dashboard")
    } catch (error) {
      notification.error("Erro", `Não foi possível fazer login com ${provider}. Tente novamente.`)
    } finally {
      setIsLoading(false)
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
        {/* Seção do formulário */}
        <Card className="flex-1 bg-black/40 backdrop-blur-xl border-purple-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
          </div>
          <CardHeader className="relative space-y-4 pb-8">
            <CardTitle className="text-3xl font-bold text-center text-white">Entrar</CardTitle>
            <CardDescription className="text-center text-zinc-400 text-lg">
              Entre na sua conta para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="relative pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-zinc-200 text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className={`h-12 bg-zinc-800/50 text-white border-purple-500/20 
                      backdrop-blur-sm focus:ring-purple-500/50 transition-all duration-200 ${errors.email ? "border-red-500 focus:ring-red-500/50" : "hover:border-purple-500/40"
                      }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password" className="text-zinc-200 text-sm font-medium">
                      Senha
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Esqueceu a senha?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Digite sua senha"
                    className={`h-12 bg-zinc-800/50 text-white border-purple-500/20 
                      backdrop-blur-sm focus:ring-purple-500/50 transition-all duration-200 ${errors.password ? "border-red-500 focus:ring-red-500/50" : "hover:border-purple-500/40"
                      }`}
                    {...register("password")}
                  />
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <Button
                  type="submit"
                  className={`w-full h-12 text-base font-medium transition-all duration-300 ${isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-purple-600 hover:bg-purple-700"
                    }`}
                  disabled={isLoading || isSuccess}
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? <FaSpinner className="animate-spin" /> : isSuccess ? <FaCheckCircle /> : null}
                    <span>{isLoading ? "Carregando..." : "Entrar"}</span>
                  </div>
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase font-medium">
                    <span className="bg-black px-6 text-zinc-500">Ou continue com</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-12 bg-zinc-800/50 text-white border-purple-500/20 
                      hover:bg-purple-600/20 backdrop-blur-sm transition-all duration-200"
                    onClick={() => handleSocialLogin("discord")}
                    disabled={isLoading}
                  >
                    <FaDiscord className="mr-2 h-5 w-5" /> Discord
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-12 bg-zinc-800/50 text-white border-purple-500/20 
                      hover:bg-purple-600/20 backdrop-blur-sm transition-all duration-200"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading}
                  >
                    <FaGoogle className="mr-2 h-5 w-5" /> Google
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="relative flex justify-center pb-8 pt-2">
            <p className="text-center text-sm text-zinc-400">
              Ou crie uma nova conta{" "}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300">
                aqui
              </Link>
            </p>
          </CardFooter>
        </Card>

        {/* Seção de logo e informações */}
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
                Bem-vindo de volta!
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Entre para continuar sua jornada e acompanhar seu progresso.
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}