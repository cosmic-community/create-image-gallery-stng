import { createBucketClient } from '@cosmicjs/sdk'
import type { GalleryCollection, GalleryItem } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'gallery-items' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as GalleryItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch gallery items')
  }
}

export async function getFeaturedItems(): Promise<GalleryItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'gallery-items', 'metadata.featured': true })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as GalleryItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured items')
  }
}

export async function getGalleryItemBySlug(slug: string): Promise<GalleryItem | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'gallery-items', slug })
      .depth(1)
    return response.object as GalleryItem
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch gallery item')
  }
}

export async function getCollections(): Promise<GalleryCollection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'gallery-collections' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as GalleryCollection[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch collections')
  }
}

export async function getCollectionBySlug(slug: string): Promise<GalleryCollection | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'gallery-collections', slug })
      .depth(1)
    return response.object as GalleryCollection
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch collection')
  }
}

export async function getItemsByCollection(collectionId: string): Promise<GalleryItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'gallery-items', 'metadata.collection': collectionId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as GalleryItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch items by collection')
  }
}