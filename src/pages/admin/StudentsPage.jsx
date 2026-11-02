import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, Search, Filter, ShieldCheck, UserCheck, UserX, MoreVertical } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'

export function StudentsPage() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const students = [
    { id: '1', name: 'Tanvir Ahmed', studentId: '2026-CSE-1049', email: 'tanvir.cse@campusflow.edu', dept: 'CSE', sem: '6th', status: 'approved' },
    { id: '2', name: 'Nusrat Jahan', studentId: '2026-EEE-2012', email: 'nusrat.eee@campusflow.edu', dept: 'EEE', sem: '4th', status: 'approved' },
    { id: '3', name: 'Shakil Hasan', studentId: '2026-BBA-3081', email: 'shakil.bba@campusflow.edu', dept: 'BBA', sem: '8th', status: 'pending' },
    { id: '4', name: 'Farhana Kabir', studentId: '2026-LAW-4009', email: 'farhana.law@campusflow.edu', dept: 'LAW', sem: '2nd', status: 'approved' },
    { id: '5', name: 'Mahmudul Karim', studentId: '2026-CSE-1055', email: 'mahmud.cse@campusflow.edu', dept: 'CSE', sem: '6th', status: 'rejected' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Student Admissions Directory
          </h2>
          <p className="text-xs text-txt-secondary">
            Manage student records, verify department enrollment, and toggle account access
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48 sm:w-64">
            <Input
              placeholder="Search student or ID..."
              leftIcon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
          <div className="w-36">
            <Select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              options={['All', 'CSE', 'EEE', 'BBA', 'LAW']}
              className="h-9 text-xs"
            />
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Student</TableHead>
            <TableHead>Student ID</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar name={s.name} size="sm" />
                  <div>
                    <div className="font-semibold text-xs text-txt-main">{s.name}</div>
                    <div className="text-[11px] text-txt-muted">{s.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-xs text-txt-secondary">
                {s.studentId}
              </TableCell>
              <TableCell className="font-semibold text-xs text-txt-main">
                {s.dept}
              </TableCell>
              <TableCell className="text-xs text-txt-secondary">{s.sem}</TableCell>
              <TableCell>
                <Badge variant={s.status} size="sm" dot>
                  {s.status === 'approved' ? 'Active' : s.status === 'pending' ? 'Pending' : 'Suspended'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/students/${s.id}`}>
                  <Button variant="ghost" size="sm">
                    Manage
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
