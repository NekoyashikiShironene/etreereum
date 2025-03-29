import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ address: string }> }
) {
    const { address: address } = await params;

    if (!address)
        return;

    const itemData = await prisma.redemption.findMany({
        where: {
            walletAddress: address
        }
    })

    return NextResponse.json({ data: itemData })
}