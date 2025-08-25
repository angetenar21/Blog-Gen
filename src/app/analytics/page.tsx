'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  TrendingUp,
  FileText,
  Eye,
  Clock,
  BarChart3,
  PieChart,
  Calendar,
  Users
} from 'lucide-react'

interface BlogPost {
  id: string
  title: string
  status: 'draft' | 'published'
  word_count: number
  created_at: string
  topic: string
  tone: string
  target_audience: string
}

export default function Analytics() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchBlogPosts()
  }, [])

  const fetchBlogPosts = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, status, word_count, created_at, topic, tone, target_audience')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setBlogPosts(data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setLoading(false)
    }
  }

  // Calculate analytics
  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    drafts: blogPosts.filter(p => p.status === 'draft').length,
    totalWords: blogPosts.reduce((sum, p) => sum + p.word_count, 0),
    avgWords: blogPosts.length > 0 ? Math.round(blogPosts.reduce((sum, p) => sum + p.word_count, 0) / blogPosts.length) : 0
  }

  // Posts by month
  const postsByMonth = blogPosts.reduce((acc, post) => {
    const month = new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Posts by tone
  const postsByTone = blogPosts.reduce((acc, post) => {
    acc[post.tone] = (acc[post.tone] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Recent activity (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentPosts = blogPosts.filter(post => new Date(post.created_at) > sevenDaysAgo)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-2xl font-bold gradient-text">Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card-enhanced p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Posts</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </div>

          <div className="card-enhanced p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Published</p>
                <p className="text-2xl font-bold text-white">{stats.published}</p>
              </div>
              <Eye className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="card-enhanced p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Drafts</p>
                <p className="text-2xl font-bold text-white">{stats.drafts}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </div>

          <div className="card-enhanced p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Words</p>
                <p className="text-2xl font-bold text-white">{stats.totalWords.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="card-enhanced p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Avg Words</p>
                <p className="text-2xl font-bold text-white">{stats.avgWords}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Posts by Month */}
          <div className="card-enhanced p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Posts by Month</h2>
            </div>

            {Object.keys(postsByMonth).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(postsByMonth)
                  .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
                  .slice(-6) // Last 6 months
                  .map(([month, count]) => (
                    <div key={month} className="flex items-center justify-between">
                      <span className="text-slate-300">{month}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(count / Math.max(...Object.values(postsByMonth))) * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No data available</p>
            )}
          </div>

          {/* Posts by Tone */}
          <div className="card-enhanced p-6">
            <div className="flex items-center space-x-2 mb-6">
              <PieChart className="h-5 w-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Writing Tone Distribution</h2>
            </div>

            {Object.keys(postsByTone).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(postsByTone)
                  .sort(([, a], [, b]) => b - a)
                  .map(([tone, count]) => (
                    <div key={tone} className="flex items-center justify-between">
                      <span className="text-slate-300 capitalize">{tone}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${(count / Math.max(...Object.values(postsByTone))) * 100}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-8">No data available</p>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-enhanced p-6 mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="h-5 w-5 text-green-400" />
            <h2 className="text-xl font-semibold text-white">Recent Activity (Last 7 Days)</h2>
          </div>

          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.slice(0, 6).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <h3 className="font-semibold text-white mb-2 line-clamp-2">{post.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${post.status === 'published'
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                      {post.status}
                    </span>
                    <span className="text-slate-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No recent activity</p>
              <p className="text-slate-500 text-sm">Create some blog posts to see your activity here</p>
            </div>
          )}
        </div>

        {/* Publishing Rate */}
        <div className="card-enhanced p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="h-5 w-5 text-indigo-400" />
            <h2 className="text-xl font-semibold text-white">Publishing Insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}%
              </p>
              <p className="text-slate-400">Published Rate</p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {recentPosts.length}
              </p>
              <p className="text-slate-400">Posts This Week</p>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {blogPosts.length > 0 ? Math.round(recentPosts.reduce((sum, p) => sum + p.word_count, 0) / (recentPosts.length || 1)) : 0}
              </p>
              <p className="text-slate-400">Avg Words/Week</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
