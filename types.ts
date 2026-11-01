export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export type MediaType = 'Image' | 'Video';

export interface GalleryCollection extends CosmicObject {
  type: 'gallery-collections';
  metadata: {
    name?: string;
    description?: string;
    cover_image?: CosmicImage;
  };
}

export interface GalleryItem extends CosmicObject {
  type: 'gallery-items';
  metadata: {
    title?: string;
    media_type?: MediaType;
    image?: CosmicImage;
    video_url?: string;
    video_thumbnail?: CosmicImage;
    description?: string;
    collection?: GalleryCollection;
    featured?: boolean;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export function isGalleryItem(obj: CosmicObject): obj is GalleryItem {
  return obj.type === 'gallery-items';
}

export function isGalleryCollection(obj: CosmicObject): obj is GalleryCollection {
  return obj.type === 'gallery-collections';
}