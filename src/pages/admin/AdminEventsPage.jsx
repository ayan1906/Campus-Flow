import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Plus, Users, MapPin, Trash2, Edit } from 'lucide-react'
import toast from 'react-hot-toast'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export function AdminEventsPage() {
  const events = [
    { id: '1', title: 'Annual University Hackathon 2026', venue: 'Main Auditorium', date: 'May 15, 2026', capacity: 120, registered: 108, status: 'approved' },
    { id: '2', title: 'AI in Healthcare & Biotechnology Workshop', venue: 'Room 402, CS Complex', date: 'May 18, 2026', capacity: 60, registered: 42, status: 'approved' },
    { id: '3', title: 'Inter-Department Debate Championship', venue: 'Amphitheatre', date: 'May 20, 2026', capacity: 200, registered: 140, status: 'approved' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Campus Events Management
          </h2>
          <p className="text-xs text-txt-secondary">
            Schedule workshops, monitor real-time participant capacity, and view registration lists
          </p>
        </div>

        <Button variant="primary" size="sm" leftIcon={Plus} onClick={() => toast.success('Event creation modal ready.')}>
          Schedule Event
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Event Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Venue</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((evt) => (
            <TableRow key={evt.id}>
              <TableCell className="font-semibold text-xs text-txt-main">
                {evt.title}
              </TableCell>
              <TableCell className="text-xs text-txt-secondary font-mono">{evt.date}</TableCell>
              <TableCell className="text-xs text-txt-muted">{evt.venue}</TableCell>
              <TableCell className="font-mono text-xs font-semibold text-brand">
                {evt.registered} Students
              </TableCell>
              <TableCell className="font-mono text-xs text-txt-muted">
                {evt.capacity} Max
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/events/${evt.id}/registrations`}>
                  <Button variant="ghost" size="sm">
                    View Attendees →
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

