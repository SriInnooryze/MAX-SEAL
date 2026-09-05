import { useEffect } from 'react';

/* Centers the currently-active item inside a horizontally scrollable
   container whenever `dep` changes — shared by every horizontal nav/tab/
   filter row on the site that can select an item narrower than the row's
   own scroll width (Industries nav, Solutions tabs, Product Detail tabs,
   Marketing Resources filters). Runs on mount too, so an item selected via
   a URL param or the mobile menu is revealed even though nothing was
   clicked inside the row itself.

   Scrolls the container's own scrollLeft directly (not scrollIntoView), so
   this can never drag the page's vertical scroll along with it — on a
   layout where the row doesn't actually overflow (e.g. desktop), the same
   math just clamps to 0 and no-ops. */
export default function useCenterActiveInScroller(containerRef, activeSelector, dep) {
  useEffect(() => {
    const container = containerRef.current;
    const activeEl = container && container.querySelector(activeSelector);
    if (!container || !activeEl) return;
    const target = activeEl.offsetLeft + activeEl.offsetWidth / 2 - container.clientWidth / 2;
    const max = container.scrollWidth - container.clientWidth;
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container.scrollTo({ left: Math.max(0, Math.min(max, target)), behavior: reduceMotion ? 'auto' : 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
}
