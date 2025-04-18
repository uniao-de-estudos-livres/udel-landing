"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "Como o dinheiro das doações é utilizado?",
    answer:
      "As doações são utilizadas para manter a infraestrutura da plataforma, desenvolver novos recursos educacionais, criar conteúdo de qualidade e garantir que o Udel continue acessível gratuitamente para estudantes de todo o Brasil.",
  },
  {
    question: "Posso cancelar minha doação recorrente a qualquer momento?",
    answer:
      "Sim, você pode cancelar sua doação recorrente a qualquer momento através da sua área de perfil, na seção 'Minhas Doações'. O cancelamento é imediato e você não será cobrado no próximo ciclo.",
  },
  {
    question: "As doações são dedutíveis do imposto de renda?",
    answer:
      "Atualmente, as doações para o Udel não são dedutíveis do imposto de renda. Estamos trabalhando para obter certificações que permitam esse benefício no futuro.",
  },
  {
    question: "Posso fazer uma doação em nome de outra pessoa ou empresa?",
    answer:
      "Sim, você pode fazer uma doação em nome de outra pessoa ou empresa. Durante o processo de doação, basta indicar o nome que deve aparecer na lista de apoiadores.",
  },
  {
    question: "Como recebo os benefícios da minha doação?",
    answer:
      "Após a confirmação da sua doação, os benefícios são automaticamente ativados na sua conta. Você receberá um email com instruções detalhadas sobre como acessar cada um dos benefícios do seu plano.",
  },
  {
    question: "Existe um valor mínimo para doação?",
    answer:
      "Não há um valor mínimo estabelecido. Valorizamos qualquer contribuição, independentemente do valor. Cada doação, por menor que seja, ajuda a manter o projeto.",
  },
]

export function DonationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-purple-900/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-xl text-zinc-400">Tire suas dúvidas sobre doações para o projeto Udel</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/80 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-purple-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                )}
              </button>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-zinc-400">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
