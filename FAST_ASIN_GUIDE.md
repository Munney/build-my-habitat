# Fast ASIN Entry - 3 Methods

## Method 1: Fast Batch Mode (Recommended) ⚡

Paste multiple URLs at once!

```bash
npm run add-asin-fast
```

**How it works:**
1. Select species (Betta or Gecko)
2. See list of products without ASINs
3. Open Amazon in browser tabs
4. Search and copy URLs for each product
5. Paste all URLs at once (one per line)
6. Press Enter twice to finish
7. Done! All ASINs added automatically

**Example:**
```
Select species: 1
📦 Found 20 products without ASINs:
1. 5 Gallon Portrait (enclosures)
2. Sponge Filter + Air Pump (filtration)
...

Paste URLs:
URL 1: https://www.amazon.com/dp/B08XYZ1234
URL 2: https://www.amazon.com/dp/B09ABC5678
URL 3: https://www.amazon.com/dp/B10DEF9012
[Press Enter twice]

✅ Processing 3 URLs...
✅ 1. 5 Gallon Portrait: Added ASIN B08XYZ1234
✅ 2. Sponge Filter + Air Pump: Added ASIN B09ABC5678
✅ 3. 50W Adjustable Heater: Added ASIN B10DEF9012
```

## Method 2: CSV Template (Best for Many Products) 📊

Fill out a spreadsheet, then import!

### Step 1: Create Template
```bash
npm run add-asin-csv
```

This creates `asin-template.csv` with all products.

### Step 2: Fill It Out
1. Open `asin-template.csv` in Excel/Google Sheets
2. For each product, search Amazon
3. Copy the URL or ASIN into the last column
4. Save the file

### Step 3: Import
```bash
node scripts/add-asin-from-csv.js
```

All ASINs are imported automatically!

## Method 3: One-by-One (Original)

For when you want to be careful:
```bash
npm run add-asin
```

## Tips for Speed ⚡

1. **Use Multiple Tabs**: Open 5-10 Amazon tabs at once
2. **Search Efficiently**: Use product names directly
3. **Copy URLs Quickly**: Right-click → Copy link address
4. **Batch Mode**: Paste 10-20 URLs at once
5. **CSV Method**: Best if you have 30+ products

## Which Method to Use?

- **1-10 products**: Fast Batch Mode
- **10-30 products**: Fast Batch Mode (multiple sessions)
- **30+ products**: CSV Template method
- **Want to be careful**: One-by-one method

## Pro Tip 🎯

Do it in sessions:
- Morning: Add 10 ASINs (5 minutes)
- Afternoon: Add 10 more (5 minutes)
- Evening: Add the rest

You'll be done in no time!

