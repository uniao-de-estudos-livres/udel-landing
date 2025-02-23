import { Medal } from "lucide-react";
import Link from "next/link";

export function InviteSection() {
    return (
        < section className="py-16 relative overflow-hidden" >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-purple-900/10 pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <Medal className="w-16 h-16 text-purple-400 mx-auto mb-6" />
                <h2 className="text-4xl font-bold text-white mb-4">
                    Pronto para Começar Sua Jornada?
                </h2>
                <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
                    Junte-se a nossa comunidade de estudantes e transforme sua forma de aprender.
                </p>
                <Link href="#">
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
                        Criar Conta Grátis
                    </button>
                </Link>
            </div>
        </section >
    )
}