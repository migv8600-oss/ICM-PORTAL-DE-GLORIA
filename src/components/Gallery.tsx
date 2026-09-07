import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Image, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

interface GalleryProps {
  items: GalleryItem[];
}

export const Gallery: React.FC<GalleryProps> = ({ items }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'Todos',
    'Cultos',
    'Adoración',
    'Jóvenes',
    'Familias',
    'Células',
    'Eventos',
    'Bautismos',
    'Intercesión',
    'Comunidad',
  ];

  const filteredItems = activeCategory === 'Todos'
    ? items
    : items.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="galeria" className="py-24 bg-[#070708] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-gold-400 font-semibold text-xs tracking-widest uppercase mb-3">
            <Image className="w-4 h-4" />
            <span>Nuestra Galería</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Momentos en la <span className="text-gold-gradient">Presencia de Dios</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed font-light">
            Testimonios visuales de lo que Dios hace en cada reunión, adoración y actividad congregacional.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-dark-950 shadow-gold font-bold'
                  : 'bg-dark-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="relative group rounded-2xl overflow-hidden bg-zinc-900 cursor-pointer border border-zinc-800/80 hover:border-gold-500/50 transition-all duration-300 h-72 shadow-lg"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-[10px] text-gold-400 font-bold uppercase tracking-widest block mb-1">
                  {item.category}
                </span>
                <h4 className="font-serif text-base font-bold text-white mb-1">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                    {item.description}
                  </p>
                )}
                <div className="mt-3 flex items-center gap-1 text-gold-400 text-xs font-semibold">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ver en pantalla completa</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-zinc-400 hover:text-white p-3 rounded-full bg-dark-900/80 border border-zinc-700 z-50 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 text-zinc-400 hover:text-white p-3 rounded-full bg-dark-900/80 border border-zinc-700 z-50 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image and Info */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={filteredItems[lightboxIndex].image_url}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain border border-gold-500/30 shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <span className="text-xs text-gold-400 font-semibold uppercase tracking-widest block mb-1">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-serif text-xl font-bold">
                {filteredItems[lightboxIndex].title}
              </h3>
              {filteredItems[lightboxIndex].description && (
                <p className="text-zinc-400 text-sm font-light mt-1 max-w-lg mx-auto">
                  {filteredItems[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 text-zinc-400 hover:text-white p-3 rounded-full bg-dark-900/80 border border-zinc-700 z-50 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </section>
  );
};
