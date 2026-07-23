import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Slot from './Slot';

export default function PageHero({ kicker, title, lead, crumbs, mediaId, mediaSrc, mediaPosition, mediaPlaceholder, children }) {
  return (
    <section className="page-hero">
      {mediaId && <div className="page-hero__media"><Slot id={mediaId} src={mediaSrc} position={mediaPosition || 'center top'} placeholder={mediaPlaceholder || 'Page visual'} /></div>}
      <div className="page-hero__scrim" />
      <div className="wrap">
        <div className="page-hero__inner">
          {crumbs && (
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              {crumbs.map((c, i) => (
                <Fragment key={i}>
                  {i > 0 && <span className="sep">/</span>}
                  {c.href ? <Link to={c.href}>{c.label}</Link> : <span className="cur">{c.label}</span>}
                </Fragment>
              ))}
            </nav>
          )}
          {kicker && <div className="kicker kicker--ondark" style={{ marginTop: crumbs ? '1.1rem' : 0 }}>{kicker}</div>}
          <h1 className="page-hero__title">{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
