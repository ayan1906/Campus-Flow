import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAuth } from '../features/auth/authSlice'
import { authService } from '../services/authService'
import { isSupabaseConfigured } from '../lib/supabase'

export function useAuthInit() {
  const dispatch = useDispatch()

  useEffect(() => {
    // 1. Initial session load
    dispatch(initializeAuth())

    // 2. Realtime auth state listener if Supabase is connected
    if (isSupabaseConfigured()) {
      const { data: authListener } = authService.onAuthStateChange((event) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
          dispatch(initializeAuth())
        }
      })

      return () => {
        authListener?.subscription?.unsubscribe()
      }
    }
  }, [dispatch])
}

