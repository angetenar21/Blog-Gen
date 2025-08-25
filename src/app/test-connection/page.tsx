// Test Supabase connection
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const testConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession()
      console.log('Supabase connection test:', { data, error })

      // Test a simple query
      const { data: testData, error: testError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

      console.log('Database test:', { testData, testError })
    } catch (err) {
      console.error('Connection test failed:', err)
    }
  }

  return (
    <div className="p-4">
      <button onClick={testConnection} className="bg-blue-500 text-white px-4 py-2 rounded">
        Test Supabase Connection
      </button>
    </div>
  )
}
