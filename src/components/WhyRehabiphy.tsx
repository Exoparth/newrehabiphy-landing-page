import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Users, Activity, TrendingUp, CheckCircle2, Shield, Zap } from 'lucide-react';

export const WhyRehabiphy: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);
  const [selectedAngle, setSelectedAngle] = useState<number>(145);

  const pillars = [
    {
      id: 'ai-vision',
      title: '3D Computer Vision Joint Mesh',
      subtitle: 'Sub-Degree Motion Science',
      description: 'Your smartphone camera turns into a clinical movement lab. Our AI models trace 33 3D skeletal landmarks in real-time, calculating joint flexion velocity, torque, and compensatory form deviations with 99.2% accuracy.',
      icon: Sparkles,
      angle: 172,
      metrics: [
        { label: 'Tracking Accuracy', value: '99.2%' },
        { label: 'Latency', value: '< 18ms' },
        { label: 'Pose Points', value: '33 Mesh Nodes' },
      ],
      highlights: [
        'Real-time audio correction coaching',
        'Automatic compensation warnings',
        'Zero wearable sensors or hardware required'
      ]
    },
    {
      id: 'physio-network',
      title: 'Qualified & Licensed Physiotherapists',
      subtitle: 'Clinical Excellence & Care',
      description: 'Human clinical insight powers every decision. You are matched 1-on-1 with verified, licensed senior physiotherapists for hybrid tele-rehab video consultations or doorstep home visits.',
      icon: Users,
      angle: 135,
      metrics: [
        { label: 'Clinical Vetting', value: 'Top 1%' },
        { label: 'Availability', value: '24/7 Messaging' },
        { label: 'Care Model', value: 'Hybrid & Home' },
      ],
      highlights: [
        'Direct 1-on-1 physio video consultations',
        'Doorstep home visit physical care options',
        'Continuous plan adjustments based on AI data'
      ]
    },
    {
      id: 'habit-loops',
      title: '10-Minute Daily Micro-Habits',
      subtitle: 'Sustainable Habit Loops',
      description: 'True recovery is built on daily consistency. Bite-sized 10-minute routines, gamified streak rewards, pain logging, and automated reminders yield an industry-leading 88% patient adherence rate.',
      icon: Activity,
      angle: 110,
      metrics: [
        { label: 'Patient Adherence', value: '88%' },
        { label: 'Session Length', value: '10-15 Mins' },
        { label: 'Streak Bonus', value: '+10 Coins/Day' },
      ],
      highlights: [
        'Bite-sized daily habit programs',
        'Daily swelling & pain score logger',
        'Gamified milestone badges and rewards'
      ]
    },
    {
      id: 'outcomes',
      title: '3x Accelerated Recovery Timelines',
      subtitle: 'Evidence-Based Outcomes',
      description: 'By merging continuous camera posture audits with weekly therapist plan recalibrations, Rehabiphy patients regain full range of motion up to 3 times faster than standard clinic-only care.',
      icon: TrendingUp,
      angle: 168,
      metrics: [
        { label: 'Healing Speed', value: '3x Faster' },
        { label: 'Re-Injury Reduction', value: '65%' },
        { label: 'Biometric Export', value: 'Surgeon Ready' },
      ],
      highlights: [
        'Surgeon-ready biometric PDF progress exports',
        'Reduced post-operative recovery timelines',
        'Continuous clinical tracking between appointments'
      ]
    }
  ];

  const currentPillar = pillars[activePillar];

  return (
    <section id="why-rehabiphy" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#0F766E]/5 blur-3xl rounded-full pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/8 border border-[#0F766E]/15 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
              The Clinical Standard
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">precision healing.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Traditional physiotherapy leaves you unguided between weekly clinic visits. 
            Rehabiphy bridges the gap with continuous AI vision and licensed expert oversight.
          </p>
        </div>

        {/* Custom Asymmetrical Layout (Split 5 / 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Interactive Pillar Selector List */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              const isSelected = activePillar === idx;

              return (
                <button
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(idx);
                    setSelectedAngle(pillar.angle);
                  }}
                  className={`p-5 rounded-2xl transition-all text-left border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-[#0B132B] text-white border-slate-800 shadow-xl scale-[1.02]'
                      : 'bg-slate-50/80 hover:bg-slate-100/80 text-slate-800 border-slate-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#0F766E] text-white' : 'bg-white text-slate-700 shadow-xs'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${
                        isSelected ? 'text-[#22C55E]' : 'text-[#0F766E]'
                      }`}>
                        {pillar.subtitle}
                      </span>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isSelected ? 'bg-[#22C55E] text-slate-950' : 'bg-slate-200 text-slate-600'
                    }`}>
                      0{idx + 1}
                    </div>
                  </div>

                  <h3 className={`text-base font-bold font-heading ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>

                  <p className={`text-xs mt-1 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {pillar.description}
                  </p>

                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0F766E] to-[#22C55E]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column: High-End Visual Biomechanics Display Canvas */}
          <div className="lg:col-span-7 bg-[#0B132B] rounded-3xl p-6 sm:p-10 border border-slate-800 text-white shadow-2xl flex flex-col justify-between relative overflow-hidden">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 relative z-10"
              >
                {/* Top Badge & Dial */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-ping" />
                    <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider font-mono">
                      Clinical Biomechanics Engine
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                    Target Angle: {selectedAngle}°
                  </span>
                </div>

                {/* Content Story */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#0F766E] bg-[#0F766E]/20 px-3 py-1 rounded-full border border-[#0F766E]/30">
                    {currentPillar.subtitle}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    {currentPillar.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-normal">
                    {currentPillar.description}
                  </p>
                </div>

                {/* Live Biometric Metrics Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {currentPillar.metrics.map((metric, i) => (
                    <div key={i} className="p-3.5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-[10px] uppercase font-mono text-slate-400">{metric.label}</p>
                      <p className="text-base sm:text-lg font-black text-[#22C55E] font-heading">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Highlights Check List */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  {currentPillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
};
