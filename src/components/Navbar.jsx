import { Link, useNavigate } from 'react-router-dom'
import { Ticket, Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300">
              <Ticket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GateMate</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
              Beranda
            </Link>
            <Link to="/events" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
              Events
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="text-white/70 hover:text-white transition-colors text-sm font-medium">
                  Masuk
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">
                  Daftar
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <div className="w-px h-5 bg-white/20" />
                <div className="flex items-center gap-2">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full ring-2 ring-indigo-500/50" />
                  <span className="text-white/80 text-sm font-medium">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-white/50 hover:text-red-400 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-2 animate-fade-in">
            <Link to="/" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all" onClick={() => setIsOpen(false)}>
              Beranda
            </Link>
            <Link to="/events" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all" onClick={() => setIsOpen(false)}>
              Events
            </Link>
            {!user ? (
              <>
                <Link to="/login" className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all" onClick={() => setIsOpen(false)}>
                  Masuk
                </Link>
                <Link to="/register" className="block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all text-center" onClick={() => setIsOpen(false)}>
                  Daftar
                </Link>
              </>
            ) : (
              <>
                <Link to={getDashboardPath()} className="block px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all" onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                  Keluar
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
