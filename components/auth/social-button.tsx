import type { ButtonHTMLAttributes } from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type React from "react"

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType | (() => JSX.Element)
  isLoading?: boolean
}

export function SocialButton({ icon: Icon, children, className, isLoading, ...props }: SocialButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/50 px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : typeof Icon === "function" ? (
        <Icon />
      ) : (
        <Icon className="h-4 w-4" />
      )}
      {children}
    </button>
  )
}

