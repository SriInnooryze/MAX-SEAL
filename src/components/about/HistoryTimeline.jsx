import TimelineItem from './TimelineItem';
import { ABOUT_TIMELINE } from '../../data/aboutData';

export default function HistoryTimeline() {
  return (
    <section className="section section--sunken" id="history">
      <div className="wrap">
        <div className="kicker">How the company grew</div>
        <h2 className="about__h" style={{ marginBottom: 'clamp(2rem,3.5vw,3rem)' }}>
          From a focused start to worldwide supply
        </h2>
        <ol className="tl">
          {ABOUT_TIMELINE.map((item, index) => (
            <TimelineItem key={item.id || index} item={item} index={index} />
          ))}
        </ol>
      </div>
    </section>
  );
}
