import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateSpeciesCategory, logSkippedRow } from './species-guard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = 'habitatbuilde-20';

const SPECIES_MAP = {
  'Betta Fish': 'data/betta.json',
  'Leopard Gecko': 'data/leopard-gecko.json',
  'Bearded Dragon': 'data/bearded-dragon.json',
  'Ball Python': 'data/ball-python.json',
  'Crested Gecko': 'data/crested-gecko.json',
};

function extractAsinFromUrl(url) {
  if (!url) return null;

  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/gp\/product\/([A-Z0-9]{10})/,
    /\/product\/([A-Z0-9]{10})/,
    /\/ASIN\/([A-Z0-9]{10})/,
    /[?&]asin=([A-Z0-9]{10})/,
    /([A-Z0-9]{10})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      if (/^[A-Z0-9]{10}$/.test(match[1])) {
        return match[1];
      }
    }
  }

  return null;
}

function resolveSpecies(speciesCell) {
  const trimmed = speciesCell.trim();
  if (SPECIES_MAP[trimmed]) return trimmed;

  const lower = trimmed.toLowerCase();
  for (const key of Object.keys(SPECIES_MAP)) {
    if (lower.includes(key.toLowerCase())) {
      return key;
    }
  }

  return null;
}

function loadSpeciesData() {
  const speciesData = {};
  const speciesPaths = {};

  for (const [species, relPath] of Object.entries(SPECIES_MAP)) {
    const fullPath = path.join(__dirname, '..', relPath);
    speciesPaths[species] = fullPath;
    speciesData[species] = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  }

  return { speciesData, speciesPaths };
}

function processCSV(csvFilePath) {
  let csvPath;

  if (csvFilePath) {
    csvPath = path.resolve(csvFilePath);
  } else {
    csvPath = path.join(__dirname, '../all-products-template.csv');
    if (!fs.existsSync(csvPath)) {
      csvPath = path.join(__dirname, '../asin-template.csv');
    }
  }

  if (!fs.existsSync(csvPath)) {
    console.error('❌ CSV file not found!');
    console.log(`   Looking for: ${csvPath}`);
    console.log('   Usage: node scripts/add-asin-from-csv.js [path-to-csv-file]');
    return;
  }

  console.log(`📂 Reading CSV from: ${csvPath}\n`);

  const csv = fs.readFileSync(csvPath, 'utf8');
  const lines = csv.split('\n').slice(1);
  const { speciesData, speciesPaths } = loadSpeciesData();

  let successCount = 0;
  let skippedCount = 0;
  let emptyCount = 0;

  for (const line of lines) {
    if (!line.trim()) continue;

    const parts = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    parts.push(current);

    if (parts.length < 7) continue;

    const [speciesCell, productId, productName, categoryCell, priceStr, currentAsin, urlOrAsin] = parts;
    const url = urlOrAsin.trim();
    const newPrice = parseFloat(priceStr.trim());
    const speciesName = resolveSpecies(speciesCell);
    const categoryName = categoryCell.toLowerCase().trim();

    if (!speciesName) {
      console.log(`⚠️  ${productName}: Unknown species "${speciesCell.trim()}"`);
      skippedCount++;
      continue;
    }

    const guard = validateSpeciesCategory(SPECIES_MAP, speciesName, categoryName);
    if (!guard.ok) {
      logSkippedRow(speciesCell, categoryCell, guard.targetFile || SPECIES_MAP[speciesName] || 'unknown');
      skippedCount++;
      continue;
    }

    const data = speciesData[speciesName];
    const categoryItems = data[categoryName];

    if (!Array.isArray(categoryItems)) {
      console.log(`⚠️  ${productName}: Category "${categoryName}" not found`);
      skippedCount++;
      continue;
    }

    const itemIndex = categoryItems.findIndex(item => item.id === productId.trim());
    if (itemIndex === -1) {
      console.log(`⚠️  ${productName}: Product ID "${productId}" not found`);
      skippedCount++;
      continue;
    }

    const updates = { ...categoryItems[itemIndex] };
    let updated = false;
    const oldPrice = updates.price;

    if (!isNaN(newPrice) && newPrice > 0 && oldPrice !== newPrice) {
      updates.price = newPrice;
      updated = true;
    }

    const asinFromCsv = currentAsin.trim();
    if (asinFromCsv && /^[A-Z0-9]{10}$/i.test(asinFromCsv)) {
      const normalizedAsin = asinFromCsv.toUpperCase();
      if (updates.asin !== normalizedAsin) {
        updates.asin = normalizedAsin;
        updates.amazonUrl = `https://www.amazon.com/dp/${normalizedAsin}?tag=${AFFILIATE_TAG}`;
        updates.defaultProductUrl = `https://www.amazon.com/dp/${normalizedAsin}?tag=${AFFILIATE_TAG}`;
        updated = true;
        successCount++;
      }
    } else if (url) {
      const asin = extractAsinFromUrl(url);
      if (asin) {
        updates.asin = asin;
        updates.amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
        updates.defaultProductUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
        updated = true;
        successCount++;
      } else {
        console.log(`⚠️  ${productName}: Could not extract ASIN from "${url.substring(0, 50)}"`);
        skippedCount++;
        if (updated) {
          categoryItems[itemIndex] = updates;
          console.log(`✅ ${productName}: price $${oldPrice.toFixed(2)} → $${newPrice.toFixed(2)}`);
        }
        continue;
      }
    } else {
      emptyCount++;
    }

    if (updated) {
      categoryItems[itemIndex] = updates;
      const changes = [];
      if (updates.asin) {
        changes.push(`ASIN ${updates.asin}`);
      }
      if (!isNaN(newPrice) && newPrice > 0 && oldPrice !== newPrice) {
        changes.push(`price $${oldPrice.toFixed(2)} → $${newPrice.toFixed(2)}`);
      }
      if (changes.length > 0) {
        console.log(`✅ ${productName}: ${changes.join(', ')} [${speciesName}]`);
      }
    }
  }

  for (const [species, fullPath] of Object.entries(speciesPaths)) {
    fs.writeFileSync(fullPath, JSON.stringify(speciesData[species], null, 2));
  }

  console.log(`\n🎉 Complete!`);
  console.log(`   ✅ Successfully added: ${successCount} ASINs`);
  if (emptyCount > 0) {
    console.log(`   ⏭️  Empty (no URL provided): ${emptyCount} entries`);
  }
  if (skippedCount > 0) {
    console.log(`   ⚠️  Skipped (errors): ${skippedCount} entries`);
  }
}

const csvFile = process.argv[2];
processCSV(csvFile);
