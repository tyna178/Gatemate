import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, Users, ArrowLeft, Tag, Building2, Share2, Heart, Ticket } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { formatDate, formatPrice, soldPercentage, remainingTickets } from '../../utils/formatDate'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = dummyEvents.find(e => e.id === parseInt(id))

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="w-24 h-24 glass-card rounded-2xl flex items-center justify-center mb-6">
          <Ticket className="w-10 h-10 text-white/30" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Event Tidak Ditemukan</h2>
        <p className="text-white/50 mb-6">Event yang kamu cari tidak tersedia</p>
        <Link to="/events" className="btn-primary">Kembali ke Events</Link>
      </div>
    )
  }

  const percentage = soldPercentage(event.maxAttendees, event.soldTickets)
  const remaining = remainingTickets(event.maxAttendees, event.soldTickets)
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleBuyTicket = () => {
    if (!user) {
      navigate('/login')
    } else {
      alert(`Fitur pembelian tiket akan segera tersedia!\nEvent: ${event.title}\nHarga: ${formatPrice(event.price)}`)
    }
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-80 rounded-2xl overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="badge badge-info">{event.category}</span>
                {event.featured && (
                  <span className="badge bg-amber-500/30 text-amber-300 border border-amber-500/30">
                    <Tag className="w-3 h-3 mr-1" /> Featured
                  </span>
                )}
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 glass-card hover:bg-white/20 rounded-xl transition-all">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 glass-card hover:bg-white/20 rounded-xl transition-all">
                  <Share2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-black text-white mb-4 leading-tight">{event.title}</h1>

              {/* Meta Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Calendar, text: formatDate(event.date), color: 'text-indigo-400' },
                  { icon: Clock, text: `${event.time} – ${event.endTime} WIB`, color: 'text-purple-400' },
                  { icon: MapPin, text: `${event.location}, ${event.city}`, color: 'text-emerald-400' },
                  { icon: Users, text: `${event.soldTickets.toLocaleString('id-ID')} dari ${event.maxAttendees.toLocaleString('id-ID')} peserta`, color: 'text-amber-400' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 glass-card p-3 rounded-xl">
                    <item.icon className={`w-4 h-4 ${item.color} flex-shrink-0`} />
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="font-bold text-white mb-3">Tentang Event</h2>
              <p className="text-white/60 leading-relaxed text-sm">{event.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map(tag => (
                <span key={tag} className="badge badge-info">#{tag}</span>
              ))}
            </div>

            {/* Organizer */}
            <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
              <img src={event.organizer.avatar} alt={event.organizer.name} className="w-14 h-14 rounded-2xl ring-2 ring-indigo-500/30" />
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Diselenggarakan oleh</p>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-400" />
                  <span className="text-white font-bold">{event.organizer.name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Ticket Box */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl sticky top-6">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Harga Tiket</p>
              <div className="text-4xl font-black gradient-text mb-6">{formatPrice(event.price)}</div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-white/40 mb-2">
                  <span>Ketersediaan</span>
                  <span className={percentage >= 80 ? 'text-amber-400' : 'text-emerald-400'}>
                    {remaining.toLocaleString('id-ID')} tersisa
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${percentage >= 80 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <p className="text-white/30 text-xs mt-1">{percentage}% tiket sudah terjual</p>
              </div>

              <button
                onClick={handleBuyTicket}
                disabled={remaining === 0}
                className="btn-primary w-full justify-center flex items-center gap-2 mb-3"
              >
                <Ticket className="w-4 h-4" />
                {remaining === 0 ? 'Tiket Habis' : 'Beli Tiket Sekarang'}
              </button>

              {!user && (
                <p className="text-white/40 text-xs text-center">
                  Kamu perlu <Link to="/login" className="text-indigo-400 hover:underline">masuk</Link> untuk membeli tiket
                </p>
              )}

              <div className="mt-6 space-y-2 border-t border-white/10 pt-4">
                {[
                  'Tiket digital via QR Code',
                  'Refund sesuai kebijakan organizer',
                  'Dukungan pelanggan 24/7',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/40 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
