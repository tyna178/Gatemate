import { useState } from 'react'
import { Ticket } from 'lucide-react'
import TicketCard from '../../components/TicketCard'
import { dummyTickets } from '../../data/dummyTickets'

export default function MyTickets() {
  const [filter, setFilter] = useState('all')
  const filtered = dummyTickets.filter(t => filter === 'all' || t.status === filter)

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <Ticket className="w-6 h-6 text-indigo-400" />
          Tiket Saya
        </h1>
        <p className="text-white/50 text-sm mt-1">Kelola semua tiket eventmu di sini</p>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {[
          { value: 'all', label: `Semua (${dummyTickets.length})` },
          { value: 'active', label: `Aktif (${dummyTickets.filter(t => t.status === 'active').length})` },
          { value: 'used', label: `Digunakan (${dummyTickets.filter(t => t.status === 'used').length})` },
        ].map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f.value
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                : 'glass-card text-white/50 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(ticket => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ticket className="w-8 h-8 text-white/30" />
          </div>
          <h3 className="text-white font-bold mb-2">Belum ada tiket</h3>
          <p className="text-white/40 text-sm">Cari event seru dan beli tiketmu!</p>
        </div>
      )}
    </div>
  )
}
