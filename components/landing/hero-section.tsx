"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/ui/logo"
import { DiscordRedirectDialog } from "@/components/ui/discord-redirect-dialog"
import { FeatureDevelopmentDialog } from "@/components/ui/feature-development-dialog"
import { useNotification } from "@/hooks/use-notification"

export function HeroSection() {
  const [isDiscordDialogOpen, setIsDiscordDialogOpen] = useState(false)
  const [isFeatureDialogOpen, setIsFeatureDialogOpen] = useState(false)
  const router = useRouter();
  const notification = useNotification()
  const discordUrl = "https://discord.gg/NUtQEtuW"

  const handleDiscordRedirect = () => {
    window.open(discordUrl, "_blank")
    setIsDiscordDialogOpen(false)
  }

  const handleStartNowClick = () => {
    setIsFeatureDialogOpen(true);
    setIsFeatureDialogOpen(true);
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden py-20 text-white bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-6">
              Udel: Unindo
              <span className="text-purple-400"> Desenvolvimento e Evolução na Aprendizagem</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 mb-8">
              Transforme sua jornada educacional com uma plataforma que combina colaboração, gamificação e inovação para
              um aprendizado mais eficiente e envolvente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]"
                onClick={handleStartNowClick}
              >
                Começar Agora <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsDiscordDialogOpen(true)}
                className="w-full sm:w-auto border border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 transition-all"
              >
                Conhecer Mais (Comunidade Discord)
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-[200px] sm:max-w-[300px] lg:max-w-[400px] animate-pulse">
              <Logo variant="white" />
            </div>
          </motion.div>
        </div>
      </div>

      <DiscordRedirectDialog
        isOpen={isDiscordDialogOpen}
        onOpenChange={setIsDiscordDialogOpen}
        onConfirm={handleDiscordRedirect}
        discordUrl={discordUrl} // Pass updated URL
      />

      <FeatureDevelopmentDialog
        isOpen={isFeatureDialogOpen}
        onOpenChange={setIsFeatureDialogOpen}
        onClose={() => setIsFeatureDialogOpen(false)}
        featureName="O cadastro e login de usuários"
      />
    </section>
  )
}
