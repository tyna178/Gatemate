import { Link } from 'react-router-dom'
import { Ticket, Github, Twitter, Instagram, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Ticket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">GateMate</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Platform manajemen tiket dan event terpercaya di Indonesia. Beli tiket, kelola event, dan lacak check-in dengan mudah.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 glass-card hover:bg-white/10 rounded-lg transition-all text-white/50 hover:text-white">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h3>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Jelajahi Event', to: '/events' },
                { label: 'Daftar Sekarang', to: '/register' },
                { label: 'Masuk', to: '/login' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Dukungan</h3>
            <ul className="space-y-2">
              {['Pusat Bantuan', 'Kebijakan Privasi', 'Syarat & Ketentuan', 'Kontak Kami'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            © 2025 GateMate. All rights reserved.
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Indonesia
          </p>
        </div>
      </div>
    </footer>
  )
}
