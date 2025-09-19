import { query } from "./strapi";
import { Review } from "./types";

const {STRAPI_HOST} = process.env

export function getReviews(): Promise<Review[]> {
    return query("reviews?locale=es&fields[0]=review&fields[1]=position&fields[2]=user&populate[logo][fields][0]=url")
   .then((res: { data: Array<{ review: string; position: string; user: string; logo: { url: string } }> }) => {
    return res.data.map((review) => {
        const image = `${STRAPI_HOST}${review.logo.url}`;
        return {
            image,
            alt: review.position,
            name: review.position,
            username: `@${review.user}`,
            description: review.review
        };
    });
   })
}