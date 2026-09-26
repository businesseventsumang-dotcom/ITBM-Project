export interface CollectionItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  season: string;
  itemCount: number;
  bannerImage: string;
  color: string;
}

export const COLLECTIONS: CollectionItem[] = [
  {
    id: "col-winter-2025",
    name: "Winter Collection 2025",
    slug: "winter-collection-2025",
    tagline: "ARCHITECTURAL OUTERWEAR & THERMAL FLEECE",
    season: "AW25",
    itemCount: 24,
    bannerImage: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    color: "#8C827A"
  },
  {
    id: "col-racing-club",
    name: "Nocturne Racing Club",
    slug: "nocturne-racing-club",
    tagline: "HIGH-OCTANE GRAPHICS & SPEED HEURISTICS",
    season: "DROP 04",
    itemCount: 18,
    bannerImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
    color: "#FF4500"
  },
  {
    id: "col-basics",
    name: "Nocturne Basics",
    slug: "nocturne-basics",
    tagline: "TIMELESS 280-480 GSM STRUCTURAL FOUNDATIONS",
    season: "PERMANENT",
    itemCount: 32,
    bannerImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    color: "#272727"
  },
  {
    id: "col-yacht",
    name: "Yacht Collection",
    slug: "yacht-collection",
    tagline: "MEDITERRANEAN RESORT SILK & TAILORED DRAPES",
    season: "SS25 PREVIEW",
    itemCount: 14,
    bannerImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
    color: "#D4CDC5"
  }
];
