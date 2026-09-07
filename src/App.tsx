import React, { useState, useEffect } from 'react';
import { dataService, defaultSettings, defaultPastors, defaultServices, defaultEvents, defaultDonations, defaultGallery } from './lib/dataService';
import { ChurchSettings, Pastor, ChurchService, ChurchEvent, DonationMethod, GalleryItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Welcome } from './components/Welcome';
import { About } from './components/About';
import { Pastors } from './components/Pastors';
import { Services } from './components/Services';
import { Events } from './components/Events';
import { Cells } from './components/Cells';
import { Intercession } from './components/Intercession';
import { Prayer } from './components/Prayer';
import { Donations } from './components/Donations';
import { Gallery } from './components/Gallery';
import { Location } from './components/Location';
import { Contact } from './components/Contact';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AdminPanel } from './components/Admin/AdminPanel';
import { X, Users, Flame, MessageCircle, Heart } from 'lucide-react';

export function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    return window.location.pathname.includes('/admin') || window.location.hash === '#admin';
  });

  const [settings, setSettings] = useState<ChurchSettings>(defaultSettings);
  const [pastors, setPastors] = useState<Pastor[]>(defaultPastors);
  const [services, setServices] = useState<ChurchService[]>(defaultServices);
  const [events, setEvents] = useState<ChurchEvent[]>(defaultEvents);
  const [donations, setDonations] = useState<DonationMethod[]>(defaultDonations);
  const [gallery, setGallery] = useState<GalleryItem[]>(defaultGallery);

  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [prayerModalOpen, setPrayerModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [s, p, srv, evts, don, gal] = await Promise.all([
          dataService.getSettings(),
          dataService.getPastors(),
          dataService.getServices(),
          dataService.getEvents(),
          dataService.getDonations(),
          dataService.getGallery(),
        ]);
        setSettings(s);
        setPastors(p);
        setServices(srv);
        setEvents(evts);
        setDonations(don);
        setGallery(gal);
      } catch (err) {
        console.warn('Error loading public data:', err);
      }
    };
    loadData();

    // Listen to hash change for #admin
    const handleHash = () => {
      setIsAdminView(window.location.hash === '#admin' || window.location.pathname.includes('/admin'));
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPublic = () => {
    window.location.hash = '';
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isAdminView) {
    return <AdminPanel onBackToPublic={navigateToPublic} />;
  }

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 flex flex-col font-sans">
      {/* Fixed Header */}
      <Header 
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onNavigateAdmin={navigateToAdmin}
      />

      {/* Hero Principal */}
      <Hero 
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Sección de Bienvenida */}
      <Welcome />

      {/* Quiénes Somos */}
      <About settings={settings} />

      {/* Nuestros Pastores */}
      <Pastors pastors={pastors} />

      {/* Servicios y Horarios */}
      <Services services={services} />

      {/* Próximos Eventos */}
      <Events events={events} />

      {/* Células de Hogar */}
      <Cells settings={settings} />

      {/* Ministerio de Intercesión */}
      <Intercession settings={settings} />

      {/* Peticiones de Oración */}
      <Prayer />

      {/* Donaciones */}
      <Donations methods={donations} />

      {/* Galería Fotográfica */}
      <Gallery items={gallery} />

      {/* Ubicación y Mapa */}
      <Location settings={settings} />

      {/* Contacto General */}
      <Contact settings={settings} />

      {/* Llamado Final */}
      <FinalCta 
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
      />

      {/* Footer Oficial */}
      <Footer 
        settings={settings} 
        onNavigateAdmin={navigateToAdmin}
      />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton phoneNumber={settings.whatsapp} />

      {/* Mobile Bottom Quick Bar */}
      <MobileBottomNav 
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenPrayerModal={() => setPrayerModalOpen(true)}
        whatsappNumber={settings.whatsapp}
      />

      {/* Modal: QUIERO SER PARTE */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-dark-900 border border-gold-500/30 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-gold">
            <button
              onClick={() => setJoinModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-dark-950 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-3 border border-gold-500/40">
                <Heart className="w-7 h-7 fill-gold-400/20" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                ¡Hay un Lugar Para Ti!
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Elige cómo te gustaría integrarte a la familia de ICM Portal de Gloria:
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="#celulas"
                onClick={() => setJoinModalOpen(false)}
                className="p-4 rounded-2xl bg-dark-950 border border-zinc-800 hover:border-gold-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 group-hover:bg-gold-500 group-hover:text-dark-950 transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white group-hover:text-gold-300 block">
                    Unirme a una Célula
                  </span>
                  <span className="text-xs text-zinc-400 font-light block">
                    Grupos pequeños de hogar cerca de tu casa.
                  </span>
                </div>
              </a>

              <a
                href="#intercesion"
                onClick={() => setJoinModalOpen(false)}
                className="p-4 rounded-2xl bg-dark-950 border border-zinc-800 hover:border-gold-500/40 transition-all flex items-center gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 group-hover:bg-gold-500 group-hover:text-dark-950 transition-colors">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white group-hover:text-gold-300 block">
                    Ministerio de Intercesión
                  </span>
                  <span className="text-xs text-zinc-400 font-light block">
                    Únete a los guerreros de oración de la iglesia.
                  </span>
                </div>
              </a>

              <a
                href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hola, quiero ser parte de ICM Portal de Gloria y deseo más información.')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setJoinModalOpen(false)}
                className="p-4 rounded-2xl bg-dark-950 border border-green-500/30 hover:border-green-400 transition-all flex items-center gap-4 group"
              >
                <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400 group-hover:bg-green-500 group-hover:text-dark-950 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold text-white group-hover:text-green-300 block">
                    Contactar por WhatsApp
                  </span>
                  <span className="text-xs text-zinc-400 font-light block">
                    Habla directamente con nuestro equipo de bienvenida.
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal: NECESITO ORACIÓN */}
      {prayerModalOpen && (
        <Prayer 
          isOpenModal={true}
          onCloseModal={() => setPrayerModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
