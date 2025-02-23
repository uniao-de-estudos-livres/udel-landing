import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';

export function HeroSection() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="relative h-screen flex items-center overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center relative z-10">
                    <Heart className="w-20 h-20 text-purple-400 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-400 mb-6">
                        Apoie a <span className="text-purple-400">Comunidade</span>
                    </h1>
                    <p className="text-xl sm:text-2xl text-zinc-400 mb-8 max-w-3xl mx-auto">
                        100% do valor é usado para manter nossa infraestrutura e criar eventos incríveis para a comunidade. Seja parte desta história!
                    </p>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto hover:bg-purple-700 transition-colors shadow-[0_0_15px_rgba(128,0,128,0.3)] hover:shadow-[0_0_30px_rgba(128,0,128,0.5)]">
                        Apoiar Agora <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black pointer-events-none" />
            <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
                <ChevronDown className="w-10 h-10 text-purple-400 animate-bounce" />
            </div>
        </header>
    );
}
