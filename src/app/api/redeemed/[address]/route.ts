import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ address: string }> }
) {
    const { address } = await params;

    if (!address)
        return;

    const itemData = await prisma.item.findMany({
        include: {
            Redemption: {
                where: {
                    walletAddress: address
                }
            }
        }
    });


    return NextResponse.json({ data: itemData })
}