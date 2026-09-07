import React, { useState } from 'react';
import { MessageCircle, X, Users, Flame, HeartHandshake, Info } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');

  const options = [
    {
      title: 'Información General',
      desc: 'Conoce sobre horarios, ubicación y cultos.',
      icon: Info,
      msg: 'Hola, quisiera obtener información sobre ICM Portal de Gloria.',
    },
    {
      title: 'Unirme a una Célula',
      desc: 'Quiero integrarme a un grupo de hogar.',
      icon: Users,
      msg: 'Hola, quiero información para unirme a una célula de ICM Portal de Gloria.',
    },
    {
      title: 'Ministerio de Intercesión',
      desc: 'Deseo postularme al equipo de oración.',
      icon: Flame,
      msg: 'Hola, quiero información para unirme al grupo de intercesión.',
    },
    {
      title: 'Petición de Oración',
      desc: 'Necesito que oren por mí o mi familia.',
      icon: HeartHandshake,
      msg: 'Hola, quisiera enviar una petición de oración.',
    },
  ];

  const handleOpenChat = (message: string) => {
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-8 right-5 z-40">
      {/* Quick Menu Popover */}
      {isOpen && (
        <div className="mb-3 w-80 bg-dark-900/95 backdrop-blur-xl border border-gold-500/30 rounded-3xl p-5 shadow-gold animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
              <span className="text-xs font-bold text-white tracking-wider uppercase">WhatsApp Oficial</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-zinc-400 mb-3 leading-snug">
            ¿En qué podemos servirte hoy? Elige una opción para chatear directamente:
          </p>

          <div className="space-y-2">
            {options.map((opt, i) => {
              const Icon = opt.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleOpenChat(opt.msg)}
                  className="w-full text-left p-2.5 rounded-xl bg-dark-950 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-gold-500/40 transition-all flex items-start gap-3 group"
                >
                  <div className="p-1.5 rounded-lg bg-zinc-900 group-hover:bg-gold-500/20 text-gold-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white group-hover:text-gold-300 block">
                      {opt.title}
                    </span>
                    <span className="text-[10px] text-zinc-400 block leading-tight">
                      {opt.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-600 via-green-500 to-emerald-400 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white/20 focus:outline-none"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
      </button>
    </div>
  );
};
