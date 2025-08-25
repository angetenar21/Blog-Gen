'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import {
  PlusCircle,
  FileText,
  BarChart,
  Settings,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Clock,
  TrendingUp
} from "lucide-react"

interface BlogPost {
  id: string
  title: string
  content: string
  status: 'draft' | 'published'
  topic: string
  target_audience: string
  tone: string
  word_count: number
  seo_keywords: string[]
  created_at: string
  updated_at: string
}

export default function EnhancedDashboard() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'published'>('all')
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
        .select('*')
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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id)

      if (!error) {
        setBlogPosts(blogPosts.filter(post => post.id !== id))
      }
    } catch (error) {
      console.error('Error deleting blog post:', error)
    }
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.topic.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || post.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: blogPosts.length,
    published: blogPosts.filter(p => p.status === 'published').length,
    drafts: blogPosts.filter(p => p.status === 'draft').length,
    totalWords: blogPosts.reduce((sum, p) => sum + p.word_count, 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
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
              <div className="text-2xl font-bold gradient-text">BlogAI</div>
              <nav className="hidden md:flex space-x-6">
                <Link href="/dashboard" className="text-white hover:text-blue-300 transition-colors">
                  Dashboard
                </Link>
                <Link href="/create" className="text-slate-300 hover:text-white transition-colors">
                  Create
                </Link>
                <Link href="/analytics" className="text-slate-300 hover:text-white transition-colors">
                  Analytics
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="p-2 text-slate-300 hover:text-white transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button 
                onClick={handleSignOut}
                className="p-2 text-slate-300 hover:text-red-300 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-enhanced pl-10 pr-4 py-2 w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'published')}
              className="input-enhanced px-3 py-2"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
          
          <Link 
            href="/create"
            className="btn-primary-enhanced inline-flex items-center space-x-2 px-4 py-2"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create New Post</span>
          </Link>
        </div>

        {/* Blog Posts */}
        {filteredPosts.length === 0 ? (
          <div className="card-enhanced p-12 text-center">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {searchTerm || filterStatus !== 'all' ? 'No posts found' : 'No blog posts yet'}
            </h3>
            <p className="text-slate-400 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Create your first AI-generated blog post to get started'
              }
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link href="/create" className="btn-primary-enhanced inline-flex items-center space-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>Create Your First Post</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div key={post.id} className="card-enhanced p-6 hover-lift">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.status === 'published' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {post.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {post.word_count} words
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button className="p-2 text-slate-400 hover:text-white transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-slate-400">
                    <span className="font-medium">Topic:</span> {post.topic}
                  </p>
                  <p className="text-sm text-slate-400">
                    <span className="font-medium">Audience:</span> {post.target_audience}
                  </p>
                  <p className="text-sm text-slate-400">
                    <span className="font-medium">Tone:</span> {post.tone}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <span className="text-xs text-slate-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="p-1 text-slate-400 hover:text-blue-300 transition-colors"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link 
                      href={`/edit/${post.id}`}
                      className="p-1 text-slate-400 hover:text-green-300 transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="p-1 text-slate-400 hover:text-red-300 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <Link 
        href="/create"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 z-50"
      >
        <PlusCircle className="h-6 w-6" />
      </Link>
    </div>
  )
}
