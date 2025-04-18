import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { NotificationsProvider } from "@/components/ui/notifications"
import { AuthProvider } from "@/providers/auth-provider"
import { ThemeProvider } from "@/providers/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://udel.study";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Udel - uma nova forma de estudar",
    template: "%s | Udel",
  },
  description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
  icons: [
    {
      rel: 'icon',
      url: "/icon.svg", // Assumes icon.svg is in /app directory
      type: 'image/svg+xml'
    },
  ],
  twitter: {
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    creator: "@astahjmo",
    images: ["/static/udel_-_natal.png"], // Assumes image is in /public/static
    card: "summary_large_image"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    images: [
      {
        url: "/static/udel_-_natal.png", // Assumes image is in /public/static
      }
    ],
  },
};


export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} bg-black text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <NotificationsProvider />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
