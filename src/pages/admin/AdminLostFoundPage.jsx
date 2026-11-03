import { useState } from 'react'
import { FolderSearch, CheckCircle2, XCircle, Search } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

export function AdminLostFoundPage() {
  const [items, setItems] = useState([
    { id: '1', title: 'TI-84 Plus Graphic Calculator', type: 'found', location: 'Library 2F', reportedBy: 'Library Staff', date: 'May 02, 2026', status: 'pending', claimsCount: 1 },
    { id: '2', title: 'Brown Leather Wallet with Student ID', type: 'lost', location: 'Cafeteria', reportedBy: 'Samin Yasar (CSE)', date: 'May 01, 2026', status: 'in_progress', claimsCount: 1 },
    { id: '3', title: 'Calculus Early Transcendentals', type: 'found', location: 'Auditorium', reportedBy: 'Campus Guard', date: 'Apr 28, 2026', status: 'resolved', claimsCount: 2 },
  ])

  const handleApprove = (id) => {
    toast.success('Post verified & approved for student community feed.')
  }

  const handleReturn = (id) => {
    toast.success('Item marked as safely returned to verified owner.')
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Lost & Found Moderation
        </h2>
        <p className="text-xs text-txt-secondary">
          Review student claim verification submissions and approve returned property
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow hover={false}>
            <TableHead>Reported Item</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Reported By</TableHead>
            <TableHead>Claims</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold text-xs text-txt-main">
                {item.title}
              </TableCell>
              <TableCell>
                <Badge variant={item.type === 'lost' ? 'danger' : 'approved'} size="sm">
                  {item.type === 'lost' ? 'Lost' : 'Found'}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-txt-muted">{item.location}</TableCell>
              <TableCell className="text-xs text-txt-secondary">{item.reportedBy}</TableCell>
              <TableCell className="font-mono text-xs">{item.claimsCount} Claim</TableCell>
              <TableCell>
                <Badge variant={item.status} size="sm" dot>
                  {item.status === 'resolved' ? 'Returned' : item.status === 'in_progress' ? 'Under Review' : 'Pending'}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Button variant="ghost" size="sm" onClick={() => handleApprove(item.id)}>
                    Approve
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleReturn(item.id)}>
                    Mark Returned
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

