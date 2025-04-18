import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Painel de controle do usuário",
}

export default function DashboardPage() {
  return <DashboardContent />
}
