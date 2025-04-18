"use client"

import { forwardRef, useRef, useImperativeHandle } from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"

export interface HCaptchaRef {
  execute: () => Promise<string | undefined>
  reset: () => void
}

interface HCaptchaProps {
  sitekey?: string
  onVerify?: (token: string) => void
  onExpire?: () => void
  onError?: (error: Error) => void
  size?: "normal" | "compact" | "invisible"
  theme?: "light" | "dark"
  className?: string
}

export const HCaptchaComponent = forwardRef<HCaptchaRef, HCaptchaProps>(
  (
    {
      sitekey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "10000000-ffff-ffff-ffff-000000000001",
      onVerify,
      onExpire,
      onError,
      size = "normal",
      theme = "dark",
      className,
    },
    ref,
  ) => {
    const captchaRef = useRef<HCaptcha>(null)

    useImperativeHandle(ref, () => ({
      execute: async () => {
        try {
          if (captchaRef.current) {
            try {
              const token = await captchaRef.current.execute({ async: true })
              return token
            } catch (err) {
              console.error("Error executing hCaptcha:", err)
              return undefined
            }
          }
        } catch (error) {
          console.error("hCaptcha execution error:", error)
          if (onError && error instanceof Error) {
            onError(error)
          }
        }
        return undefined
      },
      reset: () => {
        if (captchaRef.current) {
          try {
            captchaRef.current.resetCaptcha()
          } catch (err) {
            console.error("Error resetting hCaptcha:", err)
          }
        }
      },
    }))

    return (
      <div className={`flex justify-center my-4 ${className || ""}`}>
        <HCaptcha
          ref={captchaRef}
          sitekey={sitekey}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
          size={size}
          theme={theme}
        />
      </div>
    )
  },
)

HCaptchaComponent.displayName = "HCaptcha"
