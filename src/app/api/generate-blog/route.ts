import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
  try {
    const { topic, targetAudience, tone, wordCount, keywords } = await request.json()

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to your environment variables.',
        success: false
      }, { status: 500 })
    }

    // Generate the blog post using Gemini
    const blogContent = await generateGeminiBlogPost(topic, targetAudience, tone, wordCount, keywords)

    return NextResponse.json({
      content: blogContent,
      success: true
    })
  } catch (error: unknown) {
    console.error('Blog generation error:', error)

    // Handle specific Gemini errors
    let errorMessage = 'Failed to generate blog post. Please try again.'

    if (error && typeof error === 'object' && 'message' in error) {
      const errorMsg = (error as Error).message

      if (errorMsg.includes('quota') || errorMsg.includes('QUOTA_EXCEEDED')) {
        errorMessage = 'Gemini quota exceeded. Please check your API quota or use the demo content option.'
      } else if (errorMsg.includes('rate') || errorMsg.includes('RATE_LIMIT')) {
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.'
      } else if (errorMsg.includes('API_KEY') || errorMsg.includes('authentication')) {
        errorMessage = 'Invalid Gemini API key. Please check your API key configuration.'
      } else if (errorMsg.includes('SAFETY')) {
        errorMessage = 'Content blocked by safety filters. Please try a different topic or tone.'
      }
    }

    return NextResponse.json({
      error: errorMessage,
      success: false
    }, { status: 500 })
  }
}

async function generateGeminiBlogPost(
  topic: string,
  audience: string,
  tone: string,
  wordCount: string,
  keywords: string
): Promise<string> {
  const prompt = createBlogPrompt(topic, audience, tone, wordCount, keywords)

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return text || "Failed to generate content"
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('AI service temporarily unavailable')
  }
}

function createBlogPrompt(
  topic: string,
  audience: string,
  tone: string,
  wordCount: string,
  keywords: string
): string {
  return `You are a professional blog writer and content creator. Write a comprehensive blog post with the following specifications:

**Topic:** ${topic}
**Target Audience:** ${audience || 'General audience'}
**Tone:** ${tone}
**Word Count:** Approximately ${wordCount} words
**SEO Keywords to include:** ${keywords || 'N/A'}

**Requirements:**
1. Create an engaging title
2. Write a compelling introduction that hooks the reader
3. Use clear headings and subheadings for better readability
4. Include practical examples, tips, or actionable advice
5. Maintain the specified tone throughout
6. Naturally incorporate the SEO keywords (if provided)
7. End with a strong conclusion that summarizes key points
8. Format the content in markdown for easy reading

**Structure:**
- Title (H1)
- Introduction
- Main content sections with appropriate headings (H2, H3)
- Conclusion
- Optional call-to-action

Please ensure the content is original, informative, and valuable to the target audience. Write engaging, well-structured content that is optimized for the specified audience.`
}
