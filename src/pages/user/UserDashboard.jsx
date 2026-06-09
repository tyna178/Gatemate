import { Link } from 'react-router-dom'
import { Ticket, CalendarDays, CheckCircle2, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { dummyTickets } from '../../data/dummyTickets'
import { formatDate, formatPrice } from '../../utils/formatDate'

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const activeTickets = dummyTickets.filter(t => t.status === 'active')
  const usedTickets = dummyTickets.filter(t => t.status === 'used')
  const recentTickets = dummyTickets.slice(0, 3)

  const stats = [
    { label: 'Total Tiket', value: dummyTickets.length, icon: Ticket, color: 'from-indigo-600 to-purple-600', iconBg: 'shadow-indigo-500/20' },
    { label: 'Tiket Aktif', value: activeTickets.length, icon: CalendarDays, color: 'from-emerald-600 to-teal-600', iconBg: 'shadow-emerald-500/20' },
    { label: 'Sudah Digunakan', value: usedTickets.length, icon: CheckCircle2, color: 'from-sky-600 to-blue-600', iconBg: 'shadow-sky-500/20' },
    { label: 'Event Mendatang', value: activeTickets.length, icon: Clock, color: 'from-amber-600 to-orange-600', iconBg: 'shadow-amber-500/20' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">
            Halo, <span className="gradient-text">{user.name?.split(' ')[0]}! 👋</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Selamat datang kembali di GateMate</p>
        </div>
        <Link to="/events" className="btn-primary flex items-center gap-2 text-sm">
          Cari Event
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg ${stat.iconBg}`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-black text-white">{stat.value}</div>
            <div className="text-white/50 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active Upcoming Ticket Banner */}
      {activeTickets[0] && (
        <div className="glass-card p-6 rounded-2xl relative overflow-hidden border border-indigo-500/20">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <img src={activeTickets[0].eventImage} alt="" className="w-16 h-16 rounded-xl object-cover ring-2 ring-indigo-500/30 flex-shrink-0" />
              <div>
                <p className="text-indigo-400 text-xs font-medium uppercase tracking-wider mb-0.5">Event Terdekat</p>
                <h3 className="text-white font-bold">{activeTickets[0].eventTitle}</h3>
                <div className="flex items-center gap-2 text-white/50 text-xs mt-1">
                  <CalendarDays className="w-3 h-3" />
                  {formatDate(activeTickets[0].eventDate)}
                </div>
              </div>
            </div>
            <Link to={`/user/tickets/${activeTickets[0].id}`} className="btn-primary text-sm flex items-center gap-2 whitespace-nowrap">
              Lihat Tiket
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Recent Tickets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            Tiket Terbaru
          </h2>
          <Link to="/user/tickets" className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <div key={ticket.id} className="glass-card p-4 flex items-center gap-4 hover:bg-white/5 transition-all">
              <img src={ticket.eventImage} alt="" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{ticket.eventTitle}</p>
                <p className="text-white/40 text-xs mt-0.5">{formatDate(ticket.eventDate)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-indigo-400 font-bold text-sm">{formatPrice(ticket.price)}</p>
                <span className={`text-xs ${ticket.status === 'active' ? 'text-emerald-400' : 'text-white/40'}`}>
                  {ticket.status === 'active' ? '● Aktif' : '● Digunakan'}
                </span>
              </div>
              <Link to={`/user/tickets/${ticket.id}`} className="text-white/30 hover:text-indigo-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
