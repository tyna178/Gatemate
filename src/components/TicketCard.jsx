import { Link } from 'react-router-dom'
import { MapPin, QrCode } from 'lucide-react'
import { formatDate, formatTime, formatPrice } from '../utils/formatDate'

export default function TicketCard({ ticket }) {
  const isUsed = ticket.status === 'used'

  return (
    <div className={`bg-white rounded-xl flex flex-col shadow-sm border border-[#EBEBEB] hover:shadow-md transition-all p-3 gap-3 ${isUsed ? 'opacity-60 grayscale-[0.3]' : ''}`}>
      <div className="flex justify-between items-center text-[10px] font-bold text-[#5f5e5e]">
        <span>{formatDate(ticket.eventDate)}</span>
        <span className="text-[#b22110]">{ticket.eventTime ? formatTime(ticket.eventTime) : '20:00'} WIB</span>
      </div>
      
      <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
        <img
          alt={ticket.eventTitle}
          className="w-full h-full object-cover"
          src={ticket.eventImage}
        />
      </div>
      
      <h2 className="text-sm font-bold text-[#271815] line-clamp-1">{ticket.eventTitle}</h2>
      
      <div className="flex items-center gap-2 text-[#5f5e5e] text-[10px]">
        <MapPin className="w-3.5 h-3.5 text-[#b22110]" />
        <span className="truncate">{ticket.eventLocation}</span>
      </div>
      
      <div className="flex flex-col gap-1.5 pt-2 border-t border-dashed border-[#EBEBEB]">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-[#5f5e5e]">Order ID</span>
          <span className="font-mono text-[#271815] font-semibold">{ticket.id}</span>
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold">
          <span className="text-[#5f5e5e]">Total</span>
          <span className="text-[#271815] font-extrabold">{formatPrice(ticket.price)}</span>
        </div>
      </div>
      
      <Link
        to={`/user/tickets/${ticket.id}`}
        className="w-full py-2 bg-[#b22110] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.98] transition-all"
      >
        <QrCode className="w-4 h-4 text-white" />
        Lihat E-Ticket
      </Link>
    </div>
  )
}
