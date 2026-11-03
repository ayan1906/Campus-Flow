import { useState } from 'react'
import { GraduationCap, Search, Mail, Phone, Plus } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Input } from '../../components/ui/Input'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Avatar } from '../../components/ui/Avatar'

export function TeachersPage() {
  const [search, setSearch] = useState('')

  const teachers = [
    { id: '1', name: 'Dr. M. Rahman', title: 'Professor & Head', dept: 'CSE', email: 'rahman.cse@campusflow.edu', room: 'Building A, Room 401', noticesCount: 14 },
    { id: '2', name: 'Dr. Sarah Faruque', title: 'Associate Professor', dept: 'EEE', email: 'sarah.eee@campusflow.edu', room: 'Building B, Room 210', noticesCount: 8 },
    { id: '3', name: 'Kazi Nazmul Islam', title: 'Senior Lecturer', dept: 'CSE', email: 'nazmul.cse@campusflow.edu', room: 'Building A, Room 305', noticesCount: 6 },
    { id: '4', name: 'Tahmina Akhtar', title: 'Assistant Professor', dept: 'BBA', email: 'tahmina.bba@campusflow.edu', room: 'Building C, Room 108', noticesCount: 5 },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Faculty & Department Advisors
          </h2>
          <p className="text-xs text-txt-secondary">
            Authorized personnel permitted to broadcast official notices and approve tickets
          </p>
        </div>

        <div className="w-48 sm:w-64">
          <Input
            placeholder="Search faculty..."
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
            <TableHead>Faculty Member</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Office / Room</TableHead>
            <TableHead>Notices Authored</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((t) => (
            <TableRow key={t.id}>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <div className="font-semibold text-xs text-txt-main">{t.name}</div>
                    <div className="text-[11px] text-txt-muted">{t.email}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs text-txt-secondary">{t.title}</TableCell>
              <TableCell className="font-semibold text-xs text-txt-main">{t.dept}</TableCell>
              <TableCell className="text-xs text-txt-muted">{t.room}</TableCell>
              <TableCell className="font-mono text-xs">{t.noticesCount}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  Contact
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

