import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const srcImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784798786720.png';
const srcHpImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799363349.png';
const srcToImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799547230.png';
const srcPlImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799615081.png';
const srcSaImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799817189.png';
const srcApImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799913361.png';
const srcCsImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784799979986.png';
const srcAboutTeamImg = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/95b38b68-e8e9-466b-88ef-9e034456fa56/media__1784801081130.png';

const destDir = path.resolve(__dirname, 'src/assets/products');
const destAboutDir = path.resolve(__dirname, 'src/assets/about');
const destImg = path.join(destDir, 'resilient-seated.png');
const destHpImg = path.join(destDir, 'high-performance.png');
const destToImg = path.join(destDir, 'triple-offset.png');
const destPlImg = path.join(destDir, 'pfa-lined.png');
const destSaImg = path.join(destDir, 'special-alloy.png');
const destApImg = path.join(destDir, 'automated.png');
const destCsImg = path.join(destDir, 'customized.png');
const destAboutTeamImg = path.join(destAboutDir, 'team-photo.jpg');

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
if (!fs.existsSync(destAboutDir)) fs.mkdirSync(destAboutDir, { recursive: true });
if (fs.existsSync(srcImg)) fs.copyFileSync(srcImg, destImg);
if (fs.existsSync(srcHpImg)) fs.copyFileSync(srcHpImg, destHpImg);
if (fs.existsSync(srcToImg)) fs.copyFileSync(srcToImg, destToImg);
if (fs.existsSync(srcPlImg)) fs.copyFileSync(srcPlImg, destPlImg);
if (fs.existsSync(srcSaImg)) fs.copyFileSync(srcSaImg, destSaImg);
if (fs.existsSync(srcApImg)) fs.copyFileSync(srcApImg, destApImg);
if (fs.existsSync(srcCsImg)) fs.copyFileSync(srcCsImg, destCsImg);
if (fs.existsSync(srcAboutTeamImg)) fs.copyFileSync(srcAboutTeamImg, destAboutTeamImg);

const destIndDir = path.resolve(__dirname, 'src/assets/industries');
if (!fs.existsSync(destIndDir)) fs.mkdirSync(destIndDir, { recursive: true });

const brainDir = 'C:/Users/SriBalaji/.gemini/antigravity-ide/brain/b9997ae3-38e3-40ec-9c32-64d8bde703f2';
const industryMap = {
  'data-centers.png': 'data_centers_photo_1784866133121.png',
  'oil-gas.png': 'oil_gas_photo_1784866146819.png',
  'refining.png': 'refining_photo_1784866161162.png',
  'petrochemical.png': 'petrochemical_photo_1784866174648.png',
  'chemical.png': 'chemical_photo_1784866188452.png',
  'power.png': 'power_photo_1784866202074.png',
  'pulp-paper.png': 'pulp_paper_photo_1784866214429.png',
  'mining.png': 'mining_photo_1784866228416.png',
  'marine.png': 'marine_photo_1784866241440.png',
  'hvac.png': 'hvac_photo_1784866255605.png',
  'food-beverage.png': 'food_beverage_photo_1784866268599.png',
  'pharma.png': 'pharma_photo_1784866280879.png',
  'transportation.png': 'transportation_photo_1784866295902.png',
  'hero.png': 'refining_photo_1784866161162.png'
};

for (const [targetName, srcName] of Object.entries(industryMap)) {
  const srcFile = path.join(brainDir, srcName);
  const destFile = path.join(destIndDir, targetName);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
})



