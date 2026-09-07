import React from 'react';
import { ChurchSettings } from '../types';
import { MapPin, Navigation, ExternalLink, Phone, MessageCircle, Clock } from 'lucide-react';

interface LocationProps {
  settings: ChurchSettings;
}

export const Location: React.FC<LocationProps> = ({ settings }) => {
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, deseo conocer la ubicación exacta y cómo llegar a ICM Portal de Gloria.')}`;

  return (
    <section id="ubicacion" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <MapPin className="w-4 h-4" />
            <span>Sede Central</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Visítanos en <span className="text-gold-gradient">Nuestra Iglesia</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            Las puertas de ICM Portal de Gloria están abiertas de par en par para recibirte junto a tu familia. ¡Te esperamos!
          </p>
        </div>

        {/* Location Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Info Column */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-8 border border-gold-500/25 flex flex-col justify-between shadow-2xl">
            <div>
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-2">
                Información de Acceso
              </span>
              <h3 className="font-serif text-2xl font-bold text-white mb-6">
                ICM Portal de Gloria
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">Dirección</span>
                    <p className="text-zinc-200 font-medium">{settings.address}</p>
                    <p className="text-zinc-400 text-xs">{settings.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">Reunión Principal</span>
                    <p className="text-zinc-200 font-medium">Domingos de Celebración y Alabanza</p>
                    <p className="text-zinc-400 text-xs">Consulta horarios adicionales en la sección Servicios</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">Teléfono de Oficina</span>
                    <p className="text-zinc-200 font-medium">{settings.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-zinc-400 uppercase tracking-wider font-semibold block">WhatsApp Directo</span>
                    <p className="text-zinc-200 font-medium">{settings.whatsapp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row gap-3">
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-gold transition-all"
              >
                <Navigation className="w-4 h-4" />
                Cómo Llegar
              </a>

              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-dark-950 hover:bg-zinc-900 border border-zinc-700 text-zinc-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                Google Maps
              </a>
            </div>

          </div>

          {/* Interactive Map Embed */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-gold-500/25 shadow-2xl relative min-h-[380px] bg-dark-950">
            <iframe
              title="Ubicación ICM Portal de Gloria"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.03444983057!2d-69.9888874!3d18.4860575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf89f1107ea5ab%3A0xd6c587b826345260!2sSanto%20Domingo!5e0!3m2!1ses!2sdo!4v1700000000000!5m2!1ses!2sdo"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px', filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(90%)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>

      </div>
    </section>
  );
};
