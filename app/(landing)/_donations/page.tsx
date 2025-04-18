"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Users, Gift, Award, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DonationForm } from "@/components/donations/donation-form"
import { DonationTiers } from "@/components/donations/donation-tiers"
import { DonationFAQ } from "@/components/donations/donation-faq"
import { TopDonors } from "@/components/donations/top-donors"
import { Footer } from "@/components/landing/footer"
import { AuthService } from "@/services/auth-service";
import { Skeleton } from "@/components/ui/skeleton";

interface DonationStats {
    students_benefited?: number | null;
    monthly_donors?: number | null;
    transparency_description?: string | null;
}

export default function DonationsPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoadingStats(true);
      setStatsError(null);
      try {
        const data = await AuthService.getDonationStats();
        if (data) {
          setStats(data);
        } else {
          setStatsError("Não foi possível carregar as estatísticas.");
        }
      } catch (err) {
        console.error("Failed to fetch donation stats:", err);
        setStatsError("Não foi possível carregar as estatísticas.");
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const scrollToForm = () => {
    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
  }

  const formatStat = (value: number | null | undefined, suffix = '') => {
      if (isLoadingStats) return <Skeleton className="h-10 w-24 mb-2 mx-auto" />;
      if (statsError || value === null || value === undefined) return "?";
      return `${value.toLocaleString('pt-BR')}${suffix}`;
  };

  const impactStatsData = [
      {
        icon: Users,
        stat: formatStat(stats?.students_benefited, '+'),
        label: "Estudantes Beneficiados",
        description: "Alunos de todo o Brasil com acesso gratuito à plataforma",
      },
      {
        icon: Gift,
        stat: formatStat(stats?.monthly_donors, '+'),
        label: "Doadores Mensais",
        description: "Pessoas que contribuem regularmente para manter o projeto",
      },
      {
        icon: Award,
        stat: isLoadingStats ? <Skeleton className="h-10 w-20 mb-2 mx-auto" /> : statsError ? "?" : "100%",
        label: "Transparência",
        description: stats?.transparency_description || "Prestação de contas detalhada sobre o uso dos recursos",
      },
    ];


  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative py-20 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
              <Heart className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-purple-300 font-medium">Apoie o Projeto</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
              Ajude a Transformar a Educação
            </h1>
            <p className="text-xl text-zinc-400 mb-8">
              Sua contribuição mantém a plataforma Udel acessível para estudantes de todo o Brasil e impulsiona o
              desenvolvimento de novos recursos educacionais.
            </p>
            <Button
              onClick={scrollToForm}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-lg font-semibold text-lg shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]"
            >
              Fazer uma Doação
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-black to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {impactStatsData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-4xl font-bold text-white mb-2 h-10 flex items-center justify-center">
                    {item.stat}
                </h3>
                <h4 className="text-xl font-semibold text-purple-300 mb-2">{item.label}</h4>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
          {statsError && (
             <p className="text-center text-red-400 mt-8">{statsError}</p>
          )}
        </div>
      </section>

      <DonationTiers selectedTier={selectedTier} setSelectedTier={setSelectedTier} />

      <section className="py-16 bg-gradient-to-b from-purple-900/10 to-black">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Benefícios para Doadores</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Além de contribuir para a educação, nossos doadores recebem vantagens exclusivas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Reconhecimento", description: "Seu nome na lista de apoiadores e badge exclusivo no perfil", icon: Star },
              { title: "Conteúdo Exclusivo", description: "Acesso a materiais de estudo e questões premium", icon: Gift },
              { title: "Eventos Especiais", description: "Convites para webinars e encontros com a equipe", icon: Users },
              { title: "Suporte Prioritário", description: "Atendimento em canal exclusivo para doadores", icon: Award },
              { title: "Personalização", description: "Opções avançadas de customização do perfil", icon: Gift },
              { title: "Voz na Comunidade", description: "Participação em votações sobre novos recursos", icon: Users },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-zinc-900/50 border border-purple-500/20 rounded-xl p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                    <benefit.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
                </div>
                <p className="text-zinc-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TopDonors />
      <DonationForm selectedTier={selectedTier} />
      <DonationFAQ />
      <Footer />
    </div>
  )
}
