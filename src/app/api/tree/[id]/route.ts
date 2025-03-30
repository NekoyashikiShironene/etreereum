import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
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

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { height } = await req.json();
    const { id: treeId } = await params;

    const treeData = await prisma.planting.update({
        where: {
            treeId: Number(treeId)
        },
        data: {
            height: Number(height)
        }
    })

    return NextResponse.json({ data: treeData });
}
