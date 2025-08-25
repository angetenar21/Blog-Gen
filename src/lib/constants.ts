import { PricingPlan } from './types';

// App Configuration
export const APP_CONFIG = {
  name: 'AI Blog Generator',
  description: 'Generate high-quality blog posts with AI in seconds',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@aibloggenerator.com',
} as const;

// Subscription Plans
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: '', // No Stripe price for free plan
    maxGenerations: 3,
    maxWords: 5000,
    features: [
      '3 blog posts per month',
      'Up to 5,000 words',
      'Basic AI templates',
      'Standard support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19,
    priceId: 'price_pro_monthly', // Replace with actual Stripe price ID
    maxGenerations: 50,
    maxWords: 100000,
    popular: true,
    features: [
      '50 blog posts per month',
      'Up to 100,000 words',
      'Advanced AI templates',
      'SEO optimization',
      'Priority support',
      'Export to multiple formats',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    priceId: 'price_enterprise_monthly', // Replace with actual Stripe price ID
    maxGenerations: -1, // Unlimited
    maxWords: -1, // Unlimited
    features: [
      'Unlimited blog posts',
      'Unlimited words',
      'Custom AI templates',
      'Advanced SEO tools',
      'White-label options',
      'Dedicated support',
      'API access',
      'Team collaboration',
    ],
  },
];

// AI Generation Configuration
export const AI_CONFIG = {
  models: {
    default: 'gpt-4',
    fallback: 'gpt-3.5-turbo',
  },
  maxTokens: {
    short: 1000,
    medium: 2000,
    long: 4000,
  },
  temperature: 0.7,
} as const;

// Blog Configuration
export const BLOG_CONFIG = {
  tones: [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'authoritative', label: 'Authoritative' },
  ],
  lengths: [
    { value: 'short', label: 'Short (500-800 words)', words: 500 },
    { value: 'medium', label: 'Medium (800-1500 words)', words: 1000 },
    { value: 'long', label: 'Long (1500-3000 words)', words: 2000 },
  ],
} as const;

// Navigation Links
export const NAVIGATION = {
  main: [
    { href: '/', label: 'Home' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
  ],
  dashboard: [
    { href: '/dashboard', label: 'Dashboard', icon: 'Home' },
    { href: '/dashboard/generate', label: 'Generate', icon: 'Zap' },
    { href: '/dashboard/posts', label: 'My Posts', icon: 'FileText' },
    { href: '/dashboard/analytics', label: 'Analytics', icon: 'BarChart3' },
    { href: '/dashboard/settings', label: 'Settings', icon: 'Settings' },
  ],
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/signin',
    logout: '/api/auth/signout',
    session: '/api/auth/session',
  },
  blog: {
    generate: '/api/generate',
    posts: '/api/posts',
    post: (id: string) => `/api/posts/${id}`,
  },
  user: {
    profile: '/api/user',
    usage: '/api/user/usage',
  },
  stripe: {
    createCheckout: '/api/stripe/create-checkout',
    webhook: '/api/stripe/webhook',
  },
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
  },
  topic: {
    required: 'Topic is required',
    minLength: {
      value: 10,
      message: 'Topic must be at least 10 characters',
    },
    maxLength: {
      value: 200,
      message: 'Topic must be less than 200 characters',
    },
  },
} as const;
