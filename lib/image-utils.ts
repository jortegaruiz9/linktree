const { STRAPI_URL } = process.env;

// Get the base URL for Strapi - centralized configuration
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

/**
 * Utility function to build Strapi image URLs consistently
 * @param url - The image URL from Strapi (usually starts with '/uploads/')
 * @returns Complete image URL with proper base URL
 */
export const buildStrapiImageUrl = (url: string): string => {
  // Handle cases where URL might already be complete
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // Ensure URL starts with '/' for proper concatenation
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  
  return `${STRAPI_BASE_URL}${cleanUrl}`;
};

/**
 * Utility function to validate image URLs for mobile devices
 * @param url - The image URL to validate
 * @returns boolean indicating if URL is valid
 */
export const isValidImageUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate optimized sizes attribute for responsive images
 * @param priority - Whether this image has priority loading
 * @returns sizes string optimized for mobile-first approach
 */
export const generateImageSizes = (priority: boolean = false): string => {
  if (priority) {
    // For priority images, load larger sizes earlier
    return "(max-width: 640px) 100vw, (max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw";
  }
  
  // For lazy-loaded images, use smaller sizes for better performance
  return "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw";
};
