import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeMap = {
    sm: { icon: 34, title: 'text-sm', sub: 'text-[9px]' },
    md: { icon: 46, title: 'text-base sm:text-lg', sub: 'text-[10px] sm:text-xs' },
    lg: { icon: 68, title: 'text-xl sm:text-2xl', sub: 'text-xs sm:text-sm' },
    xl: { icon: 96, title: 'text-2xl sm:text-4xl', sub: 'text-sm sm:text-base' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Golden Arch & Radiant Cross Icon */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg 
          width={current.icon} 
          height={current.icon} 
          viewBox="0 0 100 100" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105"
        >
          {/* Subtle Outer Ring Accent */}
          <circle cx="50" cy="50" r="46" stroke="url(#goldLogoGrad)" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          
          {/* Monumental Golden Arch */}
          <path 
            d="M 22 82 C 22 32, 78 32, 78 82" 
            stroke="url(#goldLogoGrad)" 
            strokeWidth="5.5" 
            strokeLinecap="round" 
            fill="none"
          />
          
          {/* Inner Golden Arch Accent */}
          <path 
            d="M 30 82 C 30 42, 70 42, 70 82" 
            stroke="url(#goldLogoGrad)" 
            strokeWidth="1.8" 
            strokeLinecap="round" 
            fill="none"
            opacity="0.75"
          />

          {/* Central Radiant Cross */}
          <path d="M 50 32 L 50 72" stroke="url(#goldLogoGrad)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 37 46 L 63 46" stroke="url(#goldLogoGrad)" strokeWidth="4.5" strokeLinecap="round" />

          {/* Holy Light Point at Cross intersection */}
          <circle cx="50" cy="46" r="3" fill="#FFFDF0" />

          <defs>
            <linearGradient id="goldLogoGrad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF2B2" />
              <stop offset="0.3" stopColor="#F5D77F" />
              <stop offset="0.6" stopColor="#D4AF37" />
              <stop offset="1" stopColor="#8A6409" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col tracking-wider">
          <span className={`font-serif font-bold text-gold-gradient tracking-[0.18em] uppercase ${current.title} leading-tight`}>
            ICM PORTAL DE GLORIA
          </span>
          <span className={`font-sans font-medium text-zinc-400 tracking-[0.25em] uppercase ${current.sub}`}>
            Iglesia Cristiana
          </span>
        </div>
      )}
    </div>
  );
};
