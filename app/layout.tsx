import type React from "react"
import { NotificationsProvider } from "@/components/ui/notifications"
import { Metadata } from "next";
import "./globals.css"

export const metadata: Metadata = {
  title: "Udel - uma nova forma de estudar",
  description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
  icons: [
    {
      url: "../static/udel-white.svg"
    }
  ],
  twitter: {
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    creator: "@astahjmo",
    images: ["../static/Udel_Banner.png"],
    card: "summary_large_image"
  },
  openGraph: {
    type: "website",
    url: "https://udel.study",
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    images: [
      "../static/Udel_Banner.png"
    ],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-white">
        <NotificationsProvider />
        {children}
      </body>
    </html>
  )
}



import './globals.css'