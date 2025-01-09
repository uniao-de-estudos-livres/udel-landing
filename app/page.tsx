'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Target, Gamepad, BookOpen, Medal, Puzzle, ArrowRight, Star, ChevronDown, Brain, Zap, Rocket } from 'lucide-react';

function FeatureCard({ icon: Icon, title, description, details }: {
  icon: React.ElementType,
  title: string,
  description: string,
  details: string[]
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-zinc-800 shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300">
      <Icon className="w-16 h-16 text-purple-400 mb-4" />
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-zinc-400 mb-4">{description}</p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-purple-400 hover:text-purple-300 transition-colors"
      >
        {isExpanded ? 'Ver menos' : 'Ver mais'}
      </button>
      {isExpanded && (
        <ul className="mt-4 space-y-2 text-zinc-300">
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <Zap className="w-5 h-5 text-purple-400 mr-2 mt-1 flex-shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Text Content */}
            <div className="text-left">
              <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-6">
                Udel: Unindo
                <span className="text-purple-400"> Desenvolvimento e Evolução na Aprendizagem</span>
              </h1>
              <p className="text-xl text-zinc-400 mb-8">
                Transforme sua jornada educacional com uma plataforma que combina colaboração, gamificação e inovação para um aprendizado mais eficiente e envolvente.
              </p>
              <div className="flex gap-4">
                <Link href="/signup" passHref>
                  <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
                    Começar Agora <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
                <button className="border border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 transition-all">
                  Conhecer Mais
                </button>
              </div>
            </div>
            {/* Logo */}
            <div className="flex justify-center lg:justify-end">
              <svg width="400" height="400" viewBox="0 0 311 259" className="animate-pulse" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M196.58 208.5H88.0798C88.0798 208.5 81.5798 209.5 73.0798 217C64.5798 224.5 59.5799 229.5 59.5799 229.5L29.0799 258.5C29.0799 258.5 18.5801 257 8.58007 245.5C-1.41993 234 0.0798517 214.5 0.0798517 214.5C0.0798517 214.5 3.58007 189.5 5.08007 183.5C6.58007 177.5 13.5801 154 13.5801 154C13.5801 154 28.9548 111 32.0801 106C35.2054 101 37.0801 97.5 56.5801 87C76.0801 76.5 81.0801 77.5 89.0801 76C97.0801 74.5 178.08 73.5005 194.58 75.5003C201.811 76.3767 215.843 80.7896 227.08 87.0001C241.484 94.9609 249.58 100.5 252.58 105C255.58 109.5 258.58 113 264.58 132C270.58 151 274.08 161.5 274.08 161.5C274.08 161.5 278.58 177 281.08 187.5C283.58 198 285.08 203.001 284.58 214.5C284.08 226 281.58 239 276.58 246C271.58 253 257.58 259.5 255.58 258.5C253.58 257.501 226.08 229.5 226.08 229.5C226.08 229.5 220.08 223 211.58 217C203.08 211 196.58 208.5 196.58 208.5Z" fill="#ffffff" />
                <path d="M243.58 140C243.58 161.263 226.343 178.5 205.08 178.5C183.817 178.5 166.58 161.263 166.58 140C166.58 118.737 183.817 101.5 205.08 101.5C226.343 101.5 243.58 118.737 243.58 140Z" fill="#333333" />
                <path d="M117.58 140C117.58 161.263 100.343 178.5 79.0801 178.5C57.8171 178.5 40.5801 161.263 40.5801 140C40.5801 118.737 57.8171 101.5 79.0801 101.5C100.343 101.5 117.58 118.737 117.58 140Z" fill="#333333" />
                <path d="M87.5801 116.5C87.5801 120.918 83.9984 124.5 79.5801 124.5C75.1618 124.5 71.5801 120.918 71.5801 116.5C71.5801 112.082 75.1618 108.5 79.5801 108.5C83.9984 108.5 87.5801 112.082 87.5801 116.5Z" fill="white" />
                <path d="M110.58 140.5C110.58 144.918 106.998 148.5 102.58 148.5C98.1618 148.5 94.5801 144.918 94.5801 140.5C94.5801 136.082 98.1618 132.5 102.58 132.5C106.998 132.5 110.58 136.082 110.58 140.5Z" fill="white" />
                <path d="M87.5801 163.5C87.5801 167.918 83.9984 171.5 79.5801 171.5C75.1618 171.5 71.5801 167.918 71.5801 163.5C71.5801 159.082 75.1618 155.5 79.5801 155.5C83.9984 155.5 87.5801 159.082 87.5801 163.5Z" fill="white" />
                <path d="M63.5801 140.5C63.5801 144.918 59.9984 148.5 55.5801 148.5C51.1618 148.5 47.5801 144.918 47.5801 140.5C47.5801 136.082 51.1618 132.5 55.5801 132.5C59.9984 132.5 63.5801 136.082 63.5801 140.5Z" fill="white" />
                <path d="M213.158 121.283C214.971 119.583 215.063 116.735 213.363 114.922C211.663 113.109 208.815 113.017 207.002 114.717L180.863 140.578C179.05 142.278 178.958 145.126 180.658 146.939C182.358 148.752 185.206 148.843 187.019 147.143L213.158 121.283Z" fill="white" />
                <path d="M230.297 137.283C232.11 135.583 232.202 132.735 230.502 130.922C228.802 129.109 225.954 129.017 224.141 130.717L198.002 156.578C196.189 158.278 196.097 161.126 197.797 162.939C199.497 164.752 202.345 164.843 204.158 163.143L230.297 137.283Z" fill="white" />
                <path d="M260.58 101.5C232.21 72.4881 209.378 64.9079 156.58 66.4999L160.58 54L126.58 23L232.58 0L310.58 81.5L299.225 83.5186L292.08 108L293.942 108.5L289.08 124.5L282.58 122L286.58 106.5L289.08 107L295.627 84.1582L265.58 89.5L260.58 101.5Z" fill="white" />
                <path d="M305 71L303.306 73.8995L301.996 72.5304L300.685 71.1612C300.685 71.1612 300.5 71.5 301 70.5C301.5 69.5 302 68 302 67C302 66 302 65 301 64C300 63 299 63 298 63C297 63 296.5 63 295.5 63.5C294.5 64 294.567 64.7687 294.567 64.7687L292.797 62.9195L291.028 61.0703L293 60L297 59C297 59 300 59 301.5 59.5C303 60 305 61.5 305.5 63C306 64.5 306.5 66.5 306 68L305 71Z" fill="white" />
                <path d="M122.58 188.5C122.58 192.366 125.714 195.5 129.58 195.5H154.58C158.446 195.5 161.58 192.366 161.58 188.5C161.58 184.634 158.446 181.5 154.58 181.5H129.58C125.714 181.5 122.58 184.634 122.58 188.5Z" fill="#333333" />
              </svg>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
        <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
          <ChevronDown className="w-10 h-10 text-purple-400 animate-bounce" />
        </div>
      </header>



      {/* Features Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Recursos Inovadores do Udel</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
              Descubra como o Udel transforma sua experiência de aprendizado com recursos únicos e envolventes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Gamepad}
              title="Gamificação Avançada"
              description="Aprenda enquanto se diverte com nosso sistema de gamificação"
              details={[
                "Sistema de pontos e níveis personalizáveis",
                "Conquistas e troféus para cada etapa do aprendizado",
                "Competições e desafios entre alunos e turmas",
                "Recompensas virtuais e benefícios reais para os melhores desempenhos"
              ]}
            />
            <FeatureCard
              icon={Users}
              title="Aprendizado Colaborativo"
              description="Conecte-se e aprenda com colegas de todo o mundo"
              details={[
                "Formação de grupos de estudo virtuais",
                "Fóruns de discussão temáticos",
                "Projetos colaborativos em tempo real",
                "Sistema de mentoria entre pares"
              ]}
            />
            <FeatureCard
              icon={Brain}
              title="Inteligência Artificial Personalizada"
              description="Aproveite um tutor virtual adaptativo para otimizar seu aprendizado"
              details={[
                "Análise de padrões de aprendizagem individuais",
                "Recomendações de conteúdo personalizadas",
                "Identificação de áreas de melhoria",
                "Ajuste dinâmico da dificuldade do conteúdo"
              ]}
            />
            <FeatureCard
              icon={Rocket}
              title="Trilhas de Aprendizado Customizadas"
              description="Crie seu próprio caminho educacional baseado em seus objetivos"
              details={[
                "Mapeamento de habilidades e competências",
                "Sugestão de cursos e recursos alinhados aos seus objetivos",
                "Acompanhamento de progresso em tempo real",
                "Certificações personalizadas por habilidades adquiridas"
              ]}
            />
            <FeatureCard
              icon={Target}
              title="Avaliação Contínua e Feedback"
              description="Receba insights valiosos sobre seu desempenho e progresso"
              details={[
                "Testes adaptativos baseados em IA",
                "Feedback detalhado e construtivo",
                "Análise de desempenho com visualizações interativas",
                "Sugestões personalizadas para melhorar áreas específicas"
              ]}
            />
            <FeatureCard
              icon={Puzzle}
              title="Microaprendizagem Interativa"
              description="Aprenda em pequenos módulos interativos e envolventes"
              details={[
                "Lições curtas e focadas para aprendizado rápido",
                "Quizzes interativos e jogos educativos",
                "Conteúdo multimídia adaptado para dispositivos móveis",
                "Notificações inteligentes para manter o engajamento"
              ]}
            />
          </div>
        </div>
      </section>

      {/* Clubs Section */}
      <section className="py-16 bg-zinc-900/50 backdrop-blur-sm border-t border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Clubes de Estudo</h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Junte-se a grupos de estudo temáticos e aprenda com pessoas que compartilham seus interesses
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300">
              <BookOpen className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Clube de Literatura</h3>
              <p className="text-zinc-400 mb-4">Discussões semanais sobre obras clássicas e contemporâneas</p>
              <span className="text-sm text-purple-400">32 membros ativos</span>
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300">
              <Target className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Clube de Matemática</h3>
              <p className="text-zinc-400 mb-4">Resolução de problemas e preparação para olimpíadas</p>
              <span className="text-sm text-purple-400">45 membros ativos</span>
            </div>
            <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300">
              <Star className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-white">Clube de Ciências</h3>
              <p className="text-zinc-400 mb-4">Experimentos práticos e discussões científicas</p>
              <span className="text-sm text-purple-400">28 membros ativos</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Medal className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Pronto para Começar Sua Jornada?
          </h2>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Junte-se a nossa comunidade de estudantes e transforme sua forma de aprender.
          </p>
          <Link href="/signup" passHref>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
              Criar Conta Grátis
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950/80 backdrop-blur-sm text-zinc-400 py-12 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Sobre Nós</h3>
              <p className="text-sm">
                Uma plataforma inovadora que combina aprendizado colaborativo com elementos de gamificação.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Clubes de Estudo</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Ranking</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Desafios</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Suporte</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-sm mb-4">
                Receba dicas de estudo e novidades da plataforma.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="bg-zinc-900/80 text-white px-4 py-2 rounded-lg flex-grow placeholder-zinc-500 border border-purple-500/20"
                />
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-sm">
            © {new Date().getFullYear()} Udel - Unindo Desenvolvimento e Evolução na Aprendizagem. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
