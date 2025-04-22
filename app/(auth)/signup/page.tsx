"use client";

import type { Metadata } from "next"
import { useRouter } from "next/navigation"; // Keep useRouter if needed elsewhere
import { SignupForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/layout/auth-layout"
export default function SignupPage() {
  const router = useRouter(); // Keep for potential future use
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  )
}
