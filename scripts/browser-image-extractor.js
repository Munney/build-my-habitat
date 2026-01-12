/**
 * Browser Console Script to Extract Amazon Product Image URLs
 * 
 * INSTRUCTIONS:
 * 1. Open an Amazon product page (e.g., https://www.amazon.com/dp/B09MQBB6CP)
 * 2. Press F12 to open Developer Tools
 * 3. Click on the "Console" tab (usually the default tab, looks like >_ or says "Console")
 * 4. You'll see a text input at the bottom with a ">" prompt
 * 5. Copy this ENTIRE script (from line 14 to the end)
 * 6. Paste it into the console input area
 * 7. Press Enter
 * 8. The script will display the image URL and copy it to your clipboard
 * 
 * Then you can add it to your JSON data files manually, or use the update script below
 */

(function() {
  // Try multiple methods to get the main product image
  let imageUrl = null;
  
  // Method 1: Get from landingImage element
  const landingImage = document.getElementById('landingImage');
  if (landingImage) {
    imageUrl = landingImage.src || landingImage.getAttribute('data-src');
    if (imageUrl && !imageUrl.includes('data:image')) {
      // Clean up the URL
      const url = new URL(imageUrl);
      url.searchParams.delete('_encoding');
      url.searchParams.delete('qid');
      imageUrl = url.toString();
    }
  }
  
  // Method 2: Get from data-a-dynamic-image attribute
  if (!imageUrl) {
    const dynamicImage = document.querySelector('[data-a-dynamic-image]');
    if (dynamicImage) {
      try {
        const imageData = JSON.parse(dynamicImage.getAttribute('data-a-dynamic-image'));
        imageUrl = Object.keys(imageData)[0];
      } catch (e) {
        // Try alternative format
        const altData = dynamicImage.getAttribute('data-a-dynamic-image');
        if (altData) {
          const match = altData.match(/"([^"]+\.(jpg|png|webp))"/i);
          if (match) imageUrl = match[1];
        }
      }
    }
  }
  
  // Method 3: Get from main image in imageBlock
  if (!imageUrl) {
    const imageBlock = document.querySelector('#imageBlock_feature_div img');
    if (imageBlock) {
      imageUrl = imageBlock.src || imageBlock.getAttribute('data-src');
    }
  }
  
  // Method 4: Get from JSON-LD structured data
  if (!imageUrl) {
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        const data = JSON.parse(jsonLd.textContent);
        if (data.image) {
          imageUrl = Array.isArray(data.image) ? data.image[0] : data.image;
        }
      } catch (e) {
        // Try multiple JSON-LD scripts
        const allJsonLd = document.querySelectorAll('script[type="application/ld+json"]');
        for (const script of allJsonLd) {
          try {
            const data = JSON.parse(script.textContent);
            if (data.image) {
              imageUrl = Array.isArray(data.image) ? data.image[0] : data.image;
              break;
            }
          } catch (e) {}
        }
      }
    }
  }
  
  // Get ASIN from URL
  const asinMatch = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
  const asin = asinMatch ? asinMatch[1] : 'UNKNOWN';
  
    // Restore console functions
  console.warn = originalWarn;
  console.error = originalError;
  
  // Display results
  if (imageUrl) {
    console.log('%c✅ Image URL Found!', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('ASIN:', asin);
    console.log('Image URL:', imageUrl);
    
    // Try to copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(imageUrl).then(() => {
        console.log('%c📋 Image URL copied to clipboard!', 'color: blue; font-weight: bold;');
      }).catch(() => {
        console.log('⚠️ Could not copy to clipboard, but URL is displayed above');
      });
    }
    
    // Create a preview
    const preview = document.createElement('div');
    preview.style.cssText = 'position: fixed; top: 20px; right: 20px; background: white; padding: 20px; border: 2px solid #333; border-radius: 8px; z-index: 10000; max-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
    preview.innerHTML = `
      <h3 style="margin: 0 0 10px 0; font-size: 14px;">✅ Image Found</h3>
      <img src="${imageUrl}" style="max-width: 100%; height: auto; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;" />
      <p style="margin: 0; font-size: 12px; word-break: break-all; color: #666;">${imageUrl}</p>
      <button onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 5px 10px; cursor: pointer;">Close</button>
    `;
    document.body.appendChild(preview);
    
    return {
      asin,
      imageUrl,
      success: true
    };
  } else {
    console.log('%c❌ Could not find image URL', 'color: red; font-size: 16px; font-weight: bold;');
    console.log('Try scrolling the page or waiting for images to load, then run this script again.');
    return {
      asin,
      imageUrl: null,
      success: false
    };
  }
})();

