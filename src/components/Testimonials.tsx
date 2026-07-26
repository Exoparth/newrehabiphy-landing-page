import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data';
import { Star, ShieldCheck, Quote, TrendingUp, CheckCircle2, Smartphone } from 'lucide-react';

interface TestimonialsProps {
  onOpenDownloadModal: () => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenDownloadModal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredTestimonials = activeFilter === 'all'
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.filter((t) => t.condition.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
            Real Patient Comebacks
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Stories of recovery and <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">
              renewed movement.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            See how real patients overcome injuries, surgery, and chronic joint pain with Rehabiphy.
          </p>
        </div>

        {/* Condition Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'all', label: 'All Comebacks' },
            { id: 'ACL', label: 'ACL & Knee' },
            { id: 'Sciatica', label: 'Lower Back & Sciatica' },
            { id: 'Rotator', label: 'Shoulder & Rotator Cuff' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === btn.id
                  ? 'bg-[#0F766E] text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTestimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F8FFFC] rounded-3xl p-6 border border-[#0F766E]/15 shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
            >
              <div className="space-y-4">
                {/* Top Rating & Condition Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E]">
                    {t.condition}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm text-slate-700 leading-relaxed font-normal italic relative pt-2">
                  "{t.quote}"
                </p>

                {/* Before vs After Biometric Progress */}
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/90 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] text-slate-500 font-medium">
                    <span>{t.metrics.label}</span>
                    <span className="text-[#0F766E] font-bold">{t.recoveryTime}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 bg-red-50 rounded-lg text-red-700 border border-red-100">
                      <span className="text-[10px] block text-red-500">Before</span>
                      <span className="font-bold">{t.metrics.before}</span>
                    </div>

                    <div className="p-2 bg-emerald-50 rounded-lg text-emerald-800 border border-emerald-100">
                      <span className="text-[10px] block text-emerald-600">After Rehabiphy</span>
                      <span className="font-bold">{t.metrics.after}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Profile Footer */}
              <div className="pt-6 border-t border-slate-200/70 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#0F766E]/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 font-heading">{t.author}</h4>
                    <p className="text-[10px] text-slate-500">{t.role}, {t.age} y/o</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] text-slate-400 block">Assigned Physio</span>
                  <span className="text-[10px] font-bold text-[#0F766E]">{t.physioName.split(',')[0]}</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-16 text-center bg-[#0F766E] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading">Ready for your own comeback story?</h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              Download the Rehabiphy app today for real-time camera motion feedback and custom habit loops.
            </p>
          </div>

          <button
            onClick={onOpenDownloadModal}
            className="shrink-0 px-6 py-3.5 text-xs font-bold text-slate-950 bg-[#22C55E] hover:bg-[#16a34a] rounded-full shadow-md transition-all flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            Get Rehabiphy App
          </button>
        </div>

      </div>
    </section>
  );
};
