/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDFBF7',
          100: '#FAF5EB',
          200: '#F3E5AB',
          300: '#EBD485',
          400: '#E5C158',
          500: '#D4AF37', // Gold oficial
          600: '#B8860B',
          700: '#996F08',
          800: '#755406',
          900: '#523B04',
          950: '#2E2001',
        },
        dark: {
          950: '#070708',
          900: '#0C0C0E',
          850: '#111114',
          800: '#17171C',
          700: '#23232A',
          600: '#32323C',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA7C11 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 70%)',
        'dark-gradient': 'linear-gradient(180deg, rgba(12,12,14,0.7) 0%, rgba(7,7,8,0.95) 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px -2px rgba(212, 175, 55, 0.25)',
        'gold-lg': '0 10px 30px -4px rgba(212, 175, 55, 0.35)',
      }
    },
  },
  plugins: [],
}
