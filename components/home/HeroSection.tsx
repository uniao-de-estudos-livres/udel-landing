import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';
import Link from 'next/link';

export function HeroSection() {
    const [scrolled, setScrolled] = useState(false);
    const discord_link = "https://discord.com/invite/f282KUYmWk";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="relative h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-6">
                            Udel: Unindo <span className="text-purple-400">Desenvolvimento e Evolução na Aprendizagem</span>
                        </h1>
                        <p className="text-xl sm:tex-xl text-zinc-400 mb-8">
                            Transforme sua jornada educacional com uma plataforma que combina colaboração, gamificação e inovação para um aprendizado mais eficiente e envolvente.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/signup" passHref>
                                <button className="w-full justify-center sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
                                    NEW GAME <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <button onClick={() => window.open(discord_link)} className="w-full sm:w-auto border border-purple-500 text-purple-400 px-8 py-3 rounded-lg font-semibold hover:bg-purple-500/10 transition-all">
                                Conhecer mais
                            </button>
                        </div>
                    </div>
                    {/* Logo */}
                    <div className="flex justify-center lg:justify-end">
                        <Logo variant="white" className='w-full max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]"' />
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
                <ChevronDown className="w-10 h-10 text-purple-400 animate-bounce" />
            </div>
        </header>
    );
}
