import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';
import { RehabiphyQrCode } from './RehabiphyQrCode';
import { PlayStoreIcon } from './PlayStoreIcon';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Title */}
          <div className="space-y-3 mb-6 text-center flex flex-col items-center">
            <RehabiphyLogo variant="light" showTagline={true} layout="vertical" iconSize={54} />
            <p className="text-xs text-slate-500 pt-1">
              Get 3D AI camera pose tracking and daily habit loops on your phone.
            </p>
          </div>

          <div className="space-y-5">
            {/* Store Button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.rehabiphy"
              target="_blank"
              rel="noreferrer"
              className="w-fit mx-auto px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-2.5 transition-transform hover:scale-102"
            >
              <PlayStoreIcon className="w-6 h-6 shrink-0" />
              <div className="text-left">
                <span className="text-[9px] text-slate-400 uppercase font-medium block leading-tight">Get it on</span>
                <span className="text-xs font-bold font-heading leading-tight">Google Play</span>
              </div>
            </a>

            {/* QR Code Container */}
            <div className="bg-[#F8FFFC] p-4 rounded-2xl border border-[#0F766E]/15 text-center space-y-3">
              <p className="text-xs font-bold text-slate-800">Scan QR Code with your camera:</p>
              
              <div className="p-3 bg-white rounded-xl border-2 border-[#22C55E] inline-block shadow-sm">
                <RehabiphyQrCode size={112} />
              </div>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={onClose}
                className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
              >
                Close
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
