
import React, { useState, useEffect } from 'react';
import { dataService, defaultSettings } from '../../lib/dataService';
import { 
  ChurchSettings, 
  Pastor, 
  ChurchService, 
  ChurchEvent, 
  CellRequest, 
  IntercessionRequest, 
  PrayerRequest, 
  ContactMessage, 
  GalleryItem, 
  DonationMethod 
} from '../../types';
import { Logo } from '../Logo';
import { 
  Lock, 
  LogOut, 
  Users, 
  Flame, 
  HeartHandshake, 
  Mail, 
  Calendar, 
  Clock, 
  Image, 
  CreditCard, 
  Settings, 
  Plus, 
  Trash2, 
  Check, 
  RefreshCw, 
  Eye, 
  ShieldCheck, 
  Globe 
} from 'lucide-react';

interface AdminPanelProps {
  onBackToPublic: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToPublic }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('icm_admin_auth') === 'true';
  });

  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<string>('kpis');

  const [settings, setSettings] = useState<ChurchSettings>(defaultSettings);
  const [pastors, setPastors] = useState<Pastor[]>([]);
  const [services, setServices] = useState<ChurchService[]>([]);
  const [events, setEvents] = useState<ChurchEvent[]>([]);
  const [cells, setCells] = useState<CellRequest[]>([]);
  const [intercessions, setIntercessions] = useState<IntercessionRequest[]>([]);
  const [prayers, setPrayers] = useState<PrayerRequest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [donations, setDonations] = useState<DonationMethod[]>([]);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [newEvent, setNewEvent] = useState<Partial<ChurchEvent>>({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    is_published: true,
  });

  const [newGallery, setNewGallery] = useState<Partial<GalleryItem>>({
    title: '',
    category: 'Cultos',
    image_url: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=80&w=1000',
    description: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [s, p, srv, evts, cReqs, intReqs, prReqs, msgs, gal, don] = await Promise.all([
        dataService.getSettings(),
        dataService.getPastors(),
        dataService.getServices(),
        dataService.getEvents(),
        dataService.getCellRequests(),
        dataService.getIntercessionRequests(),
        dataService.getPrayerRequests(),
        dataService.getContactMessages(),
        dataService.getGallery(),
        dataService.getDonations(),
      ]);

      setSettings(s);
      setPastors(p);
      setServices(srv);
      setEvents(evts);
      setCells(cReqs);
      setIntercessions(intReqs);
      setPrayers(prReqs);
      setMessages(msgs);
      setGallery(gal);
      setDonations(don);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'admin2026' || passwordInput === 'portaldegloria') {
      sessionStorage.setItem('icm_admin_auth', 'true');
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. Utilice: admin2026');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('icm_admin_auth');
    setIsAuthenticated(false);
  };

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataService.updateSettings(settings);
    showNotification('Configuración guardada exitosamente.');
  };

  const handleSavePastor = async (p: Pastor) => {
    await dataService.updatePastor(p.id, p);
    showNotification(`Datos de ${p.name} actualizados.`);
  };

  const handleToggleService = async (srv: ChurchService) => {
    const updated = { ...srv, is_active: !srv.is_active };
    await dataService.saveService(updated);
    setServices(services.map(s => s.id === srv.id ? updated : s));
    showNotification('Estado de servicio actualizado.');
  };

  const handleSaveService = async (srv: ChurchService) => {
    await dataService.saveService(srv);
    showNotification('Servicio guardado exitosamente.');
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;
    await dataService.saveEvent(newEvent);
    showNotification('Evento creado exitosamente.');
    setNewEvent({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
      is_published: true,
    });
    loadAllData();
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este evento?')) {
      await dataService.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
      showNotification('Evento eliminado.');
    }
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.image_url) return;
    await dataService.addGalleryItem(newGallery);
    showNotification('Foto agregada a la galería.');
    setNewGallery({
      title: '',
      category: 'Cultos',
      image_url: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=80&w=1000',
      description: '',
    });
    loadAllData();
  };

  const handleDeleteGallery = async (id: string) => {
    if (window.confirm('¿Eliminar esta fotografía de la galería?')) {
      await dataService.deleteGalleryItem(id);
      setGallery(gallery.filter(g => g.id !== id));
      showNotification('Foto eliminada.');
    }
  };

  const handleUpdateCellStatus = async (id: string, status: string) => {
    await dataService.updateCellRequestStatus(id, status);
    setCells(cells.map(c => c.id === id ? { ...c, status } : c));
    showNotification(`Solicitud de célula: ${status}`);
  };

  const handleUpdatePrayerStatus = async (id: string, status: string) => {
    await dataService.updatePrayerStatus(id, status);
    setPrayers(prayers.map(p => p.id === id ? { ...p, status } : p));
    showNotification(`Petición de oración: ${status}`);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070708] flex items-center justify-center p-4 relative">
        <div className="absolute inset-0 bg-gold-glow pointer-events-none opacity-20"></div>
        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-gold-500/30 shadow-gold relative z-10">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5" />
              <span>Acceso Administrativo</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">
              Portal de Gestión Pastoral
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Ingresa la clave de acceso de administradores (ej: admin2026).
            </p>
          </div>

          {authError && (
            <div className="p-3 mb-4 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Clave de Seguridad
              </label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="admin2026"
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider hover:shadow-gold transition-all"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
            <button
              onClick={onBackToPublic}
              className="text-xs text-zinc-500 hover:text-gold-400 transition-colors"
            >
              ← Volver al Sitio Público
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-[#070708] text-zinc-200">
      <header className="sticky top-0 z-30 bg-[#09090b]/95 backdrop-blur-md border-b border-gold-500/20 px-4 sm:px-8 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4">
          <Logo size="sm" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-[10px] font-bold tracking-widest uppercase">
            Panel de Control
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saveSuccessMsg && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-950/80 border border-green-500/40 text-green-300 text-xs font-medium animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>{saveSuccessMsg}</span>
            </div>
          )}

          <button
            onClick={loadAllData}
            title="Recargar datos"
            className="p-2 rounded-xl bg-dark-950 border border-zinc-800 hover:border-gold-400 text-zinc-300 hover:text-gold-400 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={onBackToPublic}
            className="px-3.5 py-1.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-gold-400" />
            <span className="hidden sm:inline">Ver Sitio Público</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-950/40 border border-red-500/30 hover:bg-red-900/60 text-red-300 text-xs font-semibold transition-colors flex items-center gap-1"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <div className="flex overflow-x-auto gap-2 pb-4 mb-8 border-b border-zinc-800 no-scrollbar">
          {[
            { id: 'kpis', label: 'Resumen', icon: Eye },
            { id: 'cells', label: `Células (${cells.length})`, icon: Users },
            { id: 'intercession', label: `Intercesión (${intercessions.length})`, icon: Flame },
            { id: 'prayers', label: `Oración (${prayers.length})`, icon: HeartHandshake },
            { id: 'messages', label: `Mensajes (${messages.length})`, icon: Mail },
            { id: 'events', label: `Eventos (${events.length})`, icon: Calendar },
            { id: 'services', label: `Servicios (${services.length})`, icon: Clock },
            { id: 'pastors', label: 'Pastores', icon: ShieldCheck },
            { id: 'donations', label: 'Donaciones', icon: CreditCard },
            { id: 'gallery', label: `Galería (${gallery.length})`, icon: Image },
            { id: 'settings', label: 'Configuración', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                  active
                    ? 'bg-gold-500 text-dark-950 shadow-gold'
                    : 'bg-dark-900 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-gold-500/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'kpis' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div onClick={() => setActiveTab('cells')} className="glass-panel p-6 rounded-3xl border border-gold-500/20 cursor-pointer hover:border-gold-400 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-400 font-semibold uppercase">Solicitudes Células</span>
                  <Users className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-white mb-1">{cells.length}</div>
                <span className="text-[11px] text-gold-400">Ver solicitudes →</span>
              </div>

              <div onClick={() => setActiveTab('intercession')} className="glass-panel p-6 rounded-3xl border border-gold-500/20 cursor-pointer hover:border-gold-400 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-400 font-semibold uppercase">Equipo Intercesión</span>
                  <Flame className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-white mb-1">{intercessions.length}</div>
                <span className="text-[11px] text-gold-400">Ver postulaciones →</span>
              </div>

              <div onClick={() => setActiveTab('prayers')} className="glass-panel p-6 rounded-3xl border border-gold-500/20 cursor-pointer hover:border-gold-400 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-400 font-semibold uppercase">Peticiones de Oración</span>
                  <HeartHandshake className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-white mb-1">{prayers.length}</div>
                <span className="text-[11px] text-gold-400">{prayers.filter(p => p.is_confidential).length} confidenciales →</span>
              </div>

              <div onClick={() => setActiveTab('messages')} className="glass-panel p-6 rounded-3xl border border-gold-500/20 cursor-pointer hover:border-gold-400 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-zinc-400 font-semibold uppercase">Mensajes Contacto</span>
                  <Mail className="w-5 h-5 text-gold-400" />
                </div>
                <div className="font-serif text-3xl font-bold text-white mb-1">{messages.length}</div>
                <span className="text-[11px] text-gold-400">Bandeja de entrada →</span>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-8 border border-gold-500/20">
              <h3 className="font-serif text-xl font-bold text-white mb-3">Gestión Oficial - ICM Portal de Gloria</h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                Todos los datos y configuraciones editados en este panel se sincronizan con la base de datos Supabase y se actualizan de inmediato en la página pública para todos los visitantes.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-dark-950 border border-zinc-800">
                  <span className="text-zinc-500 uppercase font-semibold block mb-1">Base de Datos</span>
                  <span className="text-green-400 font-bold">Conectado a Supabase PostgreSQL</span>
                </div>
                <div className="p-4 rounded-2xl bg-dark-950 border border-zinc-800">
                  <span className="text-zinc-500 uppercase font-semibold block mb-1">Pastores Oficiales</span>
                  <span className="text-white font-medium">Pedro Rodriguez y Omaida Cruz</span>
                </div>
                <div className="p-4 rounded-2xl bg-dark-950 border border-zinc-800">
                  <span className="text-zinc-500 uppercase font-semibold block mb-1">WhatsApp de Enlace</span>
                  <span className="text-gold-400 font-medium">{settings.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'cells' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Solicitudes para Células ({cells.length})</h3>
            {cells.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm glass-panel rounded-3xl">No hay solicitudes de células registradas.</div>
            ) : (
              <div className="space-y-4">
                {cells.map((req) => (
                  <div key={req.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                      <div>
                        <span className="font-serif text-lg font-bold text-white block">{req.full_name}</span>
                        <span className="text-xs text-zinc-400">Fecha: {new Date(req.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-950 text-amber-300 border border-amber-500/40">{req.status}</span>
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateCellStatus(req.id, e.target.value)}
                          className="px-2.5 py-1 rounded-lg bg-dark-950 border border-zinc-700 text-xs text-zinc-200"
                        >
                          <option value="Pendiente">Pendiente</option>
                          <option value="Contactado">Contactado</option>
                          <option value="Asignado">Asignado</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div><span className="text-zinc-500 block">WhatsApp:</span><a href={`https://wa.me/${req.phone_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold hover:underline">{req.phone_whatsapp}</a></div>
                      <div><span className="text-zinc-500 block">Sector / Ciudad:</span><span className="text-zinc-300">{req.sector || 'N/A'} - {req.city || 'N/A'}</span></div>
                      <div><span className="text-zinc-500 block">Edad:</span><span className="text-zinc-300">{req.age || 'N/A'}</span></div>
                      <div><span className="text-zinc-500 block">¿Otra iglesia?:</span><span className="text-zinc-300">{req.belongs_to_church || 'No'}</span></div>
                    </div>
                    {req.message && <div className="p-3 rounded-xl bg-dark-950 text-xs text-zinc-300"><span className="text-zinc-500 font-semibold block mb-0.5">Mensaje:</span>{req.message}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'intercession' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Postulaciones a Intercesión ({intercessions.length})</h3>
            {intercessions.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm glass-panel rounded-3xl">No hay postulaciones a intercesión.</div>
            ) : (
              <div className="space-y-4">
                {intercessions.map((int) => (
                  <div key={int.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <span className="font-serif text-lg font-bold text-white block">{int.full_name}</span>
                        <span className="text-xs text-zinc-400">Edad: {int.age || 'No especificada'}</span>
                      </div>
                      <a href={`https://wa.me/${int.phone_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="px-3 py-1 rounded-full bg-green-950 border border-green-500/40 text-green-300 text-xs font-bold">
                        Contactar: {int.phone_whatsapp}
                      </a>
                    </div>
                    {int.message && <div className="p-3 rounded-xl bg-dark-950 text-xs text-zinc-300">{int.message}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'prayers' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Peticiones de Oración ({prayers.length})</h3>
            {prayers.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm glass-panel rounded-3xl">No hay peticiones de oración registradas.</div>
            ) : (
              <div className="space-y-4">
                {prayers.map((pr) => (
                  <div key={pr.id} className={`glass-panel p-6 rounded-2xl border ${pr.is_confidential ? 'border-amber-500/40 bg-amber-950/15' : 'border-zinc-800'} space-y-3`}>
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-serif text-lg font-bold text-white">{pr.full_name}</span>
                        {pr.is_confidential && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-bold uppercase">
                            <Lock className="w-3 h-3" /> Confidencial (Solo Pastores)
                          </span>
                        )}
                      </div>
                      <select
                        value={pr.status}
                        onChange={(e) => handleUpdatePrayerStatus(pr.id, e.target.value)}
                        className="px-2.5 py-1 rounded-lg bg-dark-950 border border-zinc-700 text-xs text-zinc-200"
                      >
                        <option value="Recibida">Recibida</option>
                        <option value="En Oración">En Oración</option>
                        <option value="Respondida">Respondida</option>
                      </select>
                    </div>
                    <p className="text-sm text-zinc-200 bg-dark-950 p-4 rounded-xl border border-zinc-800">"{pr.request_text}"</p>
                    {pr.contact && <div className="text-xs text-zinc-400">Contacto: <span className="text-gold-300">{pr.contact}</span></div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Mensajes de Contacto ({messages.length})</h3>
            {messages.length === 0 ? (
              <div className="p-12 text-center text-zinc-500 text-sm glass-panel rounded-3xl">No hay mensajes de contacto.</div>
            ) : (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-bold text-white">{m.name} ({m.email})</span>
                      <span className="text-xs text-gold-400">{m.subject}</span>
                    </div>
                    <p className="text-xs text-zinc-300 bg-dark-950 p-3 rounded-xl">{m.message}</p>
                    {m.phone && <div className="text-xs text-zinc-400">Teléfono: {m.phone}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === 'events' && (
          <div className="space-y-8 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Gestor de Eventos</h3>
            <form onSubmit={handleCreateEvent} className="glass-panel p-6 rounded-3xl border border-gold-500/20 space-y-4 text-xs">
              <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider flex items-center gap-2">
                <Plus className="w-4 h-4" /> Crear Nuevo Evento
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Título</label>
                  <input type="text" required value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Ej: Conferencia" className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Fecha</label>
                  <input type="text" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Ej: Sábado 15" className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Hora</label>
                  <input type="text" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} placeholder="7:00 PM" className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Lugar</label>
                  <input type="text" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} placeholder="Santuario Principal" className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">URL Imagen</label>
                <input type="text" value={newEvent.image_url} onChange={(e) => setNewEvent({ ...newEvent, image_url: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
              </div>
              <div>
                <label className="block text-zinc-400 mb-1">Descripción</label>
                <textarea rows={2} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
              </div>
              <button type="submit" className="px-6 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold uppercase">Publicar Evento</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((evt) => (
                <div key={evt.id} className="glass-panel p-5 rounded-2xl border border-zinc-800 flex gap-4">
                  <img src={evt.image_url} alt="" className="w-24 h-24 rounded-xl object-cover" />
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-white text-sm mb-1">{evt.title}</h4>
                    <p className="text-zinc-400 mb-2">{evt.date} • {evt.time}</p>
                    <button onClick={() => handleDeleteEvent(evt.id)} className="px-3 py-1 rounded-lg bg-red-950 border border-red-500/40 text-red-300 flex items-center gap-1 hover:bg-red-900">
                      <Trash2 className="w-3 h-3" /> Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Servicios y Cultos</h3>
            <div className="space-y-4">
              {services.map((srv) => (
                <div key={srv.id} className="glass-panel p-6 rounded-2xl border border-zinc-800 text-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="font-bold text-white text-sm">{srv.name}</span>
                    <button onClick={() => handleToggleService(srv)} className={`px-3 py-1 rounded-full font-bold ${srv.is_active ? 'bg-green-950 text-green-300 border border-green-500/40' : 'bg-zinc-800 text-zinc-400'}`}>
                      {srv.is_active ? 'Activo en Web' : 'Inactivo'}
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-400 mb-1">Día</label>
                      <input type="text" value={srv.day} onChange={(e) => { const u = services.map(s => s.id === srv.id ? { ...s, day: e.target.value } : s); setServices(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Horario (Editable)</label>
                      <input type="text" value={srv.time} onChange={(e) => { const u = services.map(s => s.id === srv.id ? { ...s, time: e.target.value } : s); setServices(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                    </div>
                    <div>
                      <label className="block text-zinc-400 mb-1">Lugar</label>
                      <input type="text" value={srv.location} onChange={(e) => { const u = services.map(s => s.id === srv.id ? { ...s, location: e.target.value } : s); setServices(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Descripción</label>
                    <input type="text" value={srv.description} onChange={(e) => { const u = services.map(s => s.id === srv.id ? { ...s, description: e.target.value } : s); setServices(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <button onClick={() => handleSaveService(srv)} className="px-4 py-2 rounded-xl bg-gold-gradient text-dark-950 font-bold uppercase text-[11px]">Guardar Cambios</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pastors' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Nuestros Pastores</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {pastors.map((p) => (
                <div key={p.id} className="glass-panel p-6 rounded-3xl border border-zinc-800 text-xs space-y-4">
                  <h4 className="font-serif text-xl font-bold text-white">{p.name}</h4>
                  <div>
                    <label className="block text-zinc-400 mb-1">Cargo / Título</label>
                    <input type="text" value={p.role} onChange={(e) => { const u = pastors.map(it => it.id === p.id ? { ...it, role: e.target.value } : it); setPastors(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">URL Fotografía</label>
                    <input type="text" value={p.image_url} onChange={(e) => { const u = pastors.map(it => it.id === p.id ? { ...it, image_url: e.target.value } : it); setPastors(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Biografía</label>
                    <textarea rows={4} value={p.bio} onChange={(e) => { const u = pastors.map(it => it.id === p.id ? { ...it, bio: e.target.value } : it); setPastors(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <button onClick={() => handleSavePastor(p)} className="px-5 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold uppercase text-xs">Guardar Perfil</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Métodos de Donación</h3>
            {donations.map((d) => (
              <div key={d.id} className="glass-panel p-6 rounded-3xl border border-zinc-800 text-xs space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Banco / Entidad</label>
                    <input type="text" value={d.bank_name} onChange={(e) => { const u = donations.map(it => it.id === d.id ? { ...it, bank_name: e.target.value } : it); setDonations(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Tipo de Cuenta</label>
                    <input type="text" value={d.account_type} onChange={(e) => { const u = donations.map(it => it.id === d.id ? { ...it, account_type: e.target.value } : it); setDonations(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-zinc-400 mb-1">Número de Cuenta</label>
                    <input type="text" value={d.account_number} onChange={(e) => { const u = donations.map(it => it.id === d.id ? { ...it, account_number: e.target.value } : it); setDonations(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white font-mono" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Titular</label>
                    <input type="text" value={d.account_holder} onChange={(e) => { const u = donations.map(it => it.id === d.id ? { ...it, account_holder: e.target.value } : it); setDonations(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Instrucciones</label>
                    <input type="text" value={d.instructions || ''} onChange={(e) => { const u = donations.map(it => it.id === d.id ? { ...it, instructions: e.target.value } : it); setDonations(u); }} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                  </div>
                </div>
                <button onClick={async () => { await dataService.saveDonationMethod(d); showNotification('Donación guardada.'); }} className="px-5 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold uppercase text-xs">Guardar Cambios</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Galería Fotográfica</h3>
            <form onSubmit={handleCreateGallery} className="glass-panel p-6 rounded-3xl border border-gold-500/20 space-y-4 text-xs">
              <h4 className="font-bold text-gold-400 uppercase tracking-wider">Añadir Fotografía</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-400 mb-1">Título</label>
                  <input type="text" required value={newGallery.title} onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">Categoría</label>
                  <select value={newGallery.category} onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white">
                    <option value="Cultos">Cultos</option>
                    <option value="Adoración">Adoración</option>
                    <option value="Jóvenes">Jóvenes</option>
                    <option value="Familias">Familias</option>
                    <option value="Células">Células</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Bautismos">Bautismos</option>
                    <option value="Intercesión">Intercesión</option>
                    <option value="Comunidad">Comunidad</option>
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-400 mb-1">URL Imagen</label>
                  <input type="text" required value={newGallery.image_url} onChange={(e) => setNewGallery({ ...newGallery, image_url: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <button type="submit" className="px-5 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold uppercase text-xs">Añadir Foto</button>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="relative group rounded-xl overflow-hidden border border-zinc-800 h-40">
                  <img src={g.image_url} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-between p-3 transition-opacity">
                    <span className="text-[10px] text-gold-300 font-bold">{g.category}</span>
                    <button onClick={() => handleDeleteGallery(g.id)} className="p-1.5 rounded-lg bg-red-900 text-white text-xs self-end">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="font-serif text-2xl font-bold text-white">Configuración General</h3>
            <form onSubmit={handleSaveSettings} className="glass-panel p-8 rounded-3xl border border-zinc-800 text-xs space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Nombre Oficial</label>
                  <input type="text" value={settings.church_name} onChange={(e) => setSettings({ ...settings, church_name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">WhatsApp Oficial</label>
                  <input type="text" value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Teléfono</label>
                  <input type="text" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Correo Electrónico</label>
                  <input type="email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Ciudad</label>
                  <input type="text" value={settings.city} onChange={(e) => setSettings({ ...settings, city: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 font-semibold mb-1">Dirección de la Iglesia</label>
                <input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Misión</label>
                  <textarea rows={3} value={settings.mission} onChange={(e) => setSettings({ ...settings, mission: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Visión</label>
                  <textarea rows={3} value={settings.vision} onChange={(e) => setSettings({ ...settings, vision: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-white" />
                </div>
              </div>
              <button type="submit" className="px-8 py-3 rounded-full bg-gold-gradient text-dark-950 font-bold uppercase text-xs tracking-wider hover:shadow-gold">
                Guardar Configuración General
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
