import { query } from "./strapi";
import { CACHE_TAGS } from "./cacheTags";
import { buildStrapiImageUrl } from "./image-utils";

export function getHomeInfo(){
    return query("home?locale=es", {}, CACHE_TAGS.HOME)
   .then(res => {
    const { title, user, description, instagram, linkedin, youtube, tiktok, backgroundUrl } = res.data;
    // Use buildStrapiImageUrl to handle both Vercel Blob Storage URLs and Strapi paths
    const image = buildStrapiImageUrl(backgroundUrl);
    return { title, user, description, instagram, linkedin, youtube, tiktok, image };
   });
}