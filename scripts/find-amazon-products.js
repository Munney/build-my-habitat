import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AFFILIATE_TAG = 'habitatbuilde-20';

// Enhanced search keywords for better Amazon results
const SEARCH_KEYWORDS = {
  betta: {
    'Glass Bowl (1 Gallon)': '1 gallon glass bowl aquarium',
    '5 Gallon Portrait': '5 gallon aquarium tank portrait',
    '10 Gallon Standard': '10 gallon aquarium tank standard',
    '20 Gallon Long': '20 gallon long aquarium tank',
    'Sponge Filter + Air Pump': 'sponge filter air pump aquarium betta',
    'Hang-On-Back (HOB) Filter': 'hang on back filter aquarium HOB',
    'Internal Power Filter': 'internal power filter aquarium',
    '50W Adjustable Heater': '50w aquarium heater adjustable',
    '100W Adjustable Heater': '100w aquarium heater adjustable',
    'Glass Thermometer': 'aquarium thermometer glass',
    'Bare Bottom (None)': null,
    'Natural Gravel': 'aquarium gravel natural substrate',
    'Aquarium Sand': 'aquarium sand substrate',
    'Active Plant Soil': 'aquarium plant soil active substrate',
    'Plastic Plants': 'plastic aquarium plants',
    'Silk Plants': 'silk aquarium plants betta safe',
    'Live Plants (Anubias/Java Fern)': 'anubias java fern live aquarium plants',
    'Floating Betta Log': 'floating betta log hide',
    'Natural Driftwood': 'aquarium driftwood natural',
    'Water Conditioner (Dechlorinator)': 'water conditioner dechlorinator aquarium',
    'Beneficial Bacteria Starter': 'beneficial bacteria starter aquarium',
    'Master Test Kit': 'aquarium master test kit API freshwater'
  },
  'leopard-gecko': {
    '10 Gallon Tank': '10 gallon reptile tank leopard gecko',
    '20 Gallon Long': '20 gallon long reptile tank',
    '40 Gallon Breeder': '40 gallon breeder tank reptile',
    '4x2x2 PVC Enclosure': '4x2x2 pvc reptile enclosure',
    'Under Tank Heater (Mat)': 'under tank heater reptile UTH',
    'Halogen Flood Lamp': 'halogen flood lamp reptile heating',
    'Deep Heat Projector (DHP)': 'deep heat projector DHP reptile',
    'Digital Thermostat': 'reptile thermostat digital',
    'ShadeDweller UVB Kit': 'shadedweller uvb kit reptile',
    'Paper Towels': null,
    'Slate Tile / Stone': 'slate tile reptile substrate',
    'Non-Adhesive Shelf Liner': 'non adhesive shelf liner reptile',
    'Organic Topsoil Mix': 'organic topsoil reptile substrate',
    'Excavator Clay': 'excavator clay reptile substrate',
    'BioActive Terra Sahara': 'bioactive terra sahara substrate',
    'Reptile Sand (Calcium)': 'reptile sand calcium leopard gecko',
    'Warm Hide (Cave)': 'reptile hide cave warm',
    'Cool Hide (Rock)': 'reptile hide rock cool',
    'Humid Hide (Box)': 'humid hide box reptile',
    'Cork Bark Flat': 'cork bark reptile decor',
    'Climbing Branches': 'reptile climbing branches',
    'Pure Calcium (No D3)': 'reptile calcium no d3',
    'Calcium + D3': 'reptile calcium with d3',
    'Reptile Multivitamin': 'reptile multivitamin supplement'
  }
};

/**
 * Option 1: Using RapidAPI Amazon Product API
 * 
 * Supports "Real-Time Amazon Data" and other Amazon APIs
 * 
 * Set in .env:
 * - RAPIDAPI_KEY=your-api-key
 * - RAPIDAPI_HOST=the-api-host (optional, will try common ones)
 * 
 * Common hosts:
 * - real-time-amazon-data.p.rapidapi.com
 * - amazon-product-details1.p.rapidapi.com
 * - amazon-data-scraper.p.rapidapi.com
 */
async function searchAmazonViaRapidAPI(keywords) {
  // Use amazon-e-commerce-scraper API
  const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || 'amazon-e-commerce-scraper.p.rapidapi.com';
  const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
  const API_KEY = process.env.API_KEY; // This API needs api_key query param
  
  if (!RAPIDAPI_KEY) {
    console.warn('⚠️  RAPIDAPI_KEY not set. Skipping API search.');
    console.warn('   💡 Tip: Use "npm run add-asin" for manual entry instead');
    return null;
  }

  try {
    // Amazon E-Commerce Scraper uses path parameter + api_key query + RapidAPI headers
    // Format: /search/{searchQuery}?api_key=...
    // The search term goes directly in the path (not URL encoded, use + for spaces)
    const pathKeywords = keywords.replace(/\s+/g, '+'); // Replace spaces with +
    
    // Build endpoint
    let endpoint = `https://${RAPIDAPI_HOST}/search/${pathKeywords}`;
    
    // Add api_key query parameter (required for this API)
    if (API_KEY) {
      endpoint += `?api_key=${API_KEY}`;
    } else {
      // If no API_KEY env var, try without it (might work with headers only)
      console.warn('   ⚠️  API_KEY not set in .env - trying without api_key parameter');
    }

    // Basic Amazon Scraper requires both RapidAPI headers
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': RAPIDAPI_HOST
      }
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      console.error(`   API Error ${response.status}: ${errorText.substring(0, 200)}`);
      return null;
    }

    const data = await response.json();
    
    // Debug: log response structure for first call to understand format
    if (keywords.includes('5 gallon')) {
      console.log(`   Debug: Response type: ${Array.isArray(data) ? 'Array' : typeof data}`);
      if (!Array.isArray(data)) {
        console.log(`   Debug: Response keys: ${Object.keys(data).join(', ')}`);
      }
    }
    
    // Handle different response formats (basic-amazon-scraper and others)
    let product = null;
    
    // Check if response is an array directly
    if (Array.isArray(data) && data.length > 0) {
      product = data[0];
    }
    // Check for nested arrays/objects
    else if (data.results && Array.isArray(data.results) && data.results.length > 0) {
      product = data.results[0];
    } else if (data.products && Array.isArray(data.products) && data.products.length > 0) {
      product = data.products[0];
    } else if (data.data && Array.isArray(data.data) && data.data.length > 0) {
      product = data.data[0];
    } else if (data.items && Array.isArray(data.items) && data.items.length > 0) {
      product = data.items[0];
    } else if (data.asin) {
      product = data; // Single product response
    }
    
    if (product && product.asin) {
      return {
        asin: product.asin,
        title: product.title || product.name,
        price: product.price?.current_price || product.price?.raw || product.price || null,
        image: product.image || product.imageUrl,
        url: `https://www.amazon.com/dp/${product.asin}?tag=${AFFILIATE_TAG}`,
        rating: product.rating || product.starRating || null
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for "${keywords}":`, error.message);
    return null;
  }
}

/**
 * Option 2: Using Amazon PA-API 5.0 (Requires Associates account with 3+ sales)
 */
async function searchAmazonViaPAAPI(keywords) {
  const ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
  const SECRET_KEY = process.env.AMAZON_SECRET_KEY;
  
  if (!ACCESS_KEY || !SECRET_KEY) {
    return null;
  }

  // This would require installing: npm install paapi5-nodejs-sdk
  // Implementation would go here
  console.warn('PA-API implementation requires additional setup');
  return null;
}

/**
 * Option 3: Extract ASIN from Amazon search URL (Manual helper)
 * This function helps extract ASINs if you manually paste Amazon URLs
 */
function extractAsinFromUrl(url) {
  if (!url) return null;
  
  // Match ASIN in various Amazon URL formats
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/gp\/product\/([A-Z0-9]{10})/,
    /\/product\/([A-Z0-9]{10})/,
    /\/dp\/([A-Z0-9]{10})/,
    /\/ASIN\/([A-Z0-9]{10})/,
    /[?&]asin=([A-Z0-9]{10})/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Main function to find products and update JSON
 */
async function findAndUpdateProducts() {
  console.log('🔍 Finding Amazon products and extracting ASINs...\n');
  console.log('📝 Note: This script supports multiple methods:');
  console.log('   1. RapidAPI (set RAPIDAPI_KEY env var)');
  console.log('   2. Amazon PA-API (set AMAZON_ACCESS_KEY and AMAZON_SECRET_KEY)');
  console.log('   3. Manual ASIN entry: npm run add-asin (RECOMMENDED if API fails)\n');
  console.log('💡 If RapidAPI link doesn\'t work:');
  console.log('   - Go to https://rapidapi.com/ and search for "amazon product"');
  console.log('   - Subscribe to any Amazon API');
  console.log('   - Or use manual method: npm run add-asin\n');

  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  let updatedCount = 0;
  
  // Process Betta products
  console.log('📦 Processing Betta Fish products...');
  for (const [category, items] of Object.entries(bettaData)) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const keywords = SEARCH_KEYWORDS.betta[item.label];
      
      if (!keywords || item.asin) {
        // Skip if no keywords needed or already has ASIN
        continue;
      }
      
      console.log(`  Searching: ${item.label}...`);
      
      // Try RapidAPI first
      let productData = await searchAmazonViaRapidAPI(keywords);
      
      // If RapidAPI fails, try PA-API
      if (!productData) {
        productData = await searchAmazonViaPAAPI(keywords);
      }
      
      if (productData && productData.asin) {
        bettaData[category][i] = {
          ...item,
          asin: productData.asin,
          amazonUrl: productData.url,
          amazonTitle: productData.title,
          amazonPrice: productData.price,
          amazonImage: productData.image,
          amazonRating: productData.rating,
          // Update price if Amazon has better data
          price: productData.price || item.price
        };
        updatedCount++;
        console.log(`    ✅ Found: ${productData.title.substring(0, 50)}...`);
      } else {
        console.log(`    ⚠️  No product found (keeping search URL)`);
      }
      
      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Process Leopard Gecko products
  console.log('\n🦎 Processing Leopard Gecko products...');
  for (const [category, items] of Object.entries(geckoData)) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const keywords = SEARCH_KEYWORDS['leopard-gecko'][item.label];
      
      if (!keywords || item.asin) {
        continue;
      }
      
      console.log(`  Searching: ${item.label}...`);
      
      let productData = await searchAmazonViaRapidAPI(keywords);
      
      if (!productData) {
        productData = await searchAmazonViaPAAPI(keywords);
      }
      
      if (productData && productData.asin) {
        geckoData[category][i] = {
          ...item,
          asin: productData.asin,
          amazonUrl: productData.url,
          amazonTitle: productData.title,
          amazonPrice: productData.price,
          amazonImage: productData.image,
          amazonRating: productData.rating,
          price: productData.price || item.price
        };
        updatedCount++;
        console.log(`    ✅ Found: ${productData.title.substring(0, 50)}...`);
      } else {
        console.log(`    ⚠️  No product found (keeping search URL)`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // Save updated files
  fs.writeFileSync(bettaPath, JSON.stringify(bettaData, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(geckoData, null, 2));
  
  console.log(`\n✅ Complete! Updated ${updatedCount} products with ASINs.`);
  console.log('\n💡 To manually add ASINs:');
  console.log('   1. Search for product on Amazon');
  console.log('   2. Copy the product URL');
  console.log('   3. Add "asin": "B00XXXXXXX" to the product in JSON file');
  console.log('   4. Or use: node scripts/add-asin.js');
}

// Run if called directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/')) ||
                     process.argv[1] && import.meta.url.includes(path.basename(process.argv[1]));

if (isMainModule || !process.argv[1]?.includes('node_modules')) {
  findAndUpdateProducts().catch(console.error);
}

export { findAndUpdateProducts, extractAsinFromUrl };

