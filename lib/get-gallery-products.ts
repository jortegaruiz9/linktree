import { query } from "./strapi";
import { Product } from "./types";

export function getGalleryProducts(): Promise<Product[]> {
  return query("products?fields[0]=brand&populate[Media][fields][0]=url")
    .then((res: { data: Array<{ brand: string; Media: { url: string } }> }) => {
      const baseUrl = process.env.STRAPI_HOST || 'http://localhost:1337';
      return res.data.map((item) => ({
        image: `${baseUrl}${item.Media.url}`,
        alt: item.brand,
      }));
    });
}
