import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { StudentSidebar } from './StudentSidebar'
import { DashboardHeader } from './DashboardHeader'

export function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-canvas text-txt-main">
      {/* Sidebar */}
      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <DashboardHeader
          onMenuClick={() => setSidebarOpen(true)}
          userRole="student"
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
