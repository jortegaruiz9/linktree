import { query } from "./strapi";
import { Product } from "./types";
import { CACHE_TAGS } from "./cacheTags";

const { STRAPI_URL } = process.env;

// Get the base URL for Strapi - consistent with strapi.ts
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

export function getGalleryProducts(): Promise<Product[]> {
  return query("products?fields[0]=brand&populate[Media][fields][0]=url", {}, CACHE_TAGS.PRODUCTS)
    .then((res: { data: Array<{ brand: string; Media: { url: string } }> }) => {
      return res.data.map((item) => ({
        image: `${STRAPI_BASE_URL}${item.Media.url}`,
        alt: item.brand,
      }));
    });
}
