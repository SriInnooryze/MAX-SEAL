/*
 * One-time schema migration: Families (flat) -> Categories/Subcategories/Products (hierarchy).
 *
 * Reads the CURRENT catalog/MAXSEAL_CATALOG.xlsx (raw relational rows, not
 * catalog.json) and writes catalog/MAXSEAL_CATALOG.new.xlsx in the new
 * schema. Does not touch the live workbook or scripts/migrate-to-excel.mjs
 * (Phase 1's script, historical). A human reviews the .new.xlsx, then
 * promotes it by renaming it over the live file.
 *
 * Run: node scripts/migrate-add-hierarchy.mjs
 */

import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LIVE_WORKBOOK = path.join(ROOT, 'catalog/MAXSEAL_CATALOG.xlsx');
const OUT_WORKBOOK = path.join(ROOT, 'catalog/MAXSEAL_CATALOG.new.xlsx');
const BACKUP_DIR = path.join(ROOT, 'catalog/backups');

const GREEN = 'FFD9EAD3';
const RED = 'FFF4CCCC';
const HEADER_FONT = { bold: true };

const report = { unmappable: [], counts: {}, idMap: {} };

function sheetToRows(ws) {
  const headers = [];
  ws.getRow(1).eachCell({ includeEmpty: false }, (cell, colNumber) => { headers[colNumber] = String(cell.value ?? '').trim(); });
  const rows = [];
  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    if (row.actualCellCount === 0) continue;
    const obj = {};
    let hasAny = false;
    headers.forEach((h, colNumber) => {
      if (!h) return;
      let v = row.getCell(colNumber).value;
      if (v && typeof v === 'object' && 'text' in v) v = v.text;
      if (v == null) v = '';
      if (typeof v === 'string') v = v.trim();
      else if (typeof v === 'number') v = String(v);
      obj[h] = v;
      if (v !== '') hasAny = true;
    });
    if (hasAny) rows.push(obj);
  }
  return rows;
}

const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const pad3 = (n) => String(n).padStart(3, '0');

function rekey(idMap, sheet, row, column, value) {
  if (!value) return value;
  if (value === 'ALL') return value;
  if (idMap[value]) return idMap[value];
  report.unmappable.push({ sheet, row, column, value });
  return value; // left untouched deliberately
}

function rekeyList(idMap, sheet, row, column, value) {
  if (!value) return value;
  return value.split(',').map((s) => s.trim()).filter(Boolean).map((v) => rekey(idMap, sheet, row, column, v)).join(', ');
}

// ---------------------------------------------------------------------------
// 1. Load current live workbook
// ---------------------------------------------------------------------------

if (!fs.existsSync(LIVE_WORKBOOK)) {
  console.error(`Live workbook not found at ${path.relative(ROOT, LIVE_WORKBOOK)}.`);
  process.exit(1);
}

const src = new ExcelJS.Workbook();
await src.xlsx.readFile(LIVE_WORKBOOK);

// Backup before touching anything
fs.mkdirSync(BACKUP_DIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
fs.copyFileSync(LIVE_WORKBOOK, path.join(BACKUP_DIR, `MAXSEAL_CATALOG_pre-hierarchy_${stamp}.xlsx`));

const oldFamilies = sheetToRows(src.getWorksheet('Families'));
const oldIndustries = sheetToRows(src.getWorksheet('Industries'));
const oldLinks = sheetToRows(src.getWorksheet('FamilyIndustryLinks'));
const oldMaterials = sheetToRows(src.getWorksheet('Materials'));
const oldDocs = sheetToRows(src.getWorksheet('Docs'));
const oldPriceLists = sheetToRows(src.getWorksheet('PriceLists'));
const oldResourceLibs = sheetToRows(src.getWorksheet('ResourceLibs'));
const oldRelated = sheetToRows(src.getWorksheet('RelatedProducts'));
const oldGallery = sheetToRows(src.getWorksheet('Gallery'));
const oldManifest = sheetToRows(src.getWorksheet('AssetManifest'));

// ---------------------------------------------------------------------------
// 2. Build Categories / Subcategories / Products
// ---------------------------------------------------------------------------

const categories = [{
  Id: 'CAT-001', Name: 'Butterfly Valves', Slug: 'butterfly-valves',
  Description: "Max-Seal's core butterfly valve range across resilient-seated, high-performance, and specialty configurations.",
  ImagePath: '', Status: 'active', SortOrder: 1,
}];

const subcategories = [];
const idMap = {}; // oldFamilyId -> newProductId
const SECTION_TYPES = ['overview', 'specifications', 'applications', 'materials', 'documents'];
const SECTION_TITLES = { overview: 'Overview', specifications: 'Technical Data', applications: 'Applications', materials: 'Materials', documents: 'Documents' };

const products = [];
const productSpecifications = []; // headers only
const productSections = [];
const productMedia = []; // headers only

oldFamilies.forEach((fam, i) => {
  const subId = `SUB-${pad3(i + 1)}`;
  subcategories.push({
    Id: subId, CategoryId: 'CAT-001', Name: fam.Name, Slug: slugify(fam.Name),
    MenuName: fam.MenuName, Description: fam.MenuDesc, ImagePath: fam.ImagePath,
    Status: 'active', SortOrder: i + 1,
  });

  const prodId = `PROD-${pad3(i + 1)}`;
  idMap[fam.Id] = prodId;
  report.idMap[fam.Id] = prodId;

  const alreadySuffixed = fam.Name.trim().endsWith('Butterfly Valve');
  const newName = alreadySuffixed ? fam.Name.trim() : `${fam.Name.trim()} Butterfly Valve`;
  const sku = `${fam.Code}-${pad3(1)}`; // one product per subcategory today -> seq 001

  products.push({
    Id: prodId, SubcategoryId: subId, SKU: sku, Code: fam.Code, Name: newName,
    MenuName: fam.MenuName, MenuDesc: fam.MenuDesc, Short: fam.Short, ImagePath: fam.ImagePath,
    Need: fam.Need, Where: fam.Where, Application: fam.Application, Sizes: fam.Sizes, Rating: fam.Rating,
    Types: fam.Types, Apps: fam.Apps, Service: fam.Service, Automation: fam.Automation, Approvals: fam.Approvals,
    Status: 'active', Featured: 'TRUE', SortOrder: i + 1,
  });

  SECTION_TYPES.forEach((type, si) => {
    productSections.push({ ProductId: prodId, Type: type, Title: SECTION_TITLES[type], Enabled: 'TRUE', SortOrder: si + 1, Variant: '' });
  });
});

report.counts = {
  categories: categories.length, subcategories: subcategories.length, products: products.length,
  productSections: productSections.length,
};

// ---------------------------------------------------------------------------
// 3. Rekey relation sheets
// ---------------------------------------------------------------------------

const industryIndustryLinks = oldLinks.map((row, i) => ({
  ProductId: rekey(idMap, 'FamilyIndustryLinks', i + 2, 'FamilyId', row.FamilyId),
  IndustryId: row.IndustryId,
  SortOrder: row.SortOrder,
}));

const newMaterials = oldMaterials.map((row, i) => ({
  ProductId: rekey(idMap, 'Materials', i + 2, 'FamilyId', row.FamilyId),
  BodyMaterials: row.BodyMaterials, SeatLiningOptions: row.SeatLiningOptions,
  DiscAndStem: row.DiscAndStem, Configurations: row.Configurations,
}));

const newDocs = oldDocs.map((row, i) => ({
  Id: row.Id, Slug: row.Slug, Type: row.Type, Title: row.Title,
  PrimaryProductId: rekey(idMap, 'Docs', i + 2, 'PrimaryFamilyId', row.PrimaryFamilyId),
  RelatedProductIds: rekeyList(idMap, 'Docs', i + 2, 'RelatedFamilyIds', row.RelatedFamilyIds),
  Date: row.Date, SizeLabel: row.SizeLabel, Pages: row.Pages,
  PdfAssetPath: row.PdfAssetPath, CoverAssetPath: row.CoverAssetPath,
}));

const newPriceLists = oldPriceLists.map((row, i) => ({
  Id: row.Id, Title: row.Title,
  ProductId: rekey(idMap, 'PriceLists', i + 2, 'FamilyId', row.FamilyId),
  Effective: row.Effective, Version: row.Version, Updated: row.Updated, Access: row.Access, SizeLabel: row.SizeLabel,
}));

const newRelated = oldRelated.map((row, i) => ({
  ProductId: rekey(idMap, 'RelatedProducts', i + 2, 'FamilyId', row.FamilyId),
  RelatedProductId: rekey(idMap, 'RelatedProducts', i + 2, 'RelatedFamilyId', row.RelatedFamilyId),
  SortOrder: row.SortOrder,
}));

const newGallery = oldGallery.map((row, i) => ({
  ProductId: rekey(idMap, 'Gallery', i + 2, 'FamilyId', row.FamilyId),
  ImagePath: row.ImagePath, Label: row.Label, SortOrder: row.SortOrder,
}));

const newManifest = oldManifest.map((row) => ({
  ...row,
  UsedByType: row.UsedByType === 'Family' ? 'Product' : row.UsedByType,
  UsedById: row.UsedByType === 'Family' ? (idMap[row.UsedById] || row.UsedById) : row.UsedById,
}));

report.counts.gallery = newGallery.length;
report.counts.docs = newDocs.length;
report.counts.priceLists = newPriceLists.length;
report.counts.relatedProducts = newRelated.length;
report.counts.productIndustryLinks = industryIndustryLinks.length;

// ---------------------------------------------------------------------------
// 4. Write new workbook
// ---------------------------------------------------------------------------

const wb = new ExcelJS.Workbook();
wb.creator = 'migrate-add-hierarchy.mjs';
wb.created = new Date();

function styleHeader(ws, colorMap) {
  const headerRow = ws.getRow(1);
  headerRow.eachCell((cell, colNumber) => {
    cell.font = HEADER_FONT;
    const key = ws.columns[colNumber - 1]?.key;
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorMap[key] || GREEN } };
  });
}

function addSheet(name, columns, rows, colorMap = {}) {
  const ws = wb.addWorksheet(name);
  ws.columns = columns;
  rows.forEach((r) => ws.addRow(r));
  styleHeader(ws, colorMap);
  return ws;
}

addSheet('Categories', [
  { header: 'Id', key: 'Id', width: 14 }, { header: 'Name', key: 'Name', width: 24 },
  { header: 'Slug', key: 'Slug', width: 20 }, { header: 'Description', key: 'Description', width: 50 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 }, { header: 'Status', key: 'Status', width: 12 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
], categories, { Id: RED });

addSheet('Subcategories', [
  { header: 'Id', key: 'Id', width: 14 }, { header: 'CategoryId', key: 'CategoryId', width: 14 },
  { header: 'Name', key: 'Name', width: 24 }, { header: 'Slug', key: 'Slug', width: 20 },
  { header: 'MenuName', key: 'MenuName', width: 30 }, { header: 'Description', key: 'Description', width: 40 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 }, { header: 'Status', key: 'Status', width: 12 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
], subcategories, { Id: RED });

addSheet('Products', [
  { header: 'Id', key: 'Id', width: 14 }, { header: 'SubcategoryId', key: 'SubcategoryId', width: 14 },
  { header: 'SKU', key: 'SKU', width: 14 }, { header: 'Code', key: 'Code', width: 8 },
  { header: 'Name', key: 'Name', width: 34 }, { header: 'MenuName', key: 'MenuName', width: 30 },
  { header: 'MenuDesc', key: 'MenuDesc', width: 34 }, { header: 'Short', key: 'Short', width: 50 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 }, { header: 'Need', key: 'Need', width: 40 },
  { header: 'Where', key: 'Where', width: 40 }, { header: 'Application', key: 'Application', width: 28 },
  { header: 'Sizes', key: 'Sizes', width: 14 }, { header: 'Rating', key: 'Rating', width: 14 },
  { header: 'Types', key: 'Types', width: 18 }, { header: 'Apps', key: 'Apps', width: 22 },
  { header: 'Service', key: 'Service', width: 22 }, { header: 'Automation', key: 'Automation', width: 18 },
  { header: 'Approvals', key: 'Approvals', width: 22 }, { header: 'Status', key: 'Status', width: 12 },
  { header: 'Featured', key: 'Featured', width: 10 }, { header: 'SortOrder', key: 'SortOrder', width: 10 },
], products, { Id: RED, SKU: RED });

addSheet('ProductSpecifications', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'Group', key: 'Group', width: 20 },
  { header: 'Label', key: 'Label', width: 24 }, { header: 'Value', key: 'Value', width: 34 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
], productSpecifications, {});

addSheet('ProductSections', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'Type', key: 'Type', width: 16 },
  { header: 'Title', key: 'Title', width: 20 }, { header: 'Enabled', key: 'Enabled', width: 10 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 }, { header: 'Variant', key: 'Variant', width: 14 },
], productSections, {});

addSheet('ProductMedia', [
  { header: 'MediaId', key: 'MediaId', width: 12 }, { header: 'ProductId', key: 'ProductId', width: 14 },
  { header: 'MediaType', key: 'MediaType', width: 12 }, { header: 'Path', key: 'Path', width: 40 },
  { header: 'Title', key: 'Title', width: 24 }, { header: 'SortOrder', key: 'SortOrder', width: 10 },
  { header: 'IsPrimary', key: 'IsPrimary', width: 10 },
], productMedia, { MediaId: RED });

addSheet('Industries', [
  { header: 'Id', key: 'Id', width: 18 }, { header: 'Name', key: 'Name', width: 24 },
  { header: 'ImagePath', key: 'ImagePath', width: 40 }, { header: 'Ctx', key: 'Ctx', width: 60 },
], oldIndustries, { Id: RED });

addSheet('ProductIndustryLinks', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'IndustryId', key: 'IndustryId', width: 18 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
], industryIndustryLinks, {});

addSheet('Materials', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'BodyMaterials', key: 'BodyMaterials', width: 30 },
  { header: 'SeatLiningOptions', key: 'SeatLiningOptions', width: 30 }, { header: 'DiscAndStem', key: 'DiscAndStem', width: 30 },
  { header: 'Configurations', key: 'Configurations', width: 30 },
], newMaterials, { ProductId: RED });

addSheet('Docs', [
  { header: 'Id', key: 'Id', width: 8 }, { header: 'Slug', key: 'Slug', width: 22 },
  { header: 'Type', key: 'Type', width: 20 }, { header: 'Title', key: 'Title', width: 44 },
  { header: 'PrimaryProductId', key: 'PrimaryProductId', width: 16 }, { header: 'RelatedProductIds', key: 'RelatedProductIds', width: 24 },
  { header: 'Date', key: 'Date', width: 12 }, { header: 'SizeLabel', key: 'SizeLabel', width: 12 },
  { header: 'Pages', key: 'Pages', width: 8 }, { header: 'PdfAssetPath', key: 'PdfAssetPath', width: 44 },
  { header: 'CoverAssetPath', key: 'CoverAssetPath', width: 44 },
], newDocs, { Id: RED });

addSheet('PriceLists', [
  { header: 'Id', key: 'Id', width: 8 }, { header: 'Title', key: 'Title', width: 30 },
  { header: 'ProductId', key: 'ProductId', width: 16 }, { header: 'Effective', key: 'Effective', width: 14 },
  { header: 'Version', key: 'Version', width: 12 }, { header: 'Updated', key: 'Updated', width: 14 },
  { header: 'Access', key: 'Access', width: 12 }, { header: 'SizeLabel', key: 'SizeLabel', width: 12 },
], newPriceLists, { Id: RED });

addSheet('ResourceLibs', [
  { header: 'Id', key: 'Id', width: 14 }, { header: 'Label', key: 'Label', width: 20 },
  { header: 'Desc', key: 'Desc', width: 44 }, { header: 'Latest', key: 'Latest', width: 44 },
  { header: 'Family', key: 'Family', width: 20 }, { header: 'FileType', key: 'FileType', width: 10 },
  { header: 'Pages', key: 'Pages', width: 10 }, { header: 'CatalogDocSlug', key: 'CatalogDocSlug', width: 20 },
  { header: 'ResType', key: 'ResType', width: 14 }, { header: 'Related', key: 'Related', width: 20 },
  { header: 'Date', key: 'Date', width: 12 }, { header: 'Effective', key: 'Effective', width: 20 },
  { header: 'Version', key: 'Version', width: 18 }, { header: 'Access', key: 'Access', width: 20 },
], oldResourceLibs, { Id: RED });

addSheet('RelatedProducts', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'RelatedProductId', key: 'RelatedProductId', width: 16 },
  { header: 'SortOrder', key: 'SortOrder', width: 10 },
], newRelated, {});

addSheet('Gallery', [
  { header: 'ProductId', key: 'ProductId', width: 14 }, { header: 'ImagePath', key: 'ImagePath', width: 40 },
  { header: 'Label', key: 'Label', width: 20 }, { header: 'SortOrder', key: 'SortOrder', width: 10 },
], newGallery, {});

addSheet('AssetManifest', [
  { header: 'AssetId', key: 'AssetId', width: 10 }, { header: 'AssetType', key: 'AssetType', width: 10 },
  { header: 'OriginalPath', key: 'OriginalPath', width: 50 }, { header: 'FinalPath', key: 'FinalPath', width: 50 },
  { header: 'FileName', key: 'FileName', width: 30 }, { header: 'UsedByType', key: 'UsedByType', width: 14 },
  { header: 'UsedById', key: 'UsedById', width: 18 },
], newManifest, {});

const wsInstructions = wb.addWorksheet('Instructions', { views: [{ state: 'frozen', ySplit: 1 }] });
wsInstructions.columns = [{ header: 'Section', key: 'Section', width: 26 }, { header: 'Guidance', key: 'Guidance', width: 100 }];
const oldInstructions = sheetToRows(src.getWorksheet('Instructions'));
oldInstructions.forEach((r) => wsInstructions.addRow(r));
wsInstructions.addRow({
  Section: 'Hierarchy (new)',
  Guidance: 'Products now belong to a Subcategory, which belongs to a Category. To add a product: pick (or create) its Subcategory first, then add a Products row referencing it.',
});
wsInstructions.addRow({
  Section: 'SKU policy (new)',
  Guidance: 'SKU is required and must be unique, but there is no enforced format -- pick whatever scheme fits (e.g. BV-RS-001 for a butterfly valve, BALL-FLT-001 for a ball valve). The system only checks uniqueness.',
});
wsInstructions.addRow({
  Section: 'Status semantics (new) -- read carefully',
  Guidance: 'Category Status and Subcategory Status affect only a future category/subcategory listing page that does not exist yet -- changing them has NO effect on the live site today. Product Status is the ONLY one that controls live visibility right now: active = shown, inactive/archived = hidden. Changing a Subcategory to inactive does NOT hide its Products.',
});
wsInstructions.addRow({
  Section: 'Deleting rows (new)',
  Guidance: 'There is no automatic cascade delete. If you delete a Product (or Subcategory/Category) row while other sheets still reference its Id (Gallery, Materials, RelatedProducts, ProductIndustryLinks, ProductSpecifications, ProductSections, ProductMedia, Docs, PriceLists), generation will fail and list exactly which rows are orphaned. Clean those up too, then regenerate. Prefer Status=inactive/archived over deleting rows.',
});
wsInstructions.addRow({
  Section: 'ProductSections (new)',
  Guidance: 'Controls which tabs a product shows, their title and order. Type must be one of: overview, specifications, applications, materials, documents (these are the only tab types the website currently knows how to render). Variant is reserved for future use, leave blank.',
});
wsInstructions.addRow({
  Section: 'ProductMedia (new)',
  Guidance: 'For video/3d/cad/drawing files only -- images still go in Gallery, PDFs still go in Docs. Rows here are validated and included in the data, but the website does not yet have a viewer for these types.',
});
styleHeader(wsInstructions, {});

fs.mkdirSync(path.dirname(OUT_WORKBOOK), { recursive: true });
await wb.xlsx.writeFile(OUT_WORKBOOK);

// ---------------------------------------------------------------------------
// 5. Report
// ---------------------------------------------------------------------------

console.log('\nHierarchy migration complete\n');
console.log(`New workbook written to: ${path.relative(ROOT, OUT_WORKBOOK)} (NOT promoted -- review then rename over the live file)`);
console.log('\nCounts:', JSON.stringify(report.counts, null, 2));
console.log('\nId map (old Family Id -> new Product Id):', JSON.stringify(report.idMap, null, 2));

if (report.unmappable.length) {
  console.log(`\n⚠  Unmappable values (${report.unmappable.length}) -- left untouched, review before promoting:`);
  report.unmappable.forEach((u) => console.log(`  ! ${u.sheet} row ${u.row}, column ${u.column}: "${u.value}"`));
  process.exitCode = 1;
} else {
  console.log('\nNo unmappable relation values. Migration report is clean.');
}
