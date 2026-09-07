import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { ChurchSettings } from '../types';
import { Flame, MessageCircle, X, Send, Sparkles, ShieldAlert } from 'lucide-react';

interface IntercessionProps {
  settings: ChurchSettings;
}

export const Intercession: React.FC<IntercessionProps> = ({ settings }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    phone_whatsapp: '',
    email: '',
    age: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone_whatsapp) {
      setErrorMsg('Por favor indica al menos tu Nombre y WhatsApp.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await dataService.submitIntercessionRequest({
        full_name: formData.full_name,
        phone_whatsapp: formData.phone_whatsapp,
        email: formData.email,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({ full_name: '', phone_whatsapp: '', email: '', age: '', message: '' });
    } catch (err) {
      setErrorMsg('Hubo un inconveniente al registrar tu solicitud. Intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hola, quiero información para unirme al grupo de intercesión.'
  );
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <section id="intercesion" className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background spiritual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
          <Flame className="w-4 h-4 text-gold-400 fill-gold-400" />
          <span>Ministerio de Oración e Intercesión</span>
        </div>

        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Únete a Nuestro Grupo de <span className="text-gold-gradient">Intercesión</span>
        </h2>

        {/* Explication */}
        <p className="max-w-3xl mx-auto text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-10">
          La oración es parte fundamental de nuestra vida como iglesia. Queremos levantar una generación comprometida con buscar a Dios y orar por nuestras familias, nuestra iglesia y nuestra comunidad.
        </p>

        {/* Scripture Box */}
        <div className="max-w-xl mx-auto bg-dark-950/70 border border-gold-500/20 p-6 rounded-2xl mb-12">
          <p className="font-serif italic text-gold-200 text-base mb-1">
            «Y busqué entre ellos hombre que hiciese vallado y que se pusiese en la brecha delante de mí, a favor de la tierra...»
          </p>
          <span className="text-zinc-400 text-xs uppercase tracking-wider font-semibold">
            — Ezequiel 22:30
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setSubmitted(false);
              setModalOpen(true);
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-widest hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Flame className="w-4 h-4 fill-dark-950" />
            Quiero Unirme a Intercesión
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-dark-950 hover:bg-zinc-900 border border-green-500/40 text-green-400 hover:text-green-300 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Contactar por WhatsApp
          </a>
        </div>

      </div>

      {/* Intercession Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-dark-900 border border-gold-500/30 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-gold max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full bg-dark-950 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-4 border border-gold-500/40">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">
                  ¡Gracias por Responder al Llamado!
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
                  Gracias por querer ser parte de nuestro equipo de intercesión. Pronto nos pondremos en contacto contigo para coordinar horarios y tiempos de clamor.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-8 py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-1">
                  Guerreros de Oración
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Postulación a Intercesión
                </h3>
                <p className="text-zinc-400 text-xs mb-6">
                  Si sientes en tu corazón la pasión por orar e interceder, llena este breve formulario.
                </p>

                {errorMsg && (
                  <div className="p-3 mb-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">
                      Nombre Completo <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="Tu nombre completo"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">
                        WhatsApp / Teléfono <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone_whatsapp}
                        onChange={(e) => setFormData({ ...formData, phone_whatsapp: e.target.value })}
                        placeholder="+1 809-000-0000"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">Correo Electrónico</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@correo.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Edad</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="Tu edad"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">¿Por qué deseas unirte al equipo de intercesión?</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Comparte tu testimonio o deseo en la oración."
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-gold disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Registrando...' : 'Confirmar Postulación'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
