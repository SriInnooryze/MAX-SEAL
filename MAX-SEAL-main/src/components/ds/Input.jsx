/* Input — labelled text field with optional help / error text. */
export default function Input({ label, id, required = false, error, help, className = '', ...rest }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const msg = error || help;
  return (
    <div className={['ms-field', error ? 'ms-field--error' : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="ms-label" htmlFor={fieldId}>
          {label}{required && <span className="ms-req" aria-hidden="true">*</span>}
        </label>
      )}
      <input id={fieldId} className="ms-input" required={required} aria-invalid={!!error} {...rest} />
      {msg && <span className="ms-help">{msg}</span>}
    </div>
  );
}
