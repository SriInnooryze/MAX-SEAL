/* Textarea — labelled multiline field for messages. */
export default function Textarea({ label, id, required = false, error, help, className = '', rows = 4, ...rest }) {
  const fieldId = id || (label ? label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : undefined);
  const msg = error || help;
  return (
    <div className={['ms-field', error ? 'ms-field--error' : '', className].filter(Boolean).join(' ')}>
      {label && (
        <label className="ms-label" htmlFor={fieldId}>
          {label}{required && <span className="ms-req" aria-hidden="true">*</span>}
        </label>
      )}
      <textarea id={fieldId} className="ms-textarea" rows={rows} required={required} aria-invalid={!!error} {...rest} />
      {msg && <span className="ms-help">{msg}</span>}
    </div>
  );
}
