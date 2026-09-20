import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Clock, Smartphone } from 'lucide-react';
import { ApiError } from '../../lib/apiClient';
import { blogService } from '../../lib/blogService';
import { prepareArticleHtml } from '../../lib/blogHtml';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { BlogDetail } from '../../types';
import { formatBlogDate } from './blogFormat';

interface BlogPostPageProps {
  slug: string;
  onOpenDownloadModal: () => void;
}

const BackToBlog: React.FC = () => (
  <a
    href="/blogs"
    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#0F766E] transition-colors"
  >
    <ArrowLeft className="w-4 h-4" />
    All articles
  </a>
);

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onOpenDownloadModal }) => {
  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'notFound' | 'error'>('loading');
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    setBlog(null);
    blogService
      .getBySlug(slug, controller.signal)
      .then((data) => {
        setBlog(data);
        setStatus('ready');
      })
      .catch((err) => {
        if ((err as Error).name === 'AbortError') return;
        if (err instanceof ApiError && err.status === 404) return setStatus('notFound');
        setError((err as Error).message);
        setStatus('error');
      });
    return () => controller.abort();
  }, [slug, attempt]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const html = useMemo(() => (blog ? prepareArticleHtml(blog.content) : ''), [blog]);

  useDocumentMeta({
    title: blog ? `${blog.title} | Rehabiphy` : status === 'notFound' ? 'Article not found | Rehabiphy' : 'Rehabiphy Blog',
    description: blog?.excerpt || undefined,
    image: blog?.coverImage,
    jsonLd: blog
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: blog.title,
          description: blog.excerpt || undefined,
          image: blog.coverImage || undefined,
          datePublished: blog.publishedAt,
          dateModified: blog.updatedAt,
          mainEntityOfPage: `${window.location.origin}/blogs/${blog.slug}`,
          publisher: { '@type': 'Organization', name: 'Rehabiphy' },
        }
      : undefined,
  });

  if (status === 'notFound' || status === 'error') {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
          {status === 'notFound' ? 'Article not found' : 'Something went wrong'}
        </h1>
        <p className="mt-3 text-slate-600">
          {status === 'notFound' ? 'This article may have been moved or is no longer published.' : error}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          {status === 'error' && (
            <button
              onClick={() => setAttempt((n) => n + 1)}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-colors"
            >
              Try again
            </button>
          )}
          <BackToBlog />
        </div>
      </div>
    );
  }

  if (status === 'loading' || !blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24" aria-busy="true">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 animate-pulse space-y-5">
          <div className="h-9 w-4/5 bg-slate-100 rounded" />
          <div className="h-9 w-3/5 bg-slate-100 rounded" />
          <div className="h-4 w-1/3 bg-slate-100 rounded" />
          <div className="aspect-[16/9] bg-slate-100 rounded-2xl" />
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-full bg-slate-100 rounded" />
          <div className="h-4 w-2/3 bg-slate-100 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
      <div className="mb-5">
        <BackToBlog />
      </div>

      <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm px-5 py-8 sm:px-12 sm:py-12">
        <header>
          <h1 className="blog-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0B1A30] leading-[1.15] tracking-tight">
            {blog.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-slate-500">
            <time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {blog.readingMinutes} min read
            </span>
          </div>
        </header>

        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt=""
            className="mt-8 w-full aspect-[16/9] object-cover rounded-2xl border border-slate-200/70"
          />
        )}

        {/* Server-sanitized HTML — see lib/blogHtml.ts */}
        <div className="blog-content mt-8" dangerouslySetInnerHTML={{ __html: html }} />
      </article>

      <aside className="mt-10 rounded-3xl bg-gradient-to-br from-[#0F766E] to-[#115E59] text-white p-8 sm:p-10 text-center shadow-lg shadow-[#0F766E]/20">
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">Recover smarter with Rehabiphy</h2>
        <p className="mt-2 text-emerald-100 max-w-md mx-auto">
          AI-guided motion tracking and certified physiotherapists — right on your phone.
        </p>
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
