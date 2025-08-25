import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { topic, targetAudience, tone, wordCount, keywords } = await request.json()

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.',
        success: false
      }, { status: 500 })
    }

    // Generate the blog post using OpenAI
    const blogContent = await generateAIBlogPost(topic, targetAudience, tone, wordCount, keywords)

    return NextResponse.json({
      content: blogContent,
      success: true
    })
  } catch (error) {
    console.error('Blog generation error:', error)
    return NextResponse.json({
      error: 'Failed to generate blog post. Please try again.',
      success: false
    }, { status: 500 })
  }
}

async function generateAIBlogPost(
  topic: string,
  audience: string,
  tone: string,
  wordCount: string,
  keywords: string
): Promise<string> {
  const prompt = createBlogPrompt(topic, audience, tone, wordCount, keywords)

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional blog writer and content creator. Write engaging, well-structured blog posts that are informative, readable, and optimized for the target audience."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: Math.min(parseInt(wordCount) * 2, 4000), // Approximate tokens needed
      temperature: 0.7,
    })

    return completion.choices[0]?.message?.content || "Failed to generate content"
  } catch (error) {
    console.error('OpenAI API error:', error)
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
  return `Write a comprehensive blog post with the following specifications:

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

Please ensure the content is original, informative, and valuable to the target audience.`
}
