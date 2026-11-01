// app/collections/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCollectionBySlug, getItemsByCollection, getMetafieldValue } from '@/lib/cosmic'
import GalleryGrid from '@/components/GalleryGrid'

export const revalidate = 60

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const collection = await getCollectionBySlug(slug)

  if (!collection) {
    notFound()
  }

  const items = await getItemsByCollection(collection.id)
  const name = getMetafieldValue(collection.metadata?.name) || collection.title
  const description = getMetafieldValue(collection.metadata?.description)
  const cover = collection.metadata?.cover_image?.imgix_url || ''

  return (
    <div>
      {cover && (
        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          <img
            src={`${cover}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-dark via-cosmic-dark/40 to-transparent" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/collections"
          className="mb-6 inline-block text-sm text-cosmic-glow transition-colors hover:text-cyan-300"
        >
          ← All Collections
        </Link>

        <header className="mb-10">
          <h1 className="font-display text-3xl font-black tracking-tight text-white text-glow sm:text-4xl">
            {name}
          </h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              {description}
            </p>
          )}
        </header>

        <GalleryGrid items={items} />
      </div>
    </div>
  )
}