import { useState } from 'react'
import { Building2, Search, Check, X, Eye, Trash2 } from 'lucide-react'
import { dummyUsers } from '../../data/dummyUsers'
import { formatDateShort } from '../../utils/formatDate'

export default function ManageOrganizers() {
  const [search, setSearch] = useState('')
  const organizers = dummyUsers.filter(u => u.role === 'organizer')
  const filtered = organizers.filter(o =>
    o.name.toLowerCase().includes(search.toLowerCase()) ||
    o.organizerName?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-purple-400" />
            Kelola Organizer
          </h1>
          <p className="text-white/50 text-sm mt-1">
            {organizers.filter(o => o.status === 'pending').length} permohonan menunggu persetujuan
          </p>
        </div>
      </div>

      {/* Pending badge */}
      {organizers.some(o => o.status === 'pending') && (
        <div className="glass-card p-4 rounded-xl border border-amber-500/20 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <p className="text-amber-300 text-sm">
            Ada <strong>{organizers.filter(o => o.status === 'pending').length}</strong> organizer baru yang perlu diverifikasi
          </p>
        </div>
      )}

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari organizer..."
          className="input-field pl-10 w-full"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(org => (
          <div key={org.id} className="glass-card p-5 flex flex-col md:flex-row items-start md:items-center gap-4">
            <img src={org.avatar} alt={org.name} className="w-12 h-12 rounded-2xl flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-0.5">
                <h3 className="text-white font-bold">{org.organizerName}</h3>
                <span className={`badge ${org.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {org.status === 'active' ? 'Terverifikasi' : 'Menunggu'}
                </span>
              </div>
              <p className="text-white/50 text-sm">{org.name} · {org.email}</p>
              <p className="text-white/30 text-xs mt-0.5">
                {org.eventsCount || 0} event · Bergabung {formatDateShort(org.joinedAt)}
              </p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {org.status === 'pending' && (
                <>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-medium transition-all">
                    <Check className="w-3.5 h-3.5" /> Setujui
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl text-xs font-medium transition-all">
                    <X className="w-3.5 h-3.5" /> Tolak
                  </button>
                </>
              )}
              {org.status === 'active' && (
                <button className="p-2.5 glass-card hover:bg-white/10 rounded-xl transition-all text-white/40 hover:text-white">
                  <Eye className="w-4 h-4" />
                </button>
              )}
              <button className="p-2.5 glass-card hover:bg-red-500/10 rounded-xl transition-all text-white/40 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
