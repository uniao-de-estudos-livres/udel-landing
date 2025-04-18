"use client"

import { useRef, useState } from "react"
import type { HCaptchaRef } from "@/components/ui/h-captcha"

export function useCaptcha() {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const captchaRef = useRef<HCaptchaRef>(null)

  const handleCaptchaVerify = (token: string) => {
    setCaptchaToken(token)
  }

  const handleCaptchaExpire = () => {
    setCaptchaToken(null)
  }

  const handleCaptchaError = (error: Error) => {
    console.error("hCaptcha error:", error)
    setCaptchaToken(null)
  }

  const executeCaptcha = async (): Promise<string | null> => {
    if (captchaToken) return captchaToken

    if (captchaRef.current) {
      try {
        const token = await captchaRef.current.execute()
        if (token) {
          setCaptchaToken(token)
          return token
        }
      } catch (error) {
        console.error("Error executing captcha:", error)
      }
    } else {
      console.warn("Captcha reference is not available")
    }

    return null
  }

  const resetCaptcha = () => {
    if (captchaRef.current) {
      try {
        captchaRef.current.reset()
        setCaptchaToken(null)
      } catch (error) {
        console.error("Error resetting captcha:", error)
      }
    }
  }

  return {
    captchaToken,
    captchaRef,
    handleCaptchaVerify,
    handleCaptchaExpire,
    handleCaptchaError,
    executeCaptcha,
    resetCaptcha,
  }
}
