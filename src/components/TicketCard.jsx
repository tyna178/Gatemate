import { Link } from 'react-router-dom'
import { MapPin, Calendar, Clock, QrCode, CheckCircle2 } from 'lucide-react'
import { formatDate, formatTime, formatPrice } from '../utils/formatDate'

export default function TicketCard({ ticket }) {
  const isUsed = ticket.status === 'used'

  return (
    <div className={`glass-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 ${isUsed ? 'opacity-60' : ''}`}>
      {/* Event Image */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={ticket.eventImage}
          alt={ticket.eventTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          {isUsed ? (
            <span className="badge badge-success flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Sudah Digunakan
            </span>
          ) : (
            <span className="badge badge-info">Aktif</span>
          )}
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white/70 bg-black/40 px-2 py-1 rounded-lg">{ticket.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-sm leading-tight mb-3 line-clamp-2">
          {ticket.eventTitle}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatDate(ticket.eventDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatTime(ticket.eventTime)}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{ticket.eventLocation}</span>
          </div>
        </div>

        {/* Ticket Code */}
        <div className="glass-card p-3 flex items-center justify-between mb-3">
          <div>
            <p className="text-white/40 text-xs">Kode Tiket</p>
            <p className="text-white font-mono font-semibold text-sm">{ticket.ticketCode}</p>
          </div>
          <QrCode className="w-8 h-8 text-indigo-400" />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-indigo-400 font-bold text-sm">{formatPrice(ticket.price)}</span>
          <Link
            to={`/user/tickets/${ticket.id}`}
            className="text-xs text-white/60 hover:text-white transition-colors"
          >
            Lihat Detail →
          </Link>
        </div>
      </div>
    </div>
  )
}
