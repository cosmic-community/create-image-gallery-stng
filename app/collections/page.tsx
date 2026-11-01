import { getCollections } from '@/lib/cosmic'
import CollectionCard from '@/components/CollectionCard'

export const revalidate = 60

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.4em] text-cosmic-glow">
          Archive
        </p>
        <h1 className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
          Gallery Collections
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-400">
          Organized records of space-time imagery curated by the Guild.
        </p>
      </header>

      {collections.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-cosmic-panel p-12 text-center">
          <p className="text-4xl">🛰️</p>
          <p className="mt-4 text-slate-400">No collections found yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </div>
  )
}