import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Bell, Pin, Trash2, Edit, FileText, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'

export function AdminNoticesPage() {
  const notices = [
    { id: '1', title: 'Spring 2026 Midterm Exam Schedule', dept: 'CSE', category: 'Exam', date: 'May 02, 2026', pinned: true, reads: 1420 },
    { id: '2', title: 'Tuition Fee Payment Schedule', dept: 'Accounts', category: 'Accounts', date: 'Apr 28, 2026', pinned: false, reads: 980 },
    { id: '3', title: 'Library Extended Hours for Finals Week', dept: 'Library', category: 'General', date: 'Apr 25, 2026', pinned: false, reads: 615 },
  ]

  const handleDelete = (title) => {
    toast.error(`Notice "${title}" removed.`, { icon: '🗑️' })
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Notice Board Administration
          </h2>
          <p className="text-xs text-txt-secondary">
            Publish, pin, edit, and track read confirmations across departments
          </p>
        </div>

        <Link to="/admin/notices/create">
          <Button variant="primary" size="sm" leftIcon={Plus}>
            Create New Notice
          </Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Notice Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Student Reads</TableHead>
            <TableHead>Published Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notices.map((n) => (
            <TableRow key={n.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  {n.pinned && (
                    <Pin className="w-3.5 h-3.5 text-brand shrink-0" />
                  )}
                  <span className="font-semibold text-xs text-txt-main">{n.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-xs text-txt-secondary">{n.dept}</TableCell>
              <TableCell>
                <Badge variant={n.category === 'Exam' ? 'brand' : 'neutral'} size="sm">
                  {n.category}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-xs text-txt-muted">{n.reads}</TableCell>
              <TableCell className="text-xs text-txt-muted font-mono">{n.date}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon-sm" onClick={() => toast.success('Notice pinned toggle.')}>
                    <Pin className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon-sm" onClick={() => handleDelete(n.title)}>
                    <Trash2 className="w-3.5 h-3.5 text-danger-main" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

