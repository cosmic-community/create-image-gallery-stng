'use client'

import { useEffect } from 'react'
import type { GalleryItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { getVideoEmbedUrl } from '@/lib/video'

interface LightboxProps {
  item: GalleryItem | null
  onClose: () => void
}

export default function Lightbox({ item, onClose }: LightboxProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (item) {
      document.addEventListener('keydown', handleKey)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  const mediaType = (item.metadata?.media_type as 'Image' | 'Video') || 'Image'
  const isVideo = mediaType === 'Video'
  const title = getMetafieldValue(item.metadata?.title) || item.title
  const description = getMetafieldValue(item.metadata?.description)
  const videoUrl = getMetafieldValue(item.metadata?.video_url)
  const embedUrl = isVideo && videoUrl ? getVideoEmbedUrl(videoUrl) : null
  const imageSource = item.metadata?.image?.imgix_url || ''

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-cosmic-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white transition-colors hover:bg-black/80"
        >
          ×
        </button>

        <div className="relative aspect-video w-full bg-black">
          {isVideo && embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : isVideo && videoUrl ? (
            <video src={videoUrl} controls className="h-full w-full" />
          ) : imageSource ? (
            <img
              src={`${imageSource}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={title}
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-6xl">🌌</div>
          )}
        </div>

        <div className="p-5">
          <h2 className="font-display text-lg font-bold tracking-wide text-cosmic-glow">
            {title}
          </h2>
          {item.metadata?.collection?.title && (
            <p className="mt-1 text-xs uppercase tracking-widest text-slate-400">
              {item.metadata.collection.title}
            </p>
          )}
          {description && (
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
          )}
        </div>
      </div>
    </div>
  )
}