import { query } from "./strapi";
import { CACHE_TAGS } from "./cacheTags";

const { STRAPI_URL } = process.env;

// Get the base URL for Strapi - consistent with strapi.ts
const STRAPI_BASE_URL = STRAPI_URL || 'http://localhost:1337';

export function getHomeInfo(){
    return query("home?locale=es&populate=background", {}, CACHE_TAGS.HOME)
   .then(res => {
    const { title, user, description, instagram, linkedin, youtube, tiktok, background } = res.data;
    const image = `${STRAPI_BASE_URL}${background.url}`;
    return { title, user, description, instagram, linkedin, youtube, tiktok, image };
   });
}