import React from 'react';
import { HeartHandshake, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenJoinModal: () => void;
  onOpenPrayerModal: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenJoinModal, onOpenPrayerModal }) => {
  return (
    <section className="py-28 bg-[#09090b] relative overflow-hidden">
      {/* Background Image with Warm Golden Vignette Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1800')`,
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#09090b]/90 to-[#070708]"></div>
      
      {/* Gold Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gold-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Tu Nueva Familia en Cristo</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
          <span className="text-gold-gradient">“Hay un lugar para ti.”</span>
        </h2>

        <p className="font-serif italic text-xl sm:text-2xl text-zinc-200 mb-4 font-light">
          Conoce a Dios. Conecta con otros. Vive tu propósito.
        </p>

        <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Queremos caminar contigo, orar contigo y crecer juntos en Cristo. Da el primer paso hoy mismo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={onOpenJoinModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-widest hover:shadow-gold-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Quiero Ser Parte
          </button>

          <button
            onClick={onOpenPrayerModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-950 border border-gold-500/40 hover:bg-dark-800 text-gold-300 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          >
            <HeartHandshake className="w-4 h-4 text-gold-400" />
            Necesito Oración
          </button>
        </div>

      </div>
    </section>
  );
};
