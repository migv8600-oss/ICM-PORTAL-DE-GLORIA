import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Menu, X, Heart, Shield } from 'lucide-react';

interface HeaderProps {
  onOpenJoinModal: () => void;
  onNavigateAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenJoinModal, onNavigateAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md py-3 border-b border-gold-500/20 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="group">
          <Logo size="sm" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-zinc-300 hover:text-gold-400 transition-colors duration-200 tracking-wide hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenJoinModal}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-gold-400"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700 rounded-full animate-pulse opacity-75 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative block px-5 py-2 rounded-full bg-dark-950 font-semibold text-xs text-gold-300 tracking-widest uppercase transition-all duration-300 group-hover:bg-gold-500 group-hover:text-dark-950 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-gold-400 group-hover:text-dark-950 fill-current" />
              Quiero Ser Parte
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={onOpenJoinModal}
            className="sm:hidden px-3 py-1.5 rounded-full bg-gold-500 text-dark-950 font-bold text-[11px] tracking-wider uppercase"
          >
            Ser Parte
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-300 hover:text-gold-400 hover:bg-zinc-800/60 focus:outline-none"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-gold-400" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#09090b]/98 backdrop-blur-xl border-b border-gold-500/30 px-6 py-6 transition-all animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-zinc-200 hover:text-gold-400 font-medium py-1.5 border-b border-zinc-800/50 flex items-center justify-between text-base"
              >
                <span>{link.label}</span>
                <span className="text-gold-500/40 text-xs">→</span>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-sm tracking-wider uppercase shadow-gold"
              >
                Quiero Ser Parte
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateAdmin();
                }}
                className="w-full py-2.5 rounded-full bg-zinc-900 text-zinc-400 hover:text-gold-400 text-xs flex items-center justify-center gap-2 border border-zinc-800"
              >
                <Shield className="w-3.5 h-3.5" /> Acceso Administrativo
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
