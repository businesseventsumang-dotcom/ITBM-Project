import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/data/products";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");

    const where: any = {};
    if (category && category !== "ALL") where.category = category;
    if (subcategory && subcategory !== "ALL") where.subcategory = subcategory;

    const dbProducts = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    if (dbProducts.length > 0) {
      // Map Prisma stored JSON strings to arrays
      const formatted = dbProducts.map((p) => ({
        ...p,
        colors: JSON.parse(p.colors || "[]"),
        sizes: JSON.parse(p.sizes || "[]"),
        images: JSON.parse(p.images || "[]"),
        details: ["340 GSM luxury combed cotton", "Pre-shrunk custom garment wash"],
      }));
      return NextResponse.json({ success: true, count: formatted.length, products: formatted });
    }

    // Fallback to rich mock data if db is empty
    return NextResponse.json({ success: true, count: PRODUCTS.length, products: PRODUCTS });
  } catch (error) {
    console.error("API /api/products error:", error);
    // Graceful fallback to static data
    return NextResponse.json({ success: true, count: PRODUCTS.length, products: PRODUCTS });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug || body.name.toLowerCase().replace(/\s+/g, "-"),
        description: body.description || "Luxury streetwear garment",
        category: body.category,
        subcategory: body.subcategory,
        price: Number(body.price),
        salePrice: body.salePrice ? Number(body.salePrice) : null,
        stock: Number(body.stock || 20),
        badge: body.badge,
        images: JSON.stringify(body.images || []),
        colors: JSON.stringify(body.colors || []),
        sizes: JSON.stringify(body.sizes || ["S", "M", "L", "XL"]),
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
