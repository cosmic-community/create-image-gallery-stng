import type { MediaType } from '@/types'

export default function MediaTypeBadge({ type }: { type: MediaType }) {
  const isVideo = type === 'Video'
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
        isVideo
          ? 'bg-cosmic-accent/30 text-purple-200'
          : 'bg-cosmic-glow/20 text-cyan-200'
      }`}
    >
      {isVideo ? '▶ Video' : '🖼 Image'}
    </span>
  )
}