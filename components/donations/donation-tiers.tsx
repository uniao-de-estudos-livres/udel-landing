"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DonationTiersProps {
  selectedTier: string | null
  setSelectedTier: (tier: string | null) => void
}

const tiers = [
  {
    id: "apoiador",
    name: "Apoiador",
    price: "R$ 15",
    period: "/mês",
    description: "Ideal para quem quer começar a apoiar o projeto",
    features: ["Badge de apoiador no perfil", "Nome na lista de apoiadores", "Acesso a 10 questões premium por mês"],
    recommended: false,
  },
  {
    id: "colaborador",
    name: "Colaborador",
    price: "R$ 30",
    period: "/mês",
    description: "Para quem quer contribuir mais ativamente",
    features: [
      "Badge de colaborador no perfil",
      "Nome em destaque na lista de apoiadores",
      "Acesso a todas as questões premium",
      "Convites para eventos exclusivos",
      "Suporte prioritário",
    ],
    recommended: true,
  },
  {
    id: "patrocinador",
    name: "Patrocinador",
    price: "R$ 50",
    period: "/mês",
    description: "Para quem quer fazer a diferença",
    features: [
      "Badge de patrocinador no perfil",
      "Nome em destaque na página inicial",
      "Acesso a todas as questões premium",
      "Convites para eventos exclusivos",
      "Suporte prioritário",
      "Participação em decisões sobre novos recursos",
      "Menção especial nos agradecimentos",
    ],
    recommended: false,
  },
]

export function DonationTiers({ selectedTier, setSelectedTier }: DonationTiersProps) {
  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId)
    document.getElementById("donation-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-gradient-to-b from-purple-900/10 to-purple-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Escolha Como Apoiar</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Cada contribuição faz diferença. Escolha o plano que melhor se adapta a você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              className={`relative rounded-2xl backdrop-blur-sm border ${
                tier.recommended ? "bg-purple-900/20 border-purple-500" : "bg-zinc-900/80 border-purple-500/20"
              } overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {tier.recommended && (
                <div className="absolute top-0 left-0 right-0 bg-purple-600 text-white text-center py-1 text-sm font-medium">
                  Mais Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-zinc-400 ml-1">{tier.period}</span>
                </div>
                <p className="text-zinc-400 mb-6">{tier.description}</p>
                <Button
                  onClick={() => handleSelectTier(tier.id)}
                  className={`w-full ${
                    tier.recommended
                      ? "bg-purple-600 hover:bg-purple-700 text-white"
                      : "bg-zinc-800 hover:bg-zinc-700 text-white"
                  }`}
                >
                  Selecionar
                </Button>
              </div>
              <div className="bg-zinc-900/90 p-6 border-t border-zinc-800">
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-zinc-400 mb-4">
            Prefere fazer uma doação única? Você também pode contribuir com qualquer valor.
          </p>
          <Button
            onClick={() => setSelectedTier("unico")}
            className="bg-zinc-800 hover:bg-zinc-700 text-white border border-purple-500/20"
          >
            Fazer Doação Única
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
