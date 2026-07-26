import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Users,
  Globe,
  Bell,
  Trash2,
  Mail,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { RehabiphyLogo } from './RehabiphyLogo';

interface PrivacyPolicyProps {
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
  { id: 'definitions', number: '2', title: 'Definitions', icon: <Eye className="w-4 h-4" /> },
  { id: 'information', number: '3', title: 'Information We Collect', icon: <Database className="w-4 h-4" /> },
  { id: 'permissions', number: '4', title: 'Permissions Used', icon: <Lock className="w-4 h-4" /> },
  { id: 'how-we-use', number: '5', title: 'How We Use Your Information', icon: <Users className="w-4 h-4" /> },
  { id: 'ai-services', number: '6', title: 'AI Services', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'coins', number: '7', title: 'Rehabiphy Coins & Habit Tracking', icon: <Bell className="w-4 h-4" /> },
  { id: 'sharing', number: '8', title: 'Sharing of Information', icon: <Users className="w-4 h-4" /> },
  { id: 'security', number: '9', title: 'Data Security', icon: <Lock className="w-4 h-4" /> },
  { id: 'retention', number: '10', title: 'Data Retention', icon: <Database className="w-4 h-4" /> },
  { id: 'rights', number: '11', title: 'Your Rights', icon: <Eye className="w-4 h-4" /> },
  { id: 'children', number: '12', title: "Children's Privacy", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'cookies', number: '13', title: 'Cookies & Technologies', icon: <Globe className="w-4 h-4" /> },
  { id: 'third-party', number: '14', title: 'Third-Party Services', icon: <Globe className="w-4 h-4" /> },
  { id: 'transfers', number: '15', title: 'International Data Transfers', icon: <Globe className="w-4 h-4" /> },
  { id: 'deletion', number: '16', title: 'Account Deletion', icon: <Trash2 className="w-4 h-4" /> },
  { id: 'notifications', number: '17', title: 'Notifications', icon: <Bell className="w-4 h-4" /> },
  { id: 'changes', number: '18', title: 'Changes to This Policy', icon: <Eye className="w-4 h-4" /> },
  { id: 'disclaimer', number: '19', title: 'Disclaimer', icon: <ShieldCheck className="w-4 h-4" /> },
  { id: 'contact', number: '20', title: 'Contact Us', icon: <Mail className="w-4 h-4" /> },
];

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const section of sections) {
        const el = document.getElementById(`section-${section.id}`);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(`section-${id}`);
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
            <span className="text-[#0F766E] font-bold px-3 py-1.5 bg-[#0F766E]/8 rounded-full">Privacy Policy</span>
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
            exit={{ x: -300 }}
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
      <section className="relative bg-gradient-to-br from-slate-950 via-[#0F2027] to-[#0F766E]/60 overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-dot-matrix opacity-20" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0F766E]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#22C55E]/15 border border-[#22C55E]/30 rounded-full text-[#22C55E] text-xs font-bold mb-6">
              <ShieldCheck className="w-3.5 h-3.5" />
              Rehabiphy Health Technologies Private Limited
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight mb-4">
              Privacy <span className="text-[#22C55E]">Policy</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, store, disclose, and protect your data.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-[#22C55E]" /> Effective Date: 23 July 2026</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#22C55E]" /> Version 1.0</span>
              <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#22C55E]" /> DPDP Act, 2023 Compliant</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-10">

          {/* Sticky Sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 space-y-1 scrollbar-thin">
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

          {/* Policy Content */}
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
                  Welcome to <strong className="text-[#0F766E]">Rehabiphy</strong>. Rehabiphy Health Technologies Private Limited operates the Rehabiphy mobile application, website, and related digital healthcare services. By using Rehabiphy, you acknowledge that you have read and understood this Privacy Policy and consent to the practices described herein.
                </p>
                <p className="text-slate-500 text-xs mt-3">
                  This Privacy Policy complies with applicable Indian laws including the Digital Personal Data Protection Act, 2023 (DPDP Act), the Information Technology Act, 2000, and, where applicable, internationally accepted privacy principles.
                </p>
              </motion.div>

              {/* Section 1 */}
              <PolicySection id="about" number="1" title="About Rehabiphy" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">Rehabiphy is a digital healthcare ecosystem that provides:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Physiotherapy consultations','Home physiotherapy services','Clinic appointment booking','Online consultations','Rehabilitation programs','Habit tracking','Health rewards system','AI-powered health insights','Healthcare marketplace','Wellness monitoring','Fitness and rehabilitation services'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
              </PolicySection>

              {/* Section 2 */}
              <PolicySection id="definitions" number="2" title="Definitions" icon={<Eye className="w-5 h-5" />}>
                <div className="space-y-4">
                  <DefinitionBlock term="Personal Data" definition="Any information capable of identifying an individual." />
                  <DefinitionBlock term="Sensitive Personal Data" definition="Includes health-related information, medical history, rehabilitation data, and similar information where applicable under law." />
                  <DefinitionBlock term="Health Data" definition="Includes pain information, medical history, injuries, diagnoses, mobility scores, exercise logs, recovery progress, physiotherapy assessments, Health Connect information, and activity tracking." />
                  <DefinitionBlock term="Healthcare Provider" definition="Includes physiotherapists, fitness trainers, rehabilitation specialists, wellness professionals, and clinics." />
                  <DefinitionBlock term="Marketplace Partner" definition="Any service provider offering healthcare or wellness services through Rehabiphy." />
                </div>
              </PolicySection>

              {/* Section 3 */}
              <PolicySection id="information" number="3" title="Information We Collect" icon={<Database className="w-5 h-5" />}>
                <p className="text-slate-500 text-sm mb-5">Depending on how you use Rehabiphy, we may collect the following information.</p>
                <div className="space-y-5">
                  <InfoSubSection title="A. Account Information">
                    <TagList items={['Name','Mobile Number','Email Address','Gender','Date of Birth','Profile Photo','Address','City','State','PIN Code']} />
                  </InfoSubSection>
                  <InfoSubSection title="B. Health Information">
                    <TagList items={['Medical history','Injury details','Surgery history','Pain assessment','Movement limitations','Physiotherapy reports','Prescriptions','X-rays','MRI Reports','CT Scan Reports','Exercise adherence','Rehabilitation progress','Body measurements','Weight','Height']} />
                  </InfoSubSection>
                  <InfoSubSection title="C. Activity Data">
                    <TagList items={['Daily Steps','Walking Distance','Cycling Distance','Calories Burned','Active Minutes','Sleep Duration','Hydration Logs','Reading Habit','Breathing Exercise Completion','Workout Completion']} />
                  </InfoSubSection>
                  <InfoSubSection title="D. Device Information">
                    <TagList items={['Device ID','Android ID','iOS Device Identifier','IP Address','Operating System','App Version','Device Model','Language','Time Zone','Network Information']} />
                  </InfoSubSection>
                  <InfoSubSection title="E. Location Information">
                    <p className="text-slate-600 text-sm mb-3">With your permission, we may collect precise GPS location, approximate location, city, and state. Location is used for home physiotherapy booking, nearby clinics, nearby physiotherapists, emergency support, and marketplace recommendations. You may disable location permission at any time.</p>
                  </InfoSubSection>
                  <InfoSubSection title="F. Health Connect Data">
                    <p className="text-slate-600 text-sm mb-3">If you choose to connect Google Health Connect or Apple Health, Rehabiphy may access only the data categories you explicitly authorize. Health Connect permissions are completely optional.</p>
                    <TagList items={['Steps','Walking Distance','Cycling','Calories','Sleep','Exercise Sessions','Activity Records']} />
                  </InfoSubSection>
                  <InfoSubSection title="G. Camera & Storage">
                    <p className="text-slate-600 text-sm mb-3">With your permission, we may access your camera, gallery, and file storage to allow you to upload prescriptions, reports, profile photos, and medical documents.</p>
                  </InfoSubSection>
                  <InfoSubSection title="H. Payment Information">
                    <div className="p-3 bg-[#0F766E]/5 border border-[#0F766E]/20 rounded-xl text-sm text-slate-600 mb-3">
                      Payments are processed securely through <strong className="text-[#0F766E]">PayU</strong>. Rehabiphy does <strong>not</strong> store credit/debit card numbers, CVV, UPI PIN, or net banking passwords.
                    </div>
                    <p className="text-slate-500 text-xs">We may receive: Transaction ID, Payment Status, Amount Paid, Payment Timestamp, and Order Reference.</p>
                  </InfoSubSection>
                  <InfoSubSection title="I. Customer Support Information">
                    <TagList items={['Emails','Chat Messages','Phone Calls','Feedback','Complaint Details']} />
                  </InfoSubSection>
                </div>
              </PolicySection>

              {/* Section 4 */}
              <PolicySection id="permissions" number="4" title="Permissions Used" icon={<Lock className="w-5 h-5" />}>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#0F766E] text-white text-left">
                        <th className="px-4 py-3 font-semibold text-xs">Permission</th>
                        <th className="px-4 py-3 font-semibold text-xs">Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Camera','Upload profile photo and medical reports'],
                        ['Storage','Upload files and reports'],
                        ['Internet','Core app functionality'],
                        ['Notifications','Appointment reminders'],
                        ['Health Connect','Activity tracking'],
                        ['Physical Activity','Step counting'],
                        ['Location','Home visit booking'],
                        ['Phone','OTP verification (where applicable)'],
                      ].map(([perm, purpose], i) => (
                        <tr key={perm} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="px-4 py-2.5 font-medium text-slate-700 text-xs whitespace-nowrap">{perm}</td>
                          <td className="px-4 py-2.5 text-slate-500 text-xs">{purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </PolicySection>

              {/* Section 5 */}
              <PolicySection id="how-we-use" number="5" title="How We Use Your Information" icon={<Users className="w-5 h-5" />}>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Create your account','Book appointments','Connect you with physiotherapists','Provide AI-generated health insights','Recommend rehabilitation programs','Track recovery progress','Track habits','Award Rehabiphy Coins','Improve services','Detect fraud','Process payments','Send reminders','Customer support','Analytics','Security','Legal compliance'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
              </PolicySection>

              {/* Section 6 */}
              <PolicySection id="ai-services" number="6" title="AI Services" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may use Artificial Intelligence to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Suggest rehabilitation exercises','Analyze recovery progress','Recommend habits','Generate personalized insights','Improve user engagement','Personalize notifications'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                  <strong>Important:</strong> AI-generated recommendations are informational only and do not replace professional medical advice. Clinical decisions should always be made in consultation with qualified healthcare professionals.
                </div>
              </PolicySection>

              {/* Section 7 */}
              <PolicySection id="coins" number="7" title="Rehabiphy Coins & Habit Tracking" icon={<Bell className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">When you participate in walking, cycling, hydration, sleep tracking, reading, and breathing exercises, Rehabiphy may collect completion data to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['Calculate rewards','Award Rehabiphy Coins','Maintain leaderboards','Prevent fraud','Detect fake activity'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
              </PolicySection>

              {/* Section 8 */}
              <PolicySection id="sharing" number="8" title="Sharing of Information" icon={<Users className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">We may share your information only where necessary with:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Healthcare Providers', desc: 'To deliver treatment' },
                    { name: 'Clinics', desc: 'For appointment management' },
                    { name: 'Fitness Trainers', desc: 'If you book their services' },
                    { name: 'Payment Gateway', desc: 'PayU for secure payment processing' },
                    { name: 'Cloud Service Providers', desc: 'For secure hosting and backups' },
                    { name: 'SMS & Email Providers', desc: 'For OTPs, reminders, invoices, and notifications' },
                    { name: 'Analytics Providers', desc: 'To improve app performance and user experience' },
                    { name: 'Government Authorities', desc: 'Where required by law' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-start gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <ChevronRight className="w-4 h-4 text-[#0F766E] mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-700">{item.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-[#0F766E]/8 border border-[#0F766E]/20 rounded-xl text-sm font-semibold text-[#0F766E]">
                  We do <strong>not</strong> sell your personal information.
                </div>
              </PolicySection>

              {/* Section 9 */}
              <PolicySection id="security" number="9" title="Data Security" icon={<Lock className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">We implement industry-standard safeguards including:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Encryption in transit (TLS/SSL)','Encryption at rest','Secure authentication','Access controls','Role-based permissions','Secure cloud infrastructure','Audit logging','Regular security monitoring'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-xs">While we strive to protect your information, no system can guarantee absolute security.</p>
              </PolicySection>

              {/* Section 10 */}
              <PolicySection id="retention" number="10" title="Data Retention" icon={<Database className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">We retain personal information only for as long as necessary to:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Provide services','Comply with legal obligations','Resolve disputes','Enforce agreements'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Upon account deletion, personal data will be deleted or anonymized within a reasonable period, except where retention is required by law.</p>
              </PolicySection>

              {/* Section 11 */}
              <PolicySection id="rights" number="11" title="Your Rights" icon={<Eye className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Subject to applicable law, you may:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Access your information','Correct inaccurate information','Update your profile','Delete your account','Withdraw consent','Download your data (where available)','Request restriction of processing','Object to certain processing activities'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">Requests can be made through the app or by contacting us.</p>
              </PolicySection>

              {/* Section 12 */}
              <PolicySection id="children" number="12" title="Children's Privacy" icon={<ShieldCheck className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">Rehabiphy is not intended for children under the age permitted by applicable law without parental or guardian consent. If we become aware that personal information has been collected from a child without appropriate consent, we will delete such information promptly.</p>
              </PolicySection>

              {/* Section 13 */}
              <PolicySection id="cookies" number="13" title="Cookies and Similar Technologies" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Our website and services may use cookies, SDKs, local storage, device identifiers, and analytics tools. These help us:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Remember preferences','Improve performance','Measure engagement','Enhance security'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">You can manage cookie preferences through your browser settings where applicable.</p>
              </PolicySection>

              {/* Section 14 */}
              <PolicySection id="third-party" number="14" title="Third-Party Services" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may integrate with third-party services including, but not limited to:</p>
                <TagList items={['PayU','Google Health Connect','Apple Health','Firebase','Google Analytics for Firebase','Google Maps','SMS gateway providers','Email service providers','Cloud hosting providers']} />
                <p className="text-slate-500 text-sm mt-4">Each third-party service has its own privacy policy, and we encourage you to review them.</p>
              </PolicySection>

              {/* Section 15 */}
              <PolicySection id="transfers" number="15" title="International Data Transfers" icon={<Globe className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">If personal data is processed or stored outside India, we will implement appropriate safeguards in accordance with applicable laws.</p>
              </PolicySection>

              {/* Section 16 */}
              <PolicySection id="deletion" number="16" title="Account Deletion" icon={<Trash2 className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Users may request account deletion through the app or by contacting us. After verification:</p>
                <ul className="space-y-2">
                  <ListItem>Personal information will be deleted or anonymized, except where legal obligations require retention.</ListItem>
                  <ListItem>Transaction records may be retained for accounting, taxation, fraud prevention, or regulatory compliance.</ListItem>
                </ul>
              </PolicySection>

              {/* Section 17 */}
              <PolicySection id="notifications" number="17" title="Notifications" icon={<Bell className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-4">Rehabiphy may send:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {['Appointment reminders','Exercise reminders','Medication reminders (if enabled)','Health tips','Promotional offers','Coin and reward updates','Habit reminders','System announcements'].map(item => (
                    <ListItem key={item}>{item}</ListItem>
                  ))}
                </ul>
                <p className="text-slate-500 text-sm">You can manage notification preferences in the app settings.</p>
              </PolicySection>

              {/* Section 18 */}
              <PolicySection id="changes" number="18" title="Changes to This Privacy Policy" icon={<Eye className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm leading-relaxed">We may update this Privacy Policy from time to time. Material changes will be communicated through the app, website, email, or other appropriate means. The updated version will become effective on the date specified at the top of this policy.</p>
              </PolicySection>

              {/* Section 19 */}
              <PolicySection id="disclaimer" number="19" title="Disclaimer" icon={<ShieldCheck className="w-5 h-5" />}>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 leading-relaxed">
                  Rehabiphy provides technology-enabled healthcare support and wellness services. AI-generated suggestions, educational content, and wellness recommendations are intended for informational purposes only and should not be considered a substitute for professional medical diagnosis, treatment, or emergency care. Always seek advice from a qualified healthcare professional regarding medical conditions or treatment decisions.
                </div>
              </PolicySection>

              {/* Section 20 */}
              <PolicySection id="contact" number="20" title="Contact Us" icon={<Mail className="w-5 h-5" />}>
                <p className="text-slate-600 text-sm mb-5">If you have any questions, concerns, requests, or complaints regarding this Privacy Policy, please contact:</p>
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <p className="font-bold text-slate-800">Rehabiphy Health Technologies Private Limited</p>
                  <a href="mailto:privacy@rehabiphy.com" className="flex items-center gap-2 text-sm text-[#0F766E] hover:underline">
                    <Mail className="w-4 h-4" /> privacy@rehabiphy.com
                  </a>
                  <a href="mailto:support@rehabiphy.com" className="flex items-center gap-2 text-sm text-[#0F766E] hover:underline">
                    <Mail className="w-4 h-4" /> support@rehabiphy.com
                  </a>
                  <a href="https://rehabiphy.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#0F766E] hover:underline">
                    <Globe className="w-4 h-4" /> https://rehabiphy.com
                  </a>
                </div>
              </PolicySection>

              {/* Google Play Coverage Note */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-slate-800 text-sm mb-3">Google Play Store Data Safety Coverage</h3>
                <p className="text-slate-500 text-xs mb-3">This policy covers the data types typically disclosed in the Google Play Data Safety form, including:</p>
                <TagList items={['Personal Information','Contact Information','Health and Fitness Data','Financial Transaction Information','App Activity','Device or Other IDs','Location','Photos and Files','Messages (support only)','Crash Logs','Diagnostics','Performance Data','User-Generated Content','Security and Fraud Prevention Data']} />
              </div>

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
        <p className="mt-1 text-slate-500">Privacy Policy • Version 1.0 • Effective 23 July 2026</p>
      </footer>
    </div>
  );
};

/* ────────── Sub-components ────────── */

const PolicySection: React.FC<{
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, number, title, icon, children }) => (
  <motion.section
    id={`section-${id}`}
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

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-2 text-sm text-slate-600">
    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0F766E] shrink-0" />
    {children}
  </li>
);

const DefinitionBlock: React.FC<{ term: string; definition: string }> = ({ term, definition }) => (
  <div className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
    <p className="text-xs font-bold text-[#0F766E] uppercase tracking-wide mb-1">{term}</p>
    <p className="text-sm text-slate-600 leading-relaxed">{definition}</p>
  </div>
);

const InfoSubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="p-4 sm:p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
    <h4 className="text-sm font-bold text-slate-700 mb-3 pb-2 border-b border-slate-100">{title}</h4>
    {children}
  </div>
);

const TagList: React.FC<{ items: string[] }> = ({ items }) => (
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
