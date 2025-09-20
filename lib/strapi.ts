import type { CacheTag } from './cacheTags';

const { STRAPI_TOKEN, STRAPI_URL } = process.env;

// Get the base URL for Strapi
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

interface QueryOptions extends RequestInit {
  next?: {
    tags?: string[];
    revalidate?: number | false;
  };
}

/**
 * Query Strapi API with caching support
 * @param url - API endpoint (without /api/ prefix)
 * @param init - Fetch options
 * @param tag - Cache tag for revalidation
 */
export function query(url: string, init: QueryOptions = {}, tag?: CacheTag) {
  const options: QueryOptions = {
    ...init,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      ...init.headers,
    },
  };

  // Merge cache tags if provided
  if (tag) {
    options.next = {
      ...options.next,
      tags: [...(options.next?.tags || []), tag],
      // Default revalidate to 1 hour if not specified
      revalidate: options.next?.revalidate ?? 3600,
    };
  }

  return fetch(`${STRAPI_BASE_URL}/api/${url}`, options).then(res => res.json());
}