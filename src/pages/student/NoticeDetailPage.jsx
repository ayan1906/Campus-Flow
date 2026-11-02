import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, FileText, Calendar, Building, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import toast from 'react-hot-toast'

export function NoticeDetailPage() {
  const { id } = useParams()

  const handleDownload = () => {
    toast.success('Notice PDF download initiated.')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to="/student/notices"
        className="inline-flex items-center gap-1.5 text-xs text-txt-muted hover:text-txt-main transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to All Notices
      </Link>

      <Card padding="lg" className="space-y-6">
        <div className="space-y-3 pb-4 border-b border-edge">
          <div className="flex items-center gap-2">
            <Badge variant="brand" size="sm">
              Exam Announcement
            </Badge>
            <span className="text-xs text-txt-muted">Notice Ref: #EXAM-2026-{id || '01'}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-txt-main">
            Spring 2026 Midterm Examination Routine & Seating Guidelines
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-txt-muted">
            <span className="flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              Office of the Controller of Examinations
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Published May 02, 2026 at 10:30 AM
            </span>
          </div>
        </div>

        {/* Notice Body */}
        <div className="space-y-4 text-sm text-txt-secondary leading-relaxed">
          <p>
            This is to inform all undergraduate students of the Computer Science & Engineering department that the Midterm Examinations for the Spring 2026 semester will commence from May 15, 2026.
          </p>
          <p>
            Students must bring their physical Student ID cards and payment clearance clearance slip into the examination halls. Mobile phones and programmable smart devices are strictly prohibited.
          </p>
          <div className="p-4 rounded-xl bg-surface-secondary border border-edge space-y-2">
            <h4 className="text-xs font-semibold text-txt-main uppercase tracking-wider">
              Examination Instructions:
            </h4>
            <ul className="text-xs space-y-1.5 list-disc list-inside">
              <li>Morning shift begins promptly at 09:30 AM (Gates open at 09:00 AM).</li>
              <li>Afternoon shift begins at 02:00 PM.</li>
              <li>Lab exams will be conducted in Computer Lab 3 & 4 as per scheduled batches.</li>
            </ul>
          </div>
        </div>

        {/* PDF Attachment Box */}
        <div className="p-4 rounded-xl border border-edge bg-surface-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-txt-main">
                Official_Midterm_Routine_Spring2026.pdf
              </div>
              <div className="text-[11px] text-txt-muted">
                1.4 MB • Verified Digital Signature
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            leftIcon={Download}
            onClick={handleDownload}
          >
            Download Document
          </Button>
        </div>
      </Card>
    </div>
  )
}
