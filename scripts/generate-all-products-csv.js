import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const bettaPath = path.join(__dirname, '../data/betta.json');
const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');

const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));

// CSV header
let csv = 'Species,Product ID,Product Name,Category,Current Price,Current ASIN,Amazon URL or ASIN (Fill This)\n';

// Helper to escape CSV fields
function escapeCSV(field) {
  if (field === null || field === undefined) return '';
  const str = String(field);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Add Betta products
for (const [category, items] of Object.entries(bettaData)) {
  items.forEach(item => {
    // Skip free items that don't need products
    if (item.label === 'Bare Bottom (None)') return;
    
    csv += `Betta Fish,${escapeCSV(item.id)},${escapeCSV(item.label)},${escapeCSV(category)},${escapeCSV(item.price)},${escapeCSV(item.asin || '')},\n`;
  });
}

// Add Leopard Gecko products
for (const [category, items] of Object.entries(geckoData)) {
  items.forEach(item => {
    // Skip free items that don't need products
    if (item.label === 'Paper Towels') return;
    
    csv += `Leopard Gecko,${escapeCSV(item.id)},${escapeCSV(item.label)},${escapeCSV(category)},${escapeCSV(item.price)},${escapeCSV(item.asin || '')},\n`;
  });
}

// Write CSV file
const csvPath = path.join(__dirname, '../all-products-template.csv');
fs.writeFileSync(csvPath, csv);

console.log('✅ Created all-products-template.csv');
console.log(`   Total products: ${csv.split('\n').length - 2}`); // -2 for header and last empty line
console.log('\n📝 Instructions:');
console.log('   1. Open all-products-template.csv in Excel or Google Sheets');
console.log('   2. Fill in the "Amazon URL or ASIN (Fill This)" column');
console.log('   3. You can paste full Amazon URLs or just ASINs (like B08XYZ1234)');
console.log('   4. Save the file');
console.log('   5. Run: node scripts/add-asin-from-csv.js');
console.log('\n💡 Tip: You can search Amazon and copy URLs directly into the spreadsheet!');

