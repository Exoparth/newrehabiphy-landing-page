// Prepares a blog's HTML body for display.
//
// The HTML comes from the backend, which sanitizes it against an allowlist when
// an admin saves it (see backend/src/lib/blogContent.js) — that is the trust
// boundary; this file only adds presentation:
//   • gives every <h2> an id and expands the <div data-toc> marker the editor
//     inserts into a numbered "Table of Contents" linking to those ids
//   • wraps tables so they scroll sideways on narrow screens
//   • lazy-loads images

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function prepareArticleHtml(html: string): string {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  const body = doc.body;

  const used = new Set<string>();
  const sections = Array.from(body.querySelectorAll('h2')).map((heading) => {
    const text = (heading.textContent || '').trim();
    const base = slugify(text) || 'section';
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    heading.id = id;
    return { id, text };
  });

  body.querySelectorAll('div[data-toc]').forEach((marker) => {
    if (sections.length === 0) {
      marker.remove();
      return;
    }
    const nav = doc.createElement('nav');
    nav.className = 'blog-toc';
    nav.setAttribute('aria-label', 'Table of contents');

    const title = doc.createElement('h2');
    title.textContent = 'Table of Contents';
    nav.appendChild(title);

    const list = doc.createElement('ol');
    sections.forEach(({ id, text }) => {
      const item = doc.createElement('li');
      const link = doc.createElement('a');
      link.href = `#${id}`;
      link.textContent = text;
      item.appendChild(link);
      list.appendChild(item);
    });
    nav.appendChild(list);
    marker.replaceWith(nav);
  });

  body.querySelectorAll('table').forEach((table) => {
    const wrap = doc.createElement('div');
    wrap.className = 'blog-table-wrap';
    table.replaceWith(wrap);
    wrap.appendChild(table);
  });

  body.querySelectorAll('img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  return body.innerHTML;
}
