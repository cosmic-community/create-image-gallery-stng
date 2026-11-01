import Link from 'next/link'
import type { GalleryCollection } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CollectionCard({ collection }: { collection: GalleryCollection }) {
  const name = getMetafieldValue(collection.metadata?.name) || collection.title
  const description = getMetafieldValue(collection.metadata?.description)
  const cover = collection.metadata?.cover_image?.imgix_url || ''

  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group relative block h-64 overflow-hidden rounded-2xl border border-white/10 bg-cosmic-panel card-glow transition-transform duration-300 hover:-translate-y-1 hover:border-cosmic-glow/40"
    >
      {cover ? (
        <img
          src={`${cover}?w=900&h=600&fit=crop&auto=format,compress`}
          alt={name}
          width={450}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-5xl">🌌</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-display text-lg font-bold tracking-wide text-cosmic-glow text-glow">
          {name}
        </h3>
        {description && (
          <p className="mt-1 line-clamp-2 text-sm text-slate-300">{description}</p>
        )}
      </div>
    </Link>
  )
}