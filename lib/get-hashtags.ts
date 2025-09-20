import { query } from "./strapi";
import { Hashtag } from "./types";
import { CACHE_TAGS } from "./cacheTags";

export function getHashtags(): Promise<Hashtag[]> {
    return query("hashtags?locale=es&fields=tag", {}, CACHE_TAGS.HASHTAGS)
   .then((res: { data: Array<{ tag: string }> }) => {
    return res.data.map((item) => ({ name: item.tag }));
   });
}