'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...')
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Check Supabase client creation
      setStatus('✅ Supabase client created')

      // Test 2: Check session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        setStatus(`❌ Session error: ${sessionError.message}`)
        return
      }
      setSession(session)

      // Test 3: Check user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError) {
        setStatus(`❌ User error: ${userError.message}`)
        return
      }
      setUser(user)

      // Test 4: Test database connection
      const { error } = await supabase.from('profiles').select('count')
      if (error) {
        if (error.message.includes('relation "profiles" does not exist')) {
          setStatus('⚠️ Database connected but profiles table doesn\'t exist')
        } else {
          setStatus(`❌ Database error: ${error.message}`)
        }
      } else {
        setStatus('✅ Full connection successful')
      }
    } catch (err) {
      setStatus(`❌ Connection failed: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="card-enhanced max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold gradient-text mb-6">Supabase Connection Test</h1>

        <div className="space-y-4">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Connection Status</h3>
            <p className="text-slate-300">{status}</p>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Environment Variables</h3>
            <p className="text-slate-300">
              URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}
            </p>
            <p className="text-slate-300">
              Key: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}
            </p>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Current Session</h3>
            <pre className="text-sm text-slate-300 overflow-auto">
              {session ? JSON.stringify(session, null, 2) : 'No active session'}
            </pre>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Current User</h3>
            <pre className="text-sm text-slate-300 overflow-auto">
              {user ? JSON.stringify(user, null, 2) : 'No authenticated user'}
            </pre>
          </div>

          <button
            onClick={testConnection}
            className="btn-primary-enhanced w-full py-3"
          >
            Retest Connection
          </button>
        </div>
      </div>
    </div>
  )
}
