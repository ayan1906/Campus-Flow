import { useState } from 'react'
import {
  Layers,
  Sparkles,
  Search,
  Mail,
  Bell,
  SlidersHorizontal,
  Plus,
  ExternalLink,
  GraduationCap,
  ArrowRight,
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
} from '../../components/ui'
import { useTheme } from '../../hooks/useTheme'

export function DesignSystemPage() {
  const { isDark } = useTheme()
  const [btnLoading, setBtnLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('components')

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
    toast.error('Item removed from record.', { icon: '🗑️' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-edge">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-brand/10 text-brand text-xs font-semibold border border-brand/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Human-Crafted Atomic System
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-txt-main">
            Master UI/UX Design System Playground
          </h1>
          <p className="text-sm text-txt-secondary mt-1">
            Standardized components adhering to Linear/Notion visual craft, WCAG AA contrast, and zero-flash theme persistence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="md"
            leftIcon={SlidersHorizontal}
            onClick={() => setConfirmOpen(true)}
          >
            Confirm Dialog
          </Button>
          <Button
            variant="primary"
            size="md"
            leftIcon={Plus}
            onClick={() => setModalOpen(true)}
          >
            Reusable Modal
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-surface-secondary border border-edge w-fit text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('components')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
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
          className={`px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
            activeTab === 'typography'
              ? 'bg-surface text-txt-main shadow-xs'
              : 'text-txt-secondary hover:text-txt-main'
          }`}
        >
          Typography Scale
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`px-3.5 py-2 rounded-lg font-medium transition-all cursor-pointer ${
            activeTab === 'colors'
              ? 'bg-surface text-txt-main shadow-xs'
              : 'text-txt-secondary hover:text-txt-main'
          }`}
        >
          Color Tokens
        </button>
      </div>

      {/* TAB 1: COMPONENTS */}
      {activeTab === 'components' && (
        <div className="space-y-10 animate-in fade-in duration-150">
          {/* 1. BUTTONS */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-edge">
              <div>
                <h3 className="text-base font-semibold text-txt-main">
                  1. Buttons & Interaction States
                </h3>
                <p className="text-xs text-txt-muted">
                  Primary, Secondary, Outline, Ghost, Danger, and Icon variants with active scaling.
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={toggleLoadingState}>
                Toggle Loading State
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card padding="md">
                <div className="text-xs font-semibold text-txt-secondary uppercase tracking-wider mb-3">
                  Variants
                </div>
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
                </div>
              </Card>

              <Card padding="md">
                <div className="text-xs font-semibold text-txt-secondary uppercase tracking-wider mb-3">
                  Sizes & Icons
                </div>
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
                    Disabled
                  </Button>
                </div>
              </Card>
            </div>
          </section>

          {/* 2. FORM CONTROLS */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-edge">
              <h3 className="text-base font-semibold text-txt-main">
                2. Accessible Form Elements
              </h3>
              <p className="text-xs text-txt-muted">
                Standard 8px radius, accessible focus rings, left icons, helper text, and error validation states.
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

          {/* 3. SEMANTIC BADGES */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-edge">
              <h3 className="text-base font-semibold text-txt-main">
                3. Restrained Semantic Badges
              </h3>
              <p className="text-xs text-txt-muted">
                Muted tints avoiding oversaturated neon backgrounds.
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
              </div>
            </Card>
          </section>

          {/* 4. DATA TABLE */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-edge">
              <div>
                <h3 className="text-base font-semibold text-txt-main">
                  4. Data Table Component
                </h3>
                <p className="text-xs text-txt-muted">
                  Subtle dividers, row hover highlighting, and clean alignments.
                </p>
              </div>
              <div className="w-56">
                <Input
                  placeholder="Filter records..."
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
                    status: 'approved',
                    statusText: 'Active',
                    activity: 'Registered for Hackathon 2026',
                  },
                  {
                    name: 'Nusrat Jahan',
                    email: 'nusrat.eee@campus.edu',
                    dept: 'EEE',
                    status: 'in_progress',
                    statusText: 'Ticket Open',
                    activity: 'Reported Lost ID Card',
                  },
                  {
                    name: 'Farhana Kabir',
                    email: 'farhana.law@campus.edu',
                    dept: 'LAW',
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
                        onClick={() => toast(`Viewing ${row.name}`)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* 5. CARDS & SKELETON */}
          <section className="space-y-4">
            <div className="pb-2 border-b border-edge">
              <h3 className="text-base font-semibold text-txt-main">
                5. Cards, Skeletons & Empty States
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card hoverable padding="md" className="flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="brand" size="sm">
                        Notice
                      </Badge>
                      <span className="text-xs text-txt-muted font-mono">2h ago</span>
                    </div>
                    <CardTitle className="mt-2">Spring Midterm Schedule</CardTitle>
                    <CardDescription>
                      Office of the Controller of Examinations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-txt-secondary line-clamp-3">
                      Examination committee released finalized schedules for all departments. Seating plans updated.
                    </p>
                  </CardContent>
                </div>
                <CardFooter className="justify-between">
                  <span className="text-xs text-txt-muted">PDF Attached</span>
                  <Button variant="outline" size="sm" rightIcon={ExternalLink}>
                    Details
                  </Button>
                </CardFooter>
              </Card>

              <SkeletonCard />

              <EmptyState
                title="No Pending Approvals"
                description="All student registrations and submitted items have been reviewed."
                actionText="Refresh Feed"
                onAction={() => toast.success('Feed refreshed!')}
              />
            </div>
          </section>
        </div>
      )}

      {/* TAB 2: TYPOGRAPHY */}
      {activeTab === 'typography' && (
        <Card padding="lg" className="space-y-6 animate-in fade-in duration-150">
          <div className="pb-4 border-b border-edge">
            <h2 className="text-xl font-semibold text-txt-main">Inter Typography Hierarchy</h2>
            <p className="text-xs text-txt-muted mt-1">Natural editorial scale with tabular numbers</p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-txt-muted block mb-1">Page Heading (32px / 600)</span>
              <h1 className="text-3xl font-semibold text-txt-main tracking-tight">Smart Campus Management</h1>
            </div>
            <div>
              <span className="text-xs font-mono text-txt-muted block mb-1">Section Heading (20px / 600)</span>
              <h2 className="text-xl font-semibold text-txt-main tracking-tight">Active Department Registrations</h2>
            </div>
            <div>
              <span className="text-xs font-mono text-txt-muted block mb-1">Body Text (14px / 400)</span>
              <p className="text-sm text-txt-secondary leading-relaxed max-w-xl">
                CampusFlow keeps student life and campus administration aligned with zero visual noise.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* TAB 3: COLORS */}
      {activeTab === 'colors' && (
        <Card padding="lg" className="space-y-6 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-4 border-b border-edge">
            <div>
              <h2 className="text-xl font-semibold text-txt-main">Semantic Colors</h2>
              <p className="text-xs text-txt-muted mt-1">Active Theme: {isDark ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <Badge variant="brand">{isDark ? '#10131B Base' : '#F8F9FC Base'}</Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Canvas', hex: isDark ? '#10131B' : '#F8F9FC' },
              { name: 'Surface', hex: isDark ? '#181D29' : '#FFFFFF' },
              { name: 'Secondary Surface', hex: isDark ? '#202637' : '#F1F3F8' },
              { name: 'Brand Primary', hex: isDark ? '#818CF8' : '#4F46E5', textLight: true },
              { name: 'Success Accent', hex: isDark ? '#42B883' : '#16865A', textLight: true },
              { name: 'Warning Accent', hex: isDark ? '#E6B85C' : '#C58A24', textLight: true },
              { name: 'Danger Accent', hex: isDark ? '#F07878' : '#D94B4B', textLight: true },
              { name: 'Info Accent', hex: isDark ? '#67A6E8' : '#3478C7', textLight: true },
            ].map((col, i) => (
              <div key={i} className="p-3 rounded-xl border border-edge bg-surface space-y-2">
                <div
                  className={`h-10 rounded-lg flex items-center justify-center font-mono text-xs font-semibold ${
                    col.textLight ? 'text-white' : 'text-txt-main'
                  }`}
                  style={{ backgroundColor: col.hex }}
                >
                  {col.hex}
                </div>
                <div className="text-xs font-semibold text-txt-main">{col.name}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Modal & Confirm Dialog */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Announcement"
        description="Broadcast notice to student portal."
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
                toast.success('Notice published!')
              }}
            >
              Publish
            </Button>
          </>
        }
      >
        <Input label="Notice Title" placeholder="Midterm Examination Routine" />
      </Modal>

      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDeleteSim}
        title="Delete Record"
        message="Are you sure you want to delete this record? This cannot be undone."
      />
    </div>
  )
}

