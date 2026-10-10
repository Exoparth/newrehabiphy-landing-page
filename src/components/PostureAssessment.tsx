import React from 'react';
import { Camera, CheckCircle2, FileText, Info, ScanLine, Smartphone, Sparkles, TrendingUp } from 'lucide-react';

interface PostureAssessmentProps {
  onOpenDownloadModal: () => void;
}

const STEPS = [
  {
    icon: Camera,
    title: 'Take 4 photos',
    text: 'Front, back, left side and right side, using your phone camera. The whole thing takes about 2 minutes.',
  },
  {
    icon: ScanLine,
    title: 'AI screens your alignment',
    text: 'The app measures how your head, shoulders, trunk, pelvis, knees and feet line up, and compares each one with a typical range.',
  },
  {
    icon: FileText,
    title: 'Get your posture report',
    text: 'A posture score out of 100, your strongest areas, areas to work on and general next steps, with a PDF you can download.',
  },
  {
    icon: TrendingUp,
    title: 'Follow your posture journey',
    text: 'Earlier assessments stay in the app, so you can repeat the screening later and see what has changed.',
  },
];

const SCREENED_AREAS = [
  'Forward head position',
  'Head tilt',
  'Shoulder asymmetry',
  'Arm hang symmetry',
  'Trunk alignment',
  'Lateral trunk shift',
  'Pelvic obliquity',
  'Knee alignment',
  'Knee flexion',
  'Ankle alignment',
  'Foot alignment',
  'Overall body alignment',
];

const PHOTO_TIPS = [
  'Wear reasonably fitted clothing',
  'Stand in a well-lit area',
  'Remove bulky jackets',
  'Keep your full body visible in the frame',
  'Stand naturally, feet shoulder-width apart',
];

export const PostureAssessment: React.FC<PostureAssessmentProps> = ({ onOpenDownloadModal }) => {
  return (
    <section id="posture-assessment" className="py-20 lg:py-28 bg-[#F8FFFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
            New in the App
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            AI Posture{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">
              Assessment.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Take four quick photos and the Rehabiphy app screens your posture for common alignment patterns. Free to use
            once every 15 days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: How the assessment works */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="bg-white rounded-3xl p-6 border border-[#0F766E]/15 shadow-md">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#0F766E]" />
                  </div>
                  <span className="text-[10px] font-bold font-mono text-slate-400">STEP {i + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900 font-heading">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Right Column: What gets screened */}
          <div className="lg:col-span-5 bg-[#0B132B] text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-[#22C55E]">WHAT THE SCREENING LOOKS AT</span>
              <span className="text-[10px] font-mono text-slate-400">4 Views</span>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {SCREENED_AREAS.map((area) => (
                <li key={area} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <p className="pt-4 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              Each area is reported as within the typical range, or as a mild, moderate or significant difference from
              it, in plain language.
            </p>
          </div>
        </div>

        {/* Photo tips + disclaimer */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/90">
            <h3 className="text-sm font-bold text-slate-900 font-heading">For best results</h3>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
              {PHOTO_TIPS.map((tip) => (
                <li key={tip} className="flex items-center gap-2 text-xs text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-amber-50 rounded-3xl p-6 border border-amber-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              This is an automated postural screening based on photo analysis, not a medical diagnosis or clinical
              assessment. Please consult a licensed physiotherapist for a full evaluation.
            </p>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 bg-[#0F766E] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-heading">Check your posture in about 2 minutes</h3>
            <p className="text-xs sm:text-sm text-emerald-100 mt-1">
              The AI Posture Assessment is in the Rehabiphy app for Android — free every 15 days, or unlimited with an
              upgrade.
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
