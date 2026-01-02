# RapidAPI Setup Guide

## Step 1: Sign Up for RapidAPI

1. Go to: https://rapidapi.com/
2. Click **"Sign Up"** (top right)
3. Sign up with:
   - Email, or
   - Google/GitHub account (faster)
4. Verify your email if required

## Step 2: Subscribe to Amazon Product Details API

1. Go to: https://rapidapi.com/apidojo/api/amazon-product-details1
2. Click **"Subscribe to Test"** or **"Subscribe to Basic"**
   - **Free Tier**: 500 requests/month (perfect for testing)
   - **Basic Plan**: $9.99/month for 5,000 requests
3. Choose the **FREE** plan to start
4. Click **"Subscribe"**

## Step 3: Get Your API Key

1. After subscribing, you'll see the API dashboard
2. Look for **"X-RapidAPI-Key"** in the code examples
3. Or go to: https://rapidapi.com/developer/billing
4. Copy your **"X-RapidAPI-Key"** (it looks like: `abc123def456ghi789...`)

## Step 4: Set Your API Key

### Option A: Environment Variable (Recommended)

**Windows PowerShell:**
```powershell
$env:RAPIDAPI_KEY="your-api-key-here"
```

**Windows CMD:**
```cmd
set RAPIDAPI_KEY=your-api-key-here
```

**Mac/Linux:**
```bash
export RAPIDAPI_KEY=your-api-key-here
```

### Option B: Create .env File (Better for permanent storage)

1. Create a file named `.env` in your project root
2. Add this line:
```
RAPIDAPI_KEY=your-api-key-here
```

3. Install dotenv package:
```bash
npm install dotenv
```

4. Update the script to load .env (I'll do this for you)

## Step 5: Test It

Run the product finder:
```bash
npm run find-products
```

You should see it searching for products and adding ASINs!

## Troubleshooting

**Error: "RAPIDAPI_KEY not set"**
- Make sure you set the environment variable in the same terminal window
- Or create a `.env` file

**Error: "401 Unauthorized"**
- Check that your API key is correct
- Make sure you subscribed to the API

**Error: "429 Too Many Requests"**
- You've hit the rate limit
- Wait a bit or upgrade your plan

## Free Tier Limits

- 500 requests per month
- ~1 request per second
- Perfect for testing and small projects

## Next Steps

Once you have ASINs, your "Buy All on Amazon" cart will work perfectly!


