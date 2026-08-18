/*
 * Cross-checks every file under public/assets/maxseal/ against every asset
 * path referenced anywhere in the workbook. Never deletes anything -- this
 * is a read-only report so unused-asset cleanup stays a manual, explicit
 * decision.
 *
 * Run: npm run catalog:assets-report
 */

import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WORKBOOK_PATH = path.join(ROOT, 'catalog/MAXSEAL_CATALOG.xlsx');
const ASSETS_DIR = path.join(ROOT, 'public/assets/maxseal');

if (!fs.existsSync(WORKBOOK_PATH)) {
  console.error(`Workbook not found at ${path.relative(ROOT, WORKBOOK_PATH)}. Run "npm run catalog:migrate" first.`);
  process.exit(1);
}

const wb = new ExcelJS.Workbook();
await wb.xlsx.readFile(WORKBOOK_PATH);

const PATH_COLUMNS = {
  Products: ['ImagePath'],
  Categories: ['ImagePath'],
  Subcategories: ['ImagePath'],
  Industries: ['ImagePath'],
  Docs: ['PdfAssetPath', 'CoverAssetPath'],
  Gallery: ['ImagePath'],
  ProductMedia: ['Path'],
};

const referenced = new Set();
for (const [sheetName, cols] of Object.entries(PATH_COLUMNS)) {
  const ws = wb.getWorksheet(sheetName);
  if (!ws) continue;
  const headers = [];
  ws.getRow(1).eachCell({ includeEmpty: false }, (cell, colNumber) => { headers[colNumber] = String(cell.value ?? '').trim(); });
  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    headers.forEach((h, colNumber) => {
      if (!cols.includes(h)) return;
      const v = row.getCell(colNumber).value;
      const s = typeof v === 'string' ? v.trim() : '';
      if (s) referenced.add(s);
    });
  }
}

function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

const filesOnDisk = walk(ASSETS_DIR).map((abs) => ({
  abs,
  rootPath: '/' + path.relative(path.join(ROOT, 'public'), abs).split(path.sep).join('/'),
}));

const onDiskPaths = new Set(filesOnDisk.map((f) => f.rootPath));

const missing = [...referenced].filter((p) => !onDiskPaths.has(p));
const unused = filesOnDisk.filter((f) => !referenced.has(f.rootPath));

// Duplicate content detection (same bytes, different files) among on-disk assets
const hashes = new Map();
for (const f of filesOnDisk) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(f.abs)).digest('hex');
  if (!hashes.has(hash)) hashes.set(hash, []);
  hashes.get(hash).push(f.rootPath);
}
const duplicateGroups = [...hashes.values()].filter((paths) => paths.length > 1);

console.log('\nMax-Seal asset report\n');
console.log(`Referenced (in workbook): ${referenced.size}`);
console.log(`On disk (public/assets/maxseal): ${filesOnDisk.length}`);
console.log(`Missing (referenced but not on disk): ${missing.length}`);
if (missing.length) missing.forEach((p) => console.log(`  ✗ ${p}`));
console.log(`Unused (on disk but never referenced): ${unused.length}`);
if (unused.length) unused.forEach((f) => console.log(`  · ${f.rootPath}`));
console.log(`Duplicate content groups: ${duplicateGroups.length}`);
if (duplicateGroups.length) duplicateGroups.forEach((g) => console.log(`  = ${g.join('  ==  ')}`));

console.log('\nNothing was deleted or modified -- this is a read-only report.\n');

if (missing.length) process.exitCode = 1;
