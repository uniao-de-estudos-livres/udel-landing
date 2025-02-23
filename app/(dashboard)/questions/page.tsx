'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { useNotification } from '@/components/ui/notifications'

type Question = {
  id: number
  subject: string
  text: string
  image?: string
  options: string[]
  correctAnswer: number
}

const question: Question = {
  id: 1,
  subject: "Geografia",
  text: "A imagem representa o fenômeno atmosférico conhecido como 'inversão térmica'. Sobre esse fenômeno, é correto afirmar que:",
  image: "/placeholder.svg?height=200&width=400&text=Imagem+de+Inversão+Térmica",
  options: [
    "Ocorre apenas em regiões de clima tropical.",
    "É causado exclusivamente pela poluição atmosférica.",
    "Acontece quando uma camada de ar quente se sobrepõe a uma camada de ar frio, impedindo a dispersão de poluentes.",
    "É um fenômeno benéfico para a qualidade do ar nas grandes cidades.",
    "Só pode ser observado durante o inverno em regiões de alta latitude."
  ],
  correctAnswer: 2
}

export default function QuestionsPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const notification = useNotification()

  const handleOptionSelect = (index: number) => {
    if (!showFeedback) {
      setSelectedOption(index)
    }
  }

  const handleSubmit = () => {
    if (selectedOption !== null) {
      if (selectedOption === question.correctAnswer) {
        notification.success(
          "Resposta Correta!",
          "Parabéns! Você acertou a questão."
        )
      } else {
        notification.error(
          "Resposta Incorreta",
          "Não foi dessa vez. Tente novamente!"
        )
      }
      setShowFeedback(true)
    }
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShowFeedback(false)
  }

  return (
    <div className="h-screen bg-zinc-900 text-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <Card className="w-full max-w-4xl bg-black border-purple-500/20 flex flex-col h-[90vh]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-purple-400">
            {question.subject}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed mb-4 text-gray-300">
              A inversão térmica é um fenômeno atmosférico importante para compreender a dinâmica da poluição do ar em áreas urbanas.
            </p>
            {question.image && (
              <div className="flex justify-center mb-4">
                <Image
                  src={question.image}
                  alt="Questão"
                  width={400}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            )}
            <p className="text-lg leading-relaxed">{question.text}</p>
          </div>
          <div className="space-y-3 mt-6">
            {question.options.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal h-auto py-3 px-4 ${
                    selectedOption === index
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-zinc-800 text-gray-100 hover:bg-zinc-700'
                  } ${
                    showFeedback && index === question.correctAnswer
                      ? 'ring-2 ring-green-500'
                      : ''
                  } ${
                    showFeedback && selectedOption === index && selectedOption !== question.correctAnswer
                      ? 'ring-2 ring-red-500'
                      : ''
                  }`}
                  onClick={() => handleOptionSelect(index)}
                  disabled={showFeedback}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={handleSubmit}
            disabled={selectedOption === null || showFeedback}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Responder
          </Button>
          <AnimatePresence>
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center"
              >
                {selectedOption === question.correctAnswer ? (
                  <motion.span
                    className="text-green-400 flex items-center"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    <CheckCircle className="mr-2" /> Correto!
                  </motion.span>
                ) : (
                  <motion.span
                    className="text-red-400 flex items-center"
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                  >
                    <XCircle className="mr-2" /> Incorreto. A resposta correta era: {String.fromCharCode(65 + question.correctAnswer)}
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={handleNext}
            disabled={!showFeedback}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Próxima <ChevronRight className="ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

