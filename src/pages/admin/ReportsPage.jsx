import { BarChart3, TrendingUp, Users, CheckCircle2, Calendar, FileText } from 'lucide-react'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

export function ReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-txt-main">
          Campus Analytics & Operational Reports
        </h2>
        <p className="text-xs text-txt-secondary">
          Student engagement trends, department notice reach, and ticket turnaround SLA
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="space-y-2">
          <span className="text-xs text-txt-muted">Average Ticket Resolution</span>
          <div className="text-3xl font-bold font-mono text-txt-main">2.4 hrs</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            35% faster than last semester
          </span>
        </Card>

        <Card padding="md" className="space-y-2">
          <span className="text-xs text-txt-muted">Notice Read Rate</span>
          <div className="text-3xl font-bold font-mono text-txt-main">91.8%</div>
          <span className="text-[11px] text-brand font-medium">
            14,140 student confirmations
          </span>
        </Card>

        <Card padding="md" className="space-y-2">
          <span className="text-xs text-txt-muted">Event Attendance Rate</span>
          <div className="text-3xl font-bold font-mono text-txt-main">96.2%</div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            Low no-show rate
          </span>
        </Card>
      </div>

      {/* Visual Distribution Mock (Recharts wired in Day 18) */}
      <Card padding="lg" className="space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-edge">
          <div>
            <h3 className="text-base font-semibold text-txt-main">
              Student Activity Breakdown by Department
            </h3>
            <p className="text-xs text-txt-muted">
              Engagement metrics across faculties for Spring 2026
            </p>
          </div>
          <Badge variant="brand" size="sm">
            Live Postgres Sync
          </Badge>
        </div>

        <div className="space-y-4 pt-2">
          {[
            { dept: 'Computer Science & Engineering', pct: 88, count: '1,420 Active' },
            { dept: 'Electrical & Electronic Engineering', pct: 76, count: '980 Active' },
            { dept: 'Business Administration (BBA)', pct: 64, count: '1,120 Active' },
            { dept: 'Department of Law', pct: 58, count: '650 Active' },
          ].map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-txt-main">{item.dept}</span>
                <span className="text-txt-muted font-mono">{item.count}</span>
              </div>
              <div className="h-2.5 w-full bg-surface-secondary rounded-full overflow-hidden border border-edge">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-500"
                  style={{ width: `${item.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

