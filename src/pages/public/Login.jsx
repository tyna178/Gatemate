import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Ticket, User, Building2, ShieldCheck } from 'lucide-react'
import { dummyCredentials, dummyUsers } from '../../data/dummyUsers'

const roles = [
  { value: 'user', label: 'Pengguna', icon: User, desc: 'Beli tiket & ikuti event' },
  { value: 'organizer', label: 'Organizer', icon: Building2, desc: 'Buat & kelola event' },
  { value: 'admin', label: 'Admin', icon: ShieldCheck, desc: 'Kelola platform' },
]

export default function Login() {
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState('user')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Auto-fill demo credentials
  const demoCredential = dummyCredentials.find(c => c.role === selectedRole)

  const handleDemoLogin = () => {
    if (demoCredential) {
      setEmail(demoCredential.email)
      setPassword(demoCredential.password)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    setTimeout(() => {
      const match = dummyCredentials.find(c => c.email === email && c.password === password)
      if (match) {
        const user = dummyUsers.find(u => u.email === email)
        localStorage.setItem('token', 'dummy-token-' + Date.now())
        localStorage.setItem('user', JSON.stringify(user))

        const redirectMap = { user: '/user/dashboard', organizer: '/organizer/dashboard', admin: '/admin/dashboard' }
        navigate(redirectMap[user.role])
      } else {
        setError('Email atau password salah. Coba gunakan kredensial demo di bawah.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Background blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-indigo-500/30">
            <Ticket className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Selamat Datang</h1>
          <p className="text-white/50 text-sm mt-1">Masuk ke akun GateMate kamu</p>
        </div>

        {/* Role Selector */}
        <div className="glass-card p-1 flex gap-1 mb-6 rounded-2xl">
          {roles.map(role => (
            <button
              key={role.value}
              onClick={() => { setSelectedRole(role.value); setError('') }}
              className={`flex-1 flex flex-col items-center py-2.5 px-2 rounded-xl transition-all duration-200 text-xs font-medium ${
                selectedRole === role.value
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <role.icon className="w-4 h-4 mb-1" />
              {role.label}
            </button>
          ))}
        </div>

        {/* Demo credentials banner */}
        <div className="glass-card p-3 mb-6 rounded-xl border border-indigo-500/20 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-xs">Demo {roles.find(r => r.value === selectedRole)?.label}:</p>
            <p className="text-indigo-400 text-xs font-mono">{demoCredential?.email}</p>
          </div>
          <button onClick={handleDemoLogin} className="text-xs text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg hover:bg-indigo-500/10 transition-all">
            Isi Otomatis
          </button>
        </div>

        {/* Form */}
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-white/70 text-sm font-medium block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  required
                  className="input-field pl-10 w-full"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-white/70 text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field pl-10 pr-10 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center flex items-center gap-2"
            >
              {loading && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/40 text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
