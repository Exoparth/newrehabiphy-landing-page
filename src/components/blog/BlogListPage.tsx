import React, { useCallback, useEffect, useState } from 'react';
import { ArrowRight, Clock, Loader2 } from 'lucide-react';
import { blogService } from '../../lib/blogService';
import { useDocumentMeta } from '../../lib/useDocumentMeta';
import type { BlogSummary } from '../../types';
import { RehabiphyIcon } from '../RehabiphyLogo';
import { formatBlogDate } from './blogFormat';

const PAGE_SIZE = 9;

const BlogCard: React.FC<{ blog: BlogSummary }> = ({ blog }) => (
  <a
    href={`/blogs/${blog.slug}`}
    className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-[#0F766E]/10 hover:-translate-y-0.5 transition-all"
  >
    <div className="aspect-[16/9] bg-gradient-to-br from-[#E6F4F1] to-[#F8FFFC] overflow-hidden flex items-center justify-center">
      {blog.coverImage ? (
        <img
          src={blog.coverImage}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      ) : (
        <RehabiphyIcon size={72} className="opacity-70" />
      )}
    </div>
    <div className="flex flex-col flex-1 p-5 sm:p-6">
      <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
        <time dateTime={blog.publishedAt}>{formatBlogDate(blog.publishedAt)}</time>
        <span className="w-1 h-1 rounded-full bg-slate-300" />
        <span className="inline-flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {blog.readingMinutes} min read
        </span>
      </div>
      <h2 className="blog-serif mt-3 text-xl font-bold text-slate-900 leading-snug group-hover:text-[#0F766E] transition-colors">
        {blog.title}
      </h2>
      {blog.excerpt && <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">{blog.excerpt}</p>}
      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#0F766E]">
        Read article
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </div>
  </a>
);

export const BlogListPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useDocumentMeta({
    title: 'Blog | Rehabiphy — AI Physiotherapy & Recovery',
    description:
      'Guides, recovery tips and insights on physiotherapy, rehabilitation and moving better — from the Rehabiphy team.',
  });

  const loadPage = useCallback(async (nextPage: number, signal?: AbortSignal) => {
    setLoading(true);
    setError('');
    try {
      const data = await blogService.list(nextPage, PAGE_SIZE, signal);
      setBlogs((prev) => (nextPage === 1 ? data.blogs : [...prev, ...data.blogs]));
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadPage(1, controller.signal);
    return () => controller.abort();
  }, [loadPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <header className="max-w-2xl mx-auto text-center pt-6 pb-12">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#0F766E]/20 text-[#0F766E] text-xs font-semibold shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          The Rehabiphy Blog
        </span>
        <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-[1.1]">
          Recover smarter, <span className="text-[#0F766E]">move better</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
          Guides, recovery tips and insights on physiotherapy and rehabilitation.
        </p>
      </header>

      {error && (
        <div className="max-w-md mx-auto text-center bg-white border border-slate-200 rounded-2xl p-8">
          <p className="text-slate-700 font-medium">{error}</p>
          <button
            onClick={() => loadPage(Math.max(1, page + 1))}
            className="mt-4 px-5 py-2.5 rounded-full text-sm font-bold text-white bg-[#0F766E] hover:bg-[#115E59] transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {!error && loading && blogs.length === 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden animate-pulse">
              <div className="aspect-[16/9] bg-slate-100" />
              <div className="p-6 space-y-3">
                <div className="h-3 w-1/3 bg-slate-100 rounded" />
                <div className="h-5 w-4/5 bg-slate-100 rounded" />
                <div className="h-3 w-full bg-slate-100 rounded" />
                <div className="h-3 w-2/3 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!error && !loading && blogs.length === 0 && (
        <p className="text-center text-slate-500 py-16">No articles yet — check back soon.</p>
      )}

      {blogs.length > 0 && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {page < totalPages && (
            <div className="mt-12 text-center">
              <button
                onClick={() => loadPage(page + 1)}
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold text-[#0F766E] bg-white border border-[#0F766E]/25 hover:bg-[#0F766E]/5 disabled:opacity-60 transition-colors"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                Load more articles
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
