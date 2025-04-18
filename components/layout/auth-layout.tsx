import type React from "react"
import { Logo } from "@/components/ui/logo"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="grid w-full max-w-[1200px] grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex items-center justify-center">{children}</div>
        <div className="hidden lg:flex flex-col items-center justify-center">
          <div className="relative aspect-square w-64">
            <Logo variant="white" />
            <div className="absolute -right-4 -top-4 h-8 w-8 rotate-12">
              <svg
                className="h-full w-full text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <h2 className="mt-8 text-2xl font-bold text-white">Bem-vindo de volta!</h2>
          <p className="mt-2 text-center text-zinc-400">
            Entre para continuar sua jornada e acompanhar
            <br />
            seu progresso.
          </p>
        </div>
      </div>
    </div>
  )
}
