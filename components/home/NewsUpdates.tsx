import React from 'react';

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    summary: string;
    link: string;
}

interface NewsUpdatesProps {
    news: NewsItem[];
}

export function NewsUpdates({ news }: NewsUpdatesProps) {
    return (
        <section className="py-16 bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">Novidades e Atualizações</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {news.map((item) => (
                        <div
                            key={item.id}
                            className="bg-zinc-800 p-6 rounded-xl border border-purple-500/20 shadow-lg transition-colors hover:bg-zinc-700"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-zinc-400 mb-4">{new Date(item.date).toLocaleDateString()}</p>
                            <p className="text-zinc-300 mb-4">{item.summary}</p>
                            <a
                                href={item.link}
                                className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                            >
                                Leia mais &rarr;
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
