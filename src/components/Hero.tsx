import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Shield, 
  Smartphone, 
  Video, 
  CheckCircle2, 
  Play, 
  Activity, 
  TrendingUp, 
  Calendar, 
  Star,
  Award,
  Zap,
  Home,
  Wallet,
  Store,
  BarChart2,
  User,
  Signal
} from 'lucide-react';

interface HeroProps {
  onOpenAiModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAiModal,
  onOpenDownloadModal,
}) => {
  const [activeTab, setActiveTab] = useState<'habits' | 'motion' | 'video'>('habits');
  const [repCount, setRepCount] = useState(8);
  const [kneeAngle, setKneeAngle] = useState(138);

  const handleSimulateRep = () => {
    setRepCount((prev) => prev + 1);
    setKneeAngle((prev) => (prev === 138 ? 142 : 138));
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-grid-pattern">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#0F766E]/15 to-[#22C55E]/15 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-40 right-10 w-[300px] h-[300px] bg-[#0F766E]/10 blur-2xl rounded-full pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#0F766E]/20 text-[#0F766E] text-xs font-semibold shadow-xs backdrop-blur-sm mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-[#22C55E] animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Next-Gen AI Motion Computer Vision</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-normal">Licensed Qualified Physiotherapist</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] font-heading">
              From setback to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#115E59] to-[#22C55E]">
                comeback.
              </span>
            </h1>

            {/* Sub-description */}
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Rehabiphy is an AI-powered physiotherapy and rehabilitation platform. 
              Recover faster with real-time camera motion feedback, certified senior 
              physiotherapists, and personalized habit loops.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={onOpenDownloadModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E] rounded-full shadow-lg shadow-[#0F766E]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Smartphone className="w-4 h-4" />
                Download App
              </button>

              <button
                onClick={onOpenAiModal}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0F766E] bg-[#0F766E]/8 hover:bg-[#0F766E]/15 border border-[#0F766E]/20 rounded-full transition-colors"
              >
                <Sparkles className="w-4 h-4 text-[#22C55E]" />
                AI Symptom Assessment
              </button>
            </div>

            {/* Trust Metrics Bar */}
            <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-slate-900 font-extrabold text-xl font-heading">
                  94<span className="text-[#0F766E]">%</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Faster Mobility Recovery</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-slate-900 font-extrabold text-xl font-heading">
                  4.9<Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </div>
                <p className="text-xs text-slate-500 font-medium">10,000+ Recovered Patients</p>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-slate-900 font-extrabold text-xl font-heading">
                  <Shield className="w-5 h-5 text-[#22C55E]" />
                  <span>Secure</span>
                </div>
                <p className="text-xs text-slate-500 font-medium">Encrypted Health Data</p>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Animated Interactive Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Phone Container */}
            <div className="relative w-full max-w-[340px] bg-slate-900 p-3.5 rounded-[44px] shadow-2xl shadow-[#0F766E]/20 border-4 border-slate-800 ring-1 ring-slate-700/50">
              
              {/* Camera Notch / Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full bg-slate-900" />
              </div>

              {/* Screen Content Container */}
              <div className="relative bg-[#0F172A] rounded-[36px] overflow-hidden min-h-[580px] flex flex-col text-white pt-8 pb-4 px-4 font-sans border border-slate-800">
                
                {/* Header inside phone app */}
                <div className="flex items-center justify-between py-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#0F766E] flex items-center justify-center">
                      <Activity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-heading">Rehabiphy AI</h4>
                      <p className="text-[10px] text-slate-400">Live Posture Scan</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                    Active Session
                  </span>
                </div>

                {/* Tab Switcher inside phone */}
                <div className="grid grid-cols-3 gap-1 bg-slate-800/80 p-1 rounded-xl text-[11px] font-semibold mb-3">
                  <button
                    onClick={() => setActiveTab('motion')}
                    className={`py-1.5 rounded-lg transition-colors ${
                      activeTab === 'motion' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    AI Pose
                  </button>
                  <button
                    onClick={() => setActiveTab('habits')}
                    className={`py-1.5 rounded-lg transition-colors ${
                      activeTab === 'habits' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Habits
                  </button>
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`py-1.5 rounded-lg transition-colors ${
                      activeTab === 'video' ? 'bg-[#0F766E] text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Physio Call
                  </button>
                </div>

                {/* Phone Screen Dynamic View */}
                <div className="flex-1 flex flex-col">
                  <AnimatePresence mode="wait">
                    {activeTab === 'motion' && (
                      <motion.div
                        key="motion"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col space-y-3"
                      >
                        {/* Live Camera Feed Mockup */}
                        <div className="relative flex-1 rounded-2xl bg-slate-900 border border-slate-700/80 overflow-hidden flex items-center justify-center min-h-[260px] p-4">
                          
                          {/* Grid Guidelines */}
                          <div className="absolute inset-0 bg-grid-pattern opacity-10" />

                          {/* Silhouette / Motion Nodes Visual */}
                          <div className="relative w-full h-full flex items-center justify-center">
                            
                            {/* Human Skeleton Nodes */}
                            <svg className="w-48 h-56 text-[#22C55E]" viewBox="0 0 100 120" fill="none" stroke="currentColor" strokeWidth="2">
                              {/* Head */}
                              <circle cx="50" cy="18" r="8" stroke="#22C55E" fill="#22C55E" fillOpacity="0.2" />
                              {/* Spine */}
                              <line x1="50" y1="26" x2="50" y2="60" stroke="#0F766E" strokeWidth="2.5" />
                              {/* Shoulders */}
                              <line x1="30" y1="34" x2="70" y2="34" stroke="#22C55E" />
                              {/* Arms */}
                              <line x1="30" y1="34" x2="20" y2="52" stroke="#22C55E" />
                              <line x1="20" y1="52" x2="15" y2="68" stroke="#22C55E" />
                              <line x1="70" y1="34" x2="80" y2="52" stroke="#22C55E" />
                              <line x1="80" y1="52" x2="85" y2="68" stroke="#22C55E" />
                              {/* Hips */}
                              <line x1="38" y1="60" x2="62" y2="60" stroke="#0F766E" strokeWidth="2.5" />
                              {/* Left Leg */}
                              <line x1="38" y1="60" x2="35" y2="85" stroke="#22C55E" />
                              <line x1="35" y1="85" x2="30" y2="110" stroke="#22C55E" />
                              {/* Right Leg (Knee Flexed Angle) */}
                              <line x1="62" y1="60" x2="72" y2="85" stroke="#22C55E" strokeWidth="2.5" />
                              <line x1="72" y1="85" x2="60" y2="108" stroke="#22C55E" strokeWidth="2.5" />

                              {/* Key Joints glowing points */}
                              <circle cx="72" cy="85" r="4" fill="#22C55E" className="animate-ping" />
                              <circle cx="72" cy="85" r="3" fill="#22C55E" />
                              <circle cx="50" cy="34" r="3" fill="#0F766E" />
                              <circle cx="38" cy="60" r="3" fill="#0F766E" />
                              <circle cx="62" cy="60" r="3" fill="#0F766E" />
                            </svg>

                            {/* Angle indicator overlay */}
                            <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#22C55E]/40 text-[10px] font-mono text-[#22C55E] flex items-center gap-1 shadow-md">
                              <Zap className="w-3 h-3 text-[#22C55E]" />
                              <span>Angle: {kneeAngle}°</span>
                            </div>

                            <div className="absolute bottom-2 left-2 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] text-slate-300">
                              Knee Extension Track
                            </div>
                          </div>
                        </div>

                        {/* Controls & Feedback */}
                        <div className="bg-slate-800/90 p-3 rounded-2xl border border-slate-700 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Exercise Reps</span>
                            <span className="font-bold text-white font-mono text-sm">{repCount} / 12 Reps</span>
                          </div>

                          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-[#0F766E] to-[#22C55E] h-full transition-all duration-300"
                              style={{ width: `${(repCount / 12) * 100}%` }}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[10px] text-[#22C55E] font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Form: Perfect Alignment
                            </span>

                            <button
                              onClick={handleSimulateRep}
                              className="px-2.5 py-1 text-[11px] font-bold text-slate-900 bg-[#22C55E] hover:bg-[#16a34a] rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                            >
                              <Play className="w-3 h-3 fill-slate-900" />
                              Simulate Rep
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'habits' && (
                      <motion.div
                        key="habits"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col bg-white text-slate-900 rounded-2xl p-3 shadow-inner space-y-2 overflow-hidden"
                      >
                        {/* Status Bar */}
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-800 pb-1 border-b border-slate-100">
                          <span className="font-bold">20:36</span>
                          <div className="flex items-center gap-1 text-[9px] text-slate-700">
                            <span className="font-bold">Vo WiFi</span>
                            <Signal className="w-3 h-3 text-slate-800" />
                            <span className="flex items-center gap-0.5 font-bold">27% <Zap className="w-2.5 h-2.5 text-emerald-600 fill-emerald-600" /></span>
                          </div>
                        </div>

                        {/* Title Section */}
                        <div className="pt-0.5">
                          <h3 className="text-lg font-black text-slate-900 font-heading tracking-tight leading-tight">
                            Your Habits
                          </h3>
                          <p className="text-[9.5px] text-slate-500 font-medium">
                            Premium (Ends in 21 days) — all habits unlocked
                          </p>
                        </div>

                        {/* Selected Habits */}
                        <div className="space-y-1.5">
                          <div className="p-2 bg-emerald-50/70 border-2 border-[#16a34a] rounded-xl flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">🚶</span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">Walking</h5>
                                <p className="text-[9px] font-bold text-[#16a34a]">+10 coins/day</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                              ✓
                            </div>
                          </div>

                          <div className="p-2 bg-emerald-50/70 border-2 border-[#16a34a] rounded-xl flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">🚴</span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">Cycling</h5>
                                <p className="text-[9px] font-bold text-[#16a34a]">+10 coins/day</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                              ✓
                            </div>
                          </div>
                        </div>

                        {/* Other Habits Section */}
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1">
                            <h4 className="text-xs font-bold text-slate-900 font-heading">Other Habits</h4>
                            <span className="text-[10px] text-slate-400 font-normal">Pick any</span>
                          </div>

                          {/* Hydration */}
                          <div className="p-2 bg-emerald-50/70 border-2 border-[#16a34a] rounded-xl flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">💧</span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">Hydration</h5>
                                <p className="text-[9px] font-bold text-[#16a34a]">+5 coins/day</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                              ✓
                            </div>
                          </div>

                          {/* Breathing */}
                          <div className="p-2 bg-emerald-50/70 border-2 border-[#16a34a] rounded-xl flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">🧘</span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">Breathing</h5>
                                <p className="text-[9px] font-bold text-[#16a34a]">+5 coins/day</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                              ✓
                            </div>
                          </div>

                          {/* Sleep */}
                          <div className="p-2 bg-emerald-50/70 border-2 border-[#16a34a] rounded-xl flex items-center justify-between shadow-2xs">
                            <div className="flex items-center gap-2">
                              <span className="text-base leading-none">😴</span>
                              <div>
                                <h5 className="text-xs font-bold text-slate-900 leading-tight">Sleep</h5>
                                <p className="text-[9px] font-bold text-[#16a34a]">+5 coins/day</p>
                              </div>
                            </div>
                            <div className="w-4 h-4 rounded-full bg-[#16a34a] text-white flex items-center justify-center text-[10px] font-extrabold shadow-2xs">
                              ✓
                            </div>
                          </div>
                        </div>

                        {/* Confirm Selection Button */}
                        <button className="w-full py-2.5 px-3 text-xs font-extrabold text-white bg-[#16a34a] hover:bg-[#15803d] rounded-full shadow-sm transition-all text-center">
                          Confirm Selection
                        </button>

                        {/* Bottom Navigation Bar */}
                        <div className="pt-2 border-t border-slate-200 grid grid-cols-6 gap-0.5 text-center bg-white">
                          <div className="flex flex-col items-center text-slate-400">
                            <Home className="w-3.5 h-3.5" />
                            <span className="text-[7.5px] font-medium mt-0.5">Home</span>
                          </div>

                          <div className="flex flex-col items-center text-[#0F766E]">
                            <div className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-xs">
                              <Zap className="w-3 h-3 fill-white" />
                            </div>
                            <span className="text-[7.5px] font-bold mt-0.5">Habits</span>
                          </div>

                          <div className="flex flex-col items-center text-slate-400">
                            <Wallet className="w-3.5 h-3.5" />
                            <span className="text-[7.5px] font-medium mt-0.5">Wallet</span>
                          </div>

                          <div className="flex flex-col items-center text-slate-400">
                            <Store className="w-3.5 h-3.5" />
                            <span className="text-[7.5px] font-medium mt-0.5">Market</span>
                          </div>

                          <div className="flex flex-col items-center text-slate-400">
                            <BarChart2 className="w-3.5 h-3.5" />
                            <span className="text-[7.5px] font-medium mt-0.5">Leaders</span>
                          </div>

                          <div className="flex flex-col items-center text-slate-400">
                            <User className="w-3.5 h-3.5" />
                            <span className="text-[7.5px] font-medium mt-0.5">Profile</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'video' && (
                      <motion.div
                        key="video"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="flex-1 flex flex-col space-y-3"
                      >
                        <div className="relative rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden flex-1 flex flex-col">
                          <img
                            src="https://images.unsplash.com/photo-1594824813566-788426a8d6b1?auto=format&fit=crop&q=80&w=400"
                            alt="Pooja Patel"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-44 object-cover object-top"
                          />
                          <div className="absolute top-2 left-2 bg-red-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                            LIVE CONSULTATION
                          </div>
                          
                          <div className="p-3 bg-slate-900/95 flex-1 flex flex-col justify-between">
                            <div>
                              <h5 className="text-xs font-bold text-white font-heading">Pooja Patel, Licensed Physiotherapist</h5>
                              <p className="text-[10px] text-[#22C55E] font-medium">Chief Sports Physiotherapist</p>
                            </div>

                            <p className="text-[10px] text-slate-300 italic pt-1">
                              "Great terminal extension today! Let’s add 5° to your mobility targets tomorrow."
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom App Call Button */}
                <button
                  onClick={onOpenDownloadModal}
                  className="mt-3 w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#22C55E] to-[#4ade80] hover:brightness-110 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  Get App for Full Plan
                </button>

              </div>
            </div>

            {/* Floating Apple-Style Badges */}
            <div className="absolute -bottom-4 -left-4 sm:left-0 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-slate-200/90 hidden sm:flex items-center gap-3 z-20 max-w-[210px]">
              <div className="w-9 h-9 rounded-xl bg-[#0F766E]/10 flex items-center justify-center text-[#0F766E]">
                <Award className="w-5 h-5 text-[#0F766E]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900">#1 AI Rehab Platform</p>
                <p className="text-[10px] text-slate-500">Over 500,000+ Exercises Monitored</p>
              </div>
            </div>

            <div className="absolute top-10 -right-4 sm:right-0 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl shadow-xl border border-slate-200/90 hidden sm:flex items-center gap-3 z-20 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <TrendingUp className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-slate-900">+32° ROM Gained</p>
                <p className="text-[10px] text-slate-500">Avg. 3-Week Progress</p>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
