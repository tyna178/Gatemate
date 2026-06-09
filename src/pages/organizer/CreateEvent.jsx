import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, MapPin, DollarSign, Users, Tag, FileText, ArrowLeft, Image } from 'lucide-react'

export default function CreateEvent() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    title: '', description: '', category: '', date: '', time: '', endTime: '',
    location: '', city: '', price: '', maxAttendees: '',
  })
  const [loading, setLoading] = useState(false)

  const categories = ['Teknologi', 'Konser', 'Bisnis', 'Festival', 'Olahraga', 'Pendidikan', 'Seni', 'Lainnya']

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      alert(`Event "${form.title}" berhasil dibuat! (Demo mode)`)
      navigate('/organizer/events')
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-white group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Kembali
      </button>

      <div>
        <h1 className="text-2xl font-black text-white">Buat Event Baru</h1>
        <p className="text-white/50 text-sm mt-1">Isi detail event yang ingin kamu selenggarakan</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="font-bold text-white flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-400" /> Informasi Dasar</h2>

          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5">Nama Event *</label>
            <input name="title" value={form.title} onChange={handleChange} placeholder="Nama event kamu" required className="input-field w-full" />
          </div>

          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5">Deskripsi *</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Ceritakan tentang event ini..." rows={4} required className="input-field w-full resize-none" />
          </div>

          <div>
            <label className="text-white/70 text-sm font-medium block mb-1.5">Kategori *</label>
            <div className="relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
              <select name="category" value={form.category} onChange={handleChange} required className="input-field pl-10 w-full appearance-none">
                <option value="">Pilih kategori</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Date & Time */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="font-bold text-white flex items-center gap-2"><CalendarDays className="w-4 h-4 text-purple-400" /> Tanggal & Waktu</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="text-white/70 text-sm font-medium block mb-1.5">Tanggal *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required className="input-field w-full" />
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Mulai *</label>
              <input type="time" name="time" value={form.time} onChange={handleChange} required className="input-field w-full" />
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Selesai</label>
              <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className="input-field w-full" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="font-bold text-white flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> Lokasi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Nama Venue *</label>
              <input name="location" value={form.location} onChange={handleChange} placeholder="Nama gedung/venue" required className="input-field w-full" />
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Kota *</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="Kota pelaksanaan" required className="input-field w-full" />
            </div>
          </div>
        </div>

        {/* Tickets */}
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h2 className="font-bold text-white flex items-center gap-2"><Users className="w-4 h-4 text-amber-400" /> Tiket</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Harga Tiket (Rp)</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="0 = Gratis" min="0" className="input-field pl-10 w-full" />
              </div>
            </div>
            <div>
              <label className="text-white/70 text-sm font-medium block mb-1.5">Kapasitas *</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input type="number" name="maxAttendees" value={form.maxAttendees} onChange={handleChange} placeholder="Jumlah peserta" required min="1" className="input-field pl-10 w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="glass-card p-6 rounded-2xl">
          <h2 className="font-bold text-white flex items-center gap-2 mb-4"><Image className="w-4 h-4 text-sky-400" /> Cover Event</h2>
          <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center hover:border-indigo-500/40 transition-colors cursor-pointer">
            <Image className="w-10 h-10 text-white/20 mx-auto mb-3" />
            <p className="text-white/40 text-sm">Drag & drop gambar atau klik untuk upload</p>
            <p className="text-white/20 text-xs mt-1">PNG, JPG, WEBP (Max 5MB)</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary flex-1">Batal</button>
          <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading ? <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Menyimpan...
            </> : 'Publikasikan Event'}
          </button>
        </div>
      </form>
    </div>
  )
}
