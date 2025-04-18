import { Footer } from "@/components/landing/footer";
// import { Header } from "@/components/landing/header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

// Placeholder FAQ data
const faqItems = [
  {
    question: "O que é a plataforma Udel?",
    answer: "A Udel é uma plataforma educacional inovadora focada em unir desenvolvimento de software e aprendizado, oferecendo recursos interativos, gamificação e uma comunidade colaborativa.",
  },
  {
    question: "A plataforma é gratuita?",
    // Updated answer
    answer: "Sim, a plataforma Udel é 100% gratuita e sempre será. Nosso objetivo é democratizar o acesso à educação de qualidade.",
  },
  {
    question: "Como posso contribuir com o projeto?",
    answer: "Você pode contribuir de várias formas: fazendo uma doação voluntária para ajudar a cobrir os custos de manutenção, reportando bugs, sugerindo novas funcionalidades ou participando ativamente da nossa comunidade no Discord.",
  },
  {
    question: "Para quem a plataforma é destinada?",
    answer: "A Udel é destinada a estudantes de todos os níveis, desenvolvedores, educadores e qualquer pessoa interessada em aprender e evoluir em um ambiente colaborativo e gamificado.",
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: "Você pode entrar em contato conosco através da nossa página de Contato ou diretamente pelo nosso servidor no Discord.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Header /> */}
      <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-16">
           <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-4">
             <HelpCircle className="w-6 h-6 text-purple-400" />
           </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-xl text-zinc-400">
            Encontre respostas para as dúvidas mais comuns sobre a plataforma Udel.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-zinc-900/50 border border-zinc-800/50 rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium text-white hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-300 pt-2">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  );
}
