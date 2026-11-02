import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Search,
  Calendar,
  LifeBuoy,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  GraduationCap,
  Users,
  Building2,
  FolderSearch,
  MessageSquare,
  HelpCircle,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card'
import { Avatar } from '../../components/ui/Avatar'

export function LandingPage() {
  const [activeFaq, setActiveFaq] = useState(0)

  const stats = [
    { label: 'Active Students', value: '15,400+', subtext: 'Across 8 Faculties' },
    { label: 'Ticket Resolution', value: '99.2%', subtext: 'Avg response < 3 hours' },
    { label: 'Verified Notices', value: '340+', subtext: 'Direct from Deans & Exam Cell' },
    { label: 'Campus Events', value: '85+', subtext: 'Clubs & Academic workshops' },
  ]

  const modules = [
    {
      id: 'notices',
      icon: Bell,
      badge: 'Academic Updates',
      title: 'Smart Notice Board',
      description:
        'Targeted announcements by department, semester, and urgency. Verified PDF attachments with built-in read confirmations.',
      features: [
        'Filter by Department & Semester',
        'Pinned urgent emergency notices',
        'Official PDF document viewer',
        'Student read-receipt tracking',
      ],
      link: '/student/notices',
    },
    {
      id: 'lost-found',
      icon: FolderSearch,
      badge: 'Campus Community',
      title: 'Real-time Lost & Found',
      description:
        'Report misplaced student IDs, textbooks, calculators, or keys. Upload photos and submit verified ownership claims.',
      features: [
        'Photo upload via Supabase Storage',
        'Structured claim & verification flow',
        'Status lifecycle: Lost → Found → Returned',
        'Campus location tags (Library, Lab, Cafeteria)',
      ],
      link: '/student/lost-found',
    },
    {
      id: 'events',
      icon: Calendar,
      badge: 'Campus Life',
      title: 'Events & Workshop Hub',
      description:
        'Discover university hackathons, club meetings, and guest lectures. One-click registration with live seat countdowns.',
      features: [
        'Live participant capacity validation',
        'Anti-duplicate registration guard',
        'My Registered Events personalized feed',
        'Instant registration confirmations',
      ],
      link: '/student/events',
    },
    {
      id: 'helpdesk',
      icon: LifeBuoy,
      badge: 'Student Support',
      title: 'Student Help Desk',
      description:
        'Direct inquiry pipeline to academic, financial, hostel, and IT departments with trackable ticket IDs and admin replies.',
      features: [
        'Auto-generated ticket IDs (#CF-1042)',
        'Threaded administrative replies',
        'Categorized ticket routing',
        'SLA status: Open, In Progress, Resolved',
      ],
      link: '/student/helpdesk',
    },
  ]

  const faqs = [
    {
      q: 'How do students authenticate on CampusFlow?',
      a: 'Students register with their assigned institutional email address. Account records automatically link with university department credentials, providing access to their specific semester notices and events.',
    },
    {
      q: 'Can students accidentally gain administrative rights?',
      a: 'No. CampusFlow utilizes strict Row-Level Security (RLS) policies within Supabase Postgres. All public registrations default to the student role; admin roles require explicit elevated database governance.',
    },
    {
      q: 'How does the Lost & Found claim verification work?',
      a: 'When an item is reported, students can submit a claim with specific proof of ownership. The original poster or campus administration reviews and approves claims before marking the item as returned.',
    },
    {
      q: 'Is CampusFlow accessible on mobile phones?',
      a: 'Yes! The entire interface is 100% responsive, featuring touch-friendly navigation, mobile drawer menus, and collapsible data cards that adapt flawlessly across smartphones, tablets, and laptops.',
    },
  ]

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-8 sm:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          {/* Announcement pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-semibold border border-brand/20 shadow-xs animate-in fade-in duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Spring Semester 2026 Academic Hub Live</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          </div>

          {/* Master Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-txt-main leading-[1.12]">
            The Smart Campus Platform That Keeps University Life{' '}
            <span className="text-brand">in Sync.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-txt-secondary leading-relaxed max-w-2xl mx-auto">
            Say goodbye to scattered group chats, missed notice PDFs, and untracked campus inquiries. CampusFlow brings verified notices, lost & found claims, campus events, and student tickets into one modern, human-crafted portal.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                className="w-full sm:w-auto shadow-sm"
              >
                Access Student Portal
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Explore Campus Modules
              </Button>
            </a>
          </div>

          {/* Micro Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-txt-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Role-guarded Security
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand" />
              Real-time Supabase Sync
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Verified Faculty Notices
            </span>
          </div>
        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-12 sm:mt-16 p-2 sm:p-3 rounded-2xl bg-surface-secondary/70 border border-edge shadow-lg max-w-5xl mx-auto">
          <div className="rounded-xl border border-edge bg-surface overflow-hidden shadow-xs">
            {/* Mock Header Bar */}
            <div className="px-4 py-3 bg-surface-secondary/50 border-b border-edge flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400/80" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                <span className="ml-2 text-xs font-mono text-txt-muted hidden sm:inline">
                  campusflow.edu/student/dashboard
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  Live Preview
                </span>
              </div>
            </div>

            {/* Mock Portal Body */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-canvas/40">
              {/* Notice Preview */}
              <div className="p-4 rounded-xl border border-edge bg-surface space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="brand" size="sm">
                    Notice
                  </Badge>
                  <span className="text-[11px] font-mono text-txt-muted">Exam Cell</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-txt-main">
                    Final Exam Seating & Routine
                  </h4>
                  <p className="text-xs text-txt-secondary mt-1 line-clamp-2">
                    Undergraduate examination schedules for Fall 2026 published. Download official PDF routine.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-edge">
                  <span className="text-txt-muted">PDF Attached</span>
                  <span className="text-brand font-medium">Read Notice →</span>
                </div>
              </div>

              {/* Lost & Found Preview */}
              <div className="p-4 rounded-xl border border-edge bg-surface space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="pending" size="sm" dot>
                    Found Item
                  </Badge>
                  <span className="text-[11px] font-mono text-txt-muted">Library 2F</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-txt-main">
                    TI-84 Plus Graphic Calculator
                  </h4>
                  <p className="text-xs text-txt-secondary mt-1 line-clamp-2">
                    Found on study desk #14 beside the reference section. Contact with serial number to claim.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-edge">
                  <span className="text-txt-muted">Reported 1h ago</span>
                  <span className="text-amber-600 dark:text-amber-400 font-medium">Claim Item →</span>
                </div>
              </div>

              {/* Event Preview */}
              <div className="p-4 rounded-xl border border-edge bg-surface space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="in_progress" size="sm">
                    Hackathon
                  </Badge>
                  <span className="text-[11px] font-mono text-txt-muted">Auditorium</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-txt-main">
                    Annual University Hackathon 2026
                  </h4>
                  <p className="text-xs text-txt-secondary mt-1 line-clamp-2">
                    48 hours of innovation, building, and teamwork. 12 seats remaining.
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-between text-xs border-t border-edge">
                  <span className="text-txt-muted">Friday 9:00 AM</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">Register (Free) →</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabular Stats Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-xl border border-edge bg-surface shadow-xs text-center sm:text-left"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-txt-main tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-txt-secondary mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-txt-muted mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. CORE MODULES SHOWCASE */}
      {/* ========================================================= */}
      <section id="features" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <Badge variant="brand" size="sm">
            Platform Capabilities
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-txt-main">
            Engineered for Every Aspect of Campus Operation
          </h2>
          <p className="text-sm text-txt-secondary leading-relaxed">
            Four powerful modules working in harmony so students never miss an update and staff never lose track of requests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon
            return (
              <Card
                key={mod.id}
                hoverable
                padding="lg"
                className="flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-brand/10 text-brand flex items-center justify-center ring-1 ring-brand/20 transition-transform group-hover:scale-105 duration-150">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="neutral" size="sm">
                      {mod.badge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-txt-main tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-txt-secondary mt-1.5 leading-relaxed">
                    {mod.description}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {mod.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-txt-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-edge flex items-center justify-between">
                  <span className="text-xs text-txt-muted">Ready for production</span>
                  <Link to={mod.link}>
                    <Button variant="ghost" size="sm" rightIcon={ArrowRight}>
                      Explore Module
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HOW IT WORKS (WORKFLOW STEPS) */}
      {/* ========================================================= */}
      <section id="modules" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-surface border border-edge shadow-xs">
          <div className="max-w-2xl space-y-2 mb-10">
            <Badge variant="approved" size="sm">
              Simple 3-Step Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-txt-main">
              How CampusFlow Works for Students
            </h2>
            <p className="text-sm text-txt-secondary leading-relaxed">
              Designed to eliminate friction, reduce administrative queues, and provide immediate clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-surface-secondary border border-edge text-brand font-bold font-mono flex items-center justify-center text-sm shadow-xs">
                01
              </div>
              <h4 className="text-base font-semibold text-txt-main">
                Sign In with Student ID
              </h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Log into your verified institutional account. The platform automatically determines your faculty, department, and semester.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-surface-secondary border border-edge text-brand font-bold font-mono flex items-center justify-center text-sm shadow-xs">
                02
              </div>
              <h4 className="text-base font-semibold text-txt-main">
                Participate & Discover
              </h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Review verified notices, book upcoming workshop seats before they fill up, and search the lost & found feed with photos.
              </p>
            </div>

            <div className="space-y-3 relative">
              <div className="w-10 h-10 rounded-xl bg-surface-secondary border border-edge text-brand font-bold font-mono flex items-center justify-center text-sm shadow-xs">
                03
              </div>
              <h4 className="text-base font-semibold text-txt-main">
                Instant Resolutions
              </h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Raise help desk tickets with dedicated tracking IDs. Receive prompt replies directly from department heads and advisors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. INSTITUTIONAL SECURITY & INTEGRITY */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-1 space-y-3">
            <Badge variant="brand" size="sm">
              Enterprise Architecture
            </Badge>
            <h2 className="text-2xl font-semibold tracking-tight text-txt-main">
              Built on Modern Standards of Security & Privacy
            </h2>
            <p className="text-sm text-txt-secondary leading-relaxed">
              We take student data privacy seriously. CampusFlow is fortified with strict PostgreSQL Row-Level Security so students only access authorized data.
            </p>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-edge bg-surface space-y-2">
              <ShieldCheck className="w-6 h-6 text-brand" />
              <h4 className="text-sm font-semibold text-txt-main">Database-Level RLS</h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Security policies are executed inside Supabase Postgres, preventing unprivileged clients from reading private records.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-edge bg-surface space-y-2">
              <Users className="w-6 h-6 text-emerald-500" />
              <h4 className="text-sm font-semibold text-txt-main">Strict Role Separation</h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Student and Admin routes are rigorously isolated. Public registrations cannot elevate privileges.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-edge bg-surface space-y-2">
              <FileText className="w-6 h-6 text-amber-500" />
              <h4 className="text-sm font-semibold text-txt-main">Verified Document Storage</h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Official notices and claim verification media are stored in isolated, access-controlled Supabase storage buckets.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-edge bg-surface space-y-2">
              <Clock className="w-6 h-6 text-sky-500" />
              <h4 className="text-sm font-semibold text-txt-main">Realtime Subscriptions</h4>
              <p className="text-xs text-txt-secondary leading-relaxed">
                Instant notification updates and ticket replies without needing full page refreshes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INTERACTIVE FAQS */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <Badge variant="neutral" size="sm">
            Questions & Answers
          </Badge>
          <h2 className="text-2xl font-semibold tracking-tight text-txt-main">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-txt-muted">
            Everything you need to know about navigating the CampusFlow platform.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
              className="p-4 sm:p-5 rounded-xl border border-edge bg-surface hover:border-txt-muted/30 transition-all cursor-pointer shadow-xs select-none"
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-semibold text-txt-main">{faq.q}</h4>
                <span className="text-txt-muted font-mono text-sm shrink-0">
                  {activeFaq === idx ? '−' : '+'}
                </span>
              </div>
              {activeFaq === idx && (
                <p className="text-xs text-txt-secondary mt-3 pt-3 border-t border-edge leading-relaxed animate-in fade-in duration-150">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. BOTTOM CALL-TO-ACTION (CTA) BANNER */}
      {/* ========================================================= */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white text-center space-y-6 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative space-y-3 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Experience Next-Gen Campus Life?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join thousands of students and faculty members already managing academic notices, event registrations, and campus inquiries on CampusFlow.
            </p>
          </div>

          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                className="w-full sm:w-auto"
              >
                Create Student Account
              </Button>
            </Link>
            <Link to="/login" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto !bg-slate-800/80 !text-white !border-slate-700 hover:!bg-slate-800"
              >
                Sign In to Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
