import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, ArrowRight, Tag } from 'lucide-react'
import { formatDate, formatPrice, soldPercentage } from '../utils/formatDate'

export default function EventCard({ event }) {
  const percentage = soldPercentage(event.maxAttendees, event.soldTickets)
  const isAlmostFull = percentage >= 80
  const isFull = percentage >= 100

  return (
    <div className="glass-card-hover overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="badge badge-info text-xs">{event.category}</span>
        </div>

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white font-bold text-sm px-3 py-1 rounded-xl border border-white/10">
            {formatPrice(event.price)}
          </span>
        </div>

        {/* Featured Tag */}
        {event.featured && (
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1 badge bg-amber-500/30 text-amber-300 border border-amber-500/30">
              <Tag className="w-3 h-3" /> Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-white text-base leading-tight mb-3 line-clamp-2 group-hover:text-indigo-300 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Calendar className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
            <span>{formatDate(event.date)} · {event.time} WIB</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <MapPin className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="truncate">{event.location}, {event.city}</span>
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs">
            <Users className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span>{event.soldTickets.toLocaleString('id-ID')} / {event.maxAttendees.toLocaleString('id-ID')} tiket</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/40 mb-1.5">
            <span>Tiket Tersedia</span>
            <span className={isAlmostFull ? 'text-amber-400' : 'text-white/40'}>{percentage}% terjual</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isFull ? 'bg-red-500' :
                isAlmostFull ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                'bg-gradient-to-r from-indigo-500 to-purple-500'
              }`}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Organizer & CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={event.organizer.avatar} alt={event.organizer.name} className="w-6 h-6 rounded-full" />
            <span className="text-white/40 text-xs truncate max-w-[100px]">{event.organizer.name}</span>
          </div>
          <Link
            to={`/events/${event.id}`}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group/btn"
          >
            Detail
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
