import React, { useState } from 'react';
import { DonationMethod } from '../types';
import { Heart, Copy, Check, QrCode, Building2, Info } from 'lucide-react';

interface DonationsProps {
  methods: DonationMethod[];
}

export const Donations: React.FC<DonationsProps> = ({ methods }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeMethods = methods.filter((m) => m.is_active);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="donaciones" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <Heart className="w-4 h-4 fill-gold-400/20" />
            <span>Generosidad y Diezmos</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Tu Generosidad <span className="text-gold-gradient">Transforma Vidas</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-8">
            Gracias por sembrar en la expansión del Reino de Dios y ser parte activa de todo lo que el Señor está haciendo a través de ICM Portal de Gloria.
          </p>

          <div className="inline-block p-4 rounded-2xl bg-dark-950 border border-gold-500/20 text-xs text-gold-200 font-serif italic">
            «Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre.» — 2 Corintios 9:7
          </div>
        </div>

        {/* Donation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {activeMethods.map((method) => (
            <div
              key={method.id}
              className="glass-panel rounded-3xl p-8 border border-gold-500/25 relative overflow-hidden flex flex-col justify-between group hover:border-gold-500/50 transition-all duration-300 shadow-xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-bl-full blur-2xl group-hover:bg-gold-500/15 transition-all"></div>

              <div>
                {/* Method Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:border-gold-400">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold-300 transition-colors">
                      {method.bank_name}
                    </h3>
                    <span className="text-xs text-zinc-400 font-medium">
                      {method.account_type}
                    </span>
                  </div>
                </div>

                {/* Account Details Box */}
                <div className="bg-dark-950/80 p-5 rounded-2xl border border-zinc-800/80 space-y-3 mb-6">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold block">
                      Número de Cuenta
                    </span>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <span className="font-mono text-sm sm:text-base font-bold text-gold-300 tracking-wider">
                        {method.account_number}
                      </span>
                      <button
                        onClick={() => handleCopy(method.account_number, method.id)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-gold-500 hover:text-dark-950 text-zinc-400 text-xs flex items-center gap-1 transition-all border border-zinc-800"
                        title="Copiar número"
                      >
                        {copiedId === method.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400 font-semibold">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800/60 text-xs">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Titular</span>
                      <span className="font-medium text-zinc-200">{method.account_holder}</span>
                    </div>
                    {method.id_number && (
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Identificación</span>
                        <span className="font-medium text-zinc-200">{method.id_number}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Instructions */}
                {method.instructions && (
                  <div className="flex items-start gap-2.5 text-xs text-zinc-400 mb-6 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800/50">
                    <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span>{method.instructions}</span>
                  </div>
                )}
              </div>

              {/* QR Preview or Action */}
              <div className="pt-2">
                <button
                  onClick={() => handleCopy(method.account_number, method.id)}
                  className="w-full py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-gold transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copiar Datos Bancarios
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Note on Transparency */}
        <div className="mt-14 text-center text-xs text-zinc-500 max-w-md mx-auto">
          Cada donación es administrada con fidelidad, transparencia e integridad bíblica para bendecir familias, comunidades y la predicación del Evangelio.
        </div>

      </div>
    </section>
  );
};
