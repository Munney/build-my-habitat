import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { validateSpeciesCategory, logSkippedRow } from './species-guard.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = "habitatbuilde-20";

const SPECIES_MAP = {
  'Betta Fish': 'data/betta.json',
  'Leopard Gecko': 'data/leopard-gecko.json',
  'Bearded Dragon': 'data/bearded-dragon.json',
  'Ball Python': 'data/ball-python.json',
  'Crested Gecko': 'data/crested-gecko.json',
};

function extractAsinFromUrl(url) {
  if (!url) return null;

  if (/^[A-Z0-9]{10}$/i.test(url.trim())) {
    return url.trim().toUpperCase();
  }

  const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/gp\/product\/([A-Z0-9]{10})/i) || url.match(/\/product\/([A-Z0-9]{10})/i);
  if (asinMatch) {
    return asinMatch[1].toUpperCase();
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

function getItemTitle(item) {
  return item?.label || item?.name || '';
}

function usesNameField(speciesName) {
  return speciesName === 'Ball Python' || speciesName === 'Crested Gecko';
}

function generateUniqueId(baseId, label, existingIds) {
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 30);

  if (!existingIds.has(baseId)) {
    return baseId;
  }

  const candidate1 = `${baseId}_${slug}`;
  if (!existingIds.has(candidate1)) {
    return candidate1;
  }

  if (!existingIds.has(slug)) {
    return slug;
  }

  let counter = 1;
  while (existingIds.has(`${slug}_${counter}`)) {
    counter++;
  }
  return `${slug}_${counter}`;
}

function generateSearchUrl(label, category, species) {
  const keywords = encodeURIComponent(`${label} ${species === "Betta Fish" ? "aquarium" : "reptile"}`);
  return `https://www.amazon.com/s?k=${keywords}&tag=${AFFILIATE_TAG}`;
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
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim());

  if (lines.length < 2) {
    console.log('❌ CSV file is empty or has no data rows');
    return;
  }

  const dataLines = lines.slice(1);
  const { speciesData, speciesPaths } = loadSpeciesData();

  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  const existingIds = {};
  for (const [species, data] of Object.entries(speciesData)) {
    existingIds[species] = {};
    for (const [category, items] of Object.entries(data)) {
      if (!Array.isArray(items)) continue;
      existingIds[species][category] = new Set(items.map(item => item.id));
    }
  }

  for (const line of dataLines) {
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

    const [speciesCell, productId, productName, categoryCell, priceStr, , urlOrAsin] = parts;
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

    if (isNaN(newPrice) || newPrice < 0) {
      console.log(`⚠️  ${productName}: Invalid price "${priceStr}"`);
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

    const baseId = productId.trim();
    const trimmedName = productName.trim();
    const existingIndex = categoryItems.findIndex(item =>
      item.id === baseId && getItemTitle(item) === trimmedName
    );

    let finalId = baseId;

    if (existingIndex === -1) {
      const idExists = categoryItems.some(item => item.id === baseId);

      if (idExists || existingIds[speciesName][categoryName].has(baseId)) {
        finalId = generateUniqueId(baseId, trimmedName, existingIds[speciesName][categoryName]);
      }
    }

    const asin = url ? extractAsinFromUrl(url) : null;
    const titleField = usesNameField(speciesName) ? 'name' : 'label';

    const product = {
      id: finalId,
      [titleField]: trimmedName,
      price: newPrice,
    };

    if (existingIndex !== -1) {
      const existing = categoryItems[existingIndex];
      if (existing.size !== undefined) product.size = existing.size;
      if (existing.type !== undefined) product.type = existing.type;
      if (existing.flow !== undefined) product.flow = existing.flow;
      if (existing.description !== undefined) product.description = existing.description;
      if (existing.badge !== undefined) product.badge = existing.badge;
      if (existing.required !== undefined) product.required = existing.required;
    } else {
      if (categoryName === 'enclosures' && trimmedName.toLowerCase().includes('gallon')) {
        const sizeMatch = trimmedName.match(/(\d+)\s*gallon/i);
        if (sizeMatch) {
          product.size = parseInt(sizeMatch[1], 10);
        }
      }
      if (categoryName === 'substrates') {
        product.type = 'inert';
      }
      if (categoryName === 'decor') {
        product.type = 'safe';
      }
    }

    if (asin) {
      product.asin = asin;
      product.amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
      product.defaultProductUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
    } else {
      const searchUrl = generateSearchUrl(trimmedName, categoryName, speciesName);
      product.amazonSearchUrl = searchUrl;
      product.defaultProductUrl = searchUrl;
    }

    if (existingIndex !== -1) {
      const oldProduct = categoryItems[existingIndex];
      categoryItems[existingIndex] = { ...oldProduct, ...product };
      updatedCount++;
      console.log(`✅ Updated: ${trimmedName} (${finalId}) [${speciesName}]`);
    } else {
      categoryItems.push(product);
      existingIds[speciesName][categoryName].add(finalId);
      addedCount++;
      console.log(`➕ Added: ${trimmedName} (${finalId}) [${speciesName}]`);
    }
  }

  for (const [species, fullPath] of Object.entries(speciesPaths)) {
    fs.writeFileSync(fullPath, JSON.stringify(speciesData[species], null, 2));
  }

  console.log(`\n🎉 Complete!`);
  console.log(`   ➕ Added: ${addedCount} new products`);
  console.log(`   ✅ Updated: ${updatedCount} existing products`);
  console.log(`   ⏭️  Skipped: ${skippedCount} entries`);
}

const csvPath = process.argv[2] || path.join(__dirname, '../all-products-template.csv');

if (!fs.existsSync(csvPath)) {
  console.log(`❌ CSV file not found: ${csvPath}`);
  console.log('Usage: node sync-products-from-csv.js [path-to-csv]');
  process.exit(1);
}

console.log(`📂 Reading CSV from: ${csvPath}\n`);
processCSV(csvPath);
