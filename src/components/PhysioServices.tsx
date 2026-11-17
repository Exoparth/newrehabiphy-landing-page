import React from 'react';
import { motion } from 'motion/react';
import {
  Stethoscope,
  Bone,
  Activity,
  PersonStanding,
  Wind,
  HeartPulse,
  Accessibility,
  Check,
  Video,
} from 'lucide-react';

// Mirrors the physiotherapy programmes offered in the Rehabiphy app
// (REHAB.conditions in the Fithabit backend's providerWebConfig.js).
const PHYSIO_PROGRAMMES = [
  {
    title: 'Neck pain',
    programme: 'Neck Pain Recovery Programme',
    description: 'Fix the “phone neck” habit with gentle mobility, strength and ergonomic coaching.',
    icon: Wind,
    duration: '3 months',
    price: '₹1,499',
    isNew: false,
  },
  {
    title: 'Shoulder pain',
    programme: 'Shoulder Pain Recovery Programme',
    description: 'Restore overhead movement, release tension and rebuild shoulder strength step by step.',
    icon: PersonStanding,
    duration: '3 months',
    price: '₹1,499',
    isNew: false,
  },
  {
    title: 'Back pain',
    programme: 'Back Pain Recovery Programme',
    description: 'Core control, posture and mobility routines to ease stiffness from desks, driving and daily life.',
    icon: Activity,
    duration: '3 months',
    price: '₹1,499',
    isNew: false,
  },
  {
    title: 'Knee pain',
    programme: 'Knee Pain Recovery Programme',
    description: 'Strengthen stabilising muscles, improve range and move through stairs and squats with confidence.',
    icon: Bone,
    duration: '6 months',
    price: '₹2,299',
    isNew: false,
  },
  {
    title: "Women's pelvic & hormonal health",
    programme: "Women's Pelvic & Hormonal Health Programme",
    description:
      'Pelvic floor strengthening, core and posture work, and movement support for pregnancy, postpartum, PCOS and menopause, in a private, judgement-free space.',
    icon: HeartPulse,
    duration: '3 months',
    price: '₹1,499',
    isNew: true,
  },
  {
    title: 'Geriatric & elderly care',
    programme: 'Geriatric / Elderly Care Programme',
    description:
      'Physiotherapy for arthritis, stiff joints, weakness and everyday aches, with a gentle pace and a focus on safe, independent living.',
    icon: Accessibility,
    duration: '3 months',
    price: '₹1,499',
    isNew: true,
  },
];

const PROGRAMME_FEATURES = [
  '3 live online group classes per week',
  '30–45 minutes per session',
  'Qualified physiotherapist-led sessions',
  'Condition-specific exercise protocols',
  'Individual screening before enrolment',
  'Home exercise guidance',
  'Regular progress monitoring',
];

export const PhysioServices: React.FC = () => {
  return (
    <section id="physiotherapy" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
              <Stethoscope className="w-3.5 h-3.5 text-[#22C55E]" />
              Online Physiotherapy Programmes
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Start where it <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">hurts.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Condition-specific recovery programmes run as live online group classes, led by qualified physiotherapists. Join from home, three times a week.
          </p>
        </div>

        {/* Programme Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PHYSIO_PROGRAMMES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="group relative bg-[#F8FFFC] rounded-3xl p-7 border border-[#0F766E]/10 hover:border-[#0F766E]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0F766E]/10 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0B132B] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-7 h-7 text-[#22C55E]" strokeWidth={1.8} />
                  </div>
                  {item.isNew && (
                    <span className="text-[11px] font-bold text-white bg-[#22C55E] px-2.5 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 font-heading">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-[#0F766E] mt-1 mb-2.5">{item.programme}</p>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {item.description}
                </p>

                <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-[#0F766E]/10">
                  <span className="text-[11px] font-bold text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
                    {item.duration} · Live group classes
                  </span>
                  <span className="text-sm font-extrabold text-slate-900">{item.price}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* What every programme includes */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-[#0B132B] rounded-3xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7">
            <h3 className="text-2xl font-extrabold text-white font-heading mb-5">Every programme includes</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROGRAMME_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#22C55E]/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-[#22C55E]/15 flex items-center justify-center">
                <Video className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-bold font-heading">Not sure which programme?</p>
                <p className="text-xs text-slate-400">1-on-1 online consultation</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Talk to a physiotherapist on a 20-minute video call for just <span className="text-white font-bold">₹29</span>, or try{' '}
              <span className="text-white font-bold">2 free live classes</span> before you enrol.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
