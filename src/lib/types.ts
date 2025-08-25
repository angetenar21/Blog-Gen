// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
  subscription?: Subscription;
}

// Blog Post Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  wordCount: number;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

// AI Generation Types
export interface GenerationRequest {
  topic: string;
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative';
  length: 'short' | 'medium' | 'long';
  keywords?: string[];
  targetAudience?: string;
}

export interface GenerationResponse {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  wordCount: number;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'canceled';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
}

// Usage Tracking
export interface Usage {
  id: string;
  userId: string;
  type: 'generation' | 'export';
  timestamp: Date;
  tokensUsed?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BlogGenerationForm {
  topic: string;
  tone: GenerationRequest['tone'];
  length: GenerationRequest['length'];
  keywords: string;
  targetAudience: string;
}

// Subscription Plans
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceId: string; // Stripe price ID
  features: string[];
  maxGenerations: number;
  maxWords: number;
  popular?: boolean;
}
