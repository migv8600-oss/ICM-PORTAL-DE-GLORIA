import React from 'react';
import { BookOpen, Users, Compass } from 'lucide-react';

export const Welcome: React.FC = () => {
  const cards = [
    {
      icon: Compass,
      title: 'CONOCE A DIOS',
      subtitle: 'Crece en una relación personal con Dios.',
      description: 'Descubre el amor transformador de Jesucristo. No se trata de religión, sino de una relación viva y diaria que llena tu vida de propósito eterno.',
    },
    {
      icon: BookOpen,
      title: 'CRECE EN FE',
      subtitle: 'Aprende, descubre y fortalece tu vida espiritual.',
      description: 'A través de la enseñanza bíblica y el discipulado continuo, desarrollarás cimientos firmes para enfrentar cada etapa de tu vida en victoria.',
    },
    {
      icon: Users,
      title: 'VIVE EN COMUNIDAD',
      subtitle: 'Camina junto a otros creyentes y encuentra una familia.',
      description: 'No estás solo en tu camino. Aquí encontrarás hermanos que te aman, oran por ti y celebran contigo cada una de las victorias que Dios te concede.',
    },
  ];

  return (
    <section id="bienvenida" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Glow ambient */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-gold-400"></span>
            <span>Nuestra Bienvenida</span>
            <span className="w-8 h-[1px] bg-gold-400"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Bienvenido a <span className="text-gold-gradient">Portal de Gloria</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            Somos una familia en Cristo comprometida con conocer a Dios, crecer en nuestra fe, 
            fortalecer nuestras familias y compartir el amor incondicional de Jesús con toda nuestra comunidad.
          </p>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-hover rounded-2xl p-8 relative group overflow-hidden border border-gold-500/15"
              >
                {/* Subtle top golden light line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400/40 to-transparent group-hover:via-gold-400 transition-all"></div>

                {/* Card Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:border-gold-400 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <Icon className="w-7 h-7 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="font-serif text-xl font-bold text-white mb-2 tracking-wide group-hover:text-gold-300 transition-colors">
                  {card.title}
                </h3>

                {/* Subtitle */}
                <p className="text-gold-400 font-medium text-sm mb-4 leading-snug">
                  "{card.subtitle}"
                </p>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Biblical Promise Quote */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-dark-950/60 border border-gold-500/20">
          <p className="font-serif italic text-base text-zinc-300 mb-2">
            «Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.»
          </p>
          <span className="text-gold-400 text-xs font-semibold tracking-wider uppercase">
            — Mateo 18:20
          </span>
        </div>
      </div>
    </section>
  );
};
