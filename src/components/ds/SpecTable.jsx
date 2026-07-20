/* SpecTable — two-column technical specification table.
   `rows` is an array of [label, value] pairs; `caption` is optional. */
export default function SpecTable({ caption, rows = [], className = '', ...rest }) {
  return (
    <table className={['ms-spec', className].filter(Boolean).join(' ')} {...rest}>
      {caption && <caption>{caption}</caption>}
      <tbody>
        {rows.map(([k, v], i) => (
          <tr key={i}><th scope="row">{k}</th><td>{v}</td></tr>
        ))}
      </tbody>
    </table>
  );
}
