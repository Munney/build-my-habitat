# Price Updates - How It Works

## Current Status: Static Prices

**Prices do NOT automatically update from Amazon.**

Your prices are stored in the JSON files (`data/betta.json` and `data/leopard-gecko.json`) and are static. They won't change unless you manually update them.

## Why Prices Don't Auto-Update

1. **No Real-Time API**: Amazon doesn't provide a free, reliable API for fetching current prices
2. **Rate Limits**: Even paid APIs have limits and costs
3. **Price Accuracy**: Amazon prices change frequently, and keeping them 100% accurate requires constant API calls

## Your Options

### Option 1: Keep Static Prices (Recommended for Now)

**Pros:**
- ✅ Simple and reliable
- ✅ No API costs
- ✅ Predictable for users
- ✅ No rate limit issues

**Cons:**
- ❌ Prices may become outdated
- ❌ Manual updates needed

**Best For:** Most websites use static prices with periodic manual updates.

### Option 2: Manual Price Updates

Update prices when you notice they're off:

1. Check Amazon for current prices
2. Update the CSV file with new prices
3. Run: `npm run update-prices`

Or edit JSON files directly.

### Option 3: Automated Price Updates (Advanced)

If you want automatic updates, you'd need:

1. **A Working Amazon API** (we haven't found a reliable free one)
2. **Scheduled Job** (runs daily/weekly to fetch prices)
3. **Price Caching** (store prices, update periodically)

**Cost:** Usually $10-50/month for API access

## Recommendation

**Keep static prices** for now because:
- Your prices are estimates anyway (users see real prices on Amazon)
- Amazon shows actual prices when users click through
- Static prices are more reliable
- You can update them manually when needed

## When to Update Prices

- Monthly or quarterly
- When you notice major price changes
- When adding new products
- Before big sales/promotions

## How to Update Prices

### Method 1: Edit CSV
1. Open `all-products-template.csv`
2. Update the "Current Price" column
3. Run: `npm run update-prices`

### Method 2: Edit JSON Directly
1. Open `data/betta.json` or `data/leopard-gecko.json`
2. Find the product
3. Update the `price` field
4. Save

## Important Note

**The prices on your site are estimates.** When users click through to Amazon, they'll see the actual current price. Your prices are just for:
- Showing approximate costs
- Calculating estimated totals
- Helping users plan their budget

The real price is always on Amazon! 🛒

