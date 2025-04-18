"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  GraduationCap,
  BookOpen,
  Trophy,
  Calendar,
  Settings,
  BarChart2,
  User,
  Heart,
  MessageSquare,
  HelpCircle,
  Store,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

// Comment out unused navigation items
const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  // { name: "Estudos", href: "/studies", icon: GraduationCap },
  { name: "Questões", href: "/questions", icon: BookOpen },
  // { name: "Conquistas", href: "/achievements", icon: Trophy },
  // { name: "Eventos", href: "/events", icon: Calendar },
  // { name: "Estatísticas", href: "/statistics", icon: BarChart2 },
  // { name: "Perfil", href: "/profile", icon: User },
  // { name: "Loja", href: "/store", icon: Store },
  // { name: "Doações", href: "/donations", icon: Heart },
  // { name: "Comunidade", href: "/community", icon: MessageSquare },
  // { name: "Ajuda", href: "/help", icon: HelpCircle },
  // { name: "Configurações", href: "/settings", icon: Settings },
]

// Add isVisible prop
interface SidebarProps {
  isVisible: boolean;
}

export function Sidebar({ isVisible }: SidebarProps) {
  const pathname = usePathname()

  return (
    // Apply transition classes and conditional width/opacity/transform
    <div
      className={cn(
        "fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 z-50 transition-all duration-300 ease-in-out overflow-hidden",
        isVisible ? "w-16" : "w-0 border-r-0" // Animate width and border
      )}
    >
      {/* Add opacity transition to content, match duration with width transition */}
      <div className={cn(
          "flex flex-col items-center py-4 space-y-8 h-full transition-opacity duration-300 ease-in-out", // Changed duration to 300ms
          isVisible ? "opacity-100" : "opacity-0"
      )}>
        <Link href="/dashboard" className="w-10 h-10 flex-shrink-0">
          <Logo variant="white" />
        </Link>

        {/* Removed overflow-y-auto */}
        <nav className="flex-1 space-y-2 w-full">
          {navigation.map((item) => {
            if (!item) return null;
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-md mx-auto transition-colors relative group",
                  isActive ? "bg-purple-600 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800",
                )}
                title={item.name}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
