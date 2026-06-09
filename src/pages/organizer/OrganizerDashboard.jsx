import { Link } from 'react-router-dom'
import { CalendarDays, Users, TrendingUp, PlusCircle, ArrowRight, CheckCircle2, Clock } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { formatDate, formatPrice, soldPercentage } from '../../utils/formatDate'

export default function OrganizerDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const myEvents = dummyEvents.slice(0, 3)
  const totalTicketsSold = myEvents.reduce((sum, e) => sum + e.soldTickets, 0)
  const totalRevenue = myEvents.reduce((sum, e) => sum + (e.price * e.soldTickets), 0)

  const stats = [
    { label: 'Total Event', value: myEvents.length, icon: CalendarDays, color: 'from-indigo-600 to-purple-600' },
    { label: 'Tiket Terjual', value: totalTicketsSold.toLocaleString('id-ID'), icon: Users, color: 'from-emerald-600 to-teal-600' },
    { label: 'Total Pendapatan', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'from-amber-600 to-orange-600', small: true },
    { label: 'Check-In Hari Ini', value: '0', icon: CheckCircle2, color: 'from-sky-600 to-blue-600' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">
            Dashboard <span className="gradient-text">Organizer</span>
          </h1>
          <p className="text-white/50 text-sm mt-1">Kelola event dan pantau perkembangan tiket</p>
        </div>
        <Link to="/organizer/events/create" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" />
          Buat Event
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className={`font-black text-white ${stat.small ? 'text-xl' : 'text-3xl'}`}>{stat.value}</div>
            <div className="text-white/50 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Events Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Event Saya</h2>
          <Link to="/organizer/events" className="text-white/50 hover:text-white text-sm flex items-center gap-1">
            Kelola Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {myEvents.map(event => {
            const pct = soldPercentage(event.maxAttendees, event.soldTickets)
            return (
              <div key={event.id} className="glass-card p-5 flex flex-col md:flex-row gap-4 items-start md:items-center hover:bg-white/5 transition-all">
                <img src={event.image} alt={event.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">{event.title}</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="flex items-center gap-1 text-white/40 text-xs">
                      <Clock className="w-3 h-3" />{formatDate(event.date)}
                    </span>
                    <span className="text-indigo-400 text-xs font-medium">{formatPrice(event.price)}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-white/40 text-xs whitespace-nowrap">{event.soldTickets}/{event.maxAttendees}</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link to={`/organizer/check-in`} className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Check-In
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
