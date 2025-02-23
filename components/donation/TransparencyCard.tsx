import React from 'react';

interface TransparencyCardProps {
  title: string;
  value: string;
  description: string;
}

export function TransparencyCard({ title, value, description }: TransparencyCardProps) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <div className="text-2xl font-bold text-purple-400 mb-2">{value}</div>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  );
}
