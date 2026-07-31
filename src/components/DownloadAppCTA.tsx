import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Download, QrCode, Star, Sparkles, ShieldCheck } from 'lucide-react';

interface DownloadAppCTAProps {
  onOpenDownloadModal: () => void;
}

export const DownloadAppCTA: React.FC<DownloadAppCTAProps> = ({ onOpenDownloadModal }) => {

  return (
    <section className="py-20 lg:py-28 bg-[#0F766E] text-white relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#22C55E]/20 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#115E59] blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & Download Links */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              Start Your Recovery Journey
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading leading-tight">
              Download Rehabiphy today. <br />
              <span className="text-[#22C55E]">Your comeback starts now.</span>
            </h2>

            <p className="text-base sm:text-lg text-emerald-100 font-normal leading-relaxed max-w-xl">
              Get the 3D AI camera movement analyzer, book 1-on-1 virtual sessions with senior physiotherapists, and track daily habit recovery streaks.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="flex items-center gap-3 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-800 shadow-xl transition-transform hover:scale-105"
              >
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">Download on the</span>
                  <span className="text-base font-bold font-heading text-white">Apple App Store</span>
                </div>
              </button>

              <button
                onClick={onOpenDownloadModal}
                className="flex items-center gap-3 px-6 py-3.5 bg-slate-950 hover:bg-slate-900 rounded-2xl border border-slate-800 shadow-xl transition-transform hover:scale-105"
              >
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">GET IT ON</span>
                  <span className="text-base font-bold font-heading text-white">Google Play Store</span>
                </div>
              </button>
            </div>

            {/* App Rating Badges */}
            <div className="pt-4 flex items-center gap-6 text-xs text-emerald-100">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-white">4.9 / 5.0 Rating</span>
              </div>
            </div>

          </div>

          {/* Right Column QR Code & App Mockup Container */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl text-center space-y-6 max-w-sm w-full relative">
              <div className="w-12 h-12 rounded-2xl bg-[#0F766E] mx-auto flex items-center justify-center text-[#22C55E]">
                <QrCode className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold font-heading text-white">Scan to Download</h3>
                <p className="text-xs text-slate-400 mt-1">Point your camera to install Rehabiphy instantly</p>
              </div>

              {/* QR Code Graphic Box */}
              <div className="p-4 bg-white rounded-2xl border-4 border-[#22C55E] mx-auto inline-block shadow-lg">
                <svg className="w-36 h-36" viewBox="0 0 100 100" fill="currentColor">
                  {/* Styled QR Code Matrix */}
                  <rect width="100" height="100" fill="white" />
                  {/* Position detection markers */}
                  <rect x="5" y="5" width="25" height="25" fill="#0F766E" />
                  <rect x="9" y="9" width="17" height="17" fill="white" />
                  <rect x="13" y="13" width="9" height="9" fill="#0F766E" />

                  <rect x="70" y="5" width="25" height="25" fill="#0F766E" />
                  <rect x="74" y="9" width="17" height="17" fill="white" />
                  <rect x="78" y="13" width="9" height="9" fill="#0F766E" />

                  <rect x="5" y="70" width="25" height="25" fill="#0F766E" />
                  <rect x="9" y="74" width="17" height="17" fill="white" />
                  <rect x="13" y="78" width="9" height="9" fill="#0F766E" />

                  {/* QR Data Pattern */}
                  <rect x="35" y="10" width="8" height="8" fill="#22C55E" />
                  <rect x="45" y="15" width="8" height="8" fill="#0F766E" />
                  <rect x="55" y="10" width="8" height="8" fill="#22C55E" />
                  <rect x="35" y="35" width="10" height="10" fill="#0F766E" />
                  <rect x="50" y="35" width="15" height="10" fill="#22C55E" />
                  <rect x="70" y="35" width="10" height="10" fill="#0F766E" />
                  <rect x="35" y="55" width="12" height="12" fill="#22C55E" />
                  <rect x="55" y="55" width="12" height="12" fill="#0F766E" />
                  <rect x="70" y="55" width="10" height="10" fill="#22C55E" />
                  <rect x="35" y="75" width="15" height="10" fill="#0F766E" />
                  <rect x="55" y="75" width="15" height="10" fill="#22C55E" />
                  <rect x="75" y="75" width="10" height="10" fill="#0F766E" />
                </svg>
              </div>

              <div className="pt-2 text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                <span>Compatible with iOS 16+ and Android 10+</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
