import { query } from "./strapi";

const {STRAPI_HOST} = process.env

export function getHomeInfo(){
    return query("home?locale=es&populate=background")
   .then(res=>{
    const {title, user, description, instagram, linkedin, youtube, tiktok, background} = res.data
    const image =  `${STRAPI_HOST}${background.url}`
    return {title, user, description, instagram, linkedin, youtube, tiktok, image}
   })
}