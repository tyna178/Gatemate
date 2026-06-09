import { Link } from 'react-router-dom'
import { ArrowRight, Ticket, Shield, Zap, Users, Star, CheckCircle } from 'lucide-react'
import EventCard from '../../components/EventCard'
import { dummyEvents } from '../../data/dummyEvents'

const features = [
  { icon: Ticket, title: 'Tiket Digital', desc: 'QR code unik untuk setiap tiket, mudah divalidasi saat event.' },
  { icon: Shield, title: 'Transaksi Aman', desc: 'Pembayaran terenkripsi dan terlindungi dari penipuan.' },
  { icon: Zap, title: 'Instan & Mudah', desc: 'Pesan tiket dalam hitungan detik, tanpa antri.' },
  { icon: Users, title: 'Multi-Role', desc: 'Platform untuk penonton, organizer, dan admin dalam satu sistem.' },
]

const stats = [
  { value: '50K+', label: 'Tiket Terjual' },
  { value: '1.2K+', label: 'Event Berhasil' },
  { value: '200+', label: 'Organizer Aktif' },
  { value: '98%', label: 'Kepuasan User' },
]

export default function Home() {
  const featuredEvents = dummyEvents.filter(e => e.featured).slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Background Blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-8 animate-fade-in">
            <Star className="w-3.5 h-3.5 fill-indigo-300" />
            Platform #1 Tiket Event di Indonesia
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6 animate-slide-up">
            <span className="text-white">Temukan &amp; Kelola</span>
            <br />
            <span className="gradient-text">Event Impianmu</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            GateMate hadir untuk mempermudah pembelian tiket, pengelolaan event, dan proses check-in — semua dalam satu platform yang powerful dan modern.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/events" className="btn-primary flex items-center gap-2 text-base">
              Jelajahi Event
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/register" className="btn-secondary text-base">
              Daftar Gratis
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <div className="text-3xl font-black gradient-text">{stat.value}</div>
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-indigo-400 text-sm font-medium uppercase tracking-wider mb-2">Event Pilihan</p>
              <h2 className="text-3xl md:text-4xl font-black text-white">Event <span className="gradient-text">Populer</span></h2>
            </div>
            <Link to="/events" className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-1">
              Lihat semua <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-wider mb-2">Kenapa GateMate?</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Solusi Lengkap untuk <span className="gradient-text">Semua Kebutuhan</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Dari pembelian tiket hingga manajemen event, GateMate menyediakan semua yang kamu butuhkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card-hover p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                Siap Mulai Bersama <span className="gradient-text">GateMate</span>?
              </h2>
              <p className="text-white/60 mb-8 leading-relaxed">
                Bergabung dengan ribuan pengguna dan ratusan organizer yang sudah mempercayai GateMate untuk mengelola event mereka.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register" className="btn-primary flex items-center justify-center gap-2">
                  Mulai Sekarang — Gratis!
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/events" className="btn-secondary">
                  Lihat Event
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
