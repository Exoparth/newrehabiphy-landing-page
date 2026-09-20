import { useEffect } from 'react';

interface DocumentMeta {
  title: string;
  description?: string;
  image?: string | null;
  jsonLd?: Record<string, unknown>;
}

function setMeta(attr: 'name' | 'property', key: string, content: string): () => void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  const previous = el?.getAttribute('content') ?? null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return () => {
    if (created) el!.remove();
    else if (previous !== null) el!.setAttribute('content', previous);
  };
}

// Sets the tab title / description / social tags for a page and restores the
// previous values when the page unmounts.
export function useDocumentMeta({ title, description, image, jsonLd }: DocumentMeta) {
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : '';

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const cleanups: Array<() => void> = [setMeta('property', 'og:title', title)];
    if (description) {
      cleanups.push(setMeta('name', 'description', description), setMeta('property', 'og:description', description));
    }
    if (image) cleanups.push(setMeta('property', 'og:image', image));

    let script: HTMLScriptElement | null = null;
    if (jsonLdText) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = jsonLdText;
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      cleanups.forEach((fn) => fn());
      script?.remove();
    };
  }, [title, description, image, jsonLdText]);
}
