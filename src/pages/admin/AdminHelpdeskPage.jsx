import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LifeBuoy, Search, Filter, MessageSquare, Clock } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function AdminHelpdeskPage() {
  const [search, setSearch] = useState('')

  const tickets = [
    { id: '1042', subject: 'Lab Computer Network Access Error', student: 'Samin Yasar (CSE)', category: 'IT Support', date: 'May 02, 2026', status: 'in_progress', priority: 'High' },
    { id: '1040', subject: 'Hostel Room Change Request', student: 'Rifat Hossain (EEE)', category: 'Hostel', date: 'May 02, 2026', status: 'pending', priority: 'Medium' },
    { id: '1038', subject: 'Tuition Fee Installment Slip Missing', student: 'Ayesha Siddika (BBA)', category: 'Accounts', date: 'Apr 27, 2026', status: 'resolved', priority: 'Normal' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Help Desk Administration Queue
          </h2>
          <p className="text-xs text-txt-secondary">
            Resolve student technical inquiries, fee discrepancies, and academic requests
          </p>
        </div>

        <div className="w-48 sm:w-64">
          <Input
            placeholder="Search ticket ID or student..."
            leftIcon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 text-xs"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Inquiry Subject</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono text-xs font-semibold text-brand">
                #CF-TICK-{t.id}
              </TableCell>
              <TableCell className="font-semibold text-xs text-txt-main">
                {t.subject}
              </TableCell>
              <TableCell className="text-xs text-txt-secondary">{t.student}</TableCell>
              <TableCell className="text-xs text-txt-muted">{t.category}</TableCell>
              <TableCell>
                <Badge variant={t.status} size="sm" dot>
                  {t.status === 'resolved' ? 'Resolved' : t.status === 'in_progress' ? 'In Progress' : 'Open'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/helpdesk/${t.id}`}>
                  <Button variant="ghost" size="sm">
                    Reply & Manage →
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
