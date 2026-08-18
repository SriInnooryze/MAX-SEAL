function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* Checkbox / Radio — single toggle control with a label.
   Set `type="radio"` for a radio variant. */
export default function Checkbox({ label, type = 'checkbox', className = '', ...rest }) {
  const isRadio = type === 'radio';
  return (
    <label className={['ms-check', isRadio ? 'ms-check--radio' : '', className].filter(Boolean).join(' ')}>
      <input type={type} {...rest} />
      <span className="ms-box">{!isRadio && <Check />}</span>
      {label && <span>{label}</span>}
    </label>
  );
}
