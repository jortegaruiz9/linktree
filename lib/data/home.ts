import { Profile, SocialLink } from "@/lib/types";
import { getHomeInfo } from "@/lib/get-home-info";

// Función para obtener datos dinámicamente
export async function getProfileData() {
  const { title, user, description, instagram, linkedin, youtube, tiktok, image } = await getHomeInfo();

  const profile: Profile = {
    name: title,
    username: user,
    description: description,
    image: image,
    alt: "image of background",
  };

  const social: SocialLink[] = [
    {
      name: "Instagram",
      icon: "icon-[formkit--instagram]",
      url: instagram,
    },
    {
      name: "Linkedin",
      icon: "icon-[akar-icons--linkedin-v2-fill]",
      url: linkedin,
    },
    {
      name: "Youtube",
      icon: "icon-[bi--youtube]",
      url: youtube,
    },
    {
      name: "TikTok",
      icon: "icon-[ant-design--tik-tok-outlined]",
      url: tiktok,
    },
  ];

  return { profile, social };
}