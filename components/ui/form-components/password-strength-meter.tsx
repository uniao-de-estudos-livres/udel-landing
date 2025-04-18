"use client"

import { Check } from "lucide-react"

interface PasswordStrengthMeterProps {
  password: string
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const isLongEnough = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password)

  const passwordStrength = [isLongEnough, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Fraca"
    if (passwordStrength <= 4) return "Média"
    return "Forte"
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "text-red-500"
    if (passwordStrength <= 4) return "text-yellow-500"
    return "text-green-500"
  }

  if (!password) return null

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-zinc-400">Força da senha:</span>
        <span className={`text-xs font-medium ${getPasswordStrengthColor()}`}>{getPasswordStrengthText()}</span>
      </div>
      <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            passwordStrength <= 2 ? "bg-red-500" : passwordStrength <= 4 ? "bg-yellow-500" : "bg-green-500"
          }`}
          style={{ width: `${(passwordStrength / 5) * 100}%` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <div className="flex items-center gap-1 text-xs">
          <div
            className={`w-3 h-3 rounded-full flex items-center justify-center ${isLongEnough ? "bg-green-500" : "bg-zinc-700"}`}
          >
            {isLongEnough && <Check className="w-2 h-2 text-white" />}
          </div>
          <span className="text-zinc-400">8+ caracteres</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div
            className={`w-3 h-3 rounded-full flex items-center justify-center ${hasUppercase ? "bg-green-500" : "bg-zinc-700"}`}
          >
            {hasUppercase && <Check className="w-2 h-2 text-white" />}
          </div>
          <span className="text-zinc-400">Letra maiúscula</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div
            className={`w-3 h-3 rounded-full flex items-center justify-center ${hasLowercase ? "bg-green-500" : "bg-zinc-700"}`}
          >
            {hasLowercase && <Check className="w-2 h-2 text-white" />}
          </div>
          <span className="text-zinc-400">Letra minúscula</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div
            className={`w-3 h-3 rounded-full flex items-center justify-center ${hasNumber ? "bg-green-500" : "bg-zinc-700"}`}
          >
            {hasNumber && <Check className="w-2 h-2 text-white" />}
          </div>
          <span className="text-zinc-400">Número</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <div
            className={`w-3 h-3 rounded-full flex items-center justify-center ${hasSpecialChar ? "bg-green-500" : "bg-zinc-700"}`}
          >
            {hasSpecialChar && <Check className="w-2 h-2 text-white" />}
          </div>
          <span className="text-zinc-400">Caractere especial</span>
        </div>
      </div>
    </div>
  )
}
