import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Day 4 will connect real Supabase Auth!')
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
            Sign In to Campus Portal
          </h2>
          <p className="text-xs text-txt-secondary">
            Enter your student or administrative credentials
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Institutional Email"
              type="email"
              placeholder="id@university.edu"
              leftIcon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-txt-secondary">
                <input type="checkbox" className="rounded border-edge" />
                <span>Remember this session</span>
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
              isLoading={loading}
              rightIcon={ArrowRight}
            >
              Sign In to Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-edge text-center text-xs text-txt-muted">
            New student without an account?{' '}
            <Link to="/register" className="text-brand font-medium hover:underline">
              Register here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

