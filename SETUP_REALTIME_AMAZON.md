# Setup: Real-Time Amazon Data API

## Step 1: Subscribe to the API

1. Click on the "Real-Time Amazon Data" API card
2. Click **"Subscribe"** or **"Subscribe to Test"**
3. Choose the **FREE** tier (if available) or lowest paid tier
4. Complete the subscription

## Step 2: Get Your API Key

1. After subscribing, you'll see the API dashboard
2. Look for your **"X-RapidAPI-Key"** 
   - Usually shown in code examples
   - Or in the "Security" or "Credentials" section
3. Copy that key (long string)

## Step 3: Find the API Host

1. In the API dashboard, look for the **"X-RapidAPI-Host"** header
2. It will look like: `real-time-amazon-data.p.rapidapi.com` or similar
3. Copy that host name

## Step 4: Add to Your Project

Create or update your `.env` file:

```
RAPIDAPI_KEY=your-copied-api-key-here
RAPIDAPI_HOST=the-host-name-from-step-3
```

## Step 5: Test It

```bash
npm run find-products
```

The script will automatically try different endpoint formats to find what works!

## If It Doesn't Work

The script will show you the error. Common issues:
- Wrong host name → Check the API documentation for the correct host
- Wrong endpoint → The script tries multiple formats automatically
- Rate limit → Wait a bit and try again

Let me know what host name you get and I can update the script specifically for this API!


