import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const treesData = await prisma.planting.findMany({
        where: {
            validationStatus: 1
        },
        include: {
            Tree: true
        }
    });

    return NextResponse.json({ data: treesData });
}