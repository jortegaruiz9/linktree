import { Hashtag, Product, Review } from "@/lib/types";

export const hashtag: Hashtag[] = [
  {
    name: "#ugccontent",
  },
  {
    name: "#influencer",
  },
  {
    name: "#ContentCreator",
  },
  {
    name: "#TikTokCreator",
  },
];

export const products: Product[] = [
  {
    image: "/img/products/product-skin.jpg",
    alt: "Loreal",
  },
  {
    image: "/img/products/product-skin-care.png",
    alt: "Loreal skin care",
  },
  {
    image: "/img/products/product-perfum.jpg",
    alt: "Natura",
  },
  {
    image: "/img/products/product-skip.JPEG",
    alt: "Skip",
  },
  {
    image: "/img/products/product-chocolate.JPEG",
    alt: "Laddubar",
  },
  {
    image: "/img/products/product-dental.JPEG",
    alt: "Sudanta",
  },
];

export const review: Review = {
  image: "/img/casateconmigo.png",
  alt: "Review",
  name: "Sandra Ortega",
  username: "@casateconmigo.ec",
  description:
    "Muy profesional y creativa, siempre tiene ideas innovadoras y originales.",
};