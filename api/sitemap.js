// Serves /sitemap.xml (see the rewrite in vercel.json): the site's static pages
// plus every published article, read live from the blog API.

const API_BASE = (process.env.VITE_API_BASE_URL || 'https://api.rehabiphy.com').replace(/\/+$/, '');
const SITE_URL = 'https://www.rehabiphy.com';
const STATIC_PATHS = ['/', '/blogs', '/about', '/contact', '/privacy', '/terms'];
const MAX_PAGES = 50;

const escapeXml = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

async function fetchAllBlogs() {
  const blogs = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const res = await fetch(`${API_BASE}/v1/blogs?page=${page}&limit=100`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Blog API failed (${res.status})`);
    const payload = await res.json();
    const data = payload?.data ?? payload;
    blogs.push(...(data.blogs || []));
    if (page >= (data.totalPages || 1)) break;
  }
  return blogs;
}

export default async function handler(_req, res) {
  let blogs = [];
  let complete = true;
  try {
    blogs = await fetchAllBlogs();
  } catch (err) {
    console.error('[sitemap] could not load blogs:', err);
    complete = false;
  }

  const urls = STATIC_PATHS.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc></url>`);
  for (const blog of blogs) {
    // One-minute posts are too thin to be worth indexing (the page itself is noindex).
    if (!blog.slug || (Number(blog.readingMinutes) || 0) < 2) continue;
    const lastmod = blog.publishedAt ? `<lastmod>${escapeXml(new Date(blog.publishedAt).toISOString())}</lastmod>` : '';
    urls.push(`  <url><loc>${escapeXml(`${SITE_URL}/blogs/${encodeURIComponent(blog.slug)}`)}</loc>${lastmod}</url>`);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  // Don't let a partial sitemap (API was down) sit in the CDN cache.
  res.setHeader('Cache-Control', complete ? 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400' : 'no-store');
  res.end(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);
}
