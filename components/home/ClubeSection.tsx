import React from 'react';
import { BookOpen, Target, Star } from 'lucide-react';

export function ClubsSection() {
    return (
        <section className="py-16 bg-gradient-to-b from-purple-900/20 to-black/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-white mb-4">Clubes de Estudo</h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Junte-se a grupos de estudo temáticos e aprenda com pessoas que compartilham seus interesses.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg">
                        <BookOpen className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Clube de Literatura</h3>
                        <p className="text-zinc-400 mb-4">Discussões semanais sobre obras clássicas e contemporâneas</p>
                    </div>
                    <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg">
                        <Target className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Clube de Matemática</h3>
                        <p className="text-zinc-400 mb-4">Resolução de problemas e preparação para olimpíadas</p>
                    </div>
                    <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 shadow transition-all duration-300 hover:shadow-lg">
                        <Star className="w-12 h-12 text-purple-400 mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-white">Clube de Ciências</h3>
                        <p className="text-zinc-400 mb-4">Experimentos práticos e discussões científicas</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
