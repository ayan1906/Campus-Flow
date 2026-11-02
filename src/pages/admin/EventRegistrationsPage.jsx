import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Users, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Avatar } from '../../components/ui/Avatar'

export function EventRegistrationsPage() {
  const { id } = useParams()

  const attendees = [
    { id: '1', name: 'Tanvir Ahmed', studentId: '2026-CSE-1049', email: 'tanvir.cse@campusflow.edu', registeredAt: 'May 02, 11:20 AM' },
    { id: '2', name: 'Nusrat Jahan', studentId: '2026-EEE-2012', email: 'nusrat.eee@campusflow.edu', registeredAt: 'May 02, 12:45 PM' },
    { id: '3', name: 'Farhana Kabir', studentId: '2026-LAW-4009', email: 'farhana.law@campusflow.edu', registeredAt: 'May 02, 02:15 PM' },
  ]

  const handleExport = () => {
    toast.success('Attendee roster exported as CSV.')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link
        to="/admin/events"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Events Management
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Event Registrations Roster
          </h2>
          <p className="text-xs text-txt-secondary">
            Annual University Hackathon 2026 • 108 Verified Registrations
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={Download}
          onClick={handleExport}
        >
          Export CSV List
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Student Attendee</TableHead>
            <TableHead>Registration ID</TableHead>
            <TableHead>Registered Timestamp</TableHead>
            <TableHead>Attendance Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendees.map((att) => (
            <TableRow key={att.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar name={att.name} size="xs" />
                  <div>
                    <div className="font-semibold text-xs text-txt-main">{att.name}</div>
                    <div className="text-[11px] text-txt-muted">{att.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-txt-secondary">
                {att.studentId}
              </TableCell>
              <TableCell className="font-mono text-xs text-txt-muted">
                {att.registeredAt}
              </TableCell>
              <TableCell>
                <Badge variant="approved" size="sm" dot>
                  Confirmed
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
