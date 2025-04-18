"use client"

import { motion } from "framer-motion"
import { BookOpen, Target, Star } from "lucide-react"

export function ClubsSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-purple-900/20 to-black/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Clubes de Estudo</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Junte-se a grupos de estudo temáticos e aprenda com pessoas que compartilham seus interesses.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <BookOpen className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Clube de Literatura</h3>
            <p className="text-zinc-400 mb-4">Discussões semanais sobre obras clássicas e contemporâneas</p>
          </motion.div>
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Target className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Clube de Matemática</h3>
            <p className="text-zinc-400 mb-4">Resolução de problemas e preparação para olimpíadas</p>
          </motion.div>
          <motion.div
            className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Star className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-white">Clube de Ciências</h3>
            <p className="text-zinc-400 mb-4">Experimentos práticos e discussões científicas</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
