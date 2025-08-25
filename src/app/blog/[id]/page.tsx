'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  Edit,
  Share2,
  Download,
  Eye,
  Calendar,
  User,
  Tag,
  FileText
} from 'lucide-react'

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

export default function BlogView() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPost()
  }, [params.id])

  const fetchPost = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/signin')
        return
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', params.id)
        .eq('user_id', user.id)
        .single()

      if (!error && data) {
        setPost(data)
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: post?.title,
        text: `Check out this blog post: ${post?.title}`,
        url: window.location.href
      })
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  const handleDownload = () => {
    if (!post) return

    const content = `# ${post.title}\n\n${post.content}`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading blog post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/dashboard" className="btn-primary-enhanced">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-10">
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
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Download as Markdown"
              >
                <Download className="h-4 w-4" />
              </button>
              <Link
                href={`/edit/${post.id}`}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Post Header */}
        <div className="card-enhanced p-8 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${post.status === 'published'
                ? 'bg-green-500/20 text-green-300'
                : 'bg-yellow-500/20 text-yellow-300'
              }`}>
              {post.status}
            </span>
            <span className="text-slate-400 text-sm">
              {post.word_count} words
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-6">
            {post.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2 text-slate-400">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <User className="h-4 w-4" />
              <span>Audience: {post.target_audience}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <FileText className="h-4 w-4" />
              <span>Tone: {post.tone}</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-400">
              <Tag className="h-4 w-4" />
              <span>Topic: {post.topic}</span>
            </div>
          </div>

          {post.seo_keywords && post.seo_keywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-sm text-slate-400 mb-2">SEO Keywords:</p>
              <div className="flex flex-wrap gap-2">
                {post.seo_keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="card-enhanced p-8">
          <div
            className="prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: post.content
                .replace(/\n/g, '<br>')
                .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold text-white mb-4 mt-8">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-white mb-3 mt-6">$1</h2>')
                .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold text-white mb-2 mt-4">$1</h3>')
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>')
                .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 p-4 rounded-lg text-slate-300 overflow-x-auto"><code>$1</code></pre>')
                .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-2 py-1 rounded text-slate-300">$1</code>')
                .replace(/^- (.*$)/gm, '<li class="text-slate-300 ml-4">$1</li>')
                .replace(/^(\d+)\. (.*$)/gm, '<li class="text-slate-300 ml-4">$2</li>')
            }}
          />
        </div>
      </div>
    </div>
  )
}
