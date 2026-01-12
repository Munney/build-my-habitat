# Batch Image Extraction Guide

## The Easy Way: Batch Process Multiple Products

Instead of adding images one by one, you can extract multiple image URLs and add them all at once!

## Step 1: Extract Image URLs

1. **Open the browser script**: `scripts/browser-image-extractor.js`
2. **For each product**:
   - Visit the Amazon product page
   - Press F12 → Console tab
   - Paste the script and press Enter
   - Copy the JSON output (e.g., `{ "asin": "B09MQBB6CP", "imageUrl": "https://..." }`)

## Step 2: Collect All URLs

Create a file called `image-urls.json` in your project root with this format:

```json
[
  { "asin": "B09MQBB6CP", "imageUrl": "https://m.media-amazon.com/images/I/71Eg6lBQuEL._AC_SX466_.jpg" },
  { "asin": "B0D3KPYCQ9", "imageUrl": "https://m.media-amazon.com/images/I/..." },
  { "asin": "B09QKHHXSH", "imageUrl": "https://m.media-amazon.com/images/I/..." }
]
```

## Step 3: Batch Add All URLs

Run this command:
```bash
node scripts/add-image-urls-from-console.cjs
```

This will automatically:
- Find all matching ASINs in your data files
- Add the `imageUrl` field to each product
- Update both `data/leopard-gecko.json` and `data/betta.json`

## Tips for Efficiency

1. **Do 10-20 products at a time** - Don't try to do all 80+ at once
2. **Keep the browser script open** - Copy it once, use it many times
3. **Use multiple tabs** - Open several Amazon product pages in different tabs
4. **Copy the JSON directly** - The script outputs JSON format ready to paste

## Example Workflow

1. Visit: `https://www.amazon.com/dp/B09MQBB6CP`
2. Run script → Get: `{ "asin": "B09MQBB6CP", "imageUrl": "https://..." }`
3. Add to `image-urls.json`
4. Repeat for 10-20 products
5. Run batch script: `node scripts/add-image-urls-from-console.cjs`
6. Done! All images added at once.

## Quick Copy Template

When you extract an image URL, the script shows:
```json
{
  "asin": "B09MQBB6CP",
  "imageUrl": "https://m.media-amazon.com/images/I/71Eg6lBQuEL._AC_SX466_.jpg"
}
```

Just copy that entire JSON object and add it to your `image-urls.json` array!

