import React from 'react';

interface PlayStoreIconProps {
  className?: string;
}

export const PlayStoreIcon: React.FC<PlayStoreIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Play-triangle fan: green (top), yellow (tip), red (bottom) */}
      <path d="M22,12 L22,36 L90,50 Z" fill="#00E676" />
      <path d="M22,36 L22,64 L90,50 Z" fill="#FFCE00" />
      <path d="M22,64 L22,88 L90,50 Z" fill="#FF3A44" />
      {/* Blue diagonal stroke overlaid on top, like the real logo */}
      <path d="M22,12 L58,50 L22,88 Z" fill="#32BBFF" />
    </svg>
  );
};
