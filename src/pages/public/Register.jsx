import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Ticket, User, Building2, Check } from 'lucide-react'

const roles = [
  { value: 'user', label: 'Pengguna', icon: User, desc: 'Saya ingin membeli tiket dan mengikuti event' },
  { value: 'organizer', label: 'Organizer', icon: Building2, desc: 'Saya ingin membuat dan mengelola event' },
]

export default function Register() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('user')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Password tidak cocok!')
      return
    }
    if (form.password.length < 8) {
      setError('Password minimal 8 karakter!')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const user = {
        id: Date.now(),
        name: form.name,
        email: form.email,
        role: selectedRole,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}&background=6366f1&color=fff`,
      }
      localStorage.setItem('token', 'dummy-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify(user))
      navigate(selectedRole === 'organizer' ? '/organizer/dashboard' : '/user/dashboard')
      setLoading(false)
    }, 800)
  }

  const benefits = [
    'Beli tiket dalam hitungan detik',
    'Notifikasi event favoritmu',
    'Riwayat tiket terorganisir',
    'Check-in mudah dengan QR Code',
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-4xl relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Panel */}
        <div className="hidden lg:block animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black gradient-text">GateMate</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Bergabung dengan <br />
            <span className="gradient-text">Komunitas Kami</span>
          </h2>
          <p className="text-white/50 mb-8 leading-relaxed">
            Daftarkan dirimu dan nikmati kemudahan mengikuti event favorit di seluruh Indonesia.
          </p>
          <div className="space-y-3">
            {benefits.map(b => (
              <div key={b} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-indigo-500/20 border border-indigo-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-indigo-400" />
                </div>
                <span className="text-white/60 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="animate-slide-up">
          <div className="text-center mb-6 lg:hidden">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl shadow-indigo-500/30">
              <Ticket className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-black text-white">Daftar GateMate</h1>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-2">Buat Akun Baru</h2>
            <p className="text-white/40 text-sm mb-6">Gratis dan tanpa biaya apapun</p>

            {/* Role Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {roles.map(role => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 rounded-xl border transition-all duration-200 text-left ${
                    selectedRole === role.value
                      ? 'border-indigo-500/50 bg-indigo-500/10 text-white'
                      : 'border-white/10 hover:border-white/20 text-white/50'
                  }`}
                >
                  <role.icon className={`w-5 h-5 mb-1 ${selectedRole === role.value ? 'text-indigo-400' : ''}`} />
                  <p className="font-semibold text-xs">{role.label}</p>
                  <p className="text-xs opacity-60 leading-tight mt-0.5">{role.desc}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Nama Lengkap</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama kamu"
                  required
                  className="input-field w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com"
                    required
                    className="input-field pl-10 w-full"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 8 karakter"
                    required
                    className="input-field pl-10 pr-10 w-full"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-1.5">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  required
                  className="input-field w-full"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">{error}</div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center flex items-center gap-2 mt-2">
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Mendaftar...
                  </>
                ) : 'Daftar Sekarang'}
              </button>
            </form>

            <p className="text-center text-white/40 text-sm mt-5">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
