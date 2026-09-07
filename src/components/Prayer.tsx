import React, { useState } from 'react';
import { dataService } from '../lib/dataService';
import { HeartHandshake, ShieldCheck, Send, CheckCircle2, Lock } from 'lucide-react';

interface PrayerProps {
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const Prayer: React.FC<PrayerProps> = ({ isOpenModal, onCloseModal }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    contact: '',
    request_text: '',
    is_confidential: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.request_text) {
      setErrorMsg('Por favor ingresa tu nombre y el motivo de tu petición.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await dataService.submitPrayerRequest({
        full_name: formData.full_name,
        contact: formData.contact,
        request_text: formData.request_text,
        is_confidential: formData.is_confidential,
      });
      setSubmitted(true);
      setFormData({ full_name: '', contact: '', request_text: '', is_confidential: true });
    } catch (err) {
      setErrorMsg('Ocurrió un error al enviar tu petición. Por favor intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
          <HeartHandshake className="w-4 h-4" />
          <span>Cobertura Espiritual</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
          ¿Necesitas que <span className="text-gold-gradient">Oremos por Ti?</span>
        </h2>

        <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-light">
          No importa por lo que estés pasando. Queremos acompañarte en oración. Para Dios no hay nada imposible.
        </p>
      </div>

      {/* Form Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-gold-500/25 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 blur-[100px] pointer-events-none"></div>

        {submitted ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center mx-auto mb-5 border border-gold-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Tu Petición Ha Sido Recibida
            </h3>
            <p className="text-zinc-300 text-base max-w-lg mx-auto leading-relaxed font-light mb-8">
              Estaremos orando por ti con fidelidad y discreción. Creemos con todo el corazón que Dios escuchará y responderá según su perfecta voluntad.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                if (onCloseModal) onCloseModal();
              }}
              className="px-8 py-3 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-wider"
            >
              Enviar otra Petición
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  Tu Nombre <span className="text-gold-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Tu nombre o anónimo"
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
                  WhatsApp o Correo Electrónico (Opcional)
                </label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                  placeholder="Por si deseas que te contactemos"
                  className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 text-xs font-semibold uppercase tracking-wider mb-2">
                Petición de Oración <span className="text-gold-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.request_text}
                onChange={(e) => setFormData({ ...formData, request_text: e.target.value })}
                placeholder="Escribe aquí tu motivo de oración (salud, familia, finanzas, salvación, consuelo...)"
                className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-zinc-800 text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-gold-400 text-sm resize-none"
              ></textarea>
            </div>

            {/* Confidentiality Toggle */}
            <div className="p-4 rounded-2xl bg-dark-950/80 border border-gold-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">
                    ¿Deseas mantener tu petición en estricta confidencialidad?
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Solo los pastores y líderes autorizados tendrán acceso a leerla.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_confidential: true })}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    formData.is_confidential
                      ? 'bg-gold-500 text-dark-950 shadow-gold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  Sí, Confidencial
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, is_confidential: false })}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    !formData.is_confidential
                      ? 'bg-gold-500 text-dark-950 shadow-gold'
                      : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  No, Público
                </button>
              </div>
            </div>

            {/* Privacy note */}
            <div className="flex items-center gap-2 text-[11px] text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-gold-400 flex-shrink-0" />
              <span>Garantizamos la privacidad y el respeto absoluto de tu motivo de oración.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-full bg-gold-gradient text-dark-950 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-gold-lg transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Enviando Petición...' : 'Enviar Petición de Oración'}
            </button>
          </form>
        )}
      </div>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 text-zinc-400 hover:text-white p-2 rounded-full bg-dark-950 border border-zinc-800"
            >
              ✕
            </button>
          )}
          {content}
        </div>
      </div>
    );
  }

  return (
    <section id="oracion" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
};
