// Profile related types
export interface Profile {
  name: string;
  username: string;
  description: string;
  image: string;
  alt: string;
}

// Social media related types
export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

// Product related types
export interface Product {
  image: string;
  alt: string;
  brand?: string;
}

// Hashtag related types
export interface Hashtag {
  name: string;
}

// Review related types
export interface Review {
  image: string;
  alt: string;
  name: string;
  username: string;
  description: string;
}

// Component props types
export interface ProfileCardProps {
  profile: Profile;
  socialLinks: SocialLink[];
  showSocial?: boolean;
  showAction?: boolean;
  className?: string;
}

export interface ProductCarouselProps {
  products: Product[];
  className?: string;
}

export interface ReviewCardProps {
  review: Review;
  className?: string;
}

export interface ReviewCarouselProps {
  reviews: Review[];
  className?: string;
}
