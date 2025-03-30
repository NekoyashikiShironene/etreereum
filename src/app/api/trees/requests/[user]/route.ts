import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ user: string }> }
) {
    const { user } = await params;

    let treeData;
    if (!user)
        treeData = await prisma.planting.findMany({
            where: {
                validationStatus: 0
            }  
        });
    else
        treeData = await prisma.planting.findMany({
            where: {
                ownerAddress: user,
            },
            orderBy: {
                treeId: 'desc'
            }
        });


    return NextResponse.json({ data: treeData });
}

