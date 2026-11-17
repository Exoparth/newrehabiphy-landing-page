import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2, Music, Dumbbell, Salad, Armchair } from 'lucide-react';

const FITNESS_PROGRAMS = [
  {
    title: 'Yoga',
    description: 'Flexibility, breath and calm. Therapeutic flows that ease stiffness and build body awareness.',
    tags: ['Flexibility', 'Breathwork', 'Stress relief'],
    icon: Flower2,
    gradient: 'from-[#0F766E] to-[#0B132B]',
    wide: false,
  },
  {
    title: 'Dance fitness',
    description: 'High-energy, joyful cardio to Bollywood and global beats. No experience needed, only good vibes.',
    tags: ['Cardio', 'Coordination', 'Fun'],
    icon: Music,
    gradient: 'from-[#B8761C] to-[#4A2A5E]',
    wide: false,
  },
  {
    title: 'Strength training',
    description: 'Progressive, form-first training with bodyweight and light equipment. Build muscle and joint resilience safely.',
    tags: ['Bodyweight', 'Progressive', 'Injury-proofing'],
    icon: Dumbbell,
    gradient: 'from-[#173553] to-[#0A8F63]',
    wide: false,
  },
  {
    title: 'Diet & nutrition',
    description:
      'Practical Indian-kitchen nutrition guidance: balanced plates, protein goals, and habits that support recovery and energy, without crash diets.',
    tags: ['Indian meal plans', 'Protein & recovery', 'Habit coaching'],
    icon: Salad,
    gradient: 'from-[#2F7A2F] to-[#0B132B]',
    wide: true,
  },
  {
    title: 'Elderly mobility & balance',
    description:
      'Gentle, supervised sessions to improve balance, leg strength and confidence, helping older adults stay independent and reduce fall risk.',
    tags: ['Balance training', 'Chair-supported options', 'Fall prevention'],
    icon: Armchair,
    gradient: 'from-[#0B132B] to-[#8A5A12]',
    wide: true,
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
            Once you move well, keep going. Five fitness programs designed around a rehab-first approach, so you get stronger without getting hurt.
          </p>
        </div>

        {/* Program Cards: 3 on the first row, 2 wide cards on the second */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6">
          {FITNESS_PROGRAMS.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.article
                key={program.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.08 }}
                className={`group relative overflow-hidden rounded-3xl p-7 sm:p-8 min-h-[280px] flex flex-col justify-end text-white bg-gradient-to-br ${program.gradient} hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 ${
                  program.wide ? 'lg:col-span-3' : 'lg:col-span-2'
                } ${idx === FITNESS_PROGRAMS.length - 1 ? 'md:col-span-2' : ''}`}
              >
                <span className="absolute top-6 left-7 font-mono text-xs tracking-widest text-white/70">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <Icon
                  className="absolute -right-6 -top-4 w-44 h-44 text-white/15 group-hover:scale-110 transition-transform duration-500"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />

                <h3 className="relative text-2xl sm:text-[1.65rem] font-extrabold font-heading">
                  {program.title}
                </h3>
                <p className="relative mt-2 text-sm sm:text-[15px] text-white/85 leading-relaxed">
                  {program.description}
                </p>

                <ul className="relative flex flex-wrap gap-2 mt-4">
                  {program.tags.map((tag) => (
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
      </div>
    </section>
  );
};
