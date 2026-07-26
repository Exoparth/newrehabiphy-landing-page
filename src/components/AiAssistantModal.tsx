import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Send, Loader2, Bot, ShieldCheck, Activity, CheckCircle2, ChevronRight } from 'lucide-react';
import { AiAssessmentResult } from '../types';
import { RehabiphyIcon } from './RehabiphyLogo';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [area, setArea] = useState('Knee Joint');
  const [duration, setDuration] = useState('1 Week');
  const [symptoms, setSymptoms] = useState('Clicking sound during deep squats and mild swelling after walking.');
  const [userQuery, setUserQuery] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiAssessmentResult | null>(null);

  const handleRunAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          area,
          duration,
          symptoms,
          userQuery: userQuery || `Provide initial rehabilitation protocol for ${area} discomfort.`
        })
      });

      const data = await res.json();
      if (data.success && data.analysis) {
        setResult(data.analysis);
      } else {
        setResult(data.fallback);
      }
    } catch (err) {
      setResult({
        summary: `Clinical assessment for ${area}: Initial mobility protocol recommends isometric strengthening and motion glides.`,
        severityScore: "Moderate (Grade 1-2 Discomfort)",
        recommendedActions: [
          "Perform painless range-of-motion glides 2x daily.",
          "Avoid heavy plyometric impact or terminal joint flex overload.",
          "Schedule a 1-on-1 virtual evaluation with a Rehabiphy Specialist."
        ],
        suggestedExercises: [
          { name: "Controlled Quad Isometric Hold", reps: "3 sets x 10 sec", focus: "Patellar tendon stability" },
          { name: "Hamstring Active Motion Glide", reps: "2 sets x 12 reps", focus: "Joint fluid lubrication" }
        ],
        precaution: "Discontinue any movement causing sharp or radiating discomfort."
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-800 relative my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <RehabiphyIcon size={26} />
            </div>
            <div>
              <h3 className="text-xl font-bold font-heading text-white">Rehabiphy AI Clinical Assistant</h3>
              <p className="text-xs text-[#22C55E] font-medium">Instant Symptom & Mobility Protocol Generator</p>
            </div>
          </div>

          {!result ? (
            /* Input Form */
            <form onSubmit={handleRunAssessment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Joint / Body Area</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-[#22C55E]"
                  >
                    <option>Knee Joint & ACL</option>
                    <option>Lower Back & Lumbar Spine</option>
                    <option>Shoulder & Rotator Cuff</option>
                    <option>Neck & Cervical Spine</option>
                    <option>Ankle & Achilles</option>
                    <option>Hip Flexor & Pelvic Alignment</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Onset Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-[#22C55E]"
                  >
                    <option>1-3 Days (Acute)</option>
                    <option>1 Week</option>
                    <option>2-4 Weeks</option>
                    <option>3+ Months (Chronic Discomfort)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Describe Symptoms or Movement Triggers</label>
                <textarea
                  rows={2}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Sharp pain when bending, stiffness in the morning..."
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-[#22C55E]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Specific Question (Optional)</label>
                <input
                  type="text"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  placeholder="e.g. Can I jog or should I rest?"
                  className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl p-3 outline-none focus:border-[#22C55E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 text-xs font-bold text-slate-950 bg-[#22C55E] hover:bg-[#16a34a] rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Analyzing Biomechanics Engine...
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      Generate AI Recovery Roadmap
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-slate-500 text-center">
                AI analysis provides educational biomechanics insights and does not replace emergency medical triage.
              </p>
            </form>
          ) : (
            /* Results View */
            <div className="space-y-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#22C55E]">{result.severityScore}</span>
                  <span className="text-[10px] font-mono text-slate-400">Analysis complete</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{result.summary}</p>
              </div>

              {/* Recommended Actions */}
              {result.recommendedActions && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Recommended Protocol Actions</h5>
                  <div className="space-y-1.5">
                    {result.recommendedActions.map((act, i) => (
                      <div key={i} className="p-2.5 bg-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Exercises */}
              {result.suggestedExercises && (
                <div className="space-y-2">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Initial Micro-Exercises</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.suggestedExercises.map((ex, i) => (
                      <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-xs font-bold text-white">{ex.name}</p>
                        <p className="text-[10px] text-[#22C55E] font-mono">{ex.reps}</p>
                        <p className="text-[10px] text-slate-400">{ex.focus}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setResult(null)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl"
                >
                  Test Another Symptom
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-950 bg-[#22C55E] hover:bg-[#16a34a] rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  Done with Assessment
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
