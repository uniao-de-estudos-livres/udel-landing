"use client"

import { useNotificationStore } from "@/stores/notification-store"

export function useNotification() {
  const { addNotification } = useNotificationStore()

  const show = (type: "success" | "error" | "info" | "warning", title: string, message: string) => {
    addNotification({ type, title, message })
  }

  return {
    success: (title: string, message: string) => show("success", title, message),
    error: (title: string, message: string) => show("error", title, message),
    info: (title: string, message: string) => show("info", title, message),
    warning: (title: string, message: string) => show("warning", title, message),
  }
}
