/* Max-Seal — Home page composition. */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import ApplicationExplorer from '../components/home/ApplicationExplorer';
import ApplicationFit from '../components/home/ApplicationFit';
import { FAMILIES, WHY, PRODUCT_STORIES, INDUSTRY_STORIES, PROOF, CASE_STUDIES } from '../data/data';
import { ArrowRight, ArrowLeft, Play, Pause, Headset, MessageCircle, X, FileText, Download } from '../icons/icons';
import { routes } from '../router/paths';
import heroVideo from '../assets/home/Max-Seal.mp4';


function famShort(id) { const f = FAMILIES.find(x => x.id === id); return f ? f.name : id; }
function prefersReducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function VideoHero() {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  // Lightweight scroll parallax for hero background layers
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = hero.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            const parallaxOffset = Math.min(30, Math.max(0, -rect.top * 0.12));
            hero.style.setProperty('--scroll-parallax', `${parallaxOffset.toFixed(1)}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="vhero" ref={heroRef} aria-label="Max-Seal product film">
      <div className="vhero__media">
        <video
          ref={videoRef}
          className="hero-video"
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
      <div className="vhero__scrim" />

      <div className="vhero__inner">
        <div className="wrap">
          <div className="vhero__content">
            <div className="kicker kicker--ondark vhero__eyebrow">
              ENGINEERED FOR INDUSTRIAL FLOW CONTROL
            </div>

            <h1 className="vhero__title">
              Industrial Butterfly Valves for Demanding Applications
            </h1>

            <p className="vhero__lead">
              Max-Seal manufactures and supplies manual and automated butterfly valve solutions for distributors, OEMs and industrial customers across process, infrastructure and industrial applications.
            </p>
            <div className="vhero__cta">
              <Link className="ms-btn ms-btn--primary ms-btn--lg" to={routes.products()}>Explore Products <ArrowRight size={16} /></Link>
              <Link className="ms-btn ms-btn--on-dark ms-btn--lg" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote</Link>
            </div>
            <Link className="link-arrow link-arrow--ondark vhero__ask" to={routes.enquiry({ intent: 'technical' })}><Headset size={17} /> Ask the Engineers</Link>
          </div>
        </div>
      </div>
      <button className="vhero__pause" aria-label={playing ? 'Pause video' : 'Play video'} onClick={togglePlay}>
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
    </section>
  );
}

/* Teaser overlay actions — shared between product and industry overlays. */
function TeaserActions({ exploreHref, exploreLabel }) {
  return (
    <div className="slay__actions">
      <Link className="ms-btn ms-btn--primary" to={exploreHref}>{exploreLabel} <ArrowRight size={16} /></Link>
      <Link className="ms-btn ms-btn--on-dark" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote</Link>
      <Link className="link-arrow link-arrow--ondark slay__ask" to={routes.enquiry({ intent: 'technical' })}><Headset size={15} /> Ask the Engineers</Link>
    </div>
  );
}

/* PRODUCT — three tiles, center active. Click the center opens a full-tile teaser overlay.
   Prev/Next close any open overlay, then slide one tile; the new tile stays in its teaser state. */
function ProductPreview() {
  const stories = PRODUCT_STORIES;
  const n = stories.length;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const busy = useRef(false);
  const rowRef = useRef(null);
  const centerFaceRef = useRef(null);
  const closeRef = useRef(null);
  const settle = useRef(null);

  useEffect(() => () => clearTimeout(settle.current), []);

  const slide = (dir) => {
    if (!rowRef.current || prefersReducedMotion()) return;
    rowRef.current.animate(
      [{ opacity: 0.4, transform: 'translateX(' + (dir * 3.5) + '%) scale(0.975)' }, { opacity: 1, transform: 'none' }],
      { duration: 540, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
    );
  };

  const goTo = (next, dir) => {
    if (busy.current) return;
    busy.current = true;
    const run = () => {
      setActive(next);
      slide(dir);
      clearTimeout(settle.current);
      settle.current = setTimeout(() => { busy.current = false; }, 560);
    };
    if (open) { setOpen(false); settle.current = setTimeout(run, 300); }
    else { run(); }
  };
  const go = (dir) => goTo((active + dir + n) % n, dir);

  // close on Escape, return focus to the originating face
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const id = requestAnimationFrame(() => { if (closeRef.current) closeRef.current.focus(); });
    return () => { document.removeEventListener('keydown', onKey); cancelAnimationFrame(id); };
  }, [open]);
  const closeOverlay = () => { setOpen(false); if (centerFaceRef.current) centerFaceRef.current.focus(); };

  const onTouch = useRef(null);
  const onTouchStart = (e) => { onTouch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (onTouch.current == null) return;
    const dx = e.changedTouches[0].clientX - onTouch.current; onTouch.current = null;
    if (Math.abs(dx) > 44) go(dx < 0 ? 1 : -1);
  };

  const slots = [(active - 1 + n) % n, active, (active + 1) % n];
  const cur = stories[active];
  const progress = ((active + 1) / n) * 100;

  return (
    <section className="section cine-sec">
      <div className="wrap">
        <div className="shead cine-head reveal">
          <div className="kicker">WHAT WE ENGINEER</div>
          <h2 className="shead__title cine-title">Butterfly valve solutions built around real service conditions</h2>
        </div>
      </div>
      <div className="wrap wrap--wide">
        <div className="pcar reveal">
          <div className="pcar__row" ref={rowRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {slots.map((sIdx, pos) => {
              const s = stories[sIdx];
              const center = pos === 1;
              return (
                <div key={'pos' + pos} className={'ptile' + (center ? ' ptile--center' : ' ptile--side') + (center && open ? ' is-open' : '')}>
                  <div className="ptile__img">
                    <image-slot id={'home-ptile-' + s.id} shape="rect" fit="contain" position="center" src={s.image} placeholder={s.title + ' media'} />
                  </div>
                  <div className="ptile__grad" />
                  <button
                    ref={center ? centerFaceRef : null}
                    className="ptile__face"
                    aria-label={center ? ('Open details for ' + s.title) : ('Go to ' + s.title)}
                    aria-expanded={center ? open : undefined}
                    onClick={() => center ? setOpen(true) : goTo(sIdx, pos === 2 ? 1 : -1)}
                  >
                    <span className="ptile__label">{famShort(s.families[0])}</span>
                    <span className="ptile__title">{s.title}</span>
                    {center && <span className="ptile__explore">Explore <ArrowRight size={15} /></span>}
                  </button>
                  {center && (
                    <div className={'ptile__overlay' + (open ? ' up' : '')} role="dialog" aria-modal="true" aria-label={s.title} aria-hidden={!open}>
                      <button ref={closeRef} className="slay__close" aria-label="Close details" onClick={closeOverlay}><X size={20} /></button>
                      <div className="ptile__overlay-inner">
                        <span className="slay__eyebrow">{famShort(s.families[0])}</span>
                        <div className="slay__title">{s.title}</div>
                        <p className="slay__teaser">{s.teaser}</p>
                        <div className="slay__tags">{s.families.slice(0, 3).map(fid => <span key={fid} className="slay__tag">{famShort(fid)}</span>)}</div>
                        <TeaserActions exploreHref={routes.products({ story: s.id })} exploreLabel="Explore Solutions" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="pcar__nav">
            <div className="pcar__progress" aria-hidden="true"><span style={{ width: progress + '%' }} /></div>
            <div className="pcar__dots" role="presentation">
              {stories.map((s, i) => (
                <button key={s.id} className={'pcar__dot' + (i === active ? ' on' : '')} aria-label={'Show ' + s.title} aria-current={i === active} onClick={() => goTo(i, i > active ? 1 : -1)} />
              ))}
            </div>
            <span className="sr-only" aria-live="polite">{cur.title}, item {active + 1} of {n}</span>
            <div className="pcar__arrows">
              <button className="cine__arrow cine__arrow--light" aria-label="Previous story" onClick={() => go(-1)}><ArrowLeft size={18} /></button>
              <button className="cine__arrow cine__arrow--light" aria-label="Next story" onClick={() => go(1)}><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* INDUSTRY — vertical selector controls a media stage. Overlay is hidden by default and
   covers the full stage on click/tap. Selecting another story closes any open overlay first,
   then crossfades the media; the new overlay never opens automatically. */
function IndustryPreview() {
  const stories = INDUSTRY_STORIES;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const busy = useRef(false);
  const settle = useRef(null);
  const exploreRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => () => clearTimeout(settle.current), []);

  const select = (idx, e) => {
    if (e && e.currentTarget) {
      e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    if (idx === active || busy.current) return;
    busy.current = true;
    const run = () => { setActive(idx); clearTimeout(settle.current); settle.current = setTimeout(() => { busy.current = false; }, 520); };
    if (open) { setOpen(false); settle.current = setTimeout(run, 280); }
    else { run(); }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const id = requestAnimationFrame(() => { if (closeRef.current) closeRef.current.focus(); });
    return () => { document.removeEventListener('keydown', onKey); cancelAnimationFrame(id); };
  }, [open]);
  const closeOverlay = () => { setOpen(false); if (exploreRef.current) exploreRef.current.focus(); };

  const cur = stories[active];

  return (
    <section className="section section--sunken cine-sec">
      <div className="wrap">
        <div className="shead cine-head reveal">
          <div className="kicker">WHERE WE PERFORM</div>
          <h2 className="shead__title cine-title">Flow control support for demanding industrial markets</h2>
          <p className="cine-lead">Different industries bring different media, pressure, temperature, safety and operating requirements. Max-Seal supports valve selection and automation needs across a wide range of industrial environments.</p>
        </div>
      </div>
      <div className="wrap wrap--wide">
        <div className="isplit reveal">
          <div className="isplit__list" role="tablist" aria-label="Operational stories">
            {stories.map((s, idx) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={idx === active}
                className={'isplit__item' + (idx === active ? ' on' : '')}
                onClick={(e) => select(idx, e)}
              >
                <span className="isplit__bar" />
                <span className="isplit__item-body">
                  <span className="isplit__item-name">{s.title}</span>
                  <span className="isplit__item-line">{s.line}</span>
                </span>
                <span className="isplit__item-arrow"><ArrowRight size={18} /></span>
              </button>
            ))}
          </div>

          <div className={'isplit__stage' + (open ? ' is-open' : '')}>
            {stories.map((s, idx) => (
              <div key={s.id} className={'isplit__img' + (idx === active ? ' on' : '')} aria-hidden={idx !== active}>
                <image-slot id={'home-ind-' + s.id} shape="rect" fit="cover" src={s.image} placeholder={s.title + ' application image'} />
              </div>
            ))}
            <div className="isplit__topgrad" />

            {/* default state — title, one-line intro, Explore cue (opens the full overlay) */}
            <button
              ref={exploreRef}
              className="isplit__default"
              aria-label={'Open details for ' + cur.title}
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <span className="isplit__title">{cur.title}</span>
              <span className="isplit__line">{cur.line}</span>
              <span className="isplit__explore">Explore <ArrowRight size={16} /></span>
            </button>

            {/* full-stage teaser overlay */}
            <div className={'isplit__overlay' + (open ? ' up' : '')} role="dialog" aria-modal="true" aria-label={cur.title} aria-hidden={!open}>
              <button ref={closeRef} className="slay__close" aria-label="Close details" onClick={closeOverlay}><X size={20} /></button>
              <div className="isplit__overlay-inner" key={cur.id}>
                <div className="slay__title">{cur.title}</div>
                <p className="slay__teaser">{cur.teaser}</p>
                <div className="slay__rows">
                  <div className="slay__row">
                    <span className="slay__k">Industries</span>
                    <div className="slay__tags">{cur.sectors.slice(0, 4).map(x => <span key={x} className="slay__tag">{x}</span>)}</div>
                  </div>
                  <div className="slay__row">
                    <span className="slay__k">Related products</span>
                    <div className="slay__tags">{cur.families.slice(0, 3).map(fid => <span key={fid} className="slay__tag slay__tag--accent">{famShort(fid)}</span>)}</div>
                  </div>
                </div>
                <TeaserActions exploreHref={routes.industries({ industry: cur.industryId })} exploreLabel="Explore Industries" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyMaxSeal() {
  return (
    <section className="why-chart">
      <div className="wrap">
        <div className="why-chart__grid reveal">
          <div className="why-chart__intro">
            <div className="kicker kicker--ondark">WHY MAX-SEAL</div>
            <h2 className="why-chart__title">Practical valve expertise from selection to supply</h2>
            <p className="why-chart__lead">Max-Seal brings valve experience, product knowledge and practical support together to help customers specify the right solution for each application.</p>
            <div className="why-chart__cta">
              <Link className="ms-btn ms-btn--primary" to={routes.about}>More about Max-Seal <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="why-chart__panel">
            <div className="why-chart__panel-label">Selection-to-supply support</div>
            <div className="why-chart__cells">
              {WHY.map((w, i) => (
                <div key={w.k} className="why-chart__cell">
                  <span className="why-chart__step">{String(i + 1).padStart(2, '0')}</span>
                  <span className="why-chart__label">{w.k}</span>
                  <h3 className="why-chart__cell-title">{w.t}</h3>
                  <p className="why-chart__cell-copy">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Anonymous, representative case-study toggle — deliberately not a copy of
   IndustryPreview's discovery-style selector above (isplit__*): this reads
   as a compact proof/example panel (tabs + one fixed detail card), not
   another way to browse industries. Content is illustrative, not a record
   of a named or completed customer project — see CASE_STUDIES in data.js. */
function CaseStudies() {
  // Default (index 0) is 'data-centers' — must stay in sync with PROOF.image
  // (a data-centers / chilled-water room photo), since the featured image
  // is shared across tabs rather than swapped per case study.
  const [active, setActive] = useState(0);
  const cur = CASE_STUDIES[active];

  return (
    <section className="proofx">
      <div className="wrap">
        <div className="proofx__grid reveal">
          <div className="proofx__intro">
            <div className="kicker">CASE STUDIES</div>
            <h2 className="shead__title proofx__head">Valve support across demanding applications</h2>
            <p className="proofx__lead">Representative application examples showing how valve type, materials, actuation and support come together across different service conditions.</p>
            <p className="proofx__hint">Select a sector to view a representative valve application example.</p>
            <div className="proofx__tabs" role="tablist" aria-label="Case study examples">
              {CASE_STUDIES.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === active}
                  className={'proofx__tab' + (i === active ? ' on' : '')}
                  onClick={() => setActive(i)}
                >
                  {c.sector}
                </button>
              ))}
            </div>
          </div>

          <div className="proofx__card">
            <div className="proofx__media">
              <image-slot id="home-proof-media" shape="rect" fit="cover" position="left center" src={PROOF.image} placeholder="Project, facility or end-user photo" />
              <span className="proofx__badge">Case Study</span>
            </div>
            <div className="proofx__body">
              <span className="proofx__tag">{cur.sector}</span>
              <h3 className="proofx__title">{cur.title}</h3>
              <p className="proofx__context">{cur.context}</p>
              <div className="proofx__details">
                <div className="proofx__detail"><strong>Challenge</strong> {cur.challenge}</div>
                <div className="proofx__detail"><strong>Valve support</strong> {cur.support}</div>
                <div className="proofx__detail"><strong>Outcome</strong> {cur.outcome}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Conversion() {
  return (
    <section className="convert">
      <div className="convert__media"><image-slot id="home-convert-media" shape="rect" fit="cover" placeholder="Product or facility still" /></div>
      <div className="convert__scrim" />
      <div className="wrap convert__inner reveal">
        <div className="kicker kicker--ondark">LET'S TALK</div>
        <h2 className="convert__t">Ready to discuss your valve requirement?</h2>
        <p className="convert__lead">Share your application, service condition or project requirement and the Max-Seal team will help route the next step.</p>
        <Link className="ms-btn ms-btn--primary ms-btn--lg convert__btn" to={routes.enquiry({ intent: 'pricing' })}>Request a Quote <ArrowRight size={16} /></Link>
        <div className="convert__links">
          <Link to={routes.enquiry({ intent: 'technical' })}><Headset size={16} /> Ask the Engineers</Link>
          <Link to={routes.contact}><MessageCircle size={16} /> General Contact</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSiteChrome();
  return (
    <main className="home-page">
      <VideoHero />
      <ProductPreview />
      <IndustryPreview />
      <WhyMaxSeal />
      {/* Case Studies section preserved for future use. Hidden from Home per
          client feedback round — component, its content data (CASE_STUDIES
          in src/data/data.js) and CSS (.proofx* in home.css) are all left
          in place so it can be restored by uncommenting the line below. */}
      {/* <CaseStudies /> */}
      <ApplicationExplorer />
      {/* Application Fit pipeline explorer preserved for future custom SVG
          design. Hidden for now. */}
      {/* <ApplicationFit /> */}
      <Conversion />
    </main>
  );
}
