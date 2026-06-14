import { Link } from 'react-router-dom'
import { Ticket, CalendarDays, CheckCircle2, Clock, ArrowRight, TrendingUp } from 'lucide-react'
import { dummyTickets } from '../../data/dummyTickets'
import { formatDate, formatPrice } from '../../utils/formatDate'
import WalletCard from '../../components/WalletCard'
import DashboardHeader from '../../components/DashboardHeader'
import RecentActivity from '../../components/RecentActivity'
import QuickActions from '../../components/QuickActions'

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const activeTickets = dummyTickets.filter(t => t.status === 'active')
  const usedTickets = dummyTickets.filter(t => t.status === 'used')
  const recentTickets = dummyTickets.slice(0, 3)

  const stats = [
    { label: 'Total tiket', value: dummyTickets.length, icon: Ticket },
    { label: 'Tiket aktif', value: activeTickets.length, icon: CalendarDays },
    { label: 'Sudah digunakan', value: usedTickets.length, icon: CheckCircle2 },
    { label: 'Event mendatang', value: activeTickets.length, icon: Clock },
  ]

  return (
    <div className="min-h-screen bg-[#fff8f6]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fade-in">

        {/* Greeting */}
        <DashboardHeader user={user} notifCount={2} />

        {/* Wallet + Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Wallet Card */}
          <div className="md:col-span-1">
            <WalletCard
              balance={250000}
              onTopup={() => console.log('Topup triggered')}
            />
          </div>

          {/* Stats */}
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-[14px] p-3 flex items-center gap-3"
                style={{ border: '0.5px solid #EBEBEB' }}
              >
                <div className="w-9 h-9 rounded-full bg-[#fff8f6] flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-4 h-4 text-[#b22110]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#271815] leading-none">{stat.value}</p>
                  <p className="text-xs text-[#5f5e5e] mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming ticket banner */}
        {activeTickets[0] && (
          <div
            className="bg-white rounded-[14px] p-4"
            style={{ border: '0.5px solid #EBEBEB' }}
          >
            <p className="text-xs font-medium text-[#b22110] mb-3">Event terdekat</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={activeTickets[0].eventImage}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                  style={{ border: '0.5px solid #EBEBEB' }}
                />
                <div>
                  <h3 className="text-[#271815] font-semibold text-sm">
                    {activeTickets[0].eventTitle}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[#5f5e5e] text-xs mt-1">
                    <CalendarDays className="w-3 h-3" />
                    {formatDate(activeTickets[0].eventDate)}
                  </div>
                </div>
              </div>
              <Link
                to={`/user/tickets/${activeTickets[0].id}`}
                className="flex items-center gap-2 text-sm font-medium rounded-full px-4 py-2 bg-[#b22110] text-white hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Lihat tiket
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* Bottom row: recent activity + quick actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

      </div>
    </div>
  )
}
