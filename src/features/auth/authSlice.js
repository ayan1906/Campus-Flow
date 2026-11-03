import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'
import { profileService } from '../../services/profileService'
import { isSupabaseConfigured } from '../../lib/supabase'

const DEMO_STORAGE_KEY = 'campusflow_demo_auth'

// Demo Mock Profiles for instant offline/unconfigured evaluation
const DEMO_ACCOUNTS = {
  'admin@campusflow.edu': {
    id: 'demo-admin-uuid-0001',
    email: 'admin@campusflow.edu',
    full_name: 'Dr. Ahmad S. Afandi',
    role: 'admin',
    student_id: null,
    department: { name: 'Administrative Office', code: 'ADMIN' },
    avatar_url: null,
    status: 'active',
  },
  'student@campusflow.edu': {
    id: 'demo-student-uuid-0002',
    email: 'student@campusflow.edu',
    full_name: 'Samin Yasar',
    role: 'student',
    student_id: '2026-CSE-1049',
    department: { name: 'Computer Science & Engineering', code: 'CSE' },
    semester: '6th Semester',
    avatar_url: null,
    status: 'active',
  },
}

/**
 * Thunk: Initialize Auth Session on application boot
 */
export const initializeAuth = createAsyncThunk(
  'auth/initializeAuth',
  async (_, { rejectWithValue }) => {
    try {
      // 1. If Supabase is connected with real credentials
      if (isSupabaseConfigured()) {
        const session = await authService.getSession()
        if (!session?.user) {
          return { user: null, profile: null, session: null, role: null }
        }

        try {
          const profile = await profileService.getProfile(session.user.id)
          return {
            user: session.user,
            profile,
            session,
            role: profile?.role || 'student',
          }
        } catch {
          // If profile table row not found yet, default from user metadata
          const role = session.user.user_metadata?.role || 'student'
          return {
            user: session.user,
            profile: {
              id: session.user.id,
              email: session.user.email,
              full_name: session.user.user_metadata?.full_name || 'Campus Student',
              role,
            },
            session,
            role,
          }
        }
      }

      // 2. Check for demo session if Supabase is in placeholder mode
      const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY)
      if (savedDemo) {
        const parsed = JSON.parse(savedDemo)
        return {
          user: { id: parsed.id, email: parsed.email },
          profile: parsed,
          session: { access_token: 'demo-token' },
          role: parsed.role,
        }
      }

      return { user: null, profile: null, session: null, role: null }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

/**
 * Thunk: User Sign In
 */
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const cleanEmail = email.trim().toLowerCase()

      // Real Supabase Auth Flow
      if (isSupabaseConfigured()) {
        const { user, session } = await authService.signIn({ email: cleanEmail, password })
        let profile = null
        try {
          profile = await profileService.getProfile(user.id)
        } catch {
          profile = {
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || 'Campus Student',
            role: user.user_metadata?.role || 'student',
          }
        }
        return {
          user,
          profile,
          session,
          role: profile?.role || 'student',
        }
      }

      // Fallback / Demo Credentials check when keys not configured
      const demoAccount = DEMO_ACCOUNTS[cleanEmail]
      if (demoAccount && password.length >= 6) {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoAccount))
        return {
          user: { id: demoAccount.id, email: demoAccount.email },
          profile: demoAccount,
          session: { access_token: 'demo-token' },
          role: demoAccount.role,
        }
      }

      // If user typed custom credentials in demo mode
      if (!isSupabaseConfigured()) {
        const isDemoAdmin = cleanEmail.includes('admin')
        const role = isDemoAdmin ? 'admin' : 'student'
        const customProfile = {
          id: `demo-${Date.now()}`,
          email: cleanEmail,
          full_name: cleanEmail.split('@')[0],
          role,
          student_id: role === 'student' ? '2026-CSE-1049' : null,
          status: 'active',
        }
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(customProfile))
        return {
          user: { id: customProfile.id, email: cleanEmail },
          profile: customProfile,
          session: { access_token: 'demo-token' },
          role,
        }
      }

      throw new Error('Invalid email or password.')
    } catch (err) {
      return rejectWithValue(err.message || 'Authentication failed')
    }
  }
)

/**
 * Thunk: User Sign Up (Student Registration)
 */
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { email, password, fullName, studentId, departmentId, semester },
    { rejectWithValue }
  ) => {
    try {
      const cleanEmail = email.trim().toLowerCase()

      if (isSupabaseConfigured()) {
        const data = await authService.signUp({
          email: cleanEmail,
          password,
          fullName,
          studentId,
          departmentId,
          semester,
        })
        return {
          user: data.user,
          session: data.session,
          message: data.session
            ? 'Account created and signed in successfully!'
            : 'Registration received! Please verify your institutional email address.',
        }
      }

      // Demo signup
      const newProfile = {
        id: `demo-${Date.now()}`,
        email: cleanEmail,
        full_name: fullName,
        role: 'student', // Strict role isolation
        student_id: studentId,
        semester,
        status: 'active',
      }
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(newProfile))
      return {
        user: { id: newProfile.id, email: cleanEmail },
        profile: newProfile,
        session: { access_token: 'demo-token' },
        role: 'student',
        message: 'Account registered successfully!',
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Registration failed')
    }
  }
)

/**
 * Thunk: Sign Out
 */
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      if (isSupabaseConfigured()) {
        await authService.signOut()
      }
      localStorage.removeItem(DEMO_STORAGE_KEY)
      return true
    } catch (err) {
      localStorage.removeItem(DEMO_STORAGE_KEY)
      return rejectWithValue(err.message)
    }
  }
)

const initialState = {
  user: null,
  profile: null,
  session: null,
  role: null, // 'student' | 'admin' | 'teacher' | null
  isAuthenticated: false,
  isLoading: true, // true until session check completes
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null
    },
    setDemoRole: (state, action) => {
      const newRole = action.payload
      if (state.profile) {
        state.profile.role = newRole
        state.role = newRole
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state.profile))
      }
    },
  },
  extraReducers: (builder) => {
    // initializeAuth
    builder
      .addCase(initializeAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.profile = action.payload.profile
        state.session = action.payload.session
        state.role = action.payload.role
        state.isAuthenticated = Boolean(action.payload.user)
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.profile = null
        state.role = null
      })

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.profile = action.payload.profile
        state.session = action.payload.session
        state.role = action.payload.role
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Failed to login'
        state.isAuthenticated = false
      })

    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload.profile) {
          state.user = action.payload.user
          state.profile = action.payload.profile
          state.session = action.payload.session
          state.role = action.payload.role || 'student'
          state.isAuthenticated = true
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || 'Registration failed'
      })

    // logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null
      state.profile = null
      state.session = null
      state.role = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    })
  },
})

export const { clearAuthError, setDemoRole } = authSlice.actions
export default authSlice.reducer
