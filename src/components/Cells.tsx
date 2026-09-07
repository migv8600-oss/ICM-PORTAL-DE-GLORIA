import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { ChurchSettings } from '../types';
import { Users, CheckCircle2, MessageCircle, Heart, X, Send, Sparkles } from 'lucide-react';

interface CellsProps {
  settings: ChurchSettings;
}

export const Cells: React.FC<CellsProps> = ({ settings }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    phone_whatsapp: '',
    email: '',
    age: '',
    sector: '',
    city: '',
    belongs_to_church: 'No',
    message: '',
  });

  const benefits = [
    'Conocer más profundamente el corazón de Dios.',
    'Compartir en comunión sincera con otros creyentes.',
    'Estudiar la Biblia de forma práctica y cercana.',
    'Recibir apoyo y cobertura en momentos difíciles.',
    'Orar e interceder los unos por los otros.',
    'Crecer espiritualmente y formarte como discípulo de Jesús.'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.phone_whatsapp) {
      setErrorMsg('Por favor completa los campos requeridos (Nombre y WhatsApp).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await dataService.submitCellRequest({
        full_name: formData.full_name,
        phone_whatsapp: formData.phone_whatsapp,
        email: formData.email,
        age: formData.age ? parseInt(formData.age, 10) : undefined,
        sector: formData.sector,
        city: formData.city,
        belongs_to_church: formData.belongs_to_church,
        message: formData.message,
      });
      setSubmitted(true);
      setFormData({
        full_name: '',
        phone_whatsapp: '',
        email: '',
        age: '',
        sector: '',
        city: '',
        belongs_to_church: 'No',
        message: '',
      });
    } catch (err) {
      setErrorMsg('Ocurrió un error al enviar tu solicitud. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    'Hola, quiero información para unirme a una célula de ICM Portal de Gloria.'
  );
  const whatsappUrl = `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <section id="celulas" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-16 border border-gold-500/20 relative overflow-hidden">
          {/* Subtle gold glow accent in corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Information & Benefits */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
                <Users className="w-4 h-4" />
                <span>Grupos de Crecimiento en Hogares</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                Encuentra tu Lugar en una <span className="text-gold-gradient">Célula</span>
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light mb-8">
                Las células son espacios donde podemos compartir, aprender de la Palabra, orar y crecer juntos como familia en Cristo de casa en casa.
              </p>

              {/* Benefits Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300 text-sm font-light">{b}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setModalOpen(true);
                  }}
                  className="px-8 py-3.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-widest hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-dark-950" />
                  Quiero Unirme a una Célula
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-full bg-dark-950 hover:bg-zinc-900 border border-green-500/40 text-green-400 hover:text-green-300 font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contactar por WhatsApp
                </a>
              </div>
            </div>

            {/* Right Column: Visual Feature Card */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-gold-500/30 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800"
                  alt="Comunión en células"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-center">
                  <span className="font-serif italic text-gold-300 text-base block mb-1">
                    «Y todos los días, en el templo y por las casas, no cesaban de enseñar y predicar a Jesucristo.»
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
                    Hechos 5:42
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Interactive Application Modal */}
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
                  ¡Solicitud Recibida con Éxito!
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-light">
                  ¡Gracias por querer formar parte de una célula! Un líder de zona se pondrá en contacto contigo muy pronto para ubicar la célula más cercana a tu hogar.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-8 py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
                >
                  Aceptar
                </button>
              </div>
            ) : (
              <div>
                <span className="text-xs text-gold-400 font-semibold uppercase tracking-wider block mb-1">
                  Paso de Conexión
                </span>
                <h3 className="font-serif text-2xl font-bold text-white mb-2">
                  Quiero Unirme a una Célula
                </h3>
                <p className="text-zinc-400 text-xs mb-6">
                  Completa el formulario y te conectaremos con una familia de fe cerca de ti.
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
                      placeholder="Ej: Juan Pérez"
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">
                        Teléfono / WhatsApp <span className="text-gold-400">*</span>
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
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">Edad</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="Ej: 28"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">Sector donde vive</label>
                      <input
                        type="text"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        placeholder="Barrio / Sector"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-300 mb-1 font-medium">Ciudad</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Ciudad"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">¿Ya perteneces a alguna iglesia?</label>
                    <select
                      value={formData.belongs_to_church}
                      onChange={(e) => setFormData({ ...formData, belongs_to_church: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 focus:outline-none focus:border-gold-400"
                    >
                      <option value="No">No, estoy buscando una iglesia</option>
                      <option value="Sí">Sí, soy miembro de otra iglesia</option>
                      <option value="ICM">Sí, asisto a ICM Portal de Gloria</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-300 mb-1 font-medium">Mensaje o comentario (Opcional)</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Cuéntanos brevemente tus expectativas o en qué horario te queda mejor asistir."
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:shadow-gold disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {isSubmitting ? 'Enviando Solicitud...' : 'Enviar Solicitud'}
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
