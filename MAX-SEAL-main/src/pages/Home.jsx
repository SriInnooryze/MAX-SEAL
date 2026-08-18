/* Max-Seal — Home page composition. */
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSiteChrome from '../hooks/useSiteChrome';
import { FAMILIES, WHY, PRODUCT_STORIES, INDUSTRY_STORIES, PROOF, RESOURCE_LIBS } from '../data/data';
import { ArrowRight, ArrowLeft, Play, Pause, Headset, MessageCircle, X, FileText, Eye, Download } from '../icons/icons';
import { routes } from '../router/paths';
import heroVideo from '../assets/home/Max-Seal.mp4';
import catalogPdf from '../assets/home/Resilient Seated Butterfly Valves — Performance Series.pdf';
import catalogCoverImg from '../assets/home/performance-series-catalog-cover.png';
import globalPartnersImg from '../assets/home/home-global-partners-network-support.png';
import homeAboutImg from '../assets/home/Home-About.png';
import homeWhyImg from '../assets/home/Home-Why max-seal.png';


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
          <p className="cine-lead">From standard isolation to demanding process service, Max-Seal helps match valve design, materials, automation and configuration to the requirements of each application.</p>
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
    <section className="why">
      <div className="why__media reveal">
        <img
          src={homeWhyImg}
          alt="Max-Seal engineering review and product detail"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
        />
        <div className="why__tagstrip"><span>SINCE 2008</span><span>U.S. OPERATIONS</span></div>
      </div>
      <div className="why__body reveal">
        <div className="why__inner">
          <div className="kicker">WHY MAX-SEAL</div>
          <h2 className="why__title">Practical valve expertise from selection to supply</h2>
          <p className="why__intro">Max-Seal brings butterfly valve experience, product knowledge and responsive service together to help customers specify the right solution for each application.</p>
          <div className="why__points">
            {WHY.map((w, i) => (
              <div key={w.k} className="why__pt">
                <div className="why__pt-no">{String(i + 1).padStart(2, '0')}</div>
                <div className="why__pt-body">
                  <div className="why__pt-k">{w.k}</div>
                  <h4>{w.t}</h4>
                  <p>{w.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="why__cue">A U.S.-based butterfly valve manufacturer and supplier serving distributors, OEMs and industrial customers.</p>
          <div className="why__cta">
            <Link className="ms-btn ms-btn--primary" to={routes.about}>More about Max-Seal <ArrowRight size={16} /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofStory() {
  return (
    <section className="proofx">
      <div className="wrap">
        <div className="shead reveal">
          <div className="kicker kicker--ondark">APPLICATION FOCUS</div>
          <h2 className="shead__title shead--dark proofx__head">Valve support for critical cooling and process systems</h2>
        </div>
        <div className="proofx__card reveal">
          <div className="proofx__media">
            <image-slot id="home-proof-media" shape="rect" fit="cover" src={PROOF.image} placeholder="Project, facility or end-user photo" />
            <span className="proofx__badge">{PROOF.type}</span>
          </div>
          <div className="proofx__body">
            <div className="proofx__tags">
              <span className="proofx__tag proofx__tag--type">{PROOF.type}</span>
              <span className="proofx__tag">{PROOF.industry}</span>
              <span className="proofx__tag">{PROOF.customer}</span>
            </div>
            <h3 className="proofx__title">{PROOF.title}</h3>
            <p className="proofx__summary">{PROOF.summary}</p>
            <div className="proofx__details">
              {PROOF.details.map((d) => (
                <div key={d.k} className="proofx__detail">
                  <div className="proofx__detail-k">{d.k}</div>
                  <div className="proofx__detail-v">{d.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesPreview() {
  const cat = RESOURCE_LIBS.find(r => r.id === 'catalog');
  return (
    <section className="section section--titanium">
      <div className="wrap">
        <div className="shead shead--row reveal">
          <div>
            <div className="kicker">DOCUMENTS AND RESOURCES</div>
            <h2 className="shead__title">Product information, catalogs and partner resources</h2>
          </div>
          <Link className="ms-btn ms-btn--outline" to={routes.resources}>All resources <ArrowRight size={16} /></Link>
        </div>

        <div className="resx reveal">
          {/* Catalog — technical document treatment */}
          <article className="resx__card resx--catalog">
            <div className="resx__cover">
              <img
                src={catalogCoverImg}
                alt="Resilient Seated Butterfly Valves — Performance Series Catalog Cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
              />
              <span className="resx__filetag">{cat.fileType}</span>
            </div>
            <div className="resx__body">
              <div className="resx__eyebrow">CATALOG</div>
              <h3 className="resx__title">{cat.latest}</h3>
              <dl className="resx__spec">
                <div><dt>Family</dt><dd>{cat.family}</dd></div>
                <div><dt>Pages</dt><dd>{cat.pages}</dd></div>
              </dl>
              <div className="resx__actions">
                <a className="link-arrow" href={catalogPdf} target="_blank" rel="noopener noreferrer"><Eye size={16} /> Preview</a>
                <Link className="link-arrow" to={routes.catalog({ catalog: 'resilient-seated' })}>View Catalog <ArrowRight size={16} /></Link>
              </div>
            </div>
          </article>

          {/* Global Partners — about entry point */}
          <article className="resx__card resx--marketing">
            <div className="resx__visual">
              <img
                src={globalPartnersImg}
                alt="Max-Seal valve packaging and global partner support"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              />
            </div>
            <div className="resx__body">
              <div className="resx__eyebrow">GLOBAL PARTNERS</div>
              <h3 className="resx__title">Partner support in key markets</h3>
              <p className="resx__desc">Max-Seal works through U.S. operations, regional sales offices and partner relationships to support distributors and industrial customers across key markets.</p>
              <dl className="resx__spec">
                <div><dt>U.S. Facilities</dt><dd>2</dd></div>
                <div><dt>Latin America Offices</dt><dd>3</dd></div>
              </dl>
              <div className="resx__actions">
                <Link className="link-arrow" to={routes.about + '#global-partners'}>Explore Global Partners <ArrowRight size={16} /></Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function CompanyStoryPreview() {
  return (
    <section className="section aboutx-sec">
      <div className="wrap">
        <div className="aboutx reveal">
          <div className="aboutx__media">
            <img
              src={homeAboutImg}
              alt="Max-Seal facility and engineering team"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
            />
            <span className="corner-tick tl" />
          </div>
          <div className="aboutx__panel">
            <div className="kicker">ABOUT MAX-SEAL</div>

            <h2 className="aboutx__title">
              A focused butterfly valve company with practical support
            </h2>

            <p className="aboutx__story">
              Established in 2008, Max-Seal manufactures and supplies industrial butterfly valves, automated packages and customized solutions for distributors, OEMs and industrial customers.
            </p>
            <div className="aboutx__facts">
              <div className="aboutx__fact"><div className="aboutx__fact-v">2008</div><div className="aboutx__fact-l">Established</div></div>
              <div className="aboutx__fact"><div className="aboutx__fact-v">U.S.</div><div className="aboutx__fact-l">Operations</div></div>
              <div className="aboutx__fact"><div className="aboutx__fact-v">Worldwide</div><div className="aboutx__fact-l">Partner support</div></div>
            </div>
            <div className="aboutx__cue">Product selection, automation support and application review are available through the Max-Seal team.</div>
            <Link className="ms-btn ms-btn--primary aboutx__cta" to={routes.about}>Read the Full Story <ArrowRight size={16} /></Link>
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
      <ProofStory />
      <ResourcesPreview />
      <CompanyStoryPreview />
      <Conversion />
    </main>
  );
}
