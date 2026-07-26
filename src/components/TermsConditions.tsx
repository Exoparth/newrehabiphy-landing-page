import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  FileText,
  ShieldCheck,
  User,
  CreditCard,
  AlertTriangle,
  Globe,
  Lock,
  Scale,
  Bell,
  Trash2,
  Mail,
  ChevronRight,
  ArrowLeft,
  Briefcase,
  RefreshCw,
  Coins,
  Sparkles,
  Ban,
} from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface TermsConditionsProps {
  onBack: () => void;
}

interface Section {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: 'about', number: '1', title: 'About Rehabiphy', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'eligibility', number: '2', title: 'Eligibility', icon: <User className="w-4 h-4" /> },
  { id: 'account', number: '3', title: 'User Account', icon: <User className="w-4 h-4" /> },
  { id: 'services', number: '4', title: 'Services Offered', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'disclaimer', number: '5', title: 'Healthcare Disclaimer', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'marketplace', number: '6', title: 'Marketplace', icon: <Globe className="w-4 h-4" /> },
  { id: 'booking', number: '7', title: 'Booking Policy', icon: <Bell className="w-4 h-4" /> },
  { id: 'home-visit', number: '8', title: 'Home Visit Services', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'online', number: '9', title: 'Online Consultation', icon: <Globe className="w-4 h-4" /> },
  { id: 'payments', number: '10', title: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'subscription', number: '11', title: 'Subscription Plans', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'auto-renewal', number: '12', title: 'Auto Renewal', icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'cancellation', number: '13', title: 'Cancellation & Refund', icon: <Trash2 className="w-4 h-4" /> },
  { id: 'coins', number: '14', title: 'Reward Coins', icon: <Coins className="w-4 h-4" /> },
  { id: 'ai', number: '15', title: 'AI Features', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'user-resp', number: '16', title: 'User Responsibilities', icon: <User className="w-4 h-4" /> },
  { id: 'provider-resp', number: '17', title: 'Provider Responsibilities', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'health-data', number: '18', title: 'Health Data', icon: <Lock className="w-4 h-4" /> },
  { id: 'ip', number: '19', title: 'Intellectual Property', icon: <FileText className="w-4 h-4" /> },
  { id: 'user-content', number: '20', title: 'User Content', icon: <FileText className="w-4 h-4" /> },
  { id: 'privacy', number: '21', title: 'Privacy', icon: <Lock className="w-4 h-4" /> },
  { id: 'third-party', number: '22', title: 'Third-Party Services', icon: <Globe className="w-4 h-4" /> },
  { id: 'availability', number: '23', title: 'Availability', icon: <Bell className="w-4 h-4" /> },
  { id: 'liability', number: '24', title: 'Limitation of Liability', icon: <Scale className="w-4 h-4" /> },
  { id: 'indemnification', number: '25', title: 'Indemnification', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'suspension', number: '26', title: 'Suspension & Termination', icon: <Ban className="w-4 h-4" /> },
  { id: 'force-majeure', number: '27', title: 'Force Majeure', icon: <AlertTriangle className="w-4 h-4" /> },
  { id: 'governing-law', number: '28', title: 'Governing Law', icon: <Scale className="w-4 h-4" /> },
  { id: 'changes', number: '29', title: 'Changes to Terms', icon: <FileText className="w-4 h-4" /> },
  { id: 'contact', number: '30', title: 'Contact Information', icon: <Mail className="w-4 h-4" /> },
];

export const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(`tc-section-${section.id}`);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`tc-section-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileNavOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FFFC] font-sans">
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#F8FFFC]/90 backdrop-blur-md border-b border-[#0F766E]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="group flex items-center">
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
            <span className="text-[#0F766E] font-bold px-3 py-1.5 bg-[#0F766E]/8 rounded-full">Terms & Conditions</span>
          </nav>
          <button
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#0F766E] bg-[#0F766E]/10 rounded-full"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            Sections
            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${mobileNavOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Section Nav Drawer */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setMobileNavOpen(false)}>
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="absolute top-0 left-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-800 mb-4 px-2">Jump to Section</h3>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg text-xs mb-1 transition-colors ${
                  activeSection === s.id
                    ? 'bg-[#0F766E] text-white font-bold'
                    : 'text-slate-600 hover:bg-[#F8FFFC] hover:text-[#0F766E]'
                }`}
              >
                <span className="shrink-0">{s.icon}</span>
                <span>{s.number}. {s.title}</span>
              </button>
            ))}
          </motion.div>
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-slate-950 via-[#0B132B] to-[#0F766E]/50 overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0F766E]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-full text-[#22C55E] text-xs font-bold mb-6">
              <FileText className="w-3.5 h-3.5" />
              Rehabiphy Health Technologies Pvt. Ltd.
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-4">
              Terms & <span className="text-[#22C55E]">Conditions</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Please read these Terms & Conditions carefully before using the Rehabiphy mobile application, website, and related services. By using Rehabiphy, you agree to be legally bound by these Terms.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#22C55E]" /> Effective Date: 25 July 2026</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> Version 1.0</span>
              <span className="flex items-center gap-1.5"><Scale className="w-3.5 h-3.5 text-[#22C55E]" /> Governed by Laws of India</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">

          {/* Sticky Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3 px-3">Table of Contents</p>
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all duration-200 ${
                    activeSection === s.id
                      ? 'bg-[#0F766E] text-white font-bold shadow-md shadow-[#0F766E]/25'
                      : 'text-slate-500 hover:bg-white hover:text-[#0F766E] hover:shadow-sm'
                  }`}
                >
                  <span className={`shrink-0 ${activeSection === s.id ? 'text-white' : 'text-[#0F766E]'}`}>{s.icon}</span>
                  <span>{s.number}. {s.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Terms Content */}
          <main className="flex-1 min-w-0">
            <div className="space-y-10">

              {/* Intro Card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-8 border-l-4 border-[#0F766E]"
              >
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Welcome to <strong className="text-[#0F766E]">Rehabiphy</strong>, owned and operated by <strong>Rehabiphy Health Technologies Pvt. Ltd.</strong>
                </p>
                <p className="text-slate-600 text-sm leading-relaxed mt-3">
                  By downloading, installing, accessing, or using Rehabiphy, you agree to be legally bound by these Terms. If you do not agree, please discontinue use of the platform.
                </p>
              </motion.div>

              {/* Section 1 */}
              <TCSection id="about" number="1" title="About Rehabiphy" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy is a digital healthcare technology platform that enables users to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Book physiotherapy consultations','Book home physiotherapy services','Book clinic appointments','Connect with verified healthcare professionals','Participate in wellness and rehabilitation programs','Track health habits','Earn and redeem reward coins','Purchase subscription plans','Use AI-powered health features','Access educational healthcare content'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                  Rehabiphy is a <strong>technology platform</strong> and does not itself provide medical treatment or physiotherapy services.
                </div>
              </TCSection>

              {/* Section 2 */}
              <TCSection id="eligibility" number="2" title="Eligibility" icon={<User className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">You may use Rehabiphy only if:</p>
                <ul className="space-y-2">
                  <TLItem>You are at least 18 years old; or you are using the platform under supervision of a parent or legal guardian.</TLItem>
                  <TLItem>You are legally capable of entering into binding contracts under applicable law.</TLItem>
                </ul>
              </TCSection>

              {/* Section 3 */}
              <TCSection id="account" number="3" title="User Account" icon={<User className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">You agree to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Provide accurate information.','Maintain updated information.','Keep your password confidential.','Be responsible for all activities conducted through your account.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">You are solely responsible for maintaining the confidentiality of your login credentials.</p>
              </TCSection>

              {/* Section 4 */}
              <TCSection id="services" number="4" title="Services Offered" icon={<Briefcase className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may provide:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Online Physiotherapy Consultation','Home Visit Physiotherapy','Clinic Visit Booking','Rehabilitation Programs','Exercise Programs','Habit Tracking','Wellness Programs','AI Health Assistance','Marketplace Services','Reward Programs','Corporate Wellness Services'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Services may vary depending upon location.</p>
              </TCSection>

              {/* Section 5 */}
              <TCSection id="disclaimer" number="5" title="Healthcare Disclaimer" icon={<AlertTriangle className="w-5 h-5" />}>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 mb-4">
                  <strong>Important:</strong> Rehabiphy does not practice medicine. Healthcare services available through the platform are independently provided by licensed healthcare professionals.
                </div>
                <p className="text-slate-600 text-sm mb-3">Rehabiphy:</p>
                <ul className="space-y-2 mb-4">
                  {['Does not diagnose diseases.','Does not prescribe medicines.','Does not guarantee treatment outcomes.','Does not replace emergency medical care.'].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-red-600">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-700 text-sm font-semibold">Users must immediately seek emergency medical services during any medical emergency.</p>
              </TCSection>

              {/* Section 6 */}
              <TCSection id="marketplace" number="6" title="Marketplace" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy acts solely as an intermediary between users and healthcare providers. Healthcare providers are independent professionals. Rehabiphy is not responsible for:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Treatment quality','Clinical outcomes','Professional negligence','Misconduct of providers','Delays caused by providers'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 7 */}
              <TCSection id="booking" number="7" title="Booking Policy" icon={<Bell className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Appointments are subject to:</p>
                <ul className="space-y-2 mb-4">
                  {['Provider availability','Confirmation','Successful payment (where applicable)'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Rehabiphy reserves the right to modify or cancel appointments due to operational reasons.</p>
              </TCSection>

              {/* Section 8 */}
              <TCSection id="home-visit" number="8" title="Home Visit Services" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">For home visits, users agree to provide:</p>
                <ul className="space-y-2 mb-4">
                  {['Correct address','Safe treatment environment','Accurate medical history'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">If the therapist feels unsafe or the information provided is inaccurate, the appointment may be cancelled.</p>
              </TCSection>

              {/* Section 9 */}
              <TCSection id="online" number="9" title="Online Consultation" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Users acknowledge that:</p>
                <ul className="space-y-2">
                  {['Internet quality may affect consultation.','Technical issues may interrupt sessions.','Online consultations have limitations compared to physical examinations.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 10 */}
              <TCSection id="payments" number="10" title="Payments" icon={<CreditCard className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Payments may be processed through secure third-party payment gateways including <strong className="text-[#0F766E]">PayU</strong>. By making payments, you agree that:</p>
                <ul className="space-y-2 mb-4">
                  {['Applicable taxes may be charged.','Platform fees may apply.','Payment gateway charges may apply where applicable.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <div className="p-3 bg-[#0F766E]/8 border border-[#0F766E]/20 rounded-xl text-sm font-semibold text-[#0F766E]">
                  Rehabiphy does not store complete debit or credit card information.
                </div>
              </TCSection>

              {/* Section 11 */}
              <TCSection id="subscription" number="11" title="Subscription Plans" icon={<RefreshCw className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Certain services require paid subscriptions. Subscription benefits may include:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Unlimited habit tracking','Premium rehabilitation programs','Priority booking','Additional reward benefits','Exclusive wellness content'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Subscription fees are non-transferable.</p>
              </TCSection>

              {/* Section 12 */}
              <TCSection id="auto-renewal" number="12" title="Auto Renewal" icon={<RefreshCw className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">Where applicable, subscriptions may automatically renew until cancelled. Users may cancel renewal through the respective app store or payment provider before the renewal date.</p>
              </TCSection>

              {/* Section 13 */}
              <TCSection id="cancellation" number="13" title="Cancellation & Refund Policy" icon={<Trash2 className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Cancellation and refund eligibility depends on:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Type of service','Time of cancellation','Provider availability','Applicable laws'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm mb-2">Refunds, if approved, will generally be processed to the original payment method within a reasonable period.</p>
                <p className="text-slate-500 text-sm">Platform fees, payment gateway charges, and taxes may be non-refundable where permitted by law.</p>
              </TCSection>

              {/* Section 14 */}
              <TCSection id="coins" number="14" title="Reward Coins" icon={<Coins className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may provide reward coins through various activities. Reward coins:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Have no cash value.','Cannot be exchanged for money.','May expire.','May be withdrawn at any time.','May be modified without prior notice.','Cannot be transferred between users unless specifically permitted.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Fraudulent earning of reward coins may result in account suspension.</p>
              </TCSection>

              {/* Section 15 */}
              <TCSection id="ai" number="15" title="AI Features" icon={<Sparkles className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may use Artificial Intelligence for:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Exercise recommendations','Habit suggestions','Educational assistance','Health insights','Recovery monitoring'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                  <strong>Note:</strong> AI outputs are informational only, are not medical advice, and should not replace consultation with qualified healthcare professionals.
                </div>
              </TCSection>

              {/* Section 16 */}
              <TCSection id="user-resp" number="16" title="User Responsibilities" icon={<User className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">You agree not to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Provide false medical information.','Misuse the platform.','Harass healthcare professionals.','Upload unlawful content.','Attempt unauthorized access.','Reverse engineer the application.','Use bots or automated systems.','Share another person\'s confidential information without consent.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 17 */}
              <TCSection id="provider-resp" number="17" title="Healthcare Provider Responsibilities" icon={<Briefcase className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Healthcare providers agree to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Maintain valid licenses.','Provide accurate professional information.','Deliver services ethically.','Maintain patient confidentiality.','Follow applicable healthcare regulations.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 18 */}
              <TCSection id="health-data" number="18" title="Health Data" icon={<Lock className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">Users understand that health-related information shared on Rehabiphy may be processed in accordance with the <strong>Privacy Policy</strong>.</p>
              </TCSection>

              {/* Section 19 */}
              <TCSection id="ip" number="19" title="Intellectual Property" icon={<FileText className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">All content available on Rehabiphy including:</p>
                <TTagList items={['Logo','Design','Source code','Graphics','Videos','Articles','AI models','Databases','Trademarks']} />
                <p className="text-slate-600 text-sm mt-4 mb-2">remain the exclusive property of <strong>Rehabiphy Health Technologies Pvt. Ltd.</strong></p>
                <p className="text-slate-500 text-sm">No content may be copied, reproduced, modified, distributed, or commercially exploited without prior written permission.</p>
              </TCSection>

              {/* Section 20 */}
              <TCSection id="user-content" number="20" title="User Content" icon={<FileText className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-3">Any reviews, comments, photographs, or other content uploaded by users remain the user's responsibility.</p>
                <p className="text-slate-500 text-sm">By uploading content, you grant Rehabiphy a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content for operating and improving the platform.</p>
              </TCSection>

              {/* Section 21 */}
              <TCSection id="privacy" number="21" title="Privacy" icon={<Lock className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">Use of Rehabiphy is governed by the Rehabiphy Privacy Policy. By using the platform, you consent to the collection, processing, and use of your information as described therein.</p>
              </TCSection>

              {/* Section 22 */}
              <TCSection id="third-party" number="22" title="Third-Party Services" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may integrate third-party services including but not limited to:</p>
                <TTagList items={['PayU','Google Play Services','Apple App Store','Firebase','Google Maps','Health Connect','Apple Health','Analytics providers','SMS and email providers']} />
                <p className="text-slate-500 text-sm mt-4">Use of these services is subject to their respective terms and privacy policies.</p>
              </TCSection>

              {/* Section 23 */}
              <TCSection id="availability" number="23" title="Availability" icon={<Bell className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy does not guarantee uninterrupted availability. Services may be temporarily unavailable due to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Maintenance','Technical failures','Internet disruptions','Force majeure events'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 24 */}
              <TCSection id="liability" number="24" title="Limitation of Liability" icon={<Scale className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">To the fullest extent permitted by law, Rehabiphy Health Technologies Pvt. Ltd., its directors, employees, affiliates, and partners shall not be liable for:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Medical outcomes','Treatment effectiveness','Loss of health data caused by user actions','Business losses','Indirect damages','Consequential damages','Loss of profits','Technical interruptions','Third-party actions'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-sm text-slate-600">
                  The aggregate liability of Rehabiphy shall not exceed the amount paid by the user for the specific service giving rise to the claim.
                </div>
              </TCSection>

              {/* Section 25 */}
              <TCSection id="indemnification" number="25" title="Indemnification" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">You agree to indemnify and hold harmless Rehabiphy Health Technologies Pvt. Ltd., its officers, employees, affiliates, and partners from any claims, damages, liabilities, costs, or expenses arising from:</p>
                <ul className="space-y-2">
                  {['Your breach of these Terms.','Your misuse of the platform.','Your violation of applicable laws.','Your infringement of third-party rights.'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 26 */}
              <TCSection id="suspension" number="26" title="Suspension and Termination" icon={<Ban className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may suspend or terminate accounts without prior notice for:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Fraud','Abuse','Misrepresentation','Illegal activity','Repeated policy violations','Threats to platform security'].map(item => (
                    <TLItem key={item}>{item}</TLItem>
                  ))}
                </ul>
              </TCSection>

              {/* Section 27 */}
              <TCSection id="force-majeure" number="27" title="Force Majeure" icon={<AlertTriangle className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">Rehabiphy shall not be liable for any delay or failure in performance caused by events beyond its reasonable control, including natural disasters, pandemics, governmental actions, strikes, power failures, internet outages, or other force majeure events.</p>
              </TCSection>

              {/* Section 28 */}
              <TCSection id="governing-law" number="28" title="Governing Law and Jurisdiction" icon={<Scale className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-3">These Terms shall be governed by the laws of India.</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600">
                  Any disputes shall be subject to the exclusive jurisdiction of the competent courts located in <strong>Lucknow, Uttar Pradesh, India</strong>.
                </div>
              </TCSection>

              {/* Section 29 */}
              <TCSection id="changes" number="29" title="Changes to Terms" icon={<FileText className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-3">Rehabiphy may update these Terms from time to time. Material changes will be notified through the application or website.</p>
                <p className="text-slate-500 text-sm">Continued use of the platform after such updates constitutes acceptance of the revised Terms.</p>
              </TCSection>

              {/* Section 30 */}
              <TCSection id="contact" number="30" title="Contact Information" icon={<Mail className="w-5 h-5" />}>
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <p className="font-bold text-slate-800">Rehabiphy Health Technologies Pvt. Ltd.</p>
                  <a href="mailto:support@rehabiphy.com" className="flex items-center gap-2 text-sm text-[#0F766E] hover:underline">
                    <Mail className="w-4 h-4" /> support@rehabiphy.com
                  </a>
                  <a href="https://www.rehabiphy.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#0F766E] hover:underline">
                    <Globe className="w-4 h-4" /> https://www.rehabiphy.com
                  </a>
                  <p className="text-slate-500 text-xs pt-2 border-t border-slate-100">For legal notices, grievances, or questions regarding these Terms, users may contact the above support channel.</p>
                </div>
              </TCSection>

              {/* Back button */}
              <div className="flex items-center justify-center py-6">
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#0F766E] to-[#115E59] rounded-full shadow-lg shadow-[#0F766E]/25 hover:shadow-xl hover:scale-105 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 border-t border-slate-800 text-center text-xs">
        <p>© {new Date().getFullYear()} Rehabiphy Health Technologies Private Limited. All rights reserved.</p>
        <p className="mt-1 text-slate-500">Terms & Conditions • Version 1.0 • Effective 25 July 2026</p>
      </footer>
    </div>
  );
};

/* ────────── Sub-components ────────── */

const TCSection: React.FC<{
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, number, title, icon, children }) => (
  <motion.section
    id={`tc-section-${id}`}
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.4 }}
    className="scroll-mt-24"
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#115E59] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0F766E]/20">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#0F766E]/60">Section {number}</span>
        <h2 className="text-lg sm:text-xl font-bold text-slate-800 font-heading leading-tight">{title}</h2>
      </div>
    </div>
    <div className="pl-0 sm:pl-12">
      {children}
    </div>
    <div className="mt-8 border-b border-dashed border-slate-200" />
  </motion.section>
);

const TLItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2 text-sm text-slate-600">
    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0" />
    {children}
  </li>
);

const TTagList: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map(item => (
      <span
        key={item}
        className="px-2.5 py-1 bg-[#0F766E]/8 text-[#0F766E] text-xs font-medium rounded-full border border-[#0F766E]/15"
      >
        {item}
      </span>
    ))}
  </div>
);
