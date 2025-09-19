import Image from "next/image";
import { getProfileData } from "@/lib/data/home";
import ProfileCard from "@/components/ProfileCard";

export default async function Home() {
  // Obtener datos dinámicamente desde función centralizada
  const { profile, social } = await getProfileData();
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full">
        <Image
          src={profile.image}
          alt={profile.alt}
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <div className="w-full h-[50%] absolute bottom-0 left-0">
        <ProfileCard
          profile={profile}
          socialLinks={social}
          showSocial={true}
          showAction={true}
        />
      </div>
    </div>
  );
}
