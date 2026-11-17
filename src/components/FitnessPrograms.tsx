import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2, Music, HeartPulse, Dumbbell, Salad, Armchair, CalendarCheck } from 'lucide-react';

// Mirrors the bookable fitness categories in the Rehabiphy app
// (FITNESS.categories in the Fithabit backend's providerWebConfig.js).
const FITNESS_CATEGORIES = [
  {
    title: 'Yoga & Meditation',
    description: 'Flexibility, breath and calm. Flows for every level, from first-timers to power yoga.',
    tags: ['Hatha Yoga', 'Power Yoga', 'Vinyasa Yoga', 'Yoga for Beginners', 'Meditation & Pranayama'],
    icon: Flower2,
    gradient: 'from-[#0F766E] to-[#0B132B]',
  },
  {
    title: 'Dance Fitness',
    description: 'High-energy, joyful cardio to Bollywood and global beats. No experience needed, only good vibes.',
    tags: ['Zumba', 'Bollywood Dance Fitness', 'Salsa Fitness', 'Hip-Hop Dance Fitness', 'Bhangra Fitness'],
    icon: Music,
    gradient: 'from-[#B8761C] to-[#4A2A5E]',
  },
  {
    title: 'Aerobics & Cardio',
    description: 'Get your heart pumping, from low-impact sessions to HIIT and kickboxing.',
    tags: ['Aerobics', 'Step Aerobics', 'Low-Impact Cardio', 'HIIT Cardio', 'Kickboxing Fitness'],
    icon: HeartPulse,
    gradient: 'from-[#9F1239] to-[#0B132B]',
  },
  {
    title: 'Strength Training',
    description: 'Form-first training with bodyweight, bands and dumbbells. Build muscle and joint resilience safely.',
    tags: ['Power Pump', 'Dumbbell Training', 'Resistance Band Training', 'Bodyweight Training', 'Full-Body Strength'],
    icon: Dumbbell,
    gradient: 'from-[#173553] to-[#0A8F63]',
  },
  {
    title: 'Diet & Nutrition',
    description: 'Practical nutrition guidance for your goal, built around balanced Indian meals, without crash diets.',
    tags: ['Weight-Loss Diet Plan', 'Weight-Gain Diet Plan', 'Balanced Nutrition', 'Sports Nutrition', 'Personalized Consultation'],
    icon: Salad,
    gradient: 'from-[#2F7A2F] to-[#0B132B]',
  },
  {
    title: 'Elderly Care & Senior Wellness',
    description: 'Gentle sessions that build balance, strength and confidence, helping older adults stay independent.',
    tags: ['Senior Citizen Yoga', 'Balance & Fall Prevention', 'Senior Mobility & Flexibility', 'Chair Exercises'],
    icon: Armchair,
    gradient: 'from-[#0B132B] to-[#8A5A12]',
  },
];

export const FitnessPrograms: React.FC = () => {
  return (
    <section id="fitness" className="py-24 lg:py-32 bg-gradient-to-b from-white to-[#F0FAF6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#22C55E]" />
              New · Rehabiphy Fitness
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Pain-free is just the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#22C55E]">beginning.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-600 max-w-md font-normal leading-relaxed">
            Live online fitness sessions with verified trainers. Pick a category, choose a weekly session time that suits you, and join live from home.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FITNESS_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className={`group relative overflow-hidden rounded-3xl p-7 sm:p-8 min-h-[320px] flex flex-col justify-end text-white bg-gradient-to-br ${category.gradient} hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300`}
              >
                <span className="absolute top-6 left-7 font-mono text-xs tracking-widest text-white/70">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <Icon
                  className="absolute -right-6 -top-4 w-44 h-44 text-white/15 group-hover:scale-110 transition-transform duration-500"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />

                <h3 className="relative text-2xl font-extrabold font-heading">
                  {category.title}
                </h3>
                <p className="relative mt-2 text-sm text-white/85 leading-relaxed">
                  {category.description}
                </p>

                <ul className="relative flex flex-wrap gap-2 mt-4">
                  {category.tags.map((tag) => (
                    <li
                      key={tag}
                      className="text-[11px] font-bold bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* How fitness membership works */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-3xl p-6 sm:p-7 border border-[#0F766E]/15 shadow-sm"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#0F766E]/10 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6 text-[#0F766E]" />
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            <span className="font-bold text-slate-900">Flexible plans:</span> choose a 1, 6 or 12-month membership for your session.
            Not sure yet? Try <span className="font-bold text-[#0F766E]">2 free live classes</span> first.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
