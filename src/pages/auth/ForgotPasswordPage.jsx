import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, Mail, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
      toast.success('Recovery link sent to your institutional inbox.')
    }, 800)
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs">
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
            Enter your university email to receive a password reset link
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
                We sent password recovery instructions to <span className="font-semibold text-txt-main">{email}</span>.
              </p>
              <Link to="/login" className="inline-block pt-2">
                <Button variant="secondary" size="sm">
                  Return to Login
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Institutional Email"
                type="email"
                placeholder="student@university.edu"
                leftIcon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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

