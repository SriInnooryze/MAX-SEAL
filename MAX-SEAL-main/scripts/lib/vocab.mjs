/*
 * Closed-vocabulary values shared by the migration and generator scripts.
 * Mirrors the FACETS constant and other closed sets in src/data/data.js —
 * FACETS itself stays hard-coded in the app (it's UI taxonomy, not catalog
 * content), but family tag values written in Excel are validated against it
 * here so a typo in a Types/Apps/Service/Automation cell is caught at
 * generation time instead of silently breaking the Products page filters.
 */

export const FACETS_VALUES = {
  types: ['resilient', 'high-performance', 'triple-offset', 'lined', 'alloy', 'automated', 'custom'],
  apps: ['isolation', 'control', 'shutoff', 'corrosive', 'severe'],
  service: ['low-pressure', 'high-pressure', 'high-temp', 'corrosive', 'severe', 'cycling', 'clean'],
  automation: ['manual', 'actuated'],
};

export const DOC_TYPE_VALUES = ['Catalog', 'Datasheet', 'Brochure', 'Selection Guide', 'Technical Bulletin', 'Installation Document', 'Maintenance Document', 'Application Guide'];
export const PRICE_ACCESS_VALUES = ['request', 'download'];
export const PRODUCT_STATUS_VALUES = ['active', 'inactive', 'archived'];
export const CATEGORY_STATUS_VALUES = ['active', 'inactive'];
export const PRODUCT_SECTION_TYPES = ['overview', 'specifications', 'applications', 'materials', 'documents'];
export const PRODUCT_MEDIA_TYPES = ['image', 'pdf', 'video', '3d', 'cad', 'drawing'];
