import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, LifeBuoy } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { TICKET_CATEGORIES } from '../../utils/constants'

export function CreateTicketPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('Support ticket #CF-TICK-1043 created successfully!')
      navigate('/student/helpdesk')
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link
        to="/student/helpdesk"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Help Desk
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="pb-4 border-b border-edge">
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Raise a Support Ticket
          </h2>
          <p className="text-xs text-txt-secondary mt-1">
            Assigned directly to departmental heads and administrative advisors.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Inquiry Subject / Title"
            placeholder="e.g. Wi-Fi Access token error in CS Lab 3"
            required
          />

          <Select
            label="Department / Issue Category"
            options={TICKET_CATEGORIES}
            required
          />

          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Describe the Issue in Detail <span className="text-danger-main">*</span>
            </label>
            <textarea
              rows={5}
              required
              placeholder="State what occurred, your student ID, and any relevant steps..."
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-edge">
            <Link to="/student/helpdesk">
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
              Submit Ticket
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
