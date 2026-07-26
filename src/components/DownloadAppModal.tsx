import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Smartphone, QrCode, Send, CheckCircle2, Star, ShieldCheck, Sparkles } from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sentStatus, setSentStatus] = useState(false);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    setSentStatus(true);
    setTimeout(() => {
      setSentStatus(false);
      setPhoneNumber('');
    }, 4000);
  };

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
            {/* Store Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Rehabiphy App link generated!"); }}
                className="p-3.5 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl flex items-center justify-center text-center transition-transform hover:scale-102"
              >
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-medium block">Download on</span>
                  <span className="text-xs font-bold font-heading">App Store</span>
                </div>
              </a>

              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Rehabiphy App link generated!"); }}
                className="p-3.5 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl flex items-center justify-center text-center transition-transform hover:scale-102"
              >
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-medium block">Get it on</span>
                  <span className="text-xs font-bold font-heading">Google Play</span>
                </div>
              </a>
            </div>

            {/* QR Code Container */}
            <div className="bg-[#F8FFFC] p-4 rounded-2xl border border-[#0F766E]/15 text-center space-y-3">
              <p className="text-xs font-bold text-slate-800">Scan QR Code with your camera:</p>
              
              <div className="p-3 bg-white rounded-xl border-2 border-[#22C55E] inline-block shadow-sm">
                <svg className="w-28 h-28" viewBox="0 0 100 100" fill="currentColor">
                  <rect width="100" height="100" fill="white" />
                  <rect x="5" y="5" width="25" height="25" fill="#0F766E" />
                  <rect x="9" y="9" width="17" height="17" fill="white" />
                  <rect x="13" y="13" width="9" height="9" fill="#0F766E" />
                  <rect x="70" y="5" width="25" height="25" fill="#0F766E" />
                  <rect x="74" y="9" width="17" height="17" fill="white" />
                  <rect x="78" y="13" width="9" height="9" fill="#0F766E" />
                  <rect x="5" y="70" width="25" height="25" fill="#0F766E" />
                  <rect x="9" y="74" width="17" height="17" fill="white" />
                  <rect x="13" y="78" width="9" height="9" fill="#0F766E" />
                  <rect x="35" y="10" width="8" height="8" fill="#22C55E" />
                  <rect x="45" y="15" width="8" height="8" fill="#0F766E" />
                  <rect x="55" y="10" width="8" height="8" fill="#22C55E" />
                  <rect x="35" y="35" width="10" height="10" fill="#0F766E" />
                  <rect x="50" y="35" width="15" height="10" fill="#22C55E" />
                  <rect x="70" y="35" width="10" height="10" fill="#0F766E" />
                  <rect x="35" y="55" width="12" height="12" fill="#22C55E" />
                  <rect x="55" y="55" width="12" height="12" fill="#0F766E" />
                </svg>
              </div>
            </div>

            {/* Instant SMS Form */}
            <form onSubmit={handleSendSms} className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">Get instant SMS link:</label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 outline-none focus:border-[#0F766E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#115E59] text-white text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Send
                </button>
              </div>
              {sentStatus && (
                <p className="text-[11px] text-[#22C55E] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Link sent to your phone!
                </p>
              )}
            </form>

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
