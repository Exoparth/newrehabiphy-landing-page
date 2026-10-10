import type { BlogDetail, BlogListResponse } from '../types';

// Data the server embedded in the HTML for the page being opened (see
// api/blog.js). It lets blog pages render on first paint without waiting for
// the API, and means the same content is in the HTML crawlers receive.
interface Prerendered {
  blog?: BlogDetail;
  blogList?: BlogListResponse;
}

declare global {
  interface Window {
    __REHABIPHY_DATA__?: Prerendered;
  }
}

export function readPrerendered<K extends keyof Prerendered>(
  key: K,
  matches?: (value: NonNullable<Prerendered[K]>) => boolean,
): NonNullable<Prerendered[K]> | null {
  const value = window.__REHABIPHY_DATA__?.[key];
  if (!value) return null;
  const found = value as NonNullable<Prerendered[K]>;
  return !matches || matches(found) ? found : null;
}
