import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyRehabiphy } from './components/WhyRehabiphy';
import { HowItWorks } from './components/HowItWorks';
import { KeyFeatures } from './components/KeyFeatures';
import { AudienceTab } from './components/AudienceTab';
import { Testimonials } from './components/Testimonials';
import { DownloadAppCTA } from './components/DownloadAppCTA';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';

type Page = 'home' | 'privacy' | 'terms';

function getInitialPage(): Page {
  const hash = window.location.hash;
  if (hash === '#/privacy') return 'privacy';
  if (hash === '#/terms') return 'terms';
  return 'home';
}

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `/${page}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => navigate('home')} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={() => navigate('home')} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FFFC] text-slate-800 flex flex-col font-sans selection:bg-[#0F766E]/20 selection:text-[#0F766E]">
      
      {/* 1. Sticky Navigation */}
      <Navbar
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onOpenAiModal={() => setAiModalOpen(true)}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 3. Why Rehabiphy Section */}
        <WhyRehabiphy
          onOpenAiModal={() => setAiModalOpen(true)}
        />

        {/* 4. How It Works Section */}
        <HowItWorks
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 5. Key Features Section */}
        <KeyFeatures
          onOpenAiModal={() => setAiModalOpen(true)}
        />

        {/* Audience Value Propositions (For Patients & Physiotherapists) */}
        <AudienceTab
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 6. Testimonials Section */}
        <Testimonials
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 7. Download App CTA Section */}
        <DownloadAppCTA
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />
      </main>

      {/* 8. Footer Section */}
      <Footer
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
        onOpenPrivacy={() => navigate('privacy')}
        onOpenTerms={() => navigate('terms')}
      />

      {/* Interactive Modals */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
      />

      <DownloadAppModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

    </div>
  );
}
