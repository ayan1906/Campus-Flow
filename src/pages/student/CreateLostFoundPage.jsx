import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { LOST_FOUND_CATEGORIES } from '../../utils/constants'

export function CreateLostFoundPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [reportType, setReportType] = useState('lost')

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Lost & Found report submitted for admin verification.')
      navigate('/student/lost-found')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/student/lost-found"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Lost & Found
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="pb-4 border-b border-edge">
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Report an Item
          </h2>
          <p className="text-xs text-txt-secondary mt-1">
            Provide descriptive details to help identify and return the item.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setReportType('lost')}
              className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                reportType === 'lost'
                  ? 'border-brand bg-brand/10 text-brand ring-1 ring-brand/30'
                  : 'border-edge bg-surface text-txt-secondary hover:text-txt-main'
              }`}
            >
              I Lost Something
            </button>
            <button
              type="button"
              onClick={() => setReportType('found')}
              className={`p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                reportType === 'found'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30'
                  : 'border-edge bg-surface text-txt-secondary hover:text-txt-main'
              }`}
            >
              I Found Something
            </button>
          </div>

          <Input
            label="Item Title"
            placeholder="e.g. Blue HP Laptop Charger"
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Item Category"
              options={LOST_FOUND_CATEGORIES}
              required
            />
            <Input
              label="Campus Location"
              placeholder="e.g. Science Lab 3, 2nd Floor"
              required
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Description & Distinguishing Marks
            </label>
            <textarea
              rows={3}
              placeholder="Include unique stickers, scratches, or colors..."
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
              required
            />
          </div>

          {/* Photo Upload Zone */}
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Attach Photo (Supabase Storage)
            </label>
            <div className="border border-dashed border-edge rounded-xl p-6 text-center hover:border-brand/40 transition-colors cursor-pointer bg-surface-secondary/40">
              <Upload className="w-6 h-6 mx-auto text-txt-muted mb-2" />
              <div className="text-xs font-medium text-txt-main">
                Click to upload image or drag and drop
              </div>
              <div className="text-[11px] text-txt-muted mt-1">
                PNG, JPG or WEBP up to 5MB
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-edge">
            <Link to="/student/lost-found">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
            >
              Submit Report
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

