/**
 * Helper script to add image URLs to your data files
 * 
 * After using the browser console script to extract image URLs,
 * you can use this script to add them to your JSON files.
 * 
 * Usage:
 * 1. Create a file called image-urls.json with this format:
 *    [
 *      { "asin": "B09MQBB6CP", "imageUrl": "https://..." },
 *      { "asin": "B0D3KPYCQ9", "imageUrl": "https://..." }
 *    ]
 * 
 * 2. Run: node scripts/add-image-urls-from-console.cjs
 */

const fs = require('fs');
const path = require('path');

const DATA_FILES = [
  'data/leopard-gecko.json',
  'data/betta.json'
];

const IMAGE_URLS_FILE = 'image-urls.json';

function updateDataFile(filePath, imageUrls) {
  const fullPath = path.join(__dirname, '..', filePath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  
  let updated = 0;
  const imageUrlMap = new Map();
  imageUrls.forEach(item => {
    if (item.asin && item.imageUrl) {
      imageUrlMap.set(item.asin, item.imageUrl);
    }
  });
  
  // Update all products in all categories
  Object.keys(data).forEach(category => {
    if (Array.isArray(data[category])) {
      data[category].forEach(product => {
        if (product.asin && imageUrlMap.has(product.asin)) {
          product.imageUrl = imageUrlMap.get(product.asin);
          updated++;
        }
      });
    }
  });
  
  if (updated > 0) {
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    console.log(`✅ Updated ${updated} products in ${filePath}`);
  }
  
  return updated;
}

function main() {
  console.log('📝 Adding Image URLs to Data Files\n');
  
  const imageUrlsPath = path.join(__dirname, '..', IMAGE_URLS_FILE);
  
  if (!fs.existsSync(imageUrlsPath)) {
    console.log(`❌ File not found: ${IMAGE_URLS_FILE}`);
    console.log('\nCreate this file with the following format:');
    console.log(JSON.stringify([
      { "asin": "B09MQBB6CP", "imageUrl": "https://m.media-amazon.com/images/I/..." },
      { "asin": "B0D3KPYCQ9", "imageUrl": "https://m.media-amazon.com/images/I/..." }
    ], null, 2));
    return;
  }
  
  const imageUrls = JSON.parse(fs.readFileSync(imageUrlsPath, 'utf8'));
  console.log(`Found ${imageUrls.length} image URLs to add\n`);
  
  let totalUpdated = 0;
  DATA_FILES.forEach(file => {
    const updated = updateDataFile(file, imageUrls);
    totalUpdated += updated;
  });
  
  console.log(`\n✅ Done! Updated ${totalUpdated} products total.`);
}

main();

