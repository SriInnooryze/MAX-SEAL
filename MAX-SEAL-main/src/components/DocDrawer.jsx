import { Link } from 'react-router-dom';
import Slot from './Slot';
import { Download, X, ArrowRight, Eye } from '../icons/icons';
import { routes } from '../router/paths';

/* Shared document preview drawer (Catalog + Marketing). */
export default function DocDrawer({ doc, onClose, usage, kind }) {
  const labels = {
    catalog: { preview: 'Catalog preview', download: 'Download PDF' },
    marketing: { preview: 'Resource preview', download: 'Download resource' },
  };
  const lab = labels[kind] || { preview: 'Document preview', download: 'Download PDF' };
  return (
    <>
      <div className={'drawer-scrim' + (doc ? ' open' : '')} onClick={onClose} />
      <aside className={'drawer' + (doc ? ' open' : '')} aria-hidden={!doc} role="dialog" aria-label="Document preview">
        {doc && (
          <>
            <div className="drawer__head"><span className="lbl">{lab.preview}</span><button className="drawer__close" aria-label="Close" onClick={onClose}><X size={18} /></button></div>
            <div className="drawer__body">
              <div className="drawer__preview"><Slot id={'docprev-' + doc.id} placeholder="Document preview page" /></div>
              <h3 className="drawer__t">{doc.title}</h3>
              <table className="drawer__meta"><tbody>
                <tr><th>Related {doc.industry ? 'industry' : 'product'}</th><td>{doc.industry || doc.fam}</td></tr>
                <tr><th>Document type</th><td>{doc.type}</td></tr>
                <tr><th>Updated</th><td>{doc.date}</td></tr>
                <tr><th>Version</th><td className="pl-mono">{doc.version || '2025.1'}</td></tr>
                <tr><th>File type</th><td>PDF</td></tr>
                <tr><th>File size</th><td>{doc.size}</td></tr>
                {doc.pages && <tr><th>Pages</th><td>{doc.pages}</td></tr>}
              </tbody></table>
              <p className="drawer__fallback"><span className="pdot" /> Inline preview is a sample image. Open the full preview for all pages, or download the PDF.</p>
              {usage && <p className="drawer__usage"><span className="pdot" /> Approved for distributor and sales use. Usage notes connect through the CMS.</p>}
            </div>
            <div className="drawer__foot">
              <a className="ms-btn ms-btn--primary ms-btn--block" href={doc.pdfAsset || '#'} download={doc.pdfAsset ? true : undefined} target={doc.pdfAsset ? '_blank' : undefined} rel={doc.pdfAsset ? 'noopener noreferrer' : undefined}><Download size={16} /> {lab.download}</a>
              <Link className="ms-btn ms-btn--outline ms-btn--block" to={routes.documentPreview(doc.id)}><Eye size={15} /> Open full preview</Link>
              <Link className="ms-btn ms-btn--outline ms-btn--block" to={routes.documentPreview(doc.id)} target="_blank" rel="noopener">Open in new window <ArrowRight size={15} /></Link>
              <Link className="ms-btn ms-btn--ghost ms-btn--block" to={routes.enquiry({ intent: 'general' })}>Request help finding a document</Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
