/* Select — labelled native dropdown with a chevron affordance (styled via
   the .ms-select CSS background-image). Pass options as [{value, label}]
   or use children <option>s. */
export default function Select({ label, id, required = false, error, help, options, placeholder, className = '', children, ...rest }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const msg = error || help;
  return (
    <div className={['ms-field', error ? 'ms-field--error' : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="ms-label" htmlFor={fieldId}>
          {label}{required && <span className="ms-req" aria-hidden="true">*</span>}
        </label>
      )}
      <select id={fieldId} className="ms-select" required={required} defaultValue="" aria-invalid={!!error} {...rest}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options ? options.map(o => <option key={o.value} value={o.value}>{o.label}</option>) : children}
      </select>
      {msg && <span className="ms-help">{msg}</span>}
    </div>
  );
}
