/**
 * Extract Amazon product image URLs and add them to your data files
 * 
 * This script:
 * 1. Reads your product data files
 * 2. For each product with an ASIN, extracts the main product image URL
 * 3. Adds the imageUrl field to each product
 * 4. Saves the updated data back to the files
 * 
 * Run with: node scripts/extract-amazon-images.cjs
 * 
 * ⚠️ Legal Note: This script extracts publicly accessible image URLs.
 * As an Amazon affiliate, you're generally allowed to use product images
 * on your affiliate site. However, always review Amazon's current terms.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const DATA_FILES = [
  'data/leopard-gecko.json',
  'data/betta.json'
];

const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds to avoid rate limiting

/**
 * Extract image URL from Amazon product page HTML
 */
function extractImageUrl(html) {
  // Try multiple patterns to find the main product image
  const patterns = [
    // Pattern 1: data-a-dynamic-image attribute (most common)
    /data-a-dynamic-image='({[^}]+})'/,
    /data-a-dynamic-image="({[^}]+})"/,
    
    // Pattern 2: Main image in imageBlock_feature_div
    /id="landingImage"[^>]*src="([^"]+)"/,
    /id="landingImage"[^>]*data-src="([^"]+)"/,
    
    // Pattern 3: Main image in JSON-LD structured data
    /"image":\s*"([^"]+)"/,
    
    // Pattern 4: Main image in product images array
    /"mainImages":\s*\["([^"]+)"\]/,
    
    // Pattern 5: Direct image URL in img tag
    /<img[^>]*id="landingImage"[^>]*src="([^"]+\.(jpg|png|webp))"/i,
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      try {
        let imageUrl = match[1];
        
        // If it's JSON, parse it
        if (imageUrl.startsWith('{')) {
          const imageData = JSON.parse(imageUrl);
          imageUrl = Object.keys(imageData)[0];
        } else if (imageUrl.startsWith('[')) {
          const images = JSON.parse(imageUrl);
          imageUrl = images[0];
        }
        
        // Clean up the URL (remove query parameters that might cause issues)
        if (imageUrl && imageUrl.startsWith('http')) {
          // Keep the URL but ensure it's a valid image URL
          const url = new URL(imageUrl);
          // Remove some problematic query params but keep essential ones
          url.searchParams.delete('_encoding');
          url.searchParams.delete('qid');
          return url.toString();
        }
      } catch (e) {
        // Try next pattern
        continue;
      }
    }
  }
  
  return null;
}

/**
 * Fetch product page and extract image URL
 */
function getProductImageUrl(asin) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.com/dp/${asin}`;
    
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
        // Stop after 200KB to save memory
        if (data.length > 200000) {
          res.destroy();
          resolve(null);
        }
      });
      
      res.on('end', () => {
        const imageUrl = extractImageUrl(data);
        resolve(imageUrl);
      });
    }).on('error', (err) => {
      console.error(`  ❌ Error fetching ${asin}: ${err.message}`);
      resolve(null);
    });
  });
}

/**
 * Process a single product
 */
async function processProduct(product, index, total) {
  const asin = product.asin;
  
  if (!asin) {
    return product; // No ASIN, skip
  }
  
  // If imageUrl already exists, skip
  if (product.imageUrl) {
    console.log(`  [${index + 1}/${total}] ${product.label}: Image URL already exists, skipping`);
    return product;
  }
  
  console.log(`  [${index + 1}/${total}] ${product.label} (${asin})...`);
  
  try {
    const imageUrl = await getProductImageUrl(asin);
    
    if (imageUrl) {
      console.log(`    ✅ Found image: ${imageUrl.substring(0, 60)}...`);
      return { ...product, imageUrl };
    } else {
      console.log(`    ❌ Could not extract image URL`);
      return product;
    }
  } catch (error) {
    console.log(`    ❌ Error: ${error.message}`);
    return product;
  }
}

/**
 * Process all products in a data file
 */
async function processDataFile(filePath) {
  console.log(`\n📁 Processing: ${filePath}`);
  
  const fullPath = path.join(__dirname, '..', filePath);
  const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  
  // Collect all products from all categories
  const allProducts = [];
  const categories = Object.keys(data);
  
  categories.forEach(category => {
    if (Array.isArray(data[category])) {
      data[category].forEach((product, index) => {
        allProducts.push({
          product,
          category,
          index,
          label: product.label || product.id || 'Unknown'
        });
      });
    }
  });
  
  console.log(`Found ${allProducts.length} products to process\n`);
  
  // Process each product with delay
  for (let i = 0; i < allProducts.length; i++) {
    const { product, category, index } = allProducts[i];
    const updatedProduct = await processProduct(product, i, allProducts.length);
    
    // Update the product in the data structure
    data[category][index] = updatedProduct;
    
    // Delay between requests to avoid rate limiting
    if (i < allProducts.length - 1) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
    }
  }
  
  // Save updated data
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  console.log(`\n✅ Saved updated data to ${filePath}`);
  
  // Summary
  const withImages = allProducts.filter(({ product }) => product.imageUrl).length;
  console.log(`📊 Summary: ${withImages}/${allProducts.length} products now have image URLs`);
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Amazon Product Image Extractor\n');
  console.log('This script will extract image URLs from Amazon product pages');
  console.log('and add them to your data files.\n');
  console.log('⚠️  Legal Note: As an Amazon affiliate, you\'re generally allowed');
  console.log('to use product images on your affiliate site.\n');
  
  for (const file of DATA_FILES) {
    try {
      await processDataFile(file);
    } catch (error) {
      console.error(`\n❌ Error processing ${file}:`, error.message);
    }
  }
  
  console.log('\n✅ Done! Check your data files for updated imageUrl fields.');
  console.log('\n💡 Next Steps:');
  console.log('1. Review the added image URLs in your data files');
  console.log('2. Test that images display correctly on your site');
  console.log('3. If some images failed, you can manually add them later');
}

// Run the script
main().catch(console.error);

