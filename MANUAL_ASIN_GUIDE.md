# Manual ASIN Entry Guide

## Why Manual is Better

✅ **More Reliable** - No API failures or rate limits  
✅ **Better Control** - You choose which products to recommend  
✅ **Faster** - No waiting for API calls  
✅ **Free** - No API costs  

## Quick Start

### Step 1: Run the Tool
```bash
npm run add-asin
```

### Step 2: Follow the Prompts

1. **Choose Species**: Betta Fish or Leopard Gecko
2. **See Products**: It shows all products without ASINs
3. **Pick a Product**: Enter the number (e.g., "1")
4. **Go to Amazon**: Search for that product
5. **Find a Good Product**: Click on one you want to recommend
6. **Copy URL**: Copy the Amazon product URL
7. **Paste**: Paste it into the tool
8. **Done!** It extracts the ASIN automatically

### Example Flow

```
🔗 Manual ASIN Adder

Select species:
1. Betta Fish
2. Leopard Gecko
Enter choice (1 or 2): 1

📦 Found 20 products without ASINs:

1. 5 Gallon Portrait (enclosures)
2. Sponge Filter + Air Pump (filtration)
3. 50W Adjustable Heater (heating)
...

Enter product number (1-20): 1

Selected: 5 Gallon Portrait
Paste Amazon product URL or ASIN: https://www.amazon.com/dp/B08XYZ1234

✅ Extracted ASIN: B08XYZ1234
✅ Successfully added ASIN to 5 Gallon Portrait!
   Affiliate link: https://www.amazon.com/dp/B08XYZ1234?tag=habitatbuilde-20

Add another ASIN? (y/n): y
```

## Tips

1. **Start with Popular Products** - Add ASINs for your most important products first
2. **Take Your Time** - You don't need to add them all at once
3. **Choose Quality Products** - Pick products with good reviews and ratings
4. **Save Progress** - The tool saves after each ASIN, so you can stop anytime

## Batch Mode (Advanced)

If you have a list of URLs, create a JSON file:

```json
{
  "betta": {
    "5g": "https://www.amazon.com/dp/B08XYZ1234",
    "sponge": "B09ABC5678"
  },
  "leopard-gecko": {
    "heatmat": "https://www.amazon.com/dp/B10DEF9012"
  }
}
```

Then run:
```bash
node scripts/add-asin-manual.js --batch your-file.json
```

## That's It!

Once you have ASINs, your "Buy All on Amazon" cart will work perfectly! 🎉


