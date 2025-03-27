import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET(req: NextRequest) {
    const user = req.nextUrl.searchParams.get("user");

    let treeData;
    if (!user)
        treeData = await prisma.planting.findMany({
            where: {
                validationStatus: false
            }  
        });
    else
        treeData = await prisma.planting.findMany({
            where: {
                ownerAddress: user,
                validationStatus: false
            }
        });


    return NextResponse.json({ data: treeData })
}

