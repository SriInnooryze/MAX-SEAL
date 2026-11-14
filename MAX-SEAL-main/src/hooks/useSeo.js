import { useEffect } from 'react';
import { DEFAULT_TITLE, SITE_NAME } from '../seo/pageSeo';

/* Sets a page's title, description, canonical link, Open Graph / Twitter
   tags and JSON-LD while the page is open, and puts the site defaults back
   when it closes. The same values are baked into static HTML at build time
   by scripts/prerender-seo.mjs. */
function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) { el = document.createElement('meta'); el.setAttribute(attr, key); el.dataset.seo = '1'; document.head.appendChild(el); }
  el.setAttribute('content', content);
}

export default function useSeo(seo) {
  useEffect(() => {
    if (!seo) return undefined;
    document.title = seo.title;
    setMeta('name', 'description', seo.description);
    if (seo.keywords) setMeta('name', 'keywords', seo.keywords);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:title', seo.title);
    setMeta('property', 'og:description', seo.description);
    setMeta('property', 'og:url', seo.url);
    setMeta('property', 'og:image', seo.image);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seo.title);
    setMeta('name', 'twitter:description', seo.description);
    setMeta('name', 'twitter:image', seo.image);
    let canon = document.head.querySelector('link[rel="canonical"]');
    if (!canon) { canon = document.createElement('link'); canon.rel = 'canonical'; canon.dataset.seo = '1'; document.head.appendChild(canon); }
    canon.href = seo.url;
    const ld = document.createElement('script');
    ld.type = 'application/ld+json'; ld.dataset.seo = '1';
    ld.textContent = JSON.stringify(seo.jsonLd);
    document.head.appendChild(ld);
    return () => {
      document.title = DEFAULT_TITLE;
      document.head.querySelectorAll('[data-seo="1"]').forEach((el) => el.remove());
    };
  }, [seo]);
}
