# AI Habitat Assistant Setup Guide

## 🎉 What's Been Implemented

✅ **AI Chat Component** - Floating chat interface
✅ **API Route** - Handles AI requests with fallback
✅ **Context Awareness** - Knows user's current build
✅ **Species-Specific Knowledge** - Tailored responses for geckos/bettas
✅ **Fallback Responses** - Works even without API key

## 🚀 Quick Start

### Option 1: Use with OpenAI (Recommended)

1. **Get OpenAI API Key**:
   - Go to https://platform.openai.com/api-keys
   - Create an account (if needed)
   - Create a new API key

2. **Add to Environment Variables**:
   Create or update `.env.local`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

3. **Deploy**:
   - The AI assistant will automatically use OpenAI
   - Cost: ~$0.15 per 1000 messages (very affordable)

### Option 2: Use Without API Key (Free)

- The assistant works with fallback responses
- Answers common questions about temperature, substrate, tank size
- Limited but still helpful!

## 💰 Cost Estimate

- **OpenAI GPT-4o-mini**: ~$0.15 per 1000 messages
- **For 1000 users/month**: ~$5-15/month
- **Very affordable** for the value it provides

## 🎨 Features

### Current Features
- ✅ Floating chat button (bottom-right)
- ✅ Context-aware (knows user's build)
- ✅ Species-specific knowledge
- ✅ Fallback responses
- ✅ Beautiful UI matching your site

### Future Enhancements
- [ ] Conversation history persistence
- [ ] Suggested questions
- [ ] Image upload for troubleshooting
- [ ] Voice input
- [ ] Multi-language support

## 🔧 Customization

### Update System Prompt
Edit `app/api/ai-chat/route.js` → `getSystemPrompt()` function

### Add More Fallback Responses
Edit `app/api/ai-chat/route.js` → `getFallbackResponse()` function

### Change Chat Position
Edit `app/components/AIHabitatAssistant.js` → Change `bottom-6 right-6` classes

## 📊 Analytics

Track AI usage:
```javascript
// In AIHabitatAssistant.js, add:
analytics.track('ai_chat_message', { 
  species, 
  message_length: message.length 
});
```

## 🐛 Troubleshooting

**Chat not opening?**
- Check browser console for errors
- Verify component is imported correctly

**No AI responses?**
- Check if OPENAI_API_KEY is set
- Check API route logs
- Fallback responses should still work

**Slow responses?**
- OpenAI API can take 1-3 seconds
- Consider adding loading states (already included)

## 🎯 Next Steps

1. **Test it**: Try asking questions in the builder
2. **Add API key**: Get OpenAI key for full AI experience
3. **Monitor usage**: Track how many people use it
4. **Iterate**: Add more knowledge to system prompt based on common questions

## 💡 Pro Tips

1. **Train the AI**: Add your research data to the system prompt
2. **Monitor costs**: Set up OpenAI usage alerts
3. **A/B test**: Test with/without AI to measure impact
4. **Collect feedback**: Ask users what they think

The AI assistant is now live! Users can click the floating button in the builder to get help. 🎉

