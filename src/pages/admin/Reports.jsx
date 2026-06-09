import { BarChart3, TrendingUp, Users, Ticket, DollarSign, Download } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { dummyUsers } from '../../data/dummyUsers'
import { formatPrice, formatDate } from '../../utils/formatDate'

export default function Reports() {
  const totalRevenue = dummyEvents.reduce((sum, e) => sum + (e.price * e.soldTickets), 0)
  const totalTickets = dummyEvents.reduce((sum, e) => sum + e.soldTickets, 0)
  const avgTicketPrice = totalRevenue / (totalTickets || 1)

  const topEvents = [...dummyEvents]
    .sort((a, b) => (b.price * b.soldTickets) - (a.price * a.soldTickets))
    .slice(0, 5)

  const reportCards = [
    { label: 'Total Pendapatan', value: formatPrice(totalRevenue), icon: DollarSign, color: 'from-indigo-600 to-purple-600', sub: 'Semua transaksi' },
    { label: 'Total Tiket Terjual', value: totalTickets.toLocaleString('id-ID'), icon: Ticket, color: 'from-emerald-600 to-teal-600', sub: 'Seluruh event' },
    { label: 'Rata-rata Harga Tiket', value: formatPrice(Math.round(avgTicketPrice)), icon: TrendingUp, color: 'from-amber-600 to-orange-600', sub: 'Per tiket' },
    { label: 'Total Pengguna', value: dummyUsers.length, icon: Users, color: 'from-sky-600 to-blue-600', sub: 'Semua role' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" />
            Laporan Platform
          </h1>
          <p className="text-white/50 text-sm mt-1">Ringkasan performa dan statistik GateMate</p>
        </div>
        <button className="btn-secondary flex items-center gap-2 text-sm">
          <Download className="w-4 h-4" />
          Export Laporan
        </button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map(card => (
          <div key={card.label} className="stat-card">
            <div className={`w-10 h-10 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>
              <card.icon className="w-5 h-5 text-white" />
            </div>
            <div className="text-2xl font-black text-white leading-tight">{card.value}</div>
            <div className="text-white/70 text-sm font-medium mt-0.5">{card.label}</div>
            <div className="text-white/30 text-xs mt-0.5">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Simulated Bar Chart */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="font-bold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-400" />
          Penjualan per Kategori
        </h2>
        <div className="space-y-4">
          {[
            { label: 'Konser', value: 85, revenue: formatPrice(28750000) },
            { label: 'Teknologi', value: 62, revenue: formatPrice(12450000) },
            { label: 'Festival', value: 45, revenue: formatPrice(5300000) },
            { label: 'Bisnis', value: 38, revenue: formatPrice(4650000) },
            { label: 'Olahraga', value: 28, revenue: formatPrice(3200000) },
          ].map(item => (
            <div key={item.label} className="grid grid-cols-[80px_1fr_100px] items-center gap-4">
              <span className="text-white/60 text-sm text-right">{item.label}</span>
              <div className="h-6 bg-white/5 rounded-lg overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg transition-all duration-700 flex items-center justify-end pr-2"
                  style={{ width: `${item.value}%` }}
                >
                  <span className="text-white text-xs font-bold">{item.value}%</span>
                </div>
              </div>
              <span className="text-indigo-400 font-medium text-xs">{item.revenue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Events by Revenue */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="font-bold text-white mb-5">Top Event berdasarkan Pendapatan</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider pb-3 px-2">#</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider pb-3 px-2">Event</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider pb-3 px-2">Tiket</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider pb-3 px-2">Harga</th>
                <th className="text-left text-white/40 text-xs font-medium uppercase tracking-wider pb-3 px-2">Pendapatan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {topEvents.map((event, i) => (
                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-2 text-white/30 text-sm font-bold">#{i + 1}</td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2">
                      <img src={event.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                      <div>
                        <p className="text-white text-sm font-medium line-clamp-1">{event.title}</p>
                        <p className="text-white/30 text-xs">{event.city}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-white/60 text-sm">{event.soldTickets.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-2 text-white/60 text-sm">{formatPrice(event.price)}</td>
                  <td className="py-3 px-2">
                    <span className="text-indigo-400 font-bold text-sm">
                      {formatPrice(event.price * event.soldTickets)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
