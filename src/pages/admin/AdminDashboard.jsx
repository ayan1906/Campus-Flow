import { Link } from 'react-router-dom'
import {
  Users,
  Bell,
  Calendar,
  LifeBuoy,
  FolderSearch,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Avatar } from '../../components/ui/Avatar'

export function AdminDashboard() {
  const metrics = [
    { label: 'Total Enrolled Students', value: '4,892', change: '+12% this term', icon: Users, color: 'text-indigo-500' },
    { label: 'Active Notices', value: '38', change: '4 Pinned', icon: Bell, color: 'text-brand' },
    { label: 'Open Help Desk Tickets', value: '7', change: 'Avg response 1.8h', icon: LifeBuoy, color: 'text-amber-500' },
    { label: 'Unverified Lost Items', value: '5', change: 'Requires review', icon: FolderSearch, color: 'text-rose-500' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-surface border border-edge shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-500 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Administrative Governance Console</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-txt-main">
            Campus Operations Overview
          </h2>
          <p className="text-xs text-txt-secondary">
            Centralized management for student records, verified notices, and ticketing pipelines
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/admin/notices/create">
            <Button variant="primary" size="sm" leftIcon={Bell}>
              Post Notice
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button variant="secondary" size="sm" leftIcon={TrendingUp}>
              View Analytics
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon
          return (
            <Card key={idx} padding="md" className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-txt-muted">{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className="text-2xl font-bold font-mono text-txt-main">
                {m.value}
              </div>
              <div className="text-[11px] text-txt-secondary font-medium">
                {m.change}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Roster & Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Student Registrations (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <Card padding="md">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-edge">
              <div>
                <CardTitle>Recent Student Signups</CardTitle>
                <CardDescription>Verified academic admissions</CardDescription>
              </div>
              <Link to="/admin/students">
                <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                  View Directory
                </Button>
              </Link>
            </CardHeader>

            <Table>
              <TableHeader>
                <TableRow hover={false}>
                  <TableHead>Student</TableHead>
                  <TableHead>Dept</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { name: 'Tanvir Ahmed', id: '2026-CSE-1049', dept: 'CSE', sem: 'Sem 6', status: 'approved' },
                  { name: 'Nusrat Jahan', id: '2026-EEE-2012', dept: 'EEE', sem: 'Sem 4', status: 'approved' },
                  { name: 'Shakil Hasan', id: '2026-BBA-3081', dept: 'BBA', sem: 'Sem 8', status: 'pending' },
                  { name: 'Farhana Kabir', id: '2026-LAW-4009', dept: 'LAW', sem: 'Sem 2', status: 'approved' },
                ].map((s, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar name={s.name} size="xs" />
                        <div>
                          <div className="font-semibold text-xs text-txt-main">{s.name}</div>
                          <div className="text-[10px] font-mono text-txt-muted">{s.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-xs">{s.dept}</TableCell>
                    <TableCell className="text-xs text-txt-secondary">{s.sem}</TableCell>
                    <TableCell>
                      <Badge variant={s.status} size="sm" dot>
                        {s.status === 'approved' ? 'Active' : 'Pending'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/admin/students/${idx + 1}`}>
                        <Button variant="ghost" size="sm">
                          Inspect
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Priority Helpdesk Inquiries (1 col) */}
        <Card padding="md" className="space-y-4">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-edge">
            <div>
              <CardTitle>Open Inquiries</CardTitle>
              <CardDescription>Awaiting staff reply</CardDescription>
            </div>
            <Link to="/admin/helpdesk">
              <Button variant="ghost" size="sm">
                Queue →
              </Button>
            </Link>
          </CardHeader>

          <div className="space-y-3">
            {[
              { id: '1042', subject: 'Lab Wi-Fi Error', student: 'Samin Yasar (CSE)', time: '1h ago', urgent: true },
              { id: '1040', subject: 'Hostel Room Change', student: 'Rifat Hossain (EEE)', time: '3h ago', urgent: false },
              { id: '1039', subject: 'Fee Receipt Discrepancy', student: 'Ayesha Siddika (BBA)', time: '5h ago', urgent: false },
            ].map((t) => (
              <div key={t.id} className="p-3 rounded-xl border border-edge bg-surface-secondary/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-brand">
                    #CF-TICK-{t.id}
                  </span>
                  {t.urgent && (
                    <Badge variant="rejected" size="sm">
                      Urgent
                    </Badge>
                  )}
                </div>
                <div className="text-xs font-semibold text-txt-main line-clamp-1">
                  {t.subject}
                </div>
                <div className="flex items-center justify-between text-[11px] text-txt-muted">
                  <span>{t.student}</span>
                  <span className="font-mono">{t.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

