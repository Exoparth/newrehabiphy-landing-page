import React, { useState, useEffect, useCallback } from 'react';
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
import { ContactUs } from './components/ContactUs';
import { VerifyRedirect } from './components/VerifyRedirect';
import { BlogListPage } from './components/blog/BlogListPage';
import { BlogPostPage } from './components/blog/BlogPostPage';

type Page = 'home' | 'privacy' | 'terms' | 'contact' | 'verify' | 'blogs' | 'blog';

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

  const hash = window.location.hash;
  if (hash === '#/privacy') return { page: 'privacy' };
  if (hash === '#/terms') return { page: 'terms' };
  if (hash === '#/contact') return { page: 'contact' };
  return { page: 'home' };
}

export default function App() {
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [route, setRoute] = useState<Route>(getRoute);
  const currentPage = route.page;

  // Client-side navigation to any in-app URL ('/', '/blogs/x', '/#/privacy', '/#features').
  const goTo = useCallback((url: string) => {
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

  const navigate = (page: 'home' | 'privacy' | 'terms' | 'contact') => {
    goTo(page === 'home' ? '/' : `/#/${page}`);
  };

  useEffect(() => {
    const handleLocationChange = () => setRoute(getRoute());
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  // Link handling for the blog pages. Runs in the capture phase so it wins over
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

      // Links to blog pages: navigate without a full reload.
      if (href === '/blogs' || href.startsWith('/blogs/')) {
        e.preventDefault();
        e.stopPropagation();
        goTo(href);
        return;
      }

      // Home-page anchors / hash pages (#features, #/contact…) clicked while on a blog page.
      const onBlogPage = window.location.pathname.startsWith('/blogs');
      if (onBlogPage && href.startsWith('#')) {
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
    return <PrivacyPolicy onBack={() => navigate('home')} />;
  }

  if (currentPage === 'terms') {
    return <TermsConditions onBack={() => navigate('home')} />;
  }

  if (currentPage === 'contact') {
    return <ContactUs onBack={() => navigate('home')} />;
  }

  if (currentPage === 'blogs' || currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-[#F8FFFC] text-slate-800 flex flex-col font-sans selection:bg-[#0F766E]/20 selection:text-[#0F766E]">
        <Navbar
          onOpenAiModal={() => setAiModalOpen(true)}
          onOpenDownloadModal={() => setDownloadModalOpen(true)}
        />

        <main className="flex-1 pt-24 sm:pt-28">
          {currentPage === 'blogs' ? (
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
          onOpenPrivacy={() => navigate('privacy')}
          onOpenTerms={() => navigate('terms')}
          onOpenContact={() => navigate('contact')}
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

        {/* 5. Key Features Section */}
        <KeyFeatures />

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
        onOpenContact={() => navigate('contact')}
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
