import { useState, useRef } from 'react';
import useCenterActiveInScroller from '../../hooks/useCenterActiveInScroller';

/* Tabs — underline tab strip with switchable panels.
   `items` is [{ id, label, content }]. Controlled via `value`/`onChange`
   if provided, otherwise self-manages state. */
export default function Tabs({ items = [], value, onChange, defaultValue, className = '' }) {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const active = value ?? internal;
  const navRef = useRef(null);
  // On Product Detail (.pdet__tabs .ms-tabs scrolls horizontally on mobile —
  // see pages.css) a tab selected near the edge could stay clipped instead
  // of scrolling into view, same as the Industries/Solutions/Marketing rows.
  useCenterActiveInScroller(navRef, '.ms-tab[aria-selected="true"]', active);
  const select = (id) => {
    if (onChange) onChange(id);
    if (value === undefined) setInternal(id);
  };
  const current = items.find(t => t.id === active);
  return (
    <div className={className}>
      <div className="ms-tabs" role="tablist" ref={navRef}>
        {items.map(t => (
          <button key={t.id} role="tab" className="ms-tab" aria-selected={t.id === active} onClick={() => select(t.id)}>{t.label}</button>
        ))}
      </div>
      {current?.content !== undefined && (
        <div role="tabpanel" style={{ paddingTop: 'var(--space-5)' }}>{current.content}</div>
      )}
    </div>
  );
}
