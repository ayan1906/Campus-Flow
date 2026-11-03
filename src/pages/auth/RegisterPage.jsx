import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Layers, Mail, Lock, User, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { registerUser } from '../../features/auth/authSlice'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'

export function RegisterPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading, error } = useSelector((state) => state.auth)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      studentId: '',
      departmentId: 'd1111111-1111-1111-1111-111111111111',
      semester: '1st Semester',
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        registerUser({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          studentId: data.studentId,
          departmentId: data.departmentId,
          semester: data.semester,
        })
      )

      if (registerUser.fulfilled.match(resultAction)) {
        toast.success(resultAction.payload.message || 'Account registered successfully!')
        navigate('/student/dashboard', { replace: true })
      } else {
        toast.error(resultAction.payload || 'Registration could not be completed.')
      }
    } catch (err) {
      toast.error('An unexpected error occurred.')
    }
  }

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg space-y-6 animate-in fade-in duration-200">
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
            Create Student Account
          </h2>
          <p className="text-xs text-txt-secondary">
            Join your institutional department and semester workspace
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-danger-main/10 border border-danger-main/20 text-xs text-danger-main font-medium">
                {error}
              </div>
            )}

            <Input
              label="Full Legal Name"
              placeholder="e.g. Samin Yasar"
              leftIcon={User}
              error={errors.fullName?.message}
              {...register('fullName', {
                required: 'Full name is required',
                minLength: { value: 3, message: 'Must be at least 3 characters' },
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Institutional Email"
                type="email"
                placeholder="samin@campusflow.edu"
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
                label="Student Registration ID"
                placeholder="e.g. 2026-CSE-1049"
                error={errors.studentId?.message}
                {...register('studentId', {
                  required: 'Student ID is required',
                })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Academic Department"
                error={errors.departmentId?.message}
                options={[
                  { value: 'd1111111-1111-1111-1111-111111111111', label: 'Computer Science (CSE)' },
                  { value: 'd2222222-2222-2222-2222-222222222222', label: 'Electrical Engineering (EEE)' },
                  { value: 'd3333333-3333-3333-3333-333333333333', label: 'Business Administration (BBA)' },
                  { value: 'd4444444-4444-4444-4444-444444444444', label: 'Department of Law (LAW)' },
                ]}
                {...register('departmentId', { required: 'Department is required' })}
              />

              <Select
                label="Current Semester"
                error={errors.semester?.message}
                options={[
                  '1st Semester',
                  '2nd Semester',
                  '3rd Semester',
                  '4th Semester',
                  '5th Semester',
                  '6th Semester',
                  '7th Semester',
                  '8th Semester',
                ]}
                {...register('semester', { required: 'Semester is required' })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••••••"
                leftIcon={Lock}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val) => val === password || 'Passwords do not match',
                })}
              />
            </div>

            <div className="p-3 rounded-lg bg-surface-secondary/70 border border-edge text-[11px] text-txt-muted flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span>
                By creating an account, you agree to CampusFlow terms. Your account will automatically register under the verified <strong>Student</strong> role.
              </span>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full justify-center"
              isLoading={isLoading}
              rightIcon={ArrowRight}
            >
              Complete Registration
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
