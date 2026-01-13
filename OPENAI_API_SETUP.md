# OpenAI API Key Setup Guide

## Step 1: Get Your OpenAI API Key

1. **Go to OpenAI Platform**:
   - Visit: https://platform.openai.com/
   - Sign up or log in

2. **Create API Key**:
   - Click your profile (top right)
   - Go to "API Keys" or visit: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name (e.g., "HabitatBuilder")
   - **Copy the key immediately** - you won't see it again!

3. **Add Payment Method** (Required):
   - Go to "Billing" → "Payment methods"
   - Add a credit card
   - Set a usage limit (recommended: $10-20/month to start)

## Step 2: Add API Key to Your Project

### For Local Development

1. **Create/Edit `.env.local` file** in your project root:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

2. **Important**: 
   - Never commit this file to Git (it should be in `.gitignore`)
   - Replace `sk-your-actual-key-here` with your actual key

### For Production (Vercel/Deployment)

1. **Vercel Dashboard**:
   - Go to your project settings
   - Click "Environment Variables"
   - Add:
     - Name: `OPENAI_API_KEY`
     - Value: `sk-your-actual-key-here`
     - Environment: Production, Preview, Development (select all)

2. **Other Hosting**:
   - Add `OPENAI_API_KEY` to your hosting platform's environment variables
   - Restart your app after adding

## Step 3: Install OpenAI Package (Optional)

The code will try to import it automatically, but you can install it explicitly:

```bash
npm install openai
```

## Step 4: Verify It's Working

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Test the AI Assistant**:
   - Go to a builder page (e.g., `/build/leopard-gecko`)
   - Click the "AI Assistant" button (bottom-right)
   - Ask a question like "What temperature does my gecko need?"
   - If you get a detailed AI response (not just fallback), it's working!

## Step 5: Monitor Usage & Costs

1. **Check OpenAI Dashboard**:
   - Visit: https://platform.openai.com/usage
   - Monitor your API usage
   - Set up usage alerts

2. **Cost Estimates**:
   - GPT-4o-mini: ~$0.15 per 1000 messages
   - 100 messages/day = ~$0.45/month
   - 1000 messages/day = ~$4.50/month
   - Very affordable!

## Troubleshooting

### "Module not found: openai"
- Run: `npm install openai`
- Or the fallback will work (limited responses)

### "API key not found"
- Check `.env.local` exists and has `OPENAI_API_KEY=...`
- Restart your dev server after adding the key
- Make sure there are no spaces around the `=` sign

### "Invalid API key"
- Verify the key is correct (starts with `sk-`)
- Check if you've added payment method to OpenAI account
- Make sure the key hasn't been revoked

### Still using fallback responses?
- Check browser console for errors
- Verify API key is set correctly
- Check OpenAI dashboard for API errors

## Security Best Practices

✅ **DO**:
- Keep API key in `.env.local` (not committed to Git)
- Use environment variables in production
- Set usage limits in OpenAI dashboard
- Monitor usage regularly

❌ **DON'T**:
- Commit API keys to Git
- Share API keys publicly
- Use the same key for multiple projects (create separate keys)
- Leave unlimited spending enabled

## Quick Checklist

- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Added payment method
- [ ] Created `.env.local` file
- [ ] Added `OPENAI_API_KEY=sk-...` to `.env.local`
- [ ] Restarted dev server
- [ ] Tested AI assistant
- [ ] Added key to production environment variables
- [ ] Set usage limits in OpenAI dashboard

## Example `.env.local` File

```
OPENAI_API_KEY=sk-proj-abc123xyz789...
```

That's it! Once you add the key, the AI assistant will automatically use OpenAI for full AI-powered responses.

