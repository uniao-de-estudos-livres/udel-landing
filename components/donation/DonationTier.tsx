import React, { useState } from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';

interface DonationTierProps {
    icon: React.ElementType;
    title: string;
    minAmount: number;
    maxAmount?: number;
    benefits: string[];
    recommended?: boolean;
}

export function DonationTier({ icon: Icon, title, minAmount, maxAmount, benefits, recommended = false }: DonationTierProps) {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [customAmount, setCustomAmount] = useState(minAmount.toString());
    const [error, setError] = useState('');

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setCustomAmount(e.target.value);

        if (value < minAmount) {
            setError(`Valor mínimo é R$ ${minAmount}`);
        } else if (maxAmount && value > maxAmount) {
            setError(`Valor máximo é R$ ${maxAmount}`);
        } else {
            setError('');
        }
    };

    return (
        <div className={`relative bg-zinc-900/80 backdrop-blur-sm p-8 rounded-xl border ${recommended ? 'border-purple-500' : 'border-zinc-800'} shadow-[0_0_15px_rgba(128,0,128,0.1)] hover:shadow-[0_0_30px_rgba(128,0,128,0.2)] transition-all duration-300`}>
            {recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Popular
                    </span>
                </div>
            )}
            <Icon className={`w-12 h-12 ${recommended ? 'text-purple-400' : 'text-zinc-400'} mb-4`} />
            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-zinc-400 mb-4">
                {maxAmount
                    ? `R$ ${minAmount} - R$ ${maxAmount}`
                    : `A partir de R$ ${minAmount}`}
            </p>
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="number"
                        value={customAmount}
                        onChange={handleAmountChange}
                        className={`w-full bg-zinc-800 text-white px-4 py-2 pr-16 rounded border ${error ? 'border-red-500' : 'border-purple-500/20'
                            } text-xl font-bold appearance-none`}
                        // Para Firefox, remova os spinners com esse estilo inline (ou adicione no CSS global)
                        style={{ MozAppearance: 'textfield' }}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">BRL</span>
                </div>
                {error && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </p>
                )}
            </div>
            <div className="space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Seu nome (opcional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-purple-500/20 placeholder-zinc-500"
                />
                <textarea
                    placeholder="Sua mensagem (opcional)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-2 rounded border border-purple-500/20 placeholder-zinc-500 resize-none h-24"
                />
            </div>
            <ul className="space-y-3 mb-6">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start text-zinc-300">
                        <Sparkles className="w-5 h-5 text-purple-400 mr-2 mt-1 flex-shrink-0" />
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
            <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${error
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : recommended
                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                        : 'border border-purple-500 text-purple-400 hover:bg-purple-500/10'
                    }`}
                disabled={!!error}
            >
                Apoiar o Projeto
            </button>
        </div>
    );
}
