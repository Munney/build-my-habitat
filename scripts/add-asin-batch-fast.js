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
      if (/^[A-Z0-9]{10}$/.test(match[1])) {
        return match[1];
      }
    }
  }
  
  return null;
}

// Fast batch mode - paste multiple URLs at once
async function addAsinBatchFast() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));

  console.log('🚀 Fast Batch ASIN Adder\n');
  console.log('Paste multiple Amazon URLs (one per line) and press Enter twice when done.\n');

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
  
  console.log('\n💡 Instructions:');
  console.log('   1. Open Amazon.com in your browser');
  console.log('   2. For each product above, search and find a good product');
  console.log('   3. Copy the Amazon URL');
  console.log('   4. Paste all URLs below (one per line, in order)');
  console.log('   5. Press Enter twice when done\n');
  
  const urls = [];
  let lineCount = 0;
  
  console.log('Paste URLs (press Enter twice when done):');
  
  while (true) {
    const line = await question(`URL ${lineCount + 1} (or press Enter twice to finish): `);
    
    if (line.trim() === '' && lineCount > 0) {
      // Check if this is the second empty line (finish signal)
      const nextLine = await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(''), 100);
        rl.once('line', (line) => {
          clearTimeout(timeout);
          resolve(line);
        });
      });
      
      if (nextLine.trim() === '') {
        break;
      } else {
        urls.push(nextLine.trim());
        lineCount++;
      }
    } else if (line.trim() !== '') {
      urls.push(line.trim());
      lineCount++;
    } else if (lineCount === 0) {
      // First empty line, wait for second
      continue;
    } else {
      break;
    }
  }
  
  if (urls.length === 0) {
    console.log('\n❌ No URLs provided.');
    rl.close();
    return;
  }
  
  console.log(`\n✅ Processing ${urls.length} URLs...\n`);
  
  let successCount = 0;
  let skippedCount = 0;
  
  // Match URLs to products in order
  for (let i = 0; i < Math.min(urls.length, productsWithoutAsin.length); i++) {
    const url = urls[i];
    const product = productsWithoutAsin[i];
    
    const asin = extractAsinFromUrl(url);
    
    if (!asin) {
      console.log(`⚠️  ${i + 1}. ${product.label}: Could not extract ASIN from URL`);
      skippedCount++;
      continue;
    }
    
    // Find and update the product
    const categoryItems = data[product.category];
    const itemIndex = categoryItems.findIndex(item => item.id === product.id);
    
    if (itemIndex === -1) {
      console.log(`⚠️  ${i + 1}. ${product.label}: Product not found in data`);
      skippedCount++;
      continue;
    }
    
    // Update the product
    data[product.category][itemIndex] = {
      ...categoryItems[itemIndex],
      asin: asin,
      amazonUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`,
      defaultProductUrl: `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`
    };
    
    successCount++;
    console.log(`✅ ${i + 1}. ${product.label}: Added ASIN ${asin}`);
  }
  
  // Save file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  
  console.log(`\n🎉 Complete!`);
  console.log(`   ✅ Successfully added: ${successCount} ASINs`);
  if (skippedCount > 0) {
    console.log(`   ⚠️  Skipped: ${skippedCount} URLs`);
  }
  
  rl.close();
}

// CSV mode - create a template file they can fill out
function createCSVTemplate() {
  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let csv = 'Product ID,Product Name,Category,Amazon URL or ASIN\n';
  
  // Add betta products
  for (const [category, items] of Object.entries(bettaData)) {
    items.forEach(item => {
      if (!item.asin && item.label !== 'Bare Bottom (None)') {
        csv += `${item.id},"${item.label}",${category},\n`;
      }
    });
  }
  
  // Add gecko products
  for (const [category, items] of Object.entries(geckoData)) {
    items.forEach(item => {
      if (!item.asin && item.label !== 'Paper Towels') {
        csv += `${item.id},"${item.label}",${category},\n`;
      }
    });
  }
  
  const csvPath = path.join(__dirname, '../asin-template.csv');
  fs.writeFileSync(csvPath, csv);
  
  console.log('✅ Created asin-template.csv');
  console.log('   1. Open it in Excel/Google Sheets');
  console.log('   2. Fill in the "Amazon URL or ASIN" column');
  console.log('   3. Run: node scripts/add-asin-from-csv.js');
}

// Main
const args = process.argv.slice(2);
if (args[0] === '--csv') {
  createCSVTemplate();
} else {
  addAsinBatchFast();
}

