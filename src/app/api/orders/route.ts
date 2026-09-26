import { NextResponse } from "next/server";

let MOCK_ORDERS = [
  {
    id: "BLU-8821094",
    customer: "Alexander Vogel",
    city: "New Delhi",
    items: "Cyber Dune Embroidered Polo (L), Grand Prix Cap",
    total: 8498,
    status: "DISPATCHED",
    createdAt: new Date().toISOString(),
  },
  {
    id: "BLU-7712093",
    customer: "Rohan Singhania",
    city: "Mumbai",
    items: "VIP Blind Box Collector's Edition",
    total: 7999,
    status: "CONFIRMED",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ success: true, orders: MOCK_ORDERS });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: `BLU-${Math.floor(1000000 + Math.random() * 9000000)}`,
      customer: body.name || "VIP Customer",
      city: body.city || "New Delhi",
      items: body.items || "Curated Garments",
      total: body.total || 7999,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    };
    MOCK_ORDERS.unshift(newOrder);
    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
