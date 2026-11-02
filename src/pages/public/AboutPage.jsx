import { Link } from 'react-router-dom'
import {
  GraduationCap,
  ShieldCheck,
  Users,
  Building,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'

export function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <Badge variant="brand" size="sm">
          About the Platform
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt-main">
          Unifying Higher Education Operations
        </h1>
        <p className="text-sm text-txt-secondary leading-relaxed">
          CampusFlow was founded on a simple principle: universities run best when students, faculty, and administrators share a clean, reliable, and transparent digital hub.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="lg" className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-txt-main">Our Mission</h3>
          <p className="text-sm text-txt-secondary leading-relaxed">
            To eliminate administrative bottlenecks, lost notices, and fragmented communication by providing higher education institutions with a modern, production-grade smart portal.
          </p>
        </Card>

        <Card padding="lg" className="space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center ring-1 ring-emerald-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-txt-main">Design Standards</h3>
          <p className="text-sm text-txt-secondary leading-relaxed">
            Crafted with zero AI fluff—respecting typographic hierarchy, strict WCAG AA accessibility, zero-flash dark mode, and resilient PostgreSQL data modeling.
          </p>
        </Card>
      </div>

      {/* Core Principles */}
      <div className="p-8 rounded-2xl bg-surface border border-edge space-y-6">
        <h2 className="text-xl font-semibold text-txt-main tracking-tight">
          CampusFlow Core Principles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="space-y-2">
            <CheckCircle2 className="w-5 h-5 text-brand" />
            <h4 className="text-sm font-semibold text-txt-main">Clarity Over Clutter</h4>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Every card, table, and notification serves a specific operational purpose without visual noise.
            </p>
          </div>

          <div className="space-y-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h4 className="text-sm font-semibold text-txt-main">Role Integrity</h4>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Student data is isolated from unauthorized peering using Supabase Row-Level Security.
            </p>
          </div>

          <div className="space-y-2">
            <Building className="w-5 h-5 text-amber-500" />
            <h4 className="text-sm font-semibold text-txt-main">Department Hierarchy</h4>
            <p className="text-xs text-txt-secondary leading-relaxed">
              Notices, events, and tickets are tied to distinct university faculties and semesters.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link to="/register">
          <Button variant="primary" size="md" rightIcon={ArrowRight}>
            Join the Campus Portal
          </Button>
        </Link>
      </div>
    </div>
  )
}

