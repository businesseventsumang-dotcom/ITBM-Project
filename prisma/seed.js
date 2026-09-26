const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Bluorng luxury streetwear database...");

  // Clear existing
  await prisma.product.deleteMany({});
  await prisma.collection.deleteMany({});
  await prisma.store.deleteMany({});

  // Collections
  const collections = [
    {
      id: "col-winter-2025",
      name: "Winter Collection 2025",
      slug: "winter-collection-2025",
      tagline: "ARCHITECTURAL OUTERWEAR & THERMAL FLEECE",
      season: "AW25",
      image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "col-racing-club",
      name: "Bluorng Racing Club",
      slug: "bluorng-racing-club",
      tagline: "HIGH-OCTANE GRAPHICS & SPEED HEURISTICS",
      season: "DROP 04",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "col-basics",
      name: "Bluorng Basics",
      slug: "bluorng-basics",
      tagline: "TIMELESS 280-480 GSM STRUCTURAL FOUNDATIONS",
      season: "PERMANENT",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "col-yacht",
      name: "Yacht Collection",
      slug: "yacht-collection",
      tagline: "MEDITERRANEAN RESORT SILK & TAILORED DRAPES",
      season: "SS25 PREVIEW",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1200&auto=format&fit=crop",
    }
  ];

  for (const c of collections) {
    await prisma.collection.create({ data: c });
  }

  // Stores
  const stores = [
    {
      id: "store-delhi",
      city: "Delhi",
      name: "BLUORNG MEHRAULI FLAGSHIP",
      address: "Warehouse 14, The Dhan Mill, Chhatarpur, New Delhi 110074",
      timing: "11:00 AM – 09:00 PM (Daily)",
      phone: "+91 98110 45892",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=The+Dhan+Mill+New+Delhi",
      imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "store-mumbai",
      city: "Mumbai",
      name: "BLUORNG KALA GHODA STUDIO",
      address: "Ground Floor, Heritage Arcade, Forbes Street, Kala Ghoda, Fort, Mumbai 400001",
      timing: "11:30 AM – 09:30 PM (Daily)",
      phone: "+91 98201 77314",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=Kala+Ghoda+Mumbai",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "store-ahmedabad",
      city: "Ahmedabad",
      name: "BLUORNG BODAKDEV ARCHIVE",
      address: "Shop 4, Symphony Pavillion, Off Sindhu Bhavan Road, Bodakdev, Ahmedabad 380054",
      timing: "11:00 AM – 09:00 PM (Daily)",
      phone: "+91 97234 19028",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=Sindhu+Bhavan+Road+Ahmedabad",
      imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "store-hyderabad",
      city: "Hyderabad",
      name: "BLUORNG JUBILEE HILLS CONCEPT",
      address: "Plot 789, Prime Square, Road No. 36, Jubilee Hills, Hyderabad 500033",
      timing: "11:00 AM – 09:00 PM (Daily)",
      phone: "+91 99890 32185",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad",
      imageUrl: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "store-gurugram",
      city: "Gurugram",
      name: "BLUORNG HORIZON CENTRE",
      address: "T-02, The Horizon Plaza, Golf Course Road, DLF Phase 5, Gurugram 122002",
      timing: "11:00 AM – 09:30 PM (Daily)",
      phone: "+91 98108 64290",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=One+Horizon+Center+Gurugram",
      imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: "store-noida",
      city: "Noida",
      name: "BLUORNG SECTOR 104 LAB",
      address: "Unit 12, Express Trade Avenue, Sector 104, Noida 201304",
      timing: "11:00 AM – 08:30 PM (Daily)",
      phone: "+91 98711 05432",
      isLiveNow: true,
      mapsUrl: "https://maps.google.com/?q=Sector+104+Noida",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  for (const s of stores) {
    await prisma.store.create({ data: s });
  }

  // Products
  const products = [
    {
      id: "prod-1",
      name: "CYBER DUNE EMBROIDERED POLO",
      slug: "cyber-dune-embroidered-polo",
      description: "Heavyweight 340 GSM luxury pique knit polo tailored with high-density architectural chain stitching.",
      category: "Top",
      subcategory: "Polos",
      price: 6499,
      salePrice: 5499,
      badge: "POLO SEASON",
      isNewDrop: true,
      isBestSeller: true,
      isBlindBox: false,
      stock: 12,
      collectionId: "col-racing-club",
      colors: JSON.stringify(["#1C1A17", "#D5C7B4", "#2E473B"]),
      sizes: JSON.stringify(["S", "M", "L", "XL", "XXL"]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop"
      ])
    },
    {
      id: "prod-2",
      name: "YACHT MONOGRAM SILK SHIRT",
      slug: "yacht-monogram-silk-shirt",
      description: "Flowing luxury twill camp-collar resort shirt featuring custom jacquard monogram typography.",
      category: "Top",
      subcategory: "Shirts",
      price: 8999,
      salePrice: 7999,
      badge: "NEW SHIRTS",
      isNewDrop: true,
      isBestSeller: false,
      isBlindBox: false,
      stock: 8,
      collectionId: "col-yacht",
      colors: JSON.stringify(["#EFECE6", "#0B192C"]),
      sizes: JSON.stringify(["S", "M", "L", "XL"]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop"
      ])
    },
    {
      id: "prod-7",
      name: "GRAND PRIX SUEDE EMBOSSED CAP",
      slug: "grand-prix-suede-embossed-cap",
      description: "Unstructured 6-panel silhouette crafted in supple faux microsuede with 3D bullion stitch racing typography.",
      category: "Accessories",
      subcategory: "Caps",
      price: 3499,
      salePrice: 2999,
      badge: "NEW CAPS",
      isNewDrop: true,
      isBestSeller: true,
      isBlindBox: false,
      stock: 20,
      collectionId: "col-racing-club",
      colors: JSON.stringify(["#0E0E0E", "#C29B38", "#1E3A5F"]),
      sizes: JSON.stringify(["ONE SIZE"]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?q=80&w=1000&auto=format&fit=crop"
      ])
    },
    {
      id: "prod-8",
      name: "VIP BLIND BOX COLLECTOR'S EDITION",
      slug: "vip-blind-box-collectors-edition",
      description: "Exclusive curated vault container containing 1 Guaranteed Archive Hoodie, 1 Rare Racing Cap, and 1 Studio Collectible.",
      category: "Accessories",
      subcategory: "Cases",
      price: 9999,
      salePrice: 7999,
      badge: "BLIND BOX LIVE",
      isNewDrop: true,
      isBestSeller: true,
      isBlindBox: true,
      stock: 9,
      collectionId: "col-winter-2025",
      colors: JSON.stringify(["#0A0A0A", "#FF4500"]),
      sizes: JSON.stringify(["STANDARD"]),
      images: JSON.stringify([
        "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=1000&auto=format&fit=crop"
      ])
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  console.log("Database seeded successfully with collections, stores, and products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
