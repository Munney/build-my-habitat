# Amazon Product Images Implementation Guide

## Overview
This guide explains how to add Amazon product images to your site, including testing, implementation, and legal considerations.

## Files Created

### 1. Test Script
- **Location**: `scripts/test-amazon-images-simple.cjs`
- **Purpose**: Tests if Amazon product images are accessible
- **Usage**: `node scripts/test-amazon-images-simple.cjs`

### 2. Image Utility
- **Location**: `app/utils/amazonImages.js`
- **Purpose**: Helper functions for getting and checking Amazon product images

### 3. Product Image Component
- **Location**: `app/components/ProductImage.js`
- **Purpose**: Reusable component with fallback support for product images

## Current Status

✅ **Infrastructure Ready**: Components and utilities are set up
⏳ **Images Not Yet Implemented**: Placeholder structure is in place

## How to Test Image Accessibility

1. **Run the test script**:
   ```bash
   node scripts/test-amazon-images-simple.cjs
   ```

2. **Review results**: Check `amazon-image-test-results.json` for which images are accessible

3. **Check legal compliance**: Ensure you're following Amazon's terms of service

## Legal Considerations

### ⚠️ Important
- **Amazon Product Advertising API**: Official way to get product images (requires API access)
- **Direct Scraping**: May violate Amazon's Terms of Service
- **Best Practice**: Use Amazon Product Advertising API or a service like Keepa

## Implementation Options

### Option 1: Amazon Product Advertising API (Recommended)
1. Sign up for Amazon Associates
2. Get Product Advertising API credentials
3. Use API to fetch product images
4. Cache image URLs in your database

### Option 2: Pre-fetch and Store Images
1. Run a script to fetch image URLs for all products
2. Store URLs in your JSON data files or database
3. Use stored URLs in components

### Option 3: Third-Party Service
- Use services like Keepa API
- More reliable but may have costs

## Next Steps

1. **Test image accessibility**: Run the test script
2. **Choose implementation method**: Based on test results and legal considerations
3. **Update components**: Add image URLs to product data or fetch via API
4. **Implement in UI**: Update SelectionCard and VariantCard to show images

## Current Component Status

The `SelectionCard` component now accepts `asin` and `product` props, but images are not yet displayed. The placeholder structure is ready for when image URLs are available.

## Example Usage (Once Images Are Available)

```jsx
<SelectionCard
  label="10 Gallon Tank"
  price={65.99}
  asin="B09MQBB6CP"
  product={productData}
  // ... other props
/>
```

The component will automatically show the image if an ASIN is provided and the image URL is available.

