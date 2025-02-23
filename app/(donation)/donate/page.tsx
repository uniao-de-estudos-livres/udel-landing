'use client';
import React, { useState } from 'react';
import { HeroSection } from '@/components/donation/HeroSection';
import { DonationTier } from '@/components/donation/DonationTier';
import { TransparencyCard } from '@/components/donation/TransparencyCard';
import { SupportersTable, Supporter } from '@/components/donation/SupportersTable';
import { Footer } from '@/components/donation/Footer';
import { BarChart3, GiftIcon, SparkleIcon, TrophyIcon } from 'lucide-react';

const recentSupporters: Supporter[] = [
    { name: "Astaroth", amount: 600, message: "Confio nesse projeto e quero que ele cresça ainda mais!", date: "2024-03-15", tier: "Lendário" },
];

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const supportersPerPage = 5;
    const totalPages = Math.ceil(recentSupporters.length / supportersPerPage);
    const indexOfLastSupporter = currentPage * supportersPerPage;
    const indexOfFirstSupporter = indexOfLastSupporter - supportersPerPage;
    const currentSupporters = recentSupporters.slice(indexOfFirstSupporter, indexOfLastSupporter);

    return (
        <div className="min-h-screen bg-black text-white">
            <HeroSection />
            <section className="py-16 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-purple-900/30 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Transparência Total</h2>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                            Acompanhe em tempo real como os recursos são utilizados para manter e melhorar nossa comunidade
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <TransparencyCard title="Infraestrutura" value="R$ 2.450,00" description="Custos mensais com servidores, banco de dados e CDN" />
                        <TransparencyCard title="Eventos" value="R$ 1.800,00" description="Investimento em hackathons e encontros da comunidade" />
                        <TransparencyCard title="Apoiadores" value="312" description="Número de pessoas que apoiam mensalmente" />
                        <TransparencyCard title="Doações Totais" value="R$ 4.850,00" description="Total arrecadado no último mês" />
                    </div>
                    <div className="text-center">
                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
                            <BarChart3 className="w-5 h-5" />
                            Ver relatório financeiro completo
                        </a>
                    </div>
                </div>
            </section>
            <section className="py-20 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 to-black pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Escolha Como Apoiar</h2>
                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                            Contribua com qualquer valor e receba recompensas exclusivas, puramente cosméticas
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <DonationTier
                            icon={GiftIcon}
                            title="Apoiador"
                            minAmount={10}
                            maxAmount={30}
                            benefits={[
                                "Badge exclusivo no perfil",
                                "Moldura personalizada",
                                "Emojis exclusivos no chat",
                                "Nome colorido nas discussões"
                            ]}
                        />
                        <DonationTier
                            icon={TrophyIcon}
                            title="Entusiasta"
                            minAmount={30}
                            maxAmount={120}
                            benefits={[
                                "Todos os benefícios anteriores",
                                "Efeitos visuais no perfil",
                                "Temas exclusivos de interface",
                                "Emblemas colecionáveis",
                                "Mensagem personalizada no perfil"
                            ]}
                            recommended={true}
                        />
                        <DonationTier
                            icon={SparkleIcon}
                            title="Lendário"
                            minAmount={120}
                            benefits={[
                                "Todos os benefícios anteriores",
                                "Animações exclusivas de perfil",
                                "Criação de emblemas personalizados",
                                "Efeitos especiais no chat",
                                "Status destacado na comunidade"
                            ]}
                        />
                    </div>
                </div>
            </section>
            <section className="py-16 bg-gradient-to-b from-black/90 to-purple-900/20 pointer-events-none">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Últimos Apoiadores</h2>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Pessoas incríveis que ajudam a manter nossa comunidade
                        </p>
                    </div>
                    <SupportersTable
                        supporters={currentSupporters}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default App;
