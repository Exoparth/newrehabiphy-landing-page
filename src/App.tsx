import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WhyRehabiphy } from './components/WhyRehabiphy';
import { HowItWorks } from './components/HowItWorks';
import { PostureAssessment } from './components/PostureAssessment';
import { KeyFeatures } from './components/KeyFeatures';
import { AudienceTab } from './components/AudienceTab';
import { DownloadAppCTA } from './components/DownloadAppCTA';
import { Footer } from './components/Footer';
import { AiAssistantModal } from './components/AiAssistantModal';
import { DownloadAppModal } from './components/DownloadAppModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { ContactUs } from './components/ContactUs';
import { AboutUs } from './components/AboutUs';
import { VerifyRedirect } from './components/VerifyRedirect';
import { BlogListPage } from './components/blog/BlogListPage';
import { BlogPostPage } from './components/blog/BlogPostPage';
import { isAdSenseLoaded } from './lib/useAdSense';

type Page = 'home' | 'privacy' | 'terms' | 'contact' | 'about' | 'verify' | 'blogs' | 'blog';
type StaticPage = 'privacy' | 'terms' | 'contact' | 'about';

// Pages with their own real URL, so crawlers and visitors can link straight to them.
const STATIC_PAGES: Record<string, StaticPage> = {
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/contact': 'contact',
  '/about': 'about',
};

interface Route {
  page: Page;
  slug?: string; // set for page === 'blog'
}

function getRoute(): Route {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';

  // /verify is a real path (not a #hash route like the others below) —
  // it has to be, since Android/iOS App Links match against the actual
  // URL path, not the fragment, in order to intercept it into the app.
  if (path === '/verify') return { page: 'verify' };

  // Blog pages are real paths too, so every article has its own shareable,
  // indexable URL (see the /blogs rewrites in vercel.json).
  if (path === '/blogs') return { page: 'blogs' };
  const blogMatch = path.match(/^\/blogs\/([^/]+)$/);
  if (blogMatch) return { page: 'blog', slug: decodeURIComponent(blogMatch[1]) };

  if (STATIC_PAGES[path]) return { page: STATIC_PAGES[path] };

  // Old links used #/privacy, #/terms and #/contact — send them to the real URLs.
  const legacy = window.location.hash.replace(/^#/, '');
  if (STATIC_PAGES[legacy]) {
    window.history.replaceState(null, '', legacy);
    return { page: STATIC_PAGES[legacy] };
  }

  return { page: 'home' };
}

const isBlogUrl = (url: string) => /^\/blogs(\/|$)/.test(url);

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [route, setRoute] = useState<Route>(getRoute);
  const currentPage = route.page;

  // Client-side navigation to any in-app URL ('/', '/blogs/x', '/privacy', '/#features').
  const goTo = useCallback((url: string) => {
    // Ads belong on article pages only: once the ad script is running, leave
    // the blog with a full page load so it doesn't follow the visitor around.
    if (isAdSenseLoaded() && !isBlogUrl(url)) {
      window.location.assign(url);
      return;
    }

    window.history.pushState(null, '', url);
    setRoute(getRoute());

    const anchor = url.split('#')[1];
    if (anchor && !anchor.startsWith('/')) {
      // Plain in-page anchor: wait for the target page to render, then scroll to it.
      setTimeout(() => document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goHome = () => goTo('/');

  useEffect(() => {
    const handleLocationChange = () => {
      if (isAdSenseLoaded() && !isBlogUrl(window.location.pathname)) {
        window.location.reload();
        return;
      }
      setRoute(getRoute());
    };
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Link handling for in-app URLs. Runs in the capture phase so it wins over
  // the Navbar's own hash-link handler.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor || (anchor.target && anchor.target !== '_self')) return;
      const href = anchor.getAttribute('href') || '';

      // Table-of-contents links inside an article: scroll within the article.
      if (href.startsWith('#') && anchor.closest('.blog-content')) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById(decodeURIComponent(href.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      // Links to in-app pages: navigate without a full reload.
      if (href === '/' || isBlogUrl(href) || STATIC_PAGES[href]) {
        e.preventDefault();
        e.stopPropagation();
        goTo(href);
        return;
      }

      // Home-page anchors (#features…) clicked while on any other page.
      const offHome = window.location.pathname.replace(/\/+$/, '') !== '';
      if (offHome && href.startsWith('#')) {
        e.preventDefault();
        e.stopPropagation();
        goTo(`/${href === '#' ? '' : href}`);
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [goTo]);

  if (currentPage === 'verify') {
    return <VerifyRedirect />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={goHome} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={goHome} />;
  }

  if (currentPage === 'contact') {
    return <ContactUs onBack={goHome} />;
  }

  if (currentPage === 'blogs' || currentPage === 'blog' || currentPage === 'about') {
    return (
      <div className="min-h-screen bg-[#F8FFFC] text-slate-800 flex flex-col font-sans selection:bg-[#0F766E]/20 selection:text-[#0F766E]">
        <Navbar
          onOpenAiModal={() => setAiModalOpen(true)}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        <main className="flex-1 pt-24 sm:pt-28">
          {currentPage === 'about' ? (
            <AboutUs onOpenDownloadModal={() => setDownloadModalOpen(true)} />
          ) : currentPage === 'blogs' ? (
            <BlogListPage />
          ) : (
            <BlogPostPage
              key={route.slug}
              slug={route.slug!}
              onOpenDownloadModal={() => setDownloadModalOpen(true)}
            />
          )}
        </main>

        <Footer
          onOpenAiModal={() => setAiModalOpen(true)}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        <AiAssistantModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
        <DownloadAppModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
      </div>
    );
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
        <WhyRehabiphy />

        {/* 4. How It Works Section */}
        <HowItWorks
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* AI Posture Assessment (in-app screening tool) */}
        <PostureAssessment
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 5. Key Features Section */}
        <KeyFeatures />

        {/* Audience Value Propositions (For Patients & Physiotherapists) */}
        <AudienceTab
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        {/* 6. Download App CTA Section */}
        <DownloadAppCTA
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />
      </main>

      {/* 7. Footer Section */}
      <Footer
        onOpenAiModal={() => setAiModalOpen(true)}
        onOpenDownloadModal={() => setDownloadModalOpen(true)}
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
