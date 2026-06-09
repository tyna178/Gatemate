import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Calendar, Clock, QrCode, Download, Share2, CheckCircle2 } from 'lucide-react'
import { dummyTickets } from '../../data/dummyTickets'
import { formatDate, formatTime, formatPrice } from '../../utils/formatDate'

export default function TicketDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const ticket = dummyTickets.find(t => t.id === id)

  if (!ticket) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50">Tiket tidak ditemukan</p>
        <button onClick={() => navigate('/user/tickets')} className="btn-primary mt-4">Kembali</button>
      </div>
    )
  }

  const isUsed = ticket.status === 'used'

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali
      </button>

      <h1 className="text-2xl font-black text-white">Detail Tiket</h1>

      {/* Ticket Card */}
      <div className={`glass-card rounded-2xl overflow-hidden ${isUsed ? 'opacity-70' : ''}`}>
        {/* Event Image */}
        <div className="relative h-48">
          <img src={ticket.eventImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <span className={`badge ${isUsed ? 'badge-success' : 'badge-info'} flex items-center gap-1`}>
              {isUsed ? <><CheckCircle2 className="w-3 h-3" /> Sudah Digunakan</> : '● Aktif'}
            </span>
          </div>
        </div>

        {/* Ticket Info */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">{ticket.eventTitle}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Calendar, text: formatDate(ticket.eventDate), color: 'text-indigo-400' },
              { icon: Clock, text: formatTime(ticket.eventTime), color: 'text-purple-400' },
              { icon: MapPin, text: ticket.eventLocation, color: 'text-emerald-400' },
            ].map(item => (
              <div key={item.text} className="glass-card p-3 flex items-center gap-2">
                <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                <span className="text-white/70 text-xs">{item.text}</span>
              </div>
            ))}
          </div>

          {/* Divider dashed */}
          <div className="border-t border-dashed border-white/20 relative">
            <div className="absolute -left-6 -top-3 w-6 h-6 bg-black/20 rounded-full" />
            <div className="absolute -right-6 -top-3 w-6 h-6 bg-black/20 rounded-full" />
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center py-4">
            <img
              src={ticket.qrCode}
              alt="QR Code"
              className={`w-40 h-40 rounded-2xl border-4 border-white/20 ${isUsed ? 'grayscale' : ''}`}
            />
            <p className="font-mono font-bold text-white mt-3 text-lg tracking-widest">{ticket.ticketCode}</p>
            <p className="text-white/40 text-xs mt-1">Tunjukkan QR ini saat check-in</p>
          </div>

          {/* Details */}
          <div className="space-y-3 border-t border-white/10 pt-4">
            {[
              { label: 'Kategori Tiket', value: ticket.category },
              { label: 'Nama Peserta', value: ticket.attendeeName },
              { label: 'Email', value: ticket.attendeeEmail },
              ticket.seatNumber && { label: 'Nomor Kursi', value: ticket.seatNumber },
              { label: 'Harga', value: formatPrice(ticket.price) },
              isUsed && { label: 'Check-In Pada', value: new Date(ticket.checkedInAt).toLocaleString('id-ID') },
            ].filter(Boolean).map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-white/40">{item.label}</span>
                <span className="text-white font-medium">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Actions */}
          {!isUsed && (
            <div className="flex gap-3 pt-2">
              <button className="btn-secondary flex items-center gap-2 text-sm flex-1 justify-center">
                <Download className="w-4 h-4" /> Unduh
              </button>
              <button className="btn-secondary flex items-center gap-2 text-sm flex-1 justify-center">
                <Share2 className="w-4 h-4" /> Bagikan
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
