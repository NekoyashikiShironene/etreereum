import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/utils/uploadFile";

export async function POST(req: NextRequest) {
    let formData: FormData;
    try {
        formData = await req.formData();
    }
    catch (e: unknown) {
        return NextResponse.json({ message: e }, { status: 400 });
    }
    
    const file = formData.get("file") as File;
    const file_name = formData.get("file_name") as string;

    if (!(file && file_name))
        return NextResponse.json({ message: 'Expected file and file_name'}, { status: 400 });

    try {
        await uploadFile(file, file_name);
        return NextResponse.json({ message: 'File uploaded successfully', file_name });
    } catch (e: unknown) {
        return NextResponse.json({ message: 'File uploaded failed', detailed: e }, { status: 500 });
    }
}

