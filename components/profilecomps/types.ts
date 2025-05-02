// Define types for profile data
interface SocialLink {
    platform: string;
    url: string;
}

interface ProfileStats {
    supporters: number;
    supporting: number;
    posts: number;
}

interface CategoryItem {
    name: string;
    description: string;
}

interface ProfileData {
    name: string;
    location: string;
    bio: string;
    stats: ProfileStats;
    socialLinks: SocialLink[];
    categories: CategoryItem[];
}

/* Collection Types */
interface Artwork {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
}

export type { SocialLink, ProfileStats, ProfileData, CategoryItem, Artwork }