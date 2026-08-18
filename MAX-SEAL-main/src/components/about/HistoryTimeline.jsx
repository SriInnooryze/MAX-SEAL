import { useEffect, useRef, useState } from 'react';
import TimelineItem, { TimelineCard } from './TimelineItem';
import { ABOUT_TIMELINE } from '../../data/aboutData';
import timeline2008Img from '../../assets/about/timeline-2008-founding.jpg';
import timelineLeadershipImg from '../../assets/about/timeline-leadership-valve-experience.png';
import timelineUsImg from '../../assets/about/timeline-us-operations-supply.png';
import timelineLatamImg from '../../assets/about/timeline-latin-america-sales-support.png';
import timelineWorldwideImg from '../../assets/about/timeline-worldwide-distributor-network.png';
import timelineTodayImg from '../../assets/about/timeline-today-engineering-support.png';

/* Left rail: normal document flow, always fully visible to assistive tech —
   every row's period/title/description/image is permanently in the DOM
   regardless of scroll position or breakpoint (see TimelineItem.jsx). It
   stays the one real, accessible copy of the content at every width.
   `activeIndex` drives three purely cosmetic, always-reversible things: the
   rail's dot/line colour (.is-current/.is-passed on .htl__connector), which
   card is frontmost in the desktop sticky stage (>=900px), and which card
   is frontmost in the mobile/tablet sticky stage (<900px) — see pages.css.
   None of these paths ever unmounts a card, sets it to display:none, or
   leaves zero cards active — activeIndex always starts at (and is clamped
   to) a valid index, and every .htl-card is unconditionally rendered on
   every render in both stages. */
const IMAGES = {
  'timeline-2008': timeline2008Img,
  'timeline-leadership': timelineLeadershipImg,
  'timeline-us': timelineUsImg,
  'timeline-latam': timelineLatamImg,
  'timeline-worldwide': timelineWorldwideImg,
  'timeline-today': timelineTodayImg,
};

export default function HistoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Flips true once after mount. Default (false, first paint) leaves the
  // rail as the only visible timeline — the mobile sticky stage only turns
  // on (see `.htl-enhanced .htl-mobile` in pages.css) once this is true, so
  // a slow or failed JS init always falls back to the plain, fully visible,
  // fully accessible stacked rail rather than a half-initialised stage.
  const [enhanced, setEnhanced] = useState(false);
  const rowRefs = useRef([]);
  const mobileTriggerRefs = useRef([]);

  const items = ABOUT_TIMELINE.map((item) => ({ ...item, image: IMAGES[item.id] || item.image || null }));
  const lastIndex = items.length - 1;

  useEffect(() => {
    setEnhanced(true);
  }, []);

  useEffect(() => {
    // A single coordinated observer for activeIndex, not two competing
    // ones: at >=900px it watches the rail's own rows (desktop stage lives
    // beside the rail, which already provides real scroll distance); below
    // 900px it switches to the dedicated mobile trigger strip instead
    // (the rail is visually off-screen there, so its rows no longer make
    // useful scroll-distance targets). matchMedia decides which set is
    // actually being observed, so only one is ever live — crossing the
    // breakpoint (e.g. rotating a tablet) cleanly tears down the old one
    // and attaches the other, they never fight over activeIndex.
    const mq = window.matchMedia('(min-width: 900px)');
    let disconnect = () => {};

    function attach(isDesktop) {
      disconnect();
      const targets = (isDesktop ? rowRefs.current : mobileTriggerRefs.current).filter(Boolean);
      if (!targets.length) { disconnect = () => {}; return; }
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.idx);
            setActiveIndex(Math.max(0, Math.min(idx, lastIndex)));
          }
        });
      }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
      targets.forEach((el) => io.observe(el));
      disconnect = () => io.disconnect();
    }

    attach(mq.matches);
    const onChange = (e) => attach(e.matches);
    mq.addEventListener('change', onChange);
    return () => { mq.removeEventListener('change', onChange); disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <section className="section section--sunken" id="how-we-grew">
      <div className="wrap">
        <div className="kicker">HOW THE COMPANY GREW</div>
        <h2 className="about__h" style={{ marginBottom: 'clamp(2rem,3.5vw,3rem)' }}>
          From a focused start to worldwide supply
        </h2>

        <div className={'htl-layout' + (enhanced ? ' htl-enhanced' : '')}>
          <ol className="htl">
            {items.map((item, i) => (
              <TimelineItem
                key={item.id || i}
                item={item}
                index={i}
                current={i === activeIndex}
                passed={i < activeIndex}
                rowRef={(el) => { rowRefs.current[i] = el; }}
              />
            ))}
          </ol>

          {/* Desktop-only sticky stage (see pages.css — hidden by default,
              enabled only at >=900px with motion allowed). Purely
              decorative: every card is always rendered, aria-hidden since
              the rail already carries the same content accessibly. */}
          <div className="htl-stage" aria-hidden="true">
            {items.map((item, i) => (
              <TimelineCard
                key={item.id || i}
                item={item}
                index={i}
                state={i === activeIndex ? 'is-active' : i < activeIndex ? 'is-prev' : 'is-next'}
              />
            ))}
          </div>

          {/* Mobile/tablet sticky step-card stage (<900px, motion allowed,
              JS-enhanced). Also purely decorative/aria-hidden — the rail
              stays the real accessible copy, just visually moved off-screen
              once this is active (see `.htl-enhanced .htl` in pages.css).
              `.htl-mobile-track`'s tall min-height is what actually creates
              scroll distance; `.htl-mobile-sticky` pins inside it while the
              invisible `.htl-mobile-trigger` strip (one per milestone, even
              slices of the track) feeds the observer above. */}
          <div className="htl-mobile" aria-hidden="true">
            <div className="htl-mobile-track" style={{ '--htl-steps': items.length }}>
              <div className="htl-mobile-sticky">
                <div className="htl-mobile-progress">
                  <span className="htl-mobile-progress__count">{activeIndex + 1} / {items.length}</span>
                  <div className="htl-mobile-progress__dots">
                    {items.map((item, i) => (
                      <span key={item.id || i} className={'htl-mobile-progress__dot' + (i === activeIndex ? ' is-active' : '')} />
                    ))}
                  </div>
                </div>
                <div className="htl-mobile-stage">
                  {items.map((item, i) => (
                    <TimelineCard
                      key={item.id || i}
                      item={item}
                      index={i}
                      state={i === activeIndex ? 'is-active' : i < activeIndex ? 'is-prev' : 'is-next'}
                    />
                  ))}
                </div>
              </div>
              <div className="htl-mobile-triggers">
                {items.map((item, i) => (
                  <div
                    key={item.id || i}
                    className="htl-mobile-trigger"
                    data-idx={i}
                    style={{ top: (i * 100) / items.length + '%', height: 100 / items.length + '%' }}
                    ref={(el) => { mobileTriggerRefs.current[i] = el; }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
