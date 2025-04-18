import type React from "react"
import { NotificationsProvider } from "@/components/ui/notifications"

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <NotificationsProvider />
      {children}
    </div>
  )
}
