'use client'

import { useState } from 'react'
import type { GalleryItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import Lightbox from '@/components/Lightbox'
import MediaTypeBadge from '@/components/MediaTypeBadge'

export default function FeaturedSection({ items }: { items: GalleryItem[] }) {
  const [selected, setSelected] = useState<GalleryItem | null>(null)

  if (!items || items.length === 0) return null

  return (
    <section className="mb-16">
      <h2 className="mb-6 font-display text-xl font-bold tracking-widest text-cosmic-gold">
        ⭐ FEATURED RECORDS
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const mediaType = (item.metadata?.media_type as 'Image' | 'Video') || 'Image'
          const isVideo = mediaType === 'Video'
          const imageSource =
            item.metadata?.image?.imgix_url ||
            item.metadata?.video_thumbnail?.imgix_url ||
            ''
          const title = getMetafieldValue(item.metadata?.title) || item.title

          return (
            <button
              key={item.id}
              onClick={() => setSelected(item)}
              className="group relative h-72 overflow-hidden rounded-2xl border border-cosmic-gold/30 bg-cosmic-panel text-left card-glow"
            >
              {imageSource ? (
                <img
                  src={`${imageSource}?w=900&h=700&fit=crop&auto=format,compress`}
                  alt={title}
                  width={450}
                  height={350}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-5xl">🌌</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-cosmic-dark shadow-lg">
                    ▶
                  </span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="mb-2">
                  <MediaTypeBadge type={mediaType} />
                </div>
                <h3 className="font-display text-base font-semibold tracking-wide text-white">
                  {title}
                </h3>
              </div>
            </button>
          )
        })}
      </div>
      <Lightbox item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}