import { useEffect, useRef, useState } from 'react';
import TimelineItem, { TimelineCard } from './TimelineItem';
import { ABOUT_TIMELINE } from '../../data/aboutData';
import timeline2008Img from '../../assets/about/team-photo.jpg';
import timelineLeadershipImg from '../../assets/about/timeline-leadership-valve-experience.png';
import timelineUsImg from '../../assets/about/timeline-us-operations-supply.png';
import timelineLatamImg from '../../assets/about/timeline-latin-america-sales-support.png';
import timelineWorldwideImg from '../../assets/about/timeline-worldwide-distributor-network.png';
import timelineTodayImg from '../../assets/about/timeline-today-engineering-support.png';

/* Left rail: normal document flow, always fully visible — every row's
   period/title/description/image is permanently in the DOM regardless of
   scroll position or breakpoint (see TimelineItem.jsx). Below 900px the
   rail is the whole timeline (text with its photo under each milestone).
   `activeIndex` drives two purely cosmetic, always-reversible things: the
   rail's dot/line colour (.is-current/.is-passed on .htl__connector) and
   which card is frontmost in the desktop sticky stage (>=900px) — see
   pages.css. activeIndex always starts at (and is clamped to) a valid
   index, and every .htl-card is unconditionally rendered. */
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
  const rowRefs = useRef([]);

  const items = ABOUT_TIMELINE.map((item) => ({ ...item, image: IMAGES[item.id] || item.image || null }));
  const lastIndex = items.length - 1;

  useEffect(() => {
    // Watches the rail's own rows at every width: the row nearest the
    // middle of the viewport becomes activeIndex.
    const targets = rowRefs.current.filter(Boolean);
    if (!targets.length) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.idx);
          setActiveIndex(Math.max(0, Math.min(idx, lastIndex)));
        }
      });
    }, { rootMargin: '-42% 0px -42% 0px', threshold: 0 });
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  return (
    <section className="section section--sunken" id="how-we-grew">
      <div className="wrap">
        <div className="kicker">HOW THE COMPANY GREW</div>
        <h2 className="about__h" style={{ marginBottom: 'clamp(1.25rem,2.2vw,1.9rem)' }}>
          From a focused start to worldwide supply
        </h2>

        <div className="htl-layout">
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
        </div>
      </div>
    </section>
  );
}
