"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle, Info, X, AlertTriangle } from "lucide-react"
import { useNotificationStore, type NotificationType } from "@/stores/notification-store"

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-400" />,
  error: <AlertCircle className="h-5 w-5 text-red-400" />,
  info: <Info className="h-5 w-5 text-blue-400" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
}

const notificationStyles: Record<NotificationType, string> = {
  success: "border-green-500/20 bg-green-500/10",
  error: "border-red-500/20 bg-red-500/10",
  info: "border-blue-500/20 bg-blue-500/10",
  warning: "border-yellow-500/20 bg-yellow-500/10",
}

export function NotificationsProvider() {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div className="fixed top-4 left-20 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className={`w-80 rounded-lg border ${notificationStyles[notification.type]} p-4 shadow-lg`}
          >
            <div className="flex items-start gap-3">
              {notificationIcons[notification.type]}
              <div className="flex-1">
                <h3 className="font-medium text-white">{notification.title}</h3>
                <p className="text-sm text-zinc-400">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function useNotification() {
  const { addNotification } = useNotificationStore()

  const show = (type: NotificationType, title: string, message: string) => {
    addNotification({ type, title, message })
  }

  return {
    success: (title: string, message: string) => show("success", title, message),
    error: (title: string, message: string) => show("error", title, message),
    info: (title: string, message: string) => show("info", title, message),
    warning: (title: string, message: string) => show("warning", title, message),
  }
}

