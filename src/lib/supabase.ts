import { createClient } from '@supabase/supabase-js'

// Function to get Supabase client with proper error handling
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

// Export the client
export const supabase = getSupabaseClient()

// Types for our database
export type Profile = {
  id: string
  name: string | null
  email: string
  subscription_tier: 'starter' | 'professional' | 'enterprise'
  created_at: string
  updated_at: string
}

export type BlogPost = {
  id: string
  user_id: string
  title: string
  content: string | null
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}
