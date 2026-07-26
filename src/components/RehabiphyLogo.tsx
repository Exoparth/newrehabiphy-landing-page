import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // light background vs dark background
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical' | 'icon-only';
  iconSize?: number | string;
}

export const RehabiphyIcon: React.FC<{ className?: string; size?: number | string }> = ({
  className = 'w-10 h-10',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Head */}
      <circle cx="132" cy="28" r="18" fill="#22C55E" />

      {/* Main Dynamic Runner Body & Lead Leg */}
      <path
        d="M 62 38 
           C 92 38, 116 52, 128 72 
           C 112 98, 92 128, 76 156 
           C 62 182, 48 202, 34 214 
           C 52 186, 76 148, 92 116 
           C 106 88, 114 74, 116 66 
           C 104 58, 86 50, 62 38 
           Z"
        fill="#22C55E"
      />

      {/* Trailing Right Leg Curve */}
      <path
        d="M 96 112 
           C 116 110, 136 124, 140 148 
           C 144 172, 132 196, 126 214 
           C 118 198, 116 178, 118 162 
           C 120 142, 106 128, 88 120 
           Z"
        fill="#22C55E"
      />
    </svg>
  );
};

export const RehabiphyLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  showTagline = true,
  layout = 'horizontal',
  iconSize = 38,
}) => {
  const isDark = variant === 'dark';
  const wordmarkColor = isDark ? 'text-white' : 'text-[#003878]';
  const taglineColor = isDark ? 'text-[#22C55E]' : 'text-[#003878]';
  const lineColor = isDark ? 'bg-[#22C55E]/60' : 'bg-[#003878]';

  if (layout === 'icon-only') {
    return <RehabiphyIcon size={iconSize} className={className} />;
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <RehabiphyIcon size={iconSize || 68} className="mb-2.5" />
        <span className={`text-3xl font-extrabold tracking-tight ${wordmarkColor} font-heading leading-tight`}>
          Rehabiphy
        </span>
        {showTagline && (
          <div className="flex items-center gap-2 mt-1.5">
            <span className={`h-[1.5px] w-5 ${lineColor}`} />
            <span className={`text-[9.5px] font-bold uppercase tracking-[0.2em] ${taglineColor}`}>
              From Setback To Comeback
            </span>
            <span className={`h-[1.5px] w-5 ${lineColor}`} />
          </div>
        )}
      </div>
    );
  }

  // Default: Horizontal layout
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <RehabiphyIcon size={iconSize} className="shrink-0" />
      <div className="flex flex-col justify-center">
        <span className={`text-2xl font-black tracking-tight ${wordmarkColor} font-heading leading-none`}>
          Rehabiphy
        </span>
        {showTagline && (
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`h-[1.5px] w-3 ${lineColor}`} />
            <span className={`text-[9px] font-bold uppercase tracking-[0.18em] ${taglineColor} leading-none`}>
              From Setback To Comeback
            </span>
            <span className={`h-[1.5px] w-3 ${lineColor}`} />
          </div>
        )}
      </div>
    </div>
  );
};

