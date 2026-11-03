import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Bell, FileText, Download, Pin } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function NoticesPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const notices = [
    {
      id: '1',
      title: 'Spring 2026 Midterm Examination Routine & Guidelines',
      dept: 'Computer Science & Engineering',
      category: 'Exam',
      date: 'Today, 10:30 AM',
      author: 'Controller of Examinations',
      pinned: true,
      hasPdf: true,
      excerpt:
        'The examination routine for all undergraduate departments for Spring 2026 has been finalized. Review your assigned lab shifts and room numbers.',
    },
    {
      id: '2',
      title: 'Tuition Fee Payment Schedule & Late Fine Waiver',
      dept: 'Finance & Accounts',
      category: 'Accounts',
      date: 'May 02, 2026',
      author: 'Accounts Office',
      pinned: false,
      hasPdf: true,
      excerpt:
        'All enrolled students are requested to clear semester installment dues before May 20, 2026 to avoid examination admit card holds.',
    },
    {
      id: '3',
      title: 'Annual Tech Fest 2026 Project Showcase Call for Entries',
      dept: 'Student Affairs',
      category: 'Events',
      date: 'Apr 29, 2026',
      author: 'University Robotics & Software Club',
      pinned: false,
      hasPdf: false,
      excerpt:
        'Submissions are open for software, IoT, and AI project exhibitions. Cash prizes and industry mentorship await top 3 finalists.',
    },
  ]

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-txt-main">
            Official Notices & Bulletins
          </h2>
          <p className="text-xs text-txt-secondary">
            Verified university bulletins filtered by your faculty and semester
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-48 sm:w-64">
            <Input
              placeholder="Search notice title..."
              leftIcon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 text-xs"
            />
          </div>
          <div className="w-36">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={['All', 'Exam', 'Accounts', 'Events', 'Academic', 'Emergency']}
              className="h-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((n) => (
          <Card key={n.id} hoverable padding="md" className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {n.pinned && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                  <Badge variant={n.category === 'Exam' ? 'brand' : 'neutral'} size="sm">
                    {n.category}
                  </Badge>
                  <span className="text-[11px] text-txt-muted font-medium">
                    {n.dept}
                  </span>
                </div>

                <Link
                  to={`/student/notices/${n.id}`}
                  className="text-base font-semibold text-txt-main hover:text-brand transition-colors block"
                >
                  {n.title}
                </Link>
              </div>

              <span className="text-xs font-mono text-txt-muted shrink-0">
                {n.date}
              </span>
            </div>

            <p className="text-xs text-txt-secondary leading-relaxed line-clamp-2">
              {n.excerpt}
            </p>

            <div className="pt-2 border-t border-edge flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-txt-muted">
                <span>By {n.author}</span>
                {n.hasPdf && (
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                    <FileText className="w-3.5 h-3.5" />
                    Official PDF
                  </span>
                )}
              </div>

              <Link to={`/student/notices/${n.id}`}>
                <Button variant="ghost" size="sm">
                  Read Full Notice →
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

