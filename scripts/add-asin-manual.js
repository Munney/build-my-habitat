import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = 'habitatbuilde-20';

// Helper to extract ASIN from Amazon URL
function extractAsinFromUrl(url) {
  if (!url) return null;
  
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/gp\/product\/([A-Z0-9]{10})/,
    /\/product\/([A-Z0-9]{10})/,
    /\/ASIN\/([A-Z0-9]{10})/,
    /[?&]asin=([A-Z0-9]{10})/,
    /([A-Z0-9]{10})/ // Just a plain ASIN
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      // Validate ASIN format (10 alphanumeric characters)
      if (/^[A-Z0-9]{10}$/.test(match[1])) {
        return match[1];
      }
    }
  }
  
  return null;
}

// Interactive CLI to add ASINs
async function addAsinInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

  console.log('🔗 Manual ASIN Adder\n');
  console.log('This tool helps you add ASINs to your products.\n');

  // Choose species
  console.log('Select species:');
  console.log('1. Betta Fish');
  console.log('2. Leopard Gecko');
  const speciesChoice = await question('Enter choice (1 or 2): ');
  
  const species = speciesChoice === '1' ? 'betta' : 'leopard-gecko';
  const filePath = path.join(__dirname, `../data/${species === 'betta' ? 'betta' : 'leopard-gecko'}.json`);
  
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  // List all products without ASINs
  const productsWithoutAsin = [];
  for (const [category, items] of Object.entries(data)) {
    items.forEach(item => {
      if (!item.asin && item.label !== 'Bare Bottom (None)' && item.label !== 'Paper Towels') {
        productsWithoutAsin.push({ category, ...item });
      }
    });
  }
  
  if (productsWithoutAsin.length === 0) {
    console.log('\n✅ All products already have ASINs!');
    rl.close();
    return;
  }
  
  console.log(`\n📦 Found ${productsWithoutAsin.length} products without ASINs:\n`);
  productsWithoutAsin.forEach((item, index) => {
    console.log(`${index + 1}. ${item.label} (${item.category})`);
  });
  
  const productIndex = parseInt(await question(`\nEnter product number (1-${productsWithoutAsin.length}): `)) - 1;
  
  if (productIndex < 0 || productIndex >= productsWithoutAsin.length) {
    console.log('❌ Invalid selection');
    rl.close();
    return;
  }
  
  const selectedProduct = productsWithoutAsin[productIndex];
  console.log(`\nSelected: ${selectedProduct.label}`);
  
  const amazonUrl = await question('Paste Amazon product URL or ASIN: ');
  const asin = extractAsinFromUrl(amazonUrl);
  
  if (!asin) {
    console.log('❌ Could not extract ASIN from URL. Make sure it\'s a valid Amazon product URL.');
    rl.close();
    return;
  }
  
  console.log(`\n✅ Extracted ASIN: ${asin}`);
  
  // Find and update the product in data
  const categoryItems = data[selectedProduct.category];
  const itemIndex = categoryItems.findIndex(item => item.id === selectedProduct.id);
  
  if (itemIndex === -1) {
    console.log('❌ Could not find product in data');
    rl.close();
    return;
  }
  
  // Update the product
  data[selectedProduct.category][itemIndex] = {
    ...categoryItems[itemIndex],
    asin: asin,
    amazonUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`,
    defaultProductUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
  };
  
  // Save file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  console.log(`\n✅ Successfully added ASIN to ${selectedProduct.label}!`);
  console.log(`   Affiliate link: https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`);
  
  const addMore = await question('\nAdd another ASIN? (y/n): ');
  if (addMore.toLowerCase() === 'y') {
    rl.close();
    addAsinInteractive();
  } else {
    rl.close();
  }
}

// Batch mode: add ASINs from a JSON file
function addAsinBatch(mappingFile) {
  const mappingPath = path.resolve(mappingFile);
  const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'));
  
  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let updated = 0;
  
  // Process betta mappings
  if (mapping.betta) {
    for (const [productId, asinOrUrl] of Object.entries(mapping.betta)) {
      const asin = extractAsinFromUrl(asinOrUrl);
      if (!asin) continue;
      
      // Find product in all categories
      for (const [category, items] of Object.entries(bettaData)) {
        const itemIndex = items.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
          bettaData[category][itemIndex] = {
            ...items[itemIndex],
            asin: asin,
            amazonUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`,
            defaultProductUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
          };
          updated++;
          break;
        }
      }
    }
  }
  
  // Process gecko mappings
  if (mapping['leopard-gecko']) {
    for (const [productId, asinOrUrl] of Object.entries(mapping['leopard-gecko'])) {
      const asin = extractAsinFromUrl(asinOrUrl);
      if (!asin) continue;
      
      for (const [category, items] of Object.entries(geckoData)) {
        const itemIndex = items.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
          geckoData[category][itemIndex] = {
            ...items[itemIndex],
            asin: asin,
            amazonUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`,
            defaultProductUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
          };
          updated++;
          break;
        }
      }
    }
  }
  
  fs.writeFileSync(bettaPath, JSON.stringify(bettaData, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(geckoData, null, 2));
  
  console.log(`✅ Updated ${updated} products with ASINs from batch file.`);
}

// Main
const args = process.argv.slice(2);
if (args[0] === '--batch' && args[1]) {
  addAsinBatch(args[1]);
} else {
  addAsinInteractive();
}

