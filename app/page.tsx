'use client';
import React, { useState } from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { DonationCTA } from '@/components/home/DonationCTA';
import { FeaturesSection } from '@/components/home/Features';
import { ClubsSection } from '@/components/home/ClubeSection';
import { SupportersTable, Supporter } from '@/components/donation/SupportersTable';
import { Footer } from '@/components/home/Footer';
import { NewsItem, NewsUpdates } from '@/components/home/NewsUpdates';

const recentSupporters: Supporter[] = [
  { name: "Maria Silva", amount: 150, message: "Adorei fazer parte desta comunidade incrível!", date: "2024-03-15", tier: "Lendário" },
  { name: "João Santos", amount: 50, message: "Continuem com o ótimo trabalho!", date: "2024-03-15", tier: "Entusiasta" },
  { name: "Ana Costa", amount: 200, message: "Feliz em poder contribuir com a comunidade!", date: "2024-03-14", tier: "Lendário" },
  { name: "Pedro Oliveira", amount: 25, message: "Ótima iniciativa!", date: "2024-03-14", tier: "Apoiador" },
  { name: "Lucas Mendes", amount: 100, message: "Parabéns pelo projeto!", date: "2024-03-13", tier: "Entusiasta" },
  { name: "Carla Souza", amount: 300, message: "Investindo no futuro da educação!", date: "2024-03-13", tier: "Lendário" },
  { name: "Roberto Alves", amount: 15, message: "Pequena contribuição para um grande projeto!", date: "2024-03-12", tier: "Apoiador" },
  { name: "Fernanda Lima", amount: 75, message: "Adorando os novos recursos!", date: "2024-03-12", tier: "Entusiasta" },
  { name: "Gabriel Santos", amount: 500, message: "Acreditando no potencial da plataforma!", date: "2024-03-11", tier: "Lendário" },
  { name: "Juliana Costa", amount: 20, message: "Feliz em ajudar!", date: "2024-03-11", tier: "Apoiador" }
];

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const supportersPerPage = 5;
  const totalPages = Math.ceil(recentSupporters.length / supportersPerPage);
  const indexOfLastSupporter = currentPage * supportersPerPage;
  const indexOfFirstSupporter = indexOfLastSupporter - supportersPerPage;
  const currentSupporters = recentSupporters.slice(indexOfFirstSupporter, indexOfLastSupporter);
  const newsData: NewsItem[] = [
    {
      id: '1',
      title: 'Lançamento do novo recurso de gamificação',
      date: '2024-04-01',
      summary: 'Conheça o novo sistema de pontos e conquistas que vai revolucionar sua experiência de aprendizado.',
      link: '/news/novo-recurso-gamificacao'
    },
    {
      id: '2',
      title: 'Atualização da plataforma: melhorias na interface',
      date: '2024-03-28',
      summary: 'Fizemos diversas melhorias na interface para tornar a navegação mais intuitiva e agradável.',
      link: '/news/atualizacao-interface'
    },
    {
      id: '3',
      title: 'Evento Especial: Hackathon Udel 2024',
      date: '2024-03-20',
      summary: 'Participe do nosso hackathon e mostre suas habilidades de programação e inovação.',
      link: '/news/hackathon-udel-2024'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <DonationCTA />
      <FeaturesSection />
      <ClubsSection />
      {/* <NewsUpdates news={newsData} /> */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SupportersTable
            supporters={currentSupporters}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </section> */}
      <Footer />
    </div>
  );
}

export default App;
