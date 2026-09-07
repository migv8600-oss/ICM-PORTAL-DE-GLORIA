import React, { useState } from 'react';
import { ChurchEvent } from '../types';
import { Calendar, Clock, MapPin, Info, X } from 'lucide-react';

interface EventsProps {
  events: ChurchEvent[];
}

export const Events: React.FC<EventsProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<ChurchEvent | null>(null);
  const publishedEvents = events.filter((e) => e.is_published);

  return (
    <section id="eventos" className="py-24 bg-[#09090b] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-gold-400"></span>
            <span>Calendario de Actividades</span>
            <span className="w-8 h-[1px] bg-gold-400"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Próximos <span className="text-gold-gradient">Eventos</span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
            No te pierdas ninguna de nuestras conferencias, vigilias y retiros. ¡Prepara tu corazón para lo que Dios hará!
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-panel rounded-3xl overflow-hidden border border-gold-500/20 group hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Event Cover Image */}
                <div className="relative h-52 overflow-hidden bg-zinc-900">
                  <img
                    src={evt.image_url}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30"></div>
                  
                  {/* Date badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/80 backdrop-blur-md border border-gold-500/40 text-gold-300 text-xs font-bold uppercase tracking-wider">
                      <Calendar className="w-3 h-3 text-gold-400" />
                      {evt.date}
                    </span>
                  </div>
                </div>

                {/* Event Body */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors line-clamp-2">
                    {evt.title}
                  </h3>

                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-2 mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-2 text-xs text-zinc-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold-400" />
                      <span>{evt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold-400" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedEvent(evt)}
                  className="w-full py-2.5 rounded-full border border-gold-500/30 hover:bg-gold-500 hover:text-dark-950 text-gold-300 font-semibold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Info className="w-3.5 h-3.5" />
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-dark-900 border border-gold-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-gold overflow-hidden">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-dark-950 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedEvent.image_url}
              alt={selectedEvent.title}
              className="w-full h-48 rounded-2xl object-cover border border-gold-500/20 mb-6"
            />

            <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-2">
              Detalles del Evento
            </span>
            <h3 className="font-serif text-2xl font-bold text-white mb-4">
              {selectedEvent.title}
            </h3>

            <div className="bg-dark-950 p-4 rounded-2xl border border-zinc-800 space-y-2 text-xs text-zinc-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gold-400" />
                <span className="font-semibold text-white">Fecha:</span> {selectedEvent.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-400" />
                <span className="font-semibold text-white">Hora:</span> {selectedEvent.time}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span className="font-semibold text-white">Lugar:</span> {selectedEvent.location}
              </div>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line font-light mb-6">
              {selectedEvent.description}
            </p>

            <button
              onClick={() => setSelectedEvent(null)}
              className="w-full py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
