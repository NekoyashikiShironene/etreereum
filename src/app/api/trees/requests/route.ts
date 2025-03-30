import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
    const treeData = await prisma.planting.findMany({
        where: {
            validationStatus: 0
        }
    });

    return NextResponse.json({ data: treeData });
}