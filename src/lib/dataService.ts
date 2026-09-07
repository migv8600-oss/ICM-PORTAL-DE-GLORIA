import { supabase } from './supabase';
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
} from '../types';

// Default initial data for instant fallback if network or table is slow
export const defaultSettings: ChurchSettings = {
  id: 'default',
  church_name: 'ICM PORTAL DE GLORIA',
  slogan: 'Un lugar para encontrarte con Dios, crecer en fe y caminar en comunidad.',
  sub_slogan: 'Hay un lugar para ti.',
  phone: '+1 (809) 000-0000',
  whatsapp: '+18090000000',
  email: 'contacto@icmportaldegloria.org',
  address: '[DIRECCIÓN_IGLESIA - Editable desde Panel Admin]',
  city: '[CIUDAD - Editable desde Panel Admin]',
  google_maps_url: 'https://maps.google.com',
  facebook_url: 'https://facebook.com/icmportaldegloria',
  instagram_url: 'https://instagram.com/icmportaldegloria',
  tiktok_url: 'https://tiktok.com/@icmportaldegloria',
  youtube_url: 'https://youtube.com/@icmportaldegloria',
  mission: 'Llevar el mensaje de salvación de Jesucristo a cada hogar, transformando vidas y restaurando familias bajo el poder y la guía del Espíritu Santo.',
  vision: 'Ser una iglesia viva, apasionada por la presencia de Dios, que impacta a la sociedad a través del amor, el discipulado bíblico y el servicio comunitario.'
};

export const defaultPastors: Pastor[] = [
  {
    id: 'pastor-pedro',
    name: 'Pedro Rodriguez',
    role: 'Pastor Principal de ICM Portal de Gloria',
    bio: 'Llamado por Dios con una profunda pasión pastoral para edificar vidas y guiar a la congregación en amor, fe genuina y sana doctrina. Comprometido con la visión apostólica de ver familias restauradas y consolidada la presencia de Dios en cada corazón.',
    image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    order_index: 1
  },
  {
    id: 'pastora-omaida',
    name: 'Omaida Cruz',
    role: 'Pastora de ICM Portal de Gloria',
    bio: 'Mujer de profunda vida de oración, intercesión y sabiduría espiritual. Dedicada con amor al fortalecimiento del hogar cristiano, el acompañamiento de las familias, el ministerio de damas y la formación de nuevas generaciones firmes en el Señor.',
    image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    order_index: 2
  }
];

export const defaultServices: ChurchService[] = [
  {
    id: '1',
    name: 'Culto General de Adoración',
    day: 'Domingos',
    time: '[HORARIO_DOMINGO - Editable]',
    location: 'Santuario Principal',
    description: 'Nuestra gran celebración dominical en alabanza, adoración profunda y predicación de la Palabra de Dios para toda la familia.',
    order_index: 1,
    is_active: true
  },
  {
    id: '2',
    name: 'Escuela Bíblica y Discipulado',
    day: 'Domingos',
    time: '[HORARIO_ESCUELA_BIBLICA - Editable]',
    location: 'Aulas de Formación',
    description: 'Clases dinámicas por edades: niños, adolescentes, jóvenes y adultos profundizando en las Escrituras.',
    order_index: 2,
    is_active: true
  },
  {
    id: '3',
    name: 'Reunión de Jóvenes',
    day: 'Sábados',
    time: '[HORARIO_JOVENES - Editable]',
    location: 'Auditorio Juvenil',
    description: 'Encuentro juvenil lleno de adoración contemporánea, amistad sana y mensajes enfocados en sus desafíos actuales.',
    order_index: 3,
    is_active: true
  },
  {
    id: '4',
    name: 'Reunión de Damas',
    day: 'Jueves',
    time: '[HORARIO_DAMAS - Editable]',
    location: 'Salón de Comunión',
    description: 'Espacio de fe, consejería, apoyo mutuo y crecimiento espiritual entre mujeres que aman a Dios.',
    order_index: 4,
    is_active: true
  },
  {
    id: '5',
    name: 'Reunión de Caballeros',
    day: 'Martes',
    time: '[HORARIO_CABALLEROS - Editable]',
    location: 'Salón de Comunión',
    description: 'Hombres fortaleciéndose en la Palabra, asumiendo su llamado de liderazgo sacerdotal en sus hogares.',
    order_index: 5,
    is_active: true
  },
  {
    id: '6',
    name: 'Reunión Familiar',
    day: 'Viernes',
    time: '[HORARIO_FAMILIAR - Editable]',
    location: 'Santuario Principal',
    description: 'Noche especial diseñada para la unidad familiar, principios para el matrimonio y bendición para los hijos.',
    order_index: 6,
    is_active: true
  },
  {
    id: '7',
    name: 'Noche de Oración e Intercesión',
    day: 'Miércoles',
    time: '[HORARIO_ORACION - Editable]',
    location: 'Santuario Principal',
    description: 'Clamor unido por las peticiones de la congregación, sanidad, liberación y avivamiento espiritual.',
    order_index: 7,
    is_active: true
  }
];

export const defaultEvents: ChurchEvent[] = [
  {
    id: '1',
    title: 'Conferencia de Avivamiento: "Gloria Postrera"',
    date: 'Próximamente',
    time: '7:00 PM',
    location: 'Santuario Central ICM Portal de Gloria',
    description: 'Tres días de manifestación del poder de Dios con ministración especial, alabanza y un mensaje profético para nuestra ciudad.',
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1000',
    is_published: true
  },
  {
    id: '2',
    title: 'Retiro Juvenil "Luz y Propósito"',
    date: 'Próximamente',
    time: 'Fin de Semana',
    location: 'Campamento Cristiano Monte de Dios',
    description: 'Un encuentro inolvidable para que cada joven descubra su identidad en Cristo y fortalezca su relación con Dios.',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
    is_published: true
  },
  {
    id: '3',
    title: 'Vigilia Unida de Intercesión',
    date: 'Próximamente',
    time: '10:00 PM - 5:00 AM',
    location: 'Santuario Principal',
    description: 'Una noche completa de clamor ferviente, alabanza continua y búsqueda del rostro del Altísimo.',
    image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1000',
    is_published: true
  }
];

export const defaultDonations: DonationMethod[] = [
  {
    id: '1',
    bank_name: '[BANCO NACIONAL - Editable]',
    account_type: 'Cuenta de Ahorros / Corriente',
    account_number: '000-000000-0',
    account_holder: 'ICM PORTAL DE GLORIA',
    id_number: 'RNC/ID: 000-00000-0',
    instructions: 'Favor indicar en el concepto: "Diezmo", "Ofrenda" o "Misiones" junto a tu nombre.',
    is_active: true
  },
  {
    id: '2',
    bank_name: '[TRANSFERENCIA DIGITAL / QR]',
    account_type: 'Billetera Digital / Pago Móvil',
    account_number: '+1 (809) 000-0000',
    account_holder: 'ICM PORTAL DE GLORIA',
    id_number: 'ID: 000-00000-0',
    instructions: 'Envía tu comprobante vía WhatsApp a nuestro equipo de tesorería para confirmar tu recepción.',
    is_active: true
  }
];

export const defaultGallery: GalleryItem[] = [
  {
    id: '1',
    title: 'Alabanza y Adoración',
    category: 'Adoración',
    image_url: 'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&q=80&w=1000',
    description: 'Momentos sublimes en la presencia de Dios exaltando su santo nombre.'
  },
  {
    id: '2',
    title: 'Comunión en Familia',
    category: 'Familias',
    image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1000',
    description: 'Familias unidas adorando al Señor en nuestro culto dominical.'
  },
  {
    id: '3',
    title: 'Juventud de Gloria',
    category: 'Jóvenes',
    image_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000',
    description: 'Una generación consagrada a Cristo con pasión y excelencia.'
  },
  {
    id: '4',
    title: 'Clamor de Intercesión',
    category: 'Intercesión',
    image_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=1000',
    description: 'Guerreros de oración doblando rodillas por las almas y la ciudad.'
  },
  {
    id: '5',
    title: 'Célula de Hogar',
    category: 'Células',
    image_url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000',
    description: 'Estudiando la Palabra y partiendo el pan de casa en casa.'
  },
  {
    id: '6',
    title: 'Fiesta de Bautismos',
    category: 'Bautismos',
    image_url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1000',
    description: 'Nuevos creyentes dando testimonio público de fe y nueva vida en Jesús.'
  },
  {
    id: '7',
    title: 'Predicación Dominical',
    category: 'Cultos',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
    description: 'Exposición viva y ungida de las Sagradas Escrituras.'
  },
  {
    id: '8',
    title: 'Servicio Comunitario',
    category: 'Comunidad',
    image_url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1000',
    description: 'Extendiendo las manos de Jesús a quienes más lo necesitan.'
  }
];

export const dataService = {
  // Church Settings
  async getSettings(): Promise<ChurchSettings> {
    try {
      const { data, error } = await supabase
        .from('icm_church_settings')
        .select('*')
        .eq('id', 'default')
        .single();
      if (!error && data) {
        localStorage.setItem('icm_settings', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching settings from Supabase, using cache/default:', e);
    }
    const cached = localStorage.getItem('icm_settings');
    return cached ? JSON.parse(cached) : defaultSettings;
  },

  async updateSettings(settings: Partial<ChurchSettings>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_church_settings')
        .upsert({ ...settings, id: 'default', updated_at: new Date().toISOString() });
      if (!error) {
        const current = await this.getSettings();
        const updated = { ...current, ...settings };
        localStorage.setItem('icm_settings', JSON.stringify(updated));
        return true;
      }
    } catch (e) {
      console.warn('Supabase updateSettings failed, saving locally:', e);
    }
    const current = await this.getSettings();
    localStorage.setItem('icm_settings', JSON.stringify({ ...current, ...settings }));
    return true;
  },

  // Pastors
  async getPastors(): Promise<Pastor[]> {
    try {
      const { data, error } = await supabase
        .from('icm_pastors')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem('icm_pastors', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching pastors from Supabase:', e);
    }
    const cached = localStorage.getItem('icm_pastors');
    return cached ? JSON.parse(cached) : defaultPastors;
  },

  async updatePastor(id: string, updates: Partial<Pastor>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_pastors')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase updatePastor error:', e);
    }
    const list = await this.getPastors();
    const updatedList = list.map(p => p.id === id ? { ...p, ...updates } : p);
    localStorage.setItem('icm_pastors', JSON.stringify(updatedList));
    return true;
  },

  // Services
  async getServices(): Promise<ChurchService[]> {
    try {
      const { data, error } = await supabase
        .from('icm_services')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem('icm_services', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching services from Supabase:', e);
    }
    const cached = localStorage.getItem('icm_services');
    return cached ? JSON.parse(cached) : defaultServices;
  },

  async saveService(service: Partial<ChurchService>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_services')
        .upsert(service);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase saveService error:', e);
    }
    return true;
  },

  // Events
  async getEvents(): Promise<ChurchEvent[]> {
    try {
      const { data, error } = await supabase
        .from('icm_events')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        localStorage.setItem('icm_events', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching events from Supabase:', e);
    }
    const cached = localStorage.getItem('icm_events');
    return cached ? JSON.parse(cached) : defaultEvents;
  },

  async saveEvent(event: Partial<ChurchEvent>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_events')
        .upsert(event);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase saveEvent error:', e);
    }
    return true;
  },

  async deleteEvent(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_events')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase deleteEvent error:', e);
    }
    return true;
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    try {
      const { data, error } = await supabase
        .from('icm_gallery')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        localStorage.setItem('icm_gallery', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching gallery from Supabase:', e);
    }
    const cached = localStorage.getItem('icm_gallery');
    return cached ? JSON.parse(cached) : defaultGallery;
  },

  async addGalleryItem(item: Partial<GalleryItem>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_gallery')
        .insert(item);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase addGalleryItem error:', e);
    }
    const list = await this.getGallery();
    const newItem = { id: Date.now().toString(), ...item } as GalleryItem;
    localStorage.setItem('icm_gallery', JSON.stringify([newItem, ...list]));
    return true;
  },

  async deleteGalleryItem(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_gallery')
        .delete()
        .eq('id', id);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase deleteGalleryItem error:', e);
    }
    const list = await this.getGallery();
    localStorage.setItem('icm_gallery', JSON.stringify(list.filter(i => i.id !== id)));
    return true;
  },

  // Donations
  async getDonations(): Promise<DonationMethod[]> {
    try {
      const { data, error } = await supabase
        .from('icm_donation_methods')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        localStorage.setItem('icm_donations', JSON.stringify(data));
        return data;
      }
    } catch (e) {
      console.warn('Error fetching donations from Supabase:', e);
    }
    const cached = localStorage.getItem('icm_donations');
    return cached ? JSON.parse(cached) : defaultDonations;
  },

  async saveDonationMethod(method: Partial<DonationMethod>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('icm_donation_methods')
        .upsert(method);
      if (!error) return true;
    } catch (e) {
      console.warn('Supabase saveDonationMethod error:', e);
    }
    return true;
  },

  // Form submissions
  async submitCellRequest(req: Omit<CellRequest, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('icm_cell_requests')
        .insert([req]);
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase cell insert error, saving locally:', e);
      const existing = JSON.parse(localStorage.getItem('icm_cell_requests') || '[]');
      existing.unshift({ ...req, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'Pendiente' });
      localStorage.setItem('icm_cell_requests', JSON.stringify(existing));
    }
    return { success: true, message: '¡Gracias por querer formar parte de una célula! Nos pondremos en contacto contigo pronto.' };
  },

  async getCellRequests(): Promise<CellRequest[]> {
    try {
      const { data, error } = await supabase
        .from('icm_cell_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('Error getting cell requests:', e);
    }
    return JSON.parse(localStorage.getItem('icm_cell_requests') || '[]');
  },

  async updateCellRequestStatus(id: string, status: string): Promise<boolean> {
    try {
      await supabase.from('icm_cell_requests').update({ status }).eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    const existing: CellRequest[] = JSON.parse(localStorage.getItem('icm_cell_requests') || '[]');
    const updated = existing.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem('icm_cell_requests', JSON.stringify(updated));
    return true;
  },

  async submitIntercessionRequest(req: Omit<IntercessionRequest, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('icm_intercession_requests')
        .insert([req]);
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase intercession insert error, saving locally:', e);
      const existing = JSON.parse(localStorage.getItem('icm_intercession_requests') || '[]');
      existing.unshift({ ...req, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'Pendiente' });
      localStorage.setItem('icm_intercession_requests', JSON.stringify(existing));
    }
    return { success: true, message: 'Gracias por querer ser parte de nuestro equipo de intercesión. Pronto nos pondremos en contacto contigo.' };
  },

  async getIntercessionRequests(): Promise<IntercessionRequest[]> {
    try {
      const { data, error } = await supabase
        .from('icm_intercession_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('Error getting intercession requests:', e);
    }
    return JSON.parse(localStorage.getItem('icm_intercession_requests') || '[]');
  },

  async submitPrayerRequest(req: Omit<PrayerRequest, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('icm_prayer_requests')
        .insert([req]);
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase prayer insert error, saving locally:', e);
      const existing = JSON.parse(localStorage.getItem('icm_prayer_requests') || '[]');
      existing.unshift({ ...req, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'Recibida' });
      localStorage.setItem('icm_prayer_requests', JSON.stringify(existing));
    }
    return { success: true, message: 'Tu petición ha sido recibida con amor y respeto. Estaremos orando por ti.' };
  },

  async getPrayerRequests(): Promise<PrayerRequest[]> {
    try {
      const { data, error } = await supabase
        .from('icm_prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('Error getting prayer requests:', e);
    }
    return JSON.parse(localStorage.getItem('icm_prayer_requests') || '[]');
  },

  async updatePrayerStatus(id: string, status: string): Promise<boolean> {
    try {
      await supabase.from('icm_prayer_requests').update({ status }).eq('id', id);
    } catch (e) {
      console.warn(e);
    }
    const existing: PrayerRequest[] = JSON.parse(localStorage.getItem('icm_prayer_requests') || '[]');
    const updated = existing.map(item => item.id === id ? { ...item, status } : item);
    localStorage.setItem('icm_prayer_requests', JSON.stringify(updated));
    return true;
  },

  async submitContactMessage(msg: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): Promise<{ success: boolean; message: string }> {
    try {
      const { error } = await supabase
        .from('icm_contact_messages')
        .insert([msg]);
      if (error) throw error;
    } catch (e) {
      console.warn('Supabase contact insert error, saving locally:', e);
      const existing = JSON.parse(localStorage.getItem('icm_contact_messages') || '[]');
      existing.unshift({ ...msg, id: Date.now().toString(), created_at: new Date().toISOString(), status: 'Nuevo' });
      localStorage.setItem('icm_contact_messages', JSON.stringify(existing));
    }
    return { success: true, message: 'Gracias por escribirnos. Hemos recibido tu mensaje y te responderemos a la brevedad.' };
  },

  async getContactMessages(): Promise<ContactMessage[]> {
    try {
      const { data, error } = await supabase
        .from('icm_contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (e) {
      console.warn('Error getting contact messages:', e);
    }
    return JSON.parse(localStorage.getItem('icm_contact_messages') || '[]');
  },

  async deleteService(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_services').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteService error:', e);
    }
    const list = await this.getServices();
    localStorage.setItem('icm_services', JSON.stringify(list.filter(s => s.id !== id)));
    return true;
  },

  async deleteDonationMethod(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_donation_methods').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteDonationMethod error:', e);
    }
    const list = await this.getDonations();
    localStorage.setItem('icm_donations', JSON.stringify(list.filter(d => d.id !== id)));
    return true;
  },

  async deleteCellRequest(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_cell_requests').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteCellRequest error:', e);
    }
    const existing: CellRequest[] = JSON.parse(localStorage.getItem('icm_cell_requests') || '[]');
    localStorage.setItem('icm_cell_requests', JSON.stringify(existing.filter(item => item.id !== id)));
    return true;
  },

  async deleteIntercessionRequest(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_intercession_requests').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteIntercessionRequest error:', e);
    }
    const existing: IntercessionRequest[] = JSON.parse(localStorage.getItem('icm_intercession_requests') || '[]');
    localStorage.setItem('icm_intercession_requests', JSON.stringify(existing.filter(item => item.id !== id)));
    return true;
  },

  async deletePrayerRequest(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_prayer_requests').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deletePrayerRequest error:', e);
    }
    const existing: PrayerRequest[] = JSON.parse(localStorage.getItem('icm_prayer_requests') || '[]');
    localStorage.setItem('icm_prayer_requests', JSON.stringify(existing.filter(item => item.id !== id)));
    return true;
  },

  async deleteContactMessage(id: string): Promise<boolean> {
    try {
      await supabase.from('icm_contact_messages').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase deleteContactMessage error:', e);
    }
    const existing: ContactMessage[] = JSON.parse(localStorage.getItem('icm_contact_messages') || '[]');
    localStorage.setItem('icm_contact_messages', JSON.stringify(existing.filter(item => item.id !== id)));
    return true;
  }
};

