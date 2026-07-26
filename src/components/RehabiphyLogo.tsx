import React from 'react';
import logoImage from '../../assets/Rehabiphy512x512.png';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  layout?: 'horizontal' | 'vertical' | 'icon-only';
  iconSize?: number | string;
}

export const RehabiphyIcon: React.FC<{ className?: string; size?: number | string }> = ({
  className = 'w-10 h-10',
  size,
}) => {
  return (
    <img
      src={logoImage}
      alt="Rehabiphy"
      className={className}
      style={size ? { width: size, height: size, objectFit: 'contain' } : { objectFit: 'contain' }}
      draggable={false}
    />
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
    <div className={`flex items-center gap-2.5 ${className}`}>
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
