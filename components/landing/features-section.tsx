"use client"

import { motion } from "framer-motion"
import { BookOpen, Trophy, Users, Zap, BarChart2, Shield } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Banco de Questões",
    description: "Acesse mais de 200.000 questões de diversas áreas do conhecimento, com explicações detalhadas.",
  },
  {
    icon: Trophy,
    title: "Gamificação",
    description: "Ganhe pontos, conquiste troféus e suba no ranking enquanto aprende de forma divertida.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Conecte-se com outros estudantes, compartilhe conhecimento e participe de grupos de estudo.",
  },
  {
    icon: Zap,
    title: "Aprendizado Adaptativo",
    description: "Algoritmos inteligentes que se adaptam ao seu ritmo e estilo de aprendizagem.",
  },
  {
    icon: BarChart2,
    title: "Análise de Desempenho",
    description: "Acompanhe seu progresso com estatísticas detalhadas e identifique áreas para melhorar.",
  },
  {
    icon: Shield,
    title: "Conteúdo Verificado",
    description: "Todo o material é revisado por especialistas para garantir a qualidade e precisão.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-black/90 to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recursos Exclusivos</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Descubra as ferramentas que tornam a Udel a plataforma ideal para impulsionar seus estudos
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-zinc-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
