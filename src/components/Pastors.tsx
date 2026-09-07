import React, { useState } from 'react';
import { Pastor } from '../types';
import { HeartHandshake, X } from 'lucide-react';

interface PastorsProps {
  pastors: Pastor[];
}

export const Pastors: React.FC<PastorsProps> = ({ pastors }) => {
  const [selectedPastor, setSelectedPastor] = useState<Pastor | null>(null);

  return (
    <section id="pastores" className="py-24 bg-[#09090b] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-gold-400"></span>
            <span>Liderazgo Pastoral</span>
            <span className="w-8 h-[1px] bg-gold-400"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros <span className="text-gold-gradient">Pastores</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            Guiando la congregación con corazón de siervos, unción del Espíritu Santo y entrega incondicional a la Palabra de Dios.
          </p>
        </div>

        {/* Pastors Large Dual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {pastors.map((pastor) => (
            <div
              key={pastor.id}
              className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 group hover:border-gold-500/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Elegant Overlay */}
              <div className="relative h-96 sm:h-[420px] overflow-hidden bg-zinc-900">
                <img
                  src={pastor.image_url}
                  alt={pastor.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/30 to-transparent"></div>
                
                {/* Badge on Photo */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 rounded-full bg-dark-950/80 border border-gold-500/40 text-gold-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md mb-2">
                    {pastor.role}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-white tracking-wide">
                    {pastor.name}
                  </h3>
                </div>
              </div>

              {/* Bio Preview & Action */}
              <div className="p-8 flex-1 flex flex-col justify-between bg-dark-900/60">
                <p className="text-zinc-300 text-sm leading-relaxed font-light mb-6 line-clamp-3">
                  {pastor.bio}
                </p>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium">ICM Portal de Gloria</span>
                  <button
                    onClick={() => setSelectedPastor(pastor)}
                    className="px-5 py-2 rounded-full border border-gold-500/40 hover:bg-gold-500 hover:text-dark-950 text-gold-300 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    Conocer Más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedPastor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-dark-900 border border-gold-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-gold overflow-hidden">
            <button
              onClick={() => setSelectedPastor(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-dark-950 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-6">
              <img
                src={selectedPastor.image_url}
                alt={selectedPastor.name}
                className="w-28 h-28 rounded-2xl object-cover border-2 border-gold-500/40 shadow-lg"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-1">
                  {selectedPastor.role}
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-1">
                  {selectedPastor.name}
                </h3>
                <span className="text-xs text-zinc-400">
                  Liderazgo Apostólico & Pastoral
                </span>
              </div>
            </div>

            <div className="bg-dark-950/80 p-5 rounded-2xl border border-zinc-800 mb-6">
              <h4 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-2">Biografía Pastoral</h4>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-light">
                {selectedPastor.bio}
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedPastor(null)}
                className="px-6 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
