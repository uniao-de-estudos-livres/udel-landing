import React from 'react';

export function Footer() {
    return (
        <footer className="bg-black backdrop-blur-sm text-zinc-400 py-12 border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
    );
}
