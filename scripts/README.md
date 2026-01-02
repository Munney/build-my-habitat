# Amazon Affiliate Link Automation Scripts

This directory contains scripts to automatically find Amazon products and generate affiliate links.

## Available Scripts

### 1. `update-affiliate-links.js`
Generates Amazon search URLs with your affiliate tag for all products.

```bash
npm run update-affiliate-links
```

**What it does:**
- Creates search URLs with your affiliate tag (`habitatbuilde-20`)
- Works immediately without any API setup
- Good for getting started quickly

### 2. `find-amazon-products.js`
Automatically finds products on Amazon and extracts ASINs for direct product links.

```bash
npm run find-products
```

**Setup Options:**

#### Option A: RapidAPI (Recommended - Free tier available)
1. Sign up at https://rapidapi.com/apidojo/api/amazon-product-details1
2. Get your API key
3. Set environment variable:
   ```bash
   # Windows PowerShell
   $env:RAPIDAPI_KEY="your-api-key-here"
   npm run find-products
   
   # Windows CMD
   set RAPIDAPI_KEY=your-api-key-here
   npm run find-products
   
   # Mac/Linux
   export RAPIDAPI_KEY=your-api-key-here
   npm run find-products
   ```

#### Option B: Amazon PA-API 5.0 (Requires Associates account with 3+ sales)
1. Get API credentials from Amazon Associates Central
2. Set environment variables:
   ```bash
   export AMAZON_ACCESS_KEY="your-access-key"
   export AMAZON_SECRET_KEY="your-secret-key"
   npm run find-products
   ```

**What it does:**
- Searches Amazon for each product
- Extracts ASIN, price, title, image
- Updates JSON files with direct product links
- Creates affiliate links automatically

### 3. `add-asin-manual.js`
Interactive tool to manually add ASINs one by one.

```bash
npm run add-asin
```

**What it does:**
- Lists all products without ASINs
- Lets you paste Amazon URLs
- Extracts ASINs automatically
- Updates JSON files

**Batch Mode:**
Create a JSON file with product mappings:
```json
{
  "betta": {
    "5g": "https://www.amazon.com/dp/B00XXXXXXX",
    "sponge": "B00YYYYYYYY"
  },
  "leopard-gecko": {
    "heatmat": "https://www.amazon.com/dp/B00ZZZZZZZZ"
  }
}
```

Then run:
```bash
node scripts/add-asin-manual.js --batch path/to/mapping.json
```

## Workflow Recommendations

### Quick Start (No API Setup)
1. Run `npm run update-affiliate-links` to generate search URLs
2. Your site will work with search links immediately

### Full Automation (Recommended)
1. Sign up for RapidAPI (free tier)
2. Set `RAPIDAPI_KEY` environment variable
3. Run `npm run find-products` to get direct product links
4. Run periodically to update prices

### Manual Control
1. Use `npm run add-asin` to manually add ASINs for specific products
2. Good for curating exact products you want to recommend

## Environment Variables

Create a `.env` file in the project root (optional):
```
RAPIDAPI_KEY=your-rapidapi-key-here
AMAZON_ACCESS_KEY=your-amazon-access-key
AMAZON_SECRET_KEY=your-amazon-secret-key
```

Then install `dotenv` and load it in scripts:
```bash
npm install dotenv
```

## Notes

- All scripts respect rate limits (1 second delay between requests)
- Free items (Bare Bottom, Paper Towels) are automatically skipped
- Existing ASINs are preserved (won't overwrite)
- All affiliate links use your tag: `habitatbuilde-20`

