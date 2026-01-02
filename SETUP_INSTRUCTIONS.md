# Quick Setup - Just Add Your API Key!

## ✅ Everything is ready! Just 2 steps:

### Step 1: Add Your API Key
1. Open the `.env` file in your project root
2. Find this line: `RAPIDAPI_KEY=your-api-key-here`
3. Replace `your-api-key-here` with your actual RapidAPI key
4. Save the file

### Step 2: Run It!
```bash
npm run find-products
```

That's it! The script will:
- ✅ Automatically find the right endpoint format
- ✅ Search Amazon for each product
- ✅ Extract ASINs, prices, titles
- ✅ Update your JSON files
- ✅ Create affiliate links

## 🔍 Finding Your API Key

1. Go to RapidAPI dashboard
2. Click on "Real-Time Amazon Data" API
3. Look for **"X-RapidAPI-Key"** in the code examples
4. Copy that long string
5. Paste it in `.env` file

## 🎯 What You'll See

```
🔍 Finding Amazon products and extracting ASINs...
📦 Processing Betta Fish products...
  Searching: 5 Gallon Portrait...
    ✅ Found: [Product Name]...
✅ Complete! Updated X products with ASINs.
```

## ⚠️ If It Doesn't Work

The script will show you the error. Common fixes:
- **Wrong API key** → Double-check you copied it correctly
- **Wrong host** → Check the API dashboard for the correct host name
- **Rate limit** → Wait a bit and try again

Just add your key and run it! 🚀


