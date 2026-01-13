# Quick API Key Setup (3 Steps)

## 🚀 Fast Setup

### Step 1: Get API Key (2 minutes)
1. Go to: https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key (starts with `sk-`)

### Step 2: Add to Project (1 minute)
Create a file called `.env.local` in your project root:

```bash
OPENAI_API_KEY=sk-paste-your-key-here
```

**Important**: Replace `sk-paste-your-key-here` with your actual key!

### Step 3: Restart Server
```bash
# Stop your current server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ Test It

1. Go to `/build/leopard-gecko` or `/build/betta`
2. Click the "AI Assistant" button (bottom-right)
3. Ask: "What temperature does my gecko need?"
4. If you get a detailed response, it's working! 🎉

## 🔒 Security

Your `.env.local` file is already in `.gitignore`, so it won't be committed to Git. Safe!

## 💰 Cost

- First $5 is usually free (OpenAI credits)
- Then ~$0.15 per 1000 messages
- Very affordable for the value!

## 🆘 Troubleshooting

**Not working?**
- Make sure `.env.local` is in the project root (same folder as `package.json`)
- Restart the dev server after adding the key
- Check the key starts with `sk-`
- Make sure you added payment method to OpenAI account

That's it! The AI assistant will automatically use OpenAI once the key is set.

