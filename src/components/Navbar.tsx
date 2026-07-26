import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sparkles, Smartphone, ShieldCheck } from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface NavbarProps {
  onOpenAiModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAiModal,
  onOpenDownloadModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Why Rehabiphy', href: '#why-rehabiphy' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'For Patients', href: '#patients' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F8FFFC]/90 backdrop-blur-xl shadow-sm border-b border-[#0F766E]/10 py-2.5'
          : 'bg-[#F8FFFC]/60 backdrop-blur-sm py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="group flex items-center shrink-0 transition-transform hover:scale-[1.02]">
            <RehabiphyLogo variant="light" showTagline={false} layout="horizontal" iconSize={34} />
          </a>

          {/* Desktop Navigation Links — show only on xl (1280px+) */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200/80 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-[#0F766E] hover:bg-[#F8FFFC] rounded-full transition-colors whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs — show only on xl */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenAiModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold text-[#0F766E] bg-[#0F766E]/8 hover:bg-[#0F766E]/15 rounded-full transition-colors border border-[#0F766E]/20"
              title="Launch AI Symptom & Mobility Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              AI Assistant
            </button>

            <button
              onClick={onOpenDownloadModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E] rounded-full shadow-md shadow-[#0F766E]/25 hover:shadow-lg transition-all group"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Get App
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Tablet/Mobile Action Buttons + Hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Get App button — visible from sm up */}
            <button
              onClick={onOpenDownloadModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] rounded-full shadow-sm"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Get App
            </button>

            {/* Compact App button — visible only below sm */}
            <button
              onClick={onOpenDownloadModal}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold text-white bg-[#0F766E] rounded-full shadow-xs"
            >
              App
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 mt-2 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col gap-1.5">
              {/* Platform Badge */}
              <div className="p-3 bg-[#F8FFFC] rounded-xl border border-[#0F766E]/15 mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0F766E]">
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
                  AI-Powered Physiotherapy Platform
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  From setback to comeback. 24/7 motion assessment & certified specialist care.
                </p>
              </div>

              {/* Nav Links */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#0F766E] hover:bg-[#F8FFFC] rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* CTA Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5 mt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAiModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-[#0F766E] bg-[#0F766E]/10 rounded-xl"
                >
                  <Sparkles className="w-4 h-4 text-[#22C55E]" />
                  Launch AI Health Assistant
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDownloadModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#0F766E] rounded-xl shadow-md"
                >
                  <Smartphone className="w-4 h-4" />
                  Download Mobile App
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
