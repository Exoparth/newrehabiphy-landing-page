// Serves /blogs and /blogs/:slug (see the rewrites in vercel.json).
//
// The site is a client-rendered React app, so on its own every URL returns the
// same empty HTML shell. For the blog that means crawlers get no article text.
// This function takes the built shell and fills it in before it is sent:
//   • the page's own <title>, description, canonical URL and Article JSON-LD
//   • the article (or the article list) as plain HTML inside #root
//   • the same data as JSON, so the app renders immediately without refetching
// It also returns a real 404 for an article that doesn't exist.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const API_BASE = (process.env.VITE_API_BASE_URL || 'https://api.rehabiphy.com').replace(/\/+$/, '');
const SITE_URL = 'https://www.rehabiphy.com';
const PAGE_SIZE = 9; // keep in sync with BlogListPage
const MIN_ARTICLE_WORDS = 300; // keep in sync with src/lib/useAdSense.ts

let shellCache = null;

async function loadShell(req) {
  if (shellCache) return shellCache;
  try {
    shellCache = await readFile(path.join(process.cwd(), 'dist', 'index.html'), 'utf8');
  } catch {
    // Not bundled with the function — fetch the static file from this deployment.
    const proto = req.headers['x-forwarded-proto'] || 'https';
    const res = await fetch(`${proto}://${req.headers.host}/index.html`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`Could not load index.html (${res.status})`);
    shellCache = await res.text();
  }
  return shellCache;
}

async function apiGet(pathname) {
  const res = await fetch(`${API_BASE}/v1${pathname}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${pathname} failed (${res.status})`);
  const payload = await res.json();
  return payload?.data ?? payload;
}

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// JSON that is safe to place inside a <script> element.
const scriptJson = (value) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/[\u2028\u2029]/g, (c) => (c === '\u2028' ? '\\u2028' : '\\u2029'));

const countWords = (html) => {
  const text = String(html || '').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
};

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });

function fillShell(shell, { title, description, canonical, image, noindex, jsonLd, body, data }) {
  const head = [
    `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
    `<meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    description ? `<meta property="og:description" content="${escapeHtml(description)}" />` : '',
    `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
    image ? `<meta property="og:image" content="${escapeHtml(image)}" />` : '',
    jsonLd ? `<script type="application/ld+json">${scriptJson(jsonLd)}</script>` : '',
    data ? `<script>window.__REHABIPHY_DATA__=${scriptJson(data)}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  // Function replacers throughout: article text may contain "$", which a
  // string replacement would treat as a substitution pattern.
  let html = shell.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escapeHtml(title)}</title>`);
  if (description) {
    html = html.replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      () => `<meta name="description" content="${escapeHtml(description)}" />`,
    );
  }
  html = html.replace('</head>', () => `    ${head}\n  </head>`);
  if (body) html = html.replace('<div id="root"></div>', () => `<div id="root">${body}</div>`);
  return html;
}

function articleBody(blog) {
  return `<main class="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
      <p><a href="/blogs">All articles</a></p>
      <article>
        <h1>${escapeHtml(blog.title)}</h1>
        <p>By the <a href="/about">Rehabiphy Team</a> · <time datetime="${escapeHtml(blog.publishedAt)}">${escapeHtml(formatDate(blog.publishedAt))}</time> · ${Number(blog.readingMinutes) || 1} min read</p>
        <div class="blog-content">${blog.content || ''}</div>
        <p><strong>Medical disclaimer:</strong> This article is general information, not medical advice, and is not a substitute for an assessment by a qualified healthcare professional.</p>
      </article>
      <nav><a href="/">Home</a> · <a href="/blogs">Blog</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a></nav>
    </main>`;
}

function listBody(list) {
  const items = list.blogs
    .map(
      (b) => `<li>
          <h2><a href="/blogs/${encodeURIComponent(b.slug)}">${escapeHtml(b.title)}</a></h2>
          <p><time datetime="${escapeHtml(b.publishedAt)}">${escapeHtml(formatDate(b.publishedAt))}</time> · ${Number(b.readingMinutes) || 1} min read</p>
          ${b.excerpt ? `<p>${escapeHtml(b.excerpt)}</p>` : ''}
        </li>`,
    )
    .join('\n        ');
  return `<main class="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24">
      <h1>The Rehabiphy Blog</h1>
      <p>Guides, recovery tips and insights on physiotherapy and rehabilitation.</p>
      <ul>
        ${items}
      </ul>
      <nav><a href="/">Home</a> · <a href="/about">About</a> · <a href="/contact">Contact</a> · <a href="/privacy">Privacy Policy</a> · <a href="/terms">Terms</a></nav>
    </main>`;
}

function getSlug(req) {
  const fromQuery = req.query?.slug;
  if (fromQuery) return String(Array.isArray(fromQuery) ? fromQuery[0] : fromQuery);
  const match = String(req.url || '').match(/^\/blogs\/([^/?#]+)/);
  return match ? decodeURIComponent(match[1]) : '';
}

function send(res, status, html, cache) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', cache);
  res.end(html);
}

const CACHE_OK = 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400';
const CACHE_NONE = 'no-store';

export default async function handler(req, res) {
  let shell;
  try {
    shell = await loadShell(req);
  } catch (err) {
    console.error('[blog] shell unavailable:', err);
    send(res, 500, '<!doctype html><title>Rehabiphy</title><p>Something went wrong. Please try again.</p>', CACHE_NONE);
    return;
  }

  const slug = getSlug(req);

  try {
    if (!slug) {
      const list = await apiGet(`/blogs?page=1&limit=${PAGE_SIZE}`);
      if (!list?.blogs) throw new Error('Unexpected blog list response');
      const html = fillShell(shell, {
        title: 'Blog | Rehabiphy — AI Physiotherapy & Recovery',
        description:
          'Guides, recovery tips and insights on physiotherapy, rehabilitation and moving better — from the Rehabiphy team.',
        canonical: `${SITE_URL}/blogs`,
        body: listBody(list),
        data: { blogList: list },
      });
      send(res, 200, html, CACHE_OK);
      return;
    }

    const blog = await apiGet(`/blogs/${encodeURIComponent(slug)}`);
    if (!blog) {
      const html = fillShell(shell, {
        title: 'Article not found | Rehabiphy',
        canonical: `${SITE_URL}/blogs`,
        noindex: true,
      });
      send(res, 404, html, CACHE_NONE);
      return;
    }

    const canonical = `${SITE_URL}/blogs/${encodeURIComponent(blog.slug)}`;
    const html = fillShell(shell, {
      title: `${blog.title} | Rehabiphy`,
      description: blog.excerpt || undefined,
      canonical,
      image: blog.coverImage || undefined,
      // Very short posts are thin content — keep them out of search results.
      noindex: countWords(blog.content) < MIN_ARTICLE_WORDS,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: blog.title,
        description: blog.excerpt || undefined,
        image: blog.coverImage || undefined,
        datePublished: blog.publishedAt,
        dateModified: blog.updatedAt,
        mainEntityOfPage: canonical,
        author: { '@type': 'Organization', name: 'Rehabiphy Team', url: `${SITE_URL}/about` },
        publisher: { '@type': 'Organization', name: 'Rehabiphy', url: SITE_URL },
      },
      body: articleBody(blog),
      data: { blog },
    });
    send(res, 200, html, CACHE_OK);
  } catch (err) {
    // API trouble: fall back to the plain app shell, which fetches for itself.
    console.error('[blog] prerender failed:', err);
    send(res, 200, shell, CACHE_NONE);
  }
}
