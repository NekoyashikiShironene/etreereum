import prisma from "@/db/prisma";
import { NextResponse } from "next/server";

export async function POST() {
    await prisma.planting.updateMany({
        data: {
            height: {increment: Math.floor(Math.random() * 10 + 1)}
        }
    });
    return NextResponse.json({message: "Increased!"})
}