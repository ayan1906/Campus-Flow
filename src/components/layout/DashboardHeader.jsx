import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Sparkles,
} from 'lucide-react'
import { ThemeToggle } from '../common/ThemeToggle'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'

export function DashboardHeader({ onMenuClick, userRole = 'student' }) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const location = useLocation()

  // Generate dynamic page title from pathname
  const getPageTitle = () => {
    const segments = location.pathname.split('/').filter(Boolean)
    if (segments.length <= 1) return 'Dashboard Overview'
    const last = segments[segments.length - 1]
    return last
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const isAdmin = userRole === 'admin'
  const profileRoute = isAdmin ? '/admin/settings' : '/student/profile'
  const notificationsRoute = isAdmin ? '/admin/dashboard' : '/student/notifications'

  return (
    <header className="sticky top-0 z-30 h-[68px] bg-surface/90 backdrop-blur-md border-b border-edge px-4 sm:px-6 flex items-center justify-between">
      {/* Left: Mobile Menu Trigger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-txt-secondary hover:text-txt-main hover:bg-surface-secondary border border-edge transition-colors cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-txt-main">
            {getPageTitle()}
          </h1>
          <div className="flex items-center gap-1.5 text-xs text-txt-muted hidden sm:flex">
            <Link to={isAdmin ? '/admin/dashboard' : '/student/dashboard'} className="hover:text-brand">
              {isAdmin ? 'Admin Console' : 'Student Portal'}
            </Link>
            <span>/</span>
            <span className="text-txt-secondary capitalize">
              {getPageTitle()}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Search, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Global Quick Search */}
        <div className="relative hidden md:block w-48 lg:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-txt-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search portal..."
            className="w-full h-9 pl-9 pr-3 rounded-lg text-xs bg-surface-secondary border border-edge text-txt-main focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand/30 transition-all placeholder:text-txt-muted"
          />
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notification Bell */}
        <Link
          to={notificationsRoute}
          className="relative p-2 rounded-lg text-txt-secondary hover:text-txt-main hover:bg-surface-secondary border border-transparent hover:border-edge transition-colors"
          aria-label="View notifications"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand ring-2 ring-surface" />
        </Link>

        {/* User Profile Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-secondary border border-transparent hover:border-edge transition-colors cursor-pointer select-none"
          >
            <Avatar
              name={isAdmin ? 'Administrator' : 'Samin Yasar'}
              size="sm"
              status="online"
            />
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-txt-main leading-tight">
                {isAdmin ? 'Campus Admin' : 'Samin Yasar'}
              </div>
              <div className="text-[10px] text-txt-muted capitalize">
                {userRole}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-txt-muted hidden sm:block" />
          </button>

          {/* Dropdown Menu */}
          {userDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-surface border border-edge rounded-xl shadow-lg p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100"
              onClick={() => setUserDropdownOpen(false)}
            >
              <div className="px-3 py-2 border-b border-edge mb-1">
                <div className="text-xs font-semibold text-txt-main">
                  {isAdmin ? 'System Administrator' : 'Samin Yasar'}
                </div>
                <div className="text-[11px] text-txt-muted">
                  {isAdmin ? 'admin@campusflow.edu' : 'samin.cse@campusflow.edu'}
                </div>
              </div>

              <Link
                to={profileRoute}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <User className="w-4 h-4 text-txt-muted" />
                <span>My Profile</span>
              </Link>

              <Link
                to={isAdmin ? '/admin/settings' : '/student/settings'}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4 text-txt-muted" />
                <span>Account Settings</span>
              </Link>

              <div className="my-1 border-t border-edge" />

              <Link
                to="/"
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-danger-main hover:bg-danger-main/10 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

