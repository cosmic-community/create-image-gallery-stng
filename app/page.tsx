import { getGalleryItems, getFeaturedItems, getCollections } from '@/lib/cosmic'
import GalleryGrid from '@/components/GalleryGrid'
import FeaturedSection from '@/components/FeaturedSection'
import CollectionCard from '@/components/CollectionCard'

export const revalidate = 60

export default async function HomePage() {
  const [items, featured, collections] = await Promise.all([
    getGalleryItems(),
    getFeaturedItems(),
    getCollections(),
  ])

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-16 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-cosmic-glow">
          Space · Time · Imagery
        </p>
        <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-5xl">
          The SpaceTime Navigators
          <span className="block text-glow text-cosmic-glow">Guild Gallery</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400">
          A curated archive of space-time imagery and video — black hole expansions,
          galactic clusters, and navigator-grade visual records from across the universes.
        </p>
      </section>

      <FeaturedSection items={featured} />

      {collections.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 font-display text-xl font-bold tracking-widest text-cosmic-glow">
            🌌 COLLECTIONS
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 font-display text-xl font-bold tracking-widest text-cosmic-glow">
          🖼️ ALL RECORDS
        </h2>
        <GalleryGrid items={items} />
      </section>
    </div>
  )
}