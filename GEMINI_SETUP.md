# Google Gemini Setup Guide

## Quick Setup for AI Blog Generation

Your blog generator now uses **Google Gemini AI**! Here's how to get it working:

### 🔑 Get Your Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key

### 💰 Free Tier Benefits

**Gemini offers a generous free tier:**
- 15 requests per minute
- 1 million tokens per day
- 1500 requests per day

Much more generous than OpenAI's free tier!

### ⚙️ Configure Your App

1. Open your `.env.local` file
2. Add your API key:
   ```
   GEMINI_API_KEY=your-actual-api-key-here
   ```
3. Restart your development server:
   ```bash
   npm run dev
   ```

### 🎯 Test the AI Generation

1. Go to Create Blog Post
2. Fill in the form (topic, audience, tone, etc.)
3. Click "✨ Generate AI Blog Post"

### 🚫 If You Get Errors

**Error: "Gemini API key not configured"**
- Check your `.env.local` file
- Make sure to restart the server after adding the key

**Error: "Quota exceeded"**
- You've hit the daily limit (very generous)
- Wait until tomorrow or upgrade your plan
- Use the "📝 Try Demo Version" button as a fallback

**Error: "Content blocked by safety filters"**
- Try rephrasing your topic
- Use a different tone
- Gemini has built-in safety filters

### 💡 Demo vs Real AI

- **Real AI**: Uses Gemini 1.5 Flash, completely free up to generous limits
- **Demo**: Template-based content, free, good for testing UI

### 📊 Usage Costs

Gemini pricing is very competitive:
- **Free tier**: 1,500 requests/day, 1M tokens/day
- **Pro tier**: $0.35 per 1M tokens (very affordable)

### 🔧 Troubleshooting

**"Invalid API key"**
- Double-check the key from Google AI Studio
- Make sure there are no extra spaces
- Generate a new key if needed

**"Rate limit exceeded"**
- Wait a minute and try again (15 requests/minute limit)
- Use the demo version while waiting

**"AI service temporarily unavailable"**
- Google's servers might be down
- Try again in a few minutes
- Use the demo version

### 🎨 Customizing AI Prompts

The AI prompts are in `/src/app/api/generate-blog/route.ts`. You can modify them to:
- Change the writing style
- Add specific instructions
- Include your brand voice
- Adjust the structure

### 🚀 Why Gemini?

- **More generous free tier** than OpenAI
- **Better safety features** built-in
- **Competitive pricing** for paid usage
- **Latest AI technology** from Google
- **No billing required** to start testing

### 🔄 Differences from OpenAI

- Gemini uses a single `generateContent()` call instead of chat messages
- Better handling of long-form content
- Built-in safety filters
- More generous rate limits

---

**Ready to generate amazing content?** Just add your API key and start creating!
