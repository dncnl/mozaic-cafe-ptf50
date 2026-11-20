export type MenuCategory = "cafe" | "kitchen" | "bar";

export interface SocialPost {
  id: string;
  platform: "instagram" | "facebook" | "tiktok";
  href: string;
  caption: string;
  image_url: string | null;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  group?: string;
  image_url: string | null;
  is_available: boolean;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  photo_url: string | null;
}
