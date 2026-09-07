import React from 'react';
import { Logo } from './Logo';
import { ChurchSettings } from '../types';
import { Shield, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  settings: ChurchSettings;
  onNavigateAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigateAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const links = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Pastores', href: '#pastores' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Células', href: '#celulas' },
    { label: 'Intercesión', href: '#intercesion' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Donaciones', href: '#donaciones' },
    { label: 'Ubicación', href: '#ubicacion' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="bg-[#050506] border-t border-gold-500/20 pt-16 pb-28 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Logo & Slogan */}
          <div className="space-y-4">
            <Logo size="md" />
            <p className="text-gold-400 font-serif italic text-sm">
              «Una familia en Cristo.»
            </p>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              {settings.slogan}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-gold-gradient">
              Navegación
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {links.map((lnk) => (
                <a
                  key={lnk.label}
                  href={lnk.href}
                  className="text-zinc-400 hover:text-gold-400 transition-colors py-1"
                >
                  {lnk.label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Contact */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-gold-gradient">
              Contacto y Sede
            </h4>
            <ul className="space-y-3 text-xs text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>{settings.address}, {settings.city}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span>{settings.phone}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                <span className="truncate">{settings.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Redes & Admin */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 text-gold-gradient">
              Conéctate
            </h4>
            <div className="flex flex-wrap gap-2 text-xs mb-6">
              <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 transition-colors">
                Facebook
              </a>
              <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 transition-colors">
                Instagram
              </a>
              <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 transition-colors">
                TikTok
              </a>
              <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 transition-colors">
                YouTube
              </a>
            </div>

            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-gold-400 transition-colors p-2 rounded-lg hover:bg-zinc-900/60"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Portal de Administración</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 ICM Portal de Gloria. Todos los derechos reservados.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
