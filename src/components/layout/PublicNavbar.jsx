import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Layers,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  LogIn,
  GraduationCap,
} from 'lucide-react'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../common/ThemeToggle'

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Track scroll position for subtle border/shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const scrollToSection = (id) => {
    const elem = document.getElementById(id)
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`
        sticky top-0 z-50 w-full transition-all duration-200
        ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md border-b border-edge shadow-xs'
            : 'bg-surface/70 backdrop-blur-xs border-b border-edge/60'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 duration-150">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-txt-main">
                CampusFlow
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20 hidden sm:inline-flex">
                Smart Campus
              </span>
            </div>
            <p className="text-[11px] text-txt-muted leading-none hidden sm:block">
              University Management Ecosystem
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <Link
            to="/#features"
            onClick={() => scrollToSection('features')}
            className="px-3.5 py-2 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70 rounded-lg transition-colors"
          >
            Features
          </Link>

          <Link
            to="/#modules"
            onClick={() => scrollToSection('modules')}
            className="px-3.5 py-2 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70 rounded-lg transition-colors"
          >
            Modules
          </Link>

          <NavLink
            to="/about"
            className={({ isActive }) => `
              px-3.5 py-2 text-sm font-medium rounded-lg transition-colors
              ${
                isActive
                  ? 'text-brand bg-brand/10'
                  : 'text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70'
              }
            `}
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) => `
              px-3.5 py-2 text-sm font-medium rounded-lg transition-colors
              ${
                isActive
                  ? 'text-brand bg-brand/10'
                  : 'text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70'
              }
            `}
          >
            Contact
          </NavLink>

          <NavLink
            to="/design-system"
            className={({ isActive }) => `
              px-3.5 py-2 text-sm font-medium rounded-lg transition-colors
              ${
                isActive
                  ? 'text-brand bg-brand/10'
                  : 'text-txt-secondary hover:text-txt-main hover:bg-surface-secondary/70'
              }
            `}
          >
            Design System
          </NavLink>
        </nav>

        {/* Right CTA / Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Link to="/login">
            <Button variant="ghost" size="sm" leftIcon={LogIn}>
              Sign In
            </Button>
          </Link>

          <Link to="/student/dashboard">
            <Button
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
              className="shadow-xs"
            >
              Student Portal
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-txt-secondary hover:text-txt-main hover:bg-surface-secondary border border-edge transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-edge bg-surface/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              to="/#features"
              onClick={() => {
                setMobileMenuOpen(false)
                scrollToSection('features')
              }}
              className="px-3.5 py-2.5 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg"
            >
              Features
            </Link>
            <Link
              to="/#modules"
              onClick={() => {
                setMobileMenuOpen(false)
                scrollToSection('modules')
              }}
              className="px-3.5 py-2.5 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg"
            >
              Modules
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg"
            >
              Contact
            </Link>
            <Link
              to="/design-system"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2.5 text-sm font-medium text-txt-secondary hover:text-txt-main hover:bg-surface-secondary rounded-lg"
            >
              Design System
            </Link>
          </nav>

          <div className="pt-3 border-t border-edge flex flex-col gap-2.5">
            <Link to="/login" className="w-full">
              <Button variant="secondary" size="md" className="w-full justify-center">
                Sign In to Account
              </Button>
            </Link>
            <Link to="/student/dashboard" className="w-full">
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                className="w-full justify-center"
              >
                Access Student Portal
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
