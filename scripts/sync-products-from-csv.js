import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = "habitatbuilde-20";

const bettaPath = path.join(__dirname, '../data/betta.json');
const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');

function extractAsinFromUrl(url) {
  if (!url) return null;
  
  // If it's just an ASIN (10 characters, alphanumeric)
  if (/^[A-Z0-9]{10}$/i.test(url.trim())) {
    return url.trim().toUpperCase();
  }
  
  // Extract from Amazon URL
  const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/i) || url.match(/\/gp\/product\/([A-Z0-9]{10})/i) || url.match(/\/product\/([A-Z0-9]{10})/i);
  if (asinMatch) {
    return asinMatch[1].toUpperCase();
  }
  
  return null;
}

function generateUniqueId(baseId, label, existingIds) {
  // Create a slug from the label
  const slug = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 30);
  
  // Try base ID first
  if (!existingIds.has(baseId)) {
    return baseId;
  }
  
  // Try baseId_slug
  const candidate1 = `${baseId}_${slug}`;
  if (!existingIds.has(candidate1)) {
    return candidate1;
  }
  
  // Try just slug
  if (!existingIds.has(slug)) {
    return slug;
  }
  
  // Add number suffix
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

function processCSV(csvFilePath) {
  const csvContent = fs.readFileSync(csvFilePath, 'utf8');
  const lines = csvContent.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    console.log('❌ CSV file is empty or has no data rows');
    return;
  }
  
  // Skip header
  const dataLines = lines.slice(1);
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let addedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  
  // Track existing IDs per category to avoid duplicates
  const existingIds = {
    betta: {},
    gecko: {}
  };
  
  // Initialize existing IDs
  for (const [category, items] of Object.entries(bettaData)) {
    existingIds.betta[category] = new Set(items.map(item => item.id));
  }
  for (const [category, items] of Object.entries(geckoData)) {
    existingIds.gecko[category] = new Set(items.map(item => item.id));
  }
  
  for (const line of dataLines) {
    if (!line.trim()) continue;
    
    // Parse CSV - handle quoted fields
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
    
    const [species, productId, productName, category, priceStr, currentAsin, urlOrAsin] = parts;
    const url = urlOrAsin.trim();
    const newPrice = parseFloat(priceStr.trim());
    
    if (isNaN(newPrice) || newPrice < 0) {
      console.log(`⚠️  ${productName}: Invalid price "${priceStr}"`);
      skippedCount++;
      continue;
    }
    
    // Determine species
    const isBetta = species.trim().toLowerCase().includes('betta');
    const data = isBetta ? bettaData : geckoData;
    const speciesKey = isBetta ? 'betta' : 'gecko';
    
    const categoryName = category.trim();
    if (!data[categoryName]) {
      console.log(`⚠️  ${productName}: Category "${categoryName}" not found`);
      skippedCount++;
      continue;
    }
    
    // Check if product exists by ID AND label (to handle variants)
    const baseId = productId.trim();
    const existingIndex = data[categoryName].findIndex(item => 
      item.id === baseId && item.label === productName.trim()
    );
    
    // If not found by exact match, check if ID exists but label is different (variant)
    let finalId = baseId;
    let isNewProduct = false;
    
    if (existingIndex === -1) {
      // Check if this ID already exists with a different label (it's a variant)
      const idExists = data[categoryName].some(item => item.id === baseId);
      
      if (idExists) {
        // This is a variant - generate unique ID
        finalId = generateUniqueId(baseId, productName, existingIds[speciesKey][categoryName]);
        isNewProduct = true;
      } else if (existingIds[speciesKey][categoryName].has(baseId)) {
        // ID conflict from previous processing - generate unique ID
        finalId = generateUniqueId(baseId, productName, existingIds[speciesKey][categoryName]);
        isNewProduct = true;
      } else {
        // Truly new product
        isNewProduct = true;
      }
    }
    
    // Extract ASIN if URL provided
    let asin = null;
    if (url) {
      asin = extractAsinFromUrl(url);
    }
    
    // Build product object
    const product = {
      id: finalId,
      label: productName.trim(),
      price: newPrice
    };
    
    // Preserve existing properties if updating
    if (existingIndex !== -1) {
      const existing = data[categoryName][existingIndex];
      // Preserve category-specific properties
      if (existing.size !== undefined) product.size = existing.size;
      if (existing.type !== undefined) product.type = existing.type;
      if (existing.flow !== undefined) product.flow = existing.flow;
    } else {
      // Set defaults for new products based on category
      if (categoryName === 'enclosures' && productName.toLowerCase().includes('gallon')) {
        const sizeMatch = productName.match(/(\d+)\s*gallon/i);
        if (sizeMatch) {
          product.size = parseInt(sizeMatch[1]);
        }
      }
      if (categoryName === 'substrates') {
        product.type = 'inert'; // Default, can be updated manually
      }
      if (categoryName === 'decor') {
        product.type = 'safe'; // Default, can be updated manually
      }
    }
    
    // Add Amazon links
    if (asin) {
      product.asin = asin;
      product.amazonUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
      product.defaultProductUrl = `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
    } else {
      // Generate search URL
      const searchUrl = generateSearchUrl(productName, categoryName, species.trim());
      product.amazonSearchUrl = searchUrl;
      product.defaultProductUrl = searchUrl;
    }
    
    // Update or add product
    if (existingIndex !== -1) {
      // Update existing
      const oldProduct = data[categoryName][existingIndex];
      data[categoryName][existingIndex] = { ...oldProduct, ...product };
      updatedCount++;
      console.log(`✅ Updated: ${productName} (${finalId})`);
    } else {
      // Add new
      data[categoryName].push(product);
      existingIds[speciesKey][categoryName].add(finalId);
      addedCount++;
      console.log(`➕ Added: ${productName} (${finalId})`);
    }
  }
  
  // Save files
  fs.writeFileSync(bettaPath, JSON.stringify(bettaData, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(geckoData, null, 2));
  
  console.log(`\n🎉 Complete!`);
  console.log(`   ➕ Added: ${addedCount} new products`);
  console.log(`   ✅ Updated: ${updatedCount} existing products`);
  console.log(`   ⏭️  Skipped: ${skippedCount} entries`);
}

// Main
const csvPath = process.argv[2];
if (!csvPath) {
  console.log('Usage: node sync-products-from-csv.js <path-to-csv>');
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  console.log(`❌ CSV file not found: ${csvPath}`);
  process.exit(1);
}

console.log(`📂 Reading CSV from: ${csvPath}\n`);
processCSV(csvPath);

