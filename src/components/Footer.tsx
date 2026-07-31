import React from 'react';
import { ShieldCheck, Mail, MapPin, Heart } from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface FooterProps {
  onOpenAiModal: () => void;
  onOpenDownloadModal: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenAiModal,
  onOpenDownloadModal,
  onOpenPrivacy,
  onOpenTerms,
  onOpenContact,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="inline-block hover:opacity-90 transition-opacity">
              <RehabiphyLogo variant="dark" showTagline={true} layout="horizontal" iconSize={40} />
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Rehabiphy is an AI-powered physiotherapy and rehabilitation platform. 
              Helping patients recover faster with real-time 3D camera pose analysis, senior physiotherapists, and personalized habit programs.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>HIPAA Compliant • Encrypted Health Data</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-[#22C55E] transition-colors">Key Features</a>
              </li>
              <li>
                <a href="#why-rehabiphy" className="hover:text-[#22C55E] transition-colors">Why Rehabiphy</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-[#22C55E] transition-colors">How It Works</a>
              </li>
              <li>
                <button onClick={onOpenAiModal} className="hover:text-[#22C55E] transition-colors text-left">
                  AI Symptom Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Audience Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">Care Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#patients" className="hover:text-[#22C55E] transition-colors">For Patients</a>
              </li>
              <li>
                <a href="#physiotherapists" className="hover:text-[#22C55E] transition-colors">For Physiotherapists</a>
              </li>
              <li>
                <button onClick={onOpenDownloadModal} className="hover:text-[#22C55E] transition-colors text-left">
                  Download Mobile App
                </button>
              </li>
              <li>
                <button onClick={onOpenAiModal} className="hover:text-[#22C55E] transition-colors text-left">
                  AI Symptom Assessment
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white font-heading uppercase tracking-wider">Contact & Help</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>support@rehabiphy.com</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Lucknow, UP, India</span>
              </li>
              <li>
                <button onClick={onOpenContact} className="flex items-center gap-2 text-slate-400 hover:text-[#22C55E] transition-colors">
                  <span className="w-3.5 h-3.5 text-[#22C55E] inline-flex items-center justify-center">→</span>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Clinical Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} Rehabiphy Inc. All rights reserved. 
            <span className="block sm:inline text-[11px] mt-1 sm:mt-0 sm:ml-2 text-slate-600">
              Medical Disclaimer: Rehabiphy AI assists movement guidance and does not replace emergency medical advice.
            </span>
          </p>

          <div className="flex items-center gap-4 text-xs">
            <button onClick={onOpenPrivacy} className="hover:text-slate-300 transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors">Terms of Service</button>
            <span>•</span>
            <a href="#" className="hover:text-slate-300 transition-colors">HIPAA Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
