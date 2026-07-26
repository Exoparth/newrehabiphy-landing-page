import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, Stethoscope, CheckCircle, ArrowRight, Shield, Zap, TrendingUp, DollarSign, Clock } from 'lucide-react';

interface AudienceTabProps {
  onOpenDownloadModal: () => void;
}

export const AudienceTab: React.FC<AudienceTabProps> = ({
  onOpenDownloadModal,
}) => {
  const [activeAudience, setActiveAudience] = useState<'patient' | 'physio'>('patient');

  return (
    <section id="patients" className="py-20 lg:py-28 bg-[#F8FFFC] relative">
      <div id="physiotherapists" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-[#22C55E]" />
            Tailored Experiences
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Built for Patients. <br />
            Empowered for Physiotherapists.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Whether you are recovering from an injury or running a clinical physiotherapy practice, Rehabiphy transforms care delivery.
          </p>
        </div>

        {/* Audience Toggle Switcher */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-200/80 p-1.5 rounded-full flex items-center gap-2 border border-slate-300/80 max-w-md w-full">
            <button
              onClick={() => setActiveAudience('patient')}
              className={`flex-1 py-3 px-6 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeAudience === 'patient'
                  ? 'bg-[#0F766E] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              For Patients
            </button>

            <button
              onClick={() => setActiveAudience('physio')}
              className={`flex-1 py-3 px-6 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeAudience === 'physio'
                  ? 'bg-[#0F766E] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              For Physiotherapists
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {activeAudience === 'patient' ? (
            /* Patients View */
            <>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 text-[#0F766E] text-xs font-bold">
                  <span>Patient Recovery Advantage</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Recover safely from home with instant expert guidance.
                </h3>

                <p className="text-base text-slate-600 leading-relaxed">
                  No more traveling across town in pain or waiting weeks for physical therapy slots. Rehabiphy gives you 24/7 AI posture monitoring and direct access to qualified and licensed physiotherapists.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: 'Home Visits & Video Calls', desc: 'Book doorstep visits or HD video consultations at your preferred time.' },
                    { title: 'Sub-Degree Camera AI', desc: 'Real-time joint angle checking so you perform every rep safely.' },
                    { title: '10-Min Habit Streaks', desc: 'Bite-sized daily micro-routines that fit into busy work schedules.' },
                    { title: 'Insurance Receipts', desc: 'Receive itemized medical receipts for HSA/FSA & health insurance claims.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#F8FFFC] rounded-2xl border border-[#0F766E]/15 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-heading">
                        <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex flex-wrap gap-3">
                  <button
                    onClick={onOpenDownloadModal}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-full shadow-md transition-all"
                  >
                    Download Mobile App
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-[#22C55E]">PATIENT RECOVERY SCORECARD</span>
                  <span className="text-[10px] font-mono text-slate-400">94% Success Rate</span>
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Avg. Recovery Acceleration</span>
                    <span className="text-[#22C55E] font-bold font-mono">2.8x Faster</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Exercise Form Accuracy</span>
                    <span className="text-white font-bold font-mono">99.2% Correct</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Patient Satisfaction Score</span>
                    <span className="text-amber-400 font-bold font-mono">4.9 / 5.0 ★</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300">
                  "I was back on the tennis court in 8 weeks after my rotator cuff strain. The AI camera alignment feedback kept me accountable every single day."
                </div>
              </div>
            </>
          ) : (
            /* Physiotherapists View */
            <>
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold">
                  <span>For Certified Physiotherapists & Clinics</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  Scale your practice. Eliminate manual charting overhead.
                </h3>

                <p className="text-base text-slate-600 leading-relaxed">
                  Join Rehabiphy’s network of qualified and licensed physiotherapists. Expand your patient catchment area, deliver hybrid video and home care, and let AI computer vision generate automated patient range-of-motion reports.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {[
                    { title: 'Automated ROM Charting', desc: 'AI auto-logs joint angles and rep compliance, saving 45 mins of daily paperwork.' },
                    { title: '88% Patient Adherence', desc: 'Dynamic mobile habit tracking dramatically increases patient plan completion.' },
                    { title: 'Flexible Home & Tele-Care', desc: 'Set your own consultation hours, virtual slots, or local home visit zones.' },
                    { title: 'Seamless Billing & EHR Sync', desc: 'Instant HIPAA-compliant medical notes and automated payout transfers.' }
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#F8FFFC] rounded-2xl border border-[#0F766E]/15 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm font-heading">
                        <CheckCircle className="w-4 h-4 text-[#22C55E]" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <a
                    href="mailto:partners@rehabiphy.com?subject=Physiotherapist%20Partner%20Inquiry"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] rounded-full shadow-md transition-all"
                  >
                    <Stethoscope className="w-4 h-4" />
                    Apply as Partner Physiotherapist
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold text-[#22C55E]">PHYSICIAN & PRACTICE DASHBOARD</span>
                  <span className="text-[10px] font-mono text-slate-400">HIPAA Certified</span>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">Time Saved per Patient</p>
                      <p className="text-lg font-bold text-[#22C55E] font-heading">45 Mins / Day</p>
                    </div>
                    <Clock className="w-6 h-6 text-[#22C55E]" />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">Patient Retention Rate</p>
                      <p className="text-lg font-bold text-white font-heading">88% Adherence</p>
                    </div>
                    <TrendingUp className="w-6 h-6 text-[#0F766E]" />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400">Average Practice Revenue</p>
                      <p className="text-lg font-bold text-emerald-400 font-heading">+35% Growth</p>
                    </div>
                    <DollarSign className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
};
