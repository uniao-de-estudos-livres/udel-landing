"use client"

import React from "react"
import Image from "next/image"
import Icon from "../../static/udel-white.svg"
import { AuthForm } from "@/components/AuthForm"

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Cadastro submetido")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center">
          <AuthForm isLogin={true} onSubmit={handleSubmit} />
        </div>
        <div className="flex-1 bg-purple-900 flex items-center justify-center relative overflow-hidden inset-0 bg-gradient-to-b from-purple-900/30 to-black pointer-events-none">
          <Image src={Icon} alt="Custom Icon" className="relative z-10" width="400" height="400" />
        </div>
      </div>
    </div>
  )
}

