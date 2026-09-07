import React from 'react';
import { Logo } from './Logo';
import { ChevronDown, HeartHandshake, Sparkles, Flame } from 'lucide-react';

interface HeroProps {
  onOpenJoinModal: () => void;
  onOpenPrayerModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJoinModal, onOpenPrayerModal }) => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background High-Quality Spiritual Image with Dark Multi-Layer Gradient */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=85&w=2000')`,
        }}
      >
        {/* Layer 1: Dark radial vignette */}
        <div className="absolute inset-0 bg-radial-vignette opacity-80"></div>
        {/* Layer 2: Deep black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#09090b]/85 to-[#09090b]/70"></div>
        {/* Layer 3: Subtle Gold spiritual light beam */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gold-500/10 blur-[120px] pointer-events-none rounded-full"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Badge: Una Iglesia Viva */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-fade-in">
          <Flame className="w-4 h-4 text-gold-400 fill-gold-400" />
          <span>Una Familia Fundada en Cristo Jesús</span>
          <Sparkles className="w-3.5 h-3.5 text-gold-300" />
        </div>

        {/* Monumental Logo */}
        <div className="mb-6 flex justify-center">
          <Logo size="xl" showText={false} />
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          <span className="block text-gold-gradient tracking-[0.08em] drop-shadow-[0_4px_30px_rgba(212,175,55,0.35)]">
            ICM PORTAL DE GLORIA
          </span>
        </h1>

        {/* Slogan */}
        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl text-zinc-300 font-light mb-4 leading-relaxed">
          Un lugar para encontrarte con Dios, crecer en fe y caminar en comunidad.
        </p>

        {/* Second Highlighted Phrase */}
        <div className="relative inline-block mb-10">
          <span className="font-serif italic text-xl sm:text-2xl md:text-3xl text-gold-300 font-medium tracking-wide">
            “Hay un lugar para ti.”
          </span>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto mt-2"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          {/* Primary CTA: Quiero Ser Parte */}
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-sm tracking-widest uppercase transition-all duration-300 transform hover:-translate-y-1 hover:shadow-gold-lg focus:outline-none focus:ring-2 focus:ring-gold-400 flex items-center justify-center gap-2.5 group"
          >
            <span>Quiero Ser Parte</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>

          {/* Secondary CTA: Necesito Oración */}
          <button
            onClick={onOpenPrayerModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-900/80 hover:bg-dark-800 text-gold-300 font-bold text-sm tracking-widest uppercase border border-gold-500/40 hover:border-gold-400 transition-all duration-300 backdrop-blur-md transform hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(212,175,55,0.2)] focus:outline-none flex items-center justify-center gap-2.5"
          >
            <HeartHandshake className="w-4 h-4 text-gold-400" />
            <span>Necesito Oración</span>
          </button>
        </div>

        {/* Core Pillars Ribbon */}
        <div className="mt-14 pt-8 border-t border-zinc-800/80 w-full max-w-3xl flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-zinc-400 font-semibold tracking-widest uppercase">
          <span className="hover:text-gold-400 transition-colors">Fe</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-400 transition-colors">Esperanza</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-400 transition-colors">Amor</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-400 transition-colors">Familia</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-400 transition-colors">Oración</span>
          <span className="text-gold-500/40">•</span>
          <span className="hover:text-gold-400 transition-colors">Comunidad</span>
        </div>

      </div>

      {/* Scroll Down Indicator */}
      <a 
        href="#bienvenida"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gold-400/60 hover:text-gold-400 transition-colors flex flex-col items-center gap-1 group z-10"
        aria-label="Ir a la siguiente sección"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold text-zinc-500 group-hover:text-gold-400 transition-colors">Descubrir</span>
        <ChevronDown className="w-5 h-5 animate-bounce text-gold-400" />
      </a>
    </section>
  );
};
