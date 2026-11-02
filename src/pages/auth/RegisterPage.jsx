import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Layers, Mail, Lock, User, GraduationCap, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'

export function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Registration flow ready for Day 4 Supabase Auth!')
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
            Create Student Account
          </h2>
          <p className="text-xs text-txt-secondary">
            Join your institutional department and semester workspace
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Samin Yasar"
              leftIcon={User}
              required
            />

            <Input
              label="Institutional Email"
              type="email"
              placeholder="student@university.edu"
              leftIcon={Mail}
              helperText="Only verified student .edu domains permitted"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Department"
                options={[
                  { value: 'cse', label: 'CSE' },
                  { value: 'eee', label: 'EEE' },
                  { value: 'bba', label: 'BBA' },
                  { value: 'law', label: 'LAW' },
                ]}
                required
              />
              <Select
                label="Semester"
                options={[
                  { value: '1', label: '1st' },
                  { value: '2', label: '2nd' },
                  { value: '3', label: '3rd' },
                  { value: '4', label: '4th' },
                  { value: '5', label: '5th' },
                  { value: '6', label: '6th' },
                  { value: '7', label: '7th' },
                  { value: '8', label: '8th' },
                ]}
                required
              />
            </div>

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              leftIcon={Lock}
              helperText="Must be at least 8 characters"
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
              Register Account
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-edge text-center text-xs text-txt-muted">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-medium hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
