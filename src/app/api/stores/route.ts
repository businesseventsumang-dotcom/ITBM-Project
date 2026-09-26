import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { OFFLINE_STORES } from "@/data/stores";

export async function GET() {
  try {
    const stores = await prisma.store.findMany();
    if (stores.length > 0) {
      return NextResponse.json({ success: true, stores });
    }
    return NextResponse.json({ success: true, stores: OFFLINE_STORES });
  } catch (error) {
    return NextResponse.json({ success: true, stores: OFFLINE_STORES });
  }
}
