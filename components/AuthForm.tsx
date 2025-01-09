import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FaDiscord, FaGoogle } from "react-icons/fa"

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function AuthForm({ isLogin, onSubmit }: AuthFormProps) {
  return (
    <Card className="w-[350px] bg-black/50 backdrop-blur-md border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-white">{isLogin ? "Login" : "Cadastro"}</CardTitle>
        <CardDescription className="text-zinc-400">
          {isLogin
            ? "Entre na sua conta para continuar"
            : "Crie sua conta para começar jornada"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className="text-zinc-200">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required className="bg-zinc-800 text-white border-purple-500/20" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className="text-zinc-200">Senha</Label>
              <Input id="password" type="password" required className="bg-zinc-800 text-white border-purple-500/20" />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6">
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              {isLogin ? "Entrar" : "Cadastrar"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-zinc-400">Ou continue com</span>
              </div>
            </div>
            <Button variant="outline" type="button" className="w-full bg-zinc-800 text-white border-purple-500/20 hover:bg-purple-600/20">
              <FaDiscord className="mr-2 h-4 w-4" /> Discord
            </Button>
            <Button variant="outline" type="button" className="w-full bg-zinc-800 text-white border-purple-500/20 hover:bg-purple-600/20">
              <FaGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-zinc-400">
          {isLogin ? (
            <>
              Não tem uma conta?{" "}
              <a href="/signup" className="text-purple-400 hover:underline">
                Cadastre-se
              </a>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <a href="/login" className="text-purple-400 hover:underline">
                Faça login
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  )
}

