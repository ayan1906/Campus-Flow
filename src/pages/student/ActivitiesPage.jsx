import { Link } from 'react-router-dom'
import { Activity, Bell, Calendar, FolderSearch, LifeBuoy, ArrowRight } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'

export function ActivitiesPage() {
  const activities = [
    {
      id: '1',
      action: 'Registered for Annual University Hackathon 2026',
      type: 'event',
      date: 'May 02, 2026 at 11:20 AM',
      icon: Calendar,
      color: 'text-brand',
      link: '/student/events/1',
    },
    {
      id: '2',
      action: 'Submitted ownership claim for TI-84 Plus Graphic Calculator',
      type: 'lost-found',
      date: 'May 02, 2026 at 09:45 AM',
      icon: FolderSearch,
      color: 'text-amber-500',
      link: '/student/lost-found/1',
    },
    {
      id: '3',
      action: 'Read Official Notice: Spring 2026 Midterm Exam Schedule',
      type: 'notice',
      date: 'May 01, 2026 at 04:10 PM',
      icon: Bell,
      color: 'text-emerald-500',
      link: '/student/notices/1',
    },
    {
      id: '4',
      action: 'Created Support Ticket #CF-TICK-1042 (Lab Network Access)',
      type: 'helpdesk',
      date: 'Apr 30, 2026 at 02:00 PM',
      icon: LifeBuoy,
      color: 'text-sky-500',
      link: '/student/helpdesk',
    },
  ]

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          My Campus Activities
        </h2>
        <p className="text-xs text-txt-secondary">
          Audit trail of your registrations, ticket submissions, and notice reads
        </p>
      </div>

      <div className="space-y-3">
        {activities.map((act) => {
          const Icon = act.icon
          return (
            <Card key={act.id} hoverable padding="md" className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-surface-secondary flex items-center justify-center shrink-0 border border-edge">
                  <Icon className={`w-4 h-4 ${act.color}`} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-txt-main">
                    {act.action}
                  </div>
                  <div className="text-[11px] font-mono text-txt-muted mt-0.5">
                    {act.date}
                  </div>
                </div>
              </div>

              <Link to={act.link}>
                <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                  Details
                </Button>
              </Link>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

