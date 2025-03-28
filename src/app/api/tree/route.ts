import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";


export async function POST(req: NextRequest) {
    const { treeId, validationStatus, latitude, longitude } = await req.json(); 

    const treeData = await prisma.planting.update({
        where: {
            treeId: Number(treeId)
        },

        data: {
            validationStatus: validationStatus,
            latitude: latitude,
            longitude: longitude
        }
    })

    return NextResponse.json({ data: treeData });
}