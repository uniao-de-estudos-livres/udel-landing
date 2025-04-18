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
    // Allow only digits
    const digit = value.slice(-1).replace(/[^0-9]/g, "")
    if (digit === "") {
        // Handle backspace or non-digit input in the same field
        const newCode = [...code]
        newCode[index] = ""
        setCode(newCode)
        // Optionally move focus back on backspace if field was already empty
        // if (e.key === "Backspace" && index > 0) inputs.current[index - 1]?.focus();
        return;
    }

    const newCode = [...code]
    newCode[index] = digit
    setCode(newCode)

    // Move focus to the next input if value is entered and not the last input
    if (digit !== "" && index < 5) {
      inputs.current[index + 1]?.focus()
    }

    // Check if all inputs are filled
    if (newCode.every((d) => d !== "")) {
      onComplete(newCode.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
        // If backspace is pressed and the current input is empty, move focus to the previous input
        if (code[index] === "" && index > 0) {
            inputs.current[index - 1]?.focus()
        } else {
            // If the current input is not empty, clear it but don't move focus back yet
            // The handleChange will handle clearing if needed, or user can press backspace again
            // This prevents accidentally deleting previous input when clearing current one
        }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 6)
    if (pastedData.length === 6) {
      const newCode = pastedData.split("")
      setCode(newCode)
      onComplete(pastedData)
      inputs.current[5]?.focus() // Focus last input after paste
    }
  }


  return (
    <div className="flex justify-between gap-2">
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text" // Use text to allow single character input and handle non-digits
          inputMode="numeric" // Hint for mobile keyboards
          pattern="[0-9]*" // Pattern for validation (optional)
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined} // Handle paste only on the first input
          ref={(el) => { inputs.current[index] = el; }} // Correct ref assignment type
          className="w-12 h-12 text-center text-2xl font-bold text-white bg-zinc-800 border-purple-500/20 focus:border-purple-500 focus:ring-purple-500 rounded-md" // Added rounded-md
        />
      ))}
    </div>
  )
}
