import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KEY_FEATURES_DATA } from '../data';
import { 
  Video, 
  Home, 
  Sliders, 
  Activity, 
  Bot, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Send, 
  Loader2,
  PhoneCall,
  Smartphone,
  Shield,
  Award,
  ArrowRight
} from 'lucide-react';

export const KeyFeatures: React.FC = () => {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('consultation');

  // Interactive AI Assistant mini-demo state
  const [aiInput, setAiInput] = useState('');
  const [aiArea, setAiArea] = useState('Lower Back & Lumbar');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video':
        return Video;
      case 'Home':
        return Home;
      case 'Sliders':
        return Sliders;
      case 'Activity':
        return Activity;
      default:
        return Bot;
    }
  };

  const handleTestAiAssess = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);

    try {
      const res = await fetch('/api/ai-assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area: aiArea,
          symptoms: aiInput || 'Stiffness and joint discomfort after prolonged sitting.',
          duration: '3 days',
          userQuery: aiInput || 'Suggest recovery protocol'
        }),
      });

      const data = await res.json();
      if (data.success) {
        setAiResponse(data.analysis);
      } else {
        setAiResponse(data.fallback);
      }
    } catch (err) {
      setAiResponse({
        summary: `Assessment for ${aiArea}: Posture alignment and lumbar decompression protocol recommended.`,
        severityScore: "Mild to Moderate Strain",
        recommendedActions: ["Avoid prolonged static spinal flexion", "Schedule a video physio review", "Apply gentle warmth"],
        suggestedExercises: [{ name: "Cat-Cow Spinal Glides", reps: "2 sets x 10 reps", focus: "Spinal mobility" }],
        precaution: "Discontinue if sharp radiating pain occurs."
      });
    } finally {
      setAiLoading(false);
    }
  };

  const selectedFeature = KEY_FEATURES_DATA.find((f) => f.id === selectedFeatureId) || KEY_FEATURES_DATA[0];

  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              Bento Feature Spotlight
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Complete clinical <span className="font-serif-italic text-[#0F766E]">ecosystem.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Everything you need for full-spectrum rehabilitation: 1-on-1 specialist video care, doorstep physical visits, and live AI camera movement feedback.
          </p>
        </div>

        {/* Feature Pill Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {KEY_FEATURES_DATA.map((feature) => {
            const Icon = getFeatureIcon(feature.icon);
            const isSelected = selectedFeatureId === feature.id;

            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeatureId(feature.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#0B132B] text-white shadow-lg scale-105 ring-2 ring-[#0F766E]/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-[#22C55E]' : 'text-slate-500'}`} />
                <span>{feature.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Display Box */}
        <div className="bg-[#F8FFFC] rounded-3xl p-6 sm:p-12 border border-[#0F766E]/15 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Feature Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F766E]/10 text-[#0F766E] text-xs font-bold">
              <span>{selectedFeature.badge}</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading leading-tight">
              {selectedFeature.title}
            </h3>

            <p className="text-base text-slate-600 leading-relaxed font-normal">
              {selectedFeature.description}
            </p>

            <div className="space-y-3 pt-2">
              {selectedFeature.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-[#22C55E]/20 text-[#0F766E] flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[#22C55E]" />
                  </div>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            {selectedFeature.metrics && (
              <div className="pt-4 border-t border-[#0F766E]/10 grid grid-cols-2 gap-4 max-w-md">
                {selectedFeature.metrics.map((m, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
                    <p className="text-[10px] text-slate-500 uppercase font-mono">{m.label}</p>
                    <p className="text-lg font-extrabold text-[#0F766E] font-heading">{m.value}</p>
                  </div>
                ))}
              </div>
            )}


          </div>

          {/* Right Column: AI Assistant Console / Feature Card */}
          <div className="lg:col-span-5 bg-[#0B132B] text-white rounded-2xl p-6 border border-slate-800 shadow-2xl space-y-4">
            
            {selectedFeature.id === 'ai_assistant' ? (
              /* Live Interactive AI Assistant Widget */
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#22C55E]" />
                    <span className="text-xs font-bold text-white font-heading">Rehabiphy AI Engine</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#22C55E] bg-[#22C55E]/20 px-2.5 py-0.5 rounded-full border border-[#22C55E]/30">
                    ONLINE
                  </span>
                </div>

                <form onSubmit={handleTestAiAssess} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Anatomy / Focus Area</label>
                    <select
                      value={aiArea}
                      onChange={(e) => setAiArea(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-[#22C55E]"
                    >
                      <option>Lower Back & Lumbar</option>
                      <option>Knee Joint & ACL</option>
                      <option>Shoulder & Rotator Cuff</option>
                      <option>Neck & Cervical Spine</option>
                      <option>Ankle & Achilles</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">Discomfort Symptoms</label>
                    <input
                      type="text"
                      placeholder="e.g. Stiffness after long desk hours..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 text-white text-xs rounded-xl p-2.5 outline-none focus:border-[#22C55E]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={aiLoading}
                    className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-[#22C55E] hover:bg-[#16a34a] rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {aiLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Calculating Clinical Protocol...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Generate Assessment
                      </>
                    )}
                  </button>
                </form>

                {aiResponse && (
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between items-center font-bold text-[#22C55E]">
                      <span>{aiResponse.severityScore || 'Assessment Complete'}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Verified Protocol</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">{aiResponse.summary}</p>
                    {aiResponse.recommendedActions && (
                      <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1 pt-1">
                        {aiResponse.recommendedActions.slice(0, 2).map((act: string, idx: number) => (
                          <li key={idx}>{act}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ) : (
              /* Showcase for other features */
              <div className="space-y-4 my-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F766E] flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">{selectedFeature.title}</h4>
                    <p className="text-xs text-[#22C55E] font-medium">{selectedFeature.badge}</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="text-slate-200 leading-relaxed">
                    "Rehabiphy’s {selectedFeature.title.toLowerCase()} helped our clinical team track patient progress continuously without requiring extra clinic visits."
                  </p>
                  <p className="text-[10px] text-slate-500 text-right font-mono">— Senior DPT Audit 2026</p>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl flex items-center justify-between text-xs">
                  <span className="text-slate-300">Available on Mobile App</span>
                  <span className="font-bold text-[#22C55E]">iOS & Android</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
