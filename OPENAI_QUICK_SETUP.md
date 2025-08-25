# OpenAI Setup Guide

## Quick Setup for AI Blog Generation

Your blog generator now has **real AI integration**! Here's how to get it working:

### 🔑 Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign up or log in to your account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### 💳 Add Billing (Important!)

**Free accounts have very limited usage and will hit quota quickly.**

1. Go to [OpenAI Billing](https://platform.openai.com/account/billing)
2. Add a payment method
3. Add credits (minimum $5 recommended for testing)

### ⚙️ Configure Your App

1. Open your `.env.local` file
2. Add your API key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```
3. Restart your development server:
   ```bash
   npm run dev
   ```

### 🎯 Test the AI Generation

1. Go to Create Blog Post
2. Fill in the form (topic, audience, tone, etc.)
3. Click "✨ Generate AI Blog Post"

### 🚫 If You Get Quota Errors

**Error: "OpenAI quota exceeded"**

This means:
- Your free tier is exhausted (very common)
- You need to add billing to your OpenAI account
- Use the "📝 Try Demo Version" button as a fallback

### 💡 Demo vs Real AI

- **Real AI**: Uses GPT-3.5-turbo, costs ~$0.002 per blog post
- **Demo**: Template-based content, free, good for testing UI

### 📊 Usage Costs

Typical costs for blog generation:
- Short blog (300 words): ~$0.001
- Medium blog (500 words): ~$0.002  
- Long blog (800 words): ~$0.003

Very affordable! $5 can generate ~2000+ blog posts.

### 🔧 Troubleshooting

**"OpenAI API key not configured"**
- Check your `.env.local` file
- Make sure to restart the server after adding the key

**"Rate limit exceeded"**
- Wait a few minutes and try again
- Upgrade your OpenAI plan if needed

**"Invalid API key"**
- Double-check the key starts with `sk-`
- Make sure there are no extra spaces
- Generate a new key if needed

### 🎨 Customizing AI Prompts

The AI prompts are in `/src/app/api/generate-blog/route.ts`. You can modify them to:
- Change the writing style
- Add specific instructions
- Include your brand voice
- Adjust the structure

### 🚀 Ready to Scale?

Once you have billing set up, your blog generator can create unlimited, high-quality, AI-powered content!

---

**Need help?** Check the error messages in the UI - they'll guide you through common fixes.
