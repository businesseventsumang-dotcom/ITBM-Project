export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: "Top" | "Bottom" | "Accessories";
  subcategory:
    | "T-shirts"
    | "Polos"
    | "Shirts"
    | "Sweatshirts"
    | "Hoodies"
    | "Jackets"
    | "Cargos"
    | "Jeans"
    | "Pants"
    | "Shorts"
    | "Bags"
    | "Caps"
    | "Cases";
  price: number;
  salePrice?: number;
  badge?: string;
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  isBlindBox?: boolean;
  stock: number;
  collection: string;
  colors: string[];
  sizes: string[];
  images: string[];
  description: string;
  details: string[];
}

export const PRODUCTS: ProductItem[] = [
  // --- TOP: POLOS & SHIRTS (Key Hero Highlights) ---
  {
    id: "prod-1",
    name: "CYBER DUNE EMBROIDERED POLO",
    slug: "cyber-dune-embroidered-polo",
    category: "Top",
    subcategory: "Polos",
    price: 6499,
    salePrice: 5499,
    badge: "POLO SEASON",
    isNewDrop: true,
    isBestSeller: true,
    stock: 12,
    collection: "Nocturne Racing Club",
    colors: ["#1C1A17", "#D5C7B4", "#2E473B"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Heavyweight 340 GSM luxury pique knit polo tailored with high-density architectural chain stitching and matte-black hardware snap buttons.",
    details: ["340 GSM 100% combed cotton pique", "Precision crest chest embroidery", "Custom matte gunmetal snap placket", "Pre-shrunk luxury garment wash"]
  },
  {
    id: "prod-2",
    name: "YACHT MONOGRAM SILK SHIRT",
    slug: "yacht-monogram-silk-shirt",
    category: "Top",
    subcategory: "Shirts",
    price: 8999,
    salePrice: 7999,
    badge: "NEW SHIRTS",
    isNewDrop: true,
    stock: 8,
    collection: "Yacht Collection",
    colors: ["#EFECE6", "#0B192C"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Flowing luxury twill camp-collar resort shirt featuring custom jacquard monogram typography inspired by Mediterranean marine racing.",
    details: ["Cupro-silk textured blend", "Revere camp collar", "Genuine horn buttons", "Relaxed oversized drop-shoulder silhouette"]
  },
  {
    id: "prod-3",
    name: "TACTICAL SPEED RACING HOODIE",
    slug: "tactical-speed-racing-hoodie",
    category: "Top",
    subcategory: "Hoodies",
    price: 9499,
    salePrice: 8499,
    badge: "DROP 01",
    isNewDrop: true,
    isBestSeller: true,
    stock: 14,
    collection: "Nocturne Racing Club",
    colors: ["#0F0F0F", "#FF4500"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "480 GSM ultra-heavy French Terry hoodie featuring rubberized 3D puff silicone chest logos and reinforced thumbhole ribbed cuffs.",
    details: ["480 GSM loopback cotton", "Double-layered sculptural hood", "3D liquid silicone typography", "Articulated side gusset panels"]
  },
  {
    id: "prod-4",
    name: "MINIMALIST BOXY LOGO TEE",
    slug: "minimalist-boxy-logo-tee",
    category: "Top",
    subcategory: "T-shirts",
    price: 3999,
    salePrice: 3499,
    badge: "ESSENTIAL",
    isBestSeller: true,
    stock: 35,
    collection: "Nocturne Basics",
    colors: ["#121212", "#FFFFFF", "#4A4036"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Signature 280 GSM heavyweight cotton tee engineered with a high-rib mock collar and a wide boxy drape.",
    details: ["280 GSM premium single jersey", "1.25-inch snug ribbed collar", "Vintage enzyme fade wash", "Minimal tonal back spine print"]
  },
  {
    id: "prod-5",
    name: "ARCTIC SHEARLING PUFFER JACKET",
    slug: "arctic-shearling-puffer-jacket",
    category: "Top",
    subcategory: "Jackets",
    price: 18999,
    salePrice: 16499,
    badge: "WINTER 25",
    isNewDrop: true,
    stock: 5,
    collection: "Winter Collection 2025",
    colors: ["#1A1A1A", "#8C827A"],
    sizes: ["M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Thermal insulated architectural down puffer jacket with water-resistant ripstop shell and brushed shearling collar insert.",
    details: ["700FP responsible goose down fill", "Matte technical nylon ripstop", "Concealed magnetic storm placket", "Heavy-gauge two-way YKK zippers"]
  },
  {
    id: "prod-6",
    name: "RAW EDGE DISTRESSED SWEATSHIRT",
    slug: "raw-edge-distressed-sweatshirt",
    category: "Top",
    subcategory: "Sweatshirts",
    price: 7499,
    salePrice: 6499,
    badge: "LIMITED",
    stock: 10,
    collection: "Winter Collection 2025",
    colors: ["#2B2A29", "#8D6242"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Heavy loopback crewneck with handcrafted laser abrasions, raw-hem wrist details, and acid wash treatment.",
    details: ["400 GSM custom-loomed fleece", "Artisanal distressed edges", "Dropped shoulder stance", "Internal satin neck tape"]
  },

  // --- ACCESSORIES: CAPS (Hero highlight), BAGS, CASES ---
  {
    id: "prod-7",
    name: "GRAND PRIX SUEDE EMBOSSED CAP",
    slug: "grand-prix-suede-embossed-cap",
    category: "Accessories",
    subcategory: "Caps",
    price: 3499,
    salePrice: 2999,
    badge: "NEW CAPS",
    isNewDrop: true,
    isBestSeller: true,
    stock: 20,
    collection: "Nocturne Racing Club",
    colors: ["#0E0E0E", "#C29B38", "#1E3A5F"],
    sizes: ["ONE SIZE"],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Unstructured 6-panel silhouette crafted in supple faux microsuede with 3D bullion stitch racing typography and an antique brass clasp.",
    details: ["Supple microsuede crown", "Debossed metal buckle strapback", "Embroidered eyelet ventilation", "Custom branded interior sweatband"]
  },
  {
    id: "prod-8",
    name: "VIP BLIND BOX COLLECTOR'S EDITION",
    slug: "vip-blind-box-collectors-edition",
    category: "Accessories",
    subcategory: "Cases",
    price: 9999,
    salePrice: 7999,
    badge: "BLIND BOX LIVE",
    isBlindBox: true,
    isNewDrop: true,
    stock: 9,
    collection: "Winter Collection 2025",
    colors: ["#0A0A0A", "#FF4500"],
    sizes: ["STANDARD"],
    images: [
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Exclusive curated vault container containing 1 Guaranteed Limited Archive Hoodie, 1 Rare Racing Cap, and 1 Unreleased Studio Collectible accessory.",
    details: ["Worth over ₹18,000 retail value", "Custom magnetic matte-black presentation box", "Numbered holographic authenticity card", "Non-refundable limited drop"]
  },
  {
    id: "prod-9",
    name: "MODULAR TACTICAL CHEST BAG",
    slug: "modular-tactical-chest-bag",
    category: "Accessories",
    subcategory: "Bags",
    price: 5499,
    salePrice: 4799,
    badge: "BESTSELLER",
    isBestSeller: true,
    stock: 18,
    collection: "Nocturne Basics",
    colors: ["#141414", "#3D3D3D"],
    sizes: ["ONE SIZE"],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Ballistic Cordura cross-body utility holster with quick-release Cobra-style aircraft buckles and waterproof sealed zips.",
    details: ["1000D Cordura ballistic weave", "Industrial aluminum quick-release clasp", "Weatherproof rubberized zips", "Multi-pocket EDC internal mesh"]
  },
  {
    id: "prod-10",
    name: "TITANIUM IMPACT SMARTPHONE CASE",
    slug: "titanium-impact-smartphone-case",
    category: "Accessories",
    subcategory: "Cases",
    price: 2499,
    salePrice: 1999,
    badge: "TECH",
    stock: 40,
    collection: "Nocturne Basics",
    colors: ["#1B1B1B", "#C0C0C0"],
    sizes: ["IPHONE 15 PRO", "IPHONE 16 PRO", "S24 ULTRA"],
    images: [
      "https://images.unsplash.com/photo-1601593346740-925612772716?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Brushed anodized titanium plate phone bumper with shock-absorbing TPU honeycomb corners and MagSafe magnetic ring array.",
    details: ["Aviation-grade aluminum accent", "12ft drop protection rating", "MagSafe magnetic lock", "Tactile CNC-machined buttons"]
  },

  // --- BOTTOM: CARGOS, JEANS, PANTS, SHORTS ---
  {
    id: "prod-11",
    name: "VORTEX 12-POCKET CARGO TROUSERS",
    slug: "vortex-12-pocket-cargo-trousers",
    category: "Bottom",
    subcategory: "Cargos",
    price: 8999,
    salePrice: 7999,
    badge: "DROP 02",
    isNewDrop: true,
    isBestSeller: true,
    stock: 15,
    collection: "Nocturne Racing Club",
    colors: ["#121312", "#353831", "#5C584E"],
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Engineered parachute twill multi-pocket cargos with cinchable bungee ankle hems, 3D bellows pockets, and articulating knee pleats.",
    details: ["Heavyweight ripstop cotton blend", "12 utilitarian pocket compartments", "Ankle toggles for straight or tapered fit", "Reinforced seat panel"]
  },
  {
    id: "prod-12",
    name: "HEAVY STACKED DENIM JEANS",
    slug: "heavy-stacked-denim-jeans",
    category: "Bottom",
    subcategory: "Jeans",
    price: 9499,
    salePrice: 8499,
    badge: "WINTER 25",
    stock: 11,
    collection: "Winter Collection 2025",
    colors: ["#1E222A", "#0D0E10"],
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "14.5oz Japanese selvedge denim cut with an extended inseam designed to naturally gather and stack cleanly above high-top sneakers.",
    details: ["14.5oz rigid Japanese denim", "Custom copper rivet hardware", "Artisanal hand whiskering", "Flared stacked lower leg cut"]
  },
  {
    id: "prod-13",
    name: "TAILORED WIDE-LEG RELAXED PANTS",
    slug: "tailored-wide-leg-relaxed-pants",
    category: "Bottom",
    subcategory: "Pants",
    price: 7999,
    salePrice: 6999,
    badge: "YACHT",
    stock: 16,
    collection: "Yacht Collection",
    colors: ["#D4CDC5", "#111111"],
    sizes: ["30", "32", "34", "36"],
    images: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Double-pleated drape trousers tailored in a breathable wool-blend fabric with internal drawstring waist and welt pocketing.",
    details: ["Wool-viscose drape weave", "Deep front double pleats", "Elasticated rear waist contour", "Hidden coin pocket"]
  },
  {
    id: "prod-14",
    name: "HEAVY FRENCH TERRY UTILITY SHORTS",
    slug: "heavy-french-terry-utility-shorts",
    category: "Bottom",
    subcategory: "Shorts",
    price: 4499,
    salePrice: 3899,
    badge: "BASICS",
    isBestSeller: true,
    stock: 22,
    collection: "Nocturne Basics",
    colors: ["#141414", "#808080", "#C8B6A6"],
    sizes: ["S", "M", "L", "XL"],
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "420 GSM raw loopback sweat shorts featuring elongated chunky cotton drawcords and deep concealed zippered pockets.",
    details: ["420 GSM 100% cotton fleece", "Extra-long natural cotton drawstrings", "Concealed waterproof zip compartments", "Subtle raised tonal embroidery"]
  }
];
