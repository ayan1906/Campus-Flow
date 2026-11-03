import { Routes, Route, Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute'

// Layouts
import { PublicLayout } from '../components/layout/PublicLayout'
import { StudentLayout } from '../components/layout/StudentLayout'
import { AdminLayout } from '../components/layout/AdminLayout'

// Public Pages
import { LandingPage } from '../pages/public/LandingPage'
import { AboutPage } from '../pages/public/AboutPage'
import { ContactPage } from '../pages/public/ContactPage'
import { DesignSystemPage } from '../pages/public/DesignSystemPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { RegisterPage } from '../pages/auth/RegisterPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'

// Student Portal Pages
import { StudentDashboard } from '../pages/student/StudentDashboard'
import { NoticesPage } from '../pages/student/NoticesPage'
import { NoticeDetailPage } from '../pages/student/NoticeDetailPage'
import { LostFoundPage } from '../pages/student/LostFoundPage'
import { CreateLostFoundPage } from '../pages/student/CreateLostFoundPage'
import { LostFoundDetailPage } from '../pages/student/LostFoundDetailPage'
import { EventsPage } from '../pages/student/EventsPage'
import { EventDetailPage } from '../pages/student/EventDetailPage'
import { HelpdeskPage } from '../pages/student/HelpdeskPage'
import { CreateTicketPage } from '../pages/student/CreateTicketPage'
import { ActivitiesPage } from '../pages/student/ActivitiesPage'
import { NotificationsPage } from '../pages/student/NotificationsPage'
import { ProfilePage } from '../pages/student/ProfilePage'
import { SettingsPage } from '../pages/student/SettingsPage'

// Admin Console Pages
import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { StudentsPage } from '../pages/admin/StudentsPage'
import { StudentDetailPage } from '../pages/admin/StudentDetailPage'
import { TeachersPage } from '../pages/admin/TeachersPage'
import { AdminNoticesPage } from '../pages/admin/AdminNoticesPage'
import { CreateNoticePage } from '../pages/admin/CreateNoticePage'
import { AdminLostFoundPage } from '../pages/admin/AdminLostFoundPage'
import { AdminEventsPage } from '../pages/admin/AdminEventsPage'
import { EventRegistrationsPage } from '../pages/admin/EventRegistrationsPage'
import { AdminHelpdeskPage } from '../pages/admin/AdminHelpdeskPage'
import { AdminTicketDetailPage } from '../pages/admin/AdminTicketDetailPage'
import { ReportsPage } from '../pages/admin/ReportsPage'
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-danger-main/10 text-danger-main flex items-center justify-center ring-1 ring-danger-main/20">
        <AlertCircle className="w-7 h-7" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-txt-main">
        404 — Page Not Found
      </h1>
      <p className="text-sm text-txt-secondary max-w-md leading-relaxed">
        The requested university portal route does not exist, or you might not have appropriate institutional clearance to view this module.
      </p>
      <div className="pt-2 flex items-center gap-3">
        <Link to="/">
          <Button variant="primary" size="md">
            Return to CampusFlow Home
          </Button>
        </Link>
        <Link to="/student/dashboard">
          <Button variant="secondary" size="md">
            Student Portal
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function AppRoutes() {
  return (
    <Routes>
      {/* 1. PUBLIC MARKETING & AUTH ROUTES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/design-system" element={<DesignSystemPage />} />

        {/* Public-only Auth Pages (Redirects if already signed in) */}
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <LoginPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <RegisterPage />
            </PublicOnlyRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicOnlyRoute>
              <ForgotPasswordPage />
            </PublicOnlyRoute>
          }
        />
      </Route>

      {/* 2. STUDENT PORTAL ROUTES (Protected: Student, Admin, Teacher) */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin', 'teacher']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="notices" element={<NoticesPage />} />
        <Route path="notices/:id" element={<NoticeDetailPage />} />
        <Route path="lost-found" element={<LostFoundPage />} />
        <Route path="lost-found/create" element={<CreateLostFoundPage />} />
        <Route path="lost-found/:id" element={<LostFoundDetailPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="events/:id" element={<EventDetailPage />} />
        <Route path="helpdesk" element={<HelpdeskPage />} />
        <Route path="helpdesk/create" element={<CreateTicketPage />} />
        <Route path="activities" element={<ActivitiesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 3. ADMIN CONSOLE ROUTES (Protected: Admin Only!) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="notices" element={<AdminNoticesPage />} />
        <Route path="notices/create" element={<CreateNoticePage />} />
        <Route path="lost-found" element={<AdminLostFoundPage />} />
        <Route path="events" element={<AdminEventsPage />} />
        <Route path="events/:id/registrations" element={<EventRegistrationsPage />} />
        <Route path="helpdesk" element={<AdminHelpdeskPage />} />
        <Route path="helpdesk/:id" element={<AdminTicketDetailPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* 4. CATCH-ALL ROUTE */}
      <Route element={<PublicLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
