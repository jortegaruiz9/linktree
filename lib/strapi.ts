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
 * Query Strapi API with caching support optimized for Next.js 15
 * @param url - API endpoint (without /api/ prefix)
 * @param init - Fetch options
 * @param tag - Cache tag for revalidation
 */
export async function query(url: string, init: QueryOptions = {}, tag?: CacheTag) {
  const options: QueryOptions = {
    ...init,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
      // Add mobile-friendly headers
      'Accept': 'application/json',
      ...init.headers,
    },
  };

  // Merge cache tags if provided (Next.js 15 optimized)
  if (tag) {
    options.next = {
      ...options.next,
      tags: [...(options.next?.tags || []), tag],
      // Optimized revalidation for mobile performance
      revalidate: options.next?.revalidate ?? 1800, // 30 minutes instead of 1 hour
    };
  }

  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/${url}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from Strapi: ${url}`, error);
    throw error;
  }
}