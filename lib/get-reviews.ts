import { query } from "./strapi";
import { Review } from "./types";
import { CACHE_TAGS } from "./cacheTags";
import { buildStrapiImageUrl } from "./image-utils";

export function getReviews(): Promise<Review[]> {
    return query("reviews?locale=es&fields[0]=review&fields[1]=position&fields[2]=user&fields[3]=logoUrl", {}, CACHE_TAGS.REVIEWS)
   .then((res: { data: Array<{ review: string; position: string; user: string; logoUrl: string }> }) => {
    // Use buildStrapiImageUrl to handle both Vercel Blob Storage URLs and Strapi paths
    return res.data.map((review) => {
        const image = buildStrapiImageUrl(review.logoUrl);
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