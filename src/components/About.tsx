import React from 'react';
import { ChurchSettings } from '../types';
import { ShieldCheck, Heart, Home, HandHeart, Sparkles, GraduationCap } from 'lucide-react';

interface AboutProps {
  settings: ChurchSettings;
}

export const About: React.FC<AboutProps> = ({ settings }) => {
  const values = [
    {
      icon: ShieldCheck,
      name: 'FE',
      desc: 'Creemos con convicción inquebrantable en las promesas del Dios vivo y en el poder redentor de su Palabra.'
    },
    {
      icon: Heart,
      name: 'AMOR',
      desc: 'El amor de Cristo es el motor de todo lo que hacemos; acogemos a cada alma con gracia y misericordia.'
    },
    {
      icon: Home,
      name: 'FAMILIA',
      desc: 'Defendemos y edificamos el núcleo familiar como el diseño sagrado de Dios para bendecir las generaciones.'
    },
    {
      icon: HandHeart,
      name: 'SERVICIO',
      desc: 'Servimos a nuestra iglesia y prójimo con alegría, humildad y dedicación desinteresada a imitación de Jesús.'
    },
    {
      icon: Sparkles,
      name: 'ORACIÓN',
      desc: 'La oración ferviente y la intercesión son nuestra respiración espiritual y el fundamento de cada victoria.'
    },
    {
      icon: GraduationCap,
      name: 'DISCIPULADO',
      desc: 'Formamos creyentes maduros y apasionados, capaces de instruir a otros y vivir el Evangelio en plenitud.'
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-gold-400"></span>
            <span>Quiénes Somos</span>
            <span className="w-8 h-[1px] bg-gold-400"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Somos una <span className="text-gold-gradient">Familia en Cristo</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            En ICM Portal de Gloria existimos para proclamar el Evangelio eterno de Jesucristo, 
            siendo un faro de esperanza, restauración y poder espiritual en medio de nuestra generación.
          </p>
        </div>

        {/* Mission & Vision Dual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-gold-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full blur-2xl group-hover:bg-gold-500/20 transition-all"></div>
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-2 block">
              Nuestra Misión
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Llevar Salvación y Restaurar Vidas
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed font-light">
              {settings.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-gold-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-bl-full blur-2xl group-hover:bg-gold-500/20 transition-all"></div>
            <span className="text-xs font-bold text-gold-400 tracking-widest uppercase mb-2 block">
              Nuestra Visión
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ser una Iglesia Viva que Impacta
            </h3>
            <p className="text-zinc-300 text-base leading-relaxed font-light">
              {settings.vision}
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="mb-8 text-center">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
            Nuestros Valores Centrales
          </h3>
          <p className="text-zinc-400 text-sm">
            Los pilares bíblicos que rigen nuestra vida congregacional y ministerio.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div 
                key={idx}
                className="bg-dark-900/60 border border-zinc-800/80 hover:border-gold-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-subtle group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-gold-500/20 flex items-center justify-center text-gold-400 group-hover:border-gold-400 group-hover:text-gold-300 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-gold-300 tracking-wider">
                    {val.name}
                  </h4>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
