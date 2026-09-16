import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logoImage from '../../assets/Rehabiphy512x512.png';

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.rehabiphy';

interface RehabiphyQrCodeProps {
  size?: number;
  className?: string;
}

export const RehabiphyQrCode: React.FC<RehabiphyQrCodeProps> = ({ size = 144, className = '' }) => {
  return (
    <QRCodeSVG
      value={PLAY_STORE_URL}
      size={size}
      level="H"
      fgColor="#0F766E"
      bgColor="#FFFFFF"
      className={className}
      imageSettings={{
        src: logoImage,
        height: size * 0.24,
        width: size * 0.24,
        excavate: true,
      }}
    />
  );
};
