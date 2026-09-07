import React from 'react';
import { Home, MapPin, HeartHandshake, MessageCircle, Heart } from 'lucide-react';

interface MobileBottomNavProps {
  onOpenJoinModal: () => void;
  onOpenPrayerModal: () => void;
  whatsappNumber: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenJoinModal,
  onOpenPrayerModal,
  whatsappNumber,
}) => {
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hola, quisiera obtener información sobre ICM Portal de Gloria.')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090b]/95 backdrop-blur-xl border-t border-gold-500/20 px-2 py-2 sm:hidden flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.8)]">
      
      {/* Inicio */}
      <button
        onClick={() => scrollTo('inicio')}
        className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-gold-400"
      >
        <Home className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Inicio</span>
      </button>

      {/* Ubicación */}
      <button
        onClick={() => scrollTo('ubicacion')}
        className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-gold-400"
      >
        <MapPin className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Visítanos</span>
      </button>

      {/* Central Highlighted Button: QUIERO SER PARTE */}
      <div className="-mt-6 flex flex-col items-center">
        <button
          onClick={onOpenJoinModal}
          className="w-12 h-12 rounded-full bg-gold-gradient text-dark-950 flex items-center justify-center shadow-gold border-2 border-[#09090b] active:scale-95 transition-transform"
          aria-label="Quiero ser parte"
        >
          <Heart className="w-6 h-6 fill-dark-950 stroke-none" />
        </button>
        <span className="text-[8px] font-bold text-gold-300 uppercase tracking-wider mt-1">Ser Parte</span>
      </div>

      {/* Oración */}
      <button
        onClick={onOpenPrayerModal}
        className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-gold-400"
      >
        <HeartHandshake className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">Oración</span>
      </button>

      {/* WhatsApp */}
      <button
        onClick={openWhatsApp}
        className="flex flex-col items-center justify-center p-1 text-zinc-400 hover:text-green-400"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-[9px] uppercase tracking-wider font-medium mt-0.5">WhatsApp</span>
      </button>

    </div>
  );
};
