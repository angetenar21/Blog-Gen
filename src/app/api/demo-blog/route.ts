import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { topic, targetAudience, tone, wordCount, keywords } = await request.json()

    // Generate demo content based on the inputs
    const demoContent = generateDemoBlogPost(topic, targetAudience, tone, wordCount, keywords)

    return NextResponse.json({
      content: demoContent,
      success: true,
      isDemo: true
    })
  } catch (error) {
    console.error('Demo blog generation error:', error)
    return NextResponse.json({
      error: 'Failed to generate demo blog post. Please try again.',
      success: false
    }, { status: 500 })
  }
}

function generateDemoBlogPost(
  topic: string,
  audience: string,
  tone: string,
  wordCount: number,
  keywords: string[]
): string {
  const keywordText = keywords && keywords.length > 0 ? keywords.join(', ') : 'relevant keywords'

  const templates = {
    professional: {
      intro: `In today's rapidly evolving landscape, understanding ${topic} has become increasingly important for ${audience}. This comprehensive guide will explore the key aspects and practical applications that matter most.`,
      body: `## Understanding ${topic}

${topic} represents a significant opportunity for ${audience} looking to stay ahead of the curve. By focusing on ${keywordText}, we can develop a deeper understanding of the core principles.

## Key Benefits and Applications

When implementing strategies around ${topic}, consider these essential factors:

1. **Strategic Planning**: Develop a comprehensive approach that aligns with your objectives
2. **Implementation**: Focus on practical steps that deliver measurable results
3. **Optimization**: Continuously refine your approach based on performance data

## Best Practices

To maximize the impact of ${topic} in your context, consider these proven strategies:

- Prioritize user experience and engagement
- Leverage data-driven insights for decision making
- Maintain consistency across all touchpoints
- Monitor performance metrics regularly

## Looking Forward

The future of ${topic} holds exciting possibilities. By staying informed about emerging trends and maintaining a commitment to excellence, ${audience} can position themselves for long-term success.`,
      conclusion: `Understanding ${topic} is essential for any ${audience} looking to thrive in today's competitive environment. By implementing these strategies and focusing on continuous improvement, you'll be well-positioned to achieve your goals.`
    },
    casual: {
      intro: `Hey there! Let's talk about ${topic} - something that's been buzzing around lately and is super relevant for ${audience}. I'm excited to dive into this with you!`,
      body: `## What's the Deal with ${topic}?

So, ${topic} is actually pretty cool when you think about it. For ${audience}, it's becoming one of those things you just can't ignore anymore. The whole ${keywordText} scene is really taking off.

## Why Should You Care?

Here's the thing - ${topic} isn't just another trend. It's actually changing how we think about:

- Making things easier and more efficient
- Getting better results with less effort
- Staying ahead of what's coming next

## Getting Started

Don't worry, you don't need to be an expert to begin with ${topic}. Here are some simple steps:

1. Start with the basics and build from there
2. Try things out and see what works for you
3. Learn from others who are doing it well
4. Keep experimenting and improving

## Real Talk

Look, ${topic} might seem overwhelming at first, but once you get the hang of it, it becomes second nature. The key is to start small and grow from there.`,
      conclusion: `That's a wrap on ${topic}! Remember, the best way to get good at this stuff is to just start doing it. Don't overthink it - jump in and see what happens. You've got this!`
    },
    technical: {
      intro: `This technical analysis examines ${topic} from an implementation perspective, providing ${audience} with actionable insights and methodological approaches.`,
      body: `## Technical Overview

${topic} encompasses several key components that require careful consideration during implementation. The integration of ${keywordText} forms the foundation of any robust solution.

## Architecture and Implementation

### Core Components

The fundamental architecture consists of:

\`\`\`
Component A → Processing Layer → Component B
     ↓              ↓              ↓
Data Input → Transformation → Output Generation
\`\`\`

### Technical Specifications

When designing systems around ${topic}, consider these parameters:

- **Scalability**: Ensure the system can handle increased load
- **Performance**: Optimize for response times and throughput  
- **Security**: Implement proper authentication and authorization
- **Maintainability**: Design for long-term sustainability

## Best Practices and Patterns

### Design Patterns
- Implement modular architecture for flexibility
- Use dependency injection for testability
- Apply SOLID principles throughout development

### Performance Optimization
- Cache frequently accessed data
- Implement efficient algorithms
- Monitor system metrics continuously

## Implementation Roadmap

1. **Phase 1**: Core infrastructure setup
2. **Phase 2**: Feature development and testing
3. **Phase 3**: Optimization and scaling
4. **Phase 4**: Monitoring and maintenance`,
      conclusion: `Successful implementation of ${topic} requires careful planning, proper architecture, and ongoing optimization. By following these technical guidelines, ${audience} can build robust, scalable solutions.`
    }
  }

  const template = templates[tone as keyof typeof templates] || templates.professional

  const content = `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}: A Comprehensive Guide

${template.intro}

${template.body}

## Conclusion

${template.conclusion}

---

*This is a demo blog post generated for preview purposes. For AI-powered content, please ensure your OpenAI API is properly configured with sufficient credits.*`

  // Adjust content length based on word count target
  if (wordCount < 500) {
    // Return shorter version
    return `# ${topic.charAt(0).toUpperCase() + topic.slice(1)}

${template.intro}

## Key Points

${topic} is essential for ${audience}. Here are the main benefits:

- Improved efficiency and results
- Better understanding of ${keywordText}
- Competitive advantage in your field

## Getting Started

The best approach is to start with the fundamentals and build your knowledge gradually. Focus on practical applications that deliver immediate value.

${template.conclusion}

---

*Demo content - Connect your OpenAI API for personalized AI-generated blogs.*`
  }

  return content
}
