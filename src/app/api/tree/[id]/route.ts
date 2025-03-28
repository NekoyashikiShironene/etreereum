import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: treeId } = await params;

    if (!treeId)
        return;

    const treeData = await prisma.planting.findFirst({
        where: {
            treeId: Number(treeId)
        }
    })

    return NextResponse.json({ data: treeData })
}