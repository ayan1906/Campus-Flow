import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Layers, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { authService } from '../../services/authService'
import { isSupabaseConfigured } from '../../lib/supabase'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      if (isSupabaseConfigured()) {
        await authService.resetPasswordForEmail(data.email)
      }
      setSubmittedEmail(data.email)
      setSent(true)
      toast.success('Password reset link sent to your institutional inbox.')
    } catch (err) {
      toast.error(err.message || 'Failed to dispatch reset email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 animate-in fade-in duration-200">
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
            Recover Account Password
          </h2>
          <p className="text-xs text-txt-secondary">
            Enter your university email to receive a secure password recovery link
          </p>
        </div>

        <Card padding="lg">
          {sent ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-1 ring-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-txt-main">
                Check Your Inbox
              </h3>
              <p className="text-xs text-txt-secondary leading-relaxed">
                We dispatched password recovery instructions to{' '}
                <span className="font-semibold text-txt-main">{submittedEmail}</span>.
              </p>
              <Link to="/login" className="inline-block pt-2">
                <Button variant="secondary" size="sm">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Institutional Email"
                type="email"
                placeholder="samin.cse@campusflow.edu"
                leftIcon={Mail}
                error={errors.email?.message}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Please enter a valid email address',
                  },
                })}
              />

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full justify-center"
                isLoading={loading}
                rightIcon={ArrowRight}
              >
                Send Recovery Instructions
              </Button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-edge text-center text-xs">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-txt-secondary hover:text-txt-main font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
