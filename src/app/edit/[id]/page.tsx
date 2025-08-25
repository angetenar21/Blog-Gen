'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  Save,
  Eye,
  Loader
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

export default function EditBlog() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')

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
        setTitle(data.title)
        setContent(data.content)
        setStatus(data.status)
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

  const handleSave = async () => {
    if (!post) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: title,
          content: content,
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', post.id)

      if (!error) {
        router.push(`/blog/${post.id}`)
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
    } finally {
      setSaving(false)
    }
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
                href={`/blog/${post.id}`}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Post</span>
              </Link>
              <h1 className="text-lg font-semibold text-white">Edit Blog Post</h1>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="input-enhanced px-3 py-2 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <Link
                href={`/blog/${post.id}`}
                className="p-2 text-slate-300 hover:text-white transition-colors"
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </Link>

              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary-enhanced flex items-center space-x-2 px-4 py-2"
              >
                {saving ? (
                  <>
                    <Loader className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
          {/* Editor */}
          <div className="card-enhanced p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4">Editor</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-enhanced w-full px-3 py-2"
                placeholder="Blog post title..."
              />
            </div>

            <div className="flex-1 flex flex-col">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input-enhanced w-full flex-1 p-3 resize-none font-mono text-sm"
                placeholder="Write your blog content here... (Markdown supported)"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="card-enhanced p-6 flex flex-col">
            <h2 className="text-lg font-semibold text-white mb-4">Preview</h2>

            <div className="flex-1 overflow-y-auto">
              <h1 className="text-2xl font-bold gradient-text mb-6">
                {title || 'Untitled Post'}
              </h1>

              <div
                className="prose prose-invert max-w-none text-slate-300"
                dangerouslySetInnerHTML={{
                  __html: content
                    .replace(/\n/g, '<br>')
                    .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-white mb-4 mt-6">$1</h1>')
                    .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-white mb-3 mt-5">$1</h2>')
                    .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold text-white mb-2 mt-4">$1</h3>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="text-slate-300 italic">$1</em>')
                    .replace(/```([\s\S]*?)```/g, '<pre class="bg-slate-800 p-3 rounded-lg text-slate-300 overflow-x-auto text-sm"><code>$1</code></pre>')
                    .replace(/`([^`]+)`/g, '<code class="bg-slate-800 px-1 py-0.5 rounded text-slate-300 text-sm">$1</code>')
                    .replace(/^- (.*$)/gm, '<li class="text-slate-300 ml-4 mb-1">$1</li>')
                    .replace(/^(\d+)\. (.*$)/gm, '<li class="text-slate-300 ml-4 mb-1">$2</li>')
                }}
              />
            </div>
          </div>
        </div>

        {/* Post Info */}
        <div className="card-enhanced p-6 mt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Post Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Topic:</span>
              <p className="text-white">{post.topic}</p>
            </div>
            <div>
              <span className="text-slate-400">Target Audience:</span>
              <p className="text-white">{post.target_audience}</p>
            </div>
            <div>
              <span className="text-slate-400">Tone:</span>
              <p className="text-white">{post.tone}</p>
            </div>
            <div>
              <span className="text-slate-400">Original Word Count:</span>
              <p className="text-white">{post.word_count} words</p>
            </div>
          </div>

          {post.seo_keywords && post.seo_keywords.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <span className="text-slate-400 text-sm">SEO Keywords:</span>
              <div className="flex flex-wrap gap-2 mt-2">
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
      </div>
    </div>
  )
}
