import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Ticket, Menu, X, LogOut, LayoutDashboard,
  Globe, Share2
} from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const getDashboardPath = () => {
    if (!user) return '/login'
    if (user.role === 'admin') return '/admin/dashboard'
    if (user.role === 'organizer') return '/organizer/dashboard'
    return '/user/dashboard'
  }

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md"
      style={{ borderBottom: '0.5px solid #e3beb8' }}
    >
      <div className="flex justify-between items-center px-6 py-3 max-w-[1280px] mx-auto">
        {/* Left: Brand + Nav Links */}
        <div className="flex items-center gap-5">
          <Link to="/" className="text-xl font-bold text-[#b22110]">
            GateMate
          </Link>
          <div className="hidden md:flex gap-6 ml-4">
            <Link
              to="/events"
              className="text-sm font-bold text-[#b22110] border-b-2 border-[#b22110] pb-1"
            >
              Jelajahi
            </Link>
            <Link
              to="/"
              className="text-sm text-[#5f5e5e] hover:text-[#b22110] transition-colors"
            >
              Partners
            </Link>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link
                to="/login"
                className="hidden md:block text-sm text-[#5f5e5e] hover:text-[#271815] transition-colors font-medium"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="rounded-full px-6 py-2 bg-[#b22110] text-white text-sm hover:opacity-90 active:scale-95 transition-all duration-200"
              >
                Daftar
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to={getDashboardPath()}
                className="hidden md:flex items-center gap-2 text-sm text-[#5f5e5e] hover:text-[#271815] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
                style={{ border: '0.5px solid #EBEBEB' }}
              />
              <button
                onClick={handleLogout}
                className="text-[#5f5e5e] hover:text-[#b22110] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-[#5f5e5e]"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden py-3 px-6 space-y-1 bg-white"
          style={{ borderTop: '0.5px solid #EBEBEB' }}
        >
          <Link to="/events" className="block px-3 py-2.5 text-sm font-medium text-[#b22110] hover:bg-[#fff8f6] rounded-xl" onClick={() => setIsOpen(false)}>Jelajahi</Link>
          <Link to="/" className="block px-3 py-2.5 text-sm text-[#5f5e5e] hover:bg-[#f9f9f9] rounded-xl" onClick={() => setIsOpen(false)}>Partners</Link>
          {!user ? (
            <>
              <Link to="/login" className="block px-3 py-2.5 text-sm text-[#5f5e5e] hover:bg-[#f9f9f9] rounded-xl" onClick={() => setIsOpen(false)}>Masuk</Link>
              <Link to="/register" className="block px-3 py-2.5 text-sm text-center font-medium rounded-full bg-[#b22110] text-white hover:opacity-90" onClick={() => setIsOpen(false)}>Daftar</Link>
            </>
          ) : (
            <>
              <Link to={getDashboardPath()} className="block px-3 py-2.5 text-sm text-[#5f5e5e] hover:bg-[#f9f9f9] rounded-xl" onClick={() => setIsOpen(false)}>Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2.5 text-sm text-[#b22110] hover:bg-[#fff8f6] rounded-xl">Keluar</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
