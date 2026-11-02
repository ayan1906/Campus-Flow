import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck, Mail, Building, Calendar, UserCheck, AlertTriangle } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'

export function StudentDetailPage() {
  const { id } = useParams()

  const handleStatusToggle = () => {
    toast.success('Student account status toggled.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/admin/students"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Students Directory
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-edge">
          <div className="flex items-center gap-4">
            <Avatar name="Tanvir Ahmed" size="lg" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-txt-main">Tanvir Ahmed</h2>
                <Badge variant="approved" size="sm" dot>
                  Active Enrolled
                </Badge>
              </div>
              <div className="text-xs text-txt-muted font-mono mt-0.5">
                ID: 2026-CSE-1049 • tanvir.cse@campusflow.edu
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={handleStatusToggle}>
              Toggle Account Status
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-surface-secondary border border-edge">
            <span className="text-txt-muted block">Faculty</span>
            <span className="font-semibold text-txt-main">Science & Engineering</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-secondary border border-edge">
            <span className="text-txt-muted block">Department</span>
            <span className="font-semibold text-txt-main">Computer Science</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-secondary border border-edge">
            <span className="text-txt-muted block">Batch / Semester</span>
            <span className="font-semibold text-txt-main">6th Semester (Spring 2026)</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-secondary border border-edge">
            <span className="text-txt-muted block">Admitted At</span>
            <span className="font-semibold text-txt-main">Fall 2023</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-txt-main">Student Platform Records</h4>
          <div className="p-4 rounded-xl border border-edge bg-surface-secondary/40 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-edge">
              <span className="text-txt-secondary">Notices Read Confirmation</span>
              <span className="font-semibold text-txt-main">24 Notices</span>
            </div>
            <div className="flex justify-between py-1 border-b border-edge">
              <span className="text-txt-secondary">Event Registrations</span>
              <span className="font-semibold text-txt-main">3 Events</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-txt-secondary">Helpdesk Tickets Raised</span>
              <span className="font-semibold text-txt-main">2 Resolved Tickets</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
