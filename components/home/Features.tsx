import React from 'react';
import { Gamepad, Users, Brain, Rocket, Target, Puzzle } from 'lucide-react';
import { FeatureCard } from '@/components/home/FeatureCard'; // Você pode extrair o FeatureCard para seu próprio arquivo se desejar

export function FeaturesSection() {
    return (
        <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-purple-900/20 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-4">Recursos Inovadores da Udel</h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Descubra como a Udel transforma sua experiência de aprendizado com recursos únicos e envolventes.
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
    );
}
