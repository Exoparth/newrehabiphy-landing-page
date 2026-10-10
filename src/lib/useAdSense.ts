import { useEffect } from 'react';

const ADSENSE_CLIENT = 'ca-pub-6912712210754936';
const SCRIPT_BASE = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
const SCRIPT_SRC = `${SCRIPT_BASE}?client=${ADSENSE_CLIENT}`;

// Articles shorter than this are treated as thin content: no ads, not indexed.
export const MIN_ARTICLE_WORDS = 300;

export function countWords(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').trim();
  return text ? text.split(/\s+/).length : 0;
}

// Once the script is on the page it keeps running across client-side
// navigations, so the router does a full page load when leaving an article.
export function isAdSenseLoaded(): boolean {
  return !!document.querySelector(`script[src^="${SCRIPT_BASE}"]`);
}

// Loads the AdSense script once `enabled` is true. Ads are only allowed next to
// real publisher content, so pages call this with "the article has rendered" —
// never on loading, error, legal, contact or redirect screens.
export function useAdSense(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    if (isAdSenseLoaded()) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = SCRIPT_SRC;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [enabled]);
}
