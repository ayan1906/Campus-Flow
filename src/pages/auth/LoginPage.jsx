import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Layers, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, UserCheck, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { loginUser } from '../../features/auth/authSlice'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoading, error } = useSelector((state) => state.auth)

  const from = location.state?.from?.pathname

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        loginUser({ email: data.email, password: data.password })
      )

      if (loginUser.fulfilled.match(resultAction)) {
        const role = resultAction.payload.role
        toast.success(`Welcome back, ${resultAction.payload.profile?.full_name || 'User'}!`, {
          icon: '🎓',
        })

        // Route to requested page or default based on role
        if (from) {
          navigate(from, { replace: true })
        } else if (role === 'admin') {
          navigate('/admin/dashboard', { replace: true })
        } else {
          navigate('/student/dashboard', { replace: true })
        }
      } else {
        toast.error(resultAction.payload || 'Invalid credentials.')
      }
    } catch (err) {
      toast.error('An unexpected error occurred during sign in.')
    }
  }

  // Helper to fill demo credentials and immediately sign in
  const handleQuickDemo = async (role) => {
    const creds =
      role === 'student'
        ? { email: 'student@campusflow.edu', password: 'student123' }
        : { email: 'admin@campusflow.edu', password: 'admin123' }

    setValue('email', creds.email)
    setValue('password', creds.password)
    await onSubmit(creds)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-200">
        {/* Brand Top Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 duration-150">
              <Layers className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-txt-main">
              CampusFlow
            </span>
          </Link>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Sign In to Campus Portal
          </h2>
          <p className="text-xs text-txt-secondary">
            Enter your university credentials to access notices, events, and support
          </p>
        </div>

        {/* Quick Demo Credentials Bar */}
        <div className="p-3 rounded-xl bg-surface border border-edge flex items-center justify-between text-xs">
          <span className="text-txt-muted flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            Quick Demo:
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('student')}
              className="px-2.5 py-1 rounded-md bg-brand/10 text-brand font-medium hover:bg-brand/20 transition-colors cursor-pointer"
            >
              Student Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('admin')}
              className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-indigo-500/20 transition-colors cursor-pointer"
            >
              Admin Demo
            </button>
          </div>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-danger-main/10 border border-danger-main/20 text-xs text-danger-main font-medium">
                {error}
              </div>
            )}

            <Input
              label="Institutional Email"
              type="email"
              placeholder="e.g. samin.cse@campusflow.edu"
              leftIcon={Mail}
              error={errors.email?.message}
              {...register('email', {
                required: 'Institutional email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email address',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={Lock}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-txt-secondary select-none">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="rounded border-edge h-4 w-4 text-brand focus:ring-brand"
                />
                <span>Remember this device</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-brand hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Sign In to Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-edge text-center text-xs text-txt-muted">
            New student without an account?{' '}
            <Link to="/register" className="text-brand font-medium hover:underline">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
