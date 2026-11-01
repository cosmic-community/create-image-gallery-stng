'use client'

import { useState, useMemo } from 'react'
import type { GalleryItem } from '@/types'
import GalleryCard from '@/components/GalleryCard'
import Lightbox from '@/components/Lightbox'

type FilterType = 'all' | 'Image' | 'Video'

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return items
    return items.filter((item) => {
      const type = (item.metadata?.media_type as 'Image' | 'Video') || 'Image'
      return type === filter
    })
  }, [items, filter])

  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-cosmic-panel p-12 text-center">
        <p className="text-4xl">🛰️</p>
        <p className="mt-4 text-slate-400">No gallery items found yet.</p>
      </div>
    )
  }

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'Image', label: 'Images' },
    { key: 'Video', label: 'Videos' },
  ]

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-cosmic-accent text-white'
                : 'border border-white/10 bg-cosmic-panel text-slate-300 hover:border-cosmic-glow/40'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-cosmic-panel p-12 text-center text-slate-400">
          No {filter === 'Image' ? 'images' : 'videos'} in this view.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <GalleryCard key={item.id} item={item} onSelect={setSelected} />
          ))}
        </div>
      )}

      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}