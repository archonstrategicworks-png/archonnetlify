import React from 'react';

interface LogoProps {
  className?: string;
  animated?: boolean;
}

export const ArchonLogo: React.FC<LogoProps> = ({ className = "w-12 h-12", animated = true }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <svg 
        viewBox="0 0 100 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]"
      >
        {/* Shield Border */}
        <path 
          d="M50 5 L90 25 V60 C90 85 50 115 50 115 C50 115 10 85 10 60 V25 L50 5 Z" 
          className="stroke-amber-500 fill-slate-900"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        
        {/* Inner Shield Glow (Optional) */}
        <path 
          d="M50 12 L82 28 V58 C82 78 50 102 50 102 C50 102 18 78 18 58 V28 L50 12 Z" 
          className="stroke-amber-500/20 fill-none"
          strokeWidth="1"
        />

        {/* Chevron 1 (Top) */}
        <path 
          d="M30 55 L50 40 L70 55" 
          className={`stroke-amber-500 fill-none ${animated ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chevron 2 (Bottom) */}
        <path 
          d="M30 75 L50 60 L70 75" 
          className={`stroke-slate-200 fill-none ${animated ? 'animate-[pulse_3s_ease-in-out_infinite_0.5s]' : ''}`}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};