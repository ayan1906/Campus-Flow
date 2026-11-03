import { Link } from 'react-router-dom'
import {
  Bell,
  Calendar,
  FolderSearch,
  LifeBuoy,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function StudentDashboard() {
  const quickStats = [
    { label: 'Unread Notices', value: '3', badge: 'New today', icon: Bell, color: 'text-brand' },
    { label: 'Registered Events', value: '2', badge: 'Next: Friday', icon: Calendar, color: 'text-emerald-500' },
    { label: 'My Help Tickets', value: '1', badge: 'In Progress', icon: LifeBuoy, color: 'text-sky-500' },
    { label: 'Lost & Found Posts', value: '1', badge: 'Active', icon: FolderSearch, color: 'text-amber-500' },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-surface border border-edge shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs text-brand font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome back, Samin</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-txt-main">
            Student Portal Overview
          </h2>
          <p className="text-xs text-txt-secondary">
            B.Sc. in Computer Science & Engineering • 6th Semester • ID: 2026-CSE-1049
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/student/lost-found/create">
            <Button variant="secondary" size="sm" leftIcon={FolderSearch}>
              Report Lost Item
            </Button>
          </Link>
          <Link to="/student/helpdesk/create">
            <Button variant="primary" size="sm" leftIcon={LifeBuoy}>
              Raise Ticket
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((item, idx) => {
          const Icon = item.icon
          return (
            <Card key={idx} padding="md" className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-txt-muted">{item.label}</span>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="text-2xl font-bold font-mono text-txt-main">
                {item.value}
              </div>
              <div className="text-[11px] text-txt-secondary font-medium">
                {item.badge}
              </div>
            </Card>
          )
        })}
      </div>

      {/* Two Column Layout: Recent Notices & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <Card padding="md">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-edge">
            <div>
              <CardTitle>Recent Official Notices</CardTitle>
              <CardDescription>Departmental and exam cell bulletins</CardDescription>
            </div>
            <Link to="/student/notices">
              <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                View All
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="divide-y divide-edge pt-2">
            {[
              {
                id: '1',
                title: 'Spring 2026 Midterm Exam Schedule',
                dept: 'CSE Dept',
                date: 'Today, 10:30 AM',
                tag: 'Exam',
                badgeVariant: 'brand',
              },
              {
                id: '2',
                title: 'Library Extended Hours for Finals Week',
                dept: 'Central Library',
                date: 'Yesterday',
                tag: 'Campus',
                badgeVariant: 'neutral',
              },
              {
                id: '3',
                title: 'Tuition Fee Payment Deadline Notice',
                dept: 'Accounts Office',
                date: 'Apr 28',
                tag: 'Accounts',
                badgeVariant: 'pending',
              },
            ].map((n) => (
              <div key={n.id} className="py-3 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={n.badgeVariant} size="sm">
                      {n.tag}
                    </Badge>
                    <span className="text-[11px] text-txt-muted">{n.dept}</span>
                  </div>
                  <Link
                    to={`/student/notices/${n.id}`}
                    className="text-xs font-semibold text-txt-main hover:text-brand transition-colors line-clamp-1"
                  >
                    {n.title}
                  </Link>
                </div>
                <span className="text-[11px] font-mono text-txt-muted shrink-0">
                  {n.date}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card padding="md">
          <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-edge">
            <div>
              <CardTitle>Campus Events & Workshops</CardTitle>
              <CardDescription>Upcoming club and faculty events</CardDescription>
            </div>
            <Link to="/student/events">
              <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                Browse All
              </Button>
            </Link>
          </CardHeader>

          <CardContent className="divide-y divide-edge pt-2">
            {[
              {
                id: '1',
                title: 'Annual University Hackathon 2026',
                venue: 'Auditorium Hall',
                date: 'Fri, May 15 • 9:00 AM',
                status: 'registered',
              },
              {
                id: '2',
                title: 'AI & Data Science Career Seminar',
                venue: 'Room 402, CS Building',
                date: 'Mon, May 18 • 2:00 PM',
                status: 'available',
              },
              {
                id: '3',
                title: 'Inter-Department Debate Championship',
                venue: 'Campus Open Amphitheatre',
                date: 'Wed, May 20 • 4:00 PM',
                status: 'available',
              },
            ].map((e) => (
              <div key={e.id} className="py-3 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <Link
                    to={`/student/events/${e.id}`}
                    className="text-xs font-semibold text-txt-main hover:text-brand transition-colors"
                  >
                    {e.title}
                  </Link>
                  <div className="text-[11px] text-txt-muted flex items-center gap-2">
                    <span>{e.venue}</span>
                    <span>•</span>
                    <span className="font-mono">{e.date}</span>
                  </div>
                </div>
                {e.status === 'registered' ? (
                  <Badge variant="approved" size="sm" dot>
                    Registered
                  </Badge>
                ) : (
                  <Link to={`/student/events/${e.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

