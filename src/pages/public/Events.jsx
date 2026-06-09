import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import EventCard from '../../components/EventCard'
import { dummyEvents, eventCategories } from '../../data/dummyEvents'

export default function Events() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('newest')

  const filtered = dummyEvents.filter(event => {
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.city.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === 'Semua' || event.category === activeCategory
    return matchSearch && matchCategory
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    if (sortBy === 'date') return new Date(a.date) - new Date(b.date)
    return b.id - a.id
  })

  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-indigo-400 text-sm font-medium uppercase tracking-wider mb-2">Semua Event</p>
          <h1 className="text-4xl font-black text-white mb-2">
            Jelajahi <span className="gradient-text">Event</span>
          </h1>
          <p className="text-white/50">Temukan event seru yang sesuai dengan minatmu</p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Cari event atau kota..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-11 w-full"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field pl-10 pr-8 appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="newest">Terbaru</option>
              <option value="date">Terdekat</option>
              <option value="price-asc">Harga Termurah</option>
              <option value="price-desc">Harga Termahal</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {eventCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass-card text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        <p className="text-white/40 text-sm mb-6">
          Menampilkan <span className="text-white font-medium">{filtered.length}</span> event
          {search && <> untuk "<span className="text-indigo-400">{search}</span>"</>}
        </p>

        {/* Event Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 glass-card rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Event Tidak Ditemukan</h3>
            <p className="text-white/40 text-sm">Coba kata kunci atau kategori yang berbeda</p>
          </div>
        )}
      </div>
    </div>
  )
}
