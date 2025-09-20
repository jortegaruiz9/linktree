import { query } from "./strapi";
import { CACHE_TAGS } from "./cacheTags";

const { STRAPI_URL } = process.env;

// Get the base URL for Strapi - consistent with strapi.ts
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

export function getHomeInfo(){
    return query("home?locale=es&populate=background", {}, CACHE_TAGS.HOME)
   .then(res => {
    const { title, user, description, instagram, linkedin, youtube, tiktok, background } = res.data;
    // Add cache busting timestamp to force image refresh
    const timestamp = new Date().getTime();
    const image = `${STRAPI_BASE_URL}${background.url}?v=${timestamp}`;
    return { title, user, description, instagram, linkedin, youtube, tiktok, image };
   });
}