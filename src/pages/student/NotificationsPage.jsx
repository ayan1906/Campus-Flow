import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CheckCheck, Trash2, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'New Official Notice Published',
      message: 'Controller of Examinations posted Spring 2026 Midterm Routine.',
      time: '15m ago',
      isRead: false,
      link: '/student/notices/1',
    },
    {
      id: '2',
      title: 'Event Registration Confirmed',
      message: 'Your registration for Annual Hackathon 2026 has been approved.',
      time: '2h ago',
      isRead: false,
      link: '/student/events/1',
    },
    {
      id: '3',
      title: 'Ticket #CF-TICK-1042 Updated',
      message: 'IT Department assigned an advisor to resolve your Wi-Fi issue.',
      time: 'Yesterday',
      isRead: true,
      link: '/student/helpdesk',
    },
  ])

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    toast.success('All notifications marked as read.')
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Notifications Center
          </h2>
          <p className="text-xs text-txt-secondary">
            Realtime alerts, notice broadcasts, and ticket updates
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={CheckCheck}
          onClick={markAllRead}
        >
          Mark All as Read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n.id}
            padding="md"
            className={`flex items-center justify-between gap-4 transition-colors ${
              !n.isRead ? 'border-brand/40 bg-brand/5' : ''
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
                )}
                <span className="text-xs font-semibold text-txt-main">
                  {n.title}
                </span>
                <span className="text-[11px] font-mono text-txt-muted">
                  {n.time}
                </span>
              </div>
              <p className="text-xs text-txt-secondary">{n.message}</p>
            </div>

            <Link to={n.link}>
              <Button variant="ghost" size="sm">
                View →
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}

