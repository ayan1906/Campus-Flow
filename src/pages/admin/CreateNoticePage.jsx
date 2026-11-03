import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Pin, CheckCircle2, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { NOTICE_CATEGORIES } from '../../utils/constants'

export function CreateNoticePage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [pinned, setPinned] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Notice published to all student feeds!')
      navigate('/admin/notices')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/admin/notices"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Notice Management
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="pb-4 border-b border-edge">
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Publish Official Campus Notice
          </h2>
          <p className="text-xs text-txt-secondary mt-1">
            Broadcast announcement to target faculties and track student read receipts
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Notice Title"
            placeholder="e.g. Schedule for Final Year Thesis Defense"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Notice Category"
              options={NOTICE_CATEGORIES.filter((c) => c !== 'All')}
              required
            />
            <Select
              label="Target Faculty / Department"
              options={[
                { value: 'all', label: 'All Departments (Campus-wide)' },
                { value: 'cse', label: 'Computer Science & Engineering' },
                { value: 'eee', label: 'Electrical Engineering' },
                { value: 'bba', label: 'Business Administration' },
              ]}
              required
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Notice Content Body <span className="text-danger-main">*</span>
            </label>
            <textarea
              rows={5}
              required
              placeholder="Provide complete details, dates, and instructions..."
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
            />
          </div>

          {/* PDF Attachment Upload */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Attach Official PDF Routine / Memo (Supabase Storage)
            </label>
            <div className="border border-dashed border-edge rounded-xl p-5 text-center hover:border-brand/40 transition-colors cursor-pointer bg-surface-secondary/40">
              <Upload className="w-5 h-5 mx-auto text-txt-muted mb-1.5" />
              <div className="text-xs font-medium text-txt-main">
                Click to attach official PDF document
              </div>
              <div className="text-[11px] text-txt-muted">
                PDF format up to 10MB
              </div>
            </div>
          </div>

          {/* Pin Toggle */}
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-secondary/50 border border-edge cursor-pointer select-none">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
              className="rounded border-edge h-4 w-4 text-brand"
            />
            <div className="text-xs">
              <span className="font-semibold text-txt-main block">
                Pin to top of Student Notice Board
              </span>
              <span className="text-txt-muted">
                Urgent notices remain highlighted until unpinned
              </span>
            </div>
          </label>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-edge">
            <Link to="/admin/notices">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              rightIcon={Send}
            >
              Publish Notice
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

