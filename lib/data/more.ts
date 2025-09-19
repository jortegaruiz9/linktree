import { getHashtags } from "@/lib/get-hashtags";
import { getGalleryProducts } from "@/lib/get-gallery-products";
import { getReviews } from "@/lib/get-reviews";


export async function getMoreData() {
  const hashtags = await getHashtags();
  const products = await getGalleryProducts();
  const reviews = await getReviews();
  
  return {
    hashtags,
    products,
    reviews
  };
}