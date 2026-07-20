/* Badge — compact status / certification label. */
export default function Badge({ variant = 'default', dot = false, className = '', children, ...rest }) {
  return (
    <span className={['ms-badge', variant !== 'default' ? `ms-badge--${variant}` : '', className].filter(Boolean).join(' ')} {...rest}>
      {dot && <span className="ms-dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
