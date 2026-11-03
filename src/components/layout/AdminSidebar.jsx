import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Bell,
  PlusCircle,
  FolderSearch,
  Calendar,
  LifeBuoy,
  BarChart3,
  Settings,
  Layers,
  X,
  ChevronRight,
  UserCheck,
} from 'lucide-react'

export function AdminSidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'Overview', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Students Directory', to: '/admin/students', icon: Users },
    { label: 'Faculty & Teachers', to: '/admin/teachers', icon: GraduationCap },
    { label: 'Notice Management', to: '/admin/notices', icon: Bell },
    { label: 'Create New Notice', to: '/admin/notices/create', icon: PlusCircle },
    { label: 'Lost & Found Moderation', to: '/admin/lost-found', icon: FolderSearch },
    { label: 'Campus Events', to: '/admin/events', icon: Calendar },
    { label: 'Help Desk Queue', to: '/admin/helpdesk', icon: LifeBuoy },
    { label: 'Analytics & Reports', to: '/admin/reports', icon: BarChart3 },
    { label: 'Console Settings', to: '/admin/settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40 w-[248px] bg-surface border-r border-edge
          flex flex-col justify-between transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:h-screen lg:shrink-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand / Logo Top */}
        <div className="h-[68px] px-5 border-b border-edge flex items-center justify-between shrink-0">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-txt-main">
                CampusFlow
              </span>
              <span className="block text-[10px] text-indigo-500 font-semibold uppercase tracking-wider">
                Admin Console
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-txt-muted hover:text-txt-main hover:bg-surface-secondary"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-txt-muted">
            Administrative Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                end={item.to === '/admin/dashboard'}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors
                  ${
                    isActive
                      ? 'bg-brand/10 text-brand font-semibold shadow-2xs'
                      : 'text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70'
                  }
                `}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            )
          })}
        </div>

        {/* Bottom Switch to Student */}
        <div className="p-3 border-t border-edge shrink-0 space-y-2">
          <div className="p-2.5 rounded-xl bg-surface-secondary/80 border border-edge">
            <div className="flex items-center justify-between text-[11px] font-semibold text-txt-main">
              <span>Super Admin</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Active
              </span>
            </div>
            <div className="text-[10px] text-txt-muted mt-0.5">
              Full System Access
            </div>
          </div>

          <Link
            to="/student/dashboard"
            className="flex items-center justify-between px-3 py-2 text-[11px] text-txt-muted hover:text-brand hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              View Student Portal
            </span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  )
}

