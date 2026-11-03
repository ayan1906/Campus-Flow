import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2, Layers } from 'lucide-react'
import toast from 'react-hot-toast'

export function ProtectedRoute({ allowedRoles = ['student', 'admin', 'teacher'], children }) {
  const { isAuthenticated, isLoading, role } = useSelector((state) => state.auth)
  const location = useLocation()

  useEffect(() => {
    if (!isLoading && isAuthenticated && allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      toast.error('Access Restricted: Administrative clearance required for this console.')
    }
  }, [isLoading, isAuthenticated, role, allowedRoles])

  // 1. Show smooth branded loader while session is being verified
  if (isLoading) {
    return (
      <div className="min-h-screen bg-canvas flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-brand text-white flex items-center justify-center shadow-lg animate-pulse">
          <Layers className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-2 text-xs text-txt-muted font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-brand" />
          <span>Verifying institutional session...</span>
        </div>
      </div>
    )
  }

  // 2. Redirect to Login if unauthenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // 3. Role-based redirect guard
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    if (role === 'student') {
      return <Navigate to="/student/dashboard" replace />
    }
    if (role === 'admin') {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Navigate to="/" replace />
  }

  return children
}

/**
 * PublicOnlyRoute: Prevents logged in users from visiting /login or /register
 */
export function PublicOnlyRoute({ children }) {
  const { isAuthenticated, isLoading, role } = useSelector((state) => state.auth)

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    const target = role === 'admin' ? '/admin/dashboard' : '/student/dashboard'
    return <Navigate to={target} replace />
  }

  return children
}

