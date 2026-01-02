import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = 'habitatbuilde-20';

function extractAsinFromUrl(url) {
  if (!url) return null;
  
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/gp\/product\/([A-Z0-9]{10})/,
    /\/product\/([A-Z0-9]{10})/,
    /\/ASIN\/([A-Z0-9]{10})/,
    /[?&]asin=([A-Z0-9]{10})/,
    /([A-Z0-9]{10})/
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

function processCSV(csvFilePath) {
  // Use provided path or try default locations
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
  const lines = csv.split('\n').slice(1); // Skip header
  
  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let successCount = 0;
  let skippedCount = 0;
  let emptyCount = 0;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Parse CSV - handle quoted fields and multiple columns
    // Format: Species,Product ID,Product Name,Category,Current Price,Current ASIN,Amazon URL or ASIN
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
    parts.push(current); // Add last part
    
    if (parts.length < 7) continue;
    
    const [species, productId, productName, category, priceStr, currentAsin, urlOrAsin] = parts;
    const url = urlOrAsin.trim();
    const newPrice = parseFloat(priceStr.trim());
    
    // Determine species
    const isBetta = species.trim().toLowerCase().includes('betta');
    const data = isBetta ? bettaData : geckoData;
    
    const categoryItems = data[category.trim()];
    if (!categoryItems) {
      console.log(`⚠️  ${productName}: Category "${category}" not found`);
      skippedCount++;
      continue;
    }
    
    const itemIndex = categoryItems.findIndex(item => item.id === productId.trim());
    if (itemIndex === -1) {
      console.log(`⚠️  ${productName}: Product ID "${productId}" not found`);
      skippedCount++;
      continue;
    }
    
    // Prepare update object
    const updates = { ...categoryItems[itemIndex] };
    let updated = false;
    
    // Update price if provided and different
    const oldPrice = updates.price;
    if (!isNaN(newPrice) && newPrice > 0) {
      if (oldPrice !== newPrice) {
        updates.price = newPrice;
        updated = true;
      }
    }
    
    // Update ASIN if URL provided
    if (url) {
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
        // Still update price even if ASIN extraction failed
        if (updated) {
          data[category.trim()][itemIndex] = updates;
          const changes = [];
          if (!isNaN(newPrice) && newPrice > 0 && oldPrice !== newPrice) {
            changes.push(`price $${oldPrice.toFixed(2)} → $${newPrice.toFixed(2)}`);
          }
          if (changes.length > 0) {
            console.log(`✅ ${productName}: ${changes.join(', ')}`);
          }
        }
        continue;
      }
    } else {
      // No URL provided, but still update price if needed
      emptyCount++;
    }
    
    // Only update if something changed
    if (updated) {
      data[category.trim()][itemIndex] = updates;
      const changes = [];
      if (url && extractAsinFromUrl(url)) {
        changes.push(`ASIN ${extractAsinFromUrl(url)}`);
      }
      if (!isNaN(newPrice) && newPrice > 0 && oldPrice !== newPrice) {
        changes.push(`price $${oldPrice.toFixed(2)} → $${newPrice.toFixed(2)}`);
      }
      if (changes.length > 0) {
        console.log(`✅ ${productName}: ${changes.join(', ')}`);
      }
    }
  }
  
  // Save files
  fs.writeFileSync(bettaPath, JSON.stringify(bettaData, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(geckoData, null, 2));
  
  console.log(`\n🎉 Complete!`);
  console.log(`   ✅ Successfully added: ${successCount} ASINs`);
  if (emptyCount > 0) {
    console.log(`   ⏭️  Empty (no URL provided): ${emptyCount} entries`);
  }
  if (skippedCount > 0) {
    console.log(`   ⚠️  Skipped (errors): ${skippedCount} entries`);
  }
}

// Get CSV file path from command line argument
const csvFile = process.argv[2];
processCSV(csvFile);

