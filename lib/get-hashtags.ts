import { query } from "./strapi";
import { Hashtag } from "./types";

export function getHashtags(): Promise<Hashtag[]> {
    return query("hashtags?locale=es&fields=tag")
   .then((res: { data: Array<{ tag: string }> }) => {
    return res.data.map((item) => ({ name: item.tag }));
   })
}