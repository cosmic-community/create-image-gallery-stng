'use client'

import type { GalleryItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import MediaTypeBadge from '@/components/MediaTypeBadge'

interface GalleryCardProps {
  item: GalleryItem
  onSelect: (item: GalleryItem) => void
}

export default function GalleryCard({ item, onSelect }: GalleryCardProps) {
  const mediaType = (item.metadata?.media_type as 'Image' | 'Video') || 'Image'
  const isVideo = mediaType === 'Video'

  const imageSource =
    item.metadata?.image?.imgix_url ||
    item.metadata?.video_thumbnail?.imgix_url ||
    ''

  const title = getMetafieldValue(item.metadata?.title) || item.title

  return (
    <button
      onClick={() => onSelect(item)}
      className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-cosmic-panel text-left card-glow transition-transform duration-300 hover:-translate-y-1 hover:border-cosmic-glow/40"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cosmic-deep">
        {imageSource ? (
          <img
            src={`${imageSource}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={title}
            width={400}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">🌌</div>
        )}

        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/20">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-cosmic-dark shadow-lg">
              ▶
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3">
          <MediaTypeBadge type={mediaType} />
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-display text-sm font-semibold tracking-wide text-slate-100">
          {title}
        </h3>
        {item.metadata?.collection?.title && (
          <p className="mt-1 text-xs text-slate-400">
            {item.metadata.collection.title}
          </p>
        )}
      </div>
    </button>
  )
}