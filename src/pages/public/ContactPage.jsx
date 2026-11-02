import { useState } from 'react'
import {
  Mail,
  MapPin,
  Phone,
  Clock,
  Send,
  LifeBuoy,
  CheckCircle2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      toast.success('Your message has been dispatched to IT Support.')
    }, 1000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="brand" size="sm">
          Get in Touch
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt-main">
          Campus IT & Administration Support
        </h1>
        <p className="text-sm text-txt-secondary leading-relaxed">
          Need assistance with student authentication, departmental permissions, or lost credentials? Our campus support team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <Card padding="md" className="space-y-4">
            <h3 className="text-base font-semibold text-txt-main">
              Campus Help Desk Information
            </h3>

            <div className="space-y-3 text-xs text-txt-secondary">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-txt-main">Administration Center</div>
                  <div>Building A, Level 2, Room 204</div>
                  <div>University Central Campus</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-txt-main">Support Inquiries</div>
                  <div>support@campusflow.edu</div>
                  <div>registrar@campusflow.edu</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-txt-main">Help Line</div>
                  <div>+1 (555) 392-4900 (Mon–Fri)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-txt-main">Working Hours</div>
                  <div>8:30 AM – 5:00 PM EST</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card padding="lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-1 ring-emerald-500/20">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-txt-main">
                  Inquiry Dispatched Successfully
                </h3>
                <p className="text-xs text-txt-secondary max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A campus IT advisor has been assigned to your ticket and will reply to your registered email.
                </p>
                <Button variant="secondary" size="sm" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    placeholder="e.g. Samin Yasar"
                    required
                  />
                  <Input
                    label="Institutional Email"
                    type="email"
                    placeholder="student@campusflow.edu"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Select
                    label="Inquiry Category"
                    options={[
                      { value: 'academic', label: 'Academic & Examination' },
                      { value: 'accounts', label: 'Fees & Accounts' },
                      { value: 'it', label: 'Portal Access & IT Login' },
                      { value: 'general', label: 'General University Inquiry' },
                    ]}
                    required
                  />
                  <Input
                    label="Student ID (Optional)"
                    placeholder="e.g. 2026-CSE-1049"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-medium text-txt-secondary">
                    Message Details <span className="text-danger-main">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry or technical issue..."
                    className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={loading}
                    rightIcon={Send}
                  >
                    Submit Support Request
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
