/*
 * One-time migration: src/data/data.js (+ its real asset files) -> catalog/MAXSEAL_CATALOG.xlsx
 *
 * This is a snapshot transcription of data.js as it exists today (pre Excel-migration).
 * It is meant to run exactly once, before src/data/data.js is refactored to read from
 * generated JSON (Phase 2). Re-running it after Phase 2 would just re-snapshot whatever
 * this script's own literals say, not the live app, since data.js will no longer hold
 * literal catalog content by then.
 *
 * Run: npm run catalog:migrate
 */

import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DOC_TYPE_VALUES, PRICE_ACCESS_VALUES } from './lib/vocab.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SRC_PRODUCTS = path.join(ROOT, 'src/assets/products');
const SRC_INDUSTRIES = path.join(ROOT, 'src/assets/industries');
const SRC_HOME = path.join(ROOT, 'src/assets/home');

const DEST_PRODUCTS = path.join(ROOT, 'public/assets/maxseal/products');
const DEST_INDUSTRIES = path.join(ROOT, 'public/assets/maxseal/industries');
const DEST_DOCS = path.join(ROOT, 'public/assets/maxseal/docs');

const CATALOG_DIR = path.join(ROOT, 'catalog');
const WORKBOOK_PATH = path.join(CATALOG_DIR, 'MAXSEAL_CATALOG.xlsx');

// ---------------------------------------------------------------------------
// Real content transcribed verbatim from src/data/data.js (as of migration).
// Image fields hold the *source* filename only; asset copying + path
// rewriting happens below.
// ---------------------------------------------------------------------------

const FAMILIES_SRC = [
  { id: 'resilient', code: 'RS', name: 'Resilient Seated', menuName: 'Resilient Seated Butterfly Valves', menuDesc: 'General service isolation and control', short: 'Bubble-tight bidirectional shutoff for general industrial and utility service.', image: 'resilient-seated.png', need: 'Repeatable bubble-tight isolation for everyday duties.', where: 'Common in water, HVAC and building services.', application: 'Water, HVAC, building services', sizes: 'DN50–DN600', rating: 'PN10–PN16', categories: ['butterfly'], types: ['resilient'], apps: ['isolation', 'shutoff'], industries: ['data-centers', 'hvac', 'pulp-paper', 'transportation', 'food-beverage'], service: ['low-pressure', 'clean'], automation: ['manual'] },
  { id: 'high-performance', code: 'HP', name: 'High Performance', menuName: 'High Performance Butterfly Valves', menuDesc: 'Built for more demanding operating conditions', short: 'Double-offset design for higher pressure and temperature duties.', image: 'high-performance.png', need: 'Isolation and control across higher pressure and temperature.', where: 'Considered in process, refining and power.', application: 'Process, refining, power', sizes: 'DN50–DN900', rating: '150–300#', categories: ['butterfly'], types: ['high-performance'], apps: ['isolation', 'control'], industries: ['oil-gas', 'refining', 'power', 'hvac', 'pulp-paper'], service: ['high-pressure', 'high-temp'], automation: ['manual', 'actuated'] },
  { id: 'triple-offset', code: 'TO', name: 'Triple Offset', menuName: 'Triple Offset Butterfly Valves', menuDesc: 'For severe service and critical shutoff needs', short: 'Metal-seated, torque-seated shutoff for severe and critical service.', image: 'triple-offset.png', need: 'Tight, repeatable shutoff for severe and critical service.', where: 'Used in demanding isolation duties.', application: 'Severe service, isolation', sizes: 'DN80–DN1200', rating: '150–300#', categories: ['butterfly'], types: ['triple-offset'], apps: ['isolation', 'shutoff', 'severe'], industries: ['oil-gas', 'refining', 'petrochemical', 'power'], service: ['high-pressure', 'high-temp', 'severe'], automation: ['manual', 'actuated'] },
  { id: 'pfa-lined', code: 'PL', name: 'PFA Lined', menuName: 'PFA Lined Butterfly Valves', menuDesc: 'For corrosive media and chemical applications', short: 'Fully lined wetted parts for aggressive and corrosive media.', image: 'pfa-lined.png', need: 'Protection of wetted parts in corrosive media.', where: 'Considered in chemical and process service.', application: 'Chemical, corrosive media', sizes: 'DN50–DN600', rating: 'PN10–PN16', categories: ['butterfly'], types: ['lined'], apps: ['isolation', 'corrosive'], industries: ['petrochemical', 'chemical', 'pharma', 'food-beverage'], service: ['corrosive', 'clean'], automation: ['manual', 'actuated'] },
  { id: 'special-alloy', code: 'SA', name: 'Special Alloy', menuName: 'Special Alloy Butterfly Valves', menuDesc: 'For marine, chemical and specialized environments', short: 'Exotic alloy bodies and trims for demanding chemistries.', image: 'special-alloy.png', need: 'Material compatibility for aggressive chemistries.', where: 'Used in marine, chemical and exotic media.', application: 'Marine, chemical, exotic media', sizes: 'DN50–DN900', rating: '150–300#', categories: ['butterfly'], types: ['alloy'], apps: ['isolation', 'corrosive', 'severe'], industries: ['marine', 'chemical', 'petrochemical', 'pharma'], service: ['corrosive', 'severe'], automation: ['manual', 'actuated'] },
  { id: 'automated', code: 'AP', name: 'Automated Packages', menuName: 'Automated Packages', menuDesc: 'Valve and actuator packages for controlled operation', short: 'Valves assembled with actuators, controls and accessories.', image: 'automated.png', need: 'Valves prepared for control and automated operation.', where: 'Considered where systems are automated.', application: 'Process automation', sizes: 'DN50–DN1200', rating: 'Per base valve', categories: ['package'], types: ['automated'], apps: ['control', 'isolation'], industries: ['data-centers', 'oil-gas', 'power', 'hvac', 'pulp-paper'], service: ['cycling', 'high-pressure'], automation: ['actuated'] },
  { id: 'customized', code: 'CS', name: 'Customized Solutions', menuName: 'Customized Solutions', menuDesc: 'Application-specific configurations and support', short: 'Engineered-to-order valves built around your application.', image: 'customized.png', need: 'Engineered-to-order configurations for specific needs.', where: 'Used where standard options do not fit.', application: 'Project specific', sizes: 'Project specific', rating: 'Project specific', categories: ['package', 'butterfly'], types: ['custom'], apps: ['isolation', 'control', 'corrosive', 'severe'], industries: ['chemical', 'mining', 'marine', 'pharma', 'food-beverage'], service: ['cycling', 'severe', 'corrosive', 'clean'], automation: ['manual', 'actuated'] },
];

const INDUSTRIES_SRC = [
  { id: 'data-centers', name: 'Data Centers', image: 'data-centers.png', ctx: 'Cooling loops and water distribution where reliable isolation keeps critical infrastructure running.' },
  { id: 'oil-gas', name: 'Oil and Gas', image: 'oil-gas.png', ctx: 'Upstream and midstream service that calls for robust shutoff across a wide pressure and temperature range.' },
  { id: 'refining', name: 'Refining', image: 'refining.png', ctx: 'Process isolation and control where metal-seated performance supports severe operating conditions.' },
  { id: 'petrochemical', name: 'Petrochemical', image: 'petrochemical.png', ctx: 'Demanding media and cycling duties with sealing options matched to the process.' },
  { id: 'chemical', name: 'Chemical Processing', image: 'chemical.png', ctx: 'Corrosive and aggressive media where lined and alloy constructions protect wetted parts.' },
  { id: 'power', name: 'Power', image: 'power.png', ctx: 'Cooling water, balance of plant and process duties across conventional and renewable generation.' },
  { id: 'pulp-paper', name: 'Pulp and Paper', image: 'pulp-paper.png', ctx: 'Stock, water and chemical lines that benefit from durable seating and dependable cycling.' },
  { id: 'mining', name: 'Mining', image: 'mining.png', ctx: 'Slurry, water and process duties that demand rugged construction and serviceable designs.' },
  { id: 'marine', name: 'Marine', image: 'marine.png', ctx: 'Seawater and onboard systems where corrosion resistance and compact design matter.' },
  { id: 'hvac', name: 'HVAC', image: 'hvac.png', ctx: 'Chilled and condenser water systems that rely on tight shutoff and smooth control.' },
  { id: 'food-beverage', name: 'Food and Beverage', image: 'food-beverage.png', ctx: 'Clean and utility service where material selection supports process hygiene.' },
  { id: 'pharma', name: 'Pharmaceuticals', image: 'pharma.png', ctx: 'Process and utility lines that call for careful material choices and consistent performance.' },
  { id: 'transportation', name: 'Transportation', image: 'transportation.png', ctx: 'Fluid handling for terminals and transfer systems with practical maintenance in mind.' },
];

const DOCS_SRC = [
  { id: 'd1', slug: 'resilient-seated', type: 'Catalog', title: 'Resilient Seated Series Catalog', fam: 'Resilient Seated', date: 'May 2025', size: '0.7 MB', pages: 4, hasPdf: true },
  { id: 'd2', slug: 'triple-offset', type: 'Datasheet', title: 'Triple Offset Technical Datasheet', fam: 'Triple Offset', date: 'Apr 2025', size: '1.8 MB', pages: 6, hasPdf: false },
  { id: 'd3', slug: 'high-performance', type: 'Catalog', title: 'High Performance Series Catalog', fam: 'High Performance', date: 'Mar 2025', size: '3.6 MB', pages: 22, hasPdf: false },
  { id: 'd4', slug: 'pfa-lined', type: 'Brochure', title: 'PFA Lined Valves Overview', fam: 'PFA Lined', date: 'Feb 2025', size: '2.1 MB', pages: 12, hasPdf: false },
  { id: 'd5', slug: 'automated-packages', type: 'Selection Guide', title: 'Automated Packages Selection Guide', fam: 'Automated Packages', date: 'Jan 2025', size: '2.7 MB', pages: 16, hasPdf: false },
  { id: 'd6', slug: 'special-alloy', type: 'Datasheet', title: 'Special Alloy Materials Reference', fam: 'Special Alloy', date: 'Dec 2024', size: '1.4 MB', pages: 8, hasPdf: false },
  { id: 'd7', slug: 'seat-selection', type: 'Technical Bulletin', title: 'Seat Selection Bulletin (sample)', fam: 'Resilient Seated', date: 'May 2025', size: '0.6 MB', pages: 3, hasPdf: false },
  { id: 'd8', slug: 'installation', type: 'Installation Document', title: 'Installation and Handling (sample)', fam: 'All families', date: 'Apr 2025', size: '1.1 MB', pages: 10, hasPdf: false },
  { id: 'd9', slug: 'maintenance', type: 'Maintenance Document', title: 'Maintenance and Service (sample)', fam: 'All families', date: 'Mar 2025', size: '1.0 MB', pages: 9, hasPdf: false },
  { id: 'd10', slug: 'chemical-processing', type: 'Application Guide', title: 'Chemical Processing Application Guide (sample)', fam: 'PFA Lined', date: 'Feb 2025', size: '1.9 MB', pages: 14, hasPdf: false },
];

const PRICE_LISTS_SRC = [
  { id: 'pl1', title: 'Distributor Price List', fam: 'All families', effective: 'Jan 2025', version: '2025.1', updated: 'Jan 2025', access: 'request', size: '1.1 MB' },
  { id: 'pl2', title: 'Resilient Seated Price List', fam: 'Resilient Seated', effective: 'Jan 2025', version: '2025.1', updated: 'Jan 2025', access: 'request', size: '0.7 MB' },
  { id: 'pl3', title: 'Published List Pricing Summary', fam: 'All families', effective: 'Jan 2025', version: '2025.1', updated: 'Feb 2025', access: 'download', size: '0.5 MB' },
];

const RESOURCE_LIBS_SRC = [
  { id: 'catalog', label: 'Catalog', desc: 'Product catalogs and technical datasheets by family.', latest: 'Resilient Seated Butterfly Valves — Performance Series', family: 'Performance Series', fileType: 'PDF', pages: '4 pages', catalogDocSlug: 'resilient-seated', resType: '', related: '', date: '', effective: '', version: '', access: '' },
  { id: 'marketing', label: 'Marketing Resources', desc: 'Brochures, presentations and approved brand assets.', latest: 'Company Overview Brochure', family: '', fileType: '', pages: '', catalogDocSlug: '', resType: 'Brochure', related: 'Company overview', date: 'Apr 2025', effective: '', version: '', access: '' },
  { id: 'pricelists', label: 'Price Lists', desc: 'Current price lists for distributors and partners.', latest: 'Distributor Price List', family: '', fileType: '', pages: '', catalogDocSlug: '', resType: '', related: '', date: '', effective: 'Effective Jan 2025', version: 'Version 2025.1', access: 'Distributor access' },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const nameToId = (name, list) => {
  const hit = list.find((x) => x.name === name);
  return hit ? hit.id : null;
};

const report = { copied: [], skipped: [], needsReview: [], manifest: [] };
let assetSeq = 0;

function copyAsset(srcPath, destPath, usedByType, usedById) {
  const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');
  if (!fs.existsSync(srcPath)) {
    report.needsReview.push(`Missing source file: ${rel(srcPath)} (referenced by ${usedByType} ${usedById})`);
    return null;
  }
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  if (!fs.existsSync(destPath)) {
    fs.copyFileSync(srcPath, destPath);
    report.copied.push(`${rel(srcPath)} -> ${rel(destPath)}`);
  } else {
    report.skipped.push(`${rel(destPath)} (already present)`);
  }
  assetSeq += 1;
  const finalRootPath = '/' + path.relative(path.join(ROOT, 'public'), destPath).split(path.sep).join('/');
  report.manifest.push({
    assetId: `a${assetSeq}`,
    assetType: path.extname(destPath).slice(1).toLowerCase() === 'pdf' ? 'pdf' : 'image',
    originalPath: rel(srcPath),
    finalPath: finalRootPath,
    fileName: path.basename(destPath),
    usedByType,
    usedById,
  });
  return finalRootPath;
}

// ---------------------------------------------------------------------------
// 1. Copy assets, resolving each Families/Industries/Docs image to its new path
// ---------------------------------------------------------------------------

const familyImagePath = {};
for (const f of FAMILIES_SRC) {
  familyImagePath[f.id] = copyAsset(
    path.join(SRC_PRODUCTS, f.image),
    path.join(DEST_PRODUCTS, f.image),
    'Family',
    f.id
  );
}

const industryImagePath = {};
for (const ind of INDUSTRIES_SRC) {
  industryImagePath[ind.id] = copyAsset(
    path.join(SRC_INDUSTRIES, ind.image),
    path.join(DEST_INDUSTRIES, ind.image),
    'Industry',
    ind.id
  );
}
// Hero image (HERO_INDUSTRY_IMAGE in data.js points at industries/hero.png, not tied to one industry row)
const heroImagePath = copyAsset(
  path.join(SRC_INDUSTRIES, 'hero.png'),
  path.join(DEST_INDUSTRIES, 'hero.png'),
  'Hero',
  'industries-hero'
);

const docAssetPaths = {};
for (const d of DOCS_SRC) {
  if (!d.hasPdf) continue;
  const pdfPath = copyAsset(
    path.join(SRC_HOME, 'Resilient Seated Butterfly Valves — Performance Series.pdf'),
    path.join(DEST_DOCS, 'resilient-seated-catalog.pdf'),
    'Doc',
    d.id
  );
  const coverPath = copyAsset(
    path.join(SRC_HOME, 'performance-series-catalog-cover.png'),
    path.join(DEST_DOCS, 'resilient-seated-catalog-cover.png'),
    'Doc',
    d.id
  );
  docAssetPaths[d.id] = { pdfPath, coverPath };
}

// ---------------------------------------------------------------------------
// 2. Build the workbook
// ---------------------------------------------------------------------------

const wb = new ExcelJS.Workbook();
wb.creator = 'migrate-to-excel.mjs';
wb.created = new Date();

const GREEN = 'FFD9EAD3';
const RED = 'FFF4CCCC';
const GRAY = 'FFE8E8E8';
const HEADER_FONT = { bold: true };

function styleHeader(ws, colorMap) {
  const headerRow = ws.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    cell.font = HEADER_FONT;
    const key = ws.columns[colNumber - 1]?.key;
    const fill = colorMap[key] || GREEN;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } };
  });
}

function addListValidation(ws, colKey, values, firstDataRow = 2, lastDataRow = 500) {
  const colIndex = ws.columns.findIndex((c) => c.key === colKey) + 1;
  if (!colIndex) return;
  const colLetter = ws.getColumn(colIndex).letter;
  for (let r = firstDataRow; r <= lastDataRow; r++) {
    ws.getCell(`${colLetter}${r}`).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: [`"${values.join(',')}"`],
    };
  }
}

// --- Families ---
const wsFamilies = wb.addWorksheet('Families');
wsFamilies.columns = [
  { header: 'Id', key: 'Id', width: 18 },
  { header: 'Code', key: 'Code', width: 8 },
  { header: 'Name', key: 'Name', width: 22 },
  { header: 'MenuName', key: 'MenuName', width: 30 },
  { header: 'MenuDesc', key: 'MenuDesc', width: 34 },
  { header: 'Short', key: 'Short', width: 50 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 },
  { header: 'Need', key: 'Need', width: 40 },
  { header: 'Where', key: 'Where', width: 40 },
  { header: 'Application', key: 'Application', width: 28 },
  { header: 'Sizes', key: 'Sizes', width: 14 },
  { header: 'Rating', key: 'Rating', width: 14 },
  { header: 'Categories', key: 'Categories', width: 18 },
  { header: 'Types', key: 'Types', width: 18 },
  { header: 'Apps', key: 'Apps', width: 22 },
  { header: 'Service', key: 'Service', width: 22 },
  { header: 'Automation', key: 'Automation', width: 18 },
  { header: 'Approvals', key: 'Approvals', width: 22 },
];
for (const f of FAMILIES_SRC) {
  wsFamilies.addRow({
    Id: f.id, Code: f.code, Name: f.name, MenuName: f.menuName, MenuDesc: f.menuDesc, Short: f.short,
    ImagePath: familyImagePath[f.id] || '', Need: f.need, Where: f.where, Application: f.application,
    Sizes: f.sizes, Rating: f.rating, Categories: f.categories.join(', '), Types: f.types.join(', '),
    Apps: f.apps.join(', '), Service: f.service.join(', '), Automation: f.automation.join(', '),
    Approvals: 'To be validated',
  });
}
styleHeader(wsFamilies, { Id: RED });

// --- Industries ---
const wsIndustries = wb.addWorksheet('Industries');
wsIndustries.columns = [
  { header: 'Id', key: 'Id', width: 18 },
  { header: 'Name', key: 'Name', width: 24 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 },
  { header: 'Ctx', key: 'Ctx', width: 60 },
];
for (const ind of INDUSTRIES_SRC) {
  wsIndustries.addRow({ Id: ind.id, Name: ind.name, ImagePath: industryImagePath[ind.id] || '', Ctx: ind.ctx });
}
styleHeader(wsIndustries, { Id: RED });

// --- FamilyIndustryLinks ---
const wsLinks = wb.addWorksheet('FamilyIndustryLinks');
wsLinks.columns = [
  { header: 'FamilyId', key: 'FamilyId', width: 18 },
  { header: 'IndustryId', key: 'IndustryId', width: 18 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
];
for (const f of FAMILIES_SRC) {
  f.industries.forEach((indId, i) => wsLinks.addRow({ FamilyId: f.id, IndustryId: indId, SortOrder: i + 1 }));
}
styleHeader(wsLinks, {});
addListValidation(wsLinks, 'FamilyId', FAMILIES_SRC.map((f) => f.id));
addListValidation(wsLinks, 'IndustryId', INDUSTRIES_SRC.map((i) => i.id));

// --- Materials ---
const wsMaterials = wb.addWorksheet('Materials');
wsMaterials.columns = [
  { header: 'FamilyId', key: 'FamilyId', width: 18 },
  { header: 'BodyMaterials', key: 'BodyMaterials', width: 30 },
  { header: 'SeatLiningOptions', key: 'SeatLiningOptions', width: 30 },
  { header: 'DiscAndStem', key: 'DiscAndStem', width: 30 },
  { header: 'Configurations', key: 'Configurations', width: 30 },
];
for (const f of FAMILIES_SRC) {
  wsMaterials.addRow({ FamilyId: f.id, BodyMaterials: 'To be validated', SeatLiningOptions: 'To be validated', DiscAndStem: 'To be validated', Configurations: 'To be validated' });
}
styleHeader(wsMaterials, { FamilyId: RED });

// --- Docs ---
const wsDocs = wb.addWorksheet('Docs');
wsDocs.columns = [
  { header: 'Id', key: 'Id', width: 8 },
  { header: 'Slug', key: 'Slug', width: 22 },
  { header: 'Type', key: 'Type', width: 20 },
  { header: 'Title', key: 'Title', width: 44 },
  { header: 'PrimaryFamilyId', key: 'PrimaryFamilyId', width: 18 },
  { header: 'RelatedFamilyIds', key: 'RelatedFamilyIds', width: 24 },
  { header: 'Date', key: 'Date', width: 12 },
  { header: 'SizeLabel', key: 'SizeLabel', width: 12 },
  { header: 'Pages', key: 'Pages', width: 8 },
  { header: 'PdfAssetPath', key: 'PdfAssetPath', width: 44 },
  { header: 'CoverAssetPath', key: 'CoverAssetPath', width: 44 },
];
for (const d of DOCS_SRC) {
  const primaryFamilyId = d.fam === 'All families' ? 'ALL' : nameToId(d.fam, FAMILIES_SRC);
  if (!primaryFamilyId) report.needsReview.push(`Docs row ${d.id}: could not resolve fam "${d.fam}" to a Family Id`);
  const assets = docAssetPaths[d.id] || {};
  wsDocs.addRow({
    Id: d.id, Slug: d.slug, Type: d.type, Title: d.title, PrimaryFamilyId: primaryFamilyId || '',
    RelatedFamilyIds: '', Date: d.date, SizeLabel: d.size, Pages: d.pages,
    PdfAssetPath: assets.pdfPath || '', CoverAssetPath: assets.coverPath || '',
  });
}
styleHeader(wsDocs, { Id: RED });
addListValidation(wsDocs, 'Type', DOC_TYPE_VALUES);
addListValidation(wsDocs, 'PrimaryFamilyId', ['ALL', ...FAMILIES_SRC.map((f) => f.id)]);

// --- PriceLists ---
const wsPriceLists = wb.addWorksheet('PriceLists');
wsPriceLists.columns = [
  { header: 'Id', key: 'Id', width: 8 },
  { header: 'Title', key: 'Title', width: 30 },
  { header: 'FamilyId', key: 'FamilyId', width: 18 },
  { header: 'Effective', key: 'Effective', width: 14 },
  { header: 'Version', key: 'Version', width: 12 },
  { header: 'Updated', key: 'Updated', width: 14 },
  { header: 'Access', key: 'Access', width: 12 },
  { header: 'SizeLabel', key: 'SizeLabel', width: 12 },
];
for (const p of PRICE_LISTS_SRC) {
  const familyId = p.fam === 'All families' ? 'ALL' : nameToId(p.fam, FAMILIES_SRC);
  if (!familyId) report.needsReview.push(`PriceLists row ${p.id}: could not resolve fam "${p.fam}" to a Family Id`);
  wsPriceLists.addRow({ Id: p.id, Title: p.title, FamilyId: familyId || '', Effective: p.effective, Version: p.version, Updated: p.updated, Access: p.access, SizeLabel: p.size });
}
styleHeader(wsPriceLists, { Id: RED });
addListValidation(wsPriceLists, 'Access', PRICE_ACCESS_VALUES);
addListValidation(wsPriceLists, 'FamilyId', ['ALL', ...FAMILIES_SRC.map((f) => f.id)]);

// --- ResourceLibs ---
const wsResourceLibs = wb.addWorksheet('ResourceLibs');
wsResourceLibs.columns = [
  { header: 'Id', key: 'Id', width: 14 },
  { header: 'Label', key: 'Label', width: 20 },
  { header: 'Desc', key: 'Desc', width: 44 },
  { header: 'Latest', key: 'Latest', width: 44 },
  { header: 'Family', key: 'Family', width: 20 },
  { header: 'FileType', key: 'FileType', width: 10 },
  { header: 'Pages', key: 'Pages', width: 10 },
  { header: 'CatalogDocSlug', key: 'CatalogDocSlug', width: 20 },
  { header: 'ResType', key: 'ResType', width: 14 },
  { header: 'Related', key: 'Related', width: 20 },
  { header: 'Date', key: 'Date', width: 12 },
  { header: 'Effective', key: 'Effective', width: 20 },
  { header: 'Version', key: 'Version', width: 18 },
  { header: 'Access', key: 'Access', width: 20 },
];
for (const r of RESOURCE_LIBS_SRC) {
  wsResourceLibs.addRow({
    Id: r.id, Label: r.label, Desc: r.desc, Latest: r.latest, Family: r.family, FileType: r.fileType,
    Pages: r.pages, CatalogDocSlug: r.catalogDocSlug, ResType: r.resType, Related: r.related, Date: r.date,
    Effective: r.effective, Version: r.version, Access: r.access,
  });
}
styleHeader(wsResourceLibs, { Id: RED });

// --- RelatedProducts (seed = today's .slice(0,3) "first 3 other families" behavior) ---
const wsRelated = wb.addWorksheet('RelatedProducts');
wsRelated.columns = [
  { header: 'FamilyId', key: 'FamilyId', width: 18 },
  { header: 'RelatedFamilyId', key: 'RelatedFamilyId', width: 18 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
];
for (const f of FAMILIES_SRC) {
  const others = FAMILIES_SRC.filter((x) => x.id !== f.id).slice(0, 3);
  others.forEach((o, i) => wsRelated.addRow({ FamilyId: f.id, RelatedFamilyId: o.id, SortOrder: i + 1 }));
}
styleHeader(wsRelated, {});
addListValidation(wsRelated, 'FamilyId', FAMILIES_SRC.map((f) => f.id));
addListValidation(wsRelated, 'RelatedFamilyId', FAMILIES_SRC.map((f) => f.id));

// --- Gallery (seed = today's 3-shot reuse of the single real image) ---
const wsGallery = wb.addWorksheet('Gallery');
wsGallery.columns = [
  { header: 'FamilyId', key: 'FamilyId', width: 18 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 },
  { header: 'Label', key: 'Label', width: 20 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
];
const SHOT_LABELS = ['Primary view', 'Section view', 'In application'];
for (const f of FAMILIES_SRC) {
  SHOT_LABELS.forEach((label, i) => wsGallery.addRow({ FamilyId: f.id, ImagePath: familyImagePath[f.id] || '', Label: label, SortOrder: i + 1 }));
}
styleHeader(wsGallery, {});
addListValidation(wsGallery, 'FamilyId', FAMILIES_SRC.map((f) => f.id));

// --- AssetManifest ---
const wsManifest = wb.addWorksheet('AssetManifest');
wsManifest.columns = [
  { header: 'AssetId', key: 'AssetId', width: 10 },
  { header: 'AssetType', key: 'AssetType', width: 10 },
  { header: 'OriginalPath', key: 'OriginalPath', width: 50 },
  { header: 'FinalPath', key: 'FinalPath', width: 50 },
  { header: 'FileName', key: 'FileName', width: 30 },
  { header: 'UsedByType', key: 'UsedByType', width: 14 },
  { header: 'UsedById', key: 'UsedById', width: 18 },
];
for (const m of report.manifest) {
  wsManifest.addRow({ AssetId: m.assetId, AssetType: m.assetType, OriginalPath: m.originalPath, FinalPath: m.finalPath, FileName: m.fileName, UsedByType: m.usedByType, UsedById: m.usedById });
}
styleHeader(wsManifest, { AssetId: GRAY, OriginalPath: GRAY, FinalPath: GRAY, FileName: GRAY, UsedByType: GRAY, UsedById: GRAY });

// --- Instructions ---
const wsInstructions = wb.addWorksheet('Instructions', { views: [{ state: 'frozen', ySplit: 1 }] });
wsInstructions.columns = [
  { header: 'Section', key: 'Section', width: 26 },
  { header: 'Guidance', key: 'Guidance', width: 100 },
];
const INSTRUCTIONS = [
  ['Legend', 'Header colors: GREEN = safe to edit. RED = ID column, do not rename existing values (other sheets reference them) but you may add new rows with new ids. GRAY = generated / reference only, not read back by the generator.'],
  ['How to add a product', 'Add one row to Families (pick a new, unused Id). Add matching rows to Materials (1) and Gallery (>=1). Add at least one row to FamilyIndustryLinks so it appears under an industry. Optionally add rows to RelatedProducts and Docs.'],
  ['Images', 'Put the image file in public/assets/maxseal/products/ (or industries/ or docs/), then reference it in the workbook as a path starting with /assets/maxseal/... exactly matching the file you added.'],
  ['Comma-separated columns', 'Families.Types / Apps / Service / Automation / Categories accept multiple values separated by a comma and a space, e.g. "resilient, custom". Only use values from the Types/Apps/Service/Automation vocabulary already in use elsewhere in this sheet -- the generator rejects unknown values with an error.'],
  ['Relationships', 'Product <-> Industry: FamilyIndustryLinks sheet. Product <-> Product: RelatedProducts sheet. Product <-> Document: PrimaryFamilyId / RelatedFamilyIds columns on the Docs sheet (use ALL for a document that applies to every family).'],
  ['After editing', 'Save the workbook, then run "npm run catalog:generate" (or just npm run dev / npm run build, which do this automatically). Fix any errors it reports, then refresh the site.'],
  ['Never edit', 'src/data/data.js is generated automatically from this workbook -- do not hand-edit catalog fields there, they will be overwritten on the next generate.'],
];
for (const [Section, Guidance] of INSTRUCTIONS) wsInstructions.addRow({ Section, Guidance });
wsInstructions.getColumn('Guidance').alignment = { wrapText: true, vertical: 'top' };
styleHeader(wsInstructions, {});

// ---------------------------------------------------------------------------
// 3. Write workbook + report
// ---------------------------------------------------------------------------

fs.mkdirSync(CATALOG_DIR, { recursive: true });
await wb.xlsx.writeFile(WORKBOOK_PATH);

console.log('\nMax-Seal catalog migration complete\n');
console.log(`Workbook written to: ${path.relative(ROOT, WORKBOOK_PATH)}`);
console.log(`\nFamilies: ${FAMILIES_SRC.length}`);
console.log(`Industries: ${INDUSTRIES_SRC.length}`);
console.log(`Family-Industry links: ${FAMILIES_SRC.reduce((n, f) => n + f.industries.length, 0)}`);
console.log(`Docs: ${DOCS_SRC.length}`);
console.log(`Price lists: ${PRICE_LISTS_SRC.length}`);
console.log(`Resource libs: ${RESOURCE_LIBS_SRC.length}`);
console.log(`\nAssets copied: ${report.copied.length}`);
report.copied.forEach((l) => console.log(`  + ${l}`));
console.log(`Assets already present (skipped): ${report.skipped.length}`);

if (report.needsReview.length) {
  console.log(`\n⚠  Needs manual review (${report.needsReview.length}):`);
  report.needsReview.forEach((l) => console.log(`  ! ${l}`));
  process.exitCode = 1;
} else {
  console.log('\nNo unmapped assets or relationships. Migration report is clean.');
}
