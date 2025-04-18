"use client";

import { Button } from "@/components/ui/button"; // Corrected import path
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Corrected import path
import { LockKeyhole, Home, GraduationCap, BookmarkPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useNotification } from "@/hooks/use-notification"; // Corrected import path (assuming hooks dir)
import { useRouter } from "next/navigation"; // Import useRouter

const BetaRequiredPage = () => {
  const { success } = useNotification();
  const router = useRouter(); // Initialize router

  const handleWishlistSignup = () => {
    // TODO: Implement actual logic to add user to a waitlist/interest list
    // This might involve an API call.
    console.log("User wants to join the beta test list.");
    success('Lista de Espera Beta', 'Seu interesse foi registrado! Entraremos em contato.');
  };

  const handleGoToPublicArea = () => {
    // Redirect to the main landing page or another public route
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white flex items-center justify-center">
      {/* Removed pt-16 from main as this page likely doesn't use the dashboard header */}
      <main className="pb-20 px-4 max-w-7xl mx-auto flex items-center justify-center">
        <motion.div
          className="w-full max-w-md backdrop-blur-xl bg-zinc-900/40 border border-zinc-800/50 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CardHeader className="text-center pb-4 border-b border-zinc-800/50 p-8">
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Using GraduationCap as placeholder, adjust if needed */}
                <GraduationCap className="h-16 w-16 text-zinc-700/20" />
                <LockKeyhole className="h-8 w-8 text-purple-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
            <CardTitle className="text-3xl bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              🚧 Acesso Beta Restrito 🚧
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-center p-8">
            <motion.p
              className="text-zinc-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              🔬 Olá! A plataforma Udel ainda está em fase Beta fechada.
              O acesso completo está limitado a usuários selecionados no momento. 🕵️‍♂️
            </motion.p>

            <motion.div
              className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold mb-2 text-white">Interessado em Testar?</h3>
              <p className="text-zinc-400 text-sm">
                Você pode se inscrever na lista de espera para ser um dos primeiros a saber quando abrirmos mais vagas!
              </p>
            </motion.div>

            <div className="flex flex-col gap-3">
              <Button
                onClick={handleWishlistSignup}
                variant="secondary" // Consider if this variant exists or use default/custom
                className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 transition-all duration-200"
              >
                <BookmarkPlus className="mr-2 h-4 w-4" /> Entrar na Lista de Espera
              </Button>
              <Button
                onClick={handleGoToPublicArea}
                variant="outline"
                className="w-full text-zinc-300 border-zinc-700/50 hover:bg-zinc-800/50 transition-all duration-200"
              >
                <Home className="mr-2 h-4 w-4" /> Voltar para Início
              </Button>
            </div>

            <motion.p
              className="text-zinc-500 text-xs mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Agradecemos seu interesse e paciência enquanto trabalhamos para lançar a plataforma!
            </motion.p>
          </CardContent>
        </motion.div>
      </main>
    </div>
  )
}

export default BetaRequiredPage; // Changed export name
