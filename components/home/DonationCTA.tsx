"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Para funcionar, precisamos de uma classe .neon-border com keyframes
// (Explicação logo abaixo)
export function DonationCTA() {
    return (
        <section className="py-16 bg-black ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Contêiner com borda e posição relativa */}
                <div className="relative p-8 rounded-xl overflow-hidden text-center">
                    {/* Camada absoluta que aplica o efeito de "neon" animado */}
                    <div className="absolute inset-0 pointer-events-none rounded-xl" />

                    {/* Conteúdo real, acima da camada animada */}
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold text-white mb-4">Faça sua Doação</h2>
                        <p className="text-xl text-zinc-400 mb-8 max-w-3xl mx-auto">
                            Sua contribuição ajuda a manter nossa infraestrutura e a criar novos eventos para a comunidade.
                        </p>
                        <Link href="/donate">
                            <p className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
                                Doar Agora <ArrowRight className="w-5 h-5" />
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
