import { useEffect } from 'react';

/* Shared scroll-reveal + JS flag setup; call once per page after mount. */
export default function useSiteChrome() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    const els = document.querySelectorAll('.reveal');
    els.forEach((el) => io.observe(el));
    const failsafe = setTimeout(() => els.forEach((el) => el.classList.add('in')), 3500);
    return () => { io.disconnect(); clearTimeout(failsafe); };
  }, []);
}
