import React from 'react';
import { BarChart3 } from 'lucide-react';

export interface Supporter {
    photo?: string;
    name: string;
    amount: number;
    message: string;
    date: string;
    tier: string;
}

interface SupportersTableProps {
    supporters: Supporter[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function SupportersTable({ supporters, currentPage, totalPages, onPageChange }: SupportersTableProps) {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-purple-500/20">
                            <th className="text-left py-4 px-6 text-purple-400">Foto</th>
                            <th className="text-left py-4 px-6 text-purple-400">Nome</th>
                            <th className="text-left py-4 px-6 text-purple-400">Tier</th>
                            <th className="text-left py-4 px-6 text-purple-400">Valor</th>
                            <th className="text-left py-4 px-6 text-purple-400">Data</th>
                            <th className="text-left py-4 px-6 text-purple-400">Mensagem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supporters.map((supporter, index) => (
                            <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                                <td className="py-4 px-6">
                                    {supporter.photo ? (
                                        <img
                                            src={supporter.photo}
                                            alt={supporter.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white">
                                            {supporter.name.charAt(0)}
                                        </div>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-white">{supporter.name}</td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${supporter.tier === 'Lendário'
                                                ? 'bg-purple-500/20 text-purple-300'
                                                : supporter.tier === 'Entusiasta'
                                                    ? 'bg-blue-500/20 text-blue-300'
                                                    : 'bg-green-500/20 text-green-300'
                                            }`}
                                    >
                                        {supporter.tier}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-purple-400">R$ {supporter.amount.toFixed(2)}</td>
                                <td className="py-4 px-6 text-zinc-400">{new Date(supporter.date).toLocaleDateString()}</td>
                                <td className="py-4 px-6 text-zinc-300 italic">"{supporter.message}"</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i + 1)}
                        className={`px-4 py-2 rounded-lg transition-colors ${currentPage === i + 1
                                ? 'bg-purple-600 text-white'
                                : 'bg-zinc-800 text-zinc-400 hover:bg-purple-500/20'
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
