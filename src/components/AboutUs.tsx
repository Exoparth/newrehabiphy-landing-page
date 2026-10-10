import React, { useEffect } from 'react';
import { Activity, BookOpen, Mail, MapPin, ShieldCheck, Smartphone, Users, Video } from 'lucide-react';
import { useDocumentMeta, SITE_URL } from '../lib/useDocumentMeta';

interface AboutUsProps {
  onOpenDownloadModal: () => void;
}

const WHAT_WE_DO = [
  {
    icon: Activity,
    title: 'Guided exercise at home',
    text: 'The Rehabiphy app uses your phone camera to follow your movement during exercises and give feedback on form, so home sessions feel less like guesswork.',
  },
  {
    icon: Video,
    title: 'Access to physiotherapists',
    text: 'Patients can book video consultations or home visits with licensed physiotherapists, who set and adjust the exercise plan.',
  },
  {
    icon: Users,
    title: 'Tools for practitioners',
    text: 'Physiotherapists get range-of-motion notes, adherence tracking and scheduling in one place, so more time goes to patients and less to paperwork.',
  },
];

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenDownloadModal }) => {
  useDocumentMeta({
    title: 'About Us | Rehabiphy',
    description:
      'Rehabiphy is a physiotherapy and rehabilitation platform from Lucknow, India. Learn who we are, what the app does and how we write our health articles.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Rehabiphy',
      legalName: 'Rehabiphy Health Technologies Private Limited',
      url: SITE_URL,
      email: 'support@rehabiphy.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '274, opp. Singh Hospital, Sector 12A',
        addressLocality: 'Lucknow',
        addressRegion: 'Uttar Pradesh',
        postalCode: '226025',
        addressCountry: 'IN',
      },
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      <header className="text-center max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" />
          About Rehabiphy
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
          From setback to comeback
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Rehabiphy is a physiotherapy and rehabilitation platform built in India. We make it easier to keep up with
          physiotherapy between clinic visits — and to reach a qualified physiotherapist when you need one.
        </p>
      </header>

      <section className="mt-12 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Why we built it</h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            Recovery from an injury or surgery rarely fails in the clinic. It tends to slip at home: sessions get
            skipped because the clinic is far away, exercises are done without anyone checking the form, and progress
            is hard to see from one week to the next.
          </p>
          <p>
            Rehabiphy is our attempt to close that gap. The app pairs camera-based movement feedback and short daily
            routines with care from licensed physiotherapists, so the plan you follow at home stays connected to a
            professional who knows your case.
          </p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">What we do</h2>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {WHAT_WE_DO.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white rounded-2xl border border-slate-200/80 p-6">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#0F766E]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900 font-heading">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <h2 className="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900 font-heading">
          <BookOpen className="w-6 h-6 text-[#0F766E]" />
          How we write our articles
        </h2>
        <div className="mt-4 space-y-4 text-slate-600 leading-relaxed">
          <p>
            The <a href="/blogs" className="text-[#0F766E] font-semibold hover:underline">Rehabiphy blog</a> is written
            by the Rehabiphy team to explain physiotherapy, rehabilitation and digital care in plain language. Where an
            article quotes a statistic or a study, we link to the source so you can read it yourself.
          </p>
          <p>
            Our articles are general information, not medical advice. They cannot assess your condition, and they are
            not a substitute for an examination by a qualified healthcare professional. If you are in severe pain, have
            had a recent injury or surgery, or your symptoms are getting worse, please see a doctor or physiotherapist
            before starting any exercise.
          </p>
          <p>
            Rehabiphy is also the company behind the app, and some articles mention our own services. We aim to say so
            plainly when they do. If you spot something that looks wrong or out of date, write to{' '}
            <a href="mailto:support@rehabiphy.com" className="text-[#0F766E] font-semibold hover:underline">
              support@rehabiphy.com
            </a>{' '}
            and we will review it.
          </p>
        </div>
      </section>

      <section className="mt-8 bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-10">
        <h2 className="text-2xl font-extrabold text-slate-900 font-heading">Who we are</h2>
        <p className="mt-4 text-slate-600 leading-relaxed">
          Rehabiphy is operated by Rehabiphy Health Technologies Private Limited, based in Lucknow, Uttar Pradesh,
          India.
        </p>
        <ul className="mt-5 space-y-3 text-sm text-slate-700">
          <li className="flex items-start gap-3">
            <MapPin className="w-4 h-4 mt-0.5 text-[#0F766E] shrink-0" />
            <span>274, opp. Singh Hospital, Sector 12A, Lucknow, 226025, UP, India</span>
          </li>
          <li className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 text-[#0F766E] shrink-0" />
            <a href="mailto:support@rehabiphy.com" className="text-[#0F766E] font-semibold hover:underline">
              support@rehabiphy.com
            </a>
          </li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <a href="/contact" className="px-5 py-2.5 rounded-full text-white bg-[#0F766E] hover:bg-[#115E59] transition-colors">
            Contact us
          </a>
          <a href="/privacy" className="px-5 py-2.5 rounded-full text-[#0F766E] bg-[#0F766E]/10 hover:bg-[#0F766E]/15 transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="px-5 py-2.5 rounded-full text-[#0F766E] bg-[#0F766E]/10 hover:bg-[#0F766E]/15 transition-colors">
            Terms &amp; Conditions
          </a>
        </div>
      </section>

      <aside className="mt-10 rounded-3xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white p-8 sm:p-10 text-center shadow-lg shadow-[#0F766E]/20">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">Try Rehabiphy</h2>
        <p className="mt-2 text-emerald-100 max-w-md mx-auto">The app is available for Android on Google Play.</p>
        <button
          onClick={onOpenDownloadModal}
          className="mt-6 inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-[#0F766E] bg-white hover:bg-emerald-50 transition-colors"
        >
          <Smartphone className="w-4 h-4" />
          Get the app
        </button>
      </aside>
    </div>
  );
};
