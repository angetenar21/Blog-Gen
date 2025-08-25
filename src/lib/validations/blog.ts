import { z } from 'zod';

// Blog Generation Schema
export const blogGenerationSchema = z.object({
  topic: z.string()
    .min(10, 'Topic must be at least 10 characters')
    .max(200, 'Topic must be less than 200 characters'),
  tone: z.enum(['professional', 'casual', 'friendly', 'authoritative']),
  length: z.enum(['short', 'medium', 'long']),
  keywords: z.string().optional(),
  targetAudience: z.string().optional(),
});

// Blog Post Schema
export const blogPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().optional(),
  status: z.enum(['draft', 'published']),
  tags: z.array(z.string()).optional(),
  seoTitle: z.string().max(60, 'SEO title should be under 60 characters').optional(),
  seoDescription: z.string().max(160, 'SEO description should be under 160 characters').optional(),
});

export type BlogGenerationData = z.infer<typeof blogGenerationSchema>;
export type BlogPostData = z.infer<typeof blogPostSchema>;
