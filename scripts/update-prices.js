import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Update prices from Amazon using ASINs
 * 
 * This script fetches current prices from Amazon for products that have ASINs.
 * 
 * Options:
 * 1. Use RapidAPI (if you have a working API)
 * 2. Manual price updates via CSV
 * 3. Keep static prices (current default)
 */

// Helper to fetch price from Amazon (if API available)
async function fetchPriceFromAmazon(asin) {
  // This would use an API to get current price
  // For now, returns null (prices stay static)
  
  // TODO: If you get a working Amazon API, implement price fetching here
  // Example:
  // const response = await fetch(`https://api.example.com/product/${asin}`);
  // const data = await response.json();
  // return data.price;
  
  return null;
}

// Update prices from CSV file (manual method)
function updatePricesFromCSV() {
  const csvPath = path.join(__dirname, '../all-products-template.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.log('⚠️  CSV file not found. Prices will remain static.');
    return;
  }
  
  const csv = fs.readFileSync(csvPath, 'utf8');
  const lines = csv.split('\n').slice(1);
  
  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let updatedCount = 0;
  
  for (const line of lines) {
    if (!line.trim()) continue;
    
    // Parse CSV
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
    
    if (parts.length < 5) continue;
    
    const [species, productId, productName, category, priceStr] = parts;
    const newPrice = parseFloat(priceStr);
    
    if (isNaN(newPrice)) continue;
    
    // Update price in data
    const isBetta = species.trim().toLowerCase().includes('betta');
    const data = isBetta ? bettaData : geckoData;
    
    const categoryItems = data[category.trim()];
    if (!categoryItems) continue;
    
    const itemIndex = categoryItems.findIndex(item => item.id === productId.trim());
    if (itemIndex === -1) continue;
    
    // Only update if price changed
    if (categoryItems[itemIndex].price !== newPrice) {
      data[category.trim()][itemIndex].price = newPrice;
      updatedCount++;
      console.log(`💰 ${productName}: Updated price to $${newPrice.toFixed(2)}`);
    }
  }
  
  // Save files
  fs.writeFileSync(bettaPath, JSON.stringify(bettaData, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(geckoData, null, 2));
  
  if (updatedCount > 0) {
    console.log(`\n✅ Updated ${updatedCount} prices from CSV.`);
  } else {
    console.log('\n✅ No price changes detected.');
  }
}

// Main
console.log('💰 Price Update Tool\n');
console.log('📝 Note: Prices are currently static in JSON files.');
console.log('   They will NOT auto-update from Amazon.\n');
console.log('Options:');
console.log('1. Manual: Update prices in CSV, then run this script');
console.log('2. API: Get a working Amazon API to fetch prices automatically');
console.log('3. Keep static: Prices stay as you set them (current default)\n');

updatePricesFromCSV();

