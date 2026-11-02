import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, LifeBuoy, MessageSquare, Clock, Search, ChevronRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'

export function HelpdeskPage() {
  const tickets = [
    {
      id: '1',
      ticketNumber: '#CF-TICK-1042',
      title: 'Lab Computer Network Access & Wi-Fi Credential Error',
      category: 'IT & Network',
      status: 'in_progress',
      statusText: 'In Progress',
      lastReply: 'Administrator replied 1 hour ago',
      date: 'May 02, 2026',
    },
    {
      id: '2',
      ticketNumber: '#CF-TICK-1038',
      title: 'Tuition Fee Installment Clearance Slip Missing from Portal',
      category: 'Fee & Accounts',
      status: 'resolved',
      statusText: 'Resolved',
      lastReply: 'Accounts Officer approved request',
      date: 'Apr 27, 2026',
    },
    {
      id: '3',
      ticketNumber: '#CF-TICK-1015',
      title: 'Course Pre-requisite Override for Database Systems II',
      category: 'Academic Issues',
      status: 'resolved',
      statusText: 'Resolved',
      lastReply: 'Academic Advisor granted waiver',
      date: 'Apr 10, 2026',
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Student Help Desk
          </h2>
          <p className="text-xs text-txt-secondary">
            Submit inquiries to university departments and track threaded replies
          </p>
        </div>

        <Link to="/student/helpdesk/create">
          <Button variant="primary" size="sm" leftIcon={Plus}>
            Create Support Ticket
          </Button>
        </Link>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <Card key={t.id} hoverable padding="md" className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold text-brand">
                  {t.ticketNumber}
                </span>
                <Badge variant={t.status} size="sm" dot>
                  {t.statusText}
                </Badge>
                <span className="text-[11px] text-txt-muted">{t.category}</span>
              </div>

              <div className="text-sm font-semibold text-txt-main">
                {t.title}
              </div>

              <div className="text-xs text-txt-muted flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t.lastReply}</span>
                <span>•</span>
                <span className="font-mono">{t.date}</span>
              </div>
            </div>

            <Button variant="ghost" size="sm" rightIcon={ChevronRight}>
              View Thread
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
