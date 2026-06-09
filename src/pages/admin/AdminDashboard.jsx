import { Users, Building2, CalendarDays, Ticket, TrendingUp, ArrowUp, Activity } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { dummyUsers } from '../../data/dummyUsers'
import { dummyTickets } from '../../data/dummyTickets'
import { formatPrice } from '../../utils/formatDate'

export default function AdminDashboard() {
  const totalUsers = dummyUsers.filter(u => u.role === 'user').length
  const totalOrganizers = dummyUsers.filter(u => u.role === 'organizer').length
  const totalEvents = dummyEvents.length
  const totalRevenue = dummyEvents.reduce((sum, e) => sum + (e.price * e.soldTickets), 0)

  const stats = [
    { label: 'Total Pengguna', value: totalUsers, icon: Users, color: 'from-indigo-600 to-indigo-700', change: '+12%', up: true },
    { label: 'Total Organizer', value: totalOrganizers, icon: Building2, color: 'from-purple-600 to-purple-700', change: '+5%', up: true },
    { label: 'Total Event', value: totalEvents, icon: CalendarDays, color: 'from-emerald-600 to-emerald-700', change: '+8%', up: true },
    { label: 'Total Pendapatan', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'from-amber-600 to-amber-700', change: '+23%', up: true, small: true },
  ]

  const recentEvents = dummyEvents.slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white">Admin <span className="gradient-text">Dashboard</span></h1>
        <p className="text-white/50 text-sm mt-1">Pantau statistik dan aktivitas platform GateMate</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(stat => (
          <div key={stat.label} className="stat-card">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                <ArrowUp className={`w-3 h-3 ${stat.up ? '' : 'rotate-180'}`} />
                {stat.change}
              </span>
            </div>
            <div className={`font-black text-white mb-0.5 ${stat.small ? 'text-xl' : 'text-3xl'}`}>{stat.value}</div>
            <div className="text-white/50 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <div className="lg:col-span-2 glass-card p-6 rounded-2xl">
          <h2 className="font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-400" />
            Event Terbaru
          </h2>
          <div className="space-y-3">
            {recentEvents.map(event => (
              <div key={event.id} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-all">
                <img src={event.image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{event.title}</p>
                  <p className="text-white/40 text-xs">{event.organizer.name} · {event.city}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-indigo-400 font-bold text-xs">{formatPrice(event.price)}</p>
                  <p className="text-white/30 text-xs">{event.soldTickets} tiket</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Breakdown */}
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="font-bold text-white mb-4">Distribusi User</h2>
          <div className="space-y-4">
            {[
              { label: 'Pengguna', count: totalUsers, total: dummyUsers.length, color: 'bg-indigo-500' },
              { label: 'Organizer', count: totalOrganizers, total: dummyUsers.length, color: 'bg-purple-500' },
              { label: 'Admin', count: 1, total: dummyUsers.length, color: 'bg-amber-500' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-white/70">{item.label}</span>
                  <span className="text-white font-medium">{item.count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${(item.count / item.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">Ringkasan Platform</h3>
            {[
              { label: 'Total Tiket Terjual', value: dummyEvents.reduce((s, e) => s + e.soldTickets, 0).toLocaleString('id-ID') },
              { label: 'Event Aktif', value: dummyEvents.length },
              { label: 'Organizer Aktif', value: totalOrganizers },
            ].map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-white/40">{item.label}</span>
                <span className="text-white font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
