import { query } from "./strapi";
import { Review } from "./types";
import { CACHE_TAGS } from "./cacheTags";

const { STRAPI_URL } = process.env;

// Get the base URL for Strapi - consistent with strapi.ts
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

export function getReviews(): Promise<Review[]> {
    return query("reviews?locale=es&fields[0]=review&fields[1]=position&fields[2]=user&populate[logo][fields][0]=url", {}, CACHE_TAGS.REVIEWS)
   .then((res: { data: Array<{ review: string; position: string; user: string; logo: { url: string } }> }) => {
    return res.data.map((review) => {
        const image = `${STRAPI_BASE_URL}${review.logo.url}`;
        return {
            image,
            alt: review.position,
            name: review.position,
            username: `@${review.user}`,
            description: review.review
        };
    });
   });
}