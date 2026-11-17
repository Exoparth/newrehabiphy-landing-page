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
} from 'lucide-react';

const PHYSIO_SERVICES = [
  {
    title: 'Knee pain',
    description: 'Strengthen stabilising muscles, improve range and move through stairs and squats with confidence.',
    icon: Bone,
    chip: 'Group class',
    isNew: false,
  },
  {
    title: 'Back pain',
    description: 'Core control, posture and mobility routines to ease stiffness from desks, driving and daily life.',
    icon: Activity,
    chip: 'Group class',
    isNew: false,
  },
  {
    title: 'Shoulder pain',
    description: 'Restore overhead movement, release tension and rebuild shoulder strength step by step.',
    icon: PersonStanding,
    chip: 'Group class',
    isNew: false,
  },
  {
    title: 'Neck pain',
    description: 'Fix the “phone neck” habit with gentle mobility, strength and ergonomic coaching.',
    icon: Wind,
    chip: 'Group class',
    isNew: false,
  },
  {
    title: "Women's pelvic & hormonal health",
    description:
      'Pelvic floor strengthening, core and posture work, and movement support for pregnancy, postpartum, PCOS and menopause, in a private, judgement-free space.',
    icon: HeartPulse,
    chip: 'Women-led care',
    isNew: true,
  },
  {
    title: 'Geriatric & elderly care',
    description:
      'Physiotherapy for arthritis, stiff joints, weakness and recovery from everyday aches, with a gentle pace and a focus on safe, independent living.',
    icon: Accessibility,
    chip: 'Senior-friendly',
    isNew: true,
  },
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
              Online Physiotherapy
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Start where it <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">hurts.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Guided physio sessions led by qualified physiotherapists, covering the most common pain areas plus women's pelvic and hormonal health and elderly care. Progress at your own pace from home.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PHYSIO_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className="group relative bg-[#F8FFFC] rounded-3xl p-7 border border-[#0F766E]/10 hover:border-[#0F766E]/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#0F766E]/10 transition-all duration-300 flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0B132B] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-7 h-7 text-[#22C55E]" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 font-heading mb-2.5">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 mt-5">
                  {service.isNew && (
                    <span className="text-[11px] font-bold text-white bg-[#22C55E] px-2.5 py-1 rounded-full">
                      New
                    </span>
                  )}
                  <span className="text-[11px] font-bold text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
                    {service.chip}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
