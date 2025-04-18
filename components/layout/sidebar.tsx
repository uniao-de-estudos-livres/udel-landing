"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  BookOpen,
  // GraduationCap,
  // Trophy,
  // Calendar,
  // Settings,
  // BarChart2,
  // User,
  // Heart,
  // MessageSquare,
  // HelpCircle,
  // Store,
} from "lucide-react"
import { Logo } from "@/components/ui/logo"

// Only keep active navigation items
const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Questões", href: "/questions", icon: BookOpen },
]

interface SidebarProps {
  isVisible: boolean;
}

export function Sidebar({ isVisible }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 bg-zinc-900 border-r border-zinc-800 z-50 transition-all duration-300 ease-in-out overflow-hidden",
        isVisible ? "w-16" : "w-0 border-r-0"
      )}
    >
      <div className={cn(
          "flex flex-col items-center py-4 space-y-8 h-full transition-opacity duration-300 ease-in-out",
          isVisible ? "opacity-100" : "opacity-0"
      )}>
        <Link href="/dashboard" className="w-10 h-10 flex-shrink-0" aria-label="Dashboard">
          <Logo variant="white" />
        </Link>

        <nav className="flex-1 space-y-2 w-full">
          {navigation.map((item) => {
            // No need to check for item existence now
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
