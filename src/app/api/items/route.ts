import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
    const itemData = await prisma.item.findMany({});
    return NextResponse.json({ data: itemData })
}
