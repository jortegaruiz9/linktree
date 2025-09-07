import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { profile } from "@/lib/data/home";
import { hashtag, products, review } from "@/lib/data/more";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProductCarousel from "@/components/ProductCarousel";
import HashtagList from "@/components/HashtagList";
import ReviewCard from "@/components/ReviewCard";

export default function More() {
  return (
    <div className="w-full h-screen bg-stone-200">
      <div className="w-full h-full">
        <Image
          src={profile.image}
          alt={profile.alt}
          width={1920}
          height={1080}
          priority
          className="w-full h-full object-cover"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      <div className="w-full h-full absolute bottom-0 left-0">
        <Button
          asChild
          className="absolute top-5 left-4 rounded-full bg-white text-black"
          size="icon"
          aria-label="Back to home"
        >
          <Link href="/">
            <span className="icon-[proicons--arrow-left] text-lg"></span>
          </Link>
        </Button>
        <h4 className="text-center m-6 font-medium">{profile.username}</h4>
        <Card className="w-11/12 h-[85%] mx-auto max-w-sm bg-black/80 text-white border-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-medium leading-7 w-1/2">
              {profile.name}
            </CardTitle>
            <CardDescription className="leading-4 text-white text-xs font-medium">
              {profile.username}
            </CardDescription>
            <CardDescription className="leading-4 text-white/80 text-xs">
              {profile.description}
            </CardDescription>
            <CardAction>
              <Link href="/" aria-label="Back to home">
                <span className="icon-[proicons--arrow-undo-2] text-2xl text-white/70"></span>
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-4">
            <HashtagList hashtags={hashtag} />
            <ProductCarousel products={products} />
          </CardContent>
          <ReviewCard review={review} />
        </Card>
      </div>
    </div>
  );
}
