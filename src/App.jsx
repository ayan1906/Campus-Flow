import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { PublicLayout } from './components/layout/PublicLayout'
import { LandingPage } from './pages/public/LandingPage'
import { AboutPage } from './pages/public/AboutPage'
import { ContactPage } from './pages/public/ContactPage'
import { DesignSystemPage } from './pages/public/DesignSystemPage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage'
import { Button } from './components/ui/Button'
import { AlertCircle } from 'lucide-react'

function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-danger-main/10 text-danger-main flex items-center justify-center">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h1 className="text-3xl font-bold text-txt-main">404 — Page Not Found</h1>
      <p className="text-sm text-txt-secondary max-w-sm">
        The requested university portal route or resource does not exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="md">
          Return to CampusFlow Home
        </Button>
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/design-system" element={<DesignSystemPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
