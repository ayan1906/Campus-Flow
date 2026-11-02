import { Link } from 'react-router-dom'
import {
  Layers,
  ShieldCheck,
  Heart,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-edge bg-surface/70 text-txt-main">
      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs">
                <Layers className="w-4.5 h-4.5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-txt-main">
                CampusFlow
              </span>
            </Link>

            <p className="text-sm text-txt-secondary max-w-sm leading-relaxed">
              CampusFlow is a production-grade Smart Campus Management Ecosystem built to unify academic notices, lost & found claims, campus event signups, and student support into one cohesive portal.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-txt-muted">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
              <span>•</span>
              <span className="font-mono">v1.0 Release</span>
            </div>
          </div>

          {/* Column 1: Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-txt-main uppercase tracking-wider">
              Campus Portals
            </h4>
            <ul className="space-y-2 text-sm text-txt-secondary">
              <li>
                <Link to="/student/dashboard" className="hover:text-brand transition-colors">
                  Student Portal
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-brand transition-colors">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-brand transition-colors">
                  Faculty Access
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-brand transition-colors">
                  New Student Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Modules */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-txt-main uppercase tracking-wider">
              Core Modules
            </h4>
            <ul className="space-y-2 text-sm text-txt-secondary">
              <li>
                <Link to="/student/notices" className="hover:text-brand transition-colors">
                  Smart Notice Board
                </Link>
              </li>
              <li>
                <Link to="/student/lost-found" className="hover:text-brand transition-colors">
                  Lost & Found Hub
                </Link>
              </li>
              <li>
                <Link to="/student/events" className="hover:text-brand transition-colors">
                  Campus Events
                </Link>
              </li>
              <li>
                <Link to="/student/helpdesk" className="hover:text-brand transition-colors">
                  Student Help Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Institutional & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-txt-main uppercase tracking-wider">
              Security & Policy
            </h4>
            <ul className="space-y-2 text-sm text-txt-secondary">
              <li>
                <Link to="/about" className="hover:text-brand transition-colors">
                  About the Platform
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand transition-colors">
                  IT Support Desk
                </Link>
              </li>
              <li>
                <span className="inline-flex items-center gap-1 text-txt-muted hover:text-txt-main cursor-pointer">
                  <span>Row-Level Security</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-brand" />
                </span>
              </li>
              <li>
                <span className="text-txt-muted hover:text-txt-main cursor-pointer">
                  Campus Guidelines
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-edge/80 py-6 px-4 sm:px-6 lg:px-8 bg-surface-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-txt-muted">
          <div>
            © {currentYear} CampusFlow University Ecosystem. Crafted with human care and engineering discipline.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono">React 19</span>
            <span>•</span>
            <span className="font-mono">Vite</span>
            <span>•</span>
            <span className="font-mono">Tailwind v4</span>
            <span>•</span>
            <span className="font-mono">Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

