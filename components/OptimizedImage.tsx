"use client";

import Image from "next/image";
import { useState, useCallback } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  fallbackSrc?: string;
}

// Default blur data URL optimized for mobile (Next.js 15 best practice)
const DEFAULT_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

// Fallback SVG for failed image loads
const FALLBACK_SVG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMjAwQzE2MS4wNDYgMjAwIDE3MCAyMDguOTU0IDE3MCAyMjBDMTcwIDIzMS4wNDYgMTYxLjA0NiAyNDAgMTUwIDI0MFMxMzAgMjMxLjA0NiAxMzAgMjIwQzEzMCAyMDguOTU0IDEzOC45NTQgMjAwIDE1MCAyMDBaIiBmaWxsPSIjOUM5OUE1Ii8+Cjwvc3ZnPgo=";

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 75, // Next.js 15 default
  placeholder = "blur",
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
  fill = false,
  fallbackSrc = FALLBACK_SVG,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setHasError(true);
      setImageSrc(fallbackSrc);
      console.warn(`Failed to load image: ${src}, using fallback`);
    }
  }, [hasError, imageSrc, fallbackSrc, src]);

  const handleLoadingComplete = useCallback(() => {
    if (hasError) {
      setHasError(false);
    }
  }, [hasError]);

  // Common props for both fill and sized images (Next.js 15 optimized)
  const commonProps = {
    src: imageSrc,
    alt,
    className,
    priority,
    quality,
    placeholder,
    blurDataURL,
    sizes,
    onError: handleError,
    onLoadingComplete: handleLoadingComplete,
    // Next.js 15 performance optimizations
    loading: priority ? ("eager" as const) : ("lazy" as const),
  };

  // Use fill prop for responsive containers (Next.js 15 best practice)
  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          {...commonProps}
          fill
          alt={alt}
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    );
  }

  // Traditional width/height approach
  return (
    <Image
      {...commonProps}
      width={width}
      height={height}
      alt={alt}
      style={{
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
}
