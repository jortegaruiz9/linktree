"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ReviewCarouselProps } from "@/lib/types";
import Image from "next/image";

export default function ReviewCarousel({
  reviews,
  className,
}: ReviewCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 10000, stopOnInteraction: false })]
  );

  useEffect(() => {
    if (emblaApi) {
      // Optional: Add any additional embla API configurations here
    }
  }, [emblaApi]);

  return (
    <div className={`w-full max-w-md ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {reviews.map((review, index) => (
            <div
              key={`${review.alt}-${index}`}
              className="flex-[0_0_100%] min-w-0 pl-4"
            >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
