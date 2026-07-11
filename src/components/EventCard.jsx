import { Link } from 'react-router-dom'
import { MapPin, Calendar, Heart } from 'lucide-react'
import { useState } from 'react'
import { formatDate, formatPrice, remainingTickets } from '../utils/formatDate'

export default function EventCard({ event }) {
  const [isLiked, setIsLiked] = useState(false)
  const remaining = remainingTickets(event.maxAttendees, event.soldTickets)

  return (
    <div className="bg-white border border-[#EBEBEB] rounded-[14px] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col group h-full relative">
      {/* Clickable Image wrapper */}
      <Link to={`/events/${event.id}`} className="relative h-48 overflow-hidden block">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-[#fff0ee] text-[#b22110] border border-[#e3beb8]/30 px-3 py-1 rounded-[10px] text-[10px] font-bold uppercase tracking-wider">
            {event.category}
          </span>
        </div>
      </Link>

      {/* Floating Heart Icon (outside the link, so it doesn't trigger navigation) */}
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsLiked(!isLiked)
          }}
          className={`p-2 rounded-full border shadow-sm transition-all duration-200 ${
            isLiked
              ? 'bg-white border-white text-red-500 scale-105'
              : 'bg-white/80 hover:bg-white border-white/40 text-[#5f5e5e] hover:text-[#b22110]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <Link to={`/events/${event.id}`} className="block group-hover:opacity-95">
          {/* Info row */}
          <div className="flex items-center gap-4 text-[#5f5e5e] text-xs font-semibold mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#b22110]" />
              {formatDate(event.date)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#b22110]" />
              {event.city}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-[#271815] text-base leading-tight mb-4 line-clamp-2 transition-colors hover:text-[#b22110]">
            {event.title}
          </h3>
        </Link>

        {/* Price and Ticket Info */}
        <div className="flex items-end justify-between pt-2 border-t border-[#EBEBEB] mt-auto">
          <div>
            <p className="text-[#5f5e5e] text-[11px] font-semibold mb-0.5">Mulai dari</p>
            <span className="text-base font-extrabold text-[#b22110]">
              {event.price === 0 ? 'Gratis' : formatPrice(event.price)}
            </span>
          </div>
          {remaining > 0 ? (
            <span className="bg-[#fff0ee] text-[#b22110] border border-[#e3beb8]/20 px-2.5 py-1 rounded-[10px] text-[10px] font-bold">
              Sisa {remaining.toLocaleString('id-ID')} Tiket
            </span>
          ) : (
            <span className="bg-[#e5e2e1] text-[#5f5e5e] px-2.5 py-1 rounded-[10px] text-[10px] font-bold">
              SOLDOUT
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
