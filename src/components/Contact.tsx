import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { ChurchSettings } from '../types';
import { Mail, Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface ContactProps {
  settings: ChurchSettings;
}

export const Contact: React.FC<ContactProps> = ({ settings }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Información General',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Por favor completa todos los campos requeridos (*).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await dataService.submitContactMessage({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Información General', message: '' });
    } catch (err) {
      setErrorMsg('No pudimos enviar tu mensaje. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <Mail className="w-4 h-4" />
            <span>Canales de Comunicación</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Estamos <span className="text-gold-gradient">Aquí para Ti</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            Escríbenos para cualquier consulta sobre nuestras reuniones, consejería pastoral o para coordinar una visita.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Direct channels left */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-3xl p-8 border border-gold-500/20 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-white mb-6">
                Comunícate con Nosotros
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">WhatsApp</span>
                    <a 
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-zinc-100 hover:text-gold-400 font-medium text-base transition-colors"
                    >
                      {settings.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">Línea Telefónica</span>
                    <a 
                      href={`tel:${settings.phone}`} 
                      className="text-zinc-100 hover:text-gold-400 font-medium text-base transition-colors"
                    >
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-zinc-400 uppercase tracking-wider font-semibold block">Correo Electrónico</span>
                    <a 
                      href={`mailto:${settings.email}`} 
                      className="text-zinc-100 hover:text-gold-400 font-medium text-base transition-colors break-all"
                    >
                      {settings.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="mt-8 pt-6 border-t border-zinc-800">
                <span className="text-xs text-gold-400 uppercase tracking-wider font-semibold block mb-4">
                  Síguenos en Redes Sociales
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                    Facebook
                  </a>
                  <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                    Instagram
                  </a>
                  <a href={settings.tiktok_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                    TikTok
                  </a>
                  <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-dark-950 border border-zinc-800 text-zinc-300 hover:text-gold-400 hover:border-gold-500/40 transition-all">
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form right */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-gold-500/20 shadow-xl">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-5 border border-gold-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    ¡Gracias por Escribirnos!
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light max-w-md mx-auto">
                    Hemos recibido tu mensaje. Nuestro equipo pastoral y ministerial te responderá a la mayor brevedad posible.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <h3 className="font-serif text-2xl font-bold text-white mb-6">
                    Envíanos un Mensaje
                  </h3>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-medium">
                      Nombre Completo <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-zinc-300 mb-1.5 font-medium">
                        Correo Electrónico <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@correo.com"
                        className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1.5 font-medium">Teléfono / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 809-000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-medium">Motivo de Contacto</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-gold-400 text-sm"
                    >
                      <option value="Información General">Información General</option>
                      <option value="Consejería Pastoral">Consejería Pastoral</option>
                      <option value="Visita a la Iglesia">Visita a la Iglesia</option>
                      <option value="Bautismos">Bautismos</option>
                      <option value="Otro Motivo">Otro Motivo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1.5 font-medium">
                      Mensaje <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe aquí tu mensaje detallado..."
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
