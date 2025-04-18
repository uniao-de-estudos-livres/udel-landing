import { ResetPasswordForm } from "@/components/auth/reset-password-form"
import { AuthLayout } from "@/components/layout/auth-layout"

interface ResetPasswordPageProps {
  params: {
    token: string
  }
}

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  return (
    <AuthLayout>
      <ResetPasswordForm token={params.token} />
    </AuthLayout>
  )
}
