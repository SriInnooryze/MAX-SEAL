import Slot from '../Slot';

/* <image-slot> hardcodes alt="" internally (it's a placeholder-fill widget,
   not an accessible <img>) — correct for an empty placeholder, wrong for a
   real photo. So a milestone with a real asset renders a plain <img> with
   real alt text; a milestone still awaiting a photo renders the site's
   existing placeholder slot — always visible, never blank. */
export function TimelineMedia({ item, id, className }) {
  if (item.image) {
    return <img className={className} src={item.image} alt={item.imageAlt || ''} loading="lazy" />;
  }
  return <Slot id={id} shape="rect" fit="cover" placeholder={item.mediaPh || (item.title + ' photo')} className={className} />;
}

/* One milestone row — the left timeline rail. Period/title/description are
   always in normal document flow and always visible, regardless of
   `current`/`passed`. Those two props only add `.is-current` / `.is-passed`
   to the connector (dot/rail), for a mild colour highlight — see pages.css.
   That class is deliberately kept OFF the <li> itself: the site's shared
   .reveal mechanism (useSiteChrome) adds its one-way `.in` class straight
   to the DOM via classList.add(), outside React's knowledge, then stops
   observing that element. If the <li>'s own className changed on every
   scroll tick (as current/passed update), React would overwrite that DOM
   node's className on each re-render and silently wipe the externally-set
   `.in` — with the observer already detached, it would never come back.
   Keeping the <li>'s className a constant string means React never
   touches that attribute again after mount, so `.in` is untouchable.
   The row's own image (.htl__media) stays in the DOM at every breakpoint.
   On desktop, CSS alone hides it once the sticky stage takes over. Below
   900px, CSS visually moves the whole rail off-screen (accessible-only)
   once the mobile sticky stage activates — see `.htl-enhanced .htl` in
   pages.css — but `.htl__content`/`.htl__media` themselves stay plain,
   always-fully-visible elements with no JS-driven state of their own,
   so the rail is a correct, complete fallback with zero JS dependency. */
export default function TimelineItem({ item, index, current, passed, rowRef }) {
  const { period, label, title, description, imageSlotId } = item;
  const slotId = imageSlotId || `about-tl-${index}`;

  return (
    <li className="htl__row reveal" ref={rowRef} data-idx={index}>
      <div className={'htl__connector' + (current ? ' is-current' : '') + (passed ? ' is-passed' : '')}>
        <span className="htl__dot" />
        <span className="htl__line" />
      </div>
      <div className="htl__content">
        <span className="htl__period">{period || label}</span>
        <h3 className="htl__title">{title}</h3>
        <p className="htl__text">{description}</p>
      </div>
      <div className="htl__media">
        <TimelineMedia item={item} id={slotId} className="htl__media-fill" />
      </div>
    </li>
  );
}

/* One stacked card in a sticky stage — reused for both the desktop
   right-side stage and the mobile/tablet stage (HistoryTimeline.jsx renders
   it twice, once per stage). All six cards are always rendered in each
   stage — `state` only ever switches which is-* class is present, driving
   opacity/transform/z-index in pages.css. Nothing here is ever
   conditionally rendered, `display: none`d, or removed from the DOM, so
   there is no path to a blank stage or a vanished card in either scroll
   direction. Purely decorative (the rail already carries the same content
   accessibly), so both stages mark their parent aria-hidden. */
export function TimelineCard({ item, index, state }) {
  const { period, label, title, description, imageSlotId } = item;
  const slotId = 'stage-' + (imageSlotId || `about-tl-${index}`);

  return (
    <div className={'htl-card' + (state ? ' ' + state : '')}>
      <div className="htl-card__media">
        <TimelineMedia item={item} id={slotId} className="htl-card__media-fill" />
      </div>
      <div className="htl-card__body">
        <span className="htl-card__period">{period || label}</span>
        <h3 className="htl-card__title">{title}</h3>
        <p className="htl-card__text">{description}</p>
      </div>
    </div>
  );
}
