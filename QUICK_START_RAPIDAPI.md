# Quick Start: RapidAPI Setup

## 🚀 5-Minute Setup

### 1. Sign Up (2 minutes)
- Go to: https://rapidapi.com/
- Click "Sign Up" → Use Google/GitHub (fastest)
- Verify email if needed

### 2. Subscribe to API (1 minute)
- Go to: https://rapidapi.com/apidojo/api/amazon-product-details1
- Click **"Subscribe to Test"** (FREE tier - 500 requests/month)
- Click "Subscribe"

### 3. Get Your API Key (30 seconds)
- After subscribing, you'll see code examples
- Look for **"X-RapidAPI-Key"** 
- Copy that long string (starts with letters/numbers)

### 4. Add to Your Project (30 seconds)

**Create `.env` file in project root:**
```
RAPIDAPI_KEY=your-copied-api-key-here
```

**Replace `your-copied-api-key-here` with your actual key!**

### 5. Run It! (1 minute)
```bash
npm run find-products
```

## ✅ That's It!

The script will:
- Search Amazon for each product
- Find the best match
- Extract ASIN, price, title
- Update your JSON files automatically
- Create direct affiliate links

## 🎯 What You'll See

```
🔍 Finding Amazon products and extracting ASINs...
📦 Processing Betta Fish products...
  Searching: 5 Gallon Portrait...
    ✅ Found: Top Fin 5 Gallon Glass Aquarium...
  Searching: Sponge Filter + Air Pump...
    ✅ Found: Aquaneat Sponge Filter...
...
✅ Complete! Updated 15 products with ASINs.
```

## 💡 Tips

- **Free Tier**: 500 requests/month (plenty for testing)
- **Rate Limiting**: Script waits 1 second between requests
- **If it fails**: Check your API key is correct in `.env`
- **No ASIN found?**: Product might need different search terms

## 🔄 Run Again Later

Just run `npm run find-products` anytime to update products or add new ones!


