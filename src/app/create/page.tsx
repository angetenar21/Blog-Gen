'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function CreatePost() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    topic: '',
    targetAudience: '',
    tone: 'professional',
    wordCount: '500',
    keywords: ''
  })
  const [generatedContent, setGeneratedContent] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setGeneratedContent('')

    try {
      const response = await fetch('/api/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error)
      }

      setGeneratedContent(result.content)
    } catch (error) {
      console.error('Generation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate blog post'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoGenerate = async () => {
    setLoading(true)
    setError('')
    setGeneratedContent('')

    try {
      const response = await fetch('/api/demo-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error)
      }

      setGeneratedContent(result.content)
    } catch (error) {
      console.error('Demo generation error:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate demo blog post')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (status: 'draft' | 'published') => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase.from('blog_posts').insert({
        user_id: user.id,
        title: `Blog Post: ${formData.topic}`,
        content: generatedContent,
        status,
        topic: formData.topic,
        target_audience: formData.targetAudience,
        tone: formData.tone,
        word_count: parseInt(formData.wordCount),
        seo_keywords: formData.keywords.split(',').map(k => k.trim())
      })

      if (!error) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Save error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="card-enhanced p-8 mb-6">
          <h1 className="text-3xl font-bold gradient-text mb-6">Create AI Blog Post</h1>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Blog Topic *
              </label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="input-enhanced w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="e.g., 'Benefits of Remote Work'"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                className="input-enhanced w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="e.g., 'HR professionals'"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => setFormData({ ...formData, tone: e.target.value })}
                className="input-enhanced w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="technical">Technical</option>
                <option value="friendly">Friendly</option>
                <option value="authoritative">Authoritative</option>
                <option value="conversational">Conversational</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Word Count
              </label>
              <select
                value={formData.wordCount}
                onChange={(e) => setFormData({ ...formData, wordCount: e.target.value })}
                className="input-enhanced w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              >
                <option value="300">Short (300 words)</option>
                <option value="500">Medium (500 words)</option>
                <option value="800">Long (800 words)</option>
                <option value="1200">Extended (1200 words)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                SEO Keywords (comma separated)
              </label>
              <input
                type="text"
                value={formData.keywords}
                onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                className="input-enhanced w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="e.g., remote work, productivity, work-life balance"
              />
            </div>

            <div className="md:col-span-2 space-y-3">
              <button
                type="submit"
                disabled={loading || !formData.topic}
                className="btn-primary-enhanced w-full py-3 disabled:opacity-50"
              >
                {loading ? '✨ Generating AI Content...' : '✨ Generate AI Blog Post'}
              </button>

              <button
                type="button"
                onClick={handleDemoGenerate}
                disabled={loading || !formData.topic}
                className="w-full py-3 px-4 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-500 rounded-lg transition-all duration-200 text-slate-300 hover:text-white disabled:opacity-50"
              >
                {loading ? 'Generating Demo...' : '📝 Try Demo Version'}
              </button>

              <p className="text-xs text-slate-400 text-center">
                Use demo version if you encounter API quota issues
              </p>
            </div>
          </form>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <h3 className="text-red-300 font-semibold mb-2">⚠️ Generation Failed</h3>
              <p className="text-red-200 text-sm">{error}</p>

              {error.includes('Gemini API key') && (
                <div className="mt-3 text-red-200 text-sm">
                  <p><strong>To fix this:</strong></p>
                  <ol className="list-decimal list-inside mt-1 space-y-1">
                    <li>Get an API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a></li>
                    <li>Add it to your .env.local file: <code className="bg-black/30 px-1 rounded">GEMINI_API_KEY=your_key_here</code></li>
                    <li>Restart your development server</li>
                  </ol>
                </div>
              )}

              {error.includes('quota') && (
                <div className="mt-3 text-red-200 text-sm">
                  <p><strong>Quota exceeded:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Check your usage limits in <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline">Google AI Studio</a></li>
                    <li>Or try the demo version above while checking your quota</li>
                    <li>Gemini has generous free tier limits</li>
                  </ul>
                </div>
              )}

              {error.includes('rate limit') && (
                <div className="mt-3 text-red-200 text-sm">
                  <p><strong>Rate limit exceeded:</strong></p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Wait a few minutes before trying again</li>
                    <li>Or use the demo version above</li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {generatedContent && (
          <div className="card-enhanced p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Generated Content</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => handleSave('draft')}
                  className="px-4 py-2 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800/50 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  onClick={() => handleSave('published')}
                  className="btn-primary-enhanced px-4 py-2"
                >
                  Publish
                </button>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-6 text-slate-200 leading-relaxed">
              <pre className="whitespace-pre-wrap font-sans">{generatedContent}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
