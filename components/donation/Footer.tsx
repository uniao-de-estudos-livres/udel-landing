import React from 'react';

export function Footer() {
    return (
        <footer className="bg-zinc-950/80 backdrop-blur-sm text-zinc-400 py-12 border-t border-purple-500/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="mb-4">
                    Todas as doações são processadas de forma segura e transparente. Os relatórios financeiros são atualizados mensalmente.
                </p>
                <p className="text-sm">
                    © {new Date().getFullYear()} Udel - União dos estudantes livres. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    );
}
