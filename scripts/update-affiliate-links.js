import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
    'Bare Bottom (None)': null, // No product needed - free option
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
    'Paper Towels': null, // No product needed - free option
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

function generateAffiliateLink(item, keywords, species) {
  // If no keywords or item doesn't need a product, return null
  if (!keywords) {
    return null;
  }

  // Generate search URL with affiliate tag
  const searchQuery = encodeURIComponent(keywords);
  return `https://www.amazon.com/s?k=${searchQuery}&tag=${AFFILIATE_TAG}`;
}

function updateProductsWithAffiliateLinks(data, species) {
  const updated = { ...data };
  const keywordMap = SEARCH_KEYWORDS[species] || {};
  
  for (const [category, items] of Object.entries(updated)) {
    updated[category] = items.map(item => {
      // Check if this item explicitly has null keywords (no product needed)
      const explicitKeywords = keywordMap[item.label];
      if (explicitKeywords === null) {
        // Item doesn't need a product, remove any existing affiliate links
        const { amazonSearchUrl, defaultProductUrl, ...itemWithoutLinks } = item;
        return itemWithoutLinks;
      }
      
      // Use explicit keywords or generate default search terms
      const keywords = explicitKeywords || `${item.label} ${species === 'betta' ? 'aquarium' : 'reptile'}`;
      const affiliateUrl = generateAffiliateLink(item, keywords, species);
      
      const updatedItem = { ...item };
      
      // Add affiliate URL if available
      if (affiliateUrl) {
        updatedItem.amazonSearchUrl = affiliateUrl;
        // Also add as defaultProductUrl for backward compatibility
        updatedItem.defaultProductUrl = affiliateUrl;
      }
      
      return updatedItem;
    });
  }
  
  return updated;
}

// Main execution
function main() {
  console.log('🔗 Generating Amazon affiliate links...\n');
  
  const bettaPath = path.join(__dirname, '../data/betta.json');
  const geckoPath = path.join(__dirname, '../data/leopard-gecko.json');
  
  // Read existing data
  const bettaData = JSON.parse(fs.readFileSync(bettaPath, 'utf8'));
  const geckoData = JSON.parse(fs.readFileSync(geckoPath, 'utf8'));
  
  // Update with affiliate links
  console.log('📦 Processing Betta Fish products...');
  const updatedBetta = updateProductsWithAffiliateLinks(bettaData, 'betta');
  
  console.log('🦎 Processing Leopard Gecko products...');
  const updatedGecko = updateProductsWithAffiliateLinks(geckoData, 'leopard-gecko');
  
  // Write updated files
  fs.writeFileSync(bettaPath, JSON.stringify(updatedBetta, null, 2));
  fs.writeFileSync(geckoPath, JSON.stringify(updatedGecko, null, 2));
  
  console.log('\n✅ Success! All products now have Amazon affiliate links.');
  console.log(`   - Updated ${Object.keys(updatedBetta).length} betta categories`);
  console.log(`   - Updated ${Object.keys(updatedGecko).length} gecko categories`);
}

main();

