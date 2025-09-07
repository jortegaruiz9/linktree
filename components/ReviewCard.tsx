import Image from "next/image";
import { CardFooter } from "@/components/ui/card";
import { ReviewCardProps } from "@/lib/types";

export default function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <CardFooter className={`flex-col gap-2 ${className}`}>
      <div className="flex w-full gap-x-4">
        <div>
          <div className="w-10 h-10 bg-gray-200 rounded-full">
            <Image
              src={review.image}
              alt={review.alt}
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-full"
              quality={75}
              loading="lazy"
            />
          </div>
        </div>
        <div>
          <p className="text-xs text-white/80">{review.description}</p>
          <h2 className="text-sm mt-2">{review.name}</h2>
          <h4 className="text-xs text-white/80">{review.username}</h4>
        </div>
      </div>
    </CardFooter>
  );
}
