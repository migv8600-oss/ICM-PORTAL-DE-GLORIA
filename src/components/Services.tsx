import React from 'react';
import { ChurchService } from '../types';
import { Calendar, Clock, MapPin, Bell } from 'lucide-react';

interface ServicesProps {
  services: ChurchService[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
  const activeServices = services.filter((s) => s.is_active);

  return (
    <section id="servicios" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <span className="w-8 h-[1px] bg-gold-400"></span>
            <span>Reuniones y Cultos</span>
            <span className="w-8 h-[1px] bg-gold-400"></span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Únete a Nuestros <span className="text-gold-gradient">Servicios</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            Tenemos un espacio especial preparado para cada miembro de la familia. Ven con la expectativa de ser tocado por la gloria de Dios.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeServices.map((service) => (
            <div
              key={service.id}
              className="bg-dark-900/80 border border-zinc-800/80 hover:border-gold-500/40 rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-gold flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Golden Light bar on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/0 group-hover:via-gold-500 transition-all duration-500"></div>

              <div>
                {/* Day Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-wider uppercase">
                    <Calendar className="w-3 h-3" />
                    {service.day}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">ICM Portal</span>
                </div>

                {/* Service Name */}
                <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed font-light mb-6">
                  {service.description}
                </p>
              </div>

              {/* Service Details Footer */}
              <div className="pt-4 border-t border-zinc-800/60 flex flex-col gap-2.5">
                <div className="flex items-center text-xs text-zinc-300 gap-2">
                  <Clock className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span className="font-medium">{service.time}</span>
                </div>
                <div className="flex items-center text-xs text-zinc-300 gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                  <span>{service.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Note on editable schedules */}
        <div className="mt-12 text-center text-xs text-zinc-500">
          * Los horarios y sedes pueden confirmarse o consultarse a través de nuestro número de WhatsApp oficial.
        </div>

      </div>
    </section>
  );
};
