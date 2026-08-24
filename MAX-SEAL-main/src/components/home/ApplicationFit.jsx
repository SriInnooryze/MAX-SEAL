/* Application Fit — "where do Max-Seal butterfly valves apply" pipeline
   explorer, rendered directly below the Application Explorer (component
   breakdown) section. One cohesive inline SVG industrial pipeline
   diagram — a continuous pipe, flow-direction arrows, and 5 distinct
   station markers (3 of them simplified butterfly-valve symbols: circle
   body, flange bolt hints, diagonal disc line — an original geometric
   style, not a trace or copy of Aalberts, Jones Bearings or any third-
   party icon set; no external SVG is loaded). Real <button> elements are
   layered over the diagram at each station's exact coordinates for
   accessible interaction — the diagram itself is decorative/aria-hidden. */
import { useState } from 'react';
import { APPLICATION_FIT } from '../../data/data';

const cx = (...parts) => parts.filter(Boolean).join(' ');

/* x positions land on clean 10/30/50/70/90% marks (viewBox is 0-1000, so
   x === the %) — station buttons overlaid via CSS use the same numbers,
   so the buttons always line up with the diagram regardless of the
   rendered width. */
const STATIONS = [
  { id: 'cooling-water', x: 100, kind: 'valve' },
  { id: 'water-infrastructure', x: 300, kind: 'module' },
  { id: 'process-lines', x: 500, kind: 'valve-main' },
  { id: 'marine-systems', x: 700, kind: 'branch' },
  { id: 'automation-packages', x: 900, kind: 'valve-actuator' },
];
const FLOW_ARROWS = [200, 400, 600, 800];
const PIPE_Y = 95, PIPE_H = 30, PIPE_CY = PIPE_Y + PIPE_H / 2;

function ValveGlyph({ x, r, on, bolts = 4 }) {
  const pts = Array.from({ length: bolts }, (_, i) => {
    const a = (i / bolts) * Math.PI * 2 + Math.PI / bolts;
    return [x + Math.cos(a) * (r + 5), PIPE_CY + Math.sin(a) * (r + 5)];
  });
  return (
    <g className={cx('pf__glyph', on && 'on')}>
      {pts.map(([bx, by], i) => <circle key={i} cx={bx} cy={by} r={2.2} className="pf__bolt" />)}
      <circle cx={x} cy={PIPE_CY} r={r} className="pf__valve-body" />
      <line x1={x - r * 0.55} y1={PIPE_CY - r * 0.55} x2={x + r * 0.55} y2={PIPE_CY + r * 0.55} className="pf__valve-disc" />
    </g>
  );
}

function StationMark({ station, on }) {
  const { x, kind } = station;
  if (kind === 'valve') return <ValveGlyph x={x} r={16} on={on} bolts={4} />;
  if (kind === 'valve-main') return <ValveGlyph x={x} r={23} on={on} bolts={8} />;
  if (kind === 'valve-actuator') {
    return (
      <g className={cx('pf__glyph', on && 'on')}>
        <ValveGlyph x={x} r={16} on={on} bolts={4} />
        <line x1={x} y1={PIPE_Y - 4} x2={x} y2={PIPE_Y - 24} className="pf__stem" />
        <rect x={x - 17} y={PIPE_Y - 44} width="34" height="20" rx="3" className="pf__actuator" />
      </g>
    );
  }
  if (kind === 'module') {
    return (
      <g className={cx('pf__glyph', on && 'on')}>
        <line x1={x} y1={PIPE_Y} x2={x} y2={PIPE_Y - 22} className="pf__stem" />
        <rect x={x - 14} y={PIPE_Y - 44} width="28" height="24" rx="3" className="pf__module" />
        <line x1={x - 7} y1={PIPE_Y - 36} x2={x + 7} y2={PIPE_Y - 36} className="pf__module-tick" />
        <line x1={x - 7} y1={PIPE_Y - 29} x2={x + 7} y2={PIPE_Y - 29} className="pf__module-tick" />
      </g>
    );
  }
  /* branch — a short stub pipe off the main run ending in a diamond
     corrosion/marine-rated material marker, not a valve shape */
  return (
    <g className={cx('pf__glyph', on && 'on')}>
      <line x1={x} y1={PIPE_Y + PIPE_H} x2={x} y2={PIPE_Y + PIPE_H + 24} className="pf__stem" />
      <rect x={x - 9} y={PIPE_Y + PIPE_H + 18} width="18" height="18" className="pf__marker" transform={`rotate(45 ${x} ${PIPE_Y + PIPE_H + 27})`} />
      <circle cx={x} cy={PIPE_Y + PIPE_H + 27} r="2.4" className="pf__marker-dot" />
    </g>
  );
}

export default function ApplicationFit() {
  const [active, setActive] = useState('cooling-water');
  const activeIdx = STATIONS.findIndex((s) => s.id === active);
  const cur = APPLICATION_FIT.find((i) => i.id === active) || APPLICATION_FIT[0];

  return (
    <section className="fit">
      <div className="wrap">
        <div className="fit__head reveal">
          <div className="kicker">APPLICATION FIT</div>
          <h2 className="shead__title fit__title-main">Where Max-Seal butterfly valves support flow control</h2>
          <p className="fit__lead">Select an application area to see how butterfly valves can support isolation, control and service needs across industrial systems.</p>
        </div>

        <div className="fit__diagram reveal">
          <svg viewBox="0 0 1000 190" className="fit__svg" role="img" aria-label="Max-Seal butterfly valve pipeline across cooling water, water infrastructure, process lines, marine systems and automation package applications">
            <rect x="0" y={PIPE_Y} width="1000" height={PIPE_H} rx="6" className="pf__pipe-body" />
            <rect x="0" y={PIPE_Y} width="1000" height="8" rx="4" className="pf__pipe-sheen" />
            {STATIONS.map((s) => (
              <rect
                key={s.id}
                x={s.x - 70} y={PIPE_Y - 4} width="140" height={PIPE_H + 8} rx="6"
                className={cx('pf__segment', active === s.id && 'on')}
              />
            ))}
            {FLOW_ARROWS.map((x) => (
              <path key={x} d={`M ${x - 5} ${PIPE_CY - 6} l 8 6 l -8 6`} className="pf__flow-arrow" />
            ))}
            {STATIONS.map((s) => <StationMark key={s.id} station={s} on={active === s.id} />)}
          </svg>

          <div className="fit__stations" role="tablist" aria-label="Application areas">
            {STATIONS.map((s, i) => {
              const item = APPLICATION_FIT.find((a) => a.id === s.id);
              return (
                <button
                  key={s.id}
                  role="tab"
                  aria-selected={active === s.id}
                  className={cx('fit__station', active === s.id && 'on')}
                  style={{ left: s.x / 10 + '%' }}
                  onClick={() => setActive(s.id)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <span className="fit__pointer" style={{ left: STATIONS[activeIdx].x / 10 + '%' }} aria-hidden="true" />
        </div>

        <div className="fit__card" key={cur.id}>
          <span className="fit__ctag">{cur.label}</span>
          <h3 className="fit__ctitle">{cur.title}</h3>
          <p className="fit__cbody">{cur.body}</p>
          <div className="fit__cases">
            {cur.cases.map((c) => <span key={c} className="fit__case">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
