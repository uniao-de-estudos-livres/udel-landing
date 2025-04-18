"use client"

import { useState, useEffect } from "react"; // Import hooks
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AuthService } from "@/services/auth-service"; // Import AuthService
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Define type for donation stats data matching AuthService return type
interface DonationStats {
    students_benefited?: number | null;
    monthly_donors?: number | null;
    transparency_description?: string | null; // Keep this if needed, though not displayed here
}

export function DonationCTA() {
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      setStatsError(null); // Reset error on new fetch
      try {
        const data = await AuthService.getDonationStats();
        if (data) { // Check if data is not null
          setStats(data);
        } else {
          // Handle null response from service (which indicates an error occurred)
          setStatsError("Não foi possível carregar as estatísticas.");
        }
      } catch (err) {
        console.error("Failed to fetch donation stats for CTA:", err);
        setStatsError("Não foi possível carregar as estatísticas."); // Set error state
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  // Helper to format stats, adding '+' and handling null/undefined/loading/error
  const formatStatDisplay = (value: number | null | undefined, suffix = '') => {
      // Ensure loading state shows skeleton
      if (isLoadingStats) return <Skeleton className="h-14 w-40 mb-4 mx-auto" />;
      // Show placeholder on error or if value is null/undefined after loading
      if (statsError || value === null || value === undefined) return "?";
      // Format valid number
      return `+${value.toLocaleString('pt-BR')}${suffix}`;
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-black to-purple-900/20">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-black pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left side content remains the same */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Apoie o Projeto Udel</h2>
              <p className="text-zinc-400 mb-6">
                Ajude-nos a manter esta plataforma gratuita e acessível para todos os estudantes. Sua contribuição faz a
                diferença!
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Acesso a recursos exclusivos",
                  "Reconhecimento na comunidade",
                  "Participação em eventos especiais",
                  "Suporte ao desenvolvimento de novas funcionalidades",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2 text-zinc-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <span className="text-purple-400">✓</span> {item}
                  </motion.li>
                ))}
              </ul>
              <Link href="/donations" scroll={true}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-lg font-semibold flex items-center gap-2 text-lg">
                  <Heart className="w-5 h-5" /> Fazer Doação
                </Button>
              </Link>
            </div>

            {/* Right side content - Updated with dynamic stats */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75"></div>
                <div className="relative bg-zinc-900 rounded-lg p-6 text-center">
                  {/* Students Benefited */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 h-16 flex items-center justify-center">
                    {formatStatDisplay(stats?.students_benefited)}
                  </div>
                  <p className="text-zinc-300 text-xl mb-6">Estudantes apoiados</p>

                  {/* Monthly Donors */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 h-16 flex items-center justify-center">
                     {formatStatDisplay(stats?.monthly_donors)}
                  </div>
                  <p className="text-zinc-300 text-xl mb-6">Doadores mensais</p>

                  {/* Transparency */}
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4 h-16 flex items-center justify-center">
                    {/* Show skeleton during load, '?' on error, '100%' otherwise */}
                    {isLoadingStats ? <Skeleton className="h-14 w-24 mx-auto" /> : statsError ? "?" : "100%"}
                  </div>
                  <p className="text-zinc-300 text-xl">Transparência</p>
                </div>
              </div>
            </div>
          </div>
           {/* Display error message below the card if fetch failed */}
           {statsError && !isLoadingStats && (
             <p className="text-center text-red-400 mt-4">{statsError}</p>
           )}
        </motion.div>
      </div>
    </section>
  )
}
