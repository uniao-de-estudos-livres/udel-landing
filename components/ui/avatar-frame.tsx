"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AvatarFrameProps {
  children: React.ReactNode
  variant?: "gold" | "silver" | "bronze" | "default"
  className?: string
}

const frameStyles = {
  gold: "border-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]",
  silver: "border-4 border-zinc-400 shadow-[0_0_15px_rgba(161,161,170,0.5)]",
  bronze: "border-4 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]",
  default: "border-4 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]",
}

export function AvatarFrame({ children, variant = "default", className }: AvatarFrameProps) {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      className={cn("rounded-full relative", frameStyles[variant], className)}
    >
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full opacity-50 blur-sm"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      {children}
    </motion.div>
  )
}
