import { Outlet } from 'react-router-dom'
import { PublicNavbar } from './PublicNavbar'
import { Footer } from './Footer'

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-canvas text-txt-main transition-colors duration-200">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
