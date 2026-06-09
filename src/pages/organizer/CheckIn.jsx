import { useState } from 'react'
import { ScanLine, CheckCircle2, XCircle, Search } from 'lucide-react'
import { dummyTickets } from '../../data/dummyTickets'
import { formatDate } from '../../utils/formatDate'

export default function CheckIn() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    const ticket = dummyTickets.find(t => t.ticketCode.toLowerCase() === code.toLowerCase())
    if (ticket) {
      setResult({ success: ticket.status === 'active', ticket })
    } else {
      setResult({ success: false, ticket: null })
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2">
          <ScanLine className="w-6 h-6 text-indigo-400" />
          Check-In Peserta
        </h1>
        <p className="text-white/50 text-sm mt-1">Masukkan kode tiket atau scan QR Code peserta</p>
      </div>

      {/* Scanner Area */}
      <div className="glass-card p-8 rounded-2xl text-center">
        <div className="w-48 h-48 border-2 border-dashed border-indigo-500/40 rounded-2xl flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-pulse" />
          <ScanLine className="w-16 h-16 text-white/20" />
        </div>
        <p className="text-white/40 text-sm">Arahkan kamera ke QR Code tiket peserta</p>
        <p className="text-white/20 text-xs mt-1">Atau masukkan kode tiket secara manual di bawah</p>
      </div>

      {/* Manual Input */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Masukkan kode tiket (cth: JTS-A1-8842)"
            className="input-field pl-10 w-full font-mono"
          />
        </div>
        <button type="submit" className="btn-primary whitespace-nowrap">Cari Tiket</button>
      </form>

      {/* Result */}
      {result && (
        <div className={`glass-card p-6 rounded-2xl border ${result.success ? 'border-emerald-500/30' : 'border-red-500/30'} animate-fade-in`}>
          {result.success ? (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-emerald-400 font-bold mb-1">✓ Tiket Valid — Izinkan Masuk</h3>
                <p className="text-white font-semibold">{result.ticket.attendeeName}</p>
                <p className="text-white/50 text-sm">{result.ticket.eventTitle}</p>
                <p className="text-white/40 text-xs mt-1">{formatDate(result.ticket.eventDate)} · {result.ticket.category}</p>
                <div className="mt-3">
                  <button className="btn-primary text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Konfirmasi Check-In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-red-400 font-bold mb-1">✗ Tiket Tidak Valid</h3>
                <p className="text-white/60 text-sm">
                  {result.ticket?.status === 'used'
                    ? 'Tiket ini sudah digunakan sebelumnya.'
                    : 'Kode tiket tidak ditemukan dalam sistem.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Demo Ticket Codes */}
      <div className="glass-card p-4 rounded-2xl border border-indigo-500/20">
        <p className="text-white/40 text-xs font-medium mb-2 uppercase tracking-wider">Kode Tiket Demo</p>
        <div className="space-y-1.5">
          {dummyTickets.map(t => (
            <button
              key={t.id}
              onClick={() => { setCode(t.ticketCode); setResult(null) }}
              className="flex items-center justify-between w-full text-left hover:bg-white/5 px-2 py-1.5 rounded-lg transition-all"
            >
              <span className="font-mono text-indigo-400 text-sm">{t.ticketCode}</span>
              <span className={`text-xs ${t.status === 'active' ? 'text-emerald-400' : 'text-white/40'}`}>
                {t.status === 'active' ? '● Aktif' : '● Digunakan'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
