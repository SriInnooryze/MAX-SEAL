/* Small WebP variants of large images, made by scripts/make-image-variants.py.

   thumbFor(path) — 200px WebP thumbnail of a product photo, for places that
   show it small (lists, cards, panels). Pair it with onThumbError so the
   original image is used if a thumbnail hasn't been generated yet (for
   example a product image added in the Excel after the script last ran). */
export function thumbFor(path) {
  if (!path) return path;
  const base = path.split('/').pop().replace(/\.[^.]+$/, '');
  return '/assets/maxseal/thumbs/' + base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '.webp';
}

export function onThumbError(original) {
  return (e) => {
    if (e.currentTarget.dataset.fallback) return;
    e.currentTarget.dataset.fallback = '1';
    e.currentTarget.src = original;
  };
}

/* srcset for an industry photo (/assets/maxseal/industries/<name>.png). */
export function industrySrcSet(path) {
  const base = path.replace(/\.png$/i, '');
  return `${encodeURI(base)}-800.webp 800w, ${encodeURI(base)}-1600.webp 1600w`;
}
