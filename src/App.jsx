import { useState } from 'react'
import {
  Layers,
  Sparkles,
  Search,
  Mail,
  Bell,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Trash2,
  Plus,
  SlidersHorizontal,
  ExternalLink,
  Shield,
  GraduationCap,
  Users,
  Calendar,
  FileText,
  LifeBuoy,
} from 'lucide-react'
import toast from 'react-hot-toast'
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  ConfirmDialog,
  Avatar,
  SkeletonCard,
  EmptyState,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from './components/ui'
import { ThemeToggle } from './components/common/ThemeToggle'
import { useTheme } from './hooks/useTheme'

function App() {
  const { isDark } = useTheme()

  // Interactive UI states
  const [btnLoading, setBtnLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('components')

  // Sample form inputs
  const [emailInput, setEmailInput] = useState('')
  const [selectedDept, setSelectedDept] = useState('cse')

  const toggleLoadingState = () => {
    setBtnLoading(true)
    setTimeout(() => {
      setBtnLoading(false)
      toast.success('Action simulated successfully!')
    }, 1500)
  }

  const handleDeleteSim = () => {
    setConfirmOpen(false)
    toast.error('Item removed from record.', {
      icon: '🗑️',
    })
  }

  return (
    <div className="min-h-screen bg-canvas text-txt-main transition-colors duration-200">
      {/* Top Application Bar */}
      <header className="sticky top-0 z-40 w-full h-[68px] bg-surface/90 backdrop-blur-md border-b border-edge px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-base tracking-tight text-txt-main">
                CampusFlow
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-brand/10 text-brand border border-brand/20">
                Design System v1.0
              </span>
            </div>
            <p className="text-xs text-txt-muted hidden sm:block">
              Smart Campus Management Ecosystem • Master UI System
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-1.5 p-1 rounded-lg bg-surface-secondary border border-edge text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'components'
                  ? 'bg-surface text-txt-main shadow-xs'
                  : 'text-txt-secondary hover:text-txt-main'
              }`}
            >
              Components Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('typography')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'typography'
                  ? 'bg-surface text-txt-main shadow-xs'
                  : 'text-txt-secondary hover:text-txt-main'
              }`}
            >
              Typography & Hierarchy
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('colors')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                activeTab === 'colors'
                  ? 'bg-surface text-txt-main shadow-xs'
                  : 'text-txt-secondary hover:text-txt-main'
              }`}
            >
              Color Tokens
            </button>
          </div>

          <ThemeToggle showLabel={false} />

          <Avatar
            name="Campus Administrator"
            size="sm"
            status="online"
          />
        </div>
      </header>

      {/* Hero Intro Banner */}
      <section className="border-b border-edge bg-surface-secondary/40 py-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-brand/10 text-brand text-xs font-medium border border-brand/20">
              <Sparkles className="w-3.5 h-3.5" />
              Human-Crafted UI Framework
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-txt-main">
              Master UI/UX Design System
            </h1>
            <p className="text-sm text-txt-secondary max-w-2xl leading-relaxed">
              Designed for visual balance, accessibility (WCAG AA), and high productivity. Built with clean surfaces, subtle borders, restrained semantic badges, and instant dark/light mode switching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              leftIcon={SlidersHorizontal}
              onClick={() => setConfirmOpen(true)}
            >
              Test Confirm Dialog
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={Plus}
              onClick={() => setModalOpen(true)}
            >
              Open Reusable Modal
            </Button>
          </div>
        </div>
      </section>

      {/* Main Showcase Container */}
      <main className="max-w-6xl mx-auto p-4 sm:p-8 space-y-12">
        {/* ========================================================= */}
        {/* TAB 1: COMPONENTS SHOWCASE */}
        {/* ========================================================= */}
        {(activeTab === 'components' || activeTab === 'all') && (
          <div className="space-y-10">
            {/* 1. BUTTONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-edge">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-txt-main">
                    1. Buttons & Interaction States
                  </h2>
                  <p className="text-xs text-txt-muted">
                    Variants: Primary, Secondary, Outline, Ghost, Danger, and Icon with subtle active scaling.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLoadingState}
                >
                  Toggle Loading State
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card padding="md">
                  <h4 className="text-xs font-semibold text-txt-secondary uppercase tracking-wider mb-3">
                    Button Variants
                  </h4>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <Button variant="primary" isLoading={btnLoading}>
                      Primary Button
                    </Button>
                    <Button variant="secondary" isLoading={btnLoading}>
                      Secondary
                    </Button>
                    <Button variant="outline" isLoading={btnLoading}>
                      Outline
                    </Button>
                    <Button variant="ghost" isLoading={btnLoading}>
                      Ghost
                    </Button>
                    <Button variant="danger" isLoading={btnLoading}>
                      Danger
                    </Button>
                    <Button variant="danger-outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </Card>

                <Card padding="md">
                  <h4 className="text-xs font-semibold text-txt-secondary uppercase tracking-wider mb-3">
                    Sizes & Icon Slots
                  </h4>
                  <div className="flex flex-wrap gap-2.5 items-center">
                    <Button size="sm" leftIcon={Mail}>
                      Small (32px)
                    </Button>
                    <Button size="md" rightIcon={ArrowRight}>
                      Medium (38px)
                    </Button>
                    <Button size="lg" leftIcon={GraduationCap}>
                      Large (44px)
                    </Button>
                    <Button variant="icon" size="icon" aria-label="Notifications">
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button variant="secondary" disabled>
                      Disabled State
                    </Button>
                  </div>
                </Card>
              </div>
            </section>

            {/* 2. FORM CONTROLS */}
            <section className="space-y-4">
              <div className="pb-2 border-b border-edge">
                <h2 className="text-lg font-semibold tracking-tight text-txt-main">
                  2. Accessible Form Elements
                </h2>
                <p className="text-xs text-txt-muted">
                  Consistent 8px radius, accessible focus rings, left icons, helper text, and error validation states.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Input
                  label="Institutional Email"
                  placeholder="student@university.edu"
                  leftIcon={Mail}
                  helperText="Use your assigned .edu email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />

                <Input
                  label="Student Registration ID"
                  placeholder="e.g. 2026-CSE-1049"
                  error="Registration ID format is invalid"
                  defaultValue="CSE1049"
                  required
                />

                <Select
                  label="Academic Department"
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  options={[
                    { value: 'cse', label: 'Computer Science & Engineering' },
                    { value: 'eee', label: 'Electrical & Electronic Engineering' },
                    { value: 'bba', label: 'Business Administration' },
                    { value: 'law', label: 'Department of Law' },
                  ]}
                  required
                />
              </div>
            </section>

            {/* 3. SEMANTIC STATUS BADGES */}
            <section className="space-y-4">
              <div className="pb-2 border-b border-edge">
                <h2 className="text-lg font-semibold tracking-tight text-txt-main">
                  3. Restrained Semantic Badges
                </h2>
                <p className="text-xs text-txt-muted">
                  Subtle tints with clear contrast, optional live dot indicator, avoiding oversaturated neon colors.
                </p>
              </div>

              <Card padding="md">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="approved" dot>
                    Approved
                  </Badge>
                  <Badge variant="resolved" dot>
                    Resolved
                  </Badge>
                  <Badge variant="in_progress" dot>
                    In Progress
                  </Badge>
                  <Badge variant="pending" dot>
                    Pending Review
                  </Badge>
                  <Badge variant="rejected" dot>
                    Rejected
                  </Badge>
                  <Badge variant="brand" dot>
                    Official Notice
                  </Badge>
                  <Badge variant="neutral">
                    Archived
                  </Badge>
                  <Badge variant="approved" size="sm">
                    Verified Student
                  </Badge>
                </div>
              </Card>
            </section>

            {/* 4. DATA TABLE & ROSTER */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-edge">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-txt-main">
                    4. Data Table Component
                  </h2>
                  <p className="text-xs text-txt-muted">
                    Clean row alignment, subtle borders, hover highlights, and tabular metadata figures.
                  </p>
                </div>
                <div className="w-56">
                  <Input
                    placeholder="Search records..."
                    leftIcon={Search}
                    className="h-8 text-xs"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow hover={false}>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Semester</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recent Activity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      name: 'Tanvir Ahmed',
                      email: 'tanvir.cse@campus.edu',
                      dept: 'CSE',
                      sem: '6th Semester',
                      status: 'approved',
                      statusText: 'Active',
                      activity: 'Registered for Hackathon 2026',
                    },
                    {
                      name: 'Nusrat Jahan',
                      email: 'nusrat.eee@campus.edu',
                      dept: 'EEE',
                      sem: '4th Semester',
                      status: 'in_progress',
                      statusText: 'Ticket Open',
                      activity: 'Reported Lost ID Card',
                    },
                    {
                      name: 'Shakil Hasan',
                      email: 'shakil.bba@campus.edu',
                      dept: 'BBA',
                      sem: '8th Semester',
                      status: 'approved',
                      statusText: 'Active',
                      activity: 'Read Convocation Notice',
                    },
                    {
                      name: 'Farhana Kabir',
                      email: 'farhana.law@campus.edu',
                      dept: 'LAW',
                      sem: '2nd Semester',
                      status: 'pending',
                      statusText: 'Pending ID Verify',
                      activity: 'Submitted Verification Docs',
                    },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar name={row.name} size="sm" />
                          <div>
                            <div className="font-medium text-txt-main">{row.name}</div>
                            <div className="text-xs text-txt-muted">{row.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{row.dept}</TableCell>
                      <TableCell className="text-txt-secondary">{row.sem}</TableCell>
                      <TableCell>
                        <Badge variant={row.status} dot size="sm">
                          {row.statusText}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-txt-muted text-xs">
                        {row.activity}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toast(`Inspecting ${row.name}'s profile`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>

            {/* 5. CARDS, EMPTY STATES & SKELETON LOADERS */}
            <section className="space-y-4">
              <div className="pb-2 border-b border-edge">
                <h2 className="text-lg font-semibold tracking-tight text-txt-main">
                  5. Surfaces, Skeletons & Empty States
                </h2>
                <p className="text-xs text-txt-muted">
                  Structured cards, graceful loading states, and purposeful zero-data representations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Standard Card */}
                <Card hoverable padding="md" className="flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <Badge variant="brand" size="sm">
                          Notice
                        </Badge>
                        <span className="text-xs text-txt-muted font-mono">2h ago</span>
                      </div>
                      <CardTitle className="mt-2">Spring Midterm Exam Schedule</CardTitle>
                      <CardDescription>
                        Published by Office of the Controller of Examinations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-txt-secondary line-clamp-3">
                        The examination committee has released the finalized routine for all undergraduate departments. Please review seating plans and guidelines.
                      </p>
                    </CardContent>
                  </div>
                  <CardFooter className="justify-between">
                    <span className="text-xs text-txt-muted">PDF Attached (1.2 MB)</span>
                    <Button variant="outline" size="sm" rightIcon={ExternalLink}>
                      Details
                    </Button>
                  </CardFooter>
                </Card>

                {/* Skeleton Card */}
                <SkeletonCard />

                {/* Empty State */}
                <EmptyState
                  title="No Pending Approvals"
                  description="All student registrations and submitted lost items have been reviewed."
                  actionText="Refresh Feed"
                  onAction={() => toast.success('Feed updated!')}
                />
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TYPOGRAPHY & HIERARCHY */}
        {/* ========================================================= */}
        {activeTab === 'typography' && (
          <div className="space-y-8 animate-in fade-in duration-150">
            <Card padding="lg" className="space-y-6">
              <div className="pb-4 border-b border-edge">
                <h2 className="text-xl font-semibold tracking-tight text-txt-main">
                  Editorial Typography Hierarchy (Inter)
                </h2>
                <p className="text-xs text-txt-muted mt-1">
                  Balanced weights, clear hierarchy, and tabular numbers for reliable data rendering.
                </p>
              </div>

              <div className="space-y-6">
                <div className="pb-4 border-b border-edge">
                  <div className="text-xs font-mono text-txt-muted mb-1">
                    Page Heading • 28–32px / 600 weight
                  </div>
                  <h1 className="text-3xl font-semibold text-txt-main tracking-tight">
                    Smart Campus Overview & Administrative Console
                  </h1>
                </div>

                <div className="pb-4 border-b border-edge">
                  <div className="text-xs font-mono text-txt-muted mb-1">
                    Section Heading • 19–22px / 600 weight
                  </div>
                  <h2 className="text-xl font-semibold text-txt-main tracking-tight">
                    Active Registrations & Department Analytics
                  </h2>
                </div>

                <div className="pb-4 border-b border-edge">
                  <div className="text-xs font-mono text-txt-muted mb-1">
                    Card Heading • 15–17px / 600 weight
                  </div>
                  <h3 className="text-base font-semibold text-txt-main">
                    Computer Science Department — Faculty Notice
                  </h3>
                </div>

                <div className="pb-4 border-b border-edge">
                  <div className="text-xs font-mono text-txt-muted mb-1">
                    Body Text • 14–15px / 400 weight (Line Height 150%)
                  </div>
                  <p className="text-sm text-txt-main max-w-2xl leading-relaxed">
                    CampusFlow enables streamlined communication between students, faculty members, and campus administration. Everything from urgent notifications to event signups and help desk tickets is managed in a unified workspace.
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono text-txt-muted mb-2">
                    Tabular Figures & Statistics Cards
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-surface-secondary border border-edge">
                      <div className="text-xs text-txt-muted">Total Students</div>
                      <div className="text-2xl font-bold font-mono tracking-tight text-txt-main mt-1">
                        4,892
                      </div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        +12% this semester
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-secondary border border-edge">
                      <div className="text-xs text-txt-muted">Notices Published</div>
                      <div className="text-2xl font-bold font-mono tracking-tight text-txt-main mt-1">
                        148
                      </div>
                      <span className="text-[11px] text-txt-muted">Across 8 depts</span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-secondary border border-edge">
                      <div className="text-xs text-txt-muted">Ticket Resolution</div>
                      <div className="text-2xl font-bold font-mono tracking-tight text-txt-main mt-1">
                        98.4%
                      </div>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        Avg 2.4 hr response
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-secondary border border-edge">
                      <div className="text-xs text-txt-muted">Upcoming Events</div>
                      <div className="text-2xl font-bold font-mono tracking-tight text-txt-main mt-1">
                        12
                      </div>
                      <span className="text-[11px] text-brand font-medium">3 today</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: COLOR PALETTE & TOKENS */}
        {/* ========================================================= */}
        {activeTab === 'colors' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <Card padding="lg">
              <div className="flex items-center justify-between pb-4 border-b border-edge">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight text-txt-main">
                    Semantic Color System ({isDark ? 'Dark Theme' : 'Light Theme'} Active)
                  </h2>
                  <p className="text-xs text-txt-muted mt-1">
                    WCAG AA compliant contrast with separate thoughtfully designed Light and Dark modes.
                  </p>
                </div>
                <Badge variant={isDark ? 'brand' : 'neutral'}>
                  {isDark ? 'Dark Mode: #10131B Base' : 'Light Mode: #F8F9FC Base'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {[
                  { name: 'Canvas Background', token: 'bg-canvas', hex: isDark ? '#10131B' : '#F8F9FC' },
                  { name: 'Surface Surface', token: 'bg-surface', hex: isDark ? '#181D29' : '#FFFFFF' },
                  { name: 'Secondary Surface', token: 'bg-surface-secondary', hex: isDark ? '#202637' : '#F1F3F8' },
                  { name: 'Primary Brand', token: 'bg-brand', hex: isDark ? '#818CF8' : '#4F46E5', textLight: true },
                  { name: 'Text Primary', token: 'text-txt-main', hex: isDark ? '#F1F3F9' : '#171923' },
                  { name: 'Text Secondary', token: 'text-txt-secondary', hex: isDark ? '#A3ACC0' : '#647084' },
                  { name: 'Muted Text', token: 'text-txt-muted', hex: isDark ? '#727E94' : '#929BAD' },
                  { name: 'Subtle Border', token: 'border-edge', hex: isDark ? '#2B3447' : '#E5E8EF' },
                  { name: 'Success Accent', token: 'bg-success-main', hex: isDark ? '#42B883' : '#16865A', textLight: true },
                  { name: 'Warning Accent', token: 'bg-warning-main', hex: isDark ? '#E6B85C' : '#C58A24', textLight: true },
                  { name: 'Danger Accent', token: 'bg-danger-main', hex: isDark ? '#F07878' : '#D94B4B', textLight: true },
                  { name: 'Info Accent', token: 'bg-info-main', hex: isDark ? '#67A6E8' : '#3478C7', textLight: true },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-edge bg-surface space-y-2.5"
                  >
                    <div
                      className={`h-12 w-full rounded-lg border border-edge/60 flex items-center justify-center font-mono text-xs font-semibold ${
                        item.textLight ? 'text-white' : 'text-txt-main'
                      }`}
                      style={{ backgroundColor: item.hex }}
                    >
                      {item.hex}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-txt-main">{item.name}</div>
                      <div className="text-[11px] font-mono text-txt-muted">{item.token}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>

      {/* Reusable Modal Demonstration */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Campus Announcement"
        description="Fill in notice details to broadcast across departments."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setModalOpen(false)
                toast.success('Announcement broadcasted!')
              }}
            >
              Publish Notice
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Announcement Title"
            placeholder="e.g. Campus Library Extended Hours"
            required
          />
          <Select
            label="Target Audience"
            options={[
              { value: 'all', label: 'All Students & Faculty' },
              { value: 'undergrad', label: 'Undergraduate Only' },
              { value: 'postgrad', label: 'Postgraduate Only' },
            ]}
          />
          <div className="space-y-1.5 text-left">
            <label className="block text-xs font-medium text-txt-secondary">
              Notice Content
            </label>
            <textarea
              rows={4}
              placeholder="Write the announcement description..."
              className="w-full p-3 rounded-lg text-sm bg-surface text-txt-main border border-edge focus:border-brand focus:ring-2 focus:ring-brand/20 focus:outline-none transition-all placeholder:text-txt-muted"
            />
          </div>
        </div>
      </Modal>

      {/* Confirmation Dialog Demonstration */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteSim}
        title="Delete Notice Item"
        message="Are you sure you want to delete this notice? This action will permanently remove it from the student feed."
        confirmText="Yes, Delete"
        cancelText="Keep Item"
        variant="danger"
      />

      {/* Footer */}
      <footer className="border-t border-edge bg-surface/60 py-6 px-4 sm:px-8 mt-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <div>
            CampusFlow • Production Design System established for 21-Day Roadmap.
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono">React 19</span>
            <span>•</span>
            <span className="font-mono">Tailwind v4</span>
            <span>•</span>
            <span className="font-mono">Inter Typography</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
