import React from 'react';

interface PlayStoreIconProps {
  className?: string;
}

export const PlayStoreIcon: React.FC<PlayStoreIconProps> = ({ className = 'w-6 h-6' }) => {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.408 12l2.29-2.491zM5.864 2.658L16.802 8.99l-2.302 2.302-8.635-8.634z" />
    </svg>
  );
};
