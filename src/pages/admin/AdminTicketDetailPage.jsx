import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Send, CheckCircle2, User, Clock, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Select } from '../../components/ui/Select'

export function AdminTicketDetailPage() {
  const { id } = useParams()
  const [replyText, setReplyText] = useState('')
  const [ticketStatus, setTicketStatus] = useState('in_progress')
  const [loading, setLoading] = useState(false)

  const handleSendReply = (e) => {
    e.preventDefault()
    if (!replyText.trim()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setReplyText('')
      toast.success('Official reply posted and emailed to student.')
    }, 800)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/admin/helpdesk"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Help Desk Queue
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-edge">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand">
                #CF-TICK-{id || '1042'}
              </span>
              <Badge variant={ticketStatus} size="sm" dot>
                {ticketStatus === 'resolved' ? 'Resolved' : 'In Progress'}
              </Badge>
            </div>
            <h2 className="text-lg font-bold text-txt-main">
              Lab Computer Network Access & Wi-Fi Credential Error
            </h2>
            <div className="text-xs text-txt-muted">
              Submitted by Samin Yasar (CSE Dept • ID: 2026-CSE-1049) on May 02, 2026
            </div>
          </div>

          <div className="w-36">
            <Select
              value={ticketStatus}
              onChange={(e) => {
                setTicketStatus(e.target.value)
                toast.success(`Ticket status changed to ${e.target.value}`)
              }}
              options={[
                { value: 'pending', label: 'Open' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'resolved', label: 'Resolved' },
              ]}
              className="h-8 text-xs"
            />
          </div>
        </div>

        {/* Message Thread */}
        <div className="space-y-4">
          {/* Student Initial Message */}
          <div className="p-4 rounded-xl bg-surface-secondary/70 border border-edge space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-txt-main">Samin Yasar (Student)</span>
              <span className="text-txt-muted font-mono">10:45 AM</span>
            </div>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Whenever I try to log into the terminal computers in CS Lab 3, it says 'Authentication token expired'. My university email password does not seem to sync with the Active Directory LDAP server.
            </p>
          </div>

          {/* Admin Response */}
          <div className="p-4 rounded-xl bg-brand/5 border border-brand/20 space-y-2 ml-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-brand">Campus Network Operations (Admin)</span>
              <span className="text-txt-muted font-mono">11:30 AM</span>
            </div>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Hello Samin. We checked your LDAP sync record and regenerated the network certificate for Lab 3. Please restart your workstation terminal and test again.
            </p>
          </div>
        </div>

        {/* Reply Form */}
        <form onSubmit={handleSendReply} className="space-y-3 pt-4 border-t border-edge">
          <label className="block text-xs font-semibold text-txt-main">
            Post Official Administrative Reply:
          </label>
          <textarea
            rows={3}
            required
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your response to the student..."
            className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none placeholder:text-txt-muted"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={loading}
              rightIcon={Send}
            >
              Send Reply
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
