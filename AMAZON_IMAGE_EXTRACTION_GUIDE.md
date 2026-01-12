# Amazon Image Extraction Guide

Since automated extraction doesn't work (Amazon blocks it), here's how to manually extract and add image URLs.

## Method 1: Browser Console Script (Recommended)

### Step 1: Extract Image URLs
1. Open an Amazon product page (e.g., `https://www.amazon.com/dp/B09MQBB6CP`)
2. Open browser console:
   - **Chrome/Edge**: Press `F12` or `Right-click → Inspect → Console tab`
   - **Firefox**: Press `F12` or `Right-click → Inspect Element → Console tab`
3. Copy the entire contents of `scripts/browser-image-extractor.js`
4. Paste it into the console and press `Enter`
5. The script will:
   - Display the image URL in the console
   - Copy it to your clipboard
   - Show a preview popup with the image

### Step 2: Collect Image URLs
Create a file called `image-urls.json` in your project root with this format:

```json
[
  { "asin": "B09MQBB6CP", "imageUrl": "https://m.media-amazon.com/images/I/..." },
  { "asin": "B0D3KPYCQ9", "imageUrl": "https://m.media-amazon.com/images/I/..." }
]
```

### Step 3: Add to Data Files
Run the helper script:
```bash
node scripts/add-image-urls-from-console.cjs
```

This will automatically add all the image URLs to your JSON data files.

## Method 2: Manual Copy-Paste

1. Visit each Amazon product page
2. Right-click on the main product image
3. Select "Copy image address" or "Copy image URL"
4. Manually add `"imageUrl": "..."` to each product in your JSON files

## Legal Considerations

✅ **You ARE allowed to use Amazon product images** because:
- You're an Amazon affiliate (you have the `tag=habitatbuilde-20` in your URLs)
- Amazon's affiliate program allows using product images on affiliate sites
- The images are publicly accessible via their CDN

⚠️ **Best Practices**:
- Use the images only on pages that link to Amazon
- Don't modify or edit the images
- Make sure your affiliate links are properly tagged

## Quick Workflow

1. Open `scripts/browser-image-extractor.js` in a text editor
2. For each product:
   - Visit the Amazon product page
   - Open console (F12)
   - Paste the script
   - Copy the image URL
   - Add to `image-urls.json`
3. When you have 10-20 URLs collected, run the update script
4. Repeat until all products have images

## Tips

- **Batch Processing**: Do 10-20 products at a time, then run the update script
- **Verify Images**: After adding URLs, check that images display correctly on your site
- **Missing Images**: If an image doesn't work, try visiting the product page again and re-extracting

## Troubleshooting

**Script doesn't find image:**
- Make sure the page is fully loaded
- Try scrolling down to trigger lazy loading
- Refresh the page and try again

**Image URL doesn't work:**
- Some Amazon image URLs expire or change
- Re-extract the URL from the product page
- Make sure you're using the main product image, not a thumbnail

