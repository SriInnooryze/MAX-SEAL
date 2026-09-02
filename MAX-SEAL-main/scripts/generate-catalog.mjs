/*
 * Ongoing Excel -> JSON generator.
 *
 * Reads catalog/MAXSEAL_CATALOG.xlsx (Category > Subcategory > Product
 * hierarchy schema), validates it exhaustively, and on success writes
 * src/data/generated/catalog.json. src/data/data.js's FAMILIES export stays
 * a passthrough of catalog.products (export NAME unchanged deliberately —
 * see plan notes — even though the JSON key and Excel sheet are "Products").
 *
 * On ANY validation error: print every error found (not just the first),
 * exit 1, and write nothing -- the previously generated catalog.json (if
 * any) is left in place untouched, so a bad edit can never break the app
 * that's currently running or already built.
 *
 * Run: npm run catalog:generate  (also runs automatically via predev/prebuild)
 */

import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  FACETS_VALUES, DOC_TYPE_VALUES, PRICE_ACCESS_VALUES,
  PRODUCT_STATUS_VALUES, CATEGORY_STATUS_VALUES, PRODUCT_SECTION_TYPES, PRODUCT_MEDIA_TYPES,
} from './lib/vocab.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WORKBOOK_PATH = path.join(ROOT, 'catalog/MAXSEAL_CATALOG.xlsx');
const BACKUP_DIR = path.join(ROOT, 'catalog/backups');
const OUT_DIR = path.join(ROOT, 'src/data/generated');
const OUT_FILE = path.join(OUT_DIR, 'catalog.json');
const PUBLIC_DIR = path.join(ROOT, 'public');

const errors = [];
const err = (msg) => errors.push(msg);

if (!fs.existsSync(WORKBOOK_PATH)) {
  console.error(`\nCatalog workbook not found at ${path.relative(ROOT, WORKBOOK_PATH)}.`);
  console.error('Restore it from catalog/backups/.\n');
  process.exit(1);
}

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(WORKBOOK_PATH);

function sheet(name) {
  const ws = wb.getWorksheet(name);
  if (!ws) {
    err(`Missing required sheet: "${name}"`);
    return [];
  }
  const headers = [];
  ws.getRow(1).eachCell({ includeEmpty: false }, (cell, colNumber) => {
    headers[colNumber] = String(cell.value ?? '').trim();
  });
  const rows = [];
  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    if (row.actualCellCount === 0) continue;
    const obj = { __row: r };
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

const parseList = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);
const isTrue = (v) => String(v).trim().toUpperCase() === 'TRUE';

function requireFields(sheetName, rows, fields) {
  for (const row of rows) {
    for (const f of fields) {
      if (row[f] === '' || row[f] == null) {
        err(`${sheetName} row ${row.__row}: required field "${f}" is blank`);
      }
    }
  }
}

function checkUnique(sheetName, rows, field) {
  const seen = new Map();
  for (const row of rows) {
    const v = row[field];
    if (!v) continue;
    if (seen.has(v)) err(`${sheetName} row ${row.__row}: duplicate ${field} "${v}" (first seen row ${seen.get(v)})`);
    else seen.set(v, row.__row);
  }
}

function checkFK(sheetName, rows, field, validSet, { allowBlank = false, allowAll = false } = {}) {
  for (const row of rows) {
    const v = row[field];
    if (!v) { if (!allowBlank) err(`${sheetName} row ${row.__row}: "${field}" is required`); continue; }
    if (allowAll && v === 'ALL') continue;
    if (!validSet.has(v)) err(`${sheetName} row ${row.__row}: "${field}" = "${v}" does not match any known Id`);
  }
}

function checkFKList(sheetName, rows, field, validSet, { allowAll = false } = {}) {
  for (const row of rows) {
    for (const v of parseList(row[field])) {
      if (allowAll && v === 'ALL') continue;
      if (!validSet.has(v)) err(`${sheetName} row ${row.__row}: "${field}" contains "${v}" which does not match any known Id`);
    }
  }
}

function checkVocab(sheetName, rows, field, validValues) {
  const validSet = new Set(validValues);
  for (const row of rows) {
    for (const v of parseList(row[field])) {
      if (!validSet.has(v)) err(`${sheetName} row ${row.__row}: "${field}" contains "${v}" -- not in the allowed vocabulary (${validValues.join(', ')})`);
    }
  }
}

function checkClosedValue(sheetName, rows, field, validValues, { allowBlank = false } = {}) {
  const validSet = new Set(validValues);
  for (const row of rows) {
    const v = row[field];
    if (!v) { if (!allowBlank) err(`${sheetName} row ${row.__row}: "${field}" is required`); continue; }
    if (!validSet.has(v)) err(`${sheetName} row ${row.__row}: "${field}" = "${v}" -- must be one of (${validValues.join(', ')})`);
  }
}

function checkAsset(sheetName, rows, field, { required = false } = {}) {
  for (const row of rows) {
    const v = row[field];
    if (!v) { if (required) err(`${sheetName} row ${row.__row}: "${field}" is required`); continue; }
    if (!v.startsWith('/')) { err(`${sheetName} row ${row.__row}: "${field}" = "${v}" must be a root-relative path starting with "/" (e.g. /assets/maxseal/products/x.png)`); continue; }
    const abs = path.join(PUBLIC_DIR, v.slice(1));
    if (!fs.existsSync(abs)) err(`${sheetName} row ${row.__row}: "${field}" points at a file that does not exist: public${v}`);
  }
}

// ---------------------------------------------------------------------------
// Load sheets
// ---------------------------------------------------------------------------

const categories = sheet('Categories');
const subcategories = sheet('Subcategories');
const products = sheet('Products');
const specifications = sheet('ProductSpecifications');
const sections = sheet('ProductSections');
const media = sheet('ProductMedia');
const industries = sheet('Industries');
const links = sheet('ProductIndustryLinks');
const materials = sheet('Materials');
const docs = sheet('Docs');
const priceLists = sheet('PriceLists');
const resourceLibs = sheet('ResourceLibs');
const relatedProducts = sheet('RelatedProducts');
const gallery = sheet('Gallery');

const categoryIds = new Set(categories.map((c) => c.Id));
const subcategoryIds = new Set(subcategories.map((s) => s.Id));
const productIds = new Set(products.map((p) => p.Id));
const industryIds = new Set(industries.map((i) => i.Id));

// ---------------------------------------------------------------------------
// Validate
// ---------------------------------------------------------------------------

requireFields('Categories', categories, ['Id', 'Name', 'Slug']);
checkUnique('Categories', categories, 'Id');
checkUnique('Categories', categories, 'Slug');
checkClosedValue('Categories', categories, 'Status', CATEGORY_STATUS_VALUES);
// Main Category and Sub Category-1 cards render ImagePath through
// <image-slot>, which has no load-error fallback — an empty or malformed
// path (no leading "/", or a file that doesn't exist under public/) either
// renders a visible "<Name> image" placeholder caption or a broken image
// icon, not a graceful empty state. checkAsset catches both at generation
// time instead of at the browser.
checkAsset('Categories', categories, 'ImagePath', { required: true });

requireFields('Subcategories', subcategories, ['Id', 'CategoryId', 'Name', 'Slug']);
checkUnique('Subcategories', subcategories, 'Id');
checkUnique('Subcategories', subcategories, 'Slug');
checkFK('Subcategories', subcategories, 'CategoryId', categoryIds);
checkClosedValue('Subcategories', subcategories, 'Status', CATEGORY_STATUS_VALUES);
// Not required: a subcategory approved by name only (no image supplied yet)
// still needs to exist so its products are reachable — <image-slot> already
// renders a graceful placeholder when ImagePath is blank (see ProductCategory
// / ProductSubcategory pages), so this is never a broken-image state.
checkAsset('Subcategories', subcategories, 'ImagePath', { required: false });

// Sizes/Rating are intentionally NOT required: a product's dimensional/
// pressure spec is only entered once a source document confirms it, per the
// "never invent technical specifications" rule — a blank cell means the
// Product Detail page hides that row instead of showing a fabricated value.
// MenuDesc/Short/Need/Where/Application/ImagePath are likewise NOT required:
// a product name approved ahead of its content/image still needs a card and
// a detail page — ProductDetail.jsx already hides every section (Overview,
// Technical Data, Applications, Materials, Documents) whose backing field is
// blank, and <image-slot> shows a placeholder instead of a broken image.
requireFields('Products', products, ['Id', 'SubcategoryId', 'SKU', 'Code', 'Name', 'MenuName']);
checkUnique('Products', products, 'Id');
checkUnique('Products', products, 'SKU');
checkFK('Products', products, 'SubcategoryId', subcategoryIds);
checkClosedValue('Products', products, 'Status', PRODUCT_STATUS_VALUES);
checkVocab('Products', products, 'Types', FACETS_VALUES.types);
checkVocab('Products', products, 'Apps', FACETS_VALUES.apps);
checkVocab('Products', products, 'Service', FACETS_VALUES.service);
checkVocab('Products', products, 'Automation', FACETS_VALUES.automation);
checkAsset('Products', products, 'ImagePath', { required: false });

requireFields('ProductSpecifications', specifications, ['ProductId', 'Group', 'Label', 'Value']);
checkFK('ProductSpecifications', specifications, 'ProductId', productIds);

requireFields('ProductSections', sections, ['ProductId', 'Type']);
checkFK('ProductSections', sections, 'ProductId', productIds);
checkClosedValue('ProductSections', sections, 'Type', PRODUCT_SECTION_TYPES);

requireFields('ProductMedia', media, ['ProductId', 'MediaType', 'Path']);
checkFK('ProductMedia', media, 'ProductId', productIds);
checkClosedValue('ProductMedia', media, 'MediaType', PRODUCT_MEDIA_TYPES);
checkAsset('ProductMedia', media, 'Path', { required: true });

requireFields('Industries', industries, ['Id', 'Name', 'ImagePath', 'Ctx']);
checkUnique('Industries', industries, 'Id');
checkAsset('Industries', industries, 'ImagePath', { required: true });

requireFields('ProductIndustryLinks', links, ['ProductId', 'IndustryId']);
checkFK('ProductIndustryLinks', links, 'ProductId', productIds);
checkFK('ProductIndustryLinks', links, 'IndustryId', industryIds);

requireFields('Materials', materials, ['ProductId']);
checkFK('Materials', materials, 'ProductId', productIds);
checkUnique('Materials', materials, 'ProductId');

requireFields('Docs', docs, ['Id', 'Slug', 'Type', 'Title', 'PrimaryProductId']);
checkUnique('Docs', docs, 'Id');
checkUnique('Docs', docs, 'Slug');
checkClosedValue('Docs', docs, 'Type', DOC_TYPE_VALUES);
checkFK('Docs', docs, 'PrimaryProductId', productIds, { allowAll: true });
checkFKList('Docs', docs, 'RelatedProductIds', productIds, { allowAll: true });
checkAsset('Docs', docs, 'PdfAssetPath');
checkAsset('Docs', docs, 'CoverAssetPath');

requireFields('PriceLists', priceLists, ['Id', 'Title', 'ProductId']);
checkUnique('PriceLists', priceLists, 'Id');
checkFK('PriceLists', priceLists, 'ProductId', productIds, { allowAll: true });
checkClosedValue('PriceLists', priceLists, 'Access', PRICE_ACCESS_VALUES);
checkAsset('PriceLists', priceLists, 'PdfAssetPath', { required: false });

requireFields('ResourceLibs', resourceLibs, ['Id', 'Label', 'Desc']);
checkUnique('ResourceLibs', resourceLibs, 'Id');

requireFields('RelatedProducts', relatedProducts, ['ProductId', 'RelatedProductId']);
checkFK('RelatedProducts', relatedProducts, 'ProductId', productIds);
checkFK('RelatedProducts', relatedProducts, 'RelatedProductId', productIds);
for (const row of relatedProducts) {
  if (row.ProductId && row.RelatedProductId && row.ProductId === row.RelatedProductId) {
    err(`RelatedProducts row ${row.__row}: ProductId and RelatedProductId are the same ("${row.ProductId}")`);
  }
}

requireFields('Gallery', gallery, ['ProductId', 'ImagePath', 'Label']);
checkFK('Gallery', gallery, 'ProductId', productIds);
checkAsset('Gallery', gallery, 'ImagePath', { required: true });

// Cross-check: an active product's RelatedProducts entries must point at other active products.
if (!errors.length) {
  const statusById = new Map(products.map((p) => [p.Id, p.Status]));
  for (const row of relatedProducts) {
    if (statusById.get(row.ProductId) === 'active' && statusById.get(row.RelatedProductId) !== 'active') {
      err(`RelatedProducts row ${row.__row}: active product "${row.ProductId}" links to "${row.RelatedProductId}", which is not active`);
    }
  }
}

if (errors.length) {
  console.error(`\nCatalog generation failed with ${errors.length} error(s):\n`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  console.error('\nFix the workbook and re-run "npm run catalog:generate". No output was written.\n');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Back up the just-validated workbook before writing JSON
// ---------------------------------------------------------------------------

fs.mkdirSync(BACKUP_DIR, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').slice(0, 19);
fs.copyFileSync(WORKBOOK_PATH, path.join(BACKUP_DIR, `MAXSEAL_CATALOG_${stamp}.xlsx`));

// ---------------------------------------------------------------------------
// Build output shapes
// ---------------------------------------------------------------------------

const categoryById = new Map(categories.map((c) => [c.Id, c]));
const subcategoryById = new Map(subcategories.map((s) => [s.Id, s]));
const productById = new Map(products.map((p) => [p.Id, p]));
const industryById = new Map(industries.map((i) => [i.Id, i]));

const productIndustries = new Map(); // productId -> [industryId,...] sorted
const industryProductNames = new Map(); // industryId -> [productName,...] sorted
for (const p of products) productIndustries.set(p.Id, []);
for (const i of industries) industryProductNames.set(i.Id, []);
for (const row of [...links].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))) {
  if (!productIds.has(row.ProductId) || !industryIds.has(row.IndustryId)) continue;
  productIndustries.get(row.ProductId).push(row.IndustryId);
  industryProductNames.get(row.IndustryId).push(productById.get(row.ProductId).Name);
}

const materialsByProduct = new Map(materials.map((m) => [m.ProductId, m]));

const galleryByProduct = new Map();
for (const p of products) galleryByProduct.set(p.Id, []);
for (const row of [...gallery].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))) {
  if (!galleryByProduct.has(row.ProductId)) continue;
  galleryByProduct.get(row.ProductId).push({ imagePath: row.ImagePath, label: row.Label });
}

const relatedByProduct = new Map();
for (const p of products) relatedByProduct.set(p.Id, []);
for (const row of [...relatedProducts].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))) {
  if (!relatedByProduct.has(row.ProductId) || !productIds.has(row.RelatedProductId)) continue;
  relatedByProduct.get(row.ProductId).push(row.RelatedProductId);
}

const specsByProduct = new Map();
for (const p of products) specsByProduct.set(p.Id, []);
for (const row of [...specifications].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))) {
  if (!specsByProduct.has(row.ProductId)) continue;
  specsByProduct.get(row.ProductId).push({ group: row.Group, label: row.Label, value: row.Value });
}

const sectionsByProduct = new Map();
for (const p of products) sectionsByProduct.set(p.Id, []);
for (const row of [...sections].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))) {
  if (!sectionsByProduct.has(row.ProductId)) continue;
  if (!isTrue(row.Enabled)) continue;
  sectionsByProduct.get(row.ProductId).push({ type: row.Type, title: row.Title, variant: row.Variant || '' });
}

// Normalize Gallery(image) + matching Docs(pdf) + genuine ProductMedia rows into one unified media list per product.
const mediaByProduct = new Map();
for (const p of products) mediaByProduct.set(p.Id, []);
for (const row of gallery) {
  if (!mediaByProduct.has(row.ProductId)) continue;
  mediaByProduct.get(row.ProductId).push({ mediaType: 'image', path: row.ImagePath, title: row.Label, sortOrder: Number(row.SortOrder) || 0, isPrimary: false });
}
for (const d of docs) {
  if (!d.PdfAssetPath) continue;
  const targets = d.PrimaryProductId === 'ALL' ? [...productIds] : [d.PrimaryProductId, ...parseList(d.RelatedProductIds)];
  for (const pid of targets) {
    if (!mediaByProduct.has(pid)) continue;
    mediaByProduct.get(pid).push({ mediaType: 'pdf', path: d.PdfAssetPath, title: d.Title, sortOrder: 0, isPrimary: false });
  }
}
for (const row of media) {
  if (!mediaByProduct.has(row.ProductId)) continue;
  mediaByProduct.get(row.ProductId).push({
    mediaType: row.MediaType, path: row.Path, title: row.Title,
    sortOrder: Number(row.SortOrder) || 0, isPrimary: isTrue(row.IsPrimary),
  });
}

const activeProducts = products.filter((p) => p.Status === 'active');

const outProducts = activeProducts.map((p) => {
  const m = materialsByProduct.get(p.Id) || {};
  const sub = subcategoryById.get(p.SubcategoryId);
  const cat = sub ? categoryById.get(sub.CategoryId) : null;
  return {
    id: p.Id, sku: p.SKU, code: p.Code, name: p.Name, menuName: p.MenuName, menuDesc: p.MenuDesc, short: p.Short,
    image: p.ImagePath, need: p.Need, where: p.Where, application: p.Application, sizes: p.Sizes, rating: p.Rating,
    sourceFile: p.SourceFile || '',
    subcategoryId: p.SubcategoryId, categoryId: cat ? cat.Id : null,
    types: parseList(p.Types), apps: parseList(p.Apps),
    industries: productIndustries.get(p.Id) || [], service: parseList(p.Service), automation: parseList(p.Automation),
    approvals: p.Approvals || '',
    materials: {
      bodyMaterials: m.BodyMaterials || '', seatLiningOptions: m.SeatLiningOptions || '',
      discAndStem: m.DiscAndStem || '', configurations: m.Configurations || '',
    },
    gallery: galleryByProduct.get(p.Id) || [],
    relatedProducts: relatedByProduct.get(p.Id) || [],
    specifications: specsByProduct.get(p.Id) || [],
    sections: sectionsByProduct.get(p.Id) || [],
    media: mediaByProduct.get(p.Id) || [],
  };
});

const outIndustries = industries.map((i) => ({
  id: i.Id, name: i.Name, image: i.ImagePath, ctx: i.Ctx, families: industryProductNames.get(i.Id) || [],
}));

const outDocs = docs.map((d) => {
  const primaryName = d.PrimaryProductId === 'ALL' ? 'All families' : (productById.get(d.PrimaryProductId)?.Name || '');
  const familyIdsForDoc = d.PrimaryProductId === 'ALL' ? ['ALL'] : [d.PrimaryProductId, ...parseList(d.RelatedProductIds)].filter(Boolean);
  return {
    id: d.Id, slug: d.Slug, type: d.Type, title: d.Title, fam: primaryName, date: d.Date, size: d.SizeLabel,
    pages: Number(d.Pages) || 0, pdfAsset: d.PdfAssetPath || null, coverAsset: d.CoverAssetPath || null,
    familyIds: familyIdsForDoc,
    // Blank/missing defaults to shown, so existing rows stay visible unless explicitly opted out.
    showInCatalog: d.ShowInCatalog === '' || d.ShowInCatalog == null ? true : isTrue(d.ShowInCatalog),
  };
});

const outPriceLists = priceLists.map((p) => ({
  id: p.Id, title: p.Title, fam: p.ProductId === 'ALL' ? 'All families' : (productById.get(p.ProductId)?.Name || ''),
  effective: p.Effective, version: p.Version, updated: p.Updated, access: p.Access, size: p.SizeLabel,
  pdfAsset: p.PdfAssetPath || null,
}));

const outResourceLibs = resourceLibs.map((r) => ({
  id: r.Id, label: r.Label, desc: r.Desc, latest: r.Latest, family: r.Family, fileType: r.FileType, pages: r.Pages,
  catalogDocSlug: r.CatalogDocSlug, resType: r.ResType, related: r.Related, date: r.Date, effective: r.Effective,
  version: r.Version, access: r.Access,
}));

const outCategories = [...categories].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))
  .map((c) => ({ id: c.Id, name: c.Name, slug: c.Slug, description: c.Description, image: c.ImagePath, status: c.Status }));

const outSubcategories = [...subcategories].sort((a, b) => (Number(a.SortOrder) || 0) - (Number(b.SortOrder) || 0))
  .map((s) => ({ id: s.Id, categoryId: s.CategoryId, name: s.Name, slug: s.Slug, menuName: s.MenuName, description: s.Description, image: s.ImagePath, status: s.Status }));

const output = {
  generatedAt: new Date().toISOString(),
  products: outProducts,
  categories: outCategories,
  subcategories: outSubcategories,
  industries: outIndustries,
  docs: outDocs,
  priceLists: outPriceLists,
  resourceLibs: outResourceLibs,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(output, null, 2) + '\n');

console.log(`Catalog generated: ${outProducts.length} active products (of ${products.length} total), ${outCategories.length} categories, ${outSubcategories.length} subcategories, ${outIndustries.length} industries, ${outDocs.length} docs, ${outPriceLists.length} price lists, ${outResourceLibs.length} resource libs — OK`);
console.log(`Wrote ${path.relative(ROOT, OUT_FILE)}`);
