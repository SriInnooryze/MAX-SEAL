/* Eyebrow — the small uppercase section-identifier label used above every
   hero title, section title and panel heading site-wide (e.g. "WHAT WE
   ENGINEER", "PROOF", "DOCUMENTS AND RESOURCES", "ABOUT MAX-SEAL").
   Font, letter-spacing, weight, color and the decorative leading line all
   come from the single `.kicker` rule in system.css — this component just
   gives every call site one consistent, typed way to reach it instead of
   hand-assembling the className, which is what let the hero eyebrow's
   styling quietly drift out of sync with the rest of the site.

   - `onDark`: use on dark/navy backgrounds (hero bands, dark sections).
   - `plain`: suppress the decorative line (progress-step labels only). */
export default function Eyebrow({ children, onDark = false, plain = false, className = '', style }) {
  const cls = ['kicker', onDark && 'kicker--ondark', plain && 'kicker--plain', className].filter(Boolean).join(' ');
  return <div className={cls} style={style}>{children}</div>;
}
