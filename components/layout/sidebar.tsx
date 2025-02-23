"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, GraduationCap, BookOpen, Trophy, Calendar, Settings, BarChart2 } from "lucide-react"
import { Logo } from "@/components/ui/logo"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Estudos", href: "/studies", icon: GraduationCap },
  { name: "Questões", href: "/questions", icon: BookOpen },
  { name: "Conquistas", href: "/achievements", icon: Trophy },
  { name: "Eventos", href: "/events", icon: Calendar },
  { name: "Estatísticas", href: "/statistics", icon: BarChart2 },
  { name: "Configurações", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 w-16 bg-zinc-900 border-r border-purple-500/20">
      <div className="flex flex-col items-center py-4 space-y-8">
        <Link href="/dashboard" className="w-10 h-10">
          <Logo variant="white" />
        </Link>

        <nav className="flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-lg mx-auto transition-colors relative group",
                  isActive ? "bg-purple-500 text-white" : "text-zinc-400 hover:text-purple-400 hover:bg-purple-500/10",
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
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

