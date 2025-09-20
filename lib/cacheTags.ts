/**
 * Cache tags for Next.js revalidation
 * Used to invalidate specific data when Strapi content changes
 */
export const CACHE_TAGS = {
  HOME: 'home',
  HASHTAGS: 'hashtags', 
  GALLERY: 'gallery',
  REVIEWS: 'reviews',
  PRODUCTS: 'products',
} as const;

export type CacheTag = typeof CACHE_TAGS[keyof typeof CACHE_TAGS];

/**
 * Helper to get all cache tags as array
 */
export const getAllCacheTags = (): CacheTag[] => Object.values(CACHE_TAGS);

/**
 * Helper to validate if a tag is valid
 */
export const isValidCacheTag = (tag: string): tag is CacheTag => {
  return Object.values(CACHE_TAGS).includes(tag as CacheTag);
};
