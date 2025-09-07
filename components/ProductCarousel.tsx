import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductCarouselProps } from "@/lib/types";

export default function ProductCarousel({
  products,
  className,
}: ProductCarouselProps) {
  return (
    <Carousel className={`w-full max-w-sm ${className}`}>
      <CarouselContent className="-ml-1">
        {products.map((product, index) => {
          // Las primeras 3 imágenes son visibles inicialmente (basis-1/3 = 3 items visible)
          const isPriority = index < 3;

          return (
            <CarouselItem
              key={`${product.alt}-${index}`}
              className="pl-1 basis-1/3"
            >
              <Card
                className="w-full aspect-[3/4] p-1 bg-white/0 overflow-hidden border-none"
                role="button"
                tabIndex={0}
                aria-label={`View product ${product.alt}`}
              >
                <Image
                  src={product.image}
                  alt={product.alt}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover rounded-md"
                  quality={isPriority ? 90 : 75}
                  priority={isPriority}
                  loading={isPriority ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      {/* Navigation controls positioned below the carousel */}
      <div className="flex justify-center gap-2 mt-4">
        <CarouselPrevious
          className="relative top-0 left-0 translate-x-0 translate-y-0 bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300"
          aria-label="View previous products"
        />
        <CarouselNext
          className="relative top-0 right-0 translate-x-0 translate-y-0 bg-gray-200 hover:bg-gray-300 text-gray-700 border-gray-300"
          aria-label="View next products"
        />
      </div>
    </Carousel>
  );
}
