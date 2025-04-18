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
  // Restore explicit icons definition, pointing to the file in the app directory
  icons: [
    {
      rel: 'icon',
      url: "/icon.svg", // Next.js serves files from app dir at root
      type: 'image/svg+xml'
    },
    // Add other common icon links if needed (assuming files exist in /public or /app)
    // { rel: 'apple-touch-icon', url: '/apple-icon.png' },
    // { rel: 'shortcut icon', url: '/favicon.ico' },
  ],
  twitter: {
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    creator: "@astahjmo",
    // Image path relative to public folder (resolved against metadataBase)
    images: ["/static/udel_-_natal.png"],
    card: "summary_large_image"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Udel - uma nova forma de estudar",
    description: "Transforme seus estudos em uma jornada emocionante! Nosso site combina aprendizado e gamificação, oferecendo desafios interativos, conquistas e recompensas para tornar o estudo mais motivador e eficiente. Explore conteúdos, suba de nível e domine novos conhecimentos de forma divertida!",
    images: [
      {
        // Image path relative to public folder (resolved against metadataBase)
        url: "/static/udel_-_natal.png",
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
