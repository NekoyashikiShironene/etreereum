import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
    req: NextRequest, 
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: typeId } = await params;

    if (!typeId)
        return;

    const treeData = await prisma.tree.findFirst({
        where: {
            typeId: Number(typeId)
        }
    })

    return NextResponse.json({ data: treeData })
}