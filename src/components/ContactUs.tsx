import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  MapPin,
  Globe,
  Clock,
  Send,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageSquare,
  Building2,
  ChevronRight,
} from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface ContactUsProps {
  onBack: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const subjectOptions = [
  'General Inquiry',
  'Book Consultation',
  'Technical Support',
  'Partnership',
  'Feedback',
];

export const ContactUs: React.FC<ContactUsProps> = ({ onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormStatus('success');
        setStatusMessage(
          data.message ||
            "Thank you! Your message has been received. We'll get back to you within 24 hours."
        );
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
        setStatusMessage(
          data.message || 'Something went wrong. Please try again.'
        );
      }
    } catch {
      setFormStatus('error');
      setStatusMessage(
        'Failed to send your message. Please try again or email us directly at Support@rehabiphy.com.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FFFC] font-sans">
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#F8FFFC]/90 backdrop-blur-md border-b border-[#0F766E]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="group flex items-center"
          >
            <RehabiphyLogo variant="light" showTagline={false} layout="horizontal" iconSize={32} />
          </a>
          <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-slate-500">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 hover:text-[#0F766E] hover:bg-[#0F766E]/8 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Home
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-[#0F766E] font-bold px-3 py-1.5 bg-[#0F766E]/8 rounded-full">
              Contact Us
            </span>
          </nav>
          <button
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F766E] bg-[#0F766E]/10 rounded-full"
            onClick={onBack}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-slate-950 via-[#0F2027] to-[#0F766E]/60 overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-dot-matrix opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#22C55E]/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-full text-[#22C55E] text-xs font-bold mb-6">
              <MessageSquare className="w-3.5 h-3.5" />
              We'd Love to Hear from You
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-4">
              Get in <span className="text-[#22C55E]">Touch</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Have a question about Rehabiphy, need support, or want to partner with us? 
              Reach out and our team will get back to you within 24 hours.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#22C55E]" />
                Response within 24 hours
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                Support@rehabiphy.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">

          {/* Left Column — Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading mb-2">
                Contact Information
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Visit our clinic or send us an email. We're here to help with your rehabilitation journey.
              </p>
            </div>

            {/* Office Address Card */}
            <div className="glass-card rounded-2xl p-5 space-y-3 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0F766E]/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Office Address</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Jointcare Physiotherapy & Rehabilitation<br />
                    274, opp. Singh Hospital, Sector 12A<br />
                    Lucknow, 226025, UP, India
                  </p>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <a
              href="mailto:Support@rehabiphy.com"
              className="glass-card rounded-2xl p-5 flex items-start gap-3 hover:shadow-lg transition-all group block"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0F766E]/20">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-800">Email Us</h3>
                <p className="text-xs text-[#0F766E] font-semibold mt-1 group-hover:underline">
                  Support@rehabiphy.com
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">For inquiries, support & partnerships</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F766E] transition-colors mt-1 shrink-0" />
            </a>



            {/* Website Card */}
            {/* <a
              href="https://jointcare-physiotherapy.grexa.site"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-5 flex items-start gap-3 hover:shadow-lg transition-all group block"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0F766E]/20">
                <Globe className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-800">Website</h3>
                <p className="text-xs text-[#0F766E] font-semibold mt-1 group-hover:underline truncate">
                  jointcare-physiotherapy.grexa.site
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">Clinic information & services</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#0F766E] transition-colors mt-1 shrink-0" />
            </a> */}

            {/* Working Hours Card */}
            {/* <div className="glass-card rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0F766E]/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">Working Hours</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">When you can reach us</p>
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Monday – Saturday</span>
                  <span className="text-[#0F766E] font-bold">9:00 AM – 7:00 PM</span>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Sunday</span>
                  <span className="text-red-500 font-semibold">Closed</span>
                </div>
                <div className="w-full h-px bg-slate-100" />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">Online Support</span>
                  <span className="text-[#22C55E] font-bold">24/7 via Email</span>
                </div>
              </div>
            </div> */}

            {/* Google Maps Embed */}
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-[#0F766E]" />
                <span className="text-xs font-bold text-slate-700">Find Us on Map</span>
              </div>
              <iframe
                title="Rehabiphy Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d629.7416860019109!2d80.97082441252972!3d26.764890023631278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjbCsDQ1JzUzLjgiTiA4MMKwNTgnMTYuNiJF!5e0!3m2!1sen!2sin!4v1785519504377!5m2!1sen!2sin"
                className="w-full h-52 border-0"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Right Column — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading mb-2">
                  Send Us a Message
                </h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {/* Status Toast */}
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#22C55E] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#15803d]">Message Sent!</p>
                    <p className="text-xs text-[#166534] mt-0.5">{statusMessage}</p>
                  </div>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-red-700">Failed to Send</p>
                    <p className="text-xs text-red-600 mt-0.5">{statusMessage}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 text-sm text-slate-800 bg-[#F8FFFC] border border-slate-200 rounded-xl focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 text-sm text-slate-800 bg-[#F8FFFC] border border-slate-200 rounded-xl focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Phone Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-3 text-sm text-slate-800 bg-[#F8FFFC] border border-slate-200 rounded-xl focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm text-slate-800 bg-[#F8FFFC] border border-slate-200 rounded-xl focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select a subject</option>
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-bold text-slate-700 mb-1.5"
                  >
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 text-sm text-slate-800 bg-[#F8FFFC] border border-slate-200 rounded-xl focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] hover:from-[#115E59] hover:to-[#0F766E] rounded-xl shadow-lg shadow-[#0F766E]/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  By submitting this form, you agree to our{' '}
                  <a href="#/privacy" className="text-[#0F766E] hover:underline font-medium">
                    Privacy Policy
                  </a>
                  . We'll never share your information with third parties.
                </p>
              </form>
            </div>

            {/* Quick Contact Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-slate-800">Need immediate assistance?</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Send us an email and our team will get back to you within 24 hours.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:Support@rehabiphy.com"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] rounded-full shadow-md shadow-[#0F766E]/25 hover:shadow-lg transition-all"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Back to Home */}
      <div className="flex items-center justify-center py-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] rounded-full shadow-lg shadow-[#0F766E]/25 hover:shadow-xl hover:scale-105 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-center text-xs">
        <p>© {new Date().getFullYear()} Rehabiphy Health Technologies Private Limited. All rights reserved.</p>
        <p className="mt-1 text-slate-500">
          274, opp. Singh Hospital, Sector 12A, Lucknow, 226025, UP, India
        </p>
      </footer>
    </div>
  );
};
