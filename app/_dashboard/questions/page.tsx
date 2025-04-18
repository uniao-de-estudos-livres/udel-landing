"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ChevronRight,
  CheckCircle2,
  XCircle,
  PenLine,
  Clock,
  EyeOff,
  ArrowLeft,
  PanelLeftClose, // Keep PanelLeftClose for toggle button
} from "lucide-react"
import { useNotification } from "@/components/ui/notifications"
import { Progress } from "@/components/ui/progress"
import { LatexRenderer } from "@/components/LatexRender"
import { useSidebar } from "@/contexts/SidebarContext";

type Question = {
  id: number;
  subject: string;
  text: string;
  introduction?: string;
  image?: string;
  options: string[];
  correctAnswer: number;
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number;
};

const questions: Question[] = [
  {
    id: 1,
    subject: "Geografia",
    introduction:
      "A inversão térmica é um fenômeno atmosférico importante para compreender a dinâmica da poluição do ar em áreas urbanas.",
    text: "A imagem representa o fenômeno atmosférico conhecido como 'inversão térmica'. Sobre esse fenômeno, é correto afirmar que:",
    image: "/placeholder.svg?height=300&width=500&text=Imagem+de+Inversão+Térmica",
    options: [
      "Ocorre apenas em regiões de clima tropical.",
      "É causado exclusivamente pela poluição atmosférica.",
      "Acontece quando uma camada de ar quente se sobrepõe a uma camada de ar frio, impedindo a dispersão de poluentes.",
      "É um fenômeno benéfico para a qualidade do ar nas grandes cidades.",
      "Só pode ser observado durante o inverno em regiões de alta latitude.",
    ],
    correctAnswer: 2,
    difficulty: "medium",
    estimatedTime: 90,
  },
  {
    id: 2,
    subject: "Matemática",
    introduction: "A fórmula de Bhaskara é usada para resolver equações do segundo grau na forma $ax^2 + bx + c = 0$.",
    text: "Resolva a equação $x^2 - 5x + 6 = 0$ e assinale a alternativa que contém as raízes corretas.",
    options: [
      "$x = 2$ e $x = 3$",
      "$x = -2$ e $x = -3$",
      "$x = 2$ e $x = -3$",
      "$x = -2$ e $x = 3$",
      "$x = 1$ e $x = 6$"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    estimatedTime: 60,
  },
  {
    id: 3,
    subject: "Física",
    introduction: "Na física, a equação do movimento é dada por $s = s_0 + v_0t + \\frac{1}{2}at^2$.",
    text: "Um projétil é lançado horizontalmente do topo de um edifício de $45$ metros de altura com velocidade inicial de $20$ m/s. Considerando $g = 10$ m/s², qual será aproximadamente o alcance horizontal do projétil?",
    options: [
      "$20$ metros",
      "$40$ metros",
      "$60$ metros",
      "$80$ metros",
      "$100$ metros"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    estimatedTime: 120,
  },
  {
    id: 4,
    subject: "Matemática",
    introduction: "Na teoria dos limites, quando $x$ tende a infinito, podemos avaliar o comportamento de funções racionais.",
    text: "Calcule o limite: $$\\lim_{x \\to \\infty} \\frac{2x^2 + 3x + 1}{x^2 - 2x + 4}$$",
    options: [
      "$0$",
      "$1$",
      "$2$",
      "$\\infty$",
      "O limite não existe"
    ],
    correctAnswer: 2,
    difficulty: "hard",
    estimatedTime: 120,
  },
];

const QuestionsPage = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showSketchpad, setShowSketchpad] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const notification = useNotification();
  const { toggleSidebar } = useSidebar();

  const question = questions[currentQuestionIndex];

  useEffect(() => {
    setTimeElapsed(0);
    setIsTimerRunning(true);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = setTimeout(() => setTimeElapsed((prev) => prev + 1), 1000);
    return () => clearTimeout(timer);
  }, [timeElapsed, isTimerRunning]);

  useEffect(() => {
    setProgress((currentQuestionIndex / questions.length) * 100);
  }, [currentQuestionIndex]);

  const handleOptionSelect = (index: number) => {
    if (!showFeedback) setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      setIsTimerRunning(false);
      if (selectedOption === question.correctAnswer) {
        notification.success("Resposta Correta!", "Parabéns! Você acertou a questão.");
      } else {
        notification.error("Resposta Incorreta", "Não foi dessa vez. Tente novamente!");
      }
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setShowFeedback(false);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const toggleSketchpad = () => setShowSketchpad(!showSketchpad);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "hard": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 text-white">
      <header className="fixed top-0 left-0 right-0 z-10 backdrop-blur-xl bg-zinc-900/40 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200"
              aria-label="Toggle Sidebar"
            >
              <PanelLeftClose className="h-5 w-5" />
            </Button>

            <h1 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-medium bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Questões
            </h1>

            <div className="flex items-center gap-6">
              <motion.div
                className="flex items-center gap-2 bg-zinc-800/30 px-3 py-1.5 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Clock className="h-4 w-4 text-zinc-400" />
                <span className="text-sm font-medium text-zinc-300">
                  {formatTime(timeElapsed)}
                </span>
              </motion.div>
              <span className="text-sm bg-zinc-800/30 px-3 py-1.5 rounded-full text-zinc-400">
                {currentQuestionIndex + 1}/{questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowInfoPanel(!showInfoPanel)}
                  className={`text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all duration-200 relative group ${!showInfoPanel ? "text-purple-400" : ""}`}
                >
                  <EyeOff className="h-4 w-4" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-zinc-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {showInfoPanel ? "Ocultar painel" : "Mostrar painel"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          <Progress
            value={progress}
            className="h-1 mt-3 bg-zinc-800/50 [&>[role=progressbar]]:bg-gradient-to-r [&>[role=progressbar]]:from-purple-600 [&>[role=progressbar]]:to-purple-400"
          />
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className={`flex flex-col lg:flex-row gap-6 mt-6 ${!showInfoPanel ? 'justify-center' : ''}`}>
          <div className={`w-full ${showInfoPanel ? 'lg:w-2/3' : 'lg:w-3/4 max-w-3xl'}`}>
            <motion.div
              className="backdrop-blur-xl bg-zinc-900/40 border border-zinc-800/50 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="p-8 border-b border-zinc-800/50">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${getDifficultyColor(question.difficulty)} shadow-lg shadow-purple-500/20`}></span>
                    <span className="text-sm font-medium text-zinc-300">{question.subject}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSketchpad}
                    className="text-zinc-300 border-zinc-700/50 hover:bg-zinc-800/50 transition-all duration-200"
                  >
                    <PenLine className="h-4 w-4 mr-2" />
                    {showSketchpad ? "Esconder Rascunho" : "Mostrar Rascunho"}
                  </Button>
                </div>
                {question.introduction && (
                  <motion.div
                    className="text-zinc-300 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <LatexRenderer content={question.introduction} />
                  </motion.div>
                )}
                <motion.h2
                  className="text-xl font-medium text-white"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <LatexRenderer content={question.text} />
                </motion.h2>
              </div>

              {question.image && (
                <motion.div
                  className="p-8 bg-zinc-950/50 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <img src={question.image} alt="Imagem da questão" className="rounded-lg shadow-xl" style={{ maxWidth: '100%', height: 'auto' }} />
                </motion.div>
              )}

              <div className="p-8">
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    >
                      <button
                        onClick={() => handleOptionSelect(index)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg transition-all duration-200 flex items-start gap-3
                          ${selectedOption === index ? "bg-purple-600/20 border border-purple-500" : "bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600"}
                          ${showFeedback && index === question.correctAnswer ? "option-correct border-green-500" : showFeedback && selectedOption === index && selectedOption !== question.correctAnswer ? "option-incorrect border-red-500" : ""}`}
                        style={{ backgroundColor: showFeedback && index === question.correctAnswer ? 'rgba(22, 163, 74, 0.1)' : showFeedback && selectedOption === index && selectedOption !== question.correctAnswer ? 'rgba(220, 38, 38, 0.1)' : '' }}
                      >
                        <div className={`option-icon flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${selectedOption === index ? "bg-purple-600 text-white" : "bg-zinc-700 text-zinc-300"} ${showFeedback && index === question.correctAnswer ? "bg-green-600 text-white" : showFeedback && selectedOption === index && selectedOption !== question.correctAnswer ? "bg-red-600 text-white" : ""}`}>
                          {showFeedback && index === question.correctAnswer ? <CheckCircle2 className="h-5 w-5" color="white" fill="currentColor" /> : showFeedback && selectedOption === index && selectedOption !== question.correctAnswer ? <XCircle className="h-5 w-5" /> : <span>{String.fromCharCode(65 + index)}</span>}
                        </div>
                        <div className="flex-1">
                          <LatexRenderer content={option} />
                        </div>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-t border-zinc-800/50 flex justify-between items-center">
                <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="text-zinc-300 border-zinc-700/50 hover:bg-zinc-800/50 transition-all duration-200">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Anterior
                </Button>
                <AnimatePresence mode="wait">
                  {showFeedback ? (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center">
                      {selectedOption === question.correctAnswer ? (
                        <motion.span className="text-green-400 flex items-center bg-green-500/10 px-6 py-2.5 rounded-full border border-green-500/20" initial={{ x: -20 }} animate={{ x: 0 }}>
                          <CheckCircle2 className="mr-2 h-5 w-5" /> Resposta correta!
                        </motion.span>
                      ) : (
                        <motion.span className="text-red-400 flex items-center bg-red-500/10 px-6 py-2.5 rounded-full border border-red-500/20" initial={{ x: -20 }} animate={{ x: 0 }}>
                          <XCircle className="mr-2 h-5 w-5" /> Resposta incorreta. A alternativa correta é {String.fromCharCode(65 + question.correctAnswer)}.
                        </motion.span>
                      )}
                    </motion.div>
                  ) : (
                    <Button onClick={handleSubmit} disabled={selectedOption === null} className="bg-purple-600 hover:bg-purple-700 text-white">
                      Responder
                    </Button>
                  )}
                </AnimatePresence>
                <Button variant={showFeedback ? "default" : "outline"} onClick={handleNext} disabled={!showFeedback} className={showFeedback ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 transition-all duration-200" : "text-zinc-300 border-zinc-700/50 hover:bg-zinc-800/50 transition-all duration-200"}>
                  Próxima <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>

          {showInfoPanel && (
            <AnimatePresence mode="wait">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full lg:w-1/3 hidden lg:block">
                <div className="backdrop-blur-xl bg-zinc-900/40 border border-zinc-800/50 rounded-xl shadow-lg">
                  <div className="p-6 border-b border-zinc-800/50">
                    <h3 className="font-medium bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Informações</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div><p className="text-sm text-zinc-400 mb-2">Disciplina</p><p className="text-zinc-200 font-medium">{question.subject}</p></div>
                    <div><p className="text-sm text-zinc-400 mb-2">Dificuldade</p><div className="flex items-center gap-2"><span className={`w-2.5 h-2.5 rounded-full ${getDifficultyColor(question.difficulty)} shadow-lg shadow-purple-500/20`}></span><span className="text-zinc-200 capitalize font-medium">{question.difficulty}</span></div></div>
                    <div><p className="text-sm text-zinc-400 mb-2">Tempo estimado</p><p className="text-zinc-200 font-medium">{formatTime(question.estimatedTime)}</p></div>
                    <div className="pt-4"><Button variant="outline" className="w-full text-zinc-300 border-zinc-700/50 hover:bg-zinc-800/50 transition-all duration-200" onClick={toggleSketchpad}><PenLine className="h-4 w-4 mr-2" />Abrir rascunho</Button></div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionsPage;
