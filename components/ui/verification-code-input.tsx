"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface VerificationCodeInputProps {
  onComplete: (code: string) => void
}

export function VerificationCodeInput({ onComplete }: VerificationCodeInputProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value !== "" && index < 5) {
      inputs.current[index + 1]?.focus()
    }

    if (newCode.every((digit) => digit !== "")) {
      onComplete(newCode.join(""))
      console.log(newCode)
      console.log()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && code[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex justify-between gap-2">
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputs.current[index] = el)}
          className="w-12 h-12 text-center text-2xl font-bold text-white bg-zinc-800 border-purple-500/20 focus:border-purple-500 focus:ring-purple-500"
        />
      ))}
    </div>
  )
}

