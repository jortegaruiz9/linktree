import { Profile, SocialLink } from "@/lib/types";

export const profile: Profile = {
  name: "Josebeth Amacoria",
  username: "@josebethcamila",
  description:
    "Haz lo que puedas, con lo que tengas, donde estés. — Theodore Roosevelt",
  image: "/img/hero.jpg",
  alt: "Josebeth perfil",
};

export const social: SocialLink[] = [
  {
    name: "Instagram",
    icon: "icon-[formkit--instagram]",
    url: "https://www.instagram.com/josebethcamila?igsh=b3J1d3JrcXdheTJi&utm_source=qr",
  },
  {
    name: "Linkedin",
    icon: "icon-[akar-icons--linkedin-v2-fill]",
    url: "https://www.linkedin.com/in/josebeth-amacoria-5b7275252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    name: "Youtube",
    icon: "icon-[bi--youtube]",
    url: "https://youtube.com/@josebethcamila?si=XErX0nIZ0pTNwbyK",
  },
  {
    name: "TikTok",
    icon: "icon-[ant-design--tik-tok-outlined]",
    url: "https://www.tiktok.com/@josebeth_camila?_t=ZM-8yDBkC3FBq9&_r=1",
  },
];