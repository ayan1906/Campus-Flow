import { NavLink, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Bell,
  FolderSearch,
  Calendar,
  LifeBuoy,
  Activity,
  Inbox,
  User,
  Settings,
  Layers,
  X,
  ExternalLink,
  ChevronRight,
  Shield,
} from 'lucide-react'

export function StudentSidebar({ isOpen, onClose }) {
  const navItems = [
    { label: 'Overview', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'All Notices', to: '/student/notices', icon: Bell },
    { label: 'Lost & Found', to: '/student/lost-found', icon: FolderSearch },
    { label: 'Campus Events', to: '/student/events', icon: Calendar },
    { label: 'Help Desk', to: '/student/helpdesk', icon: LifeBuoy },
    { label: 'My Activities', to: '/student/activities', icon: Activity },
    { label: 'Notifications', to: '/student/notifications', icon: Inbox },
    { label: 'My Profile', to: '/student/profile', icon: User },
    { label: 'Settings', to: '/student/settings', icon: Settings },
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
            <div className="w-8 h-8 rounded-lg bg-brand text-white flex items-center justify-center shadow-xs">
              <Layers className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-txt-main">
                CampusFlow
              </span>
              <span className="block text-[10px] text-brand font-medium">
                Student Portal
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
            Portal Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
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

        {/* Bottom Student Academic Badge */}
        <div className="p-3 border-t border-edge shrink-0 space-y-2">
          <div className="p-2.5 rounded-xl bg-surface-secondary/80 border border-edge">
            <div className="flex items-center justify-between text-[11px] font-semibold text-txt-main">
              <span>Dept of CSE</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand/10 text-brand">
                Sem 6
              </span>
            </div>
            <div className="text-[10px] text-txt-muted mt-0.5 font-mono">
              ID: 2026-CSE-1049
            </div>
          </div>

          <Link
            to="/admin/dashboard"
            className="flex items-center justify-between px-3 py-2 text-[11px] text-txt-muted hover:text-brand hover:bg-surface-secondary rounded-lg transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Switch to Admin
            </span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </aside>
    </>
  )
}

