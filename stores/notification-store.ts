import { create } from "zustand"

export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  duration?: number
}

interface NotificationStore {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id">) => void
  removeNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => {
      const id = Math.random().toString(36).substr(2, 9)
      const newNotification = { ...notification, id }

      // Automatically remove the notification after 1 second
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      }, 1000)

      return {
        notifications: [...state.notifications, newNotification],
      }
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((notification) => notification.id !== id),
    })),
}))

