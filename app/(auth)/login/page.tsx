import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/layout/auth-layout"

export const metadata: Metadata = {
  title: "Login",
  description: "Entre na sua conta para continuar",
}

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  )
}
