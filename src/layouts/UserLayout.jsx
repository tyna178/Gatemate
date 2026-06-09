import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { LayoutDashboard, Ticket, QrCode, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'

const navItems = [
  { path: '/user/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/user/tickets', icon: Ticket, label: 'Tiket Saya' },
]

export default function UserLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'user') return <Navigate to={`/${user.role}/dashboard`} replace />

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0e17 0%, #1a1040 50%, #0f0e17 100%)' }}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative z-50 h-full transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <Sidebar navItems={navItems} title="User Panel" onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar Mobile */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-black/20 backdrop-blur-xl">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-white/70 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-bold gradient-text">GateMate</span>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
