import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if user has provided real credentials or still using dummy placeholders
export const isSupabaseConfigured = () => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes('your-project') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseAnonKey.includes('your-anon') &&
    !supabaseAnonKey.includes('placeholder')
  )
}

// Create Supabase client instance
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
)

/**
 * Health check helper to test database connectivity
 * @returns {Promise<{ ok: boolean, status: 'connected' | 'unconfigured' | 'error', message: string, latencyMs?: number }>}
 */
export async function checkSupabaseHealth() {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      status: 'unconfigured',
      message: 'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not configured in .env',
    }
  }

  const startTime = performance.now()
  try {
    const { data, error } = await supabase
      .from('departments')
      .select('count', { count: 'exact', head: true })

    const latencyMs = Math.round(performance.now() - startTime)

    if (error) {
      // Table might not be migrated yet or credentials invalid
      return {
        ok: false,
        status: 'error',
        message: error.message,
        latencyMs,
      }
    }

    return {
      ok: true,
      status: 'connected',
      message: 'Successfully connected to Supabase PostgreSQL database.',
      latencyMs,
    }
  } catch (err) {
    return {
      ok: false,
      status: 'error',
      message: err.message || 'Network request failed',
      latencyMs: Math.round(performance.now() - startTime),
    }
  }
}

export default supabase
