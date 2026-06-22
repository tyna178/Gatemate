import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { MapPin, Calendar, Clock, Users, ArrowLeft, Tag, Building2, Share2, Heart, Ticket, Check, X, ChevronDown, Info } from 'lucide-react'
import { dummyEvents } from '../../data/dummyEvents'
import { formatDate, formatPrice, soldPercentage, remainingTickets } from '../../utils/formatDate'

export default function EventDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const event = dummyEvents.find(e => e.id === parseInt(id))

  const [isLiked, setIsLiked] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedTier, setSelectedTier] = useState(null)
  const [motivation, setMotivation] = useState('')
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

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

  const ticketTiers = [
    {
      id: 'vip',
      name: 'VIP Card',
      desc: 'Akses baris depan + Meet & Greet',
      price: event.price === 0 ? 0 : Math.round((event.price * 2.5) / 50000) * 50000,
      tag: 'TERBATAS',
      soldOut: false,
    },
    {
      id: 'regular',
      name: 'Regular Card',
      desc: 'Akses festival umum',
      price: event.price,
      tag: null,
      soldOut: remaining === 0,
    },
    {
      id: 'early_bird',
      name: 'Early Bird Card',
      desc: 'Akses festival umum (Harga Presale)',
      price: event.price === 0 ? 0 : Math.round((event.price * 0.6) / 10000) * 10000,
      tag: 'SOLDOUT',
      soldOut: true,
    }
  ]

  const handleBuyTicket = (tier) => {
    if (!user) {
      navigate('/login')
    } else {
      setSelectedTier(tier)
      setMotivation('')
      setSource('')
      setIsSuccess(false)
    }
  }



  const handleConfirmPayment = (e) => {
    e.preventDefault()
    if (!motivation || !source) return

    console.log("Pembelian tiket dikonfirmasi:", {
      event: event.title,
      tier: selectedTier.name,
      price: selectedTier.price,
      motivation,
      source
    })

    alert(`Pembayaran berhasil disimulasikan!\nTiket: ${selectedTier.name}\nTotal: ${selectedTier.price === 0 ? 'Gratis' : formatPrice(selectedTier.price)}`)

    setLoading(true)
    setTimeout(() => {
      const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`
      const newTicket = {
        id: ticketId,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventImage: event.image,
        ticketCode: `${event.title.substring(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
        qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticketId}`,
        category: selectedTier.name,
        price: selectedTier.price,
        status: 'active',
        purchasedAt: new Date().toISOString(),
        seatNumber: selectedTier.id === 'vip' ? `VIP-A-${Math.floor(1 + Math.random() * 50)}` : `REG-${Math.floor(100 + Math.random() * 500)}`,
        attendeeName: user.name || 'Pengguna',
        attendeeEmail: user.email,
      }

      // Persist to local storage
      const currentPurchased = JSON.parse(localStorage.getItem('purchased_tickets') || '[]')
      currentPurchased.push(newTicket)
      localStorage.setItem('purchased_tickets', JSON.stringify(currentPurchased))

      setLoading(false)
      setIsSuccess(true)
    }, 1000)
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
                  <div key={item.title} className="bg-white border border-[#e3beb8]/20 rounded-[14px] p-4 flex items-center gap-4 shadow-sm transition-all hover:translate-y-[-2px]">
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

            {/* Map Section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#271815]">Lokasi</h2>
              <div className="w-full h-64 bg-[#F5F5F7] border border-[#EBEBEB] rounded-[14px] overflow-hidden group relative cursor-pointer shadow-sm">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Peta Lokasi"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTpLoBD7bSlhLcc89k37gzncITVRHqH7XhzFNNAioxPiclrOnaVKOGOHVlJPwXKE_t7FNTCkT9j7iSI-nW82NB81pULsbt8A2nwJVc3Vv_xUFbfudNUYBki2b72ezWiFe7xSCJ4cXtHMDNV7U60D8myQPj7nWunO9gGLoZ3bXfNj8Fysz1poOORgPjWbLXIYCUpLGikyV3u_GeJNK2m95ukyDnERZ0CgZteKdV2w4TcXV9Wx6i30wZLunoqG4q-FO2usN4838mDz4"
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-[#EBEBEB] flex items-center gap-2 shadow-sm">
                  <MapPin className="w-4 h-4 text-[#b22110]" />
                  <span className="text-xs font-bold text-[#271815]">Buka di Maps</span>
                </div>
              </div>
              <p className="text-[#5f5e5e] text-sm">{event.location}, {event.city}.</p>
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
            <div className="sticky top-24 flex flex-col gap-4">
              <h2 className="text-lg font-bold text-[#271815] px-1">Pilih Tiket</h2>
              
              {ticketTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`bg-white border border-[#EBEBEB] rounded-[14px] p-4 flex flex-col gap-3 transition-all hover:border-[#b22110]/30 shadow-sm ${
                    tier.soldOut ? 'opacity-70 bg-[#F5F5F7]' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-[#271815]">{tier.name}</h3>
                      <p className="text-[11px] text-[#5f5e5e] mt-0.5">{tier.desc}</p>
                    </div>
                    {tier.tag && (
                      <span className={`px-2 py-0.5 rounded-[10px] text-[10px] font-bold ${
                        tier.tag === 'TERBATAS' ? 'bg-[#fff0ee] text-[#b22110]' : 'bg-[#e5e2e1] text-[#5f5e5e]'
                      }`}>
                        {tier.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-base font-bold text-[#271815]">
                      {tier.price === 0 ? 'Gratis' : formatPrice(tier.price)}
                    </span>
                    <button
                      onClick={() => handleBuyTicket(tier)}
                      disabled={tier.soldOut}
                      className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 active:scale-95 ${
                        tier.soldOut
                          ? 'bg-[#e5e2e1] text-[#5f5e5e] cursor-not-allowed'
                          : 'bg-[#b22110] text-white hover:opacity-90'
                      }`}
                    >
                      {tier.soldOut ? 'Habis Terjual' : 'Beli Tiket'}
                    </button>
                  </div>
                </div>
              ))}

              {/* Info Card */}
              <div className="mt-2 p-4 rounded-xl bg-[#ffe9e5] border border-[#e3beb8]/30 flex gap-3 shadow-sm">
                <Info className="w-5 h-5 text-[#b22110] flex-shrink-0" />
                <p className="text-[11px] text-[#5f5e5e] leading-relaxed">
                  Tiket bersifat digital dan akan langsung terbit di menu "My Tickets" setelah pembayaran diverifikasi secara otomatis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {selectedTier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Modal Overlay */}
          <div
            className="absolute inset-0 bg-[#fff8f6]/80 backdrop-blur-md transition-opacity"
            onClick={() => { if (!loading && !isSuccess) setSelectedTier(null) }}
          />

          {/* Modal Container */}
          <div className="relative bg-white border border-[#EBEBEB] rounded-[14px] shadow-2xl w-full max-w-[520px] overflow-hidden flex flex-col animate-slide-up z-10">
            {isSuccess ? (
              /* Success Content */
              <div className="p-8 text-center flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#271815]">Pembelian Berhasil!</h3>
                  <p className="text-sm text-[#5f5e5e] mt-2 leading-relaxed">
                    Tiket Anda telah diterbitkan secara otomatis. Anda dapat melihat dan mengelola tiket di halaman "Tiket Saya".
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
                  <button
                    onClick={() => {
                      setSelectedTier(null)
                      setIsSuccess(false)
                      navigate('/user/my-tickets')
                    }}
                    className="flex-1 bg-[#b22110] text-white font-bold py-3 rounded-full text-sm hover:opacity-90 active:scale-[0.98] transition-all"
                  >
                    Lihat Tiket Saya
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTier(null)
                      setIsSuccess(false)
                    }}
                    className="sm:w-32 border border-[#b22110] text-[#b22110] font-bold py-3 rounded-full text-sm hover:bg-[#fff0ee] active:scale-[0.98] transition-all"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form Content */
              <form onSubmit={handleConfirmPayment}>
                {/* Modal Header */}
                <div className="px-6 py-5 border-b border-[#EBEBEB] flex justify-between items-center bg-white">
                  <h2 className="text-[#271815] text-base font-bold">Konfirmasi Pembelian</h2>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setSelectedTier(null)}
                    className="text-[#5f5e5e] hover:text-[#b22110] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                  {/* Selected Ticket */}
                  <div className="bg-[#fff0ee] border border-[#e3beb8]/30 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <p className="text-[11px] font-semibold text-[#b22110] mb-1">Tiket Terpilih</p>
                      <h4 className="text-sm font-bold text-[#271815]">{selectedTier.name}</h4>
                    </div>
                    <p className="text-base font-bold text-[#b22110]">
                      {selectedTier.price === 0 ? 'Gratis' : formatPrice(selectedTier.price)}
                    </p>
                  </div>

                  {/* Additional Questions Section */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#271815]">Informasi Tambahan</h3>
                    
                    {/* Motivation Field */}
                    <div className="space-y-1.5">
                      <label
                        className={`text-xs font-semibold transition-colors duration-200 ${
                          focusedField === 'motivation' ? 'text-[#b22110]' : 'text-[#5f5e5e]'
                        }`}
                      >
                        Apa motivasi Anda mengikuti event ini?
                      </label>
                      <textarea
                        required
                        disabled={loading}
                        value={motivation}
                        onChange={(e) => setMotivation(e.target.value)}
                        onFocus={() => setFocusedField('motivation')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-[#F5F5F7] border border-[#EBEBEB] rounded-[10px] p-3 text-sm focus:border-[#b22110] outline-none transition-all resize-none h-24 text-[#271815]"
                        placeholder="Tuliskan motivasi Anda di sini..."
                      />
                    </div>

                    {/* Source Field */}
                    <div className="space-y-1.5">
                      <label
                        className={`text-xs font-semibold transition-colors duration-200 ${
                          focusedField === 'source' ? 'text-[#b22110]' : 'text-[#5f5e5e]'
                        }`}
                      >
                        Dari mana Anda mengetahui event ini?
                      </label>
                      <div className="relative">
                        <select
                          required
                          disabled={loading}
                          value={source}
                          onChange={(e) => setSource(e.target.value)}
                          onFocus={() => setFocusedField('source')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full bg-[#F5F5F7] border border-[#EBEBEB] rounded-[10px] p-3 pr-10 text-sm focus:border-[#b22110] outline-none appearance-none transition-all text-[#271815]"
                        >
                          <option value="" disabled>Pilih sumber informasi</option>
                          <option value="Media Sosial (Instagram/Twitter)">Media Sosial (Instagram/Twitter)</option>
                          <option value="Email Newsletter">Email Newsletter</option>
                          <option value="Teman atau Kolega">Teman atau Kolega</option>
                          <option value="Iklan Digital">Iklan Digital</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#5f5e5e]" />
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="pt-4 border-t border-[#EBEBEB]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-[#5f5e5e]">Total Tagihan</span>
                      <span className="text-lg font-black text-[#b22110]">
                        {selectedTier.price === 0 ? 'Gratis' : formatPrice(selectedTier.price)}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#5f5e5e]">Termasuk pajak dan biaya layanan jika berlaku.</p>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="px-6 py-5 bg-[#fff8f6] border-t border-[#EBEBEB] flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#b22110] text-white font-bold py-3 px-6 rounded-full text-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {loading ? 'Memproses...' : 'Lanjutkan ke Pembayaran'}
                  </button>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setSelectedTier(null)}
                    className="sm:w-32 border border-[#b22110] text-[#b22110] font-bold py-3 px-6 rounded-full text-sm hover:bg-[#fff0ee] active:scale-[0.98] transition-all text-center"
                  >
                    Batal
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
