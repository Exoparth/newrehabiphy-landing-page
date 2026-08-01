import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HOW_IT_WORKS_STEPS } from '../data';
import { Smartphone, Scan, Video, TrendingUp, CheckCircle2, ArrowRight, Download, Sparkles, Activity } from 'lucide-react';

interface HowItWorksProps {
  onOpenDownloadModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenDownloadModal,
}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone':
        return Smartphone;
      case 'Scan':
        return Scan;
      case 'Video':
        return Video;
      default:
        return TrendingUp;
    }
  };

  const currentStepData = HOW_IT_WORKS_STEPS.find((s) => s.step === activeStep) || HOW_IT_WORKS_STEPS[0];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-[#F8FFFC] relative overflow-hidden border-y border-[#0F766E]/10">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F766E]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[#0F766E]/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              End-to-End Recovery Flow
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              How Rehabiphy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">works.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            From initial smartphone posture scan to certified specialist consultations and daily habit streaks in 4 effortless steps.
          </p>
        </div>

        {/* Horizontal Kinetic Flow Pipeline Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {HOW_IT_WORKS_STEPS.map((stepItem) => {
            const Icon = getStepIcon(stepItem.iconName);
            const isActive = activeStep === stepItem.step;

            return (
              <button
                key={stepItem.step}
                onClick={() => setActiveStep(stepItem.step)}
                className={`p-5 rounded-2xl transition-all text-left border relative overflow-hidden group ${
                  isActive
                    ? 'bg-white border-[#0F766E] shadow-xl ring-2 ring-[#0F766E]/20 scale-[1.02]'
                    : 'bg-white/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-[#0F766E] text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    0{stepItem.step}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#0F766E]' : 'text-slate-400'}`} />
                </div>

                <h3 className="text-sm font-bold text-slate-900 font-heading">
                  {stepItem.title}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {stepItem.subtitle}
                </p>

                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F766E] to-[#22C55E]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-2xl border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Step Description */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#0F766E] text-xs font-bold font-mono">
              <span>Step 0{currentStepData.step} / 04</span>
              <span>•</span>
              <span>{currentStepData.subtitle}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
              {currentStepData.title}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {currentStepData.description}
            </p>

            <div className="space-y-3 pt-2">
              {currentStepData.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <button
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-full shadow-md transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Get App for Step 0{currentStepData.step}</span>
              </button>

              <button
                onClick={() => setActiveStep((prev) => (prev % 4) + 1)}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full transition-all"
              >
                <span>Next Phase</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Mockup Canvas */}
          <div className="lg:col-span-5 bg-[#0B132B] rounded-2xl p-6 text-white border border-slate-800 shadow-2xl flex flex-col justify-between min-h-[320px]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-[#22C55E] bg-[#22C55E]/15 px-3 py-1 rounded-full border border-[#22C55E]/30 font-mono">
                {currentStepData.mockupData.badge}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Rehabiphy Engine v2.4</span>
            </div>

            <div className="my-6 space-y-3">
              <h4 className="text-xl font-bold font-heading text-white">
                {currentStepData.mockupData.title}
              </h4>
              <p className="text-xs font-mono text-[#22C55E] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>{currentStepData.mockupData.status}</span>
              </p>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-200 font-sans leading-relaxed">
                {currentStepData.mockupData.value}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Cloud Sync: Active</span>
              <span className="text-[#22C55E] font-bold">99.8% Accuracy</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
