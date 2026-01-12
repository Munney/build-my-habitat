/**
 * Simple test script to check Amazon product image accessibility
 * Run with: node scripts/test-amazon-images-simple.cjs
 * 
 * This script tests a few sample ASINs to see if we can access their images
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Sample ASINs from your data files
const testAsins = [
  'B09MQBB6CP', // 10 Gallon Tank (gecko)
  'B0D3KPYCQ9', // 20 Gallon Long (gecko)
  'B09QKHHXSH', // 40 Gallon Breeder (gecko)
  'B0FD2P3ZKQ', // 5 Gallon Portrait (betta)
  'B0FW3RHQ9H', // 10 Gallon Standard (betta)
];

/**
 * Try to fetch product page and extract image URL
 */
function getProductImageUrl(asin) {
  return new Promise((resolve) => {
    const url = `https://www.amazon.com/dp/${asin}`;
    
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
        // Stop after 100KB to save memory
        if (data.length > 100000) {
          res.destroy();
          resolve(null);
        }
      });
      
      res.on('end', () => {
        // Try multiple patterns to find image URL
        const patterns = [
          /data-a-dynamic-image='({[^}]+})'/,
          /"mainImages":\s*(\[[^\]]+\])/,
          /"imageBlock_feature_div"[^>]*>[\s\S]*?src="([^"]+)"/,
        ];
        
        for (const pattern of patterns) {
          const match = data.match(pattern);
          if (match) {
            try {
              if (pattern === patterns[0]) {
                // First pattern returns JSON object
                const imageData = JSON.parse(match[1]);
                const imageUrl = Object.keys(imageData)[0];
                if (imageUrl && imageUrl.startsWith('http')) {
                  resolve(imageUrl);
                  return;
                }
              } else if (pattern === patterns[1]) {
                // Second pattern returns array
                const images = JSON.parse(match[1]);
                if (images && images[0] && images[0].startsWith('http')) {
                  resolve(images[0]);
                  return;
                }
              } else {
                // Third pattern returns direct URL
                if (match[1] && match[1].startsWith('http')) {
                  resolve(match[1]);
                  return;
                }
              }
            } catch (e) {
              // Continue to next pattern
            }
          }
        }
        
        resolve(null);
      });
    }).on('error', () => {
      resolve(null);
    });
  });
}

/**
 * Check if an image URL is accessible
 */
function checkImageAccessible(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ accessible: false, status: 'NO_URL' });
      return;
    }
    
    https.get(url, { timeout: 5000 }, (res) => {
      resolve({ 
        accessible: res.statusCode === 200, 
        status: res.statusCode,
        url 
      });
    }).on('error', () => {
      resolve({ accessible: false, status: 'ERROR', url });
    });
  });
}

/**
 * Main test function
 */
async function testImages() {
  console.log('🔍 Testing Amazon Product Image Accessibility\n');
  console.log(`Testing ${testAsins.length} products...\n`);
  
  const results = [];
  
  for (const asin of testAsins) {
    console.log(`Testing ASIN: ${asin}...`);
    
    try {
      // Try to get image URL from product page
      const imageUrl = await getProductImageUrl(asin);
      
      if (imageUrl) {
        console.log(`  ✅ Found image URL: ${imageUrl.substring(0, 80)}...`);
        
        // Check if image is accessible
        const check = await checkImageAccessible(imageUrl);
        
        if (check.accessible) {
          console.log(`  ✅ Image is accessible (Status: ${check.status})\n`);
          results.push({ asin, imageUrl, accessible: true, status: check.status });
        } else {
          console.log(`  ❌ Image not accessible (Status: ${check.status})\n`);
          results.push({ asin, imageUrl, accessible: false, status: check.status });
        }
      } else {
        console.log(`  ❌ Could not extract image URL from product page\n`);
        results.push({ asin, imageUrl: null, accessible: false, status: 'NOT_FOUND' });
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}\n`);
      results.push({ asin, imageUrl: null, accessible: false, status: 'ERROR', error: error.message });
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`Total tested: ${results.length}`);
  console.log(`Images found: ${results.filter(r => r.imageUrl).length}`);
  console.log(`Accessible: ${results.filter(r => r.accessible).length}`);
  console.log(`Not accessible: ${results.filter(r => !r.accessible).length}`);
  
  // Save results
  const resultsPath = path.join(__dirname, '../amazon-image-test-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log(`\n✅ Results saved to: ${resultsPath}`);
  console.log('\n💡 Next Steps:');
  console.log('1. Review the results to see which images are accessible');
  console.log('2. If images are accessible, you can implement image loading in components');
  console.log('3. Consider using Amazon Product Advertising API for reliable image access');
  console.log('4. Or use a service like Keepa API for product images');
}

// Run test
testImages().catch(console.error);

