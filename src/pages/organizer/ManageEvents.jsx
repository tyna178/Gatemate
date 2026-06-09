import { Link } from 'react-router-dom'
import { PlusCircle, Edit, Trash2, Eye } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { formatDate, formatPrice, soldPercentage } from '../../utils/formatDate'

export default function ManageEvents() {
  const events = dummyEvents.slice(0, 4)

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Kelola Event</h1>
          <p className="text-white/50 text-sm mt-1">Lihat dan kelola semua event yang kamu buat</p>
        </div>
        <Link to="/organizer/events/create" className="btn-primary flex items-center gap-2 text-sm">
          <PlusCircle className="w-4 h-4" /> Buat Event Baru
        </Link>
      </div>

      <div className="space-y-4">
        {events.map(event => {
          const pct = soldPercentage(event.maxAttendees, event.soldTickets)
          return (
            <div key={event.id} className="glass-card p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-center">
              <img src={event.image} alt="" className="w-20 h-20 rounded-2xl object-cover" />
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-white font-bold">{event.title}</h3>
                  <span className="badge badge-info text-xs">{event.category}</span>
                </div>
                <p className="text-white/40 text-xs mb-2">{formatDate(event.date)} · {event.location}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-indigo-400 font-bold text-sm">{formatPrice(event.price)}</span>
                  <span className="text-white/40 text-xs">{event.soldTickets}/{event.maxAttendees} tiket</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-white/30 text-xs">{pct}%</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to={`/events/${event.id}`} className="p-2.5 glass-card hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-white">
                  <Eye className="w-4 h-4" />
                </Link>
                <button className="p-2.5 glass-card hover:bg-white/10 rounded-xl transition-all text-white/60 hover:text-indigo-400">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2.5 glass-card hover:bg-red-500/10 rounded-xl transition-all text-white/60 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
