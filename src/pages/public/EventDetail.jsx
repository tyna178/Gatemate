import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, Users, ArrowLeft, Tag, Building2, Share2, Heart, Ticket, Check } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { formatDate, formatPrice, soldPercentage, remainingTickets } from '../../utils/formatDate'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = dummyEvents.find(e => e.id === parseInt(id))

  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="w-24 h-24 bg-white border border-[#e3beb8]/20 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
          <Ticket className="w-10 h-10 text-[#b22110]/30" />
        </div>
        <h2 className="text-2xl font-bold text-[#271815] mb-2">Event Tidak Ditemukan</h2>
        <p className="text-[#5f5e5e] mb-6">Event yang Anda cari tidak tersedia.</p>
        <Link
          to="/events"
          className="rounded-full px-6 py-2.5 bg-[#b22110] text-white text-sm font-semibold hover:opacity-90 active:scale-95 transition-all duration-200"
        >
          Kembali ke Events
        </Link>
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

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#fff8f6] min-h-screen text-[#271815] py-8 px-4 md:px-8 pb-24 md:pb-12">
      <div className="max-w-[1280px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#5f5e5e] hover:text-[#b22110] transition-colors font-semibold text-sm mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            <div className="relative h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-[#e3beb8]/20 bg-white">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#b22110] text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  {event.category}
                </span>
                {event.featured && (
                  <span className="bg-amber-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <Tag className="w-3.5 h-3.5" /> Featured
                  </span>
                )}
              </div>

              <div className="absolute top-4 right-4 flex gap-2 items-center">
                {/* Like Button */}
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2.5 rounded-full transition-all duration-200 border shadow-sm ${
                    isLiked
                      ? 'bg-white border-white text-red-500 scale-105'
                      : 'bg-white/80 hover:bg-white border-white/40 text-[#5f5e5e] hover:text-[#b22110]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                
                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white/80 hover:bg-white border border-white/40 text-[#5f5e5e] hover:text-[#b22110] transition-all shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  {copied && (
                    <div className="absolute right-0 top-12 bg-[#271815] text-white text-xs px-2.5 py-1 rounded shadow-md whitespace-nowrap z-20">
                      Tautan disalin!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-[#271815] mb-6 leading-tight">
                {event.title}
              </h1>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Calendar, title: 'Tanggal', text: formatDate(event.date) },
                  { icon: Clock, title: 'Waktu', text: `${event.time} – ${event.endTime} WIB` },
                  { icon: MapPin, title: 'Tempat & Lokasi', text: `${event.location}, ${event.city}` },
                  { icon: Users, title: 'Kapasitas', text: `${event.soldTickets.toLocaleString('id-ID')} / ${event.maxAttendees.toLocaleString('id-ID')} Peserta Terdaftar` },
                ].map((item) => (
                  <div key={item.text} className="bg-white border border-[#e3beb8]/20 rounded-[14px] p-4 flex items-center gap-4 shadow-sm transition-all hover:translate-y-[-2px]">
                    <div className="w-10 h-10 rounded-full bg-[#fff8f6] flex items-center justify-center text-[#b22110] flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#5f5e5e] uppercase tracking-wider mb-0.5">{item.title}</p>
                      <span className="text-[#271815] text-sm font-semibold">{item.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white border border-[#e3beb8]/20 rounded-[14px] p-6 md:p-8 shadow-sm">
              <h2 className="text-lg font-bold text-[#271815] mb-4 pb-2 border-b border-[#e3beb8]/10">
                Tentang Event
              </h2>
              <p className="text-[#5f5e5e] leading-relaxed text-sm whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {event.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-[#F5F5F7] border border-[#e3beb8]/10 hover:border-[#b22110]/30 hover:bg-[#fff0ee] hover:text-[#b22110] text-[#5f5e5e] text-xs font-semibold rounded-full px-4 py-1.5 transition-colors cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Organizer */}
            <div className="bg-white border border-[#e3beb8]/20 rounded-[14px] p-6 shadow-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-14 h-14 rounded-full border border-[#EBEBEB] object-cover"
                />
                <div>
                  <p className="text-[#5f5e5e] text-xs font-semibold mb-1">Diselenggarakan oleh</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#b22110]" />
                    <span className="text-[#271815] font-bold text-base">{event.organizer.name}</span>
                  </div>
                </div>
              </div>
              <button className="text-xs font-bold text-[#b22110] border border-[#b22110]/20 rounded-full px-4 py-2 hover:bg-[#fff0ee] transition-all">
                Hubungi Penyelenggara
              </button>
            </div>
          </div>

          {/* Right Column — Ticket Box */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e3beb8]/20 rounded-[14px] p-6 shadow-md sticky top-24">
              <p className="text-[#5f5e5e] text-xs uppercase tracking-wider font-semibold mb-1">Harga Tiket</p>
              <div className="text-3xl font-extrabold text-[#b22110] mb-6">{formatPrice(event.price)}</div>

              {/* Availability */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-[#5f5e5e] mb-2 font-medium">
                  <span>Ketersediaan Tiket</span>
                  <span className={percentage >= 80 ? 'text-[#b22110] font-bold' : 'text-emerald-600 font-bold'}>
                    {remaining.toLocaleString('id-ID')} tersisa
                  </span>
                </div>
                <div className="h-2.5 bg-[#F5F5F7] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      percentage >= 80 ? 'bg-[#b22110]' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <p className="text-[#5f5e5e] text-[11px] mt-1.5">{percentage}% tiket telah terpesan</p>
              </div>

              <button
                onClick={handleBuyTicket}
                disabled={remaining === 0}
                className="w-full bg-[#b22110] text-white py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mb-3 shadow-sm shadow-[#b22110]/10"
              >
                <Ticket className="w-4 h-4" />
                {remaining === 0 ? 'Tiket Habis' : 'Beli Tiket Sekarang'}
              </button>

              {!user && (
                <p className="text-[#5f5e5e] text-xs text-center">
                  Anda perlu <Link to="/login" className="text-[#b22110] font-semibold hover:underline">masuk</Link> untuk membeli tiket.
                </p>
              )}

              <div className="mt-6 space-y-3 border-t border-[#EBEBEB] pt-4">
                {[
                  'Tiket digital langsung via QR Code',
                  'Refund sesuai syarat & ketentuan penyelenggara',
                  'Layanan CS bantuan pelanggan 24/7',
                ].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-[#5f5e5e] text-xs leading-normal">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
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
