import { query } from "./strapi";
import { Product } from "./types";
import { CACHE_TAGS } from "./cacheTags";
import { buildStrapiImageUrl, isValidImageUrl } from "./image-utils";

export function getGalleryProducts(): Promise<Product[]> {
  return query("products?fields[0]=brand&fields[1]=photoUrl", {}, CACHE_TAGS.PRODUCTS)
    .then((res: { data: Array<{ brand: string; photoUrl: string }> }) => {
      return res.data
        .map((item) => {
          const imageUrl = buildStrapiImageUrl(item.photoUrl);
          
          // Validate URL before returning
          if (!isValidImageUrl(imageUrl)) {
            console.warn(`Invalid image URL for product ${item.brand}: ${imageUrl}`);
            return null;
          }
          
          return {
            image: imageUrl,
            alt: item.brand,
          };
        })
        .filter((product): product is Product => product !== null); // Remove invalid products
    });
}
